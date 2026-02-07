import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Bot, User, Loader2, Sparkles, ChevronRight } from 'lucide-react';
import { Button } from '../components/ui/button';

// Predefined Q&A for instant responses
const predefinedQA = {
  courses: {
    question: "What courses do you offer?",
    answer: "We offer 2 comprehensive programs:\n\n**1. Professional Digital Marketing (4 Months)**\n- Complete A-Z digital marketing\n- SEO, SEM, SMM, Email Marketing\n- AI Tools: ChatGPT, Midjourney\n- Guaranteed Internship at Infopark\n- 15+ Certifications\n\n**2. Advanced AI-Powered Marketing (2 Months)**\n- AI Content Generation\n- Marketing Automation\n- Prompt Engineering\n- Weekend Batches Available\n\nWould you like to know more about any specific course?"
  },
  fees: {
    question: "What are the course fees?",
    answer: "Our course fees are designed to be affordable with flexible options:\n\n💰 **Payment Options:**\n- One-time payment (Special discount)\n- EMI starting from ₹2,999/month\n- No-cost EMI available\n\n🎁 **Current Offers:**\n- Early bird discount for January batch\n- Group enrollment discounts\n- Scholarship for deserving candidates\n\nFor exact pricing, please share your contact details and our counselor will provide personalized quotes."
  },
  duration: {
    question: "How long is the course?",
    answer: "**Course Duration:**\n\n📚 Professional Digital Marketing: **4 Months**\n- Classes: 3-4 days/week\n- 2-3 hours per session\n- Includes 1-month internship\n\n🤖 Advanced AI Marketing: **2 Months**\n- Weekend batches available\n- Intensive hands-on training\n\nBoth courses include lifetime access to course materials and placement support!"
  },
  internship: {
    question: "Tell me about the internship",
    answer: "🏢 **Guaranteed Internship at Infopark!**\n\nEvery student gets:\n- Real work experience at IT companies\n- Live project portfolio\n- Industry mentor guidance\n- Performance-based job conversion\n\n📍 Location: Infopark, Kochi - Kerala's premier IT hub with 400+ companies\n\nThis internship sets us apart from any other academy in Kerala!"
  },
  certifications: {
    question: "What certifications will I get?",
    answer: "🏆 **15+ Industry Certifications:**\n\n**Google Certifications:**\n- Google Ads Search & Display\n- Google Analytics\n- Google Tag Manager\n\n**Meta/Facebook:**\n- Meta Blueprint Certification\n\n**Marketing Tools:**\n- HubSpot Inbound & Content\n- SEMrush SEO Toolkit\n- Canva Pro\n\n**Plus:**\n- Skill India Certificate\n- Skillax Pro Certificate\n- AI Marketing Specialist\n\nAll certifications are globally recognized!"
  },
  placement: {
    question: "Do you provide placement assistance?",
    answer: "✅ **100% Placement Assistance**\n\n**What we offer:**\n- Dedicated placement cell\n- Resume building workshops\n- Mock interview sessions\n- Direct company referrals\n- Lifetime job support\n\n**Our Students Work At:**\n- Infopark IT Companies\n- Digital Marketing Agencies\n- E-commerce Companies\n- Startups & MNCs\n- Freelancing Platforms\n\nMany students get placed even before completing the course!"
  },
  location: {
    question: "Where is the academy located?",
    answer: "📍 **Skillax Digital Marketing Academy**\n\nMananthavady, Wayanad, Kerala 670645\n\n**Why Wayanad?**\n- Peaceful learning environment\n- Away from city distractions\n- Modern facilities\n- Easy accessibility\n\n**Contact:**\n📧 contact@skillax.in\n📱 Click WhatsApp button for instant chat!\n\nWe also have online batch options for those who can't travel."
  },
  ai: {
    question: "What AI tools will I learn?",
    answer: "🤖 **AI Tools Covered:**\n\n**Content Creation:**\n- ChatGPT for copywriting\n- Jasper AI\n- Copy.ai\n\n**Image Generation:**\n- Midjourney\n- DALL-E\n- Canva AI\n\n**Marketing Automation:**\n- AI Email Writers\n- Social Media Schedulers\n- AI Analytics Tools\n\n**Prompt Engineering:**\n- Master the art of AI prompts\n- Create viral content\n- Automate repetitive tasks\n\nBe future-ready with cutting-edge AI skills!"
  }
};

