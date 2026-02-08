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
  Network, Workflow, CircuitBoard, Cpu as CpuIcon, Cog,
  LineChart, PieChart, Activity, Database, Server, Cloud
} from 'lucide-react';
import { Button } from '../components/ui/button';
import LeadForm from '../components/LeadForm';

// Rotating hero hooks - multiple value propositions
const heroHooks = [
  { text: '30+ AI Tools', icon: Brain, color: 'from-purple-500 to-pink-500' },
  { text: '30+ Certifications', icon: Award, color: 'from-amber-500 to-orange-500' },
  { text: 'Infopark Internship', icon: Building, color: 'from-blue-500 to-cyan-500' },
  { text: '100% Placement', icon: Briefcase, color: 'from-green-500 to-emerald-500' },
  { text: 'AI Agent Building', icon: Bot, color: 'from-violet-500 to-purple-500' },
  { text: 'Virtual Agents', icon: Network, color: 'from-pink-500 to-rose-500' },
  { text: 'Personal AI Assistants', icon: Cpu, color: 'from-cyan-500 to-teal-500' },
  { text: 'Corporate Ready Skills', icon: Crown, color: 'from-indigo-500 to-blue-500' },
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

// Student roadmap steps
const roadmapSteps = [
  { 
    phase: 'Foundation',
    week: 'Week 1-4',
    title: 'Digital Marketing Fundamentals',
    skills: ['Marketing Psychology', 'Customer Journey Mapping', 'Analytics Setup', 'Brand Strategy'],
    icon: BookOpen,
    color: 'from-blue-500 to-cyan-500'
  },
  { 
    phase: 'Growth',
    week: 'Week 5-8',
    title: 'AI Tools & Automation Mastery',
    skills: ['ChatGPT Pro', 'Perplexity AI', 'Gemini & Copilot', 'Prompt Engineering'],
    icon: Brain,
    color: 'from-purple-500 to-pink-500'
  },
  { 
    phase: 'Specialization',
    week: 'Week 9-12',
    title: 'SEO, AEO & GEO Optimization',
    skills: ['Technical SEO', 'Answer Engine Optimization', 'Local SEO', 'Schema Markup'],
    icon: Target,
    color: 'from-green-500 to-emerald-500'
  },
  { 
    phase: 'Advanced',
    week: 'Week 13-14',
    title: 'AI Agent Building',
    skills: ['Virtual Assistants', 'Personal AI Agents', 'Workflow Automation', 'Custom Bots'],
    icon: Bot,
    color: 'from-violet-500 to-purple-500'
  },
  { 
    phase: 'Internship',
    week: 'Week 15-18',
    title: 'Infopark Real-World Experience',
    skills: ['Client Projects', 'Portfolio Building', 'Industry Networking', 'Job Placement'],
    icon: Building,
    color: 'from-amber-500 to-orange-500'
  },
];

// Agent building features
const agentFeatures = [
  { 
    title: 'Virtual Sales Agents',
    desc: 'Build AI agents that qualify leads 24/7, answer queries, and book appointments automatically',
    icon: MessageSquare,
    gradient: 'from-blue-500 to-cyan-500'
  },
  { 
    title: 'Personal AI Assistants',
    desc: 'Create custom AI assistants for productivity, content creation, and task management',
    icon: Bot,
    gradient: 'from-purple-500 to-pink-500'
  },
  { 
    title: 'Marketing Automation Bots',
    desc: 'Deploy intelligent bots for email campaigns, social media, and customer engagement',
    icon: Workflow,
    gradient: 'from-green-500 to-emerald-500'
  },
  { 
    title: 'Data Analysis Agents',
    desc: 'Build agents that analyze marketing data, generate reports, and provide insights',
    icon: BarChart3,
    gradient: 'from-amber-500 to-orange-500'
  },
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
    description: 'Complete A-Z digital marketing mastery with 30+ AI tools, AI agent building, live projects & guaranteed internship at Infopark IT company.',
    highlights: [
      'SEO, AEO, GEO Optimization',
      'Google Ads & Meta Ads Mastery',
      'AI Agent & Bot Building',
      '30+ AI Tools Training',
      'Virtual Assistant Creation',
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
    description: 'Master cutting-edge AI tools, personal agent building, and automation. Perfect for professionals wanting to shine in corporates.',
    highlights: [
      '30+ AI Tools Mastery',
      'Personal AI Agent Building',
      'Answer Engine Optimization (AEO)',
      'Marketing Automation',
      'Corporate-Ready Skills',
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
          <span className={`text-3xl md:text-5xl font-bold bg-gradient-to-r ${current.color} bg-clip-text text-transparent`}>
            {current.text}
          </span>
        </motion.div>
      </AnimatePresence>
    </div>
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
            Digital marketing and AI skills are in unprecedented demand across the globe. 
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
              <span>{region.region}</span>
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
            animate={{ x: [0, -1000] }}
            transition={{ x: { duration: 20, repeat: Infinity, ease: 'linear' } }}
          >
            {[...Array(3)].map((_, i) => (
              <div key={i} className="flex gap-8 items-center">
                <span className="text-2xl font-bold text-muted-foreground/30">AI MARKETING</span>
                <Sparkles className="h-6 w-6 text-muted-foreground/30" />
                <span className="text-2xl font-bold text-muted-foreground/30">DIGITAL TRANSFORMATION</span>
                <Zap className="h-6 w-6 text-muted-foreground/30" />
                <span className="text-2xl font-bold text-muted-foreground/30">AGENT BUILDING</span>
                <Bot className="h-6 w-6 text-muted-foreground/30" />
                <span className="text-2xl font-bold text-muted-foreground/30">GLOBAL CAREERS</span>
                <Globe className="h-6 w-6 text-muted-foreground/30" />
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// Student Roadmap Section
function RoadmapSection() {
  return (
    <section className="section-padding relative overflow-hidden">
      {/* Background */}
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
              Full Stack Digital Strategist
            </span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A structured 18-week roadmap to transform you from beginner to corporate-ready 
            digital transformation strategist with AI agent building skills.
          </p>
        </AnimatedSection>

        {/* Roadmap Timeline */}
        <div className="relative">
          {/* Connection Line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-500 via-purple-500 to-amber-500 hidden lg:block transform -translate-x-1/2" />

          <div className="space-y-8">
            {roadmapSteps.map((step, index) => {
              const Icon = step.icon;
              const isLeft = index % 2 === 0;

              return (
                <AnimatedSection key={step.phase} delay={index * 0.1}>
                  <div className={`flex items-center gap-8 ${isLeft ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}>
                    {/* Content Card */}
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

                    {/* Center Node */}
                    <div className="hidden lg:flex items-center justify-center">
                      <motion.div
                        className={`w-12 h-12 rounded-full bg-gradient-to-br ${step.color} flex items-center justify-center text-white font-bold shadow-lg z-10`}
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 2, repeat: Infinity, delay: index * 0.2 }}
                      >
                        {index + 1}
                      </motion.div>
                    </div>

                    {/* Spacer for alternating layout */}
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

// AI Agent Building Section
function AgentBuildingSection() {
  return (
    <section className="section-padding bg-gradient-to-br from-violet-900 via-purple-900 to-indigo-900 text-white relative overflow-hidden">
      {/* Animated background */}
      <FloatingOrb className="top-20 left-10 w-72 h-72 bg-purple-500/20" delay={0} />
      <FloatingOrb className="bottom-20 right-10 w-96 h-96 bg-pink-500/20" delay={2} />
      
      {/* Circuit pattern overlay */}
      <div className="absolute inset-0 opacity-10">
        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <pattern id="circuit" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
            <circle cx="10" cy="10" r="1" fill="white" />
            <line x1="10" y1="10" x2="20" y2="10" stroke="white" strokeWidth="0.5" />
            <line x1="10" y1="10" x2="10" y2="20" stroke="white" strokeWidth="0.5" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#circuit)" />
        </svg>
      </div>

      <div className="container-custom relative z-10">
        <AnimatedSection className="text-center mb-16">
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center justify-center w-20 h-20 bg-white/10 rounded-full mb-6 backdrop-blur-sm"
          >
            <Bot className="h-10 w-10 text-white" />
          </motion.div>
          <h2 className="font-heading text-3xl md:text-5xl font-bold mb-4">
            Learn to Build{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-orange-400">
              AI Agents
            </span>
          </h2>
          <p className="text-white/70 max-w-2xl mx-auto text-lg">
            Stand out in corporates by building virtual assistants, personal AI agents, 
            and marketing automation bots that work 24/7.
          </p>
        </AnimatedSection>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {agentFeatures.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <AnimatedSection key={feature.title} delay={index * 0.1}>
                <motion.div
                  className="relative group h-full"
                  whileHover={{ y: -10 }}
                >
                  <div className={`absolute inset-0 bg-gradient-to-r ${feature.gradient} rounded-3xl blur-xl opacity-20 group-hover:opacity-40 transition-opacity`} />
                  <div className="relative bg-white/5 border border-white/10 rounded-3xl p-6 backdrop-blur-sm h-full hover:border-white/30 transition-all">
                    <motion.div
                      className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-4 shadow-lg`}
                      whileHover={{ rotate: [0, -10, 10, 0] }}
                      transition={{ duration: 0.5 }}
                    >
                      <Icon className="h-7 w-7 text-white" />
                    </motion.div>
                    <h3 className="font-heading font-semibold text-xl mb-2">{feature.title}</h3>
                    <p className="text-white/60 text-sm">{feature.desc}</p>
                  </div>
                </motion.div>
              </AnimatedSection>
            );
          })}
        </div>

        {/* Agent building stats */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { value: '85%', label: 'Companies Seeking Agent Builders' },
            { value: '3x', label: 'Higher Salaries for AI Skills' },
            { value: '500%', label: 'Growth in AI Agent Demand' },
            { value: '24/7', label: 'Your Agents Work Non-Stop' },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-center p-4 bg-white/5 rounded-2xl border border-white/10"
            >
              <div className="text-3xl font-bold text-amber-400 mb-1">{stat.value}</div>
              <div className="text-xs text-white/60">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
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
              <div className="p-2 bg-gradient-to-br from-primary to-purple-600 rounded-xl">
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
              className="bg-gradient-to-r from-primary to-purple-600 h-2 rounded-full"
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
                {['Get a high-paying job', 'Build AI Agents for corporates', 'Start freelancing', 'Grow my business'].map((option) => (
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
              <div className="inline-flex items-center justify-center w-20 h-20 bg-green-500/10 rounded-full mb-4">
                <CheckCircle className="h-10 w-10 text-green-500" />
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
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start']
  });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 150]);

  return (
    <div className="overflow-hidden">
      {/* Hero Section with Parallax */}
      <section ref={heroRef} className="relative min-h-screen flex items-center pt-20 overflow-hidden">
        {/* Background */}
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
              className="flex flex-wrap justify-center gap-3 mb-8"
            >
              {[
                { icon: Building, text: 'Infopark Internship', color: 'bg-blue-500/10 text-blue-600 border-blue-500/20' },
                { icon: Award, text: '30+ Certifications', color: 'bg-amber-500/10 text-amber-600 border-amber-500/20' },
                { icon: Bot, text: 'AI Agent Building', color: 'bg-purple-500/10 text-purple-600 border-purple-500/20' },
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
              className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold mb-6"
            >
              at <span className="text-primary">Skillax</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8"
            >
              Kerala's #1 AI-powered digital marketing training academy. 
              Learn to build AI agents, virtual assistants & get certified with 30+ certifications + guaranteed Infopark internship.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-wrap justify-center gap-4 mb-10"
            >
              <Link to="/courses">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button size="lg" className="bg-gradient-to-r from-primary to-purple-600 hover:opacity-90 text-white rounded-full px-8 font-semibold shadow-lg">
                    Explore Training Programs
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </motion.div>
              </Link>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  size="lg"
                  variant="outline"
                  className="rounded-full px-8 border-2"
                  onClick={() => setShowAssessment(true)}
                >
                  <Play className="mr-2 h-5 w-5" />
                  Free Career Guidance
                </Button>
              </motion.div>
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
                <Zap className="h-4 w-4 text-green-600" />
                <span className="text-sm font-medium text-green-600">Limited to 15 Students</span>
              </div>
            </motion.div>
          </div>
        </motion.div>
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

      {/* Global Digital Transformation Stats */}
      <GlobalStatsSection />

      {/* Student Roadmap */}
      <RoadmapSection />

      {/* AI Agent Building */}
      <AgentBuildingSection />

      {/* Courses Section */}
      <section className="section-padding">
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
              Comprehensive digital marketing training designed for the AI era. 
              Build agents, master tools, get certified, and land your dream job.
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
                          <CheckCircle className="h-5 w-5 text-green-500 shrink-0" />
                          <span className="text-sm">{highlight}</span>
                        </motion.div>
                      ))}
                    </div>

                    {/* Footer */}
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

          {/* Course Comparison CTA */}
          <AnimatedSection className="mt-12 text-center">
            <Link to="/courses">
              <Button variant="outline" size="lg" className="rounded-full px-8">
                <Layers className="mr-2 h-5 w-5" />
                Compare Courses Side-by-Side
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </AnimatedSection>
        </div>
      </section>

      {/* Why Skillax */}
      <section className="section-padding bg-muted/30">
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
              { icon: Brain, title: '30+ AI Tools', desc: 'ChatGPT, Perplexity, Gemini, Copilot, Grok + Agent Building', color: 'from-purple-500 to-pink-500' },
              { icon: Building, title: 'Infopark Internship', desc: 'Guaranteed internship at top IT companies in Kerala', color: 'from-blue-500 to-cyan-500' },
              { icon: Award, title: '30+ Certifications', desc: 'Google, Meta, HubSpot, SEMrush & more included', color: 'from-amber-500 to-orange-500' },
              { icon: Bot, title: 'Agent Building', desc: 'Build virtual assistants & personal AI agents', color: 'from-violet-500 to-purple-500' },
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

      {/* Testimonials */}
      <section className="section-padding">
        <div className="container-custom">
          <AnimatedSection className="text-center mb-16">
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-semibold mb-4">
              <Heart className="h-4 w-4" />
              Success Stories
            </span>
            <h2 className="font-heading text-3xl md:text-5xl font-bold">
              What Our Students Say
            </h2>
          </AnimatedSection>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { name: 'Rahul K.', role: 'AI Marketing Lead @ Infopark', quote: 'Skillax transformed my career. The AI agent building skills helped me stand out in corporates!' },
              { name: 'Priya M.', role: 'Freelancer - UAE Clients', quote: 'Now serving clients in GCC. The global perspective and AI tools training was game-changing!' },
              { name: 'Arun S.', role: 'Digital Strategist @ MNC', quote: 'The practical training and internship opened so many doors. Building AI agents was the highlight!' },
            ].map((testimonial, index) => (
              <AnimatedSection key={index} delay={index * 0.1}>
                <motion.div 
                  className="card-base h-full"
                  whileHover={{ y: -5 }}
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-primary to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
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
                      <Star key={i} className="h-4 w-4 fill-amber-500 text-amber-500" />
                    ))}
                  </div>
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
                Get a free consultation with our career counselor. 
                Learn about AI agent building, global opportunities, and your personalized roadmap.
              </p>
              <div className="space-y-4">
                {['Free career counseling session', 'AI Agent Building demonstration', 'Global career opportunities overview', 'Personalized learning path'].map((item, i) => (
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

      {/* Career Assessment Modal */}
      <CareerAssessmentModal isOpen={showAssessment} onClose={() => setShowAssessment(false)} />
    </div>
  );
}
