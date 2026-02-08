import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence, useInView, useScroll, useTransform } from 'framer-motion';
import { 
  Clock, Award, ArrowRight, CheckCircle,
  BookOpen, Brain, Building, Users, Rocket, Sparkles,
  Target, Briefcase, Laptop, Calendar, ChevronDown,
  Globe, TrendingUp, Zap, BadgeCheck, Play, Star,
  GraduationCap, Code, Palette, BarChart3, MessageSquare,
  Shield, Heart, Flame, Trophy, Crown, Gem, Layers
} from 'lucide-react';
import { Button } from '../components/ui/button';

// Two courses with full details
const courses = [
  {
    id: 'professional',
    slug: 'professional-digital-marketing',
    title: 'Professional Digital Marketing',
    duration: '4 Months',
    icon: Rocket,
    gradient: 'from-blue-600 via-indigo-600 to-purple-600',
    bgGradient: 'from-blue-500/10 via-indigo-500/10 to-purple-500/10',
    glowColor: 'blue',
    description: 'Complete A-Z digital marketing mastery program with AI tools integration, live projects, and guaranteed internship at Infopark IT company.',
    price: 'Contact for Pricing',
    highlights: [
      { text: 'SEO, AEO, GEO - Complete Optimization', icon: Target },
      { text: 'Google Ads & Meta Ads Certification', icon: BadgeCheck },
      { text: 'ChatGPT Ads - The Next Big Trend!', icon: Sparkles },
      { text: 'AI Tools: ChatGPT, Perplexity, Gemini', icon: Brain },
      { text: 'Reddit & Quora Marketing', icon: MessageSquare },
      { text: 'Content Marketing & Copywriting', icon: BookOpen },
      { text: 'Email Marketing Automation', icon: Zap },
      { text: 'Guaranteed Internship at Infopark', icon: Building },
      { text: '100% Placement Assistance', icon: Briefcase },
    ],
    certifications: [
      'Google Ads Search', 'Google Ads Display', 'Google Analytics 4',
      'Meta Blueprint', 'HubSpot Inbound', 'HubSpot Content',
      'SEMrush SEO', 'Skillax Professional'
    ],
    modules: [
      { title: 'Digital Marketing Fundamentals', weeks: '2 weeks', topics: ['Marketing Basics', 'Customer Journey', 'Digital Channels', 'Analytics Setup'], color: 'from-blue-500 to-cyan-500' },
      { title: 'Search Engine Optimization (SEO)', weeks: '3 weeks', topics: ['On-Page SEO', 'Technical SEO', 'Link Building', 'Local SEO', 'SEO Tools'], color: 'from-green-500 to-emerald-500' },
      { title: 'Answer Engine Optimization (AEO)', weeks: '2 weeks', topics: ['AI Search Optimization', 'ChatGPT Visibility', 'Perplexity Optimization', 'Structured Data'], color: 'from-purple-500 to-pink-500' },
      { title: 'Search Engine Marketing (SEM)', weeks: '2 weeks', topics: ['Google Ads', 'Campaign Setup', 'Bidding Strategies', 'Ad Copywriting', 'Optimization'], color: 'from-orange-500 to-red-500' },
      { title: 'Social Media Marketing', weeks: '3 weeks', topics: ['Facebook & Instagram', 'LinkedIn Marketing', 'Reddit & Quora', 'Content Strategy', 'Community Building'], color: 'from-pink-500 to-rose-500' },
      { title: 'AI Tools & Automation', weeks: '2 weeks', topics: ['ChatGPT Mastery', 'Perplexity, Gemini, Grok', 'AI Content Creation', 'Marketing Automation'], color: 'from-violet-500 to-purple-500' },
      { title: 'Analytics & Reporting', weeks: '1 week', topics: ['GA4 Deep Dive', 'Data Studio', 'ROI Tracking', 'Client Reporting'], color: 'from-cyan-500 to-blue-500' },
      { title: 'Internship at Infopark', weeks: '4 weeks', topics: ['Live Projects', 'Client Work', 'Portfolio Building', 'Job Preparation'], color: 'from-amber-500 to-orange-500' },
    ],
    suitable: ['Students & Freshers (18-25)', 'Career Changers', 'Business Owners', 'Marketing Professionals'],
    featured: true,
  },
  {
    id: 'ai-marketing',
    slug: 'ai-powered-marketing',
    title: 'Advanced AI-Powered Marketing',
    duration: '2 Months',
    icon: Brain,
    gradient: 'from-purple-600 via-pink-600 to-rose-600',
    bgGradient: 'from-purple-500/10 via-pink-500/10 to-rose-500/10',
    glowColor: 'purple',
    description: 'Master cutting-edge AI marketing tools and automation. Perfect for working professionals wanting to upskill with future-ready skills.',
    price: 'Contact for Pricing',
    highlights: [
      { text: 'ChatGPT, Perplexity, Copilot, Gemini, Grok', icon: Brain },
      { text: 'AI Content & Image Generation', icon: Palette },
      { text: 'Answer Engine Optimization (AEO)', icon: Target },
      { text: 'Generative Engine Optimization (GEO)', icon: Globe },
      { text: 'Marketing Automation with AI', icon: Zap },
      { text: 'Prompt Engineering Mastery', icon: Code },
      { text: 'AI Analytics & Insights', icon: BarChart3 },
      { text: 'Weekend Batches Available', icon: Calendar },
    ],
    certifications: [
      'Skillax AI Expert', 'HubSpot Automation', 
      'Google AI Marketing', 'AI Content Specialist', 'Prompt Engineering'
    ],
    modules: [
      { title: 'AI Fundamentals for Marketers', weeks: '1 week', topics: ['Understanding AI', 'AI in Marketing', 'Ethics & Best Practices'], color: 'from-purple-500 to-violet-500' },
      { title: 'ChatGPT & Content Creation', weeks: '2 weeks', topics: ['Prompt Engineering', 'Content Writing', 'Ad Copy', 'Blogs & Articles'], color: 'from-pink-500 to-rose-500' },
      { title: 'Multi-AI Platform Mastery', weeks: '2 weeks', topics: ['Perplexity', 'Google Gemini', 'Microsoft Copilot', 'X Grok', 'Claude'], color: 'from-blue-500 to-indigo-500' },
      { title: 'AI Image & Video Generation', weeks: '1 week', topics: ['Midjourney', 'DALL-E', 'Canva AI', 'Video Tools'], color: 'from-amber-500 to-orange-500' },
      { title: 'Marketing Automation', weeks: '1 week', topics: ['HubSpot AI', 'Email Automation', 'Social Scheduling', 'Lead Scoring'], color: 'from-green-500 to-emerald-500' },
      { title: 'AI-Powered Analytics', weeks: '1 week', topics: ['Predictive Analytics', 'AI Reporting', 'Data Insights', 'Performance Optimization'], color: 'from-cyan-500 to-teal-500' },
    ],
    suitable: ['Working Professionals', 'Digital Marketers', 'Content Creators', 'Entrepreneurs', 'Freelancers'],
    featured: false,
  },
];

