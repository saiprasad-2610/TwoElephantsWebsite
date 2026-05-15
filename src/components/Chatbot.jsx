import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Bot, User, ChevronDown, ChevronUp, RefreshCcw } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import { GoogleGenerativeAI } from "@google/generative-ai";

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const messagesEndRef = useRef(null);
  const location = useLocation();

  // Initialize Gemini
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY || "";
  const genAI = new GoogleGenerativeAI(apiKey);
  // Using gemini-1.5-flash as the primary standard model
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const knowledgeBase = {
    "company_info": {
      "name": "Two Elephants Technologies LLP (TETL)",
      "founded": "Started in 1960 as Pushpa Textile, transitioned to technology infrastructure.",
      "legacy": "65 years of industrial trust and precision.",
      "slogan": "From Looms to Labs.",
      "mission": "To create opportunity in Solapur for local talent to work on global problems, bridging industrial wisdom with digital execution.",
      "vision": "To transform Solapur into a global technology hub while maintaining our heritage of Strength, Care, and Honesty.",
      "headquarters": "Solapur, Maharashtra, India",
      "global_presence": "India, USA (Houston, Texas), Middle East",
      "values": ["Strength", "Care", "Honesty", "Domain Depth", "Long-term Thinking", "Guided Growth"],
      "symbolism": "The Mother Elephant represents 6 decades of industrial wisdom and authority. The Baby Elephant represents the digital future and continuous growth."
    },
    "services": [
      {
        "category": "Enterprise Digital Solutions",
        "description": "Modernizing legacy operations into future-ready digital systems.",
        "items": [
          {"name": "ERP (Enterprise Resource Planning)", "details": "Tailored for Textile, Pharma, BFSI, and SME sectors. Built on 65 years of operational understanding."},
          {"name": "BPM (Business Process Management)", "details": "Streamlining and automating enterprise workflows to eliminate inefficiencies."},
          {"name": "Cloud & Data Engineering", "details": "Migration strategies, data pipelines, and analytics for enterprise decision-making."},
          {"name": "Product Engineering", "details": "End-to-end design and delivery of digital products built for scale."}
        ]
      },
      {
        "category": "Cybersecurity & Compliance",
        "description": "Protecting enterprise data and ensuring regulatory alignment.",
        "items": [
          {"name": "VAPT", "details": "Vulnerability Assessment and Penetration Testing for robust security."},
          {"name": "Regulatory Compliance", "details": "Expertise in RBI, DPDP, FDA, and GMP frameworks."},
          {"name": "SOC Operations", "details": "Continuous threat monitoring and incident readiness."}
        ]
      },
      {
        "category": "Industrial & Building Intelligence",
        "description": "Digitizing and optimizing core building and industrial systems.",
        "items": [
          {"name": "BMS (Building Management System)", "details": "Optimization of HVAC, energy, and lighting. Reduces energy costs by 20-30%."},
          {"name": "FMS (Facility Management System)", "details": "Digital work orders, preventive maintenance, and asset lifecycle tracking."},
          {"name": "FDD (Fault Detection & Diagnostics)", "details": "AI-based anomaly detection reducing unplanned downtime by up to 70%."}
        ]
      },
      {
        "category": "FinTech & Banking",
        "description": "Digital transformation for the financial sector.",
        "items": [
          {"name": "Core Banking Systems", "details": "Purpose-built for cooperative banks and RCBs with regulatory compliance."},
          {"name": "Digital Payments", "details": "RBI-compliant financial product engineering and transaction systems."}
        ]
      }
    ],
    "leadership": [
      {"name": "Prashant Rathi", "role": "Co-Founder & CEO", "bio": "MBA from Sydney. Bridging traditional manufacturing precision with digital execution."},
      {"name": "Sapna Rathi", "role": "Co-Founder", "bio": "Specialist in operational governance, ISO frameworks, and quality standards."},
      {"name": "Anuradha Biswas", "role": "Advisor & Mentor", "bio": "20+ years of leadership at Infosys and VeriFone. Expert in scaling engineering teams."},
      {"name": "Abhik Biswas", "role": "Technology Advisor", "bio": "30+ years of engineering leadership at TCS and Cisco. Expert in large-scale systems."},
      {"name": "Pankaj Rathi", "role": "Overseas Operations", "bio": "Based in Houston, Texas. Leads global shipping and logistics for the energy sector."}
    ],
    "careers": {
      "goal": "Building a team of 500+ professionals in Solapur.",
      "philosophy": "Creating a global technology ecosystem where local talent works on mission-critical global problems.",
      "roles": ["Software Development", "Cybersecurity", "IT Products", "Operations"],
      "current_opportunities": "We are actively hiring for Software Development, Cybersecurity, and IT Product roles in Solapur. Interested candidates can apply via our website or send their CV to info@twoelephants.com."
    },
    "contact": {
      "email": "info@twoelephants.com",
      "phone": ["+91 7507080000", "+91 9405236989"],
      "locations": ["Solapur, Maharashtra, India", "Houston, Texas, USA"]
    },
    "clients": ["IndiGo Airlines", "Akasa Air", "Raymond", "Jindal Steel & Power", "Jockey India", "Myntra", "Maruti Suzuki", "MG Motors", "Sultanate of Brunei"]
  };

  function retrieveContext(query) {
    const lowerQuery = query.toLowerCase();
    
    // For small knowledge bases, it's often better to provide the whole thing 
    // to the LLM so it can reason across all data.
    return JSON.stringify(knowledgeBase, null, 2);
  }

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen, isTyping]);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const welcomeMessage = getWelcomeMessage(location.pathname);
      setTimeout(() => {
        setMessages([{ id: `bot-${Date.now()}`, text: welcomeMessage, sender: 'bot' }]);
      }, 500);
    }
  }, [isOpen]);

  const getWelcomeMessage = (pathname) => {
    const pageMessages = {
      '/': "👋 Welcome to Two Elephants Technologies! I'm TETL. How can I help you today?",
      '/story': "📖 Exploring our story! I can tell you about our journey from looms to labs.",
      '/services': "⚙️ Looking at our services! Which area would you like to dive into?",
      '/contact': "📞 Ready to connect! How can I assist you with reaching our team?",
      '/careers': "🚀 Interested in joining us? We're building a team of 500+ in Solapur!",
    };
    return pageMessages[pathname] || "👋 Hello! I'm TETL. How can I assist you today?";
  };

  const getBotResponse = (userMessage) => {
    const lowerMessage = userMessage.toLowerCase().trim();
    
    // 1. High-Priority Exact Matches
    const normalized = lowerMessage.replace(/[?!.]/g, '');
    const exactPhrases = {
      'hi': "Hello! 👋 I'm **TETL**, your assistant at Two Elephants Technologies. I can help you with our **Services**, **Team**, **Story**, or **Careers**!",
      'hii': "Hello! 👋 I'm **TETL**, your assistant at Two Elephants Technologies. I can help you with our **Services**, **Team**, **Story**, or **Careers**!",
      'hello': "Hello! 👋 I'm **TETL**, your assistant at Two Elephants Technologies. I can help you with our **Services**, **Team**, **Story**, or **Careers**!",
      'services': () => {
        let response = "We provide high-stakes enterprise solutions:\n\n";
        knowledgeBase.services.forEach(s => {
          response += `• **${s.category}**\n`;
        });
        return response;
      },
      'team': () => {
        let response = "Our leadership team includes:\n\n";
        knowledgeBase.leadership.forEach(l => {
          response += `• **${l.name}** (${l.role})\n`;
        });
        return response;
      }
    };

    if (exactPhrases[normalized]) {
      const res = exactPhrases[normalized];
      return typeof res === 'function' ? res() : res;
    }

    // 2. Ultra-Fuzzy Intent Detection
    const hasWord = (fragment) => lowerMessage.includes(fragment);
    
    // Company Overview (Handles: company, comapny, compnay, compay, commpany, what do you do, etc.)
    const isCompanyQuery = (hasWord('comp') || hasWord('compa') || hasWord('comn') || hasWord('coma') || hasWord('busin') || hasWord('tetl') || hasWord('elephant')) && 
                          (hasWord('do') || hasWord('what') || hasWord('about') || hasWord('who') || hasWord('is') || hasWord('detail'));
    
    if (isCompanyQuery || (hasWord('what') && hasWord('you') && hasWord('do'))) {
      return `**Two Elephants Technologies (TETL)** is an enterprise technology firm with a 65-year industrial legacy. We specialize in **ERP**, **Cybersecurity**, **FinTech**, and **Industrial Intelligence**. We bridge "Looms to Labs" by bringing industrial precision to the digital era.`;
    }

    // Team (Handles: team, members, menbers, lead, ceo, founder, who works)
    if (hasWord('team') || hasWord('member') || hasWord('menber') || hasWord('memb') || hasWord('menb') || hasWord('ceo') || hasWord('found') || hasWord('work')) {
      let res = "Our leadership team combines decades of industrial and tech expertise:\n\n";
      knowledgeBase.leadership.forEach(l => res += `• **${l.name}** (${l.role})\n`);
      return res;
    }

    // Services (Handles: service, offer, solution, erp, cyber, bank)
    if (hasWord('servic') || hasWord('offer') || hasWord('solut') || hasWord('erp') || hasWord('cyber') || hasWord('bank') || hasWord('product')) {
      let res = "We offer specialized enterprise solutions in:\n\n";
      knowledgeBase.services.forEach(s => res += `• **${s.category}**\n`);
      res += "\nWhich area would you like to explore in detail?";
      return res;
    }

    // Careers (Handles: career, job, work, hir, role, opportunity, opportunit)
    if (hasWord('career') || hasWord('job') || hasWord('work') || hasWord('hir') || hasWord('role') || hasWord('oppor') || hasWord('open')) {
      return `We are building a team of **500+ professionals** in Solapur! We hire for roles in **Software Dev**, **Cybersecurity**, and **Operations**. Check our Careers page to apply!`;
    }

    // Contact
    if (hasWord('contact') || hasWord('reach') || hasWord('email') || hasWord('phone') || hasWord('locat')) {
      return `📧 Email: **${knowledgeBase.contact.email}**\n📱 Phone: **${knowledgeBase.contact.phone.join(" / ")}**\n📍 Location: **${knowledgeBase.contact.locations[0]}**`;
    }

    return "I'm sorry, I could not find that specific information on our website. Please reach out to us at **info@twoelephants.com** for further assistance.";
  };

  const handleSendMessage = async (text = null) => {
    const userText = text || inputValue.trim();
    if (!userText) return;

    if (!apiKey) {
      console.error("Gemini API Key is missing. Check your .env file.");
      const errorResponse = getBotResponse(userText);
      setMessages(prev => [...prev, { id: `bot-error-${Date.now()}`, text: errorResponse, sender: 'bot' }]);
      setIsTyping(false);
      return;
    }

    if (!text) setInputValue('');
    
    const userMsg = { id: `user-${Date.now()}-${Math.random()}`, text: userText, sender: 'user' };
    setMessages(prev => [...prev, userMsg]);
    setIsTyping(true);

    try {
      // 1. Hardcoded / Fuzzy Match (Highest Priority)
      // This ensures 100% accuracy for core questions even if the API fails
      const botFallback = getBotResponse(userText);
      
      // If the fallback isn't the "I'm sorry" message, it means we found a match!
      if (!botFallback.includes("I'm sorry")) {
        setTimeout(() => {
          setMessages(prev => [...prev, { 
            id: `bot-${Date.now()}-${Math.random()}`, 
            text: botFallback, 
            sender: 'bot' 
          }]);
          setIsTyping(false);
        }, 500);
        return;
      }

      // 2. Gemini RAG (Fallback for complex questions)
      const retrievedContext = retrieveContext(userText);
      
      const systemPrompt = `
        You are the AI assistant for Two Elephants Technologies LLP (TETL).
        
        CRITICAL INSTRUCTIONS:
        1. Answer users ONLY using the provided website context below.
        2. If the user makes spelling mistakes (e.g., "menbers" for members, "comapny" for company), use your intelligence to understand their intent based on the context.
        3. If the answer is unavailable in the context, clearly say: "I'm sorry, I could not find that information on our website."
        4. Be professional, concise, and helpful.
        5. If the user greets you (hello, hi, etc.), respond warmly and mention you are the TETL assistant.
        
        CONTEXT:
        ${retrievedContext || "No specific context found for this query."}
        
        Always stay in character as TETL Assistant.
      `;

      // Build history including current message
      const chatHistory = [];
      let foundFirstUser = false;

      // Add previous messages
      for (const msg of messages) {
        if (msg.sender === 'user') foundFirstUser = true;
        if (foundFirstUser) {
          chatHistory.push({
            role: msg.sender === 'user' ? 'user' : 'model',
            parts: [{ text: msg.text }],
          });
        }
      }

      // Try to get response from Gemini
      let responseText = "";
      try {
        const chat = model.startChat({
          history: chatHistory,
          generationConfig: { maxOutputTokens: 1000, temperature: 0.1 },
        });

        const result = await chat.sendMessage(systemPrompt + "\n\nUser Question: " + userText);
        const response = await result.response;
        responseText = response.text();
      } catch (apiError) {
        console.warn('Primary Gemini model (1.5-flash) failed, trying 1.5-pro...', apiError);
        // Fallback to gemini-1.5-pro which is more stable in some regions
        try {
          const fallbackModel = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });
          const chat = fallbackModel.startChat({
            history: chatHistory,
            generationConfig: { maxOutputTokens: 1000, temperature: 0.1 },
          });
          const result = await chat.sendMessage(systemPrompt + "\n\nUser Question: " + userText);
          const response = await result.response;
          responseText = response.text();
        } catch (innerError) {
          console.error('All Gemini models failed:', innerError);
          // If all AI models fail, use the fuzzy matching logic
          responseText = getBotResponse(userText);
        }
      }

      setMessages(prev => [...prev, { id: `bot-${Date.now()}-${Math.random()}`, text: responseText, sender: 'bot' }]);
    } catch (error) {
      console.error('Gemini API Error:', error);
      // Final fallback if everything fails
      const fallbackResponse = getBotResponse(userText);
      setMessages(prev => [...prev, { 
        id: `bot-error-fallback-${Date.now()}`, 
        text: fallbackResponse, 
        sender: 'bot' 
      }]);
    } finally {
      setIsTyping(false);
    }
  };

  const parseMarkdown = (text) => {
    return text
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\n/g, '<br />');
  };

  const quickActions = [
    { label: 'Services', action: 'Tell me about your services' },
    { label: 'Our Story', action: 'What is your company story?' },
    { label: 'Careers', action: 'Are you hiring in Solapur?' },
    { label: 'Contact', action: 'How can I contact you?' }
  ];

  return (
    <div className="chatbot-container">
      {/* Floating Button */}
      <motion.button
        className="chatbot-trigger"
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {isOpen ? <X /> : <MessageCircle />}
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className={`chatbot-window ${isMinimized ? 'minimized' : ''}`}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
          >
            {/* Header */}
            <div className="chat-header">
              <div className="header-info">
                <div className="bot-icon"><Bot size={20} /></div>
                <div>
                  <h4>TETL Assistant</h4>
                  <span className="status">Online</span>
                </div>
              </div>
              <div className="header-controls">
                <button onClick={() => setIsMinimized(!isMinimized)}>
                  {isMinimized ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
                <button onClick={() => setMessages([])} title="Reset Chat">
                  <RefreshCcw size={16} />
                </button>
              </div>
            </div>

            {!isMinimized && (
              <>
                {/* Message Area */}
                <div className="chat-messages">
                  {messages.map(msg => (
                    <div key={msg.id} className={`message-wrapper ${msg.sender}`}>
                      <div className="message-bubble">
                        <div dangerouslySetInnerHTML={{ __html: parseMarkdown(msg.text) }} />
                      </div>
                    </div>
                  ))}
                  {isTyping && (
                    <div className="message-wrapper bot">
                      <div className="message-bubble typing">
                        <span className="dot"></span>
                        <span className="dot"></span>
                        <span className="dot"></span>
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>

                {/* Quick Actions */}
                {messages.length < 3 && (
                  <div className="quick-actions">
                    {quickActions.map((btn, i) => (
                      <button key={i} onClick={() => handleSendMessage(btn.action)}>
                        {btn.label}
                      </button>
                    ))}
                  </div>
                )}

                {/* Input Area */}
                <div className="chat-input">
                  <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    placeholder="Ask me anything about TETL..."
                  />
                  <button onClick={() => handleSendMessage()} disabled={!inputValue.trim()}>
                    <Send size={18} />
                  </button>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Chatbot;
