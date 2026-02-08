import React, { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { 
  Briefcase, TrendingUp, MapPin, Building,
  GraduationCap, Award, CheckCircle, ArrowRight, Sparkles,
  Users, Globe, Star, Rocket, Target, Upload,
  Linkedin, FileText, Zap, Brain, Heart
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import axios from 'axios';

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

// Career Paths - No salary displayed
const careerPaths = [
  {
    title: 'Digital Marketing Specialist',
    level: 'Entry to Mid Level',
    growth: 'High Demand',
    icon: Target,
    color: 'from-blue-500 to-cyan-500',
    skills: ['SEO/SEM', 'Content Marketing', 'Analytics', 'Paid Ads'],
    companies: ['IT Companies', 'Agencies', 'Startups', 'E-commerce'],
  },
  {
    title: 'SEO & AEO Expert',
    level: 'Specialized Role',
    growth: 'Growing Fast',
    icon: TrendingUp,
    color: 'from-green-500 to-emerald-500',
    skills: ['Technical SEO', 'AEO Strategy', 'Link Building', 'GEO'],
    companies: ['SEO Agencies', 'E-commerce', 'SaaS', 'Publishers'],
  },
  {
    title: 'Social Media Manager',
    level: 'Creative Role',
    growth: 'Evergreen',
    icon: Users,
    color: 'from-purple-500 to-pink-500',
    skills: ['Content Creation', 'Community Management', 'Influencer Marketing', 'Analytics'],
    companies: ['Brands', 'Agencies', 'Influencers', 'Startups'],
  },
  {
    title: 'Performance Marketer',
    level: 'High Impact Role',
    growth: 'Booming',
    icon: Rocket,
    color: 'from-orange-500 to-red-500',
    skills: ['Google Ads', 'Meta Ads', 'Analytics', 'CRO'],
    companies: ['E-commerce', 'D2C Brands', 'Agencies', 'Tech'],
  },
  {
    title: 'AI Marketing Specialist',
    level: 'Future-Ready Role',
    growth: 'Emerging',
    icon: Brain,
    color: 'from-indigo-500 to-violet-500',
    skills: ['AI Tools', 'Automation', 'ChatGPT Ads', 'Prompt Engineering'],
    companies: ['Tech Companies', 'Enterprises', 'Consulting'],
  },
  {
    title: 'Freelancer / Entrepreneur',
    level: 'Self-Employed',
    growth: 'Unlimited',
    icon: Globe,
    color: 'from-teal-500 to-cyan-500',
    skills: ['Multiple Skills', 'Client Management', 'Business Development'],
    companies: ['Global Clients', 'Upwork', 'Fiverr', 'Direct'],
  },
];

// Why Digital Marketing Career
const careerBenefits = [
  { icon: TrendingUp, title: 'High Growth Industry', desc: 'One of the fastest-growing sectors globally' },
  { icon: Globe, title: 'Work From Anywhere', desc: 'Remote work opportunities worldwide' },
  { icon: Rocket, title: 'Quick Career Growth', desc: 'Fast promotions with right skills' },
  { icon: Heart, title: 'Creative & Analytical', desc: 'Perfect blend of creativity and data' },
];

// Success Stories
const successStories = [
  { name: 'Rahul K.', role: 'Digital Marketer @ Infopark Company', quote: 'Got placed within 2 months of completing the course!', batch: '2024' },
  { name: 'Priya M.', role: 'Freelancer with Global Clients', quote: 'Now working with clients from US and UK.', batch: '2024' },
  { name: 'Arun S.', role: 'SEO Lead @ Digital Agency', quote: 'The practical training gave me confidence to lead a team.', batch: '2025' },
  { name: 'Sneha R.', role: 'Social Media Manager @ Brand', quote: 'My creative skills are finally being recognized and rewarded.', batch: '2025' },
];

function AnimatedSection({ children, className = '', delay = 0 }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.6, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Career Guidance Modal
function CareerGuidanceModal({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    linkedinUrl: '',
    experience: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone) return;
    
    setIsSubmitting(true);
    try {
      await axios.post(`${API}/leads`, {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        interest: 'Career Guidance',
        source: 'career_page',
        message: `LinkedIn: ${formData.linkedinUrl || 'Not provided'}, Experience: ${formData.experience}, Notes: ${formData.message}`
      });
      setIsSuccess(true);
    } catch (error) {
      console.error('Error:', error);
    }
    setIsSubmitting(false);
  };

  if (!isOpen) return null;

  return (
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
        className="bg-card border border-border rounded-3xl p-8 max-w-lg w-full shadow-2xl max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {isSuccess ? (
          <div className="text-center py-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="inline-flex items-center justify-center w-20 h-20 bg-brand-success/10 rounded-full mb-4"
            >
              <CheckCircle className="h-10 w-10 text-brand-success" />
            </motion.div>
            <h3 className="font-heading font-bold text-2xl mb-2">Thank You!</h3>
            <p className="text-muted-foreground mb-6">
              Our career counselor will review your profile and contact you within 24 hours 
              with personalized guidance.
            </p>
            <Button onClick={onClose} className="rounded-full">Close</Button>
          </div>
        ) : (
          <>
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-gradient-to-br from-primary to-brand-indigo rounded-xl">
                <Briefcase className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="font-heading font-bold text-xl">Free Career Guidance</h3>
                <p className="text-xs text-muted-foreground">Get personalized career advice</p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1.5">Full Name *</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full input-base"
                  placeholder="Your name"
                  required
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1.5">Email *</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full input-base"
                    placeholder="your@email.com"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1.5">Phone *</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full input-base"
                    placeholder="+91 XXXXX"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1.5">
                  <Linkedin className="inline h-4 w-4 mr-1" />
                  LinkedIn Profile (Optional)
                </label>
                <input
                  type="url"
                  value={formData.linkedinUrl}
                  onChange={(e) => setFormData({ ...formData, linkedinUrl: e.target.value })}
                  className="w-full input-base"
                  placeholder="https://linkedin.com/in/yourprofile"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1.5">Current Status</label>
                <select
                  value={formData.experience}
                  onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                  className="w-full input-base"
                >
                  <option value="">Select...</option>
                  <option value="student">Student</option>
                  <option value="fresher">Fresher</option>
                  <option value="working">Working Professional</option>
                  <option value="career-change">Career Change</option>
                  <option value="business">Business Owner</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1.5">Your Career Goals</label>
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full input-base min-h-[80px]"
                  placeholder="Tell us about your career aspirations..."
                  rows={3}
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-primary hover:bg-primary/90 rounded-full py-6"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Submitting...' : 'Get Free Career Guidance'}
              </Button>
            </form>
          </>
        )}
      </motion.div>
    </motion.div>
  );
}

