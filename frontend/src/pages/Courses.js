import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Clock, Award, ArrowRight, CheckCircle,
  BookOpen, Brain, Building, Users, Rocket, Sparkles,
  Target, Briefcase, Laptop, Calendar, ChevronDown,
  Globe, TrendingUp, Zap, BadgeCheck, Play
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
    gradient: 'from-blue-600 to-indigo-600',
    bgGradient: 'from-blue-500/10 to-indigo-500/10',
    description: 'Complete A-Z digital marketing mastery program with AI tools integration, live projects, and guaranteed internship at Infopark IT company.',
    price: 'Contact for Pricing',
    highlights: [
      'SEO, AEO, GEO - Complete Optimization',
      'Google Ads & Meta Ads Certification',
      'ChatGPT Ads - The Next Big Trend!',
      'AI Tools: ChatGPT, Perplexity, Gemini, Copilot, Grok',
      'Reddit & Quora Marketing',
      'Content Marketing & Copywriting',
      'Email Marketing Automation',
      'Guaranteed Internship at Infopark',
      '100% Placement Assistance',
    ],
    certifications: [
      'Google Ads Search', 'Google Ads Display', 'Google Analytics 4',
      'Meta Blueprint', 'HubSpot Inbound', 'HubSpot Content',
      'SEMrush SEO', 'Askillax Professional'
    ],
    modules: [
      { title: 'Digital Marketing Fundamentals', weeks: '2 weeks', topics: ['Marketing Basics', 'Customer Journey', 'Digital Channels', 'Analytics Setup'] },
      { title: 'Search Engine Optimization (SEO)', weeks: '3 weeks', topics: ['On-Page SEO', 'Technical SEO', 'Link Building', 'Local SEO', 'SEO Tools'] },
      { title: 'Answer Engine Optimization (AEO)', weeks: '2 weeks', topics: ['AI Search Optimization', 'ChatGPT Visibility', 'Perplexity Optimization', 'Structured Data'] },
      { title: 'Search Engine Marketing (SEM)', weeks: '2 weeks', topics: ['Google Ads', 'Campaign Setup', 'Bidding Strategies', 'Ad Copywriting', 'Optimization'] },
      { title: 'Social Media Marketing', weeks: '3 weeks', topics: ['Facebook & Instagram', 'LinkedIn Marketing', 'Reddit & Quora', 'Content Strategy', 'Community Building'] },
      { title: 'AI Tools & Automation', weeks: '2 weeks', topics: ['ChatGPT Mastery', 'Perplexity, Gemini, Grok', 'AI Content Creation', 'Marketing Automation'] },
      { title: 'Analytics & Reporting', weeks: '1 week', topics: ['GA4 Deep Dive', 'Data Studio', 'ROI Tracking', 'Client Reporting'] },
      { title: 'Internship at Infopark', weeks: '4 weeks', topics: ['Live Projects', 'Client Work', 'Portfolio Building', 'Job Preparation'] },
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
    gradient: 'from-purple-600 to-pink-600',
    bgGradient: 'from-purple-500/10 to-pink-500/10',
    description: 'Master cutting-edge AI marketing tools and automation. Perfect for working professionals wanting to upskill with future-ready skills.',
    price: 'Contact for Pricing',
    highlights: [
      'ChatGPT, Perplexity, Copilot, Gemini, Grok',
      'AI Content & Image Generation',
      'Answer Engine Optimization (AEO)',
      'Generative Engine Optimization (GEO)',
      'Marketing Automation with AI',
      'Prompt Engineering Mastery',
      'AI Analytics & Insights',
      'Weekend Batches Available',
    ],
    certifications: [
      'Askillax AI Expert', 'HubSpot Automation', 
      'Google AI Marketing', 'AI Content Specialist', 'Prompt Engineering'
    ],
    modules: [
      { title: 'AI Fundamentals for Marketers', weeks: '1 week', topics: ['Understanding AI', 'AI in Marketing', 'Ethics & Best Practices'] },
      { title: 'ChatGPT & Content Creation', weeks: '2 weeks', topics: ['Prompt Engineering', 'Content Writing', 'Ad Copy', 'Blogs & Articles'] },
      { title: 'Multi-AI Platform Mastery', weeks: '2 weeks', topics: ['Perplexity', 'Google Gemini', 'Microsoft Copilot', 'X Grok', 'Claude'] },
      { title: 'AI Image & Video Generation', weeks: '1 week', topics: ['Midjourney', 'DALL-E', 'Canva AI', 'Video Tools'] },
      { title: 'Marketing Automation', weeks: '1 week', topics: ['HubSpot AI', 'Email Automation', 'Social Scheduling', 'Lead Scoring'] },
      { title: 'AI-Powered Analytics', weeks: '1 week', topics: ['Predictive Analytics', 'AI Reporting', 'Data Insights', 'Performance Optimization'] },
    ],
    suitable: ['Working Professionals', 'Digital Marketers', 'Content Creators', 'Entrepreneurs', 'Freelancers'],
    featured: false,
  },
];

