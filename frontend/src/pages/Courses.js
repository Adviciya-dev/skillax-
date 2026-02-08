import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence, useInView, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import { 
  Clock, Award, ArrowRight, CheckCircle, X,
  BookOpen, Brain, Building, Users, Rocket, Sparkles,
  Target, Briefcase, Laptop, Calendar, ChevronDown,
  Globe, TrendingUp, Zap, BadgeCheck, Play, Star,
  GraduationCap, Code, Palette, BarChart3, MessageSquare,
  Shield, Heart, Flame, Trophy, Crown, Gem, Layers,
  MousePointer, Store, Search, Facebook, Megaphone,
  ArrowUp, ChevronRight, Phone, Mail, MapPin,
  CircleCheck, Percent, Gift, Timer, Wifi, Monitor
} from 'lucide-react';
import { Button } from '../components/ui/button';
import SEO from '../components/SEO';
import { QuizCTABanner, AILabCTACard } from '../components/CTAComponents';
import AIMarketingLab from '../components/AIMarketingLab';

// Two courses with full details
const courses = [
  {
    id: 'professional',
    slug: 'professional-digital-marketing',
    title: 'Professional Digital Marketing',
    subtitle: 'Complete A-Z Mastery Program',
    duration: '4 Months',
    icon: Rocket,
    gradient: 'from-blue-600 via-indigo-600 to-purple-600',
    bgGradient: 'from-blue-500/10 via-indigo-500/10 to-purple-500/10',
    glowColor: 'rgba(59, 130, 246, 0.5)',
    accentColor: 'blue',
    description: 'Complete A-Z digital marketing mastery: SEO, AEO, GEO, GMB, Google Ads, Meta Ads, ChatGPT Ads, 30+ AI tools, blog writing, website building & guaranteed Infopark internship.',
    highlights: [
      { text: 'SEO, AEO, GEO & GMB Mastery', icon: Target, color: 'text-green-500' },
      { text: 'Google Ads & Meta Ads Certification', icon: MousePointer, color: 'text-blue-500' },
      { text: 'ChatGPT Ads - The Next Big Trend!', icon: Megaphone, color: 'text-emerald-500' },
      { text: '30+ AI Tools: ChatGPT, Perplexity, Gemini', icon: Brain, color: 'text-purple-500' },
      { text: 'Blog Writing & Website Building', icon: Monitor, color: 'text-pink-500' },
      { text: 'Content Marketing & Copywriting', icon: BookOpen, color: 'text-amber-500' },
      { text: 'Email Marketing Automation', icon: Zap, color: 'text-cyan-500' },
      { text: 'Guaranteed Internship at Infopark', icon: Building, color: 'text-indigo-500' },
    ],
    certifications: [
      'Google Ads Search', 'Google Ads Display', 'Google Analytics 4',
      'Meta Blueprint', 'HubSpot Inbound', 'HubSpot Content',
      'SEMrush SEO', 'Skillax Professional'
    ],
    modules: [
      { title: 'Digital Marketing Fundamentals', weeks: 'Week 1-2', topics: ['Marketing Psychology', 'Customer Journey', 'Brand Strategy', 'Analytics Setup'], color: 'from-blue-500 to-cyan-500', icon: BookOpen },
      { title: 'SEO, AEO & GEO Mastery', weeks: 'Week 3-5', topics: ['Technical SEO', 'On-Page & Off-Page', 'Answer Engine Optimization', 'Local SEO & GMB'], color: 'from-green-500 to-emerald-500', icon: Target },
      { title: 'Google Ads & YouTube Ads', weeks: 'Week 6-7', topics: ['Search Campaigns', 'Display Network', 'YouTube Advertising', 'Performance Max'], color: 'from-red-500 to-orange-500', icon: MousePointer },
      { title: 'Meta Ads (Facebook & Instagram)', weeks: 'Week 8-9', topics: ['Campaign Structure', 'Audience Targeting', 'Creative Strategy', 'Conversion Optimization'], color: 'from-blue-600 to-indigo-600', icon: Facebook },
      { title: 'ChatGPT Ads & AI Marketing', weeks: 'Week 10-11', topics: ['ChatGPT Advertising', 'AI-Powered Creatives', 'Conversational Marketing', 'Future Trends'], color: 'from-emerald-500 to-teal-500', icon: Megaphone },
      { title: 'AI Tools & Agent Building', weeks: 'Week 12-13', topics: ['ChatGPT & Perplexity', 'Gemini & Copilot', 'Virtual Assistants', 'Marketing Bots'], color: 'from-purple-500 to-pink-500', icon: Brain },
      { title: 'Content & Blog Marketing', weeks: 'Week 14', topics: ['Blog Strategy', 'SEO Writing', 'Content Calendar', 'Distribution'], color: 'from-amber-500 to-orange-500', icon: BookOpen },
      { title: 'Infopark Internship', weeks: 'Week 15-18', topics: ['Live Client Projects', 'Portfolio Building', 'Industry Networking', 'Career Guidance'], color: 'from-indigo-500 to-purple-500', icon: Building },
    ],
    suitable: ['Students & Freshers', 'Career Changers', 'Business Owners', 'Marketing Professionals'],
    featured: true,
    stats: { students: '500+', rating: '4.9', projects: '50+' },
  },
  {
    id: 'ai-marketing',
    slug: 'ai-powered-marketing',
    title: 'Advanced AI-Powered Marketing',
    subtitle: 'Future-Ready Skills Program',
    duration: '2 Months',
    icon: Brain,
    gradient: 'from-purple-600 via-pink-600 to-rose-600',
    bgGradient: 'from-purple-500/10 via-pink-500/10 to-rose-500/10',
    glowColor: 'rgba(168, 85, 247, 0.5)',
    accentColor: 'purple',
    description: 'Master cutting-edge AI marketing: ChatGPT, Perplexity, Gemini, AI agents, automation & AEO optimization. Perfect for professionals wanting to upskill.',
    highlights: [
      { text: '30+ AI Tools Deep Dive', icon: Brain, color: 'text-purple-500' },
      { text: 'Answer Engine Optimization (AEO)', icon: Search, color: 'text-blue-500' },
      { text: 'AI Agent & Bot Building', icon: Wifi, color: 'text-cyan-500' },
      { text: 'Prompt Engineering Mastery', icon: Code, color: 'text-pink-500' },
      { text: 'AI Content & Image Generation', icon: Palette, color: 'text-amber-500' },
      { text: 'Marketing Automation', icon: Zap, color: 'text-green-500' },
      { text: 'Weekend Batches Available', icon: Calendar, color: 'text-indigo-500' },
    ],
    certifications: [
      'Skillax AI Expert', 'HubSpot Automation', 
      'Google AI Marketing', 'AI Content Specialist', 'Prompt Engineering'
    ],
    modules: [
      { title: 'AI Fundamentals for Marketers', weeks: 'Week 1', topics: ['Understanding AI', 'AI in Marketing', 'Ethics & Best Practices'], color: 'from-purple-500 to-violet-500', icon: Brain },
      { title: 'ChatGPT & Prompt Engineering', weeks: 'Week 2-3', topics: ['Advanced Prompts', 'Content Creation', 'Ad Copywriting', 'Automation'], color: 'from-pink-500 to-rose-500', icon: MessageSquare },
      { title: 'Multi-AI Platform Mastery', weeks: 'Week 4-5', topics: ['Perplexity', 'Google Gemini', 'Microsoft Copilot', 'Claude & Grok'], color: 'from-blue-500 to-indigo-500', icon: Globe },
      { title: 'AI Image & Video Tools', weeks: 'Week 6', topics: ['Midjourney', 'DALL-E', 'Canva AI', 'Video Generation'], color: 'from-amber-500 to-orange-500', icon: Palette },
      { title: 'Agent Building & Automation', weeks: 'Week 7', topics: ['Virtual Assistants', 'Marketing Bots', 'Workflow Automation'], color: 'from-green-500 to-emerald-500', icon: Wifi },
      { title: 'AI Analytics & AEO', weeks: 'Week 8', topics: ['Predictive Analytics', 'AEO Optimization', 'Performance Reporting'], color: 'from-cyan-500 to-teal-500', icon: BarChart3 },
    ],
    suitable: ['Working Professionals', 'Digital Marketers', 'Content Creators', 'Entrepreneurs', 'Freelancers'],
    featured: false,
    stats: { students: '200+', rating: '4.8', projects: '30+' },
  },
];

