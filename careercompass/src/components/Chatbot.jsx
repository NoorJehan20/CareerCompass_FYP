import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { Send, Image, Mic, User, Zap, ChevronDown } from 'lucide-react';
import './Chatbot.css';

const MessageBubble = ({ message }) => {
  const isAI = message.sender === 'ai';
  return (
    <div className={`message-row ${isAI ? 'ai' : 'user'}`}>
      {isAI && (
        <div className="avatar ai-avatar"><Zap /></div>
      )}

      <div className={`bubble ${isAI ? 'ai-bubble' : 'user-bubble'}`}>
        {isAI && <span className="ai-label">Career Compass AI</span>}
        <p>{message.text}</p>
        {isAI && message.sources && (
          <div className="sources">
            <strong>Sources:</strong> {message.sources.join(', ')}
          </div>
        )}
      </div>

      {!isAI && (
        <div className="avatar user-avatar"><User /></div>
      )}
    </div>
  );
};

const Chatbot = () => {
  const chatEndRef = useRef(null);
  const location = useLocation();
  const initialPrompt = location.state?.initialPrompt || '';

  const [messages, setMessages] = useState([
    { id: 1, text: "👋 Hi! I'm your CareerCompass Assistant. How can I help you today?", sender: 'ai' }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [loading, setLoading] = useState(false);

  // Scroll chat to bottom
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Send initial quick prompt automatically
  useEffect(() => {
    if (initialPrompt) {
      setMessages(prev => [...prev, { id: 2, text: initialPrompt, sender: 'user' }]);
      handleInitialPrompt(initialPrompt);
    }
  }, [initialPrompt]);

  const handleInitialPrompt = async (msgText) => {
    setLoading(true);
    try {
      const response = await axios.post('http://127.0.0.1:5000/chat', { message: msgText });
      const aiMsg = {
        id: 3,
        text: response.data.reply || "Sorry, I couldn't get a response.",
        sender: 'ai',
        sources: response.data.sources || []
      };
      setMessages(prev => [...prev, aiMsg]);
    } catch (err) {
      console.error(err);
      setMessages(prev => [
        ...prev,
        { id: 3, text: "⚠️ Error connecting to backend. Please try again.", sender: 'ai' }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const sendMessage = async (msgText = null) => {
    const textToSend = msgText || inputMessage.trim();
    if (!textToSend) return;

    const userMsg = { id: messages.length + 1, text: textToSend, sender: 'user' };
    setMessages(prev => [...prev, userMsg]);
    if (!msgText) setInputMessage('');
    setLoading(true);

    try {
      const response = await axios.post('http://127.0.0.1:5000/chat', { message: textToSend });
      const aiMsg = {
        id: messages.length + 2,
        text: response.data.reply || "Sorry, I couldn't get a response.",
        sender: 'ai',
        sources: response.data.sources || []
      };
      setMessages(prev => [...prev, aiMsg]);
    } catch (err) {
      console.error(err);
      setMessages(prev => [
        ...prev,
        { id: messages.length + 2, text: "⚠️ Error connecting to backend. Please try again.", sender: 'ai' }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleSpecialAction = (action) => alert(`Action triggered: ${action}`);

  return (
    <div className="chat-container">
      <div className="chat-card">
        <div className="chat-header">
          <h1>Advice Hub: AI Career Advisor</h1>
          <div className="model-badge">
            Model: Flash ⚡ <ChevronDown className="chevron" />
          </div>
        </div>

        <div className="chat-log">
          {messages.map(msg => <MessageBubble key={msg.id} message={msg} />)}
          {loading && <div className="bubble ai-bubble loading">Generating response...</div>}
          <div ref={chatEndRef} />
        </div>

        <div className="chat-input-area">
          <button onClick={() => handleSpecialAction('Image Upload')} className="icon-btn"><Image /></button>
          <button onClick={() => handleSpecialAction('Mic Input')} className="icon-btn"><Mic /></button>
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter') sendMessage(); }}
            placeholder="Type your career question..."
          />
          <button onClick={() => sendMessage()} className="send-btn" disabled={!inputMessage.trim()}><Send /></button>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
