import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Award, CheckCircle, ExternalLink, BadgeCheck, Sparkles, ArrowRight } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Link } from 'react-router-dom';

// 25+ Certifications organized by category
const certificationCategories = [
  {
    id: 'google',
    name: 'Google Certifications',
    logo: 'https://www.gstatic.com/images/branding/product/2x/google_ads_64dp.png',
    description: 'Official Google certifications for Ads, Analytics & more.',
    color: 'from-blue-500 to-cyan-500',
    bgColor: 'bg-blue-500/5 border-blue-500/20',
    certs: [
      'Google Ads Search',
      'Google Ads Display',
      'Google Ads Video',
      'Google Analytics 4',
      'Google Tag Manager',
      'Google My Business',
    ],
  },
  {
    id: 'meta',
    name: 'Meta Certifications',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Facebook_Logo_%282019%29.png/600px-Facebook_Logo_%282019%29.png',
    description: 'Facebook & Instagram advertising certifications.',
    color: 'from-blue-600 to-indigo-600',
    bgColor: 'bg-indigo-500/5 border-indigo-500/20',
    certs: [
      'Meta Blueprint',
      'Facebook Ads Manager',
      'Instagram Marketing',
      'WhatsApp Business',
    ],
  },
  {
    id: 'hubspot',
    name: 'HubSpot Certifications',
    logo: 'https://www.hubspot.com/hubfs/HubSpot_Logos/HubSpot-Inversed-Favicon.png',
    description: 'Inbound marketing & content strategy certifications.',
    color: 'from-orange-500 to-red-500',
    bgColor: 'bg-orange-500/5 border-orange-500/20',
    certs: [
      'Inbound Marketing',
      'Content Marketing',
      'Email Marketing',
      'Social Media Marketing',
      'Marketing Automation',
    ],
  },
  {
    id: 'tools',
    name: 'Marketing Tools',
    logo: 'https://cdn.semrush.com/static/index/semrush-logo.svg',
    description: 'Industry-leading marketing & SEO tools.',
    color: 'from-purple-500 to-pink-500',
    bgColor: 'bg-purple-500/5 border-purple-500/20',
    certs: [
      'SEMrush SEO Toolkit',
      'Ahrefs Certification',
      'Canva Pro',
      'Mailchimp Email',
      'Hootsuite Social',
      'Buffer Social Media',
    ],
  },
  {
    id: 'government',
    name: 'Government & Industry',
    logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/d/df/Skill_India.png/220px-Skill_India.png',
    description: 'Government-recognized certifications for career advancement.',
    color: 'from-green-500 to-emerald-500',
    bgColor: 'bg-green-500/5 border-green-500/20',
    certs: [
      'Skill India Certificate',
      'NSDC Recognition',
      'LinkedIn Marketing',
    ],
  },
  {
    id: 'skillax',
    name: 'Skillax Academy',
    logo: 'https://customer-assets.emergentagent.com/job_72a42d6f-d52d-43a7-9830-99ee47bb23ab/artifacts/27yldfrm_image.png',
    description: 'Exclusive certifications from Skillax Academy.',
    color: 'from-brand-royal to-brand-indigo',
    bgColor: 'bg-primary/5 border-primary/20',
    certs: [
      'Skillax Professional',
      'Skillax AI Expert',
      'Skillax Content Specialist',
      'Internship Certificate',
    ],
  },
];

// All certifications for marquee
const allCerts = [
  'Google Ads', 'Meta Blueprint', 'HubSpot', 'SEMrush', 'Analytics', 
  'Canva', 'Mailchimp', 'LinkedIn', 'Skill India', 'Ahrefs',
  'Content Marketing', 'Email Marketing', 'Social Media', 'AI Marketing'
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
              Stand out with certifications from Google, Meta, HubSpot & more. 
              All included in your course – no extra cost!
            </p>

            {/* Stats */}
            <div className="flex flex-wrap justify-center gap-8">
              {[
                { value: '25+', label: 'Certifications' },
                { value: '6', label: 'Platforms' },
                { value: '100%', label: 'Included' },
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + i * 0.1 }}
                  className="text-center"
                >
                  <div className="font-heading font-bold text-4xl">{stat.value}</div>
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

      {/* Scrolling Certification Logos */}
      <section className="py-8 bg-muted/30 border-b border-border overflow-hidden">
        <div className="relative">
          <div className="flex animate-marquee">
            {[...allCerts, ...allCerts, ...allCerts].map((cert, i) => (
              <div
                key={i}
                className="flex items-center gap-2 px-6 py-3 mx-3 bg-card rounded-full border border-border shrink-0"
              >
                <BadgeCheck className="h-5 w-5 text-brand-success" />
                <span className="font-medium whitespace-nowrap">{cert}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certification Categories */}
      <section className="section-padding">
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
              <AnimatedSection key={category.id} delay={index * 0.1}>
                <motion.div
                  className={`card-base h-full ${category.bgColor} hover:border-primary/30 transition-all`}
                  whileHover={{ scale: 1.02, y: -5 }}
                  data-testid={`cert-${category.id}`}
                >
                  {/* Header */}
                  <div className="flex items-center gap-4 mb-4">
                    <div className={`p-3 bg-gradient-to-br ${category.color} rounded-xl`}>
                      <img
                        src={category.logo}
                        alt={category.name}
                        className="h-8 w-8 object-contain"
                        loading="lazy"
                        onError={(e) => {
                          e.target.style.display = 'none';
                        }}
                      />
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
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Certification Process */}
      <section className="section-padding bg-muted/30">
        <div className="container-custom">
          <AnimatedSection className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
              How It Works
            </span>
            <h2 className="font-heading text-3xl md:text-4xl font-bold">
              Your Certification Journey
            </h2>
          </AnimatedSection>

          <div className="grid md:grid-cols-4 gap-6">
            {[
              { step: '01', title: 'Enroll', desc: 'Join our comprehensive program', color: 'from-blue-500 to-cyan-500' },
              { step: '02', title: 'Learn', desc: 'Master skills with hands-on training', color: 'from-purple-500 to-pink-500' },
              { step: '03', title: 'Practice', desc: 'Work on real projects', color: 'from-orange-500 to-red-500' },
              { step: '04', title: 'Certify', desc: 'Get 25+ industry certifications', color: 'from-green-500 to-emerald-500' },
            ].map((item, index) => (
              <AnimatedSection key={index} delay={index * 0.15}>
                <motion.div 
                  className="text-center"
                  whileHover={{ y: -10 }}
                >
                  <motion.div 
                    className={`inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br ${item.color} text-white rounded-full font-heading font-bold text-2xl mb-4 shadow-lg`}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                  >
                    {item.step}
                  </motion.div>
                  <h3 className="font-heading font-semibold text-xl mb-2">{item.title}</h3>
                  <p className="text-muted-foreground text-sm">{item.desc}</p>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>

          {/* Connection Lines */}
          <div className="hidden md:flex justify-center mt-4">
            {[1, 2, 3].map((_, i) => (
              <div key={i} className="w-1/4 h-0.5 bg-gradient-to-r from-primary/20 to-primary/40 -mt-32 mx-2" />
            ))}
          </div>
        </div>
      </section>

      {/* Sample Certificate */}
      <section className="section-padding">
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
