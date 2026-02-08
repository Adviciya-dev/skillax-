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
  { name: 'Ahrefs', logo: 'https://ahrefs.com/favicon-32x32.png' },
  { name: 'Moz', logo: 'https://moz.com/favicon.ico' },
  { name: 'Hootsuite', logo: 'https://hootsuite.com/favicon.ico' },
  { name: 'Buffer', logo: 'https://buffer.com/static/icons/favicon-32x32.png' },
  { name: 'Skill India', logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/d/df/Skill_India.png/220px-Skill_India.png' },
  { name: 'Zoho', logo: 'https://www.zoho.com/favicon.ico' },
  { name: 'Shopify', logo: 'https://cdn.shopify.com/shopifycloud/brochure/assets/brand-assets/shopify-logo-shopping-bag-full-color-66166b2e55d67988b56b4bd28b63c271e2b9713358cb723070a92bde17ad7d63.svg' },
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
    description: 'Complete A-Z digital marketing mastery with 30+ AI tools, live projects & guaranteed internship at Infopark IT company.',
    highlights: [
      'SEO, AEO, GEO Optimization',
      'Google Ads & Meta Ads Mastery',
      'ChatGPT Ads (Next Big Trend!)',
      '30+ AI Tools Training',
      'Reddit & Quora Marketing',
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
    description: 'Master cutting-edge AI marketing tools and automation. Perfect for working professionals wanting to upskill.',
    highlights: [
      '30+ AI Tools Mastery',
      'AI Content & Image Generation',
      'Answer Engine Optimization (AEO)',
      'Marketing Automation',
      'Prompt Engineering Mastery',
      'Weekend Batches Available',
    ],
    certifications: 15,
  },
];

// Digital Transformation Statistics - Updated for 2026
const stats = [
  { number: 92, suffix: '%', label: 'Companies using AI in 2026', icon: Brain },
  { number: 5.2, suffix: 'T', label: 'Global Digital Ad Spend 2026', icon: DollarSign },
  { number: 78, suffix: '%', label: 'Jobs need Digital Skills', icon: Briefcase },
  { number: 180, suffix: '%', label: 'AI Marketing Growth Rate', icon: TrendingUp },
];

// AI Search Queries for typing animation - More training focused
const searchQueries = [
  "best digital marketing training Kerala",
  "learn AI marketing tools 2026",
  "Askillax digital marketing course",
  "ChatGPT Ads training program",
  "SEO AEO GEO certification Kerala",
  "practical digital marketing training",
  "AI-powered marketing academy",
  "Perplexity marketing training",
  "digital marketing with internship Kerala",
  "hands-on marketing training",
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

// AI Search Demo Component - Training focused
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
              <div className="mt-2 flex gap-2">
                <span className="px-2 py-0.5 bg-primary/10 text-primary text-xs rounded-full">Training</span>
                <span className="px-2 py-0.5 bg-brand-amber/10 text-brand-amber text-xs rounded-full">Kerala</span>
                <span className="px-2 py-0.5 bg-brand-success/10 text-brand-success text-xs rounded-full">AI</span>
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
                      <span className="font-semibold text-brand-success">Askillax Academy, Wayanad</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      #1 rated digital marketing training in Kerala with 30+ AI tools, 
                      hands-on projects, and guaranteed Infopark internship.
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
                <h3 className="font-heading font-bold text-xl">Free Career Guidance</h3>
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
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
              <h4 className="font-semibold">What's your current status?</h4>
              <div className="grid grid-cols-2 gap-3">
                {['Student', 'Working Professional', 'Fresher', 'Business Owner'].map((option) => (
                  <button
                    key={option}
                    onClick={() => { setFormData({ ...formData, experience: option }); setStep(2); }}
                    className={`p-4 border rounded-xl text-left transition-all hover:border-primary hover:bg-primary/5 ${
                      formData.experience === option ? 'border-primary bg-primary/5' : 'border-border'
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
              <h4 className="font-semibold">What's your goal?</h4>
              <div className="grid grid-cols-1 gap-3">
                {['Get a high-paying job', 'Start freelancing', 'Grow my business', 'Upskill for promotion'].map((option) => (
                  <button
                    key={option}
                    onClick={() => { setFormData({ ...formData, goal: option }); setStep(3); }}
                    className={`p-4 border rounded-xl text-left transition-all hover:border-primary hover:bg-primary/5 ${
                      formData.goal === option ? 'border-primary bg-primary/5' : 'border-border'
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
              <h4 className="font-semibold">Your contact details</h4>
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
                className="w-full bg-primary hover:bg-primary/90 rounded-full py-6"
              >
                {isSubmitting ? 'Submitting...' : 'Get Free Guidance'}
              </Button>
            </motion.div>
          )}

          {step === 4 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-6">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-brand-success/10 rounded-full mb-4">
                <CheckCircle className="h-10 w-10 text-brand-success" />
              </div>
              <h4 className="font-heading font-bold text-xl mb-2">Thank You!</h4>
              <p className="text-muted-foreground mb-6">
                Our career counselor will contact you within 24 hours with personalized guidance.
              </p>
              <Button onClick={onClose} variant="outline" className="rounded-full">Close</Button>
            </motion.div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export default function Home() {
  const [showAssessment, setShowAssessment] = useState(false);

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-primary/5">
          <div className="absolute top-20 right-20 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl" />
          <div className="absolute bottom-20 left-20 w-[400px] h-[400px] bg-brand-amber/5 rounded-full blur-3xl" />
        </div>

        <div className="container-custom relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Column */}
            <div className="space-y-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="flex flex-wrap items-center gap-3"
              >
                {[
                  { icon: Building, text: 'Infopark Internship' },
                  { icon: Award, text: '30+ Certifications' },
                  { icon: Brain, text: 'AI-First Training' },
                ].map((badge, i) => (
                  <span key={i} className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full text-sm font-medium">
                    <badge.icon className="h-4 w-4 text-primary" />
                    {badge.text}
                  </span>
                ))}
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold leading-tight"
                data-testid="hero-title"
              >
                Master Digital Marketing with{' '}
                <span className="gradient-text">30+ AI Tools</span>{' '}
                at Askillax
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-lg text-muted-foreground max-w-xl"
              >
                Kerala's #1 AI-powered digital marketing training academy. 
                Get certified in ChatGPT, Perplexity, Gemini, Copilot, Grok + guaranteed internship at Infopark.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="flex flex-wrap gap-4"
              >
                <Link to="/courses">
                  <Button size="lg" className="bg-primary hover:bg-primary/90 rounded-full px-8 font-semibold">
                    Explore Training Programs
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Button
                  size="lg"
                  variant="outline"
                  className="rounded-full px-8"
                  onClick={() => setShowAssessment(true)}
                >
                  <Play className="mr-2 h-5 w-5" />
                  Free Career Guidance
                </Button>
              </motion.div>

              {/* Trust Badges */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="pt-6 border-t border-border"
              >
                <p className="text-sm text-muted-foreground mb-4">Trusted by 500+ students across Kerala</p>
                <div className="flex items-center gap-6">
                  <div className="flex items-center gap-2">
                    <div className="flex -space-x-2">
                      {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-brand-amber border-2 border-background" />
                      ))}
                    </div>
                    <span className="text-sm font-medium">500+ Alumni</span>
                  </div>
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star key={i} className="h-4 w-4 fill-brand-amber text-brand-amber" />
                    ))}
                    <span className="text-sm font-medium ml-1">4.9/5</span>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Right Column - AI Search Demo */}
            <AISearchDemo />
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="section-padding bg-primary text-primary-foreground">
        <div className="container-custom">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <AnimatedSection key={index} delay={index * 0.1}>
                <motion.div 
                  className="text-center p-6 bg-white/5 rounded-2xl border border-white/10"
                  whileHover={{ scale: 1.05, y: -5 }}
                >
                  <stat.icon className="h-8 w-8 mx-auto mb-3 opacity-80" />
                  <div className="font-heading font-bold text-4xl mb-1">
                    <AnimatedCounter target={stat.number} suffix={stat.suffix} decimals={stat.suffix === 'T' ? 1 : 0} />
                  </div>
                  <p className="text-sm opacity-80">{stat.label}</p>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Certification Marquee */}
      <section className="py-8 bg-muted/30 border-y border-border overflow-hidden">
        <div className="container-custom mb-4">
          <p className="text-center text-sm text-muted-foreground font-medium uppercase tracking-wider">
            Earn 30+ Industry Certifications
          </p>
        </div>
        <motion.div
          className="flex gap-8"
          animate={{ x: [0, -1500] }}
          transition={{ x: { duration: 30, repeat: Infinity, ease: 'linear' } }}
        >
          {[...certificationLogos, ...certificationLogos].map((cert, i) => (
            <div key={i} className="flex items-center gap-3 px-6 py-3 bg-card border border-border rounded-xl shrink-0">
              <img src={cert.logo} alt={cert.name} className="h-8 w-8 object-contain" loading="lazy" />
              <span className="font-medium whitespace-nowrap">{cert.name}</span>
            </div>
          ))}
        </motion.div>
      </section>

      {/* Courses Section */}
      <section className="section-padding">
        <div className="container-custom">
          <AnimatedSection className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
              Training Programs
            </span>
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
              Choose Your Path to Success
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Comprehensive digital marketing training designed for the AI era. 
              Real projects, real skills, real results.
            </p>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 gap-8">
            {courses.map((course, index) => (
              <AnimatedSection key={course.id} delay={index * 0.1}>
                <motion.div
                  className={`card-base h-full ${course.bgColor} border-2 hover:border-primary/30 transition-all relative overflow-hidden`}
                  whileHover={{ y: -10 }}
                >
                  {/* Gradient Overlay */}
                  <div className={`absolute top-0 right-0 w-40 h-40 bg-gradient-to-br ${course.color} opacity-10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2`} />
                  
                  <div className="relative z-10">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-6">
                      <div className={`p-4 bg-gradient-to-br ${course.color} rounded-2xl text-white`}>
                        <course.icon className="h-8 w-8" />
                      </div>
                      <div className="text-right">
                        <span className="text-xs text-muted-foreground">Duration</span>
                        <div className="font-heading font-bold text-lg">{course.duration}</div>
                      </div>
                    </div>

                    {/* Content */}
                    <h3 className="font-heading font-bold text-2xl mb-3">{course.title}</h3>
                    <p className="text-muted-foreground mb-6">{course.description}</p>

                    {/* Highlights */}
                    <div className="space-y-3 mb-6">
                      {course.highlights.map((highlight, i) => (
                        <motion.div 
                          key={i} 
                          className="flex items-center gap-3"
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.05 }}
                        >
                          <CheckCircle className="h-5 w-5 text-brand-success shrink-0" />
                          <span className="text-sm">{highlight}</span>
                        </motion.div>
                      ))}
                    </div>

                    {/* Footer */}
                    <div className="flex items-center justify-between pt-6 border-t border-border">
                      <div className="flex items-center gap-2">
                        <Award className="h-5 w-5 text-brand-amber" />
                        <span className="text-sm font-medium">{course.certifications}+ Certifications</span>
                      </div>
                      <Link to={`/courses/${course.slug}`}>
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
        </div>
      </section>

      {/* Why Askillax */}
      <section className="section-padding bg-muted/30">
        <div className="container-custom">
          <AnimatedSection className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
              Why Askillax?
            </span>
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
              What Makes Us Different
            </h2>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Brain, title: '30+ AI Tools', desc: 'ChatGPT, Perplexity, Gemini, Copilot, Grok, ManyChat, Zoho & more', color: 'from-purple-500 to-pink-500' },
              { icon: Building, title: 'Infopark Internship', desc: 'Guaranteed internship at top IT companies in Kerala', color: 'from-blue-500 to-cyan-500' },
              { icon: Award, title: '30+ Certifications', desc: 'Google, Meta, HubSpot, SEMrush & more included', color: 'from-brand-amber to-orange-500' },
              { icon: Target, title: '100% Practical', desc: 'Real projects, real clients, real experience', color: 'from-green-500 to-emerald-500' },
            ].map((item, index) => (
              <AnimatedSection key={index} delay={index * 0.1}>
                <motion.div 
                  className="card-base text-center h-full"
                  whileHover={{ y: -10 }}
                >
                  <div className={`inline-flex p-4 bg-gradient-to-br ${item.color} rounded-2xl text-white mb-4`}>
                    <item.icon className="h-8 w-8" />
                  </div>
                  <h3 className="font-heading font-semibold text-xl mb-2">{item.title}</h3>
                  <p className="text-muted-foreground text-sm">{item.desc}</p>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section-padding">
        <div className="container-custom">
          <AnimatedSection className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
              Success Stories
            </span>
            <h2 className="font-heading text-3xl md:text-4xl font-bold">
              What Our Students Say
            </h2>
          </AnimatedSection>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { name: 'Rahul K.', role: 'Digital Marketer @ Infopark', quote: 'Askillax transformed my career. The AI tools training is exceptional!' },
              { name: 'Priya M.', role: 'Freelancer', quote: 'Now earning more than my previous job. Best investment ever!' },
              { name: 'Arun S.', role: 'SEO Lead @ Agency', quote: 'The practical training and internship opened so many doors for me.' },
            ].map((testimonial, index) => (
              <AnimatedSection key={index} delay={index * 0.1}>
                <motion.div 
                  className="card-base h-full"
                  whileHover={{ y: -5 }}
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-primary to-brand-indigo rounded-full flex items-center justify-center text-white font-bold">
                      {testimonial.name.charAt(0)}
                    </div>
                    <div>
                      <h4 className="font-semibold">{testimonial.name}</h4>
                      <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                    </div>
                  </div>
                  <p className="text-muted-foreground italic">"{testimonial.quote}"</p>
                  <div className="flex mt-4">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star key={i} className="h-4 w-4 fill-brand-amber text-brand-amber" />
                    ))}
                  </div>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Lead Form Section */}
      <section className="section-padding bg-gradient-to-br from-primary via-brand-indigo to-purple-600 text-white">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <AnimatedSection>
              <span className="inline-block px-4 py-1.5 bg-white/10 rounded-full text-sm font-medium mb-4">
                March 2026 Batch Enrolling
              </span>
              <h2 className="font-heading text-3xl md:text-4xl font-bold mb-6">
                Ready to Start Your Digital Marketing Journey?
              </h2>
              <p className="text-white/80 mb-8">
                Get a free consultation with our career counselor. 
                We'll help you choose the right program based on your goals.
              </p>
              <div className="space-y-4">
                {['Free career counseling session', 'Personalized learning path', 'Flexible payment options', 'No prior experience needed'].map((item, i) => (
                  <motion.div 
                    key={i} 
                    className="flex items-center gap-3"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <CheckCircle className="h-5 w-5 text-brand-amber" />
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

      {/* Career Assessment Modal */}
      <CareerAssessmentModal isOpen={showAssessment} onClose={() => setShowAssessment(false)} />
    </div>
  );
}
