import React, { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Award, CheckCircle, BadgeCheck, Sparkles, ArrowRight, Trophy, Star, Zap } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Link } from 'react-router-dom';

// 25+ Certification logos with proper high-quality URLs
const certificationLogos = [
  { name: 'Google Ads', logo: 'https://www.gstatic.com/images/branding/product/2x/google_ads_64dp.png', color: '#4285F4' },
  { name: 'Google Analytics', logo: 'https://www.gstatic.com/analytics-suite/header/suite/v2/ic_analytics.svg', color: '#F9AB00' },
  { name: 'Meta Blueprint', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Facebook_Logo_%282019%29.png/600px-Facebook_Logo_%282019%29.png', color: '#1877F2' },
  { name: 'HubSpot', logo: 'https://www.hubspot.com/hubfs/HubSpot_Logos/HubSpot-Inversed-Favicon.png', color: '#FF7A59' },
  { name: 'SEMrush', logo: 'https://cdn.semrush.com/static/index/semrush-logo.svg', color: '#FF642D' },
  { name: 'LinkedIn', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/LinkedIn_logo_initials.png/600px-LinkedIn_logo_initials.png', color: '#0A66C2' },
  { name: 'Canva', logo: 'https://upload.wikimedia.org/wikipedia/commons/0/08/Canva_icon_2021.svg', color: '#00C4CC' },
  { name: 'Mailchimp', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/76/Mailchimp_2018.svg/512px-Mailchimp_2018.svg.png', color: '#FFE01B' },
  { name: 'Ahrefs', logo: 'https://ahrefs.com/favicon-32x32.png', color: '#FF6B00' },
  { name: 'Hootsuite', logo: 'https://hootsuite.com/favicon.ico', color: '#143059' },
  { name: 'Buffer', logo: 'https://buffer.com/static/icons/favicon-32x32.png', color: '#231F20' },
  { name: 'Skill India', logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/d/df/Skill_India.png/220px-Skill_India.png', color: '#FF9933' },
  { name: 'Google Tag Manager', logo: 'https://www.gstatic.com/analytics-suite/header/suite/v2/ic_tag_manager.svg', color: '#4285F4' },
  { name: 'Instagram', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Instagram_logo_2016.svg/132px-Instagram_logo_2016.svg.png', color: '#E4405F' },
  { name: 'YouTube', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/YouTube_full-color_icon_%282017%29.svg/240px-YouTube_full-color_icon_%282017%29.svg.png', color: '#FF0000' },
  { name: 'Twitter/X', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/X_logo_2023_original.svg/240px-X_logo_2023_original.svg.png', color: '#000000' },
  { name: 'Pinterest', logo: 'https://upload.wikimedia.org/wikipedia/commons/0/08/Pinterest-logo.png', color: '#E60023' },
  { name: 'Shopify', logo: 'https://cdn.shopify.com/shopifycloud/brochure/assets/brand-assets/shopify-logo-shopping-bag-full-color-66166b2e55d67988b56b4bd28b63c271e2b9713358cb723070a92bde17ad7d63.svg', color: '#7AB55C' },
  { name: 'WordPress', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/WordPress_blue_logo.svg/240px-WordPress_blue_logo.svg.png', color: '#21759B' },
  { name: 'Moz', logo: 'https://moz.com/favicon.ico', color: '#2BA9E1' },
  { name: 'Sprout Social', logo: 'https://sproutsocial.com/favicon.ico', color: '#59CB59' },
  { name: 'Google My Business', logo: 'https://www.gstatic.com/images/branding/product/2x/hh_my_business_64dp.png', color: '#4285F4' },
  { name: 'Constant Contact', logo: 'https://www.constantcontact.com/favicon.ico', color: '#0078BC' },
  { name: 'Wix', logo: 'https://www.wix.com/favicon.ico', color: '#000000' },
  { name: 'Skillax AI Expert', logo: 'https://customer-assets.emergentagent.com/job_72a42d6f-d52d-43a7-9830-99ee47bb23ab/artifacts/27yldfrm_image.png', color: '#2B2D9C' },
];

// Certification categories with details
const certificationCategories = [
  {
    id: 'google',
    name: 'Google Certifications',
    icon: '🔍',
    description: 'Official Google certifications for Ads, Analytics, Tag Manager & My Business.',
    color: 'from-blue-500 to-cyan-500',
    bgColor: 'bg-blue-500/5 border-blue-500/20',
    certs: ['Google Ads Search', 'Google Ads Display', 'Google Ads Video', 'Google Analytics 4', 'Google Tag Manager', 'Google My Business'],
  },
  {
    id: 'meta',
    name: 'Meta/Facebook',
    icon: '📱',
    description: 'Facebook, Instagram & WhatsApp marketing certifications.',
    color: 'from-blue-600 to-indigo-600',
    bgColor: 'bg-indigo-500/5 border-indigo-500/20',
    certs: ['Meta Blueprint', 'Facebook Ads Manager', 'Instagram Marketing', 'WhatsApp Business', 'Messenger Marketing'],
  },
  {
    id: 'hubspot',
    name: 'HubSpot Academy',
    icon: '🎯',
    description: 'Inbound marketing, content strategy & automation certifications.',
    color: 'from-orange-500 to-red-500',
    bgColor: 'bg-orange-500/5 border-orange-500/20',
    certs: ['Inbound Marketing', 'Content Marketing', 'Email Marketing', 'Social Media Marketing', 'Marketing Automation'],
  },
  {
    id: 'seo',
    name: 'SEO & Analytics',
    icon: '📊',
    description: 'Industry-leading SEO and analytics tool certifications.',
    color: 'from-purple-500 to-pink-500',
    bgColor: 'bg-purple-500/5 border-purple-500/20',
    certs: ['SEMrush SEO Toolkit', 'Ahrefs Certification', 'Moz SEO', 'Google Search Console', 'Screaming Frog'],
  },
  {
    id: 'social',
    name: 'Social Media Tools',
    icon: '🚀',
    description: 'Social media management and scheduling platforms.',
    color: 'from-pink-500 to-rose-500',
    bgColor: 'bg-pink-500/5 border-pink-500/20',
    certs: ['Hootsuite', 'Buffer', 'Sprout Social', 'Later', 'Canva Pro'],
  },
  {
    id: 'government',
    name: 'Government & Industry',
    icon: '🏛️',
    description: 'Government-recognized certifications for career advancement.',
    color: 'from-green-500 to-emerald-500',
    bgColor: 'bg-green-500/5 border-green-500/20',
    certs: ['Skill India Certificate', 'NSDC Recognition', 'LinkedIn Marketing', 'Skillax Professional', 'Skillax AI Expert'],
  },
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
function LogoMarquee({ logos, direction = 'left', speed = 25 }) {
  const duplicatedLogos = [...logos, ...logos, ...logos];
  
  return (
    <div className="relative overflow-hidden py-4">
      <motion.div
        className="flex gap-6"
        animate={{ 
          x: direction === 'left' ? [0, -100 * logos.length] : [-100 * logos.length, 0] 
        }}
        transition={{ 
          x: { duration: speed, repeat: Infinity, ease: 'linear' }
        }}
      >
        {duplicatedLogos.map((logo, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.1, y: -5 }}
            className="flex items-center gap-3 px-6 py-4 bg-card rounded-2xl border border-border shadow-sm hover:shadow-lg hover:border-primary/30 transition-all cursor-pointer shrink-0"
          >
            <div className="w-12 h-12 flex items-center justify-center bg-gradient-to-br from-muted to-muted/50 rounded-xl p-2">
              <img 
                src={logo.logo} 
                alt={logo.name} 
                className="w-full h-full object-contain"
                loading="lazy"
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
            </div>
            <span className="font-semibold whitespace-nowrap">{logo.name}</span>
            <BadgeCheck className="h-5 w-5 text-brand-success" />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}

// Category Card with hover effect
function CategoryCard({ category, index }) {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <AnimatedSection delay={index * 0.1}>
      <motion.div
        className={`card-base h-full ${category.bgColor} hover:border-primary/30 transition-all cursor-pointer relative overflow-hidden`}
        whileHover={{ scale: 1.02, y: -5 }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        data-testid={`cert-${category.id}`}
      >
        {/* Glow effect */}
        <motion.div
          className={`absolute -inset-20 bg-gradient-to-r ${category.color} opacity-0 blur-3xl`}
          animate={{ opacity: isHovered ? 0.1 : 0 }}
        />
        
        <div className="relative z-10">
          {/* Header */}
          <div className="flex items-center gap-4 mb-4">
            <div className={`p-3 bg-gradient-to-br ${category.color} rounded-xl text-white text-2xl`}>
              {category.icon}
            </div>
            <div>
              <h3 className="font-heading font-bold text-lg">{category.name}</h3>
              <p className="text-xs text-muted-foreground">{category.certs.length} certifications</p>
            </div>
          </div>

          <p className="text-sm text-muted-foreground mb-4">{category.description}</p>

          {/* Certifications List */}
          <div className="space-y-2">
            {category.certs.map((cert, i) => (
              <motion.div
                key={i}
                className="flex items-center gap-2 p-2 bg-card/50 rounded-lg"
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <CheckCircle className="h-4 w-4 text-brand-success shrink-0" />
                <span className="text-sm">{cert}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </AnimatedSection>
  );
}

export default function Certifications() {
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
              <span className="text-brand-amber"><AnimatedCounter target={25} /></span>{' '}
              Global Certifications
            </h1>
            <p className="text-lg text-white/80 mb-8">
              Stand out with certifications from Google, Meta, HubSpot, SEMrush & more. 
              All included in your course – no extra cost!
            </p>

            {/* Stats */}
            <div className="flex flex-wrap justify-center gap-8">
              {[
                { value: '25+', label: 'Certifications', icon: Trophy },
                { value: '6', label: 'Platforms', icon: Zap },
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
            25+ Industry-Leading Certifications
          </p>
        </div>
        <LogoMarquee logos={certificationLogos.slice(0, 13)} direction="left" speed={30} />
      </section>

      {/* Interactive Logo Marquee - Row 2 (reverse direction) */}
      <section className="py-6 bg-muted/30 border-b border-border overflow-hidden">
        <LogoMarquee logos={certificationLogos.slice(13)} direction="right" speed={35} />
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
                title: '47% Higher Salary',
                desc: 'Certified professionals earn significantly more than non-certified peers.',
                color: 'from-green-500 to-emerald-500'
              },
              { 
                icon: '🎯', 
                title: '2x Interview Calls',
                desc: 'Certifications make your resume stand out and get more interview opportunities.',
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

      {/* Certification Categories */}
      <section className="section-padding bg-muted/30">
        <div className="container-custom">
          <AnimatedSection className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
              All Certifications
            </span>
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
              Certification Categories
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Every certification is included in your course fee. No hidden costs!
            </p>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {certificationCategories.map((category, index) => (
              <CategoryCard key={category.id} category={category} index={index} />
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
              { step: '01', title: 'Enroll', desc: 'Join our comprehensive program', color: 'from-blue-500 to-cyan-500', icon: '📝' },
              { step: '02', title: 'Learn', desc: 'Master skills with hands-on training', color: 'from-purple-500 to-pink-500', icon: '📚' },
              { step: '03', title: 'Practice', desc: 'Work on real projects & exams', color: 'from-orange-500 to-red-500', icon: '💪' },
              { step: '04', title: 'Certify', desc: 'Get 25+ industry certifications', color: 'from-green-500 to-emerald-500', icon: '🏆' },
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
                Certificates That Get You Hired
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
                    <div>March 2025</div>
                  </div>
                  <div>
                    <div className="font-medium">Certificate ID</div>
                    <div>SKX-2025-XXXX</div>
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
              March 2025 Batch Enrolling
            </motion.div>
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
              Ready to Get Certified?
            </h2>
            <p className="text-white/80 max-w-2xl mx-auto mb-8">
              All 25+ certifications are included in your course fee. Start your journey today!
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
