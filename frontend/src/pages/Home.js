import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { 
  ArrowRight, GraduationCap, Users, Award, Briefcase, 
  BookOpen, Cpu, Star, ChevronRight, MapPin, Play, CheckCircle, 
  TrendingUp, Target, Zap, X, Upload, Linkedin, Sparkles,
  Bot, Building, Clock, BadgeCheck, Rocket, Brain, Globe,
  MessageSquare, FileText, BarChart3, Search, Heart, 
  ExternalLink, ArrowUpRight, Percent, DollarSign, Eye,
  Shield, Code, Layers, Crown, Trophy, Gem, Flame,
  Network, Workflow, CircuitBoard, Cog, MousePointer,
  LineChart, PieChart, Activity, Database, Server, Cloud,
  Instagram, Facebook, Youtube, Mail, Phone, Store,
  Megaphone, TrendingDown, Share2, Hash, AtSign, Compass
} from 'lucide-react';
import { Button } from '../components/ui/button';
import LeadForm from '../components/LeadForm';
import SEO from '../components/SEO';
import { QuizCTABanner, AILabCTACard, EnrollmentCTASection } from '../components/CTAComponents';
import AIMarketingLab from '../components/AIMarketingLab';

// Rotating hero hooks - multiple value propositions (removed 100% Placement)
const heroHooks = [
  { text: '30+ AI Tools', icon: Brain, color: 'from-purple-500 to-pink-500' },
  { text: '30+ Certifications', icon: Award, color: 'from-amber-500 to-orange-500' },
  { text: 'Infopark Internship', icon: Building, color: 'from-blue-500 to-cyan-500' },
  { text: 'ChatGPT Ads Training', icon: Megaphone, color: 'from-green-500 to-emerald-500' },
  { text: 'SEO AEO GEO Mastery', icon: Target, color: 'from-violet-500 to-purple-500' },
  { text: 'Google & Meta Ads', icon: MousePointer, color: 'from-pink-500 to-rose-500' },
  { text: 'AI Agent Building', icon: Bot, color: 'from-cyan-500 to-teal-500' },
  { text: 'Performance Marketing', icon: LineChart, color: 'from-indigo-500 to-blue-500' },
];

// AI Search Queries for typing animation - Core digital marketing focused
const searchQueries = [
  "best digital marketing training Kerala",
  "learn SEO AEO GEO optimization",
  "Skillax digital marketing Mananthavady",
  "ChatGPT Ads training program 2026",
  "Google Ads certification course Wayanad",
  "Meta Ads Facebook Instagram training",
  "AI marketing tools training Kerala",
  "performance marketing course India",
  "GMB optimization training near me",
  "content marketing blog SEO course",
];

// Global digital transformation stats by region
const globalStats = [
  { 
    region: 'United States', 
    flag: '🇺🇸',
    stats: [
      { label: 'AI Marketing Jobs', value: '340%', growth: 'Growth 2024-26' },
      { label: 'Digital Ad Spend', value: '$320B', growth: 'By 2026' },
      { label: 'AI Adoption', value: '78%', growth: 'Companies' },
    ],
    color: 'from-blue-500 to-indigo-600'
  },
  { 
    region: 'Canada', 
    flag: '🇨🇦',
    stats: [
      { label: 'Tech Job Growth', value: '156%', growth: 'Since 2023' },
      { label: 'Marketing Tech', value: '$18B', growth: 'Market Size' },
      { label: 'Remote Work', value: '67%', growth: 'Digital Roles' },
    ],
    color: 'from-red-500 to-pink-600'
  },
  { 
    region: 'UAE & GCC', 
    flag: '🇦🇪',
    stats: [
      { label: 'Digital Economy', value: '$140B', growth: 'By 2030' },
      { label: 'AI Investment', value: '180%', growth: 'YoY Growth' },
      { label: 'Tech Workforce', value: '2.5M', growth: 'Needed' },
    ],
    color: 'from-emerald-500 to-teal-600'
  },
  { 
    region: 'Saudi Arabia', 
    flag: '🇸🇦',
    stats: [
      { label: 'Vision 2030', value: '$500B', growth: 'Tech Investment' },
      { label: 'Digital Jobs', value: '1.2M', growth: 'New Roles' },
      { label: 'AI Adoption', value: '92%', growth: 'Enterprises' },
    ],
    color: 'from-green-500 to-emerald-600'
  },
  { 
    region: 'India', 
    flag: '🇮🇳',
    stats: [
      { label: 'Digital Market', value: '$1T', growth: 'By 2030' },
      { label: 'AI Professionals', value: '10M+', growth: 'Demand' },
      { label: 'Startup Boom', value: '450%', growth: 'AI Startups' },
    ],
    color: 'from-orange-500 to-amber-600'
  },
];

// Student roadmap steps - balanced with core marketing
const roadmapSteps = [
  { 
    phase: 'Foundation',
    week: 'Week 1-3',
    title: 'Digital Marketing Fundamentals',
    skills: ['Marketing Psychology', 'Customer Journey', 'Branding & Positioning', 'Content Strategy'],
    icon: BookOpen,
    color: 'from-blue-500 to-cyan-500'
  },
  { 
    phase: 'SEO Mastery',
    week: 'Week 4-6',
    title: 'SEO, AEO & GEO Optimization',
    skills: ['Technical SEO', 'On-Page & Off-Page SEO', 'Answer Engine (AEO)', 'Local SEO & GMB'],
    icon: Target,
    color: 'from-green-500 to-emerald-500'
  },
  { 
    phase: 'Paid Ads',
    week: 'Week 7-9',
    title: 'Google Ads & Meta Ads Mastery',
    skills: ['Google Search & Display', 'YouTube Ads', 'Facebook & Instagram Ads', 'ChatGPT Ads'],
    icon: MousePointer,
    color: 'from-amber-500 to-orange-500'
  },
  { 
    phase: 'AI Tools',
    week: 'Week 10-12',
    title: 'AI Tools & Automation',
    skills: ['ChatGPT & Perplexity', 'AI Content Creation', 'Marketing Automation', 'Prompt Engineering'],
    icon: Brain,
    color: 'from-purple-500 to-pink-500'
  },
  { 
    phase: 'Advanced',
    week: 'Week 13-14',
    title: 'Agent Building & Analytics',
    skills: ['Virtual Assistants', 'Personal AI Agents', 'GA4 & Data Studio', 'Performance Reporting'],
    icon: Bot,
    color: 'from-violet-500 to-purple-500'
  },
  { 
    phase: 'Internship',
    week: 'Week 15-18',
    title: 'Infopark Real-World Experience',
    skills: ['Client Projects', 'Portfolio Building', 'Industry Networking', 'Career Guidance'],
    icon: Building,
    color: 'from-indigo-500 to-blue-500'
  },
];