// Features with vibrant colors
const features = [
  { icon: Building, title: 'Infopark Internship', desc: 'Real-world experience at top IT companies', gradient: 'from-blue-500 to-cyan-500' },
  { icon: Brain, title: 'AI-First Curriculum', desc: 'Master 30+ cutting-edge AI tools', gradient: 'from-purple-500 to-pink-500' },
  { icon: Award, title: '30+ Certifications', desc: 'Industry-recognized global credentials', gradient: 'from-amber-500 to-orange-500' },
  { icon: Users, title: 'Small Batches', desc: 'Max 15 students for personal attention', gradient: 'from-green-500 to-emerald-500' },
  { icon: Laptop, title: 'Live Projects', desc: 'Work on real client campaigns', gradient: 'from-pink-500 to-rose-500' },
  { icon: Calendar, title: 'Flexible Timings', desc: 'Morning, evening & weekend options', gradient: 'from-cyan-500 to-teal-500' },
  { icon: Target, title: '100% Practical', desc: 'Learn by doing, not just theory', gradient: 'from-orange-500 to-red-500' },
  { icon: Briefcase, title: 'Placement Support', desc: 'Lifetime career assistance', gradient: 'from-indigo-500 to-purple-500' },
];

// AI Tools with logos
const aiTools = [
  { name: 'ChatGPT', gradient: 'from-green-400 to-emerald-500' },
  { name: 'Perplexity', gradient: 'from-blue-400 to-cyan-500' },
  { name: 'Gemini', gradient: 'from-blue-500 to-indigo-600' },
  { name: 'Copilot', gradient: 'from-sky-400 to-blue-500' },
  { name: 'Grok', gradient: 'from-gray-600 to-gray-800' },
  { name: 'Claude', gradient: 'from-orange-400 to-amber-500' },
  { name: 'Midjourney', gradient: 'from-purple-500 to-pink-500' },
  { name: 'DALL-E', gradient: 'from-green-500 to-teal-500' },
  { name: 'Canva AI', gradient: 'from-cyan-400 to-blue-500' },
  { name: 'Jasper', gradient: 'from-red-400 to-pink-500' },
  { name: 'Copy.ai', gradient: 'from-violet-500 to-purple-600' },
  { name: 'HubSpot', gradient: 'from-orange-500 to-red-500' },
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

// Animated section with stagger
function AnimatedSection({ children, className = '', delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
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

// Glowing card component
function GlowCard({ children, className = '', glowColor = 'blue' }) {
  const glowColors = {
    blue: 'hover:shadow-blue-500/20',
    purple: 'hover:shadow-purple-500/20',
    amber: 'hover:shadow-amber-500/20',
  };

  return (
    <motion.div
      className={`relative group ${className}`}
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ duration: 0.3 }}
    >
      <div className={`absolute inset-0 bg-gradient-to-r from-primary/20 to-purple-500/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
      <div className={`relative bg-card border border-border/50 rounded-3xl overflow-hidden backdrop-blur-sm shadow-xl hover:shadow-2xl ${glowColors[glowColor]} transition-all duration-500`}>
        {children}
      </div>
    </motion.div>
  );
}

// Module Accordion with animations
function ModuleAccordion({ modules }) {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <div className="space-y-3">
      {modules.map((module, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.05 }}
          className="overflow-hidden rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm"
        >
          <button
            onClick={() => setOpenIndex(openIndex === index ? -1 : index)}
            className={`w-full flex items-center justify-between p-4 text-left transition-all duration-300 ${
              openIndex === index ? 'bg-gradient-to-r ' + module.color + ' bg-opacity-10' : 'hover:bg-muted/50'
            }`}
          >
            <div className="flex items-center gap-3">
              <motion.span 
                className={`w-10 h-10 flex items-center justify-center rounded-xl text-sm font-bold transition-all duration-300 ${
                  openIndex === index 
                    ? `bg-gradient-to-br ${module.color} text-white shadow-lg` 
                    : 'bg-muted text-muted-foreground'
                }`}
                animate={openIndex === index ? { scale: [1, 1.1, 1] } : {}}
                transition={{ duration: 0.3 }}
              >
                {index + 1}
              </motion.span>
              <div>
                <span className="font-semibold block">{module.title}</span>
                <span className="text-xs text-muted-foreground">{module.weeks}</span>
              </div>
            </div>
            <motion.div
              animate={{ rotate: openIndex === index ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <ChevronDown className="h-5 w-5 text-muted-foreground" />
            </motion.div>
          </button>
          <AnimatePresence>
            {openIndex === index && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="p-4 pt-0">
                  <div className="grid grid-cols-2 gap-3 pt-3 border-t border-border/50">
                    {module.topics.map((topic, i) => (
                      <motion.div 
                        key={i} 
                        className="flex items-center gap-2 text-sm"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.05 }}
                      >
                        <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${module.color}`} />
                        <span className="text-muted-foreground">{topic}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      ))}
    </div>
  );
}

