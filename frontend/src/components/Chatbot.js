import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Bot, User, Sparkles, CheckCircle } from 'lucide-react';
import { Button } from '../components/ui/button';
import axios from 'axios';

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

// Predefined Q&A for instant responses
const predefinedQA = {
  courses: {
    question: "What courses do you offer?",
    answer: "We offer 2 comprehensive programs:\n\n**1. Professional Digital Marketing (4 Months)**\n- SEO, AEO, GEO Optimization\n- Google Ads, Meta Ads & ChatGPT Ads\n- 30+ AI Tools: ChatGPT, Perplexity, Gemini, Copilot, Grok\n- Reddit & Quora Marketing\n- Guaranteed Internship at Infopark\n- 30+ Certifications\n\n**2. Advanced AI-Powered Marketing (2 Months)**\n- All major AI tools mastery\n- AEO & GEO Optimization\n- Marketing Automation\n- Weekend Batches Available\n- 15 Certifications\n\nWhich one interests you more?"
  },
  fees: {
    question: "What are the course fees?",
    answer: "💰 **Flexible Payment Options:**\n\n- One-time payment (Special discount!)\n- EMI options available\n- No-cost EMI available\n\n🎁 **March 2026 Batch Offers:**\n- Early bird discount: 15% OFF\n- Group enrollment discounts\n- Scholarship for deserving candidates\n\n👉 Share your details and our counselor will provide personalized pricing!"
  },
  duration: {
    question: "How long is the course?",
    answer: "**Course Duration:**\n\n📚 **Professional Digital Marketing:** 4 Months\n- Classes: 3-4 days/week\n- 2-3 hours per session\n- Includes 1-month Infopark internship\n\n🤖 **Advanced AI Marketing:** 2 Months\n- Weekend batches available\n- Intensive hands-on training\n\n**March 2026 batch** enrolling now! Limited seats."
  },
  internship: {
    question: "Tell me about the internship",
    answer: "🏢 **Guaranteed Internship at Infopark!**\n\nEvery Professional course student gets:\n- Real work experience at IT companies\n- Live project portfolio building\n- Industry mentor guidance\n- Performance-based job conversion\n\n📍 **Infopark, Kochi** - Kerala's premier IT hub with 400+ companies!\n\nThis is what makes Skillax different from others!"
  },
  certifications: {
    question: "What certifications will I get?",
    answer: "🏆 **30+ Industry Certifications:**\n\n**Google Certifications:**\n- Google Ads Search & Display\n- Google Analytics 4\n- Google Tag Manager\n\n**Meta/Facebook:**\n- Meta Blueprint Certification\n\n**Marketing Tools:**\n- HubSpot Inbound & Content\n- SEMrush SEO Toolkit\n- Canva Pro\n- Mailchimp\n\n**AI & More:**\n- Skillax AI Expert\n- Skill India Certificate\n\nAll globally recognized!"
  },
  placement: {
    question: "Do you provide placement support?",
    answer: "✅ **100% Placement Assistance**\n\n**What we offer:**\n- Dedicated placement cell\n- Resume building workshops\n- Mock interview sessions\n- Direct company referrals\n- Lifetime job support\n\n**Career Options After Course:**\n- Digital Marketing Manager\n- SEO Specialist\n- Social Media Manager\n- Freelancer (Earn in USD!)\n- Start your own agency\n\nMany get placed during internship itself!"
  },
  location: {
    question: "Where is the academy located?",
    answer: "📍 **Skillax Digital Marketing Academy**\n\nMananthavady, Wayanad, Kerala 670645\n\n**Why Wayanad?**\n- Peaceful learning environment\n- Away from city distractions\n- Modern facilities\n- Easy accessibility\n\n**Also Available:**\n- Online live classes\n- Hybrid mode option\n\n📧 contact@skillax.in"
  },
  ai: {
    question: "What AI tools will I learn?",
    answer: "🤖 **30+ AI Tools:**\n\n**Conversational AI:**\n- ChatGPT (OpenAI)\n- Perplexity\n- Google Gemini\n- Microsoft Copilot\n- X/Twitter Grok\n- Claude (Anthropic)\n\n**Automation:**\n- ManyChat\n- Zoho CRM\n- GitHub Copilot\n\n**Image Generation:**\n- Midjourney, DALL-E, Canva AI\n\n**Plus:** Our proprietary Skillax tools for lead gen, SEO, and content!\n\nBe future-ready with cutting-edge AI skills!"
  },
  batch: {
    question: "When is the next batch?",
    answer: "📅 **March 2026 Batch**\n\n**Batch Timings Available:**\n- Morning: 9 AM - 12 PM\n- Afternoon: 2 PM - 5 PM\n- Evening: 6 PM - 9 PM\n- Weekend: Saturday & Sunday\n\n⚡ **Limited Seats!** Only 15 students per batch.\n\n🎁 Early bird discount available for March batch!\n\nShare your contact for priority enrollment."
  }
};

