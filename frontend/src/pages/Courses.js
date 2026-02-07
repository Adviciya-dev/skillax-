import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Clock, Award, ArrowRight, ChevronRight, CheckCircle,
  BookOpen, Brain, Building, Users, Rocket, Sparkles,
  Target, Briefcase, Laptop, Calendar
} from 'lucide-react';
import { Button } from '../components/ui/button';

// Only 2 courses
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
      'SEO, SEM, SMM, Email Marketing',
      'AI Tools: ChatGPT, Midjourney, Canva AI',
      'Google Ads & Meta Ads Mastery',
      'Content Marketing & Copywriting',
      'Analytics & Data-Driven Marketing',
      'Live Client Projects',
      'Guaranteed Internship at Infopark',
      '100% Placement Assistance',
    ],
    certifications: ['Google Ads', 'Google Analytics', 'Meta Blueprint', 'HubSpot', 'SEMrush', 'Skillax Pro'],
    modules: [
      { title: 'Digital Marketing Fundamentals', weeks: '2 weeks' },
      { title: 'Search Engine Optimization (SEO)', weeks: '3 weeks' },
      { title: 'Search Engine Marketing (SEM)', weeks: '2 weeks' },
      { title: 'Social Media Marketing', weeks: '3 weeks' },
      { title: 'Content & Email Marketing', weeks: '2 weeks' },
      { title: 'AI Tools & Automation', weeks: '2 weeks' },
      { title: 'Analytics & Reporting', weeks: '1 week' },
      { title: 'Internship at Infopark', weeks: '4 weeks' },
    ],
    suitable: ['Freshers & Students', 'Career Changers', 'Business Owners', 'Marketing Professionals'],
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
      'ChatGPT for Marketing',
      'AI Content Generation',
      'AI Image & Video Creation',
      'Marketing Automation',
      'Prompt Engineering Mastery',
      'AI Analytics & Insights',
      'Weekend Batches Available',
      'Certificate of Completion',
    ],
    certifications: ['Skillax AI Expert', 'HubSpot Automation', 'AI Marketing Specialist'],
    modules: [
      { title: 'AI Fundamentals for Marketers', weeks: '1 week' },
      { title: 'ChatGPT & Content Creation', weeks: '2 weeks' },
      { title: 'AI Image & Video Generation', weeks: '1 week' },
      { title: 'Marketing Automation Tools', weeks: '2 weeks' },
      { title: 'Prompt Engineering', weeks: '1 week' },
      { title: 'AI-Powered Analytics', weeks: '1 week' },
    ],
    suitable: ['Working Professionals', 'Digital Marketers', 'Content Creators', 'Entrepreneurs'],
    featured: false,
  },
];

