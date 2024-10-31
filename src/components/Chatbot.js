import React, { useState } from 'react';
import '../styles/chatbot.css'; // Add the CSS file
import axios from 'axios';

function Chatbot() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isOpen, setIsOpen] = useState(false);  // To track chatbox visibility

  const sendMessage = async () => {
    if (input.trim()) {
      const userMessage = { sender: 'user', text: input };
      setMessages([...messages, userMessage]);

      try {
        const response = await axios.post('https://your-backend-url/chat', { message: input });
        const botMessage = { sender: 'bot', text: response.data.response };
        setMessages([...messages, userMessage, botMessage]);
      } catch (error) {
        console.error("Error sending message", error);
      }

      setInput("");
    }
  };

  return (
    <div>
      {/* Toggle button to open/close chatbox */}
      <button className="toggle-chat-btn" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? 'Close Chat' : 'Chatbot'}
      </button>

      {/* Chatbot container, visible only when isOpen is true */}
      <div className={`chatbot-container ${isOpen ? 'visible' : 'hidden'}`}>
        <div className="chatbot-header">Chat with us!</div>
        <div className="chatbot-messages">
          {messages.map((msg, index) => (
            <div key={index} className={msg.sender === 'user' ? 'user-message' : 'bot-message'}>
              {msg.text}
            </div>
          ))}
        </div>
        <div className="chatbot-input-container">
          <input
            type="text"
            className="chatbot-input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
          />
          <button onClick={sendMessage}>Send</button>
        </div>
      </div>
    </div>
  );
}

export default Chatbot;
