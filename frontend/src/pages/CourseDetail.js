import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Clock, Users, Award, ArrowRight, CheckCircle, ChevronDown,
  BookOpen, TrendingUp, Cpu, PenTool, Briefcase, Calendar, Loader2,
  Rocket, Brain, Target, Sparkles, Zap, Play, Star, BadgeCheck,
  Building, MessageSquare, MousePointer, Megaphone, Phone, Heart,
  Trophy, Crown, Gem, Flame, Globe, BarChart3, Layers, ArrowUp
} from 'lucide-react';
import { Button } from '../components/ui/button';
import LeadForm from '../components/LeadForm';

const API = "https://ltz6k4u2e5.execute-api.ap-south-1.amazonaws.com/api";

// Course data with full details
const courseData = {
  'professional-digital-marketing': {
    id: 'professional',
    title: 'Professional Digital Marketing',
    subtitle: 'Complete A-Z Mastery Program',
    duration: '4 Months',
    icon: Rocket,
    gradient: 'from-blue-600 via-indigo-600 to-purple-600',
    bgGradient: 'from-blue-500/10 via-indigo-500/10 to-purple-500/10',
    glowColor: 'blue',
    description: 'Transform your career with our comprehensive 4-month program covering SEO, AEO, GEO, GMB, Google Ads, Meta Ads, ChatGPT Ads, 30+ AI tools, blog writing, website building & guaranteed Infopark internship.',
    price: 'Contact for Pricing',
    highlights: [
      { text: 'SEO, AEO, GEO & GMB Mastery', icon: Target, color: 'text-green-500' },
      { text: 'Google Ads & Meta Ads Certification', icon: MousePointer, color: 'text-blue-500' },
      { text: 'ChatGPT Ads - The Next Big Trend!', icon: Megaphone, color: 'text-emerald-500' },
      { text: '30+ AI Tools: ChatGPT, Perplexity, Gemini', icon: Brain, color: 'text-purple-500' },
      { text: 'AI Agent & Bot Building', icon: Cpu, color: 'text-pink-500' },
      { text: 'Blog Writing & Website Building', icon: BookOpen, color: 'text-amber-500' },
      { text: 'Content Marketing & Copywriting', icon: PenTool, color: 'text-cyan-500' },
      { text: 'Guaranteed Internship at Infopark', icon: Building, color: 'text-indigo-500' },
    ],
    certifications: [
      'Google Ads Search', 'Google Ads Display', 'Google Analytics 4',
      'Meta Blueprint', 'HubSpot Inbound', 'HubSpot Content',
      'SEMrush SEO', 'Skillax Professional'
    ],
    modules: [
      { title: 'Digital Marketing Fundamentals', weeks: 'Week 1-2', topics: ['Marketing Psychology', 'Customer Journey Mapping', 'Brand Strategy & Positioning', 'Analytics Setup'], color: 'from-blue-500 to-cyan-500', icon: BookOpen },
      { title: 'SEO, AEO & GEO Mastery', weeks: 'Week 3-5', topics: ['Technical SEO', 'On-Page & Off-Page SEO', 'Answer Engine Optimization (AEO)', 'Local SEO & GMB Optimization'], color: 'from-green-500 to-emerald-500', icon: Target },
      { title: 'Google Ads & YouTube Ads', weeks: 'Week 6-7', topics: ['Search Campaigns', 'Display Network', 'YouTube Advertising', 'Performance Max Campaigns'], color: 'from-red-500 to-orange-500', icon: MousePointer },
      { title: 'Meta Ads (Facebook & Instagram)', weeks: 'Week 8-9', topics: ['Campaign Structure', 'Audience Targeting', 'Creative Strategy', 'Conversion Optimization'], color: 'from-blue-600 to-indigo-600', icon: Globe },
      { title: 'ChatGPT Ads & AI Marketing', weeks: 'Week 10-11', topics: ['ChatGPT Advertising', 'AI-Powered Creatives', 'Conversational Marketing', 'Future Trends'], color: 'from-emerald-500 to-teal-500', icon: Megaphone },
      { title: 'AI Tools & Agent Building', weeks: 'Week 12-13', topics: ['ChatGPT & Perplexity Mastery', 'Gemini & Copilot', 'Virtual Assistant Building', 'Marketing Automation Bots'], color: 'from-purple-500 to-pink-500', icon: Brain },
      { title: 'Content & Blog Marketing', weeks: 'Week 14', topics: ['Blog Strategy & SEO Writing', 'Content Calendar', 'Distribution & Promotion', 'Analytics & Optimization'], color: 'from-amber-500 to-orange-500', icon: PenTool },
      { title: 'Infopark Internship', weeks: 'Week 15-18', topics: ['Live Client Projects', 'Portfolio Building', 'Industry Networking', 'Career Guidance & Placement'], color: 'from-indigo-500 to-purple-500', icon: Building },
    ],
    suitable: ['Students & Freshers (18-25)', 'Career Changers', 'Business Owners', 'Marketing Professionals'],
    stats: { students: '500+', rating: '4.9', projects: '50+', placements: '95%' },
    faqs: [
      { q: 'What are the prerequisites?', a: 'No prior experience required. Basic computer knowledge is enough. We start from scratch and guide you to become an expert.' },
      { q: 'What about batch timings?', a: 'We offer morning (9 AM - 12 PM), afternoon (2 PM - 5 PM), and evening batches. Classes are 3 hours daily, 5 days a week.' },
      { q: 'Is internship guaranteed?', a: 'Yes! Every student gets a 4-week paid internship at Infopark IT companies. This is part of the program, not optional.' },
      { q: 'What certifications will I get?', a: 'You will earn 25+ industry certifications including Google Ads, Meta Blueprint, HubSpot, SEMrush, and Skillax Professional Certificate.' },
      { q: 'Is there EMI available?', a: 'Yes, we offer easy EMI options. Contact our counselor for customized payment plans that suit your budget.' },
    ],
  },
  'ai-powered-marketing': {
    id: 'advanced',
    title: 'Advanced AI-Powered Marketing',
    subtitle: 'Future-Ready Skills Program',
    duration: '2 Months',
    icon: Brain,
    gradient: 'from-purple-600 via-pink-600 to-rose-600',
    bgGradient: 'from-purple-500/10 via-pink-500/10 to-rose-500/10',
    glowColor: 'purple',
    description: 'Master cutting-edge AI marketing tools and automation. Learn ChatGPT, Perplexity, Gemini, AI agent building, and AEO optimization. Perfect for working professionals wanting to upskill with future-ready skills.',
    price: 'Contact for Pricing',
    highlights: [
      { text: '30+ AI Tools Deep Dive', icon: Brain, color: 'text-purple-500' },
      { text: 'Answer Engine Optimization (AEO)', icon: Target, color: 'text-blue-500' },
      { text: 'AI Agent & Bot Building', icon: Cpu, color: 'text-cyan-500' },
      { text: 'Prompt Engineering Mastery', icon: MessageSquare, color: 'text-pink-500' },
      { text: 'AI Content & Image Generation', icon: PenTool, color: 'text-amber-500' },
      { text: 'Marketing Automation', icon: Zap, color: 'text-green-500' },
      { text: 'Weekend Batches Available', icon: Calendar, color: 'text-indigo-500' },
    ],
    certifications: [
      'Skillax AI Expert', 'HubSpot Automation', 
      'Google AI Marketing', 'AI Content Specialist', 'Prompt Engineering Master'
    ],
    modules: [
      { title: 'AI Fundamentals for Marketers', weeks: 'Week 1', topics: ['Understanding AI & ML', 'AI in Marketing Landscape', 'Ethics & Best Practices', 'Setting Up AI Tools'], color: 'from-purple-500 to-violet-500', icon: Brain },
      { title: 'ChatGPT & Prompt Engineering', weeks: 'Week 2-3', topics: ['Advanced Prompt Techniques', 'Content Creation Workflows', 'Ad Copywriting with AI', 'Automation Scripts'], color: 'from-pink-500 to-rose-500', icon: MessageSquare },
      { title: 'Multi-AI Platform Mastery', weeks: 'Week 4-5', topics: ['Perplexity for Research', 'Google Gemini', 'Microsoft Copilot', 'Claude & Grok'], color: 'from-blue-500 to-indigo-500', icon: Globe },
      { title: 'AI Image & Video Tools', weeks: 'Week 6', topics: ['Midjourney & DALL-E', 'Canva AI Features', 'Video Generation', 'Brand Consistency'], color: 'from-amber-500 to-orange-500', icon: PenTool },
      { title: 'Agent Building & Automation', weeks: 'Week 7', topics: ['Virtual Sales Assistants', 'Customer Support Bots', 'Lead Qualification Agents', 'Workflow Automation'], color: 'from-green-500 to-emerald-500', icon: Cpu },
      { title: 'AI Analytics & AEO', weeks: 'Week 8', topics: ['Predictive Analytics', 'AEO Optimization', 'Performance Reporting', 'Future Trends'], color: 'from-cyan-500 to-teal-500', icon: BarChart3 },
    ],
    suitable: ['Working Professionals', 'Digital Marketers', 'Content Creators', 'Entrepreneurs', 'Freelancers'],
    stats: { students: '200+', rating: '4.8', projects: '30+', placements: '90%' },
    faqs: [
      { q: 'Is this course for beginners?', a: 'This course is designed for those with basic marketing knowledge. If you are a complete beginner, we recommend starting with our Professional program.' },
      { q: 'Are weekend batches available?', a: 'Yes! We offer Saturday-Sunday batches (10 AM - 4 PM) specifically for working professionals.' },
      { q: 'What AI tools will I learn?', a: 'You will master 30+ AI tools including ChatGPT, Perplexity, Gemini, Copilot, Grok, Claude, Midjourney, DALL-E, and many more.' },
      { q: 'Will I learn to build AI agents?', a: 'Yes! Agent building is a core part of this program. You will build virtual assistants, chatbots, and automation workflows.' },
      { q: 'Is there a certificate?', a: 'Yes, you will receive 15+ certifications including Skillax AI Expert, HubSpot Automation, and industry-recognized credentials.' },
    ],
  },
};