// Stat card with animation
function StatCard({ value, label, icon: Icon, delay }) {
  const { count, ref } = useAnimatedCounter(parseInt(value), 2000);
  const suffix = value.replace(/[0-9]/g, '');

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay }}
      whileHover={{ scale: 1.05, y: -5 }}
      className="relative group"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-white/5 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
      <div className="relative text-center p-6 bg-white/10 rounded-2xl backdrop-blur-sm border border-white/20">
        <motion.div
          animate={{ rotate: [0, 5, -5, 0] }}
          transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
        >
          <Icon className="h-8 w-8 mx-auto mb-3 opacity-90" />
        </motion.div>
        <div className="font-heading font-bold text-3xl md:text-4xl mb-1">
          {count}{suffix}
        </div>
        <p className="text-sm opacity-80">{label}</p>
      </div>
    </motion.div>
  );
}

// Course card component
function CourseCard({ course, index }) {
  const Icon = course.icon;
  
  return (
    <AnimatedSection delay={index * 0.15}>
      <GlowCard glowColor={course.glowColor} className="h-full">
        {/* Featured Badge */}
        {course.featured && (
          <div className="relative">
            <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 text-white text-center py-3 text-sm font-bold">
              <motion.span
                className="inline-flex items-center gap-2"
                animate={{ scale: [1, 1.02, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <Flame className="h-4 w-4" />
                MOST POPULAR - RECOMMENDED FOR BEGINNERS
                <Flame className="h-4 w-4" />
              </motion.span>
            </div>
            <div className="h-12" />
          </div>
        )}

        <div className="p-8">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Left Side - Info */}
            <div>
              {/* Header */}
              <div className="flex items-start gap-4 mb-6">
                <motion.div 
                  className={`p-4 rounded-2xl bg-gradient-to-br ${course.gradient} shadow-lg`}
                  whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
                  transition={{ duration: 0.5 }}
                >
                  <Icon className="h-8 w-8 text-white" />
                </motion.div>
                <div>
                  <h2 className="font-heading font-bold text-2xl md:text-3xl bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text">
                    {course.title}
                  </h2>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mt-2">
                    <span className="flex items-center gap-1.5 px-3 py-1 bg-muted/50 rounded-full">
                      <Clock className="h-4 w-4" />
                      {course.duration}
                    </span>
                    <span className="flex items-center gap-1.5 px-3 py-1 bg-muted/50 rounded-full">
                      <Award className="h-4 w-4 text-amber-500" />
                      {course.certifications.length} Certs
                    </span>
                  </div>
                </div>
              </div>

              <p className="text-muted-foreground mb-6 leading-relaxed">{course.description}</p>

              {/* Highlights with icons */}
              <div className="space-y-3 mb-6">
                {course.highlights.map((highlight, i) => {
                  const HIcon = highlight.icon;
                  return (
                    <motion.div 
                      key={i} 
                      className="flex items-center gap-3 p-2 rounded-xl hover:bg-muted/30 transition-colors"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.03 }}
                      whileHover={{ x: 5 }}
                    >
                      <div className={`p-1.5 rounded-lg bg-gradient-to-br ${course.gradient} bg-opacity-10`}>
                        <HIcon className="h-4 w-4 text-primary" />
                      </div>
                      <span className="text-sm font-medium">{highlight.text}</span>
                    </motion.div>
                  );
                })}
              </div>

              {/* Certifications */}
              <div className="mb-6">
                <h4 className="text-sm font-semibold mb-3 flex items-center gap-2">
                  <Trophy className="h-4 w-4 text-amber-500" />
                  Certifications Included:
                </h4>
                <div className="flex flex-wrap gap-2">
                  {course.certifications.map((cert, i) => (
                    <motion.span 
                      key={i} 
                      className="px-3 py-1.5 bg-gradient-to-r from-muted/50 to-muted/30 border border-border/50 rounded-full text-xs font-medium flex items-center gap-1.5 hover:border-primary/50 transition-colors cursor-default"
                      whileHover={{ scale: 1.05 }}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.02 }}
                    >
                      <BadgeCheck className="h-3 w-3 text-green-500" />
                      {cert}
                    </motion.span>
                  ))}
                </div>
              </div>

              {/* Suitable For */}
              <div className="mb-6">
                <h4 className="text-sm font-semibold mb-3 flex items-center gap-2">
                  <Users className="h-4 w-4 text-blue-500" />
                  Perfect For:
                </h4>
                <div className="flex flex-wrap gap-2">
                  {course.suitable.map((item, i) => (
                    <span key={i} className={`px-3 py-1.5 bg-gradient-to-r ${course.bgGradient} border border-primary/20 rounded-full text-xs font-medium text-primary`}>
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                <Link to="/contact" className="flex-1">
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Button className={`w-full bg-gradient-to-r ${course.gradient} text-white rounded-full py-6 font-semibold shadow-lg hover:shadow-xl transition-shadow`}>
                      <Sparkles className="mr-2 h-5 w-5" />
                      Enroll Now
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </motion.div>
                </Link>
                <Button variant="outline" className="rounded-full py-6 border-2 hover:bg-muted/50">
                  <BookOpen className="mr-2 h-5 w-5" />
                  Download Syllabus
                </Button>
              </div>
            </div>

            {/* Right Side - Curriculum */}
            <div>
              <h4 className="font-semibold mb-4 flex items-center gap-2">
                <Layers className="h-5 w-5 text-primary" />
                Course Curriculum
              </h4>
              <ModuleAccordion modules={course.modules} />
            </div>
          </div>
        </div>
      </GlowCard>
    </AnimatedSection>
  );
}

export default function Courses() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start']
  });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <div className="overflow-hidden bg-background">
      {/* Hero Section with Parallax */}
      <section ref={heroRef} className="relative min-h-[90vh] flex items-center pt-20 overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-indigo-600 to-purple-700">
          {/* Animated mesh gradient */}
          <div className="absolute inset-0 opacity-30">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-blue-400 via-transparent to-transparent" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-purple-400 via-transparent to-transparent" />
          </div>
          
          {/* Floating orbs */}
          <FloatingOrb className="top-20 left-10 w-72 h-72 bg-white/10" delay={0} />
          <FloatingOrb className="bottom-20 right-10 w-96 h-96 bg-amber-400/10" delay={2} />
          <FloatingOrb className="top-1/2 left-1/2 w-64 h-64 bg-pink-400/10" delay={4} />
          
          {/* Floating icons */}
          <motion.div
            className="absolute top-32 left-[10%] text-white/10"
            animate={{ y: [0, -20, 0], rotate: [0, 10, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
          >
            <Rocket className="h-24 w-24" />
          </motion.div>
          <motion.div
            className="absolute bottom-32 right-[10%] text-white/10"
            animate={{ y: [0, 20, 0], rotate: [0, -10, 0] }}
            transition={{ duration: 5, repeat: Infinity, delay: 1 }}
          >
            <Brain className="h-28 w-28" />
          </motion.div>
          <motion.div
            className="absolute top-1/2 right-[20%] text-white/10"
            animate={{ y: [0, -15, 0], scale: [1, 1.1, 1] }}
            transition={{ duration: 6, repeat: Infinity, delay: 2 }}
          >
            <Trophy className="h-20 w-20" />
          </motion.div>
          <motion.div
            className="absolute bottom-40 left-[20%] text-white/10"
            animate={{ y: [0, 15, 0], rotate: [0, -5, 5, 0] }}
            transition={{ duration: 7, repeat: Infinity, delay: 3 }}
          >
            <Crown className="h-16 w-16" />
          </motion.div>
        </div>

        <motion.div 
          style={{ y: heroY, opacity: heroOpacity }}
          className="container-custom relative z-10 text-white"
        >
          <AnimatedSection className="text-center max-w-5xl mx-auto">
            {/* Badge */}
            <motion.div
              initial={{ scale: 0, rotate: -10 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: 'spring', stiffness: 200, damping: 15 }}
              className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 border border-white/20 rounded-full text-sm font-medium mb-8 backdrop-blur-md"
            >
              <motion.span
                animate={{ scale: [1, 1.3, 1], rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Rocket className="h-5 w-5 text-amber-400" />
              </motion.span>
              <span className="font-semibold">Founding Batch - March 2026</span>
              <motion.span
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }}
              >
                <Sparkles className="h-5 w-5 text-amber-400" />
              </motion.span>
            </motion.div>

            {/* Title */}
            <motion.h1 
              className="font-heading text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight"
              data-testid="courses-page-title"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              Transform Your Career with{' '}
              <span className="relative">
                <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-orange-400 to-amber-300">
                  AI-Powered
                </span>
                <motion.span
                  className="absolute inset-0 bg-gradient-to-r from-amber-400/20 to-orange-400/20 blur-2xl"
                  animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
                  transition={{ duration: 3, repeat: Infinity }}
                />
              </span>{' '}
              Digital Marketing
            </motion.h1>

            {/* Subtitle */}
            <motion.p 
              className="text-lg md:text-xl text-white/80 max-w-3xl mx-auto mb-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              Two comprehensive programs. 30+ AI tools. 30+ certifications. 
              Real-world internship at Infopark. Everything you need to become a digital marketing expert.
            </motion.p>
            
            {/* CTA Buttons */}
            <motion.div 
              className="flex flex-wrap justify-center gap-4 mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <Link to="/contact">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button size="lg" className="bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-500 hover:to-orange-600 text-white rounded-full px-10 py-7 font-bold shadow-2xl shadow-amber-500/30">
                    <Zap className="mr-2 h-5 w-5" />
                    Enroll Now - Limited Seats
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </motion.div>
              </Link>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button size="lg" variant="outline" className="border-2 border-white/40 text-white hover:bg-white/10 rounded-full px-10 py-7 font-semibold backdrop-blur-sm">
                  <Play className="mr-2 h-5 w-5" />
                  Watch Demo
                </Button>
              </motion.div>
            </motion.div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
              {[
                { value: '30+', label: 'Certifications', icon: Trophy },
                { value: '30+', label: 'AI Tools', icon: Brain },
                { value: '100%', label: 'Practical', icon: Target },
                { value: '15', label: 'Max Students', icon: Users },
              ].map((stat, i) => (
                <StatCard key={i} value={stat.value} label={stat.label} icon={stat.icon} delay={i * 0.1} />
              ))}
            </div>
          </AnimatedSection>
        </motion.div>

        {/* Wave divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" className="w-full">
            <path d="M0 120V60C240 100 480 20 720 60C960 100 1200 20 1440 60V120H0Z" fill="currentColor" className="text-background"/>
          </svg>
        </div>
      </section>

      {/* Course Cards Section */}
      <section className="section-padding relative">
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl" />
        </div>

        <div className="container-custom relative z-10">
          <AnimatedSection className="text-center mb-16">
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-semibold mb-4">
              <GraduationCap className="h-4 w-4" />
              Our Training Programs
            </span>
            <h2 className="font-heading text-3xl md:text-5xl font-bold mb-4">
              Choose Your Path to{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-600">Success</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Industry-leading programs designed to transform you into a digital marketing expert
            </p>
          </AnimatedSection>

          <div className="space-y-12">
            {courses.map((course, index) => (
              <CourseCard key={course.id} course={course} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="section-padding bg-gradient-to-b from-muted/30 to-background relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-primary/5 to-purple-500/5 rounded-full blur-3xl" />
        </div>

        <div className="container-custom relative z-10">
          <AnimatedSection className="text-center mb-16">
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-amber-500/10 text-amber-600 rounded-full text-sm font-semibold mb-4">
              <Gem className="h-4 w-4" />
              Why Skillax
            </span>
            <h2 className="font-heading text-3xl md:text-5xl font-bold mb-4">
              What Sets Us <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-500">Apart</span>
            </h2>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <AnimatedSection key={index} delay={index * 0.05}>
                  <motion.div 
                    className="group relative"
                    whileHover={{ y: -10 }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-purple-500/10 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="relative bg-card border border-border/50 rounded-3xl p-6 text-center h-full backdrop-blur-sm hover:border-primary/30 transition-colors">
                      <motion.div 
                        className={`inline-flex p-4 rounded-2xl bg-gradient-to-br ${feature.gradient} text-white mb-4 shadow-lg`}
                        whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
                        transition={{ duration: 0.5 }}
                      >
                        <Icon className="h-7 w-7" />
                      </motion.div>
                      <h3 className="font-heading font-semibold text-lg mb-2">{feature.title}</h3>
                      <p className="text-sm text-muted-foreground">{feature.desc}</p>
                    </div>
                  </motion.div>
                </AnimatedSection>
              );
            })}
          </div>
        </div>
      </section>

      {/* AI Tools Showcase */}
      <section className="section-padding overflow-hidden">
        <div className="container-custom">
          <AnimatedSection className="text-center mb-12">
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-purple-500/10 text-purple-600 rounded-full text-sm font-semibold mb-4">
              <Brain className="h-4 w-4" />
              AI-First Learning
            </span>
            <h2 className="font-heading text-3xl md:text-5xl font-bold mb-4">
              Master All Major <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500">AI Tools</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Get hands-on training with the AI tools that are reshaping digital marketing
            </p>
          </AnimatedSection>

          {/* Animated tool cards */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {aiTools.map((tool, i) => (
              <AnimatedSection key={i} delay={i * 0.03}>
                <motion.div 
                  className="group relative"
                  whileHover={{ y: -8, scale: 1.05 }}
                >
                  <div className={`absolute inset-0 bg-gradient-to-r ${tool.gradient} rounded-2xl blur-lg opacity-0 group-hover:opacity-30 transition-opacity duration-300`} />
                  <div className="relative bg-card border border-border/50 rounded-2xl p-4 text-center backdrop-blur-sm hover:border-primary/30 transition-all">
                    <motion.div
                      className={`w-12 h-12 mx-auto mb-3 rounded-xl bg-gradient-to-br ${tool.gradient} flex items-center justify-center shadow-lg`}
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.5 }}
                    >
                      <Brain className="h-6 w-6 text-white" />
                    </motion.div>
                    <span className="text-sm font-semibold">{tool.name}</span>
                  </div>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="section-padding relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-indigo-600 to-purple-700">
          <FloatingOrb className="top-10 left-10 w-64 h-64 bg-white/10" delay={0} />
          <FloatingOrb className="bottom-10 right-10 w-80 h-80 bg-amber-400/10" delay={2} />
        </div>
        
        <div className="container-custom relative z-10 text-center text-white">
          <AnimatedSection>
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              className="inline-flex items-center justify-center w-20 h-20 bg-white/10 rounded-full mb-6 backdrop-blur-sm"
            >
              <Sparkles className="h-10 w-10 text-amber-400" />
            </motion.div>
            <h2 className="font-heading text-3xl md:text-5xl font-bold mb-4">
              Not Sure Which Course to Choose?
            </h2>
            <p className="text-white/80 max-w-2xl mx-auto mb-8 text-lg">
              Get a free career assessment and personalized course recommendation from our experts.
            </p>
            <Link to="/contact">
              <motion.div 
                whileHover={{ scale: 1.05 }} 
                whileTap={{ scale: 0.95 }}
                className="inline-block"
              >
                <Button 
                  size="lg"
                  data-testid="courses-cta-btn"
                  className="bg-white text-primary hover:bg-white/90 rounded-full px-12 py-7 font-bold shadow-2xl"
                >
                  <Heart className="mr-2 h-5 w-5" />
                  Get Free Counseling
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </motion.div>
            </Link>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}
