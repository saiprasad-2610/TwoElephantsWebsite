import { useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  Bot,
  ChevronDown,
  ChevronUp,
  MessageCircle,
  RefreshCcw,
  X,
} from 'lucide-react';
import { useLocation } from 'react-router-dom';
import ChatWindow from './chatbot/ChatWindow';
import getBotResponse from '../utils/getBotResponse';

const RESPONSE_DELAY = 1000;

const getWelcomeMessage = (pathname) => {
  const pageMessages = {
    '/': "Welcome to Two Elephants Technologies! I'm TETL. How can I help you today?",
    '/story': 'Exploring our story! I can tell you about our journey from looms to labs.',
    '/services': 'Looking at our services! Which area would you like to explore?',
    '/contact': 'Ready to connect! How can I assist you with reaching our team?',
    '/careers': "Interested in joining us? We're building a team of 500+ in Solapur.",
  };

  return pageMessages[pathname] || "Hello! I'm TETL. How can I assist you today?";
};

const createMessage = (text, sender) => ({
  id: `${sender}-${Date.now()}-${Math.random()}`,
  text,
  sender,
});

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [responseSuggestions, setResponseSuggestions] = useState([]);
  const messagesEndRef = useRef(null);
  const responseTimerRef = useRef(null);
  const location = useLocation();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen, isTyping]);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const welcomeTimer = setTimeout(() => {
        setMessages([createMessage(getWelcomeMessage(location.pathname), 'bot')]);
      }, 500);

      return () => clearTimeout(welcomeTimer);
    }
  }, [isOpen, location.pathname, messages.length]);

  useEffect(
    () => () => {
      clearTimeout(responseTimerRef.current);
    },
    []
  );

  const handleSendMessage = useCallback(
    (quickReplyText = '') => {
      const userText = (quickReplyText || inputValue).trim();

      if (!userText || isTyping) return;

      setInputValue('');
      setResponseSuggestions([]);
      setMessages((previousMessages) => [
        ...previousMessages,
        createMessage(userText, 'user'),
      ]);
      setIsTyping(true);

      responseTimerRef.current = setTimeout(() => {
        const botResponse = getBotResponse(userText);

        setMessages((previousMessages) => [
          ...previousMessages,
          createMessage(botResponse.answer, 'bot'),
        ]);
        setResponseSuggestions(botResponse.suggestions || []);
        setIsTyping(false);
      }, RESPONSE_DELAY);
    },
    [inputValue, isTyping]
  );

  const handleResetChat = () => {
    clearTimeout(responseTimerRef.current);
    setIsTyping(false);
    setInputValue('');
    setResponseSuggestions([]);
    setMessages([]);
  };

  return (
    <div className="chatbot-container">
      <motion.button
        className="chatbot-trigger"
        type="button"
        onClick={() => setIsOpen((current) => !current)}
        aria-label={isOpen ? 'Close chat assistant' : 'Open chat assistant'}
        aria-expanded={isOpen}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {isOpen ? <X /> : <MessageCircle />}
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className={`chatbot-window ${isMinimized ? 'minimized' : ''}`}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
          >
            <div className="chat-header">
              <div className="header-info">
                <div className="bot-icon">
                  <Bot size={20} />
                </div>
                <div>
                  <h4>TETL Assistant</h4>
                  <span className="status">Online</span>
                </div>
              </div>
              <div className="header-controls">
                <button
                  type="button"
                  onClick={() => setIsMinimized((current) => !current)}
                  aria-label={isMinimized ? 'Expand chat' : 'Minimize chat'}
                >
                  {isMinimized ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
                <button
                  type="button"
                  onClick={handleResetChat}
                  title="Reset Chat"
                  aria-label="Reset chat"
                >
                  <RefreshCcw size={16} />
                </button>
              </div>
            </div>

            {!isMinimized && (
              <ChatWindow
                messages={messages}
                inputValue={inputValue}
                isTyping={isTyping}
                messagesEndRef={messagesEndRef}
                onInputChange={setInputValue}
                onSendMessage={handleSendMessage}
                suggestions={responseSuggestions}
                disabled={isTyping}
              />
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Chatbot;