// Core Digital Marketing Skills
const coreSkills = [
  { icon: Target, title: 'SEO', desc: 'On-Page, Off-Page, Technical SEO', gradient: 'from-green-500 to-emerald-500' },
  { icon: Search, title: 'AEO', desc: 'Answer Engine Optimization', gradient: 'from-blue-500 to-cyan-500' },
  { icon: MapPin, title: 'GEO', desc: 'Local & Generative Engine', gradient: 'from-purple-500 to-pink-500' },
  { icon: Store, title: 'GMB', desc: 'Google My Business', gradient: 'from-amber-500 to-orange-500' },
  { icon: MousePointer, title: 'Google Ads', desc: 'Search, Display, YouTube', gradient: 'from-red-500 to-pink-500' },
  { icon: Facebook, title: 'Meta Ads', desc: 'Facebook & Instagram', gradient: 'from-blue-600 to-indigo-600' },
  { icon: Megaphone, title: 'ChatGPT Ads', desc: 'The Next Big Trend!', gradient: 'from-green-600 to-teal-600' },
  { icon: LineChart, title: 'Performance', desc: 'ROI & Analytics', gradient: 'from-violet-500 to-purple-500' },
];

// ChatGPT Ads - The Future
const chatgptAdsFeatures = [
  { title: 'Conversational Targeting', desc: 'Reach users based on their AI conversations and intent signals' },
  { title: 'AI-Powered Creatives', desc: 'Auto-generate ad copy and visuals optimized for AI platforms' },
  { title: 'Cross-Platform Reach', desc: 'Advertise across ChatGPT, Perplexity, Claude, and more' },
  { title: 'Intent-Based Bidding', desc: 'Bid on user intents, not just keywords' },
];