// Why choose section
const whyChoose = [
  { icon: Target, title: 'SEO AEO GEO GMB', desc: 'Complete organic visibility mastery', gradient: 'from-green-500 to-emerald-500' },
  { icon: MousePointer, title: 'Google & Meta Ads', desc: 'Certified performance marketing', gradient: 'from-blue-500 to-indigo-500' },
  { icon: Megaphone, title: 'ChatGPT Ads', desc: 'First in India to teach this!', gradient: 'from-emerald-500 to-teal-500' },
  { icon: Brain, title: '30+ AI Tools', desc: 'Future-proof your career', gradient: 'from-purple-500 to-pink-500' },
  { icon: Building, title: 'Infopark Internship', desc: '4 weeks real-world experience', gradient: 'from-amber-500 to-orange-500' },
  { icon: Award, title: '30+ Certifications', desc: 'Google, Meta, HubSpot & more', gradient: 'from-red-500 to-pink-500' },
  { icon: Users, title: 'Small Batches', desc: 'Max 15 for personal attention', gradient: 'from-cyan-500 to-blue-500' },
  { icon: Laptop, title: 'Live Projects', desc: 'Real client campaigns', gradient: 'from-violet-500 to-purple-500' },
];

// Testimonials
const testimonials = [
  { name: 'Rahul K.', role: 'Marketing Manager @ Infopark', text: 'The SEO AEO GEO training was incredible. Landed my dream job within 2 weeks of completing!', rating: 5, image: 'R' },
  { name: 'Priya M.', role: 'Freelancer - UAE Clients', text: 'ChatGPT Ads training gave me an edge. Now serving clients in GCC with premium rates!', rating: 5, image: 'P' },
  { name: 'Arun S.', role: 'Digital Strategist @ MNC', text: 'The AI agent building module was game-changing. Built 3 bots for my company!', rating: 5, image: 'A' },
];