function AnimatedSection({ children, className = '', delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.6, delay }}
      className={className}
    >
      {children}
    </motion.div>
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
              Transform Your Career
            </span>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold mb-6" data-testid="courses-page-title">
              Choose Your Path to{' '}
              <span className="text-brand-amber">Digital Success</span>
            </h1>
            <p className="text-lg text-white/80 max-w-2xl mx-auto">
              Two carefully crafted programs designed to make you industry-ready with 
              AI-powered skills and guaranteed internship at Infopark.
            </p>
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
          <div className="grid lg:grid-cols-2 gap-8">
            {courses.map((course, index) => {
              const Icon = course.icon;
              return (
                <AnimatedSection key={course.id} delay={index * 0.15}>
                  <div className={`card-base h-full bg-gradient-to-br ${course.bgGradient} border-2 hover:border-primary/30 transition-all relative overflow-hidden`}>
                    {course.featured && (
                      <div className="absolute top-4 right-4 px-3 py-1 bg-brand-amber text-white text-xs font-bold rounded-full">
                        MOST POPULAR
                      </div>
                    )}

                    {/* Header */}
                    <div className="flex items-start gap-4 mb-6">
                      <div className={`p-4 rounded-2xl bg-gradient-to-br ${course.gradient} shrink-0`}>
                        <Icon className="h-8 w-8 text-white" />
                      </div>
                      <div>
                        <h2 className="font-heading font-bold text-2xl mb-1">{course.title}</h2>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
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

                    {/* Description */}
                    <p className="text-muted-foreground mb-6">{course.description}</p>

                    {/* Highlights */}
                    <div className="grid grid-cols-2 gap-3 mb-6">
                      {course.highlights.slice(0, 6).map((highlight, i) => (
                        <div key={i} className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-brand-success shrink-0" />
                          <span className="text-sm">{highlight}</span>
                        </div>
                      ))}
                    </div>

                    {/* Certifications Preview */}
                    <div className="mb-6">
                      <h4 className="text-sm font-semibold mb-2">Certifications Included:</h4>
                      <div className="flex flex-wrap gap-2">
                        {course.certifications.map((cert, i) => (
                          <span key={i} className="px-3 py-1 bg-card border border-border rounded-full text-xs font-medium">
                            {cert}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Suitable For */}
                    <div className="mb-6">
                      <h4 className="text-sm font-semibold mb-2">Perfect For:</h4>
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
                </AnimatedSection>
              );
            })}
          </div>
        </div>
      </section>

      {/* Curriculum Overview */}
      <section className="section-padding bg-muted/30">
        <div className="container-custom">
          <AnimatedSection className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
              Detailed Curriculum
            </span>
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
              What You'll Learn
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our curriculum is designed with input from industry experts and updated regularly.
            </p>
          </AnimatedSection>

          <div className="grid lg:grid-cols-2 gap-8">
            {courses.map((course, courseIndex) => {
              const Icon = course.icon;
              return (
                <AnimatedSection key={course.id} delay={courseIndex * 0.1}>
                  <div className="card-base">
                    <div className="flex items-center gap-3 mb-6">
                      <div className={`p-3 rounded-xl bg-gradient-to-br ${course.gradient}`}>
                        <Icon className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-heading font-bold text-lg">{course.title}</h3>
                        <p className="text-sm text-muted-foreground">{course.duration}</p>
                      </div>
                    </div>

                    <div className="space-y-3">
                      {course.modules.map((module, i) => (
                        <div key={i} className="flex items-center justify-between p-3 bg-muted/50 rounded-xl">
                          <div className="flex items-center gap-3">
                            <span className="w-8 h-8 flex items-center justify-center bg-primary/10 text-primary rounded-lg text-sm font-semibold">
                              {i + 1}
                            </span>
                            <span className="font-medium text-sm">{module.title}</span>
                          </div>
                          <span className="text-xs text-muted-foreground bg-card px-2 py-1 rounded-full">
                            {module.weeks}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </AnimatedSection>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why Choose Our Courses */}
      <section className="section-padding">
        <div className="container-custom">
          <AnimatedSection className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
              Why Skillax
            </span>
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
              What Sets Us Apart
            </h2>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Building, title: 'Infopark Internship', desc: 'Real-world experience at top IT companies' },
              { icon: Brain, title: 'AI-Powered Learning', desc: 'Master ChatGPT, Midjourney & more' },
              { icon: Award, title: '15+ Certifications', desc: 'Industry-recognized credentials' },
              { icon: Users, title: 'Small Batches', desc: 'Maximum 15 students for personalized attention' },
              { icon: Laptop, title: 'Live Projects', desc: 'Work on real client campaigns' },
              { icon: Calendar, title: 'Flexible Timings', desc: 'Morning, evening & weekend options' },
              { icon: Target, title: '100% Practical', desc: 'Learn by doing, not just theory' },
              { icon: Briefcase, title: 'Placement Support', desc: 'Lifetime career assistance' },
            ].map((feature, index) => {
              const Icon = feature.icon;
              return (
                <AnimatedSection key={index} delay={index * 0.1}>
                  <div className="card-base text-center h-full hover-lift">
                    <div className="inline-flex p-4 bg-primary/10 rounded-2xl mb-4">
                      <Icon className="h-7 w-7 text-primary" />
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

      {/* CTA */}
      <section className="section-padding bg-primary text-primary-foreground">
        <div className="container-custom text-center">
          <AnimatedSection>
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
              Not Sure Which Course to Choose?
            </h2>
            <p className="text-primary-foreground/80 max-w-2xl mx-auto mb-8">
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