const quickQuestions = [
  { id: 'courses', label: '📚 Courses', icon: '📚' },
  { id: 'fees', label: '💰 Fees', icon: '💰' },
  { id: 'internship', label: '🏢 Internship', icon: '🏢' },
  { id: 'certifications', label: '🏆 Certifications', icon: '🏆' },
  { id: 'placement', label: '💼 Placement', icon: '💼' },
  { id: 'ai', label: '🤖 AI Tools', icon: '🤖' },
];

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: "👋 Hi! I'm Skillax AI Assistant.\n\nI can help you with:\n• Course details & fees\n• Certifications info\n• Internship at Infopark\n• Placement support\n\nTap a quick question below or type your query!",
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const handleQuickQuestion = (id) => {
    const qa = predefinedQA[id];
    if (!qa) return;

    setMessages(prev => [...prev, { role: 'user', content: qa.question }]);
    setIsTyping(true);

    // Simulate typing delay for natural feel
    setTimeout(() => {
      setMessages(prev => [...prev, { role: 'assistant', content: qa.answer }]);
      setIsTyping(false);
    }, 500);
  };

  const sendMessage = async (e) => {
    e?.preventDefault();
    if (!input.trim() || isTyping) return;

    const userMessage = input.trim().toLowerCase();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: input.trim() }]);
    setIsTyping(true);

    // Smart keyword matching for predefined answers
    let response = null;
    
    if (userMessage.includes('course') || userMessage.includes('program') || userMessage.includes('learn')) {
      response = predefinedQA.courses.answer;
    } else if (userMessage.includes('fee') || userMessage.includes('cost') || userMessage.includes('price') || userMessage.includes('pay')) {
      response = predefinedQA.fees.answer;
    } else if (userMessage.includes('duration') || userMessage.includes('long') || userMessage.includes('time') || userMessage.includes('month')) {
      response = predefinedQA.duration.answer;
    } else if (userMessage.includes('intern') || userMessage.includes('infopark') || userMessage.includes('job')) {
      response = predefinedQA.internship.answer;
    } else if (userMessage.includes('certif') || userMessage.includes('google') || userMessage.includes('hubspot')) {
      response = predefinedQA.certifications.answer;
    } else if (userMessage.includes('place') || userMessage.includes('hire') || userMessage.includes('career')) {
      response = predefinedQA.placement.answer;
    } else if (userMessage.includes('where') || userMessage.includes('location') || userMessage.includes('address') || userMessage.includes('wayanad')) {
      response = predefinedQA.location.answer;
    } else if (userMessage.includes('ai') || userMessage.includes('chatgpt') || userMessage.includes('artificial')) {
      response = predefinedQA.ai.answer;
    } else if (userMessage.includes('hi') || userMessage.includes('hello') || userMessage.includes('hey')) {
      response = "Hello! 👋 Welcome to Skillax Academy!\n\nHow can I help you today? You can ask about:\n- Our courses\n- Fees & payment options\n- Internship at Infopark\n- Certifications\n- Placement support\n\nOr tap any quick question below!";
    } else if (userMessage.includes('thank')) {
      response = "You're welcome! 😊\n\nIf you have more questions, feel free to ask. Or you can:\n\n📞 Request a callback\n💬 Chat on WhatsApp\n📧 Email: contact@skillax.in\n\nWe're here to help you start your digital marketing journey!";
    } else {
      response = "Thanks for your question! 🤔\n\nFor detailed information about this, I'd recommend speaking with our counselor.\n\n**Quick Actions:**\n- 📞 Request callback: Share your number\n- 💬 WhatsApp: Click the green button\n- 📧 Email: contact@skillax.in\n\nOr try asking about courses, fees, internship, or certifications!";
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
        return <strong key={i} className="block font-semibold">{line.replace(/\*\*/g, '')}</strong>;
      }
      if (line.startsWith('- ') || line.startsWith('• ')) {
        return <div key={i} className="flex items-start gap-2"><span>•</span><span>{line.slice(2)}</span></div>;
      }
      if (line.includes('**')) {
        const parts = line.split('**');
        return (
          <div key={i}>
            {parts.map((part, j) => j % 2 === 1 ? <strong key={j}>{part}</strong> : part)}
          </div>
        );
      }
      return <div key={i}>{line || <br />}</div>;
    });
  };

  return (
    <>
      {/* Chat Button with Pulse */}
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
        <span className="absolute -top-1 -right-1 flex h-4 w-4">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-amber opacity-75"></span>
          <span className="relative inline-flex rounded-full h-4 w-4 bg-brand-amber"></span>
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
                  <p className="text-xs text-white/80">Always online • Instant replies</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                data-testid="chatbot-close"
                className="p-2 hover:bg-white/20 rounded-full transition-colors"
                aria-label="Close chat"
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
              
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex justify-start"
                >
                  <div className="flex items-center gap-2 bg-card border border-border p-3 rounded-2xl rounded-tl-sm shadow-sm">
                    <div className="flex gap-1">
                      <span className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                      <span className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                      <span className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                    </div>
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Questions */}
            <div className="p-3 border-t border-border bg-card/50">
              <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                {quickQuestions.map((q) => (
                  <button
                    key={q.id}
                    onClick={() => handleQuickQuestion(q.id)}
                    className="px-3 py-1.5 bg-primary/10 hover:bg-primary/20 text-primary rounded-full text-xs font-medium whitespace-nowrap transition-colors flex items-center gap-1"
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