// 30+ Certification logos
const certificationLogos = [
  { name: 'Google Ads', logo: 'https://www.gstatic.com/images/branding/product/2x/google_ads_64dp.png' },
  { name: 'Meta', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Facebook_Logo_%282019%29.png/600px-Facebook_Logo_%282019%29.png' },
  { name: 'HubSpot', logo: 'https://www.hubspot.com/hubfs/HubSpot_Logos/HubSpot-Inversed-Favicon.png' },
  { name: 'SEMrush', logo: 'https://cdn.semrush.com/static/index/semrush-logo.svg' },
  { name: 'Google Analytics', logo: 'https://www.gstatic.com/analytics-suite/header/suite/v2/ic_analytics.svg' },
  { name: 'LinkedIn', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/LinkedIn_logo_initials.png/600px-LinkedIn_logo_initials.png' },
  { name: 'Canva', logo: 'https://upload.wikimedia.org/wikipedia/commons/0/08/Canva_icon_2021.svg' },
  { name: 'Mailchimp', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/76/Mailchimp_2018.svg/512px-Mailchimp_2018.svg.png' },
];

// Two courses only
const courses = [
  {
    id: 'professional',
    title: 'Professional Digital Marketing',
    slug: 'professional-digital-marketing',
    duration: '4 Months',
    icon: Rocket,
    color: 'from-blue-600 to-indigo-600',
    bgColor: 'bg-gradient-to-br from-blue-500/10 to-indigo-500/10',
    description: 'Complete A-Z digital marketing mastery: SEO, AEO, GEO, Google Ads, Meta Ads, ChatGPT Ads, 30+ AI tools, blogs, website building & guaranteed Infopark internship.',
    highlights: [
      'SEO, AEO, GEO & GMB Mastery',
      'Google Ads & Meta Ads Certification',
      'ChatGPT Ads (Next Big Trend!)',
      '30+ AI Tools & Agent Building',
      'Blog Writing & Website Building',
      'Guaranteed Internship at Infopark',
    ],
    certifications: 25,
  },
  {
    id: 'advanced',
    title: 'Advanced AI-Powered Marketing',
    slug: 'ai-powered-marketing',
    duration: '2 Months',
    icon: Brain,
    color: 'from-purple-600 to-pink-600',
    bgColor: 'bg-gradient-to-br from-purple-500/10 to-pink-500/10',
    description: 'Master cutting-edge AI marketing: ChatGPT, Perplexity, Gemini, AI agents, automation & AEO optimization. Perfect for professionals wanting to upskill.',
    highlights: [
      '30+ AI Tools Deep Dive',
      'Answer Engine Optimization (AEO)',
      'AI Agent & Bot Building',
      'Prompt Engineering Mastery',
      'Marketing Automation',
      'Weekend Batches Available',
    ],
    certifications: 15,
  },
];

// Animated counter hook
function useAnimatedCounter(target, duration = 2000, decimals = 0) {
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

  return { count, ref };
}

// Animated section wrapper with lazy loading
function AnimatedSection({ children, className = '', delay = 0 }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

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

// Floating orb component
function FloatingOrb({ className, delay = 0 }) {
  return (
    <motion.div
      className={`absolute rounded-full blur-3xl ${className}`}
      animate={{
        y: [0, -30, 0],
        x: [0, 15, 0],
        scale: [1, 1.1, 1],
      }}
      transition={{
        duration: 8,
        delay,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    />
  );
}

// Rotating text component
function RotatingHeroText() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % heroHooks.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  const current = heroHooks[currentIndex];
  const Icon = current.icon;

  return (
    <div className="relative h-16 md:h-20 overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -50, opacity: 0 }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
          className="absolute inset-0 flex items-center justify-center gap-3"
        >
          <motion.div
            className={`p-3 rounded-2xl bg-gradient-to-br ${current.color}`}
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 0.5 }}
          >
            <Icon className="h-8 w-8 md:h-10 md:w-10 text-white" />
          </motion.div>
          <span className={`text-2xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r ${current.color} bg-clip-text text-transparent`}>
            {current.text}
          </span>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

// AI Search Demo Component - Training focused with typing animation
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
        }, 35);
      } else {
        timeout = setTimeout(() => {
          setShowResult(true);
          setTimeout(() => {
            setShowResult(false);
            setIsTyping(false);
          }, 2500);
        }, 400);
      }
    } else {
      if (displayText.length > 0) {
        timeout = setTimeout(() => {
          setDisplayText(displayText.slice(0, -1));
        }, 15);
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
      className="max-w-2xl mx-auto mt-10"
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
              AI Search Engines 2026
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
              <span className="text-xs text-muted-foreground">Students are searching...</span>
              <div className="mt-1 text-lg font-semibold min-h-[28px]">
                "{displayText}<span className="animate-pulse text-primary">|</span>"
              </div>
              <div className="mt-2 flex gap-2 flex-wrap">
                <span className="px-2 py-0.5 bg-primary/10 text-primary text-xs rounded-full">Training</span>
                <span className="px-2 py-0.5 bg-amber-500/10 text-amber-600 text-xs rounded-full">Kerala</span>
                <span className="px-2 py-0.5 bg-green-500/10 text-green-600 text-xs rounded-full">AI</span>
                <span className="px-2 py-0.5 bg-blue-500/10 text-blue-600 text-xs rounded-full">SEO</span>
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
                  <div className="mt-2 p-4 bg-green-500/5 border border-green-500/20 rounded-xl">
                    <div className="flex items-center gap-2 mb-2">
                      <BadgeCheck className="h-5 w-5 text-green-500" />
                      <span className="font-semibold text-green-600">Skillax Academy, Mananthavady, Wayanad</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      #1 rated digital marketing training in Kerala with SEO, AEO, GEO, Google Ads, Meta Ads, 
                      ChatGPT Ads, 30+ AI tools & guaranteed Infopark internship.
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

// Interactive Course Quiz/Assessment Tool
function CourseQuizModal({ isOpen, onClose }) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState(null);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const questions = [
    {
      id: 'experience',
      question: 'What is your current experience level?',
      options: [
        { value: 'beginner', label: 'Complete Beginner', icon: BookOpen, desc: 'New to digital marketing' },
        { value: 'basic', label: 'Basic Knowledge', icon: Target, desc: 'Know the fundamentals' },
        { value: 'intermediate', label: 'Some Experience', icon: TrendingUp, desc: '1-2 years in marketing' },
        { value: 'advanced', label: 'Experienced Pro', icon: Crown, desc: '3+ years, need upskilling' },
      ]
    },
    {
      id: 'goal',
      question: 'What is your primary goal?',
      options: [
        { value: 'job', label: 'Get a High-Paying Job', icon: Briefcase, desc: 'Land my dream role' },
        { value: 'freelance', label: 'Start Freelancing', icon: Globe, desc: 'Work independently' },
        { value: 'business', label: 'Grow My Business', icon: TrendingUp, desc: 'Scale my company' },
        { value: 'upskill', label: 'Upskill for Promotion', icon: Award, desc: 'Advance my career' },
      ]
    },
    {
      id: 'interest',
      question: 'What interests you most?',
      options: [
        { value: 'seo', label: 'SEO, AEO & GEO', icon: Target, desc: 'Organic visibility' },
        { value: 'ads', label: 'Google & Meta Ads', icon: MousePointer, desc: 'Paid advertising' },
        { value: 'ai', label: 'AI Tools & Agents', icon: Bot, desc: 'Automation & AI' },
        { value: 'all', label: 'Everything!', icon: Layers, desc: 'Complete mastery' },
      ]
    },
    {
      id: 'time',
      question: 'How much time can you commit?',
      options: [
        { value: 'fulltime', label: 'Full-Time (4 months)', icon: Clock, desc: 'Complete immersion' },
        { value: 'parttime', label: 'Part-Time (2 months)', icon: Calendar, desc: 'Weekends & evenings' },
        { value: 'flexible', label: 'Flexible Schedule', icon: Cog, desc: 'Need flexibility' },
      ]
    },
  ];

  const calculateResult = () => {
    const { experience, goal, interest, time } = answers;
    
    let score = { professional: 0, advanced: 0 };
    
    // Experience scoring
    if (experience === 'beginner' || experience === 'basic') score.professional += 3;
    if (experience === 'intermediate' || experience === 'advanced') score.advanced += 2;
    
    // Goal scoring
    if (goal === 'job') score.professional += 2;
    if (goal === 'freelance' || goal === 'upskill') score.advanced += 2;
    if (goal === 'business') score.professional += 1;
    
    // Interest scoring
    if (interest === 'seo' || interest === 'ads' || interest === 'all') score.professional += 2;
    if (interest === 'ai' || interest === 'all') score.advanced += 2;
    
    // Time scoring
    if (time === 'fulltime') score.professional += 3;
    if (time === 'parttime' || time === 'flexible') score.advanced += 2;
    
    return score.professional >= score.advanced ? 'professional' : 'advanced';
  };

  const handleAnswer = (questionId, value) => {
    setAnswers({ ...answers, [questionId]: value });
    if (step < questions.length - 1) {
      setStep(step + 1);
    } else {
      setResult(calculateResult());
      setStep(questions.length);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/leads`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          interest: result === 'professional' ? 'Professional Digital Marketing' : 'AI-Powered Marketing',
          source: 'course_quiz',
          message: `Quiz Result: ${result}, Answers: ${JSON.stringify(answers)}`
        })
      });
    } catch (error) {
      console.error('Error:', error);
    }
    setIsSubmitting(false);
    setStep(questions.length + 1);
  };

  const resetQuiz = () => {
    setStep(0);
    setAnswers({});
    setResult(null);
    setFormData({ name: '', email: '', phone: '' });
  };

  if (!isOpen) return null;

  const recommendedCourse = result === 'professional' ? courses[0] : courses[1];

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          className="bg-card border border-border rounded-3xl p-8 max-w-2xl w-full shadow-2xl max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <motion.div 
                className="p-3 bg-gradient-to-br from-primary to-purple-600 rounded-2xl"
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Sparkles className="h-6 w-6 text-white" />
              </motion.div>
              <div>
                <h3 className="font-heading font-bold text-xl">Find Your Perfect Course</h3>
                <p className="text-xs text-muted-foreground">
                  {step <= questions.length - 1 ? `Question ${step + 1} of ${questions.length}` : 
                   step === questions.length ? 'Your Recommendation' : 'Thank You!'}
                </p>
              </div>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-muted rounded-full transition-colors">
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-muted rounded-full h-2 mb-8">
            <motion.div 
              className="bg-gradient-to-r from-primary via-purple-500 to-pink-500 h-2 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${((step + 1) / (questions.length + 2)) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>

          {/* Questions */}
          {step < questions.length && (
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <h4 className="font-heading font-semibold text-2xl text-center mb-8">
                {questions[step].question}
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {questions[step].options.map((option) => {
                  const Icon = option.icon;
                  return (
                    <motion.button
                      key={option.value}
                      onClick={() => handleAnswer(questions[step].id, option.value)}
                      className="p-5 border-2 border-border rounded-2xl text-left transition-all hover:border-primary hover:bg-primary/5 group"
                      whileHover={{ scale: 1.02, y: -5 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="flex items-start gap-4">
                        <div className="p-3 bg-muted rounded-xl group-hover:bg-primary/10 transition-colors">
                          <Icon className="h-6 w-6 text-muted-foreground group-hover:text-primary transition-colors" />
                        </div>
                        <div>
                          <span className="font-semibold block">{option.label}</span>
                          <span className="text-sm text-muted-foreground">{option.desc}</span>
                        </div>
                      </div>
                    </motion.button>
                  );
                })}
              </div>
            </motion.div>
          )}

          {/* Result with Lead Capture */}
          {step === questions.length && result && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="space-y-6"
            >
              {/* Recommendation Card */}
              <div className={`p-6 rounded-2xl bg-gradient-to-br ${recommendedCourse.bgColor} border-2 border-primary/20`}>
                <div className="flex items-center gap-2 mb-4">
                  <Trophy className="h-6 w-6 text-amber-500" />
                  <span className="font-semibold text-amber-600">Perfect Match Found!</span>
                </div>
                <div className="flex items-start gap-4">
                  <div className={`p-4 bg-gradient-to-br ${recommendedCourse.color} rounded-2xl`}>
                    <recommendedCourse.icon className="h-10 w-10 text-white" />
                  </div>
                  <div>
                    <h4 className="font-heading font-bold text-2xl">{recommendedCourse.title}</h4>
                    <p className="text-muted-foreground mt-1">{recommendedCourse.description}</p>
                    <div className="flex items-center gap-4 mt-3 text-sm">
                      <span className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {recommendedCourse.duration}
                      </span>
                      <span className="flex items-center gap-1">
                        <Award className="h-4 w-4 text-amber-500" />
                        {recommendedCourse.certifications}+ Certs
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Lead Capture Form */}
              <div className="space-y-4">
                <h5 className="font-semibold text-center">Get Your Personalized Course Guide</h5>
                <input
                  type="text"
                  placeholder="Full Name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full input-base"
                />
                <input
                  type="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full input-base"
                />
                <input
                  type="tel"
                  placeholder="Phone Number"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full input-base"
                />
                <Button 
                  onClick={handleSubmit}
                  disabled={!formData.name || !formData.phone || isSubmitting}
                  className={`w-full bg-gradient-to-r ${recommendedCourse.color} text-white rounded-full py-6 font-semibold`}
                >
                  {isSubmitting ? 'Submitting...' : 'Get Free Course Guide & Counseling'}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </div>
            </motion.div>
          )}

          {/* Thank You */}
          {step === questions.length + 1 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-8"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 200 }}
                className="inline-flex items-center justify-center w-24 h-24 bg-green-500/10 rounded-full mb-6"
              >
                <CheckCircle className="h-12 w-12 text-green-500" />
              </motion.div>
              <h4 className="font-heading font-bold text-2xl mb-2">Thank You!</h4>
              <p className="text-muted-foreground mb-6">
                Our career counselor will contact you within 24 hours with your personalized course guide.
              </p>
              <div className="flex gap-4 justify-center">
                <Button onClick={resetQuiz} variant="outline" className="rounded-full">
                  Retake Quiz
                </Button>
                <Button onClick={onClose} className="rounded-full">
                  Close
                </Button>
              </div>
            </motion.div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

// Global stats carousel
function GlobalStatsSection() {
  const [activeRegion, setActiveRegion] = useState(0);

  return (
    <section className="section-padding bg-gradient-to-b from-background to-muted/30 overflow-hidden">
      <div className="container-custom">
        <AnimatedSection className="text-center mb-12">
          <span className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-semibold mb-4">
            <Globe className="h-4 w-4" />
            Global Digital Transformation
          </span>
          <h2 className="font-heading text-3xl md:text-5xl font-bold mb-4">
            The World is Going{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-600">
              Digital
            </span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Digital marketing, SEO, AEO, and AI skills are in unprecedented demand globally. 
            Position yourself at the forefront of this transformation.
          </p>
        </AnimatedSection>

        {/* Region Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {globalStats.map((region, index) => (
            <motion.button
              key={region.region}
              onClick={() => setActiveRegion(index)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full font-medium transition-all ${
                activeRegion === index
                  ? `bg-gradient-to-r ${region.color} text-white shadow-lg`
                  : 'bg-card border border-border hover:border-primary/50'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="text-xl">{region.flag}</span>
              <span className="hidden sm:inline">{region.region}</span>
            </motion.button>
          ))}
        </div>

        {/* Stats Display */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeRegion}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="grid md:grid-cols-3 gap-6"
          >
            {globalStats[activeRegion].stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="relative group"
              >
                <div className={`absolute inset-0 bg-gradient-to-r ${globalStats[activeRegion].color} rounded-3xl blur-xl opacity-20 group-hover:opacity-40 transition-opacity`} />
                <div className="relative bg-card border border-border rounded-3xl p-8 text-center backdrop-blur-sm hover:border-primary/30 transition-all">
                  <motion.div
                    className="text-5xl md:text-6xl font-bold mb-2 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text"
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
                  >
                    {stat.value}
                  </motion.div>
                  <div className="font-semibold text-lg mb-1">{stat.label}</div>
                  <div className="text-sm text-muted-foreground">{stat.growth}</div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Running text marquee */}
        <div className="mt-12 overflow-hidden">
          <motion.div
            className="flex gap-8 whitespace-nowrap"
            animate={{ x: [0, -1200] }}
            transition={{ x: { duration: 25, repeat: Infinity, ease: 'linear' } }}
          >
            {[...Array(3)].map((_, i) => (
              <div key={i} className="flex gap-8 items-center">
                <span className="text-2xl font-bold text-muted-foreground/30">SEO AEO GEO</span>
                <Target className="h-6 w-6 text-muted-foreground/30" />
                <span className="text-2xl font-bold text-muted-foreground/30">GOOGLE ADS</span>
                <MousePointer className="h-6 w-6 text-muted-foreground/30" />
                <span className="text-2xl font-bold text-muted-foreground/30">META ADS</span>
                <Facebook className="h-6 w-6 text-muted-foreground/30" />
                <span className="text-2xl font-bold text-muted-foreground/30">AI MARKETING</span>
                <Brain className="h-6 w-6 text-muted-foreground/30" />
                <span className="text-2xl font-bold text-muted-foreground/30">CHATGPT ADS</span>
                <Megaphone className="h-6 w-6 text-muted-foreground/30" />
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// Core Skills Section
function CoreSkillsSection() {
  return (
    <section className="section-padding">
      <div className="container-custom">
        <AnimatedSection className="text-center mb-12">
          <span className="inline-flex items-center gap-2 px-4 py-2 bg-green-500/10 text-green-600 rounded-full text-sm font-semibold mb-4">
            <Target className="h-4 w-4" />
            Core Digital Marketing Skills
          </span>
          <h2 className="font-heading text-3xl md:text-5xl font-bold mb-4">
            Master the{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-emerald-500">
              Fundamentals
            </span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Build a rock-solid foundation with SEO, AEO, GEO, GMB, Google Ads, Meta Ads, 
            and the future of advertising - ChatGPT Ads.
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {coreSkills.map((skill, index) => {
            const Icon = skill.icon;
            return (
              <AnimatedSection key={index} delay={index * 0.05}>
                <motion.div 
                  className="group relative"
                  whileHover={{ y: -10 }}
                >
                  <div className={`absolute inset-0 bg-gradient-to-r ${skill.gradient} rounded-2xl blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-300`} />
                  <div className="relative bg-card border border-border rounded-2xl p-5 text-center h-full backdrop-blur-sm hover:border-primary/30 transition-all">
                    <motion.div
                      className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${skill.gradient} text-white mb-3 shadow-lg`}
                      whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
                      transition={{ duration: 0.5 }}
                    >
                      <Icon className="h-6 w-6" />
                    </motion.div>
                    <h3 className="font-heading font-semibold text-lg mb-1">{skill.title}</h3>
                    <p className="text-xs text-muted-foreground">{skill.desc}</p>
                  </div>
                </motion.div>
              </AnimatedSection>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ChatGPT Ads Section
function ChatGPTAdsSection() {
  return (
    <section className="section-padding bg-gradient-to-br from-green-900 via-emerald-900 to-teal-900 text-white relative overflow-hidden">
      <FloatingOrb className="top-10 left-10 w-64 h-64 bg-green-500/20" delay={0} />
      <FloatingOrb className="bottom-10 right-10 w-80 h-80 bg-teal-500/20" delay={2} />
      
      <div className="container-custom relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <AnimatedSection>
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full text-sm font-medium mb-4">
              <Megaphone className="h-4 w-4 text-green-400" />
              The Next Big Trend
            </span>
            <h2 className="font-heading text-3xl md:text-5xl font-bold mb-6">
              ChatGPT Ads are{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-300 to-emerald-400">
                Coming!
              </span>
            </h2>
            <p className="text-white/80 mb-8 text-lg">
              OpenAI is rolling out advertising on ChatGPT. Be among the first marketers 
              to master this revolutionary platform. We're preparing you for the future.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {chatgptAdsFeatures.map((feature, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="p-4 bg-white/5 border border-white/10 rounded-2xl"
                >
                  <h4 className="font-semibold mb-1">{feature.title}</h4>
                  <p className="text-sm text-white/60">{feature.desc}</p>
                </motion.div>
              ))}
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.2}>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-green-500/20 to-teal-500/20 rounded-3xl blur-3xl" />
              <div className="relative bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-sm">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl">
                    <Bot className="h-8 w-8 text-white" />
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-xl">ChatGPT Advertising</h3>
                    <p className="text-sm text-white/60">Coming 2026</p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  {['Conversational ad formats', 'AI-powered targeting', 'Intent-based campaigns', 'Cross-platform reach'].map((item, i) => (
                    <motion.div 
                      key={i}
                      className="flex items-center gap-3"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                    >
                      <CheckCircle className="h-5 w-5 text-green-400" />
                      <span>{item}</span>
                    </motion.div>
                  ))}
                </div>

                <div className="mt-6 p-4 bg-green-500/10 border border-green-500/30 rounded-xl">
                  <div className="flex items-center gap-2 text-green-400 font-semibold">
                    <Flame className="h-5 w-5" />
                    Learn it first at Skillax
                  </div>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}

// Student Roadmap Section
function RoadmapSection() {
  return (
    <section className="section-padding relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-purple-500/5" />
      
      <div className="container-custom relative z-10">
        <AnimatedSection className="text-center mb-16">
          <span className="inline-flex items-center gap-2 px-4 py-2 bg-amber-500/10 text-amber-600 rounded-full text-sm font-semibold mb-4">
            <Trophy className="h-4 w-4" />
            Your Transformation Journey
          </span>
          <h2 className="font-heading text-3xl md:text-5xl font-bold mb-4">
            Become a{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-500">
              Digital Marketing Pro
            </span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A structured 18-week roadmap covering SEO, AEO, GEO, Google Ads, Meta Ads, 
            AI tools, agent building, and real-world internship.
          </p>
        </AnimatedSection>

        {/* Roadmap Timeline */}
        <div className="relative">
          <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-500 via-purple-500 to-amber-500 hidden lg:block transform -translate-x-1/2" />

          <div className="space-y-8">
            {roadmapSteps.map((step, index) => {
              const Icon = step.icon;
              const isLeft = index % 2 === 0;

              return (
                <AnimatedSection key={step.phase} delay={index * 0.1}>
                  <div className={`flex items-center gap-8 ${isLeft ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}>
                    <motion.div
                      className="flex-1 relative group"
                      whileHover={{ scale: 1.02 }}
                    >
                      <div className={`absolute inset-0 bg-gradient-to-r ${step.color} rounded-3xl blur-xl opacity-10 group-hover:opacity-20 transition-opacity`} />
                      <div className="relative bg-card border border-border rounded-3xl p-6 backdrop-blur-sm hover:border-primary/30 transition-all">
                        <div className="flex items-start gap-4">
                          <motion.div
                            className={`p-4 rounded-2xl bg-gradient-to-br ${step.color} shadow-lg`}
                            whileHover={{ rotate: [0, -10, 10, 0] }}
                            transition={{ duration: 0.5 }}
                          >
                            <Icon className="h-8 w-8 text-white" />
                          </motion.div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <span className={`px-3 py-1 rounded-full text-xs font-bold bg-gradient-to-r ${step.color} text-white`}>
                                {step.phase}
                              </span>
                              <span className="text-xs text-muted-foreground">{step.week}</span>
                            </div>
                            <h3 className="font-heading font-bold text-xl mb-3">{step.title}</h3>
                            <div className="grid grid-cols-2 gap-2">
                              {step.skills.map((skill, i) => (
                                <motion.div
                                  key={i}
                                  initial={{ opacity: 0, x: -10 }}
                                  whileInView={{ opacity: 1, x: 0 }}
                                  transition={{ delay: i * 0.05 }}
                                  className="flex items-center gap-2 text-sm text-muted-foreground"
                                >
                                  <CheckCircle className="h-4 w-4 text-green-500 shrink-0" />
                                  {skill}
                                </motion.div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>

                    <div className="hidden lg:flex items-center justify-center">
                      <motion.div
                        className={`w-12 h-12 rounded-full bg-gradient-to-br ${step.color} flex items-center justify-center text-white font-bold shadow-lg z-10`}
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 2, repeat: Infinity, delay: index * 0.2 }}
                      >
                        {index + 1}
                      </motion.div>
                    </div>

                    <div className="flex-1 hidden lg:block" />
                  </div>
                </AnimatedSection>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

// Calendar icon for time options
const Calendar = Clock;

export default function Home() {
  const [showQuiz, setShowQuiz] = useState(false);
  const [showAILab, setShowAILab] = useState(false);
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start']
  });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 150]);

  return (
    <div className="overflow-hidden">
      {/* SEO Meta Tags */}
      <SEO 
        title="Digital Marketing Academy | SEO AEO GEO Google Ads AI Tools"
        description="Kerala's #1 AI-powered digital marketing academy. Master SEO, AEO, GEO, GMB, Google Ads, Meta Ads, ChatGPT Ads, 30+ AI tools. Guaranteed Infopark internship. Located in Mananthavady, Wayanad."
        keywords="digital marketing course kerala, digital marketing training wayanad, seo course mananthavady, aeo training, geo optimization, google ads certification, meta ads training, chatgpt ads, ai marketing course, infopark internship"
        url="https://skillax.in"
      />
      
      {/* Hero Section with Parallax */}
      <section ref={heroRef} className="relative min-h-screen flex items-center pt-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-primary/5">
          <FloatingOrb className="top-20 right-20 w-[600px] h-[600px] bg-primary/5" delay={0} />
          <FloatingOrb className="bottom-20 left-20 w-[400px] h-[400px] bg-amber-500/5" delay={2} />
          <FloatingOrb className="top-1/2 left-1/3 w-[300px] h-[300px] bg-purple-500/5" delay={4} />
        </div>

        <motion.div style={{ y: heroY }} className="container-custom relative z-10">
          <div className="max-w-5xl mx-auto text-center">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-wrap justify-center gap-3 mb-6"
            >
              {[
                { icon: Target, text: 'SEO AEO GEO', color: 'bg-green-500/10 text-green-600 border-green-500/20' },
                { icon: MousePointer, text: 'Google & Meta Ads', color: 'bg-blue-500/10 text-blue-600 border-blue-500/20' },
                { icon: Brain, text: '30+ AI Tools', color: 'bg-purple-500/10 text-purple-600 border-purple-500/20' },
              ].map((badge, i) => (
                <motion.span 
                  key={i}
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium border ${badge.color}`}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <badge.icon className="h-4 w-4" />
                  {badge.text}
                </motion.span>
              ))}
            </motion.div>

            {/* Main Title */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4"
              data-testid="hero-title"
            >
              Master Digital Marketing with
            </motion.h1>

            {/* Rotating Text */}
            <RotatingHeroText />

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="font-heading text-2xl md:text-3xl lg:text-4xl font-bold mb-6"
            >
              at <span className="text-primary">Skillax</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-lg text-muted-foreground max-w-3xl mx-auto mb-8"
            >
              Kerala's #1 AI-powered digital marketing academy. Learn SEO, AEO, GEO, Google Ads, Meta Ads, 
              ChatGPT Ads, blog writing, website building, 30+ AI tools & get guaranteed Infopark internship.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-wrap justify-center gap-4 mb-8"
            >
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-primary to-purple-600 hover:opacity-90 text-white rounded-full px-8 font-semibold shadow-lg"
                  onClick={() => setShowQuiz(true)}
                >
                  <Sparkles className="mr-2 h-5 w-5" />
                  Find Your Perfect Course
                </Button>
              </motion.div>
              <Link to="/courses">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button size="lg" variant="outline" className="rounded-full px-8 border-2">
                    <BookOpen className="mr-2 h-5 w-5" />
                    View All Programs
                  </Button>
                </motion.div>
              </Link>
            </motion.div>

            {/* Founding Batch Highlight */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-wrap justify-center items-center gap-4"
            >
              <motion.div 
                className="flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/30 rounded-full"
                animate={{ scale: [1, 1.02, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Flame className="h-5 w-5 text-amber-500" />
                <span className="font-semibold text-amber-600">Founding Batch - March 2026</span>
                <Sparkles className="h-5 w-5 text-amber-500" />
              </motion.div>
              <div className="flex items-center gap-2 px-4 py-2 bg-green-500/10 border border-green-500/30 rounded-full">
                <Users className="h-4 w-4 text-green-600" />
                <span className="text-sm font-medium text-green-600">Limited to 15 Students</span>
              </div>
            </motion.div>
          </div>

          {/* AI Search Demo */}
          <AISearchDemo />
        </motion.div>
      </section>

      {/* Quiz CTA Banner - Hook #1 */}
      <section className="py-8 px-4">
        <div className="container-custom">
          <QuizCTABanner onOpenQuiz={() => setShowQuiz(true)} variant="urgent" />
        </div>
      </section>

      {/* Certification Marquee */}
      <section className="py-6 bg-muted/30 border-y border-border overflow-hidden">
        <div className="container-custom mb-3">
          <p className="text-center text-xs text-muted-foreground font-medium uppercase tracking-wider">
            Earn 30+ Industry Certifications
          </p>
        </div>
        <motion.div
          className="flex gap-6"
          animate={{ x: [0, -1200] }}
          transition={{ x: { duration: 25, repeat: Infinity, ease: 'linear' } }}
        >
          {[...certificationLogos, ...certificationLogos, ...certificationLogos].map((cert, i) => (
            <div key={i} className="flex items-center gap-2 px-4 py-2 bg-card border border-border rounded-xl shrink-0">
              <img src={cert.logo} alt={cert.name} className="h-6 w-6 object-contain" loading="lazy" />
              <span className="font-medium text-sm whitespace-nowrap">{cert.name}</span>
            </div>
          ))}
        </motion.div>
      </section>

      {/* Core Skills Section */}
      <CoreSkillsSection />

      {/* Global Digital Transformation Stats */}
      <GlobalStatsSection />

      {/* AI Lab CTA - Hook #2 */}
      <section className="py-12">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <AnimatedSection>
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-purple-500/10 text-purple-600 rounded-full text-sm font-semibold mb-4">
                <Brain className="h-4 w-4" />
                Try Before You Join
              </span>
              <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
                Experience Our{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500">
                  AI Marketing Lab
                </span>
              </h2>
              <p className="text-muted-foreground mb-6">
                Get a taste of what you'll learn at Skillax. Our AI tools can generate ad copies, 
                blog outlines, lead magnets, and competitor analyses - all powered by cutting-edge AI.
              </p>
              <div className="flex flex-wrap gap-3">
                {['Ad Copy Generator', 'Blog Outlines', 'Lead Magnets', 'Competitor Analysis'].map((tool, i) => (
                  <span key={i} className="px-3 py-1.5 bg-muted rounded-full text-sm font-medium">
                    {tool}
                  </span>
                ))}
              </div>
            </AnimatedSection>
            <AnimatedSection delay={0.2}>
              <AILabCTACard onOpenLab={() => setShowAILab(true)} />
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ChatGPT Ads Section */}
      <ChatGPTAdsSection />

      {/* Student Roadmap */}
      <RoadmapSection />

      {/* Courses Section */}
      <section className="section-padding bg-muted/30">
        <div className="container-custom">
          <AnimatedSection className="text-center mb-16">
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-semibold mb-4">
              <GraduationCap className="h-4 w-4" />
              Training Programs
            </span>
            <h2 className="font-heading text-3xl md:text-5xl font-bold mb-4">
              Choose Your Path to{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-600">
                Success
              </span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Comprehensive digital marketing training covering SEO, AEO, GEO, Ads, AI tools, 
              agent building, and real-world internship. Master both fundamentals and cutting-edge AI.
            </p>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 gap-8">
            {courses.map((course, index) => (
              <AnimatedSection key={course.id} delay={index * 0.1}>
                <motion.div
                  className={`card-base h-full ${course.bgColor} border-2 hover:border-primary/30 transition-all relative overflow-hidden`}
                  whileHover={{ y: -10 }}
                >
                  <div className={`absolute top-0 right-0 w-40 h-40 bg-gradient-to-br ${course.color} opacity-10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2`} />
                  
                  <div className="relative z-10">
                    <div className="flex items-start justify-between mb-6">
                      <motion.div 
                        className={`p-4 bg-gradient-to-br ${course.color} rounded-2xl text-white shadow-lg`}
                        whileHover={{ rotate: [0, -10, 10, 0] }}
                        transition={{ duration: 0.5 }}
                      >
                        <course.icon className="h-8 w-8" />
                      </motion.div>
                      <div className="text-right">
                        <span className="text-xs text-muted-foreground">Duration</span>
                        <div className="font-heading font-bold text-lg">{course.duration}</div>
                      </div>
                    </div>

                    <h3 className="font-heading font-bold text-2xl mb-3">{course.title}</h3>
                    <p className="text-muted-foreground mb-6">{course.description}</p>

                    <div className="space-y-3 mb-6">
                      {course.highlights.map((highlight, i) => (
                        <motion.div 
                          key={i} 
                          className="flex items-center gap-3"
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.05 }}
                        >
                          <CheckCircle className="h-5 w-5 text-green-500 shrink-0" />
                          <span className="text-sm">{highlight}</span>
                        </motion.div>
                      ))}
                    </div>

                    <div className="flex items-center justify-between pt-6 border-t border-border">
                      <div className="flex items-center gap-2">
                        <Award className="h-5 w-5 text-amber-500" />
                        <span className="text-sm font-medium">{course.certifications}+ Certifications</span>
                      </div>
                      <Link to={`/courses`}>
                        <Button className={`bg-gradient-to-r ${course.color} hover:opacity-90 rounded-full`}>
                          Learn More
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>

          {/* Quiz CTA */}
          <AnimatedSection className="mt-12 text-center">
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button 
                size="lg" 
                onClick={() => setShowQuiz(true)}
                className="bg-gradient-to-r from-amber-500 to-orange-500 hover:opacity-90 text-white rounded-full px-10 font-semibold shadow-lg"
              >
                <Sparkles className="mr-2 h-5 w-5" />
                Not Sure? Take Our Course Quiz
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </motion.div>
          </AnimatedSection>
        </div>
      </section>

      {/* Why Skillax */}
      <section className="section-padding">
        <div className="container-custom">
          <AnimatedSection className="text-center mb-16">
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-amber-500/10 text-amber-600 rounded-full text-sm font-semibold mb-4">
              <Gem className="h-4 w-4" />
              Why Skillax?
            </span>
            <h2 className="font-heading text-3xl md:text-5xl font-bold mb-4">
              What Makes Us{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-500">
                Different
              </span>
            </h2>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Target, title: 'SEO AEO GEO GMB', desc: 'Complete organic & local visibility mastery', color: 'from-green-500 to-emerald-500' },
              { icon: MousePointer, title: 'Google & Meta Ads', desc: 'Performance marketing with ChatGPT Ads', color: 'from-blue-500 to-cyan-500' },
              { icon: Brain, title: '30+ AI Tools', desc: 'ChatGPT, Perplexity, Gemini + Agent Building', color: 'from-purple-500 to-pink-500' },
              { icon: Building, title: 'Infopark Internship', desc: 'Real-world experience at top IT companies', color: 'from-amber-500 to-orange-500' },
            ].map((item, index) => (
              <AnimatedSection key={index} delay={index * 0.1}>
                <motion.div 
                  className="card-base text-center h-full"
                  whileHover={{ y: -10 }}
                >
                  <motion.div 
                    className={`inline-flex p-4 bg-gradient-to-br ${item.color} rounded-2xl text-white mb-4 shadow-lg`}
                    whileHover={{ rotate: [0, -10, 10, 0] }}
                    transition={{ duration: 0.5 }}
                  >
                    <item.icon className="h-8 w-8" />
                  </motion.div>
                  <h3 className="font-heading font-semibold text-xl mb-2">{item.title}</h3>
                  <p className="text-muted-foreground text-sm">{item.desc}</p>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Lead Form Section */}
      <section className="section-padding bg-gradient-to-br from-primary via-indigo-600 to-purple-600 text-white relative overflow-hidden">
        <FloatingOrb className="top-10 left-10 w-64 h-64 bg-white/10" delay={0} />
        <FloatingOrb className="bottom-10 right-10 w-80 h-80 bg-amber-400/10" delay={2} />

        <div className="container-custom relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <AnimatedSection>
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full text-sm font-medium mb-4">
                <Flame className="h-4 w-4 text-amber-400" />
                March 2026 Batch Enrolling
              </span>
              <h2 className="font-heading text-3xl md:text-5xl font-bold mb-6">
                Ready to Transform Your Career?
              </h2>
              <p className="text-white/80 mb-8 text-lg">
                Get a free consultation. Learn about SEO, AEO, GEO, Google Ads, Meta Ads, 
                ChatGPT Ads, AI tools, and your personalized learning roadmap.
              </p>
              <div className="space-y-4">
                {['Free career counseling session', 'SEO, AEO, GEO assessment', 'AI tools demonstration', 'Personalized learning path'].map((item, i) => (
                  <motion.div 
                    key={i} 
                    className="flex items-center gap-3"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <CheckCircle className="h-5 w-5 text-amber-400" />
                    <span>{item}</span>
                  </motion.div>
                ))}
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <div className="bg-card text-foreground rounded-3xl p-8 shadow-2xl">
                <LeadForm source="home_page" />
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Course Quiz Modal */}
      <CourseQuizModal isOpen={showQuiz} onClose={() => setShowQuiz(false)} />
      
      {/* AI Marketing Lab Modal */}
      <AIMarketingLab isOpen={showAILab} onClose={() => setShowAILab(false)} />
    </div>
  );
}
