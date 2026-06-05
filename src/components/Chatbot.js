"use client";

import React, { useState, useEffect, useRef, useCallback } from 'react';
import axios from 'axios';
import Markdown from 'react-markdown';
import { RiSendPlane2Fill, RiRobot2Line, RiCloseLine } from "react-icons/ri";
import { auth, db } from '../service/firebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';
import { collection, query, where, getDocs, doc, getDoc } from 'firebase/firestore';
import "../styles/Chatbot.css";

const Chatbot = ({ chatHistory = [], setChatHistory }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [userMessage, setUserMessage] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const [user, setUser] = useState(null);
    const [userName, setUserName] = useState('');
    const [userTrips, setUserTrips] = useState([]);
    const chatWindowRef = useRef(null);
    const chatbotRef = useRef(null);

    // Auth state and trip data listener
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            setUser(currentUser);
            if (currentUser) {
                // Determine user's name (fallback from Auth profile to users collection)
                let name = currentUser.displayName || '';
                if (!name) {
                    try {
                        const userDoc = await getDoc(doc(db, "users", currentUser.uid));
                        if (userDoc.exists()) {
                            name = userDoc.data().name || '';
                        }
                    } catch (e) {
                        console.error("Error retrieving username:", e);
                    }
                }
                setUserName(name);

                // Fetch user's saved trips
                try {
                    const q = query(
                        collection(db, "AItrips"),
                        where("userEmail", "==", currentUser.email)
                    );
                    const querySnapshot = await getDocs(q);
                    const trips = [];
                    querySnapshot.forEach((docSnap) => {
                        const data = docSnap.data();
                        trips.push({
                            id: docSnap.id,
                            destination: data.userSelection?.location?.label || 'Unknown Destination',
                            days: data.userSelection?.noOfDays || 1,
                            budget: data.userSelection?.Budget || 'Flexible',
                            traveller: data.userSelection?.Traveller || 'Not specified',
                            itinerary: data.tripdata?.itinerary || {}
                        });
                    });
                    setUserTrips(trips);
                } catch (e) {
                    console.error("Error retrieving user trips:", e);
                }
            } else {
                setUserName('');
                setUserTrips([]);
            }
        });
        return () => unsubscribe();
    }, []);

    // Format saved trips into structured text for AI context
    const formatTripsForPrompt = () => {
        if (userTrips.length === 0) {
            return "No saved trips found for this user.";
        }
        return userTrips.map((trip, idx) => {
            const daysOutline = Object.entries(trip.itinerary)
                .map(([dayKey, dayPlan]) => {
                    const theme = dayPlan?.theme || '';
                    const activities = (dayPlan?.plan || [])
                        .map(act => act.placeName)
                        .filter(Boolean)
                        .join(', ');
                    return `  - ${dayKey}: Theme: "${theme}". Visited: ${activities}`;
                })
                .join('\n');
            return `- Saved Trip ${idx + 1}:
  Trip ID: ${trip.id}
  Destination: ${trip.destination}
  Duration: ${trip.days} Days
  Budget: ${trip.budget}
  Travelers Type: ${trip.traveller}
  Itinerary Outline:\n${daysOutline}`;
        }).join('\n\n');
    };

    const getContextPrompt = () => {
        return `
        bot_identity:
        name: "TP Bot"
        creators: "Manthri Parthiv (Main Developer), Manohar, Kommaram Sai"
        primary_role: "Assist users with questions about travel planning, itineraries, and trip configurations."

        user_context:
        logged_in: ${user ? 'true' : 'false'}
        name: "${userName || 'Visitor'}"
        saved_trips:
        ${formatTripsForPrompt()}
        
        Instructions:
        1. Always address the user warmly. If they are logged in, you know their name is "${userName}".
        2. You have access to their saved travel itineraries in the user_context above. If they ask about their saved plans, destinations, or specific days, consult these details to provide tailored answers.
        3. Keep recommendations aligned with their preferences.
        4. Be helpful, concise, and professional.
        `;
    };

    const typeMessage = useCallback(async (message) => {
        setIsTyping(true);
        let localCurrentMessage = '';
        
        for (const char of message) {
            localCurrentMessage += char;
            await new Promise(resolve => setTimeout(resolve, 15));

            // eslint-disable-next-line no-loop-func
            setChatHistory(prevChatHistory => {
                const lastMessage = prevChatHistory[prevChatHistory.length - 1];
                if (lastMessage && lastMessage.sender === 'bot') {
                    return [...prevChatHistory.slice(0, -1), 
                            { ...lastMessage, message: localCurrentMessage }];
                } else {
                    return [...prevChatHistory, { sender: 'bot', message: localCurrentMessage }];
                }
            });
        }

        setIsTyping(false);
    }, [setChatHistory]);

    // Welcomes user by name if logged in
    useEffect(() => {
        if (isOpen && chatHistory.length === 0) {
            let welcomeMessage = "Hello! I'm TP Bot, your assistant for travel planning. I can help with suggestions based on your location, budget, and more!";
            if (userName) {
                welcomeMessage = `Hello, ${userName}! I'm TP Bot, your personal travel planning assistant. I see you are logged in. How can I help you plan your next adventure today?`;
                if (userTrips.length > 0) {
                    const destinations = userTrips.map(t => t.destination.split(',')[0].trim());
                    welcomeMessage += ` I can answer questions about your saved trips to ${destinations.join(' or ')}.`;
                }
            }
            typeMessage(welcomeMessage);
        }
    }, [isOpen, chatHistory.length, userName, userTrips, typeMessage]);

    const toggleChat = useCallback(() => {
        setIsOpen(prev => !prev);
    }, []);

    const handleOutsideClick = useCallback((event) => {
        if (chatbotRef.current && !chatbotRef.current.contains(event.target)) {
            if (!event.target.closest('.chatbot-toggle-button')) {
                setIsOpen(false);
            }
        }
    }, []);

    useEffect(() => {
        if (isOpen) {
            document.addEventListener('mousedown', handleOutsideClick);
        } else {
            document.removeEventListener('mousedown', handleOutsideClick);
        }
        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        };
    }, [isOpen, handleOutsideClick]);

    const sendMessage = async () => {
        if (userMessage.trim() === '' || isTyping) return;

        const updatedHistory = [...chatHistory, { sender: 'user', message: userMessage }];
        setChatHistory(updatedHistory);
        setUserMessage('');
        setIsTyping(true);

        try {
            const groqApiKey = process.env.REACT_APP_GROQ_API_KEY;

            const messages = [
                { role: "system", content: getContextPrompt() },
                ...updatedHistory.map(chat => ({
                    role: chat.sender === 'user' ? 'user' : 'assistant',
                    content: chat.message
                }))
            ];

            const response = await axios.post(
                'https://api.groq.com/openai/v1/chat/completions',
                { 
                    messages, 
                    model: 'llama-3.1-8b-instant',
                    temperature: 0.7,
                    max_tokens: 500
                },
                { 
                    headers: { 
                        Authorization: `Bearer ${groqApiKey}`, 
                        'Content-Type': 'application/json' 
                    } 
                }
            );

            const botMessage = response.data.choices[0].message.content;
            await typeMessage(botMessage);
        } catch (error) {
            console.error('Error sending message:', error.response || error.message);
            await typeMessage('Sorry, something went wrong. Please try again later.');
        }
    };

    useEffect(() => {
        if (chatWindowRef.current) {
            chatWindowRef.current.scrollTop = chatWindowRef.current.scrollHeight;
        }
    }, [chatHistory]);

    return (
        <>
            <div 
                className="chatbot-toggle-button"
                onClick={toggleChat}
                aria-label={isOpen ? "Close chat" : "Open chat"}
            >
                {isOpen ? <RiCloseLine size={32} /> : <RiRobot2Line size={32} />}
            </div>

            <div className={`chatbot ${isOpen ? 'open' : ''}`} ref={chatbotRef}>
                <div className="chat-header">
                    <h3>Travel Planner Bot</h3>
                    <button className="close-button" onClick={toggleChat}>
                        <RiCloseLine size={18} />
                    </button>
                </div>
                <div className="chat-window" ref={chatWindowRef}>
                    {chatHistory.map((chat, index) => (
                        <div key={index} className={`chat-message ${chat.sender}-message`}>
                            <Markdown>{chat.message}</Markdown>
                        </div>
                    ))}
                    {isTyping && (
                        <div className="chat-message bot-message">
                            <div className="typing-indicator">
                                <span></span>
                                <span></span>
                                <span></span>
                            </div>
                        </div>
                    )}
                </div>
                <div className="input">
                    <input
                        type="text"
                        value={userMessage}
                        onChange={(e) => setUserMessage(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                        placeholder="Ask about travel plans..."
                        disabled={isTyping} 
                    />
                    <button 
                        onClick={sendMessage} 
                        disabled={isTyping || userMessage.trim() === ''}
                    >
                        <RiSendPlane2Fill size={18} />
                    </button>
                </div>
            </div>
        </>
    );
};

export default Chatbot;