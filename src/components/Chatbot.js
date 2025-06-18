"use client";

import React, { useState, useEffect, useRef, useCallback } from 'react';
import axios from 'axios';
import Markdown from 'react-markdown';
import { RiSendPlane2Fill, RiChat3Line, RiCloseLine } from "react-icons/ri";
import "../styles/Chatbot.css";

const Chatbot = ({ chatHistory = [], setChatHistory }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [userMessage, setUserMessage] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const chatWindowRef = useRef(null);
    const chatbotRef = useRef(null);

    const travelPlannerContext = `
    bot_identity:
    name: "TP Bot"
    creators: "Manthri Parthiv (Main Developer), Manohar, Kommaram Sai"
    primary_role: "Assist users with questions about travel planning and provide hotel recommendations based on location, days, travelers, and budget."
    `;

    const typeMessage = useCallback(async (message) => {
        setIsTyping(true);
        let localCurrentMessage = '';
        
        for (const char of message) {
            localCurrentMessage += char;
            await new Promise(resolve => setTimeout(resolve, 30));

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

    useEffect(() => {
        if (isOpen && chatHistory.length === 0) {
            const welcomeMessage = "Hello! I'm TP Bot, your assistant for travel planning. I can help with hotel suggestions based on your location, budget, and more!";
            typeMessage(welcomeMessage);
        }
    }, [isOpen, chatHistory.length, typeMessage]);

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
                { role: "system", content: travelPlannerContext },
                ...updatedHistory.map(chat => ({
                    role: chat.sender === 'user' ? 'user' : 'assistant',
                    content: chat.message
                }))
            ];

            const response = await axios.post(
                'https://api.groq.com/openai/v1/chat/completions',
                { 
                    messages, 
                    model: 'llama3-8b-8192',
                    temperature: 0.7,
                    max_tokens: 50
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
                {isOpen ? <RiCloseLine size={24} /> : <RiChat3Line size={24} />}
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