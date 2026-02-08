import React, { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Award, CheckCircle, BadgeCheck, Sparkles, ArrowRight, Trophy, Star, Zap } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Link } from 'react-router-dom';

// 30+ Certification Programs
const certificationPrograms = [
  // Google Certifications
  { name: 'Google Ads Search', category: 'Google', icon: '🔍' },
  { name: 'Google Ads Display', category: 'Google', icon: '📊' },
  { name: 'Google Ads Video', category: 'Google', icon: '🎬' },
  { name: 'Google Analytics 4', category: 'Google', icon: '📈' },
  { name: 'Google Tag Manager', category: 'Google', icon: '🏷️' },
  { name: 'Google My Business', category: 'Google', icon: '📍' },
  // Meta Certifications
  { name: 'Meta Blueprint', category: 'Meta', icon: '📱' },
  { name: 'Facebook Ads Manager', category: 'Meta', icon: '📢' },
  { name: 'Instagram Marketing', category: 'Meta', icon: '📸' },
  { name: 'WhatsApp Business', category: 'Meta', icon: '💬' },
  // HubSpot Certifications
  { name: 'Inbound Marketing', category: 'HubSpot', icon: '🎯' },
  { name: 'Content Marketing', category: 'HubSpot', icon: '📝' },
  { name: 'Email Marketing', category: 'HubSpot', icon: '✉️' },
  { name: 'Social Media Marketing', category: 'HubSpot', icon: '📲' },
  // SEO Tools
  { name: 'SEMrush SEO Toolkit', category: 'SEO', icon: '🛠️' },
  { name: 'Ahrefs Certification', category: 'SEO', icon: '🔗' },
  { name: 'Moz SEO Fundamentals', category: 'SEO', icon: '🌐' },
  // Social Media
  { name: 'Hootsuite Platform', category: 'Social', icon: '🦉' },
  { name: 'Buffer Marketing', category: 'Social', icon: '📆' },
  { name: 'Sprout Social', category: 'Social', icon: '🌱' },
  // Design & Creative
  { name: 'Canva Pro Design', category: 'Design', icon: '🎨' },
  { name: 'Adobe Creative Cloud', category: 'Design', icon: '✨' },
  // E-commerce
  { name: 'Shopify Partner', category: 'E-commerce', icon: '🛒' },
  { name: 'WooCommerce', category: 'E-commerce', icon: '🏪' },
  // Others
  { name: 'LinkedIn Marketing', category: 'Professional', icon: '💼' },
  { name: 'YouTube Creator', category: 'Video', icon: '▶️' },
  { name: 'Twitter/X Marketing', category: 'Social', icon: '🐦' },
  { name: 'Pinterest Marketing', category: 'Social', icon: '📌' },
  // Government & Industry
  { name: 'Skill India Certificate', category: 'Government', icon: '🇮🇳' },
  { name: 'NSDC Recognition', category: 'Government', icon: '🏛️' },
  // Skillax Certifications
  { name: 'Skillax Professional', category: 'Skillax', icon: '⭐' },
  { name: 'Skillax AI Expert', category: 'Skillax', icon: '🤖' },
];

// Group certifications by category
const certCategories = [
  { id: 'google', name: 'Google Certifications', icon: '🔍', color: 'from-blue-500 to-cyan-500', count: 6 },
  { id: 'meta', name: 'Meta/Facebook', icon: '📱', color: 'from-blue-600 to-indigo-600', count: 4 },
  { id: 'hubspot', name: 'HubSpot Academy', icon: '🎯', color: 'from-orange-500 to-red-500', count: 4 },
  { id: 'seo', name: 'SEO & Analytics', icon: '📊', color: 'from-purple-500 to-pink-500', count: 3 },
  { id: 'social', name: 'Social Media Tools', icon: '🚀', color: 'from-pink-500 to-rose-500', count: 6 },
  { id: 'other', name: 'Design, E-commerce & More', icon: '✨', color: 'from-green-500 to-emerald-500', count: 9 },
];

// Animated section wrapper
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

// Animated counter
function AnimatedCounter({ target }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    if (!isInView) return;
    let current = 0;
    const increment = target / 30;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, 50);
    return () => clearInterval(timer);
  }, [isInView, target]);

  return <span ref={ref}>{count}+</span>;
}

// Interactive Logo Marquee
function CertificationMarquee({ certs, direction = 'left', speed = 30 }) {
  const duplicatedCerts = [...certs, ...certs, ...certs];
  
  return (
    <div className="relative overflow-hidden py-4">
      <motion.div
        className="flex gap-4"
        animate={{ 
          x: direction === 'left' ? [0, -50 * certs.length] : [-50 * certs.length, 0] 
        }}
        transition={{ 
          x: { duration: speed, repeat: Infinity, ease: 'linear' }
        }}
      >
        {duplicatedCerts.map((cert, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.1, y: -5 }}
            className="flex items-center gap-3 px-5 py-3 bg-card rounded-xl border border-border shadow-sm hover:shadow-lg hover:border-primary/30 transition-all cursor-pointer shrink-0"
          >
            <span className="text-2xl">{cert.icon}</span>
            <span className="font-medium whitespace-nowrap text-sm">{cert.name}</span>
            <BadgeCheck className="h-4 w-4 text-brand-success" />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}

export default function Certifications() {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredCerts = selectedCategory === 'all' 
    ? certificationPrograms 
    : certificationPrograms.filter(c => c.category.toLowerCase() === selectedCategory);

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative pt-20 pb-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-brand-indigo to-purple-600">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-20 left-10 w-72 h-72 bg-white rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-20 right-10 w-96 h-96 bg-brand-amber rounded-full blur-3xl animate-pulse" />
          </div>
          {/* Floating Icons */}
          <motion.div
            className="absolute top-32 left-20 text-white/20"
            animate={{ y: [0, -20, 0], rotate: [0, 10, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
          >
            <Trophy className="h-20 w-20" />
          </motion.div>
          <motion.div
            className="absolute bottom-40 right-20 text-white/20"
            animate={{ y: [0, 20, 0], rotate: [0, -10, 0] }}
            transition={{ duration: 5, repeat: Infinity }}
          >
            <Award className="h-24 w-24" />
          </motion.div>
        </div>

        <div className="container-custom relative z-10 text-white">
          <AnimatedSection className="text-center max-w-4xl mx-auto">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 border border-white/20 rounded-full text-sm font-medium mb-6 backdrop-blur-sm"
            >
              <Award className="h-5 w-5 text-brand-amber" />
              <span>Industry Recognition</span>
            </motion.div>
            
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold mb-6" data-testid="certifications-title">
              Earn{' '}
              <span className="text-brand-amber"><AnimatedCounter target={30} /></span>{' '}
              Global Certifications
            </h1>
            <p className="text-lg text-white/80 mb-8">
              Stand out with certifications from Google, Meta, HubSpot, SEMrush & more. 
              All included in your course – no extra cost!
            </p>

            {/* Stats */}
            <div className="flex flex-wrap justify-center gap-8">
              {[
                { value: '30+', label: 'Certifications', icon: Trophy },
                { value: '10+', label: 'Platforms', icon: Zap },
                { value: '100%', label: 'Included', icon: Star },
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + i * 0.1 }}
                  className="text-center p-4 bg-white/10 rounded-2xl backdrop-blur-sm border border-white/10"
                >
                  <stat.icon className="h-6 w-6 mx-auto mb-2 text-brand-amber" />
                  <div className="font-heading font-bold text-3xl">{stat.value}</div>
                  <div className="text-sm text-white/70">{stat.label}</div>
                </motion.div>
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

      {/* Interactive Logo Marquee - Row 1 */}
      <section className="py-6 bg-muted/30 border-b border-border overflow-hidden">
        <div className="container-custom mb-4">
          <p className="text-center text-sm text-muted-foreground font-medium uppercase tracking-wider">
            30+ Industry-Leading Certifications
          </p>
        </div>
        <CertificationMarquee certs={certificationPrograms.slice(0, 16)} direction="left" speed={35} />
      </section>

      {/* Interactive Logo Marquee - Row 2 (reverse direction) */}
      <section className="py-6 bg-muted/30 border-b border-border overflow-hidden">
        <CertificationMarquee certs={certificationPrograms.slice(16)} direction="right" speed={40} />
      </section>

      {/* Why Certifications Matter */}
      <section className="section-padding">
        <div className="container-custom">
          <AnimatedSection className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
              Career Advantage
            </span>
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
              Why Certifications Matter
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              In today's competitive job market, certifications are your proof of expertise.
            </p>
          </AnimatedSection>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { 
                icon: '📈', 
                title: 'Stand Out',
                desc: 'Certified professionals get noticed first by recruiters and clients.',
                color: 'from-green-500 to-emerald-500'
              },
              { 
                icon: '🎯', 
                title: '2x Interview Calls',
                desc: 'Certifications make your resume stand out and get more opportunities.',
                color: 'from-blue-500 to-cyan-500'
              },
              { 
                icon: '🚀', 
                title: 'Global Recognition',
                desc: 'Work anywhere in the world with internationally recognized credentials.',
                color: 'from-purple-500 to-pink-500'
              },
            ].map((item, i) => (
              <AnimatedSection key={i} delay={i * 0.1}>
                <motion.div 
                  className="card-base text-center h-full"
                  whileHover={{ y: -10 }}
                >
                  <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br ${item.color} rounded-2xl text-3xl mb-4`}>
                    {item.icon}
                  </div>
                  <h3 className="font-heading font-bold text-xl mb-2">{item.title}</h3>
                  <p className="text-muted-foreground text-sm">{item.desc}</p>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* All Certifications Grid */}
      <section className="section-padding bg-muted/30">
        <div className="container-custom">
          <AnimatedSection className="text-center mb-12">
            <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
              Complete List
            </span>
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
              All 30+ Certifications
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
              Every certification is included in your course fee. No hidden costs!
            </p>

            {/* Category Filter */}
            <div className="flex flex-wrap justify-center gap-2 mb-8">
              <button
                onClick={() => setSelectedCategory('all')}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  selectedCategory === 'all' 
                    ? 'bg-primary text-white' 
                    : 'bg-card border border-border hover:border-primary/30'
                }`}
              >
                All ({certificationPrograms.length})
              </button>
              {['Google', 'Meta', 'HubSpot', 'SEO', 'Social', 'Design', 'Skillax'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat.toLowerCase())}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    selectedCategory === cat.toLowerCase() 
                      ? 'bg-primary text-white' 
                      : 'bg-card border border-border hover:border-primary/30'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredCerts.map((cert, index) => (
              <AnimatedSection key={index} delay={index * 0.02}>
                <motion.div
                  className="card-base text-center p-4"
                  whileHover={{ y: -5, scale: 1.02 }}
                >
                  <span className="text-3xl mb-2 block">{cert.icon}</span>
                  <h4 className="font-semibold text-sm mb-1">{cert.name}</h4>
                  <span className="text-xs text-muted-foreground">{cert.category}</span>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Certification Process */}
      <section className="section-padding">
        <div className="container-custom">
          <AnimatedSection className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
              How It Works
            </span>
            <h2 className="font-heading text-3xl md:text-4xl font-bold">
              Your Certification Journey
            </h2>
          </AnimatedSection>

          <div className="grid md:grid-cols-4 gap-6 relative">
            {/* Connection Line */}
            <div className="hidden md:block absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-green-500 -translate-y-1/2 -z-10 opacity-20" />
            
            {[
              { step: '01', title: 'Enroll', desc: 'Join our training program', color: 'from-blue-500 to-cyan-500', icon: '📝' },
              { step: '02', title: 'Learn', desc: 'Master skills with hands-on training', color: 'from-purple-500 to-pink-500', icon: '📚' },
              { step: '03', title: 'Practice', desc: 'Work on real projects & exams', color: 'from-orange-500 to-red-500', icon: '💪' },
              { step: '04', title: 'Certify', desc: 'Get 30+ industry certifications', color: 'from-green-500 to-emerald-500', icon: '🏆' },
            ].map((item, index) => (
              <AnimatedSection key={index} delay={index * 0.15}>
                <motion.div 
                  className="text-center"
                  whileHover={{ y: -10 }}
                >
                  <motion.div 
                    className={`inline-flex flex-col items-center justify-center w-24 h-24 bg-gradient-to-br ${item.color} text-white rounded-full font-heading font-bold shadow-lg mb-4`}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                  >
                    <span className="text-3xl">{item.icon}</span>
                  </motion.div>
                  <div className="text-xs text-muted-foreground font-medium mb-1">STEP {item.step}</div>
                  <h3 className="font-heading font-semibold text-xl mb-2">{item.title}</h3>
                  <p className="text-muted-foreground text-sm">{item.desc}</p>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Sample Certificate */}
      <section className="section-padding bg-muted/30">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <AnimatedSection>
              <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
                Your Achievement
              </span>
              <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
                Certificates That Get You Noticed
              </h2>
              <p className="text-muted-foreground mb-6">
                Every certificate comes with a unique verification ID. Share on LinkedIn, 
                add to your resume, or print for your portfolio.
              </p>
              <div className="space-y-4 mb-8">
                {[
                  'Unique certificate ID for verification',
                  'Digital and print-ready formats',
                  'Shareable on LinkedIn with one click',
                  'Globally recognized credentials',
                  'Lifetime validity',
                ].map((feature, i) => (
                  <motion.div 
                    key={i} 
                    className="flex items-center gap-3"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <CheckCircle className="h-5 w-5 text-brand-success" />
                    <span>{feature}</span>
                  </motion.div>
                ))}
              </div>
              <Link to="/courses">
                <Button className="bg-primary hover:bg-primary/90 rounded-full px-8">
                  Start Earning Certifications
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <motion.div 
                className="card-base p-8 text-center border-2 border-primary/20 relative overflow-hidden"
                whileHover={{ scale: 1.02 }}
              >
                {/* Decorative Elements */}
                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-primary via-brand-amber to-primary" />
                <div className="absolute top-4 left-4 opacity-10">
                  <Award className="h-20 w-20 text-primary" />
                </div>
                <div className="absolute bottom-4 right-4 opacity-10">
                  <Trophy className="h-20 w-20 text-brand-amber" />
                </div>
                
                <Award className="h-16 w-16 text-primary mx-auto mb-4" />
                <div className="text-xs text-muted-foreground uppercase tracking-wider mb-2">Certificate of Achievement</div>
                <h3 className="font-heading text-2xl font-bold mb-2">Professional Digital Marketing</h3>
                <p className="text-muted-foreground text-sm mb-4">This is to certify that</p>
                <motion.p 
                  className="font-heading text-xl font-semibold text-primary mb-4"
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  [Your Name Here]
                </motion.p>
                <p className="text-muted-foreground text-sm mb-6">
                  has successfully completed all coursework and examinations at Skillax Academy
                </p>
                <div className="flex justify-center gap-8 text-sm text-muted-foreground border-t border-border pt-4">
                  <div>
                    <div className="font-medium">Date</div>
                    <div>March 2026</div>
                  </div>
                  <div>
                    <div className="font-medium">Certificate ID</div>
                    <div>ASX-2026-XXXX</div>
                  </div>
                </div>

                {/* Stamp Effect */}
                <motion.div
                  className="absolute bottom-8 right-8 w-20 h-20 border-4 border-brand-success/30 rounded-full flex items-center justify-center rotate-12"
                  animate={{ rotate: [12, 15, 12] }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  <span className="text-brand-success font-bold text-xs text-center">VERIFIED</span>
                </motion.div>
              </motion.div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-gradient-to-br from-primary via-brand-indigo to-purple-600 text-white">
        <div className="container-custom text-center">
          <AnimatedSection>
            <motion.div
              initial={{ scale: 0.9 }}
              whileInView={{ scale: 1 }}
              className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 rounded-full text-sm font-medium mb-6"
            >
              <Sparkles className="h-5 w-5 text-brand-amber" />
              March 2026 Batch Enrolling
            </motion.div>
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
              Ready to Get Certified?
            </h2>
            <p className="text-white/80 max-w-2xl mx-auto mb-8">
              All 30+ certifications are included in your course fee. Start your journey today!
            </p>
            <Link to="/contact">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button 
                  size="lg"
                  className="bg-white text-primary hover:bg-white/90 rounded-full px-8 font-semibold"
                >
                  Enroll Now
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