// Animated section wrapper
function AnimatedSection({ children, className = '', delay = 0 }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Floating particles
function FloatingParticles() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 rounded-full bg-primary/20"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, Math.random() * 20 - 10, 0],
            opacity: [0.2, 0.5, 0.2],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: 4 + Math.random() * 4,
            repeat: Infinity,
            delay: Math.random() * 2,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
}

// Floating icon
function FloatingIcon({ icon: Icon, className, delay = 0 }) {
  return (
    <motion.div
      className={`absolute ${className}`}
      animate={{
        y: [0, -20, 0],
        rotate: [0, 5, -5, 0],
        scale: [1, 1.1, 1],
      }}
      transition={{
        duration: 6,
        delay,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    >
      <Icon className="h-full w-full" />
    </motion.div>
  );
}

// Glowing orb
function GlowingOrb({ className, color = 'primary', delay = 0 }) {
  const colors = {
    primary: 'bg-primary/20',
    purple: 'bg-purple-500/20',
    amber: 'bg-amber-500/20',
    pink: 'bg-pink-500/20',
    cyan: 'bg-cyan-500/20',
  };

  return (
    <motion.div
      className={`absolute rounded-full blur-3xl ${colors[color]} ${className}`}
      animate={{
        scale: [1, 1.2, 1],
        opacity: [0.3, 0.6, 0.3],
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

// 3D Card with tilt effect
function TiltCard({ children, className = '' }) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [10, -10]), { stiffness: 300, damping: 30 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-10, 10]), { stiffness: 300, damping: 30 });

  const handleMouse = (e) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set((e.clientX - centerX) / rect.width);
    y.set((e.clientY - centerY) / rect.height);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      className={`${className}`}
      style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
      onMouseMove={handleMouse}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </motion.div>
  );
}

// Interactive module card with 3D effect
function ModuleCard({ module, index, isActive, onClick }) {
  const Icon = module.icon;
  
  return (
    <motion.div
      onClick={onClick}
      className={`cursor-pointer relative group`}
      initial={{ opacity: 0, x: -30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05 }}
      whileHover={{ scale: 1.02, x: 10 }}
    >
      <div className={`absolute inset-0 bg-gradient-to-r ${module.color} rounded-2xl blur-lg opacity-0 group-hover:opacity-30 transition-opacity duration-300`} />
      <div className={`relative p-5 rounded-2xl border transition-all duration-300 ${
        isActive 
          ? `bg-gradient-to-r ${module.color} text-white border-transparent shadow-2xl` 
          : 'bg-card border-border hover:border-primary/50'
      }`}>
        <div className="flex items-center gap-4">
          <motion.div 
            className={`p-3 rounded-xl ${isActive ? 'bg-white/20' : `bg-gradient-to-br ${module.color}`} shadow-lg`}
            animate={isActive ? { rotate: [0, 5, -5, 0] } : {}}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Icon className={`h-6 w-6 ${isActive ? 'text-white' : 'text-white'}`} />
          </motion.div>
          <div className="flex-1">
            <div className="flex items-center justify-between mb-1">
              <h4 className="font-semibold">{module.title}</h4>
              <span className={`text-xs px-2 py-1 rounded-full ${isActive ? 'bg-white/20' : 'bg-muted'}`}>
                {module.weeks}
              </span>
            </div>
            <div className="flex flex-wrap gap-1">
              {module.topics.slice(0, 3).map((topic, i) => (
                <span key={i} className={`text-xs ${isActive ? 'text-white/80' : 'text-muted-foreground'}`}>
                  {topic}{i < 2 ? ' •' : ''}
                </span>
              ))}
              {module.topics.length > 3 && (
                <span className={`text-xs ${isActive ? 'text-white/80' : 'text-muted-foreground'}`}>
                  +{module.topics.length - 3} more
                </span>
              )}
            </div>
          </div>
          <ChevronRight className={`h-5 w-5 transition-transform ${isActive ? 'rotate-90' : ''}`} />
        </div>
      </div>
    </motion.div>
  );
}

// Premium Course Card
function PremiumCourseCard({ course, index }) {
  const [activeModule, setActiveModule] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const Icon = course.icon;

  return (
    <AnimatedSection delay={index * 0.15}>
      <TiltCard className="perspective-1000">
        <motion.div 
          className="relative"
          onHoverStart={() => setIsHovered(true)}
          onHoverEnd={() => setIsHovered(false)}
        >
          {/* Glow effect */}
          <motion.div 
            className={`absolute -inset-1 bg-gradient-to-r ${course.gradient} rounded-[2rem] blur-xl`}
            animate={{ opacity: isHovered ? 0.4 : 0.1 }}
            transition={{ duration: 0.3 }}
          />
          
          <div className="relative bg-card border border-border/50 rounded-[2rem] overflow-hidden backdrop-blur-xl">
            {/* Featured Badge */}
            {course.featured && (
              <div className="relative">
                <motion.div 
                  className="absolute top-0 left-0 right-0 bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 text-white text-center py-3 overflow-hidden"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <motion.div
                    className="flex items-center justify-center gap-2"
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <Flame className="h-4 w-4" />
                    <span className="font-bold text-sm">MOST POPULAR - RECOMMENDED FOR BEGINNERS</span>
                    <Flame className="h-4 w-4" />
                  </motion.div>
                </motion.div>
                <div className="h-12" />
              </div>
            )}

            <div className="p-8">
              {/* Header */}
              <div className="flex items-start gap-6 mb-8">
                <motion.div 
                  className={`relative p-5 rounded-2xl bg-gradient-to-br ${course.gradient} shadow-2xl`}
                  animate={{ 
                    boxShadow: isHovered 
                      ? `0 25px 50px -12px ${course.glowColor}` 
                      : '0 10px 30px -10px rgba(0,0,0,0.3)'
                  }}
                  whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
                  transition={{ duration: 0.5 }}
                >
                  <Icon className="h-10 w-10 text-white" />
                  <motion.div
                    className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-card"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 1, repeat: Infinity }}
                  />
                </motion.div>
                <div className="flex-1">
                  <motion.span 
                    className={`inline-block px-3 py-1 bg-gradient-to-r ${course.bgGradient} rounded-full text-xs font-semibold mb-2`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                  >
                    {course.subtitle}
                  </motion.span>
                  <h2 className="font-heading font-bold text-3xl mb-2">{course.title}</h2>
                  <div className="flex flex-wrap items-center gap-4 text-sm">
                    <span className="flex items-center gap-1.5 px-3 py-1.5 bg-muted rounded-full">
                      <Clock className="h-4 w-4 text-primary" />
                      <span className="font-semibold">{course.duration}</span>
                    </span>
                    <span className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-500/10 rounded-full">
                      <Award className="h-4 w-4 text-amber-500" />
                      <span className="font-semibold text-amber-600">{course.certifications.length}+ Certs</span>
                    </span>
                    <span className="flex items-center gap-1.5 px-3 py-1.5 bg-green-500/10 rounded-full">
                      <Star className="h-4 w-4 text-green-500 fill-green-500" />
                      <span className="font-semibold text-green-600">{course.stats.rating} Rating</span>
                    </span>
                  </div>
                </div>
              </div>

              <p className="text-muted-foreground mb-8 text-lg leading-relaxed">{course.description}</p>

              {/* Two Column Layout */}
              <div className="grid lg:grid-cols-2 gap-8">
                {/* Left - Highlights */}
                <div>
                  <h3 className="font-heading font-semibold text-xl mb-4 flex items-center gap-2">
                    <Sparkles className="h-5 w-5 text-amber-500" />
                    What You'll Learn
                  </h3>
                  <div className="space-y-3">
                    {course.highlights.map((highlight, i) => {
                      const HIcon = highlight.icon;
                      return (
                        <motion.div 
                          key={i} 
                          className="flex items-center gap-3 p-3 rounded-xl hover:bg-muted/50 transition-all group cursor-default"
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: i * 0.05 }}
                          whileHover={{ x: 8, scale: 1.02 }}
                        >
                          <div className={`p-2 rounded-lg bg-gradient-to-br ${course.gradient} bg-opacity-10 group-hover:scale-110 transition-transform`}>
                            <HIcon className={`h-5 w-5 ${highlight.color}`} />
                          </div>
                          <span className="font-medium">{highlight.text}</span>
                        </motion.div>
                      );
                    })}
                  </div>

                  {/* Certifications */}
                  <div className="mt-6">
                    <h4 className="font-semibold mb-3 flex items-center gap-2">
                      <Trophy className="h-5 w-5 text-amber-500" />
                      Certifications Included
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {course.certifications.map((cert, i) => (
                        <motion.span 
                          key={i} 
                          className="px-3 py-1.5 bg-muted/50 border border-border rounded-full text-xs font-medium flex items-center gap-1.5 hover:bg-primary/10 hover:border-primary/30 transition-all cursor-default"
                          whileHover={{ scale: 1.05, y: -2 }}
                          initial={{ opacity: 0, scale: 0.8 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ delay: i * 0.03 }}
                        >
                          <BadgeCheck className="h-3 w-3 text-green-500" />
                          {cert}
                        </motion.span>
                      ))}
                    </div>
                  </div>

                  {/* Perfect For */}
                  <div className="mt-6">
                    <h4 className="font-semibold mb-3 flex items-center gap-2">
                      <Users className="h-5 w-5 text-blue-500" />
                      Perfect For
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {course.suitable.map((item, i) => (
                        <motion.span 
                          key={i} 
                          className={`px-3 py-1.5 bg-gradient-to-r ${course.bgGradient} border border-primary/20 rounded-full text-xs font-medium`}
                          whileHover={{ scale: 1.05 }}
                        >
                          {item}
                        </motion.span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right - Curriculum */}
                <div>
                  <h3 className="font-heading font-semibold text-xl mb-4 flex items-center gap-2">
                    <Layers className="h-5 w-5 text-primary" />
                    Course Curriculum
                  </h3>
                  <div className="space-y-3">
                    {course.modules.map((module, i) => (
                      <ModuleCard 
                        key={i}
                        module={module}
                        index={i}
                        isActive={activeModule === i}
                        onClick={() => setActiveModule(i)}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* CTA Section */}
              <div className="mt-8 pt-8 border-t border-border">
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link to="/contact" className="flex-1">
                    <motion.div 
                      whileHover={{ scale: 1.02 }} 
                      whileTap={{ scale: 0.98 }}
                    >
                      <Button className={`w-full bg-gradient-to-r ${course.gradient} text-white rounded-full py-7 font-bold text-lg shadow-xl hover:shadow-2xl transition-all`}>
                        <Sparkles className="mr-2 h-5 w-5" />
                        Enroll Now - Limited Seats
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </Button>
                    </motion.div>
                  </Link>
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Button variant="outline" className="rounded-full py-7 px-8 border-2 hover:bg-muted/50 font-semibold">
                      <Phone className="mr-2 h-5 w-5" />
                      Talk to Counselor
                    </Button>
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </TiltCard>
    </AnimatedSection>
  );
}

// Comparison Table
function ComparisonSection() {
  const comparisonData = [
    { feature: 'Duration', prof: '4 Months', ai: '2 Months' },
    { feature: 'Certifications', prof: '25+', ai: '15+' },
    { feature: 'SEO AEO GEO GMB', prof: '✓ Comprehensive', ai: 'AEO Focus' },
    { feature: 'Google Ads', prof: '✓ Full Course', ai: '—' },
    { feature: 'Meta Ads', prof: '✓ Full Course', ai: '—' },
    { feature: 'ChatGPT Ads', prof: '✓ Included', ai: '✓ Included' },
    { feature: '30+ AI Tools', prof: '✓ Complete', ai: '✓ Deep Dive' },
    { feature: 'Agent Building', prof: '✓ Basic', ai: '✓ Advanced' },
    { feature: 'Blog & Website', prof: '✓ Included', ai: '—' },
    { feature: 'Infopark Internship', prof: '✓ 4 Weeks', ai: '—' },
    { feature: 'Weekend Batches', prof: '—', ai: '✓ Available' },
    { feature: 'Best For', prof: 'Beginners & Career Changers', ai: 'Working Professionals' },
  ];

  return (
    <section className="section-padding bg-muted/30 relative overflow-hidden">
      <GlowingOrb className="top-20 left-10 w-96 h-96" color="primary" />
      <GlowingOrb className="bottom-20 right-10 w-80 h-80" color="purple" delay={2} />
      
      <div className="container-custom relative z-10">
        <AnimatedSection className="text-center mb-12">
          <motion.span 
            className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-semibold mb-4"
            whileHover={{ scale: 1.05 }}
          >
            <Layers className="h-4 w-4" />
            Compare Programs
          </motion.span>
          <h2 className="font-heading text-3xl md:text-5xl font-bold mb-4">
            Side-by-Side{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-600">
              Comparison
            </span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Not sure which program is right? Compare features to make an informed decision.
          </p>
        </AnimatedSection>

        <AnimatedSection>
          <div className="overflow-x-auto">
            <div className="inline-block min-w-full">
              <div className="bg-card border border-border rounded-3xl overflow-hidden shadow-xl">
                <table className="w-full" data-testid="course-comparison-table">
                  <thead>
                    <tr className="bg-muted/50">
                      <th className="text-left p-5 font-semibold">Feature</th>
                      <th className="p-5">
                        <motion.div 
                          className="flex flex-col items-center gap-2"
                          whileHover={{ scale: 1.05 }}
                        >
                          <div className="p-3 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl">
                            <Rocket className="h-6 w-6 text-white" />
                          </div>
                          <span className="font-bold">Professional</span>
                          <span className="text-xs text-muted-foreground">4 Months</span>
                        </motion.div>
                      </th>
                      <th className="p-5">
                        <motion.div 
                          className="flex flex-col items-center gap-2"
                          whileHover={{ scale: 1.05 }}
                        >
                          <div className="p-3 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl">
                            <Brain className="h-6 w-6 text-white" />
                          </div>
                          <span className="font-bold">AI-Powered</span>
                          <span className="text-xs text-muted-foreground">2 Months</span>
                        </motion.div>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {comparisonData.map((row, i) => (
                      <motion.tr 
                        key={row.feature}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.03 }}
                        className="border-t border-border hover:bg-muted/30 transition-colors"
                      >
                        <td className="p-4 font-medium">{row.feature}</td>
                        <td className="p-4 text-center">
                          <span className={row.prof.includes('✓') ? 'text-green-600 font-semibold' : row.prof === '—' ? 'text-muted-foreground' : ''}>
                            {row.prof}
                          </span>
                        </td>
                        <td className="p-4 text-center">
                          <span className={row.ai.includes('✓') ? 'text-green-600 font-semibold' : row.ai === '—' ? 'text-muted-foreground' : ''}>
                            {row.ai}
                          </span>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <Link to="/contact">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-full px-8 py-6 font-bold shadow-lg">
                  <Rocket className="mr-2 h-5 w-5" />
                  Enroll Professional
                </Button>
              </motion.div>
            </Link>
            <Link to="/contact">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button className="bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full px-8 py-6 font-bold shadow-lg">
                  <Brain className="mr-2 h-5 w-5" />
                  Enroll AI-Powered
                </Button>
              </motion.div>
            </Link>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}

// Why Choose Section
function WhyChooseSection() {
  return (
    <section className="section-padding relative overflow-hidden">
      <FloatingParticles />
      
      <div className="container-custom relative z-10">
        <AnimatedSection className="text-center mb-12">
          <motion.span 
            className="inline-flex items-center gap-2 px-4 py-2 bg-amber-500/10 text-amber-600 rounded-full text-sm font-semibold mb-4"
            whileHover={{ scale: 1.05 }}
          >
            <Gem className="h-4 w-4" />
            Why Skillax?
          </motion.span>
          <h2 className="font-heading text-3xl md:text-5xl font-bold mb-4">
            What Sets Us{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-500">
              Apart
            </span>
          </h2>
        </AnimatedSection>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {whyChoose.map((item, index) => {
            const Icon = item.icon;
            return (
              <AnimatedSection key={index} delay={index * 0.05}>
                <TiltCard>
                  <motion.div 
                    className="group relative h-full"
                    whileHover={{ y: -10 }}
                  >
                    <div className={`absolute inset-0 bg-gradient-to-r ${item.gradient} rounded-2xl blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-500`} />
                    <div className="relative bg-card border border-border/50 rounded-2xl p-5 text-center h-full backdrop-blur-sm hover:border-primary/30 transition-all">
                      <motion.div 
                        className={`inline-flex p-4 rounded-xl bg-gradient-to-br ${item.gradient} text-white mb-4 shadow-lg`}
                        whileHover={{ rotate: [0, -10, 10, 0], scale: 1.15 }}
                        transition={{ duration: 0.5 }}
                      >
                        <Icon className="h-7 w-7" />
                      </motion.div>
                      <h3 className="font-heading font-semibold text-base md:text-lg mb-1">{item.title}</h3>
                      <p className="text-xs md:text-sm text-muted-foreground">{item.desc}</p>
                    </div>
                  </motion.div>
                </TiltCard>
              </AnimatedSection>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// Testimonials Section
function TestimonialsSection() {
  return (
    <section className="section-padding bg-gradient-to-br from-primary/5 to-purple-500/5 relative overflow-hidden">
      <GlowingOrb className="top-10 right-10 w-64 h-64" color="primary" />
      
      <div className="container-custom relative z-10">
        <AnimatedSection className="text-center mb-12">
          <motion.span 
            className="inline-flex items-center gap-2 px-4 py-2 bg-pink-500/10 text-pink-600 rounded-full text-sm font-semibold mb-4"
            whileHover={{ scale: 1.05 }}
          >
            <Heart className="h-4 w-4" />
            Success Stories
          </motion.span>
          <h2 className="font-heading text-3xl md:text-5xl font-bold mb-4">
            What Students{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-rose-500">
              Say
            </span>
          </h2>
        </AnimatedSection>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((item, index) => (
            <AnimatedSection key={index} delay={index * 0.1}>
              <motion.div 
                className="bg-card border border-border rounded-2xl p-6 h-full"
                whileHover={{ y: -5, boxShadow: '0 20px 40px -20px rgba(0,0,0,0.2)' }}
              >
                <div className="flex items-center gap-4 mb-4">
                  <motion.div 
                    className="w-14 h-14 bg-gradient-to-br from-primary to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xl"
                    whileHover={{ scale: 1.1 }}
                  >
                    {item.image}
                  </motion.div>
                  <div>
                    <h4 className="font-semibold">{item.name}</h4>
                    <p className="text-sm text-muted-foreground">{item.role}</p>
                  </div>
                </div>
                <p className="text-muted-foreground mb-4 italic">"{item.text}"</p>
                <div className="flex gap-1">
                  {[...Array(item.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-amber-500 text-amber-500" />
                  ))}
                </div>
              </motion.div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}

// Final CTA Section
function FinalCTASection() {
  return (
    <section className="section-padding bg-gradient-to-br from-primary via-indigo-600 to-purple-700 text-white relative overflow-hidden">
      <GlowingOrb className="top-10 left-10 w-80 h-80" color="cyan" />
      <GlowingOrb className="bottom-10 right-10 w-96 h-96" color="pink" delay={2} />
      
      {/* Floating icons */}
      <FloatingIcon icon={Rocket} className="top-20 left-[10%] w-16 h-16 text-white/10" delay={0} />
      <FloatingIcon icon={Brain} className="bottom-20 right-[10%] w-20 h-20 text-white/10" delay={1} />
      <FloatingIcon icon={Trophy} className="top-1/2 right-[20%] w-14 h-14 text-white/10" delay={2} />
      <FloatingIcon icon={Target} className="bottom-1/3 left-[15%] w-12 h-12 text-white/10" delay={3} />
      
      <div className="container-custom relative z-10 text-center">
        <AnimatedSection>
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center justify-center w-24 h-24 bg-white/10 rounded-full mb-6 backdrop-blur-sm"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            >
              <Sparkles className="h-12 w-12 text-amber-400" />
            </motion.div>
          </motion.div>
          
          <motion.h2 
            className="font-heading text-3xl md:text-5xl font-bold mb-4"
            animate={{ scale: [1, 1.02, 1] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            Ready to Start Your Journey?
          </motion.h2>
          <p className="text-white/80 max-w-2xl mx-auto mb-8 text-lg">
            Join the Founding Batch - March 2026. Limited to 15 students only.
            Get SEO AEO GEO, Google Ads, Meta Ads, ChatGPT Ads, 30+ AI tools & Infopark internship.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/contact">
              <motion.div 
                whileHover={{ scale: 1.05 }} 
                whileTap={{ scale: 0.95 }}
              >
                <Button 
                  size="lg"
                  className="bg-white text-primary hover:bg-white/90 rounded-full px-10 py-7 font-bold shadow-2xl"
                >
                  <Flame className="mr-2 h-5 w-5" />
                  Enroll Now - Limited Seats
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </motion.div>
            </Link>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button 
                size="lg"
                variant="outline"
                className="border-2 border-white/30 text-white hover:bg-white/10 rounded-full px-10 py-7 font-semibold"
              >
                <Phone className="mr-2 h-5 w-5" />
                Talk to Counselor
              </Button>
            </motion.div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}

export default function Courses() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start']
  });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);

  return (
    <div className="overflow-hidden bg-background">
      {/* Hero Section with Parallax */}
      <section ref={heroRef} className="relative min-h-[95vh] flex items-center pt-20 overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-indigo-600 to-purple-700">
          {/* Mesh gradient */}
          <div className="absolute inset-0 opacity-40">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-cyan-400 via-transparent to-transparent" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-pink-400 via-transparent to-transparent" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-amber-400/20 via-transparent to-transparent" />
          </div>
          
          {/* Floating orbs */}
          <GlowingOrb className="top-20 left-10 w-96 h-96" color="cyan" delay={0} />
          <GlowingOrb className="bottom-20 right-10 w-[500px] h-[500px]" color="pink" delay={2} />
          <GlowingOrb className="top-1/2 left-1/3 w-72 h-72" color="amber" delay={4} />
          
          {/* Floating icons */}
          <FloatingIcon icon={Rocket} className="top-32 left-[8%] w-20 h-20 text-white/10" delay={0} />
          <FloatingIcon icon={Brain} className="bottom-32 right-[8%] w-24 h-24 text-white/10" delay={1} />
          <FloatingIcon icon={Trophy} className="top-1/2 right-[15%] w-16 h-16 text-white/10" delay={2} />
          <FloatingIcon icon={Crown} className="bottom-40 left-[12%] w-14 h-14 text-white/10" delay={3} />
          <FloatingIcon icon={Target} className="top-40 right-[25%] w-12 h-12 text-white/10" delay={4} />
          <FloatingIcon icon={Award} className="bottom-1/3 right-[30%] w-10 h-10 text-white/10" delay={5} />
          
          <FloatingParticles />
        </div>

        <motion.div 
          style={{ y: heroY, opacity: heroOpacity, scale: heroScale }}
          className="container-custom relative z-10 text-white"
        >
          <div className="text-center max-w-5xl mx-auto">
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
                <Flame className="h-5 w-5 text-amber-400" />
              </motion.span>
              <span className="font-semibold">Founding Batch - March 2026 - Only 15 Seats!</span>
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
              <span className="relative inline-block">
                <motion.span 
                  className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-orange-400 to-amber-300"
                  animate={{ backgroundPosition: ['0%', '100%', '0%'] }}
                  transition={{ duration: 5, repeat: Infinity }}
                  style={{ backgroundSize: '200%' }}
                >
                  AI-Powered
                </motion.span>
                <motion.span
                  className="absolute -inset-2 bg-gradient-to-r from-amber-400/20 to-orange-400/20 blur-2xl -z-10"
                  animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
                  transition={{ duration: 3, repeat: Infinity }}
                />
              </span>{' '}
              Digital Marketing
            </motion.h1>

            {/* Subtitle with keywords */}
            <motion.p 
              className="text-lg md:text-xl text-white/80 max-w-3xl mx-auto mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              Master <span className="text-amber-300 font-semibold">SEO, AEO, GEO, GMB</span> • 
              <span className="text-cyan-300 font-semibold"> Google Ads & Meta Ads</span> • 
              <span className="text-green-300 font-semibold"> ChatGPT Ads</span> • 
              <span className="text-pink-300 font-semibold"> 30+ AI Tools</span> • 
              <span className="text-amber-300 font-semibold"> Agent Building</span> • 
              <span className="text-white font-semibold"> Infopark Internship</span>
            </motion.p>
            
            {/* CTA Buttons */}
            <motion.div 
              className="flex flex-wrap justify-center gap-4 mb-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <Link to="/contact">
                <motion.div 
                  whileHover={{ scale: 1.05, y: -5 }} 
                  whileTap={{ scale: 0.95 }}
                >
                  <Button size="lg" className="bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-500 hover:to-orange-600 text-white rounded-full px-10 py-7 font-bold shadow-2xl shadow-amber-500/30">
                    <Zap className="mr-2 h-5 w-5" />
                    Enroll Now - Limited Seats
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </motion.div>
              </Link>
              <motion.div 
                whileHover={{ scale: 1.05, y: -5 }} 
                whileTap={{ scale: 0.95 }}
              >
                <Button size="lg" variant="outline" className="border-2 border-white/40 text-white hover:bg-white/10 rounded-full px-10 py-7 font-semibold backdrop-blur-sm">
                  <Play className="mr-2 h-5 w-5" />
                  Watch Demo
                </Button>
              </motion.div>
            </motion.div>

            {/* Quick Stats */}
            <motion.div 
              className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              {[
                { value: '30+', label: 'Certifications', icon: Trophy },
                { value: '30+', label: 'AI Tools', icon: Brain },
                { value: '8+', label: 'Modules', icon: Layers },
                { value: '15', label: 'Max Students', icon: Users },
              ].map((stat, i) => {
                const Icon = stat.icon;
                return (
                  <motion.div
                    key={i}
                    className="text-center p-5 bg-white/10 rounded-2xl backdrop-blur-sm border border-white/10"
                    whileHover={{ scale: 1.05, y: -5, backgroundColor: 'rgba(255,255,255,0.15)' }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 + i * 0.1 }}
                  >
                    <motion.div
                      animate={{ rotate: [0, 5, -5, 0] }}
                      transition={{ duration: 3, repeat: Infinity, delay: i * 0.5 }}
                    >
                      <Icon className="h-8 w-8 mx-auto mb-2 opacity-90" />
                    </motion.div>
                    <motion.div 
                      className="font-heading font-bold text-3xl md:text-4xl"
                      animate={{ scale: [1, 1.05, 1] }}
                      transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
                    >
                      {stat.value}
                    </motion.div>
                    <p className="text-sm opacity-80">{stat.label}</p>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </motion.div>

        {/* Wave divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" className="w-full">
            <motion.path 
              d="M0 120V60C240 100 480 20 720 60C960 100 1200 20 1440 60V120H0Z" 
              fill="currentColor" 
              className="text-background"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2 }}
            />
          </svg>
        </div>
      </section>

      {/* Course Cards Section */}
      <section className="section-padding relative">
        <FloatingParticles />
        <GlowingOrb className="top-20 left-10 w-72 h-72" color="primary" />
        <GlowingOrb className="bottom-20 right-10 w-96 h-96" color="purple" delay={2} />

        <div className="container-custom relative z-10">
          <AnimatedSection className="text-center mb-16">
            <motion.span 
              className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-semibold mb-4"
              whileHover={{ scale: 1.05 }}
            >
              <GraduationCap className="h-4 w-4" />
              Training Programs
            </motion.span>
            <h2 className="font-heading text-3xl md:text-5xl font-bold mb-4">
              Choose Your Path to{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-600">Success</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Comprehensive programs designed for 2026 and beyond. Master SEO, AEO, GEO, 
              Google Ads, Meta Ads, ChatGPT Ads, AI tools, and land your dream career.
            </p>
          </AnimatedSection>

          <div className="space-y-16">
            {courses.map((course, index) => (
              <PremiumCourseCard key={course.id} course={course} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <ComparisonSection />

      {/* Why Choose */}
      <WhyChooseSection />

      {/* Testimonials */}
      <TestimonialsSection />

      {/* Final CTA */}
      <FinalCTASection />
    </div>
  );
}