const quickQuestions = [
  { id: 'courses', label: '📚 Courses' },
  { id: 'fees', label: '💰 Fees' },
  { id: 'internship', label: '🏢 Internship' },
  { id: 'certifications', label: '🏆 30+ Certs' },
  { id: 'ai', label: '🤖 AI Tools' },
  { id: 'batch', label: '📅 Next Batch' },
];

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: "👋 Hi! I'm Skillax AI Assistant.\n\n**March 2026 batch** enrolling now!\n\nI can help you with:\n• Course details (2 programs)\n• 30+ Certifications\n• Infopark Internship\n• 30+ AI Tools (ChatGPT, Perplexity, etc.)\n\nTap a quick question or type below!",
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showLeadForm, setShowLeadForm] = useState(false);
  const [leadData, setLeadData] = useState({ name: '', phone: '', email: '' });
  const [leadSubmitted, setLeadSubmitted] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, showLeadForm]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  // Show lead form after 3 messages
  useEffect(() => {
    const userMessages = messages.filter(m => m.role === 'user').length;
    if (userMessages >= 2 && !leadSubmitted && !showLeadForm) {
      setTimeout(() => {
        setShowLeadForm(true);
        setMessages(prev => [...prev, {
          role: 'assistant',
          content: "I'd love to help you further! 📞\n\nShare your details and our counselor will:\n- Provide exact fee details\n- Answer specific questions\n- Help with enrollment\n\n👇 Fill the form below:"
        }]);
      }, 1000);
    }
  }, [messages, leadSubmitted, showLeadForm]);

  const handleQuickQuestion = (id) => {
    const qa = predefinedQA[id];
    if (!qa) return;

    setMessages(prev => [...prev, { role: 'user', content: qa.question }]);
    setIsTyping(true);

    setTimeout(() => {
      setMessages(prev => [...prev, { role: 'assistant', content: qa.answer }]);
      setIsTyping(false);
    }, 500);
  };

  const submitLead = async () => {
    if (!leadData.name || !leadData.phone) return;

    try {
      await axios.post(`${API}/leads`, {
        name: leadData.name,
        email: leadData.email || `${leadData.phone}@chatbot.skillax.in`,
        phone: leadData.phone,
        interest: 'Course Inquiry',
        source: 'chatbot',
        message: 'Lead captured via chatbot'
      });

      setLeadSubmitted(true);
      setShowLeadForm(false);
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: `Thanks ${leadData.name}! 🎉\n\nYour details have been saved. Our counselor will call you within 24 hours.\n\n**What you'll get:**\n- Exact course fees\n- Scholarship options\n- March 2026 batch details\n\nAnything else I can help with?`
      }]);
    } catch (error) {
      console.error('Lead submission error:', error);
    }
  };

  const sendMessage = async (e) => {
    e?.preventDefault();
    if (!input.trim() || isTyping) return;

    const userMessage = input.trim().toLowerCase();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: input.trim() }]);
    setIsTyping(true);

    // Smart keyword matching
    let response = null;
    
    if (userMessage.includes('course') || userMessage.includes('program') || userMessage.includes('learn')) {
      response = predefinedQA.courses.answer;
    } else if (userMessage.includes('fee') || userMessage.includes('cost') || userMessage.includes('price') || userMessage.includes('pay')) {
      response = predefinedQA.fees.answer;
    } else if (userMessage.includes('duration') || userMessage.includes('long') || userMessage.includes('month')) {
      response = predefinedQA.duration.answer;
    } else if (userMessage.includes('intern') || userMessage.includes('infopark') || userMessage.includes('job')) {
      response = predefinedQA.internship.answer;
    } else if (userMessage.includes('certif') || userMessage.includes('google') || userMessage.includes('hubspot')) {
      response = predefinedQA.certifications.answer;
    } else if (userMessage.includes('place') || userMessage.includes('hire') || userMessage.includes('career') || userMessage.includes('salary')) {
      response = predefinedQA.placement.answer;
    } else if (userMessage.includes('where') || userMessage.includes('location') || userMessage.includes('address') || userMessage.includes('wayanad')) {
      response = predefinedQA.location.answer;
    } else if (userMessage.includes('ai') || userMessage.includes('chatgpt') || userMessage.includes('perplexity') || userMessage.includes('gemini') || userMessage.includes('grok')) {
      response = predefinedQA.ai.answer;
    } else if (userMessage.includes('batch') || userMessage.includes('start') || userMessage.includes('when') || userMessage.includes('timing')) {
      response = predefinedQA.batch.answer;
    } else if (userMessage.includes('hi') || userMessage.includes('hello') || userMessage.includes('hey')) {
      response = "Hello! 👋 Welcome to Skillax Academy!\n\n**March 2026 batch** is now open!\n\nI can tell you about:\n- Our 2 courses (4 months & 2 months)\n- 30+ certifications\n- Infopark internship\n- AI tools we teach\n\nWhat would you like to know?";
    } else if (userMessage.includes('thank')) {
      response = "You're welcome! 😊\n\nIf you have more questions, feel free to ask.\n\nOr you can:\n📞 Request a callback\n💬 Chat on WhatsApp\n📧 Email: contact@skillax.in\n\nGood luck with your digital marketing journey!";
    } else if (userMessage.includes('seo') || userMessage.includes('aeo') || userMessage.includes('geo')) {
      response = "We cover ALL three optimization types:\n\n**SEO** - Search Engine Optimization\n- Google, Bing rankings\n\n**AEO** - Answer Engine Optimization\n- ChatGPT, Perplexity visibility\n\n**GEO** - Generative Engine Optimization\n- AI-generated search results\n\nThis is the future of search! We're one of the few academies teaching this.";
    } else {
      response = "Great question! 🤔\n\nFor detailed info about this, I'd recommend speaking with our counselor.\n\nOr try asking about:\n- Our courses\n- 30+ certifications\n- Infopark internship\n- AI tools (ChatGPT, etc.)\n- Next batch dates\n\nI'm here to help!";
    }

    setTimeout(() => {
      setMessages(prev => [...prev, { role: 'assistant', content: response }]);
      setIsTyping(false);
    }, 600);
  };

  // Format message with markdown-like styling
  const formatMessage = (content) => {
    return content.split('\n').map((line, i) => {
      if (line.startsWith('**') && line.endsWith('**')) {
        return <strong key={i} className="block font-semibold text-primary">{line.replace(/\*\*/g, '')}</strong>;
      }
      if (line.startsWith('- ') || line.startsWith('• ')) {
        return <div key={i} className="flex items-start gap-2 ml-2"><span className="text-primary">•</span><span>{line.slice(2)}</span></div>;
      }
      if (line.includes('**')) {
        const parts = line.split('**');
        return (
          <div key={i}>
            {parts.map((part, j) => j % 2 === 1 ? <strong key={j} className="text-primary">{part}</strong> : part)}
          </div>
        );
      }
      return <div key={i}>{line || <br />}</div>;
    });
  };

  return (
    <>
      {/* Chat Button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(true)}
        data-testid="chatbot-trigger"
        className={`fixed bottom-24 right-6 z-40 p-4 bg-gradient-to-br from-primary to-brand-indigo text-white rounded-full shadow-lg hover:shadow-xl transition-all ${
          isOpen ? 'hidden' : ''
        }`}
        aria-label="Open chat"
      >
        <MessageCircle className="h-6 w-6" />
        <span className="absolute -top-1 -right-1 flex h-5 w-5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-amber opacity-75"></span>
          <span className="relative inline-flex rounded-full h-5 w-5 bg-brand-amber text-[10px] font-bold items-center justify-center">1</span>
        </span>
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.8 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed bottom-6 right-6 z-50 w-[400px] max-w-[calc(100vw-48px)] h-[600px] max-h-[calc(100vh-100px)] bg-card border border-border rounded-3xl shadow-2xl flex flex-col overflow-hidden"
            data-testid="chatbot-window"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-primary to-brand-indigo p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="p-2.5 bg-white/20 rounded-full">
                    <Bot className="h-6 w-6 text-white" />
                  </div>
                  <span className="absolute bottom-0 right-0 w-3 h-3 bg-brand-success rounded-full border-2 border-white"></span>
                </div>
                <div>
                  <h3 className="font-heading font-bold text-white flex items-center gap-2">
                    Skillax AI
                    <Sparkles className="h-4 w-4" />
                  </h3>
                  <p className="text-xs text-white/80">Online • Instant replies</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                data-testid="chatbot-close"
                className="p-2 hover:bg-white/20 rounded-full transition-colors"
              >
                <X className="h-5 w-5 text-white" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-muted/30">
              {messages.map((msg, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`flex items-start gap-2 max-w-[85%] ${
                      msg.role === 'user' ? 'flex-row-reverse' : ''
                    }`}
                  >
                    <div
                      className={`p-1.5 rounded-full shrink-0 ${
                        msg.role === 'user' ? 'bg-primary' : 'bg-gradient-to-br from-primary to-brand-indigo'
                      }`}
                    >
                      {msg.role === 'user' ? (
                        <User className="h-4 w-4 text-white" />
                      ) : (
                        <Bot className="h-4 w-4 text-white" />
                      )}
                    </div>
                    <div
                      className={`p-3 rounded-2xl text-sm ${
                        msg.role === 'user'
                          ? 'bg-primary text-primary-foreground rounded-tr-sm'
                          : 'bg-card border border-border rounded-tl-sm shadow-sm'
                      }`}
                    >
                      {msg.role === 'user' ? msg.content : formatMessage(msg.content)}
                    </div>
                  </div>
                </motion.div>
              ))}
              
              {/* Lead Form */}
              {showLeadForm && !leadSubmitted && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-card border-2 border-primary/20 rounded-2xl p-4 space-y-3"
                >
                  <input
                    type="text"
                    placeholder="Your Name *"
                    value={leadData.name}
                    onChange={(e) => setLeadData({ ...leadData, name: e.target.value })}
                    className="w-full px-4 py-2 bg-muted rounded-lg text-sm outline-none focus:ring-2 focus:ring-primary/20"
                    data-testid="chatbot-lead-name"
                  />
                  <input
                    type="tel"
                    placeholder="Phone Number *"
                    value={leadData.phone}
                    onChange={(e) => setLeadData({ ...leadData, phone: e.target.value })}
                    className="w-full px-4 py-2 bg-muted rounded-lg text-sm outline-none focus:ring-2 focus:ring-primary/20"
                    data-testid="chatbot-lead-phone"
                  />
                  <input
                    type="email"
                    placeholder="Email (optional)"
                    value={leadData.email}
                    onChange={(e) => setLeadData({ ...leadData, email: e.target.value })}
                    className="w-full px-4 py-2 bg-muted rounded-lg text-sm outline-none focus:ring-2 focus:ring-primary/20"
                  />
                  <Button
                    onClick={submitLead}
                    className="w-full bg-primary hover:bg-primary/90 rounded-full"
                    disabled={!leadData.name || !leadData.phone}
                    data-testid="chatbot-lead-submit"
                  >
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Get Callback
                  </Button>
                  <button
                    onClick={() => setShowLeadForm(false)}
                    className="w-full text-xs text-muted-foreground hover:text-foreground"
                  >
                    Skip for now
                  </button>
                </motion.div>
              )}
              
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex justify-start"
                >
                  <div className="flex items-center gap-2 bg-card border border-border p-3 rounded-2xl rounded-tl-sm shadow-sm">
                    <div className="flex gap-1">
                      <span className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                      <span className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                      <span className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Questions */}
            <div className="p-3 border-t border-border bg-card/50">
              <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
                {quickQuestions.map((q) => (
                  <button
                    key={q.id}
                    onClick={() => handleQuickQuestion(q.id)}
                    className="px-3 py-1.5 bg-primary/10 hover:bg-primary/20 text-primary rounded-full text-xs font-medium whitespace-nowrap transition-colors"
                  >
                    {q.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Input */}
            <form onSubmit={sendMessage} className="p-4 border-t border-border bg-card">
              <div className="flex items-center gap-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type your question..."
                  data-testid="chatbot-input"
                  className="flex-1 bg-muted rounded-full px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                  disabled={isTyping}
                />
                <Button
                  type="submit"
                  size="icon"
                  data-testid="chatbot-send"
                  className="rounded-full bg-gradient-to-br from-primary to-brand-indigo hover:opacity-90 shrink-0 h-11 w-11"
                  disabled={isTyping || !input.trim()}
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
