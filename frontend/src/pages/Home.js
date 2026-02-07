import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { 
  ArrowRight, GraduationCap, Users, Award, Briefcase, 
  BookOpen, Cpu, Star, ChevronRight, MapPin, Play, CheckCircle, 
  TrendingUp, Target, Zap, X, Upload, Linkedin, Sparkles,
  Bot, Building, Clock, BadgeCheck, Rocket, Brain, Globe,
  MessageSquare, FileText, BarChart3, Search, Heart
} from 'lucide-react';
import { Button } from '../components/ui/button';
import LeadForm from '../components/LeadForm';

// Fresh high-quality images
const images = {
  hero1: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1200&q=80",
  hero2: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=1200&q=80",
  student1: "https://images.unsplash.com/photo-1632647895256-3f75c1865a0f?w=800&q=80",
  student2: "https://images.unsplash.com/photo-1736939661350-dec5c2bd5cd1?w=800&q=80",
  student3: "https://images.unsplash.com/photo-1603201667141-5a2d4c673378?w=800&q=80",
  teamwork: "https://images.unsplash.com/photo-1653669487404-09c3617c2b6c?w=800&q=80",
  dashboard: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
  socialMedia: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&q=80",
  aiMarketing: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80",
  office: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80",
};

// Certification logos - proper URLs
const certificationLogos = [
  { name: 'Google', logo: 'https://www.gstatic.com/images/branding/product/2x/google_ads_64dp.png' },
  { name: 'Meta', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Facebook_Logo_%282019%29.png/600px-Facebook_Logo_%282019%29.png' },
  { name: 'HubSpot', logo: 'https://www.hubspot.com/hubfs/HubSpot_Logos/HubSpot-Inversed-Favicon.png' },
  { name: 'SEMrush', logo: 'https://cdn.semrush.com/static/index/semrush-logo.svg' },
  { name: 'Google Analytics', logo: 'https://www.gstatic.com/analytics-suite/header/suite/v2/ic_analytics.svg' },
  { name: 'Skill India', logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/d/df/Skill_India.png/220px-Skill_India.png' },
  { name: 'LinkedIn', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/LinkedIn_logo_initials.png/600px-LinkedIn_logo_initials.png' },
  { name: 'Canva', logo: 'https://upload.wikimedia.org/wikipedia/commons/0/08/Canva_icon_2021.svg' },
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
      'SEO, SEM, SMM, Email Marketing',
      'AI Tools: ChatGPT, Midjourney, Canva AI',
      'Google Ads & Meta Ads Certification',
      'Live Client Projects',
      'Guaranteed Internship at Infopark',
      '100% Placement Assistance',
    ],
    certifications: ['Google Ads', 'Meta Blueprint', 'HubSpot', 'Skillax Pro'],
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
      'ChatGPT for Marketing',
      'AI Content & Image Generation',
      'Marketing Automation',
      'AI Analytics & Insights',
      'Prompt Engineering',
      'Weekend Batches Available',
    ],
    certifications: ['Skillax AI Expert', 'HubSpot Automation'],
  },
];

// Animated counter
function AnimatedCounter({ target, suffix = '', duration = 2000 }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;
    let startTime = null;
    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * target));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [isInView, target, duration]);

  return <span ref={ref}>{count}{suffix}</span>;
}

// Animated section wrapper
function AnimatedSection({ children, className = '', delay = 0 }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

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
              <div className="p-2 bg-primary/10 rounded-xl">
                <Sparkles className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-heading font-bold text-xl">Career Assessment</h3>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-muted rounded-full transition-colors">
              <X className="h-5 w-5" />
            </button>
          </div>

          {step === 1 && (
            <div className="space-y-4">
              <p className="text-muted-foreground">Tell us about yourself to get personalized course recommendations.</p>
              <input
                type="text"
                placeholder="Your Name"
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
              <Button onClick={() => setStep(2)} className="w-full bg-primary hover:bg-primary/90 rounded-full">
                Continue <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <p className="text-muted-foreground">What's your current experience level?</p>
              <div className="grid grid-cols-2 gap-3">
                {['Student/Fresher', 'Working Professional', 'Business Owner', 'Career Change'].map((exp) => (
                  <button
                    key={exp}
                    onClick={() => setFormData({ ...formData, experience: exp })}
                    className={`p-4 rounded-xl border-2 text-left transition-all ${
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
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <p className="text-muted-foreground">What's your primary goal?</p>
              <div className="space-y-3">
                {[
                  'Get a job in digital marketing',
                  'Start freelancing',
                  'Grow my business online',
                  'Upskill with AI tools',
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
                onClick={() => setStep(4)} 
                className="w-full bg-primary hover:bg-primary/90 rounded-full"
                disabled={!formData.goal}
              >
                Get Recommendations <Sparkles className="ml-2 h-4 w-4" />
              </Button>
            </div>
          )}

          {step === 4 && (
            <div className="text-center space-y-4">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-brand-success/10 rounded-full">
                <CheckCircle className="h-8 w-8 text-brand-success" />
              </div>
              <h4 className="font-heading font-bold text-xl">Perfect Match Found!</h4>
              <p className="text-muted-foreground">
                Based on your profile, we recommend our <strong className="text-primary">Professional Digital Marketing</strong> course.
              </p>
              <div className="p-4 bg-primary/5 rounded-xl border border-primary/20">
                <p className="text-sm">
                  Our counselor will contact you within 24 hours with a personalized learning path and scholarship options.
                </p>
              </div>
              <Button onClick={onClose} className="w-full bg-primary hover:bg-primary/90 rounded-full">
                Done
              </Button>
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

// Typing animation for search queries
function TypingAnimation() {
  const queries = [
    "best digital marketing course in Kerala",
    "learn SEO near me",
    "AI marketing training Wayanad",
    "Google Ads certification Kerala",
    "social media marketing course",
  ];
  const [currentQuery, setCurrentQuery] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    const query = queries[currentQuery];
    let timeout;

    if (isTyping) {
      if (displayText.length < query.length) {
        timeout = setTimeout(() => {
          setDisplayText(query.slice(0, displayText.length + 1));
        }, 50);
      } else {
        timeout = setTimeout(() => setIsTyping(false), 2000);
      }
    } else {
      if (displayText.length > 0) {
        timeout = setTimeout(() => {
          setDisplayText(displayText.slice(0, -1));
        }, 30);
      } else {
        setCurrentQuery((prev) => (prev + 1) % queries.length);
        setIsTyping(true);
      }
    }

    return () => clearTimeout(timeout);
  }, [displayText, isTyping, currentQuery]);

  return (
    <span className="text-primary">
      {displayText}
      <span className="animate-pulse">|</span>
    </span>
  );
}

export default function Home() {
  const [showAssessment, setShowAssessment] = useState(false);

  return (
    <div className="overflow-hidden">
      {/* Hero Section - Inspired by aivisibility.adviciya.com */}
      <section className="relative min-h-screen flex items-center pt-20 pb-12 overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-primary/5">
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-brand-amber/10 rounded-full blur-3xl animate-pulse animation-delay-1000" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-radial from-primary/5 to-transparent rounded-full" />
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
              <span className="text-sm font-medium text-brand-amber">Now Enrolling for January 2025 Batch</span>
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6"
            >
              Is Your Career{' '}
              <span className="relative">
                <span className="gradient-text">Future-Ready</span>
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
              ?
            </motion.h1>

            {/* Subheadline with typing animation */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-lg md:text-xl text-muted-foreground mb-8 max-w-3xl mx-auto"
            >
              <p className="mb-4">
                <span className="font-semibold text-foreground">73% of employers</span> now require digital marketing skills. 
                Join Skillax Academy and get <span className="text-primary font-semibold">guaranteed internship at Infopark IT Company</span>.
              </p>
              <div className="flex items-center justify-center gap-2 text-muted-foreground">
                <Search className="h-5 w-5" />
                <span>People are searching:</span>
                <TypingAnimation />
              </div>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-wrap justify-center gap-4 mb-12"
            >
              <Button
                onClick={() => setShowAssessment(true)}
                data-testid="hero-assessment-btn"
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-8 py-6 text-lg font-semibold shadow-lg hover:shadow-xl transition-all group"
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

            {/* Trust Indicators */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex flex-wrap justify-center gap-6 md:gap-12 text-sm"
            >
              {[
                { icon: Building, text: 'Internship at Infopark' },
                { icon: Award, text: '15+ Certifications' },
                { icon: Brain, text: 'AI-Powered Learning' },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-2 text-muted-foreground">
                  <item.icon className="h-5 w-5 text-brand-success" />
                  <span>{item.text}</span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Hero Image Grid */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="mt-16 grid grid-cols-4 gap-4 max-w-4xl mx-auto"
          >
            <div className="col-span-2 row-span-2 rounded-3xl overflow-hidden shadow-2xl">
              <img src={images.hero1} alt="Students learning" className="w-full h-full object-cover" />
            </div>
            <div className="rounded-2xl overflow-hidden shadow-xl">
              <img src={images.student1} alt="Success" className="w-full h-full object-cover" />
            </div>
            <div className="rounded-2xl overflow-hidden shadow-xl">
              <img src={images.dashboard} alt="Analytics" className="w-full h-full object-cover" />
            </div>
            <div className="rounded-2xl overflow-hidden shadow-xl">
              <img src={images.aiMarketing} alt="AI Marketing" className="w-full h-full object-cover" />
            </div>
            <div className="rounded-2xl overflow-hidden shadow-xl">
              <img src={images.teamwork} alt="Teamwork" className="w-full h-full object-cover" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Certification Logos Marquee */}
      <section className="py-8 bg-muted/30 border-y border-border overflow-hidden">
        <div className="container-custom mb-4">
          <p className="text-center text-sm text-muted-foreground font-medium uppercase tracking-wider">
            Get Certified by Industry Leaders
          </p>
        </div>
        <div className="relative">
          <div className="flex animate-marquee">
            {[...certificationLogos, ...certificationLogos].map((cert, i) => (
              <div
                key={i}
                className="flex items-center gap-3 px-8 py-4 mx-4 bg-card rounded-xl border border-border shrink-0"
              >
                <img src={cert.logo} alt={cert.name} className="h-8 w-8 object-contain" />
                <span className="font-medium whitespace-nowrap">{cert.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Digital Marketing - Comparison Section */}
      <section className="section-padding">
        <div className="container-custom">
          <AnimatedSection className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 bg-destructive/10 text-destructive rounded-full text-sm font-medium mb-4">
              The Hard Truth
            </span>
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              Your Competitors Are Already<br />
              <span className="gradient-text">Stealing Your Career</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              While you wait, others are learning AI-powered marketing skills and landing high-paying jobs.
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
                  <h3 className="font-heading font-bold text-xl">Without Digital Marketing Skills</h3>
                </div>
                <ul className="space-y-4">
                  {[
                    'Limited job opportunities in dying industries',
                    'No leverage in salary negotiations',
                    'Dependent on traditional job market',
                    'Missing AI revolution in marketing',
                    'Watching others succeed while you struggle',
                    'No freelancing or remote work options',
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
                <div className="absolute top-4 right-4 px-3 py-1 bg-brand-success text-white text-xs font-semibold rounded-full">
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
                    'High-demand skills across all industries',
                    '15+ industry certifications',
                    'Guaranteed internship at Infopark IT company',
                    'Master AI tools: ChatGPT, Midjourney & more',
                    'Freelancing opportunities from Day 1',
                    'Remote work & work-from-home options',
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-brand-success shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <Link to="/contact" className="block mt-6">
                  <Button className="w-full bg-brand-success hover:bg-brand-success/90 text-white rounded-full">
                    Start Your Journey <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Stats Section - Glass Cards */}
      <section className="section-padding bg-primary text-primary-foreground relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
        </div>

        <div className="container-custom relative">
          <AnimatedSection className="text-center mb-12">
            <h2 className="font-heading text-3xl md:text-4xl font-bold">
              Why Skillax is Kerala's #1 Choice
            </h2>
          </AnimatedSection>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { number: 15, suffix: '+', label: 'Certifications', icon: Award },
              { number: 100, suffix: '%', label: 'Practical Training', icon: Target },
              { number: 48, suffix: 'hrs', label: 'AI Tool Training', icon: Brain },
              { number: 4, suffix: ' Months', label: 'Complete Program', icon: Clock },
            ].map((stat, i) => (
              <AnimatedSection key={i} delay={i * 0.1}>
                <div className="card-glass text-center p-6">
                  <stat.icon className="h-8 w-8 mx-auto mb-3 opacity-80" />
                  <div className="font-heading font-bold text-4xl md:text-5xl mb-2">
                    <AnimatedCounter target={stat.number} suffix={stat.suffix} />
                  </div>
                  <div className="text-primary-foreground/80">{stat.label}</div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Courses Section - Only 2 Courses */}
      <section className="section-padding" data-testid="courses-section">
        <div className="container-custom">
          <AnimatedSection className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
              Our Programs
            </span>
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              Choose Your Path to Success
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Two carefully crafted programs designed to make you job-ready with AI-powered skills 
              and guaranteed internship opportunities.
            </p>
          </AnimatedSection>

          <div className="grid lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {courses.map((course, index) => {
              const Icon = course.icon;
              return (
                <AnimatedSection key={course.id} delay={index * 0.15}>
                  <div className={`card-base h-full ${course.bgColor} border-2 hover:border-primary/30 transition-all hover-lift`}>
                    {/* Header */}
                    <div className="flex items-start justify-between mb-6">
                      <div className={`p-4 rounded-2xl bg-gradient-to-br ${course.color}`}>
                        <Icon className="h-8 w-8 text-white" />
                      </div>
                      <span className="px-4 py-1.5 bg-card border border-border rounded-full text-sm font-medium">
                        {course.duration}
                      </span>
                    </div>

                    {/* Content */}
                    <h3 className="font-heading font-bold text-2xl mb-3">{course.title}</h3>
                    <p className="text-muted-foreground mb-6">{course.description}</p>

                    {/* Highlights */}
                    <div className="space-y-3 mb-6">
                      {course.highlights.map((highlight, i) => (
                        <div key={i} className="flex items-center gap-3">
                          <CheckCircle className="h-5 w-5 text-brand-success shrink-0" />
                          <span className="text-sm">{highlight}</span>
                        </div>
                      ))}
                    </div>

                    {/* Certifications */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {course.certifications.map((cert, i) => (
                        <span key={i} className="px-3 py-1 bg-card border border-border rounded-full text-xs font-medium">
                          {cert}
                        </span>
                      ))}
                    </div>

                    {/* CTA */}
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

      {/* AI & Internship Highlight */}
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
                Get real-world experience working with leading IT companies at Infopark, Kerala's 
                premier technology hub. Apply your skills on live projects and build your portfolio.
              </p>

              <div className="grid grid-cols-2 gap-4 mb-8">
                {[
                  { icon: Building, title: 'Infopark Campus', desc: 'Work at premium IT hub' },
                  { icon: Briefcase, title: 'Live Projects', desc: 'Real client experience' },
                  { icon: Users, title: 'Industry Mentors', desc: 'Learn from experts' },
                  { icon: TrendingUp, title: 'Job Conversion', desc: 'High placement rate' },
                ].map((item, i) => (
                  <div key={i} className="p-4 bg-card rounded-xl border border-border">
                    <item.icon className="h-6 w-6 text-primary mb-2" />
                    <h4 className="font-semibold text-sm">{item.title}</h4>
                    <p className="text-xs text-muted-foreground">{item.desc}</p>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-4">
                <Link to="/contact">
                  <Button className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-6">
                    Apply for Internship
                  </Button>
                </Link>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <div className="relative">
                <img
                  src={images.office}
                  alt="Infopark Office"
                  className="rounded-3xl shadow-2xl"
                />
                <div className="absolute -bottom-6 -left-6 bg-card border border-border rounded-2xl p-4 shadow-xl">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-brand-success/10 rounded-lg">
                      <Building className="h-6 w-6 text-brand-success" />
                    </div>
                    <div>
                      <div className="font-semibold">Infopark, Kochi</div>
                      <div className="text-xs text-muted-foreground">Premium IT Hub</div>
                    </div>
                  </div>
                </div>
                <div className="absolute -top-4 -right-4 bg-brand-amber text-white p-4 rounded-2xl shadow-xl">
                  <Brain className="h-8 w-8" />
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Certifications Grid */}
      <section className="section-padding bg-muted/30">
        <div className="container-custom">
          <AnimatedSection className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
              Industry Recognition
            </span>
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
              15+ Certifications Included
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Get certified by global leaders and stand out in the job market.
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 max-w-4xl mx-auto">
            {[
              'Google Ads Search',
              'Google Ads Display',
              'Google Analytics',
              'Meta Blueprint',
              'HubSpot Inbound',
              'HubSpot Content',
              'SEMrush SEO',
              'Canva Pro',
              'LinkedIn Marketing',
              'Email Marketing',
              'Google Tag Manager',
              'YouTube Marketing',
              'Skill India',
              'Skillax Pro',
              'AI Marketing',
            ].map((cert, i) => (
              <AnimatedSection key={i} delay={i * 0.05}>
                <div className="card-base text-center py-4 px-3 hover:border-primary/30 transition-colors">
                  <BadgeCheck className="h-6 w-6 text-primary mx-auto mb-2" />
                  <span className="text-xs font-medium">{cert}</span>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section with Form */}
      <section className="section-padding bg-primary text-primary-foreground relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
        </div>

        <div className="container-custom relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <AnimatedSection>
              <span className="inline-block px-4 py-1.5 bg-white/10 text-white rounded-full text-sm font-medium mb-4">
                Limited Seats for January Batch
              </span>
              <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
                Ready to Transform Your Career?
              </h2>
              <p className="text-primary-foreground/80 text-lg mb-8">
                Join Kerala's most comprehensive digital marketing program with AI-powered 
                curriculum and guaranteed internship at Infopark.
              </p>
              <div className="space-y-4">
                {[
                  'Free Career Counseling',
                  'Flexible Payment Options',
                  'Weekend Batches Available',
                  'Lifetime Placement Support',
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5" />
                    <span>{item}</span>
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