// Animated section
function AnimatedSection({ children, className = '', delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Glowing orb
function GlowingOrb({ className, color = 'primary' }) {
  const colors = {
    primary: 'bg-primary/20',
    purple: 'bg-purple-500/20',
    blue: 'bg-blue-500/20',
    pink: 'bg-pink-500/20',
  };

  return (
    <motion.div
      className={`absolute rounded-full blur-3xl ${colors[color]} ${className}`}
      animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
      transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
    />
  );
}

// Floating icon
function FloatingIcon({ icon: Icon, className, delay = 0 }) {
  return (
    <motion.div
      className={`absolute ${className}`}
      animate={{ y: [0, -15, 0], rotate: [0, 5, -5, 0] }}
      transition={{ duration: 6, delay, repeat: Infinity, ease: 'easeInOut' }}
    >
      <Icon className="h-full w-full" />
    </motion.div>
  );
}

// Module card
function ModuleCard({ module, index, isActive, onClick }) {
  const Icon = module.icon;
  
  return (
    <motion.div
      onClick={onClick}
      className="cursor-pointer relative group"
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05 }}
      whileHover={{ scale: 1.02, x: 5 }}
    >
      <div className={`absolute inset-0 bg-gradient-to-r ${module.color} rounded-2xl blur-lg opacity-0 group-hover:opacity-30 transition-opacity`} />
      <div className={`relative p-4 rounded-2xl border transition-all ${
        isActive 
          ? `bg-gradient-to-r ${module.color} text-white border-transparent shadow-xl` 
          : 'bg-card border-border hover:border-primary/50'
      }`}>
        <div className="flex items-center gap-3">
          <motion.div 
            className={`p-2.5 rounded-xl ${isActive ? 'bg-white/20' : `bg-gradient-to-br ${module.color}`} shadow-lg`}
            animate={isActive ? { rotate: [0, 5, -5, 0] } : {}}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Icon className="h-5 w-5 text-white" />
          </motion.div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-0.5">
              <h4 className="font-semibold text-sm truncate">{module.title}</h4>
            </div>
            <span className={`text-xs ${isActive ? 'text-white/80' : 'text-muted-foreground'}`}>
              {module.weeks}
            </span>
          </div>
        </div>
        
        <AnimatePresence>
          {isActive && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="mt-3 pt-3 border-t border-white/20"
            >
              <div className="grid grid-cols-2 gap-2">
                {module.topics.map((topic, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="flex items-center gap-1.5 text-xs text-white/90"
                  >
                    <CheckCircle className="h-3 w-3 shrink-0" />
                    <span className="truncate">{topic}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

// Stats card
function StatCard({ value, label, icon: Icon, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay }}
      whileHover={{ y: -5, scale: 1.05 }}
      className="text-center p-4 bg-white/10 rounded-2xl backdrop-blur-sm border border-white/10"
    >
      <Icon className="h-6 w-6 mx-auto mb-2 opacity-90" />
      <div className="font-bold text-2xl mb-0.5">{value}</div>
      <p className="text-xs opacity-80">{label}</p>
    </motion.div>
  );
}

export default function CourseDetail() {
  const { slug } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeModule, setActiveModule] = useState(0);
  const [activeFaq, setActiveFaq] = useState(null);

  useEffect(() => {
    setLoading(true);
    // Use local data first
    const localCourse = courseData[slug];
    if (localCourse) {
      setCourse(localCourse);
      setLoading(false);
    } else {
      // Fallback to API
      fetch(`${API}/courses/${slug}`)
        .then(res => res.json())
        .then(data => setCourse(data))
        .catch(() => setCourse(courseData['professional-digital-marketing']))
        .finally(() => setLoading(false));
    }
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="font-heading text-2xl font-bold mb-4">Course Not Found</h2>
          <Link to="/courses">
            <Button className="rounded-full">View All Courses</Button>
          </Link>
        </div>
      </div>
    );
  }

  const Icon = course.icon || Rocket;

  return (
    <div className="overflow-hidden bg-background">
      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center pt-20 overflow-hidden">
        {/* Background */}
        <div className={`absolute inset-0 bg-gradient-to-br ${course.gradient}`}>
          <GlowingOrb className="top-20 left-10 w-96 h-96" color={course.glowColor} />
          <GlowingOrb className="bottom-20 right-10 w-[500px] h-[500px]" color="pink" />
          
          {/* Floating icons */}
          <FloatingIcon icon={Rocket} className="top-32 left-[8%] w-16 h-16 text-white/10" delay={0} />
          <FloatingIcon icon={Brain} className="bottom-32 right-[10%] w-20 h-20 text-white/10" delay={1} />
          <FloatingIcon icon={Trophy} className="top-1/2 right-[20%] w-14 h-14 text-white/10" delay={2} />
          <FloatingIcon icon={Target} className="bottom-40 left-[15%] w-12 h-12 text-white/10" delay={3} />
        </div>

        <div className="container-custom relative z-10 text-white">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <AnimatedSection>
              <Link 
                to="/courses" 
                className="inline-flex items-center gap-2 text-white/70 hover:text-white mb-6 transition-colors"
              >
                <ArrowRight className="h-4 w-4 rotate-180" />
                All Courses
              </Link>
              
              <motion.div 
                className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full text-sm font-medium mb-6 backdrop-blur-sm"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
              >
                <Flame className="h-4 w-4 text-amber-400" />
                <span>Founding Batch - March 2026</span>
                <Sparkles className="h-4 w-4 text-amber-400" />
              </motion.div>

              <motion.div 
                className={`inline-flex p-5 bg-white/10 rounded-2xl mb-6 backdrop-blur-sm`}
                whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
                transition={{ duration: 0.5 }}
              >
                <Icon className="h-12 w-12" />
              </motion.div>

              <span className="block text-sm font-medium text-white/70 mb-2">{course.subtitle}</span>
              <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold mb-4" data-testid="course-title">
                {course.title}
              </h1>
              <p className="text-lg text-white/80 mb-6 max-w-xl">
                {course.description}
              </p>

              {/* Meta */}
              <div className="flex flex-wrap gap-4 mb-8">
                <span className="flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full backdrop-blur-sm">
                  <Clock className="h-4 w-4" />
                  <span className="font-semibold">{course.duration}</span>
                </span>
                <span className="flex items-center gap-2 px-4 py-2 bg-amber-500/20 rounded-full">
                  <Award className="h-4 w-4 text-amber-400" />
                  <span className="font-semibold">{course.certifications?.length}+ Certifications</span>
                </span>
                <span className="flex items-center gap-2 px-4 py-2 bg-green-500/20 rounded-full">
                  <Star className="h-4 w-4 text-green-400 fill-green-400" />
                  <span className="font-semibold">{course.stats?.rating} Rating</span>
                </span>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-4 gap-3">
                <StatCard value={course.stats?.students} label="Students" icon={Users} delay={0} />
                <StatCard value={course.stats?.projects} label="Projects" icon={Briefcase} delay={0.1} />
                <StatCard value={course.stats?.rating} label="Rating" icon={Star} delay={0.2} />
                <StatCard value={course.stats?.placements} label="Placements" icon={TrendingUp} delay={0.3} />
              </div>
            </AnimatedSection>

            {/* Right - Enquiry Form */}
            <AnimatedSection delay={0.2}>
              <div className="bg-card text-foreground rounded-3xl p-8 shadow-2xl">
                <div className="flex items-center gap-2 mb-4">
                  <Sparkles className="h-5 w-5 text-amber-500" />
                  <span className="font-semibold text-amber-600">Limited Seats Available</span>
                </div>
                <h3 className="font-heading font-bold text-2xl mb-2">Enroll Now</h3>
                <p className="text-muted-foreground text-sm mb-6">
                  Get a free counseling session. Our expert will guide you through the program.
                </p>
                <LeadForm source={`course_${slug}`} />
              </div>
            </AnimatedSection>
          </div>
        </div>

        {/* Wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" className="w-full">
            <path d="M0 120V60C240 100 480 20 720 60C960 100 1200 20 1440 60V120H0Z" fill="currentColor" className="text-background"/>
          </svg>
        </div>
      </section>

      {/* What You'll Learn */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Highlights */}
            <AnimatedSection>
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-semibold mb-4">
                <Sparkles className="h-4 w-4" />
                What You'll Learn
              </span>
              <h2 className="font-heading text-3xl md:text-4xl font-bold mb-6">
                Master These{' '}
                <span className={`text-transparent bg-clip-text bg-gradient-to-r ${course.gradient}`}>
                  Skills
                </span>
              </h2>
              <div className="space-y-3">
                {course.highlights?.map((highlight, i) => {
                  const HIcon = highlight.icon;
                  return (
                    <motion.div 
                      key={i}
                      className="flex items-center gap-4 p-4 rounded-xl hover:bg-muted/50 transition-all group cursor-default"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.05 }}
                      whileHover={{ x: 10 }}
                    >
                      <div className={`p-3 rounded-xl bg-gradient-to-br ${course.gradient} bg-opacity-10 group-hover:scale-110 transition-transform`}>
                        <HIcon className={`h-6 w-6 ${highlight.color}`} />
                      </div>
                      <span className="font-medium text-lg">{highlight.text}</span>
                    </motion.div>
                  );
                })}
              </div>
            </AnimatedSection>

            {/* Curriculum */}
            <AnimatedSection delay={0.1}>
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-amber-500/10 text-amber-600 rounded-full text-sm font-semibold mb-4">
                <Layers className="h-4 w-4" />
                Course Curriculum
              </span>
              <h2 className="font-heading text-3xl md:text-4xl font-bold mb-6">
                {course.modules?.length} Comprehensive{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-500">
                  Modules
                </span>
              </h2>
              <div className="space-y-3 max-h-[600px] overflow-y-auto pr-2">
                {course.modules?.map((module, i) => (
                  <ModuleCard 
                    key={i}
                    module={module}
                    index={i}
                    isActive={activeModule === i}
                    onClick={() => setActiveModule(activeModule === i ? -1 : i)}
                  />
                ))}
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="section-padding bg-muted/30">
        <div className="container-custom">
          <AnimatedSection className="text-center mb-12">
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-amber-500/10 text-amber-600 rounded-full text-sm font-semibold mb-4">
              <Trophy className="h-4 w-4" />
              Industry Recognition
            </span>
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
              {course.certifications?.length}+ Certifications{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-500">
                Included
              </span>
            </h2>
          </AnimatedSection>

          <div className="flex flex-wrap justify-center gap-3">
            {course.certifications?.map((cert, i) => (
              <motion.span
                key={i}
                className="px-4 py-2 bg-card border border-border rounded-full text-sm font-medium flex items-center gap-2 hover:border-primary/50 hover:bg-primary/5 transition-all cursor-default"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.03 }}
                whileHover={{ scale: 1.05, y: -2 }}
              >
                <BadgeCheck className="h-4 w-4 text-green-500" />
                {cert}
              </motion.span>
            ))}
          </div>
        </div>
      </section>

      {/* Perfect For */}
      <section className="section-padding">
        <div className="container-custom">
          <AnimatedSection className="text-center mb-12">
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-semibold mb-4">
              <Users className="h-4 w-4" />
              Who Is This For?
            </span>
            <h2 className="font-heading text-3xl md:text-4xl font-bold">
              Perfect For
            </h2>
          </AnimatedSection>

          <div className="flex flex-wrap justify-center gap-4">
            {course.suitable?.map((item, i) => (
              <motion.div
                key={i}
                className={`px-6 py-3 bg-gradient-to-r ${course.bgGradient} border border-primary/20 rounded-full font-medium`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ scale: 1.05 }}
              >
                {item}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="section-padding bg-muted/30">
        <div className="container-custom">
          <AnimatedSection className="text-center mb-12">
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-semibold mb-4">
              <MessageSquare className="h-4 w-4" />
              FAQs
            </span>
            <h2 className="font-heading text-3xl md:text-4xl font-bold">
              Frequently Asked Questions
            </h2>
          </AnimatedSection>

          <div className="max-w-3xl mx-auto space-y-4">
            {course.faqs?.map((faq, i) => (
              <AnimatedSection key={i} delay={i * 0.05}>
                <motion.div
                  className="bg-card border border-border rounded-2xl overflow-hidden"
                  whileHover={{ scale: 1.01 }}
                >
                  <button
                    onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                    className="w-full p-5 flex items-center justify-between text-left"
                  >
                    <span className="font-semibold">{faq.q}</span>
                    <motion.div
                      animate={{ rotate: activeFaq === i ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ChevronDown className="h-5 w-5 text-muted-foreground" />
                    </motion.div>
                  </button>
                  <AnimatePresence>
                    {activeFaq === i && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="px-5 pb-5"
                      >
                        <p className="text-muted-foreground">{faq.a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className={`section-padding bg-gradient-to-br ${course.gradient} text-white relative overflow-hidden`}>
        <GlowingOrb className="top-10 left-10 w-80 h-80" color="pink" />
        <GlowingOrb className="bottom-10 right-10 w-96 h-96" color="purple" />
        
        <FloatingIcon icon={Rocket} className="top-20 left-[10%] w-16 h-16 text-white/10" />
        <FloatingIcon icon={Trophy} className="bottom-20 right-[10%] w-20 h-20 text-white/10" />

        <div className="container-custom relative z-10 text-center">
          <AnimatedSection>
            <motion.div
              className="inline-flex items-center justify-center w-20 h-20 bg-white/10 rounded-full mb-6 backdrop-blur-sm"
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            >
              <Sparkles className="h-10 w-10 text-amber-400" />
            </motion.div>
            
            <h2 className="font-heading text-3xl md:text-5xl font-bold mb-4">
              Ready to Transform Your Career?
            </h2>
            <p className="text-white/80 max-w-2xl mx-auto mb-8 text-lg">
              Join our Founding Batch - March 2026. Limited to 15 students only.
            </p>
            
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/contact">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button size="lg" className="bg-white text-primary hover:bg-white/90 rounded-full px-10 py-7 font-bold shadow-2xl">
                    <Flame className="mr-2 h-5 w-5" />
                    Enroll Now
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </motion.div>
              </Link>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button size="lg" variant="outline" className="border-2 border-white/30 text-white hover:bg-white/10 rounded-full px-10 py-7 font-semibold">
                  <Phone className="mr-2 h-5 w-5" />
                  Talk to Counselor
                </Button>
              </motion.div>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}