export default function Careers() {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative pt-20 pb-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-success via-emerald-600 to-teal-600">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-20 left-10 w-72 h-72 bg-white rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-20 right-10 w-96 h-96 bg-brand-amber rounded-full blur-3xl animate-pulse" />
          </div>
        </div>

        <div className="container-custom relative z-10 text-white">
          <AnimatedSection className="text-center max-w-4xl mx-auto">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 border border-white/20 rounded-full text-sm font-medium mb-6 backdrop-blur-sm"
            >
              <Briefcase className="h-5 w-5 text-brand-amber" />
              <span>100% Placement Assistance</span>
            </motion.div>
            
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold mb-6" data-testid="careers-title">
              Launch Your{' '}
              <span className="text-brand-amber">Digital Marketing</span>{' '}
              Career
            </h1>
            <p className="text-lg text-white/80 mb-8">
              With Infopark internship, 30+ certifications, and dedicated placement support, 
              your dream career starts here at Skillax.
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <Button
                onClick={() => setShowModal(true)}
                size="lg"
                className="bg-white text-brand-success hover:bg-white/90 rounded-full px-8 font-semibold"
              >
                <Upload className="mr-2 h-5 w-5" />
                Get Free Career Guidance
              </Button>
              <Link to="/contact">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white/10 rounded-full px-8"
                >
                  Talk to Counselor
                </Button>
              </Link>
            </div>
          </AnimatedSection>
        </div>

        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 100" fill="none" className="w-full">
            <path d="M0 100V50C240 90 480 10 720 50C960 90 1200 10 1440 50V100H0Z" fill="currentColor" className="text-background"/>
          </svg>
        </div>
      </section>

      {/* Why Digital Marketing Career */}
      <section className="section-padding">
        <div className="container-custom">
          <AnimatedSection className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
              Why This Career?
            </span>
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
              Digital Marketing is the Future
            </h2>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {careerBenefits.map((benefit, i) => {
              const Icon = benefit.icon;
              return (
                <AnimatedSection key={i} delay={i * 0.1}>
                  <motion.div 
                    className="card-base text-center h-full"
                    whileHover={{ y: -10 }}
                  >
                    <div className="inline-flex p-4 bg-primary/10 rounded-2xl mb-4">
                      <Icon className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="font-heading font-bold text-lg mb-2">{benefit.title}</h3>
                    <p className="text-muted-foreground text-sm">{benefit.desc}</p>
                  </motion.div>
                </AnimatedSection>
              );
            })}
          </div>
        </div>
      </section>

      {/* Career Paths */}
      <section className="section-padding bg-muted/30">
        <div className="container-custom">
          <AnimatedSection className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
              Career Paths
            </span>
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
              Choose Your Path
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Digital marketing offers diverse career paths. Find what excites you most.
            </p>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {careerPaths.map((path, index) => {
              const Icon = path.icon;
              return (
                <AnimatedSection key={index} delay={index * 0.1}>
                  <motion.div 
                    className="card-base h-full relative overflow-hidden"
                    whileHover={{ y: -10, scale: 1.02 }}
                  >
                    <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${path.color} opacity-10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2`} />
                    
                    <div className="relative z-10">
                      <div className="flex items-start justify-between mb-4">
                        <div className={`p-3 bg-gradient-to-br ${path.color} rounded-xl`}>
                          <Icon className="h-6 w-6 text-white" />
                        </div>
                        <span className="px-3 py-1 bg-brand-success/10 text-brand-success text-xs font-medium rounded-full">
                          {path.growth}
                        </span>
                      </div>
                      
                      <h3 className="font-heading font-bold text-xl mb-1">{path.title}</h3>
                      <p className="text-sm text-primary font-medium mb-4">{path.level}</p>
                      
                      <div className="mb-4">
                        <p className="text-xs text-muted-foreground mb-2">Key Skills:</p>
                        <div className="flex flex-wrap gap-1">
                          {path.skills.map((skill, i) => (
                            <span key={i} className="px-2 py-1 bg-muted text-xs rounded-full">{skill}</span>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <p className="text-xs text-muted-foreground mb-2">Work At:</p>
                        <div className="flex flex-wrap gap-1">
                          {path.companies.map((company, i) => (
                            <span key={i} className="px-2 py-1 bg-primary/5 text-xs rounded-full">{company}</span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </AnimatedSection>
              );
            })}
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="section-padding">
        <div className="container-custom">
          <AnimatedSection className="text-center mb-12">
            <span className="inline-block px-4 py-1.5 bg-brand-amber/10 text-brand-amber rounded-full text-sm font-medium mb-4">
              Success Stories
            </span>
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
              Our Alumni Are Thriving
            </h2>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {successStories.map((story, i) => (
              <AnimatedSection key={i} delay={i * 0.1}>
                <motion.div 
                  className="card-base text-center h-full"
                  whileHover={{ y: -5 }}
                >
                  <div className="w-16 h-16 bg-gradient-to-br from-primary to-brand-indigo rounded-full mx-auto mb-4 flex items-center justify-center text-white font-bold text-xl">
                    {story.name.charAt(0)}
                  </div>
                  <h4 className="font-semibold">{story.name}</h4>
                  <p className="text-sm text-primary mb-2">{story.role}</p>
                  <p className="text-muted-foreground text-sm italic mb-2">"{story.quote}"</p>
                  <p className="text-xs text-muted-foreground">Batch {story.batch}</p>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Infopark Internship */}
      <section className="section-padding bg-gradient-to-br from-primary/5 via-background to-brand-amber/5">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <AnimatedSection>
              <span className="inline-block px-4 py-1.5 bg-brand-amber/10 text-brand-amber rounded-full text-sm font-medium mb-4">
                Exclusive Opportunity
              </span>
              <h2 className="font-heading text-3xl md:text-4xl font-bold mb-6">
                Guaranteed Internship at{' '}
                <span className="gradient-text">Infopark</span>
              </h2>
              <p className="text-muted-foreground mb-8">
                Every Professional course student gets hands-on experience at top IT companies 
                in Kerala's premier technology hub.
              </p>

              <div className="space-y-4 mb-8">
                {[
                  'Work with real clients on live projects',
                  'Build a professional portfolio',
                  'Get mentored by industry experts',
                  'High conversion to full-time offers',
                  'Network with IT professionals',
                ].map((item, i) => (
                  <motion.div 
                    key={i} 
                    className="flex items-center gap-3"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <CheckCircle className="h-5 w-5 text-brand-success" />
                    <span>{item}</span>
                  </motion.div>
                ))}
              </div>

              <Link to="/contact">
                <Button className="bg-primary hover:bg-primary/90 rounded-full px-8">
                  Apply for Internship
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <div className="card-base bg-gradient-to-br from-primary/10 to-brand-amber/10 border-primary/20">
                <h3 className="font-heading font-bold text-xl mb-6 text-center">Our Network</h3>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { name: 'Infopark Companies', type: 'IT Hub' },
                    { name: 'Kochi Startups', type: 'Startup Ecosystem' },
                    { name: 'Digital Agencies', type: 'Service Providers' },
                    { name: 'E-commerce Brands', type: 'Online Retail' },
                    { name: 'Media Houses', type: 'Publishing' },
                    { name: 'Global Clients', type: 'Freelance' },
                  ].map((partner, i) => (
                    <motion.div
                      key={i}
                      className="p-4 bg-card rounded-xl text-center"
                      whileHover={{ scale: 1.05 }}
                    >
                      <Building className="h-8 w-8 mx-auto mb-2 text-primary" />
                      <h4 className="font-semibold text-sm">{partner.name}</h4>
                      <p className="text-xs text-muted-foreground">{partner.type}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* What Sets Us Apart */}
      <section className="section-padding bg-muted/30">
        <div className="container-custom">
          <AnimatedSection className="text-center mb-12">
            <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
              Why Skillax?
            </span>
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
              What Sets Us Apart
            </h2>
          </AnimatedSection>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: Brain, title: '30+ AI Tools', desc: 'Learn the latest AI tools dominating the marketing industry', color: 'from-purple-500 to-pink-500' },
              { icon: Award, title: '30+ Certifications', desc: 'Google, Meta, HubSpot certifications included in course fee', color: 'from-brand-amber to-orange-500' },
              { icon: Building, title: 'Infopark Internship', desc: 'Hands-on experience at top Kerala IT companies', color: 'from-blue-500 to-cyan-500' },
            ].map((item, i) => {
              const Icon = item.icon;
              return (
                <AnimatedSection key={i} delay={i * 0.1}>
                  <motion.div 
                    className="card-base text-center h-full"
                    whileHover={{ y: -10 }}
                  >
                    <div className={`inline-flex p-4 bg-gradient-to-br ${item.color} rounded-2xl text-white mb-4`}>
                      <Icon className="h-8 w-8" />
                    </div>
                    <h3 className="font-heading font-bold text-xl mb-2">{item.title}</h3>
                    <p className="text-muted-foreground text-sm">{item.desc}</p>
                  </motion.div>
                </AnimatedSection>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-gradient-to-br from-brand-success via-emerald-600 to-teal-600 text-white">
        <div className="container-custom text-center">
          <AnimatedSection>
            <Sparkles className="h-12 w-12 mx-auto mb-6 text-brand-amber" />
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
              Your Dream Career Awaits
            </h2>
            <p className="text-white/80 max-w-2xl mx-auto mb-8">
              Join Skillax and transform your career with in-demand digital skills, 
              industry certifications, and guaranteed placement support.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button
                onClick={() => setShowModal(true)}
                size="lg"
                className="bg-white text-brand-success hover:bg-white/90 rounded-full px-8"
              >
                <Upload className="mr-2 h-5 w-5" />
                Get Free Career Guidance
              </Button>
              <Link to="/courses">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white/10 rounded-full px-8"
                >
                  Explore Training Programs
                </Button>
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Career Guidance Modal */}
      <CareerGuidanceModal isOpen={showModal} onClose={() => setShowModal(false)} />
    </div>
  );
}
