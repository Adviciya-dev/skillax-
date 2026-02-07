import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { 
  ArrowRight, GraduationCap, Users, Award, Briefcase, 
  BookOpen, Cpu, Star, ChevronRight, MapPin, Play, CheckCircle, 
  TrendingUp, Target, Zap, X, Upload, Linkedin, Sparkles,
  Bot, Building, Clock, BadgeCheck, Rocket, Brain, Globe,
  MessageSquare, FileText, BarChart3, Search, Heart, 
  ExternalLink, ArrowUpRight, Percent, DollarSign, Eye
} from 'lucide-react';
import { Button } from '../components/ui/button';
import LeadForm from '../components/LeadForm';

// Fresh high-quality images
const images = {
  hero1: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1200&q=80",
  hero2: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=1200&q=80",
  student1: "https://images.unsplash.com/photo-1632647895256-3f75c1865a0f?w=800&q=80",
  student2: "https://images.unsplash.com/photo-1603201667141-5a2d4c673378?w=800&q=80",
  dashboard: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
  aiMarketing: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80",
  teamwork: "https://images.unsplash.com/photo-1653669487404-09c3617c2b6c?w=800&q=80",
  office: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80",
};

// 25+ Certification logos with proper URLs
const certificationLogos = [
  { name: 'Google Ads', logo: 'https://www.gstatic.com/images/branding/product/2x/google_ads_64dp.png' },
  { name: 'Meta', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Facebook_Logo_%282019%29.png/600px-Facebook_Logo_%282019%29.png' },
  { name: 'HubSpot', logo: 'https://www.hubspot.com/hubfs/HubSpot_Logos/HubSpot-Inversed-Favicon.png' },
  { name: 'SEMrush', logo: 'https://cdn.semrush.com/static/index/semrush-logo.svg' },
  { name: 'Google Analytics', logo: 'https://www.gstatic.com/analytics-suite/header/suite/v2/ic_analytics.svg' },
  { name: 'LinkedIn', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/LinkedIn_logo_initials.png/600px-LinkedIn_logo_initials.png' },
  { name: 'Canva', logo: 'https://upload.wikimedia.org/wikipedia/commons/0/08/Canva_icon_2021.svg' },
  { name: 'Mailchimp', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/76/Mailchimp_2018.svg/512px-Mailchimp_2018.svg.png' },
  { name: 'Ahrefs', logo: 'https://ahrefs.com/favicon-32x32.png' },
  { name: 'Moz', logo: 'https://moz.com/favicon.ico' },
  { name: 'Hootsuite', logo: 'https://hootsuite.com/favicon.ico' },
  { name: 'Buffer', logo: 'https://buffer.com/static/icons/favicon-32x32.png' },
  { name: 'Skill India', logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/d/df/Skill_India.png/220px-Skill_India.png' },
];

// Two courses only
const courses = [
  {
    id: 'professional',
    title: 'Professional Digital Marketing',
    duration: '4 Months',
    icon: Rocket,
    color: 'from-blue-600 to-indigo-600',
    bgColor: 'bg-gradient-to-br from-blue-500/10 to-indigo-500/10',
    description: 'Complete A-Z digital marketing mastery with AI tools, live projects & guaranteed internship at Infopark IT company.',
    highlights: [
      'SEO, AEO, GEO Optimization',
      'Google Ads & Meta Ads Mastery',
      'ChatGPT Ads (Next Big Trend!)',
      'AI Tools: ChatGPT, Perplexity, Gemini, Copilot, Grok',
      'Reddit & Quora Marketing',
      'Guaranteed Internship at Infopark',
    ],
    certifications: 8,
  },
  {
    id: 'advanced',
    title: 'Advanced AI-Powered Marketing',
    duration: '2 Months',
    icon: Brain,
    color: 'from-purple-600 to-pink-600',
    bgColor: 'bg-gradient-to-br from-purple-500/10 to-pink-500/10',
    description: 'Master cutting-edge AI marketing tools and automation. Perfect for working professionals wanting to upskill.',
    highlights: [
      'ChatGPT, Perplexity, Copilot, Gemini, Grok',
      'AI Content & Image Generation',
      'Answer Engine Optimization (AEO)',
      'Marketing Automation',
      'Prompt Engineering Mastery',
      'Weekend Batches Available',
    ],
    certifications: 5,
  },
];

// Digital Transformation Statistics
const stats = [
  { number: 87, suffix: '%', label: 'Companies using AI by 2025', icon: Brain },
  { number: 4.4, suffix: 'T', label: 'Digital Ad Spend by 2027', icon: DollarSign },
  { number: 73, suffix: '%', label: 'Jobs need Digital Skills', icon: Briefcase },
  { number: 156, suffix: '%', label: 'AI Marketing Growth', icon: TrendingUp },
];

// AI Search Queries for typing animation
const searchQueries = [
  "best digital marketing course in Kerala",
  "learn Google Ads near Wayanad",
  "ChatGPT Ads training India",
  "SEO AEO GEO course Kerala",
  "AI marketing certification",
  "Meta Ads course Mananthavady",
  "digital marketing internship Infopark",
  "Perplexity marketing training",
  "learn Gemini AI for marketing",
  "Grok AI course India",
  "Reddit Quora marketing course",
];

// Animated counter
function AnimatedCounter({ target, suffix = '', duration = 2000, decimals = 0 }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;
    let startTime = null;
    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const value = progress * target;
      setCount(decimals > 0 ? parseFloat(value.toFixed(decimals)) : Math.floor(value));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [isInView, target, duration, decimals]);

  return <span ref={ref}>{count}{suffix}</span>;
}

// Animated section wrapper with lazy loading
function AnimatedSection({ children, className = '', delay = 0 }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// AI Search Demo Component (like aivisibility.adviciya.com)
function AISearchDemo() {
  const [currentQuery, setCurrentQuery] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isTyping, setIsTyping] = useState(true);
  const [showResult, setShowResult] = useState(false);

  useEffect(() => {
    const query = searchQueries[currentQuery];
    let timeout;

    if (isTyping) {
      if (displayText.length < query.length) {
        timeout = setTimeout(() => {
          setDisplayText(query.slice(0, displayText.length + 1));
        }, 40);
      } else {
        timeout = setTimeout(() => {
          setShowResult(true);
          setTimeout(() => {
            setShowResult(false);
            setIsTyping(false);
          }, 2500);
        }, 500);
      }
    } else {
      if (displayText.length > 0) {
        timeout = setTimeout(() => {
          setDisplayText(displayText.slice(0, -1));
        }, 20);
      } else {
        setCurrentQuery((prev) => (prev + 1) % searchQueries.length);
        setIsTyping(true);
      }
    }

    return () => clearTimeout(timeout);
  }, [displayText, isTyping, currentQuery]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
      className="max-w-2xl mx-auto mt-12"
    >
      {/* Browser Window */}
      <div className="bg-card border-2 border-border rounded-2xl shadow-2xl overflow-hidden">
        {/* Browser Header */}
        <div className="bg-muted/50 px-4 py-3 flex items-center gap-4 border-b border-border">
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-red-400" />
            <div className="w-3 h-3 rounded-full bg-yellow-400" />
            <div className="w-3 h-3 rounded-full bg-green-400" />
          </div>
          <div className="flex-1 flex justify-center">
            <span className="px-4 py-1 bg-card rounded-full text-xs font-medium text-muted-foreground border border-border">
              ChatGPT / Perplexity / Gemini / Grok
            </span>
          </div>
        </div>

        {/* Search Content */}
        <div className="p-6 space-y-6">
          {/* User Query */}
          <div className="flex items-start gap-4">
            <div className="p-3 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full shrink-0">
              <Search className="h-5 w-5 text-white" />
            </div>
            <div className="flex-1">
              <span className="text-xs text-muted-foreground">User is asking...</span>
              <div className="mt-1 text-lg font-semibold min-h-[28px]">
                "{displayText}<span className="animate-pulse text-primary">|</span>"
              </div>
              <div className="mt-2 flex gap-2">
                <span className="px-2 py-0.5 bg-primary/10 text-primary text-xs rounded-full">Digital Marketing</span>
                <span className="px-2 py-0.5 bg-brand-amber/10 text-brand-amber text-xs rounded-full">Kerala</span>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-border" />

          {/* AI Response */}
          <AnimatePresence>
            {showResult && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="flex items-start gap-4"
              >
                <div className="p-3 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full shrink-0">
                  <Bot className="h-5 w-5 text-white" />
                </div>
                <div className="flex-1">
                  <span className="text-xs text-muted-foreground">AI recommends...</span>
                  <div className="mt-2 p-4 bg-brand-success/5 border border-brand-success/20 rounded-xl">
                    <div className="flex items-center gap-2 mb-2">
                      <BadgeCheck className="h-5 w-5 text-brand-success" />
                      <span className="font-semibold text-brand-success">Skillax Academy, Wayanad</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Top-rated digital marketing academy with AI-powered curriculum, 25+ certifications, 
                      and guaranteed internship at Infopark.
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {!showResult && (
            <div className="flex items-center gap-3 text-muted-foreground">
              <Bot className="h-5 w-5" />
              <span className="text-sm">AI is searching...</span>
              <div className="flex gap-1">
                <span className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <span className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <span className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

// Career Assessment Modal
function CareerAssessmentModal({ isOpen, onClose }) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    experience: '',
    goal: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      // Submit lead to backend
      await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/leads`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          interest: formData.goal,
          source: 'career_assessment',
          message: `Experience: ${formData.experience}, Goal: ${formData.goal}`
        })
      });
    } catch (error) {
      console.error('Error submitting lead:', error);
    }
    setIsSubmitting(false);
    setStep(4);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-card border border-border rounded-3xl p-8 max-w-lg w-full shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-br from-primary to-brand-indigo rounded-xl">
                <Sparkles className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="font-heading font-bold text-xl">Career Assessment</h3>
                <p className="text-xs text-muted-foreground">Step {step} of 4</p>
              </div>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-muted rounded-full transition-colors">
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-muted rounded-full h-2 mb-6">
            <motion.div 
              className="bg-gradient-to-r from-primary to-brand-amber h-2 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${(step / 4) * 100}%` }}
            />
          </div>

          {step === 1 && (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
              <p className="text-muted-foreground">Get personalized course recommendations. Your future starts here!</p>
              <input
                type="text"
                placeholder="Your Full Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full input-base"
                data-testid="assessment-name"
              />
              <input
                type="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full input-base"
                data-testid="assessment-email"
              />
              <input
                type="tel"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full input-base"
                data-testid="assessment-phone"
              />
              <Button 
                onClick={() => setStep(2)} 
                className="w-full bg-primary hover:bg-primary/90 rounded-full"
                disabled={!formData.name || !formData.email || !formData.phone}
              >
                Continue <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
              <p className="text-muted-foreground">What's your current situation?</p>
              <div className="grid grid-cols-2 gap-3">
                {['Student/Fresher (18-25)', 'Working Professional', 'Business Owner', 'Career Change (25+)'].map((exp) => (
                  <button
                    key={exp}
                    onClick={() => setFormData({ ...formData, experience: exp })}
                    className={`p-4 rounded-xl border-2 text-left text-sm transition-all ${
                      formData.experience === exp 
                        ? 'border-primary bg-primary/5' 
                        : 'border-border hover:border-primary/50'
                    }`}
                  >
                    {exp}
                  </button>
                ))}
              </div>
              <Button 
                onClick={() => setStep(3)} 
                className="w-full bg-primary hover:bg-primary/90 rounded-full"
                disabled={!formData.experience}
              >
                Continue <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
              <p className="text-muted-foreground">What's your primary goal?</p>
              <div className="space-y-3">
                {[
                  'Get a high-paying digital marketing job',
                  'Start freelancing & work from anywhere',
                  'Grow my business with AI marketing',
                  'Master AI tools (ChatGPT, Perplexity, etc.)',
                ].map((goal) => (
                  <button
                    key={goal}
                    onClick={() => setFormData({ ...formData, goal })}
                    className={`w-full p-4 rounded-xl border-2 text-left transition-all ${
                      formData.goal === goal 
                        ? 'border-primary bg-primary/5' 
                        : 'border-border hover:border-primary/50'
                    }`}
                  >
                    {goal}
                  </button>
                ))}
              </div>
              <Button 
                onClick={handleSubmit} 
                className="w-full bg-primary hover:bg-primary/90 rounded-full"
                disabled={!formData.goal || isSubmitting}
              >
                {isSubmitting ? 'Processing...' : 'Get My Recommendation'} <Sparkles className="ml-2 h-4 w-4" />
              </Button>
            </motion.div>
          )}

          {step === 4 && (
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center space-y-4">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-brand-success/10 rounded-full">
                <CheckCircle className="h-10 w-10 text-brand-success" />
              </div>
              <h4 className="font-heading font-bold text-2xl">Perfect Match Found!</h4>
              <p className="text-muted-foreground">
                Based on your profile, we recommend our <strong className="text-primary">Professional Digital Marketing</strong> course.
              </p>
              <div className="p-4 bg-primary/5 rounded-xl border border-primary/20 text-left">
                <p className="text-sm">
                  <strong>What's next?</strong><br />
                  Our counselor will contact you within 24 hours with:
                </p>
                <ul className="mt-2 text-sm text-muted-foreground space-y-1">
                  <li>• Personalized learning path</li>
                  <li>• Fee structure & scholarship options</li>
                  <li>• March 2025 batch details</li>
                </ul>
              </div>
              <Button onClick={onClose} className="w-full bg-primary hover:bg-primary/90 rounded-full">
                Done
              </Button>
            </motion.div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

// Marquee component for certifications
function CertificationMarquee() {
  return (
    <div className="relative overflow-hidden py-4">
      <div className="flex animate-marquee">
        {[...certificationLogos, ...certificationLogos, ...certificationLogos].map((cert, i) => (
          <div
            key={i}
            className="flex items-center gap-3 px-6 py-3 mx-3 bg-card rounded-xl border border-border shrink-0 hover:border-primary/30 transition-colors"
          >
            <img 
              src={cert.logo} 
              alt={cert.name} 
              className="h-8 w-8 object-contain"
              loading="lazy"
            />
            <span className="font-medium whitespace-nowrap">{cert.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Home() {
  const [showAssessment, setShowAssessment] = useState(false);

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center pt-20 pb-12 overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-primary/5">
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-brand-amber/10 rounded-full blur-3xl animate-pulse animation-delay-1000" />
        </div>

        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgwLDAsMCwwLjAzKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-50" />

        <div className="container-custom relative z-10">
          <div className="text-center max-w-5xl mx-auto">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-brand-amber/10 border border-brand-amber/30 rounded-full mb-6"
            >
              <Sparkles className="h-4 w-4 text-brand-amber" />
              <span className="text-sm font-medium text-brand-amber">March 2025 Batch - Enrolling Now!</span>
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6"
            >
              When People Search with AI,{' '}
              <span className="relative">
                <span className="gradient-text">Are You the Answer?</span>
                <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 300 12" fill="none">
                  <path d="M2 10C50 4 100 4 150 6C200 8 250 4 298 8" stroke="url(#gradient)" strokeWidth="3" strokeLinecap="round"/>
                  <defs>
                    <linearGradient id="gradient" x1="0" y1="0" x2="300" y2="0">
                      <stop stopColor="#2B2D9C"/>
                      <stop offset="1" stopColor="#F59E0B"/>
                    </linearGradient>
                  </defs>
                </svg>
              </span>
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-lg md:text-xl text-muted-foreground mb-6 max-w-3xl mx-auto"
            >
              <span className="font-semibold text-foreground">The AI revolution is here.</span> ChatGPT, Perplexity, Gemini, Grok – 
              billions are using AI to search. Learn <span className="text-primary font-semibold">SEO, AEO, GEO & ChatGPT Ads</span> at Kerala's #1 Academy.
            </motion.p>

            {/* Trust Indicators */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-wrap justify-center gap-6 mb-8"
            >
              {[
                { icon: Building, text: 'Infopark Internship' },
                { icon: Award, text: '25+ Certifications' },
                { icon: Brain, text: 'AI-First Curriculum' },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-2 px-4 py-2 bg-card border border-border rounded-full text-sm">
                  <item.icon className="h-4 w-4 text-brand-success" />
                  <span>{item.text}</span>
                </div>
              ))}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex flex-wrap justify-center gap-4"
            >
              <Button
                onClick={() => setShowAssessment(true)}
                data-testid="hero-assessment-btn"
                size="lg"
                className="bg-gradient-to-r from-primary to-brand-indigo hover:opacity-90 text-white rounded-full px-8 py-6 text-lg font-semibold shadow-lg hover:shadow-xl transition-all group"
              >
                <Sparkles className="mr-2 h-5 w-5 group-hover:animate-pulse" />
                Free Career Assessment
              </Button>
              <Link to="/courses">
                <Button
                  size="lg"
                  variant="outline"
                  data-testid="hero-courses-btn"
                  className="rounded-full px-8 py-6 text-lg font-semibold border-2"
                >
                  View Courses
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </motion.div>
          </div>

          {/* AI Search Demo */}
          <AISearchDemo />
        </div>
      </section>

      {/* Certification Logos Marquee */}
      <section className="py-6 bg-muted/30 border-y border-border overflow-hidden">
        <div className="container-custom mb-4">
          <p className="text-center text-sm text-muted-foreground font-medium uppercase tracking-wider">
            Get 25+ Certifications from Industry Leaders
          </p>
        </div>
        <CertificationMarquee />
      </section>

      {/* Digital Transformation Stats */}
      <section className="section-padding bg-gradient-to-br from-primary via-primary to-brand-indigo text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
        </div>

        <div className="container-custom relative">
          <AnimatedSection className="text-center mb-12">
            <span className="inline-block px-4 py-1.5 bg-white/10 text-white rounded-full text-sm font-medium mb-4">
              The Digital Revolution
            </span>
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              The World is Going Digital. Are You?
            </h2>
            <p className="text-white/80 max-w-2xl mx-auto">
              The digital economy is worth trillions. Those with digital skills are earning 40% more. 
              Don't get left behind.
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, i) => (
              <AnimatedSection key={i} delay={i * 0.1}>
                <div className="text-center p-6 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/10">
                  <stat.icon className="h-8 w-8 mx-auto mb-3 opacity-80" />
                  <div className="font-heading font-bold text-4xl md:text-5xl mb-2">
                    <AnimatedCounter target={stat.number} suffix={stat.suffix} decimals={stat.suffix === 'T' ? 1 : 0} />
                  </div>
                  <div className="text-white/80 text-sm">{stat.label}</div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Section - Students of Your Age */}
      <section className="section-padding">
        <div className="container-custom">
          <AnimatedSection className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 bg-destructive/10 text-destructive rounded-full text-sm font-medium mb-4">
              Reality Check
            </span>
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              Students Your Age Are Already{' '}
              <span className="gradient-text">Landing Dream Jobs</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              While you're thinking, others are doing. Here's what separates digital marketing 
              professionals from everyone else.
            </p>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Without Training */}
            <AnimatedSection delay={0.1}>
              <div className="card-base border-destructive/30 bg-destructive/5 h-full">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-destructive/10 rounded-lg">
                    <X className="h-6 w-6 text-destructive" />
                  </div>
                  <h3 className="font-heading font-bold text-xl">Without Digital Skills</h3>
                </div>
                <ul className="space-y-4">
                  {[
                    'Starting salary: ₹15,000-20,000/month',
                    'Limited to local job opportunities',
                    'No remote work options',
                    'Missing AI revolution completely',
                    'Dependent on traditional job market',
                    'No freelancing income potential',
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <X className="h-5 w-5 text-destructive shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </AnimatedSection>

            {/* With Skillax */}
            <AnimatedSection delay={0.2}>
              <div className="card-base border-brand-success/30 bg-brand-success/5 h-full relative overflow-hidden">
                <div className="absolute top-4 right-4 px-3 py-1 bg-brand-success text-white text-xs font-bold rounded-full">
                  RECOMMENDED
                </div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-brand-success/10 rounded-lg">
                    <CheckCircle className="h-6 w-6 text-brand-success" />
                  </div>
                  <h3 className="font-heading font-bold text-xl">With Skillax Training</h3>
                </div>
                <ul className="space-y-4">
                  {[
                    'Starting salary: ₹40,000-80,000/month',
                    '25+ industry certifications',
                    'Guaranteed Infopark internship',
                    'Master AI: ChatGPT, Perplexity, Gemini, Grok',
                    'Learn SEO, AEO, GEO & ChatGPT Ads',
                    'Freelance on Upwork, Fiverr globally',
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-brand-success shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <Link to="/contact" className="block mt-6">
                  <Button className="w-full bg-brand-success hover:bg-brand-success/90 text-white rounded-full">
                    Start My Journey <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Courses Section */}
      <section className="section-padding bg-muted/30" data-testid="courses-section">
        <div className="container-custom">
          <AnimatedSection className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
              Our Programs
            </span>
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              Choose Your Path to Success
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Two comprehensive programs covering everything from traditional marketing to 
              AI-powered strategies. March 2025 batch now open!
            </p>
          </AnimatedSection>

          <div className="grid lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {courses.map((course, index) => {
              const Icon = course.icon;
              return (
                <AnimatedSection key={course.id} delay={index * 0.15}>
                  <div className={`card-base h-full ${course.bgColor} border-2 hover:border-primary/30 transition-all hover-lift`}>
                    <div className="flex items-start justify-between mb-6">
                      <div className={`p-4 rounded-2xl bg-gradient-to-br ${course.color}`}>
                        <Icon className="h-8 w-8 text-white" />
                      </div>
                      <div className="text-right">
                        <span className="px-4 py-1.5 bg-card border border-border rounded-full text-sm font-medium">
                          {course.duration}
                        </span>
                        <div className="mt-2 text-xs text-muted-foreground">
                          {course.certifications} Certifications
                        </div>
                      </div>
                    </div>

                    <h3 className="font-heading font-bold text-2xl mb-3">{course.title}</h3>
                    <p className="text-muted-foreground mb-6">{course.description}</p>

                    <div className="space-y-3 mb-6">
                      {course.highlights.map((highlight, i) => (
                        <div key={i} className="flex items-center gap-3">
                          <CheckCircle className="h-4 w-4 text-brand-success shrink-0" />
                          <span className="text-sm">{highlight}</span>
                        </div>
                      ))}
                    </div>

                    <Link to="/contact">
                      <Button className={`w-full bg-gradient-to-r ${course.color} text-white rounded-full py-6 font-semibold`}>
                        Enroll Now <ArrowRight className="ml-2 h-5 w-5" />
                      </Button>
                    </Link>
                  </div>
                </AnimatedSection>
              );
            })}
          </div>
        </div>
      </section>

      {/* AI Tools Section */}
      <section className="section-padding">
        <div className="container-custom">
          <AnimatedSection className="text-center mb-12">
            <span className="inline-block px-4 py-1.5 bg-purple-500/10 text-purple-600 rounded-full text-sm font-medium mb-4">
              AI-First Curriculum
            </span>
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
              Master the AI Tools That Matter
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Not just ChatGPT – we teach you ALL the AI tools dominating the market right now.
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {[
              { name: 'ChatGPT', desc: 'Content & Ads' },
              { name: 'Perplexity', desc: 'Research & AEO' },
              { name: 'Gemini', desc: 'Google AI' },
              { name: 'Copilot', desc: 'Microsoft AI' },
              { name: 'Grok', desc: 'X/Twitter AI' },
              { name: 'Midjourney', desc: 'Image Gen' },
            ].map((tool, i) => (
              <AnimatedSection key={i} delay={i * 0.1}>
                <div className="card-base text-center hover-lift p-4">
                  <div className="p-3 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-xl inline-block mb-3">
                    <Brain className="h-6 w-6 text-purple-600" />
                  </div>
                  <h4 className="font-semibold text-sm">{tool.name}</h4>
                  <p className="text-xs text-muted-foreground">{tool.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>

          {/* SEO/AEO/GEO Section */}
          <AnimatedSection className="mt-12">
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { 
                  title: 'SEO', 
                  full: 'Search Engine Optimization',
                  desc: 'Rank on Google, Bing & traditional search engines',
                  color: 'from-blue-500 to-cyan-500'
                },
                { 
                  title: 'AEO', 
                  full: 'Answer Engine Optimization',
                  desc: 'Get recommended by ChatGPT, Perplexity & AI assistants',
                  color: 'from-purple-500 to-pink-500'
                },
                { 
                  title: 'GEO', 
                  full: 'Generative Engine Optimization',
                  desc: 'Optimize for AI-generated search results & summaries',
                  color: 'from-orange-500 to-red-500'
                },
              ].map((item, i) => (
                <div key={i} className="card-base text-center">
                  <div className={`inline-block px-6 py-2 bg-gradient-to-r ${item.color} text-white rounded-full font-bold text-2xl mb-4`}>
                    {item.title}
                  </div>
                  <h4 className="font-semibold mb-2">{item.full}</h4>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </div>
              ))}
            </div>
          </AnimatedSection>

          {/* ChatGPT Ads - Next Big Trend */}
          <AnimatedSection className="mt-12">
            <div className="card-base bg-gradient-to-br from-brand-amber/10 to-orange-500/10 border-brand-amber/30 text-center p-8">
              <span className="inline-block px-4 py-1 bg-brand-amber text-white text-xs font-bold rounded-full mb-4">
                🔥 NEXT BIG TREND
              </span>
              <h3 className="font-heading font-bold text-2xl md:text-3xl mb-4">
                ChatGPT Ads & AI Advertising
              </h3>
              <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
                OpenAI is launching ads on ChatGPT. Google's AI Overviews are changing search. 
                Meta's AI is transforming social ads. Learn to advertise where the future is!
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                {['ChatGPT Ads', 'Google AI Ads', 'Meta AI Ads', 'Reddit Marketing', 'Quora Marketing'].map((item, i) => (
                  <span key={i} className="px-4 py-2 bg-card border border-border rounded-full text-sm font-medium">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Infopark Internship */}
      <section className="section-padding bg-gradient-to-br from-primary/5 via-background to-brand-amber/5">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <AnimatedSection>
              <span className="inline-block px-4 py-1.5 bg-brand-amber/10 text-brand-amber rounded-full text-sm font-medium mb-4">
                Exclusive Opportunity
              </span>
              <h2 className="font-heading text-3xl md:text-4xl font-bold mb-6">
                Guaranteed Internship at{' '}
                <span className="gradient-text">Infopark IT Company</span>
              </h2>
              <p className="text-muted-foreground mb-8">
                Get real-world experience at Kerala's premier technology hub. Work on live 
                projects with top IT companies and build your professional portfolio.
              </p>

              <div className="grid grid-cols-2 gap-4 mb-8">
                {[
                  { icon: Building, title: 'Infopark Campus', desc: 'Premium IT hub' },
                  { icon: Briefcase, title: 'Live Projects', desc: 'Real client work' },
                  { icon: Users, title: 'Industry Mentors', desc: 'Expert guidance' },
                  { icon: TrendingUp, title: 'Job Conversion', desc: 'High placement' },
                ].map((item, i) => (
                  <div key={i} className="p-4 bg-card rounded-xl border border-border">
                    <item.icon className="h-6 w-6 text-primary mb-2" />
                    <h4 className="font-semibold text-sm">{item.title}</h4>
                    <p className="text-xs text-muted-foreground">{item.desc}</p>
                  </div>
                ))}
              </div>

              <Link to="/contact">
                <Button className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-6">
                  Apply for Internship
                </Button>
              </Link>
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <div className="relative">
                <img
                  src={images.office}
                  alt="Infopark Office"
                  className="rounded-3xl shadow-2xl"
                  loading="lazy"
                />
                <div className="absolute -bottom-6 -left-6 bg-card border border-border rounded-2xl p-4 shadow-xl">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-brand-success/10 rounded-lg">
                      <Building className="h-6 w-6 text-brand-success" />
                    </div>
                    <div>
                      <div className="font-semibold">Infopark, Kochi</div>
                      <div className="text-xs text-muted-foreground">400+ IT Companies</div>
                    </div>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-gradient-to-br from-primary via-primary to-brand-indigo text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
        </div>

        <div className="container-custom relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <AnimatedSection>
              <span className="inline-block px-4 py-1.5 bg-white/10 text-white rounded-full text-sm font-medium mb-4">
                March 2025 Batch - Limited Seats
              </span>
              <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
                Your Future Starts Today
              </h2>
              <p className="text-white/80 text-lg mb-8">
                Join Kerala's #1 digital marketing academy with AI-powered curriculum, 
                25+ certifications, and guaranteed Infopark internship.
              </p>
              <div className="grid grid-cols-2 gap-4">
                {[
                  'Free Career Counseling',
                  'Flexible EMI Options',
                  'Weekend Batches',
                  'Lifetime Support',
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5" />
                    <span className="text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <div className="bg-card text-card-foreground rounded-3xl p-8 shadow-2xl">
                <h3 className="font-heading font-bold text-xl mb-2">
                  Get Free Career Consultation
                </h3>
                <p className="text-muted-foreground text-sm mb-6">
                  Our counselor will contact you within 24 hours.
                </p>
                <LeadForm source="home_cta" />
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Career Assessment Modal */}
      <CareerAssessmentModal isOpen={showAssessment} onClose={() => setShowAssessment(false)} />
    </div>
  );
}