// Features
const features = [
  { icon: Building, title: 'Infopark Internship', desc: 'Real-world experience at top IT companies', color: 'text-blue-600 bg-blue-500/10' },
  { icon: Brain, title: 'AI-First Curriculum', desc: 'Master 30+ AI tools', color: 'text-purple-600 bg-purple-500/10' },
  { icon: Award, title: '30+ Certifications', desc: 'Industry-recognized credentials', color: 'text-amber-600 bg-amber-500/10' },
  { icon: Users, title: 'Small Batches', desc: 'Max 15 students for personal attention', color: 'text-green-600 bg-green-500/10' },
  { icon: Laptop, title: 'Live Projects', desc: 'Work on real client campaigns', color: 'text-pink-600 bg-pink-500/10' },
  { icon: Calendar, title: 'Flexible Timings', desc: 'Morning, evening & weekend options', color: 'text-cyan-600 bg-cyan-500/10' },
  { icon: Target, title: '100% Practical', desc: 'Learn by doing, not just theory', color: 'text-orange-600 bg-orange-500/10' },
  { icon: Briefcase, title: 'Placement Support', desc: 'Lifetime career assistance', color: 'text-indigo-600 bg-indigo-500/10' },
];

function AnimatedSection({ children, className = '', delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Module Accordion
function ModuleAccordion({ modules }) {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <div className="space-y-3">
      {modules.map((module, index) => (
        <motion.div
          key={index}
          initial={false}
          className="border border-border rounded-xl overflow-hidden"
        >
          <button
            onClick={() => setOpenIndex(openIndex === index ? -1 : index)}
            className={`w-full flex items-center justify-between p-4 text-left transition-colors ${
              openIndex === index ? 'bg-primary/5' : 'bg-card hover:bg-muted/50'
            }`}
          >
            <div className="flex items-center gap-3">
              <span className={`w-8 h-8 flex items-center justify-center rounded-lg text-sm font-bold ${
                openIndex === index ? 'bg-primary text-white' : 'bg-muted'
              }`}>
                {index + 1}
              </span>
              <div>
                <span className="font-semibold">{module.title}</span>
                <span className="text-xs text-muted-foreground ml-2">({module.weeks})</span>
              </div>
            </div>
            <ChevronDown className={`h-5 w-5 transition-transform ${openIndex === index ? 'rotate-180' : ''}`} />
          </button>
          <AnimatePresence>
            {openIndex === index && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <div className="p-4 pt-0 bg-card">
                  <div className="grid grid-cols-2 gap-2 pt-2 border-t border-border mt-2">
                    {module.topics.map((topic, i) => (
                      <div key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <CheckCircle className="h-3 w-3 text-brand-success" />
                        {topic}
                      </div>
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

export default function Courses() {
  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative pt-20 pb-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary to-brand-indigo">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-20 left-10 w-72 h-72 bg-white rounded-full blur-3xl" />
            <div className="absolute bottom-20 right-10 w-96 h-96 bg-white rounded-full blur-3xl" />
          </div>
        </div>

        <div className="container-custom relative z-10 text-white">
          <AnimatedSection className="text-center max-w-4xl mx-auto">
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 border border-white/20 rounded-full text-sm font-medium mb-6">
              <Sparkles className="h-4 w-4" />
              March 2026 Batch - Enrolling Now!
            </span>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold mb-6" data-testid="courses-page-title">
              Master Digital Marketing{' '}
              <span className="text-brand-amber">& 30+ AI Tools</span>
            </h1>
            <p className="text-lg text-white/80 max-w-2xl mx-auto">
              Two comprehensive programs covering SEO, AEO, GEO, Google Ads, Meta Ads, ChatGPT Ads, 
              and 30+ major AI tools. 30+ certifications included!
            </p>
          </AnimatedSection>

          {/* Quick Stats */}
          <AnimatedSection delay={0.2} className="mt-12">
            <div className="flex flex-wrap justify-center gap-8">
              {[
                { value: '30+', label: 'Certifications' },
                { value: '30+', label: 'AI Tools' },
                { value: '100%', label: 'Practical' },
                { value: 'March', label: 'Next Batch' },
              ].map((stat, i) => (
                <div key={i} className="text-center">
                  <div className="font-heading font-bold text-3xl">{stat.value}</div>
                  <div className="text-sm text-white/70">{stat.label}</div>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>

        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 100" fill="none" className="w-full">
            <path d="M0 100V50C240 90 480 10 720 50C960 90 1200 10 1440 50V100H0Z" fill="currentColor" className="text-background"/>
          </svg>
        </div>
      </section>

      {/* Course Cards */}
      <section className="section-padding -mt-12">
        <div className="container-custom">
          <div className="space-y-12">
            {courses.map((course, index) => {
              const Icon = course.icon;
              return (
                <AnimatedSection key={course.id} delay={index * 0.15}>
                  <div className={`card-base ${course.bgGradient} border-2 overflow-hidden`}>
                    {course.featured && (
                      <div className="bg-brand-amber text-white text-center py-2 text-sm font-bold -mx-6 -mt-6 mb-6">
                        🔥 MOST POPULAR - RECOMMENDED FOR BEGINNERS
                      </div>
                    )}

                    <div className="grid lg:grid-cols-2 gap-8">
                      {/* Left Side - Info */}
                      <div>
                        <div className="flex items-start gap-4 mb-6">
                          <div className={`p-4 rounded-2xl bg-gradient-to-br ${course.gradient} shrink-0`}>
                            <Icon className="h-8 w-8 text-white" />
                          </div>
                          <div>
                            <h2 className="font-heading font-bold text-2xl md:text-3xl">{course.title}</h2>
                            <div className="flex items-center gap-4 text-sm text-muted-foreground mt-2">
                              <span className="flex items-center gap-1">
                                <Clock className="h-4 w-4" />
                                {course.duration}
                              </span>
                              <span className="flex items-center gap-1">
                                <Award className="h-4 w-4" />
                                {course.certifications.length} Certifications
                              </span>
                            </div>
                          </div>
                        </div>

                        <p className="text-muted-foreground mb-6">{course.description}</p>

                        {/* Highlights */}
                        <div className="space-y-2 mb-6">
                          {course.highlights.map((highlight, i) => (
                            <div key={i} className="flex items-center gap-2">
                              <CheckCircle className="h-4 w-4 text-brand-success shrink-0" />
                              <span className="text-sm">{highlight}</span>
                            </div>
                          ))}
                        </div>

                        {/* Certifications */}
                        <div className="mb-6">
                          <h4 className="text-sm font-semibold mb-3">Certifications Included:</h4>
                          <div className="flex flex-wrap gap-2">
                            {course.certifications.map((cert, i) => (
                              <span key={i} className="px-3 py-1 bg-card border border-border rounded-full text-xs font-medium flex items-center gap-1">
                                <BadgeCheck className="h-3 w-3 text-brand-success" />
                                {cert}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Suitable For */}
                        <div className="mb-6">
                          <h4 className="text-sm font-semibold mb-3">Perfect For:</h4>
                          <div className="flex flex-wrap gap-2">
                            {course.suitable.map((item, i) => (
                              <span key={i} className="px-3 py-1 bg-primary/5 text-primary rounded-full text-xs font-medium">
                                {item}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* CTA */}
                        <div className="flex flex-col sm:flex-row gap-3">
                          <Link to="/contact" className="flex-1">
                            <Button className={`w-full bg-gradient-to-r ${course.gradient} text-white rounded-full py-6 font-semibold`}>
                              Enroll Now <ArrowRight className="ml-2 h-5 w-5" />
                            </Button>
                          </Link>
                          <Button variant="outline" className="rounded-full py-6">
                            Download Syllabus
                          </Button>
                        </div>
                      </div>

                      {/* Right Side - Curriculum */}
                      <div>
                        <h4 className="font-semibold mb-4">Course Curriculum</h4>
                        <ModuleAccordion modules={course.modules} />
                      </div>
                    </div>
                  </div>
                </AnimatedSection>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="section-padding bg-muted/30">
        <div className="container-custom">
          <AnimatedSection className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
              Why Askillax
            </span>
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
              What Sets Us Apart
            </h2>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <AnimatedSection key={index} delay={index * 0.05}>
                  <div className="card-base text-center h-full hover-lift group">
                    <div className={`inline-flex p-4 rounded-2xl ${feature.color} mb-4 group-hover:scale-110 transition-transform`}>
                      <Icon className="h-7 w-7" />
                    </div>
                    <h3 className="font-heading font-semibold text-lg mb-2">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground">{feature.desc}</p>
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
              AI-First Learning
            </span>
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
              Master All Major AI Tools
            </h2>
          </AnimatedSection>

          <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
            {[
              'ChatGPT', 'Perplexity', 'Gemini', 'Copilot', 'Grok', 'Claude',
              'Midjourney', 'DALL-E', 'Canva AI', 'Jasper', 'Copy.ai', 'Buffer AI'
            ].map((tool, i) => (
              <AnimatedSection key={i} delay={i * 0.05}>
                <div className="card-base text-center py-4 hover-lift">
                  <Brain className="h-6 w-6 text-purple-600 mx-auto mb-2" />
                  <span className="text-sm font-medium">{tool}</span>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-gradient-to-br from-primary via-primary to-brand-indigo text-white">
        <div className="container-custom text-center">
          <AnimatedSection>
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
              Not Sure Which Course to Choose?
            </h2>
            <p className="text-white/80 max-w-2xl mx-auto mb-8">
              Get a free career assessment and personalized course recommendation from our experts.
            </p>
            <Link to="/contact">
              <Button 
                size="lg"
                data-testid="courses-cta-btn"
                className="bg-white text-primary hover:bg-white/90 rounded-full px-8 font-semibold"
              >
                Get Free Counseling
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}
