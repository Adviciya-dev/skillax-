import React, { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { 
  Target, Users, Award, BookOpen, Briefcase, Heart,
  MapPin, GraduationCap, TrendingUp, CheckCircle, Star,
  Brain, Rocket, Zap, Globe, BarChart3, Building,
  ShoppingCart, Megaphone, Bot, ArrowRight, Sparkles
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';

const images = {
  teamMeeting: "https://images.unsplash.com/photo-1636645096936-fc8704bc8083?w=800&q=80",
  teamMan: "https://images.unsplash.com/photo-1659355894117-0ae6f8f28d0b?w=800&q=80",
  teamWoman: "https://images.unsplash.com/photo-1705164454513-d8274719fdf5?w=800&q=80",
  wayanad: "https://images.unsplash.com/photo-1619020905969-ba8d47f8c7cf?w=800&q=80",
  kerala: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=800&q=80",
};

// Digital Transformation Statistics
const digitalStats = [
  { number: 89, suffix: '%', label: 'Indian companies adopting AI by 2025', icon: Brain },
  { number: 4.8, suffix: 'T', label: 'India digital economy by 2030', icon: Globe },
  { number: 156, suffix: '%', label: 'Growth in AI marketing jobs', icon: TrendingUp },
  { number: 65, suffix: '%', label: 'Businesses moving online post-2020', icon: ShoppingCart },
];

// Traditional vs Digital Comparison
const shiftComparison = [
  { 
    traditional: 'Newspaper Ads', 
    digital: 'Google & Meta Ads', 
    growth: '340% more reach',
    icon: Megaphone 
  },
  { 
    traditional: 'Door-to-Door Sales', 
    digital: 'E-commerce & D2C', 
    growth: '500% more efficient',
    icon: ShoppingCart 
  },
  { 
    traditional: 'Manual Marketing', 
    digital: 'AI-Powered Automation', 
    growth: '10x faster',
    icon: Bot 
  },
  { 
    traditional: 'Local Reach', 
    digital: 'Global Digital Presence', 
    growth: 'Unlimited scale',
    icon: Globe 
  },
];

// Kerala Digital Opportunities
const keralaOpportunities = [
  { city: 'Kochi', area: 'Infopark', jobs: '50,000+', type: 'IT Hub', highlight: true },
  { city: 'Trivandrum', area: 'Technopark', jobs: '70,000+', type: 'Startup Capital', highlight: false },
  { city: 'Kozhikode', area: 'Cyberpark', jobs: '15,000+', type: 'Emerging Hub', highlight: false },
  { city: 'Wayanad', area: 'Tourism & Agri-Tech', jobs: 'Growing', type: 'Digital Tourism', highlight: true },
];

const values = [
  { icon: Target, title: 'Excellence', desc: 'We strive for excellence in everything we do, from curriculum design to student support.' },
  { icon: Heart, title: 'Passion', desc: 'Our passion for digital marketing drives us to stay updated with the latest AI trends.' },
  { icon: Users, title: 'Community', desc: 'We build a supportive community where students and alumni help each other grow.' },
  { icon: TrendingUp, title: 'Growth', desc: 'We are committed to the continuous growth and success of our students.' },
];

const team = [
  { name: 'Rajesh Kumar', role: 'Founder & Lead Trainer', specialty: 'Digital Strategy & SEO', image: images.teamMan },
  { name: 'Priya Menon', role: 'Head of Academics', specialty: 'Social Media & AI Tools', image: images.teamWoman },
  { name: 'Arun Nair', role: 'Industry Partnerships', specialty: 'Infopark Relations', image: images.teamMan },
];

const milestones = [
  { year: '2020', title: 'Foundation', desc: 'Skillax Academy established in Mananthavady' },
  { year: '2021', title: 'First Batch', desc: 'Graduated 50+ students with 90% placement' },
  { year: '2022', title: 'Certifications', desc: 'Became official Google & HubSpot partner' },
  { year: '2023', title: 'AI Integration', desc: 'Launched AI-powered courses (ChatGPT, Perplexity)' },
  { year: '2024', title: 'Recognition', desc: 'Rated #1 Digital Marketing Academy in Wayanad' },
  { year: '2025', title: 'Expansion', desc: 'Adding AEO, GEO & ChatGPT Ads to curriculum' },
];

// Animated Counter
function AnimatedCounter({ target, suffix = '', decimals = 0, duration = 2000 }) {
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

  return <span ref={ref}>{count}{suffix}</span>;
}

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

// Kerala Map Component with Hotspots
function KeralaDigitalMap() {
  const [activeCity, setActiveCity] = useState(null);
  
  return (
    <div className="relative">
      {/* Map Container */}
      <div className="relative bg-gradient-to-br from-primary/5 via-brand-amber/5 to-purple-500/5 rounded-3xl p-8 border border-border overflow-hidden">
        {/* Animated background grid */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgwLDAsMCwwLjEpIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')]" />
        </div>
        
        {/* Glowing orbs */}
        <motion.div 
          className="absolute top-10 right-10 w-40 h-40 bg-brand-amber/20 rounded-full blur-3xl"
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 4, repeat: Infinity }}
        />
        <motion.div 
          className="absolute bottom-10 left-10 w-60 h-60 bg-primary/20 rounded-full blur-3xl"
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 5, repeat: Infinity }}
        />
        
        <div className="relative z-10">
          <div className="text-center mb-8">
            <h3 className="font-heading text-2xl md:text-3xl font-bold mb-2">
              🗺️ Kerala's Digital Revolution
            </h3>
            <p className="text-muted-foreground">Discover opportunities across the state</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            {keralaOpportunities.map((opp, i) => (
              <motion.div
                key={i}
                className={`relative p-6 rounded-2xl border-2 transition-all cursor-pointer ${
                  opp.highlight 
                    ? 'bg-gradient-to-br from-primary/10 to-brand-amber/10 border-primary/30' 
                    : 'bg-card/50 border-border hover:border-primary/30'
                }`}
                whileHover={{ scale: 1.02, y: -5 }}
                onHoverStart={() => setActiveCity(opp.city)}
                onHoverEnd={() => setActiveCity(null)}
              >
                {opp.highlight && (
                  <div className="absolute -top-3 -right-3">
                    <motion.div 
                      className="px-3 py-1 bg-brand-amber text-white text-xs font-bold rounded-full"
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      🔥 HOT
                    </motion.div>
                  </div>
                )}
                
                <div className="flex items-start gap-4">
                  <div className={`p-3 rounded-xl ${opp.highlight ? 'bg-primary text-white' : 'bg-muted'}`}>
                    <MapPin className="h-6 w-6" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-heading font-bold text-lg">{opp.city}</h4>
                    <p className="text-sm text-muted-foreground mb-2">{opp.area}</p>
                    <div className="flex items-center gap-4 text-sm">
                      <span className="px-2 py-1 bg-brand-success/10 text-brand-success rounded-full font-medium">
                        {opp.jobs} Jobs
                      </span>
                      <span className="text-muted-foreground">{opp.type}</span>
                    </div>
                  </div>
                </div>
                
                {activeCity === opp.city && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="mt-4 pt-4 border-t border-border"
                  >
                    <p className="text-sm text-muted-foreground">
                      {opp.city === 'Kochi' && 'Home to Infopark with major IT companies. Our students get internship here!'}
                      {opp.city === 'Trivandrum' && 'Kerala\'s capital with Technopark - India\'s first IT park.'}
                      {opp.city === 'Kozhikode' && 'Emerging tech hub with growing startup ecosystem.'}
                      {opp.city === 'Wayanad' && 'Our home! Digital tourism and agri-tech opportunities growing rapidly.'}
                    </p>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
          
          {/* Special Wayanad callout */}
          <motion.div 
            className="mt-6 p-6 bg-gradient-to-r from-primary to-brand-indigo text-white rounded-2xl"
            whileHover={{ scale: 1.02 }}
          >
            <div className="flex items-center gap-4">
              <div className="p-3 bg-white/20 rounded-xl">
                <Sparkles className="h-8 w-8" />
              </div>
              <div>
                <h4 className="font-heading font-bold text-lg">Skillax Academy - Wayanad</h4>
                <p className="text-white/80 text-sm">
                  Study in the peaceful hills of Wayanad, intern at Infopark Kochi. Best of both worlds!
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default function About() {
  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="section-padding bg-gradient-to-br from-background via-background to-primary/5">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <AnimatedSection>
              <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
                About Skillax
              </span>
              <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold mb-6" data-testid="about-title">
                Empowering Digital Futures in{' '}
                <span className="gradient-text">Kerala</span>
              </h1>
              <p className="text-lg text-muted-foreground mb-8">
                Founded in 2020, Skillax Digital Marketing Academy has been at the forefront of 
                digital education in Wayanad. We believe in transforming careers through practical, 
                AI-powered training that prepares students for real-world challenges.
              </p>
              <div className="flex items-center gap-6">
                <div className="text-center">
                  <div className="font-heading font-bold text-4xl text-primary">25+</div>
                  <div className="text-sm text-muted-foreground">Certifications</div>
                </div>
                <div className="w-px h-12 bg-border" />
                <div className="text-center">
                  <div className="font-heading font-bold text-4xl text-primary">100%</div>
                  <div className="text-sm text-muted-foreground">Practical Training</div>
                </div>
                <div className="w-px h-12 bg-border" />
                <div className="text-center">
                  <div className="font-heading font-bold text-4xl text-primary">4.9</div>
                  <div className="text-sm text-muted-foreground">Student Rating</div>
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <div className="relative">
                <img
                  src={images.teamMeeting}
                  alt="Skillax Team"
                  className="rounded-3xl shadow-2xl"
                  loading="lazy"
                />
                <div className="absolute -bottom-6 -left-6 bg-card border border-border rounded-2xl p-4 shadow-xl">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <MapPin className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <div className="font-semibold">Mananthavady</div>
                      <div className="text-sm text-muted-foreground">Wayanad, Kerala</div>
                    </div>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Digital Transformation Stats */}
      <section className="section-padding bg-gradient-to-br from-primary via-primary to-brand-indigo text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
        </div>

        <div className="container-custom relative">
          <AnimatedSection className="text-center mb-12">
            <span className="inline-block px-4 py-1.5 bg-white/10 text-white rounded-full text-sm font-medium mb-4">
              The Digital Revolution
            </span>
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              India's Digital Transformation
            </h2>
            <p className="text-white/80 max-w-2xl mx-auto">
              The world is going digital at unprecedented speed. Those with digital skills are leading this revolution.
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {digitalStats.map((stat, i) => (
              <AnimatedSection key={i} delay={i * 0.1}>
                <motion.div 
                  className="text-center p-6 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/10"
                  whileHover={{ scale: 1.05, y: -5 }}
                >
                  <stat.icon className="h-8 w-8 mx-auto mb-3 opacity-80" />
                  <div className="font-heading font-bold text-4xl md:text-5xl mb-2">
                    <AnimatedCounter target={stat.number} suffix={stat.suffix} decimals={stat.suffix === 'T' ? 1 : 0} />
                  </div>
                  <div className="text-white/80 text-sm">{stat.label}</div>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Traditional vs Digital Shift */}
      <section className="section-padding">
        <div className="container-custom">
          <AnimatedSection className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 bg-destructive/10 text-destructive rounded-full text-sm font-medium mb-4">
              The Big Shift
            </span>
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
              From Traditional to AI-Powered
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Businesses are rapidly shifting from traditional methods to digital and AI-powered solutions. 
              Don't get left behind.
            </p>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 gap-6">
            {shiftComparison.map((item, i) => {
              const Icon = item.icon;
              return (
                <AnimatedSection key={i} delay={i * 0.1}>
                  <motion.div 
                    className="card-base relative overflow-hidden"
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="flex items-center gap-6">
                      {/* Traditional - Faded */}
                      <div className="flex-1 p-4 bg-destructive/5 rounded-xl border border-destructive/20 opacity-60">
                        <div className="text-xs text-destructive font-medium mb-1">❌ OLD WAY</div>
                        <div className="font-semibold text-muted-foreground">{item.traditional}</div>
                      </div>
                      
                      {/* Arrow */}
                      <div className="p-3 bg-gradient-to-r from-primary to-brand-success rounded-full">
                        <ArrowRight className="h-5 w-5 text-white" />
                      </div>
                      
                      {/* Digital - Highlighted */}
                      <div className="flex-1 p-4 bg-brand-success/10 rounded-xl border border-brand-success/30">
                        <div className="text-xs text-brand-success font-medium mb-1">✓ NEW WAY</div>
                        <div className="font-semibold">{item.digital}</div>
                      </div>
                    </div>
                    
                    <div className="mt-4 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Icon className="h-5 w-5 text-primary" />
                        <span className="text-sm text-muted-foreground">Industry shift</span>
                      </div>
                      <span className="px-3 py-1 bg-brand-amber/10 text-brand-amber text-sm font-medium rounded-full">
                        {item.growth}
                      </span>
                    </div>
                  </motion.div>
                </AnimatedSection>
              );
            })}
          </div>
        </div>
      </section>

      {/* AI Tools We Teach */}
      <section className="section-padding bg-muted/30">
        <div className="container-custom">
          <AnimatedSection className="text-center mb-12">
            <span className="inline-block px-4 py-1.5 bg-purple-500/10 text-purple-600 rounded-full text-sm font-medium mb-4">
              AI-First Curriculum
            </span>
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
              Master the AI Tools Dominating Marketing
            </h2>
          </AnimatedSection>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {[
              { name: 'ChatGPT', desc: 'Content & Ads', icon: '🤖' },
              { name: 'Perplexity', desc: 'Research & AEO', icon: '🔍' },
              { name: 'Gemini', desc: 'Google AI', icon: '✨' },
              { name: 'Copilot', desc: 'Microsoft AI', icon: '💻' },
              { name: 'Grok', desc: 'X/Twitter AI', icon: '🐦' },
              { name: 'Claude', desc: 'Analysis', icon: '🧠' },
            ].map((tool, i) => (
              <AnimatedSection key={i} delay={i * 0.1}>
                <motion.div 
                  className="card-base text-center p-4"
                  whileHover={{ y: -10, scale: 1.05 }}
                >
                  <div className="text-3xl mb-2">{tool.icon}</div>
                  <h4 className="font-semibold text-sm">{tool.name}</h4>
                  <p className="text-xs text-muted-foreground">{tool.desc}</p>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Kerala Digital Map */}
      <section className="section-padding">
        <div className="container-custom">
          <AnimatedSection className="text-center mb-12">
            <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
              Opportunities in Kerala
            </span>
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
              Kerala's Digital Economy is Booming
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              From Trivandrum to Wayanad, digital opportunities are everywhere. Our students get placed across the state.
            </p>
          </AnimatedSection>

          <KeralaDigitalMap />
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="section-padding bg-primary text-primary-foreground">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-12">
            <AnimatedSection>
              <div className="p-8 bg-white/10 rounded-2xl backdrop-blur-sm">
                <div className="p-3 bg-white/20 rounded-xl inline-block mb-4">
                  <Target className="h-8 w-8" />
                </div>
                <h2 className="font-heading text-2xl font-bold mb-4">Our Vision</h2>
                <p className="text-primary-foreground/80">
                  To be Kerala's most trusted digital marketing academy, creating a new generation 
                  of AI-skilled professionals who drive business growth through innovative digital strategies.
                </p>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.1}>
              <div className="p-8 bg-white/10 rounded-2xl backdrop-blur-sm">
                <div className="p-3 bg-white/20 rounded-xl inline-block mb-4">
                  <GraduationCap className="h-8 w-8" />
                </div>
                <h2 className="font-heading text-2xl font-bold mb-4">Our Mission</h2>
                <p className="text-primary-foreground/80">
                  To provide world-class digital marketing education accessible to everyone in Kerala, 
                  combining AI-powered training with industry certifications to ensure career success.
                </p>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="section-padding">
        <div className="container-custom">
          <AnimatedSection className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
              Our Values
            </span>
            <h2 className="font-heading text-3xl md:text-4xl font-bold">
              What Drives Us
            </h2>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <AnimatedSection key={index} delay={index * 0.1}>
                  <motion.div 
                    className="card-base text-center h-full"
                    whileHover={{ y: -10 }}
                  >
                    <div className="inline-flex p-4 bg-primary/10 rounded-2xl mb-4">
                      <Icon className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="font-heading font-semibold text-xl mb-2">{value.title}</h3>
                    <p className="text-muted-foreground text-sm">{value.desc}</p>
                  </motion.div>
                </AnimatedSection>
              );
            })}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="section-padding bg-muted/30">
        <div className="container-custom">
          <AnimatedSection className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
              Our Journey
            </span>
            <h2 className="font-heading text-3xl md:text-4xl font-bold">
              Milestones & Achievements
            </h2>
          </AnimatedSection>

          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-brand-amber to-brand-success hidden md:block" />

            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <AnimatedSection key={index} delay={index * 0.1}>
                  <div className={`flex items-center gap-8 ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                    <div className={`flex-1 ${index % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                      <motion.div 
                        className="card-base inline-block"
                        whileHover={{ scale: 1.05 }}
                      >
                        <div className="text-primary font-heading font-bold text-2xl mb-2">{milestone.year}</div>
                        <h3 className="font-heading font-semibold text-lg mb-1">{milestone.title}</h3>
                        <p className="text-muted-foreground text-sm">{milestone.desc}</p>
                      </motion.div>
                    </div>
                    <div className="hidden md:flex items-center justify-center w-4 h-4 bg-primary rounded-full z-10 ring-4 ring-background" />
                    <div className="flex-1" />
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="section-padding">
        <div className="container-custom">
          <AnimatedSection className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
              Our Team
            </span>
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
              Meet the Experts
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Learn from industry professionals with years of real-world experience in digital marketing and AI.
            </p>
          </AnimatedSection>

          <div className="grid md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <AnimatedSection key={index} delay={index * 0.1}>
                <motion.div 
                  className="card-base text-center group"
                  whileHover={{ y: -10 }}
                >
                  <div className="relative mb-6 overflow-hidden rounded-2xl">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-72 object-cover group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                    />
                  </div>
                  <h3 className="font-heading font-semibold text-xl mb-1">{member.name}</h3>
                  <p className="text-primary font-medium mb-2">{member.role}</p>
                  <p className="text-sm text-muted-foreground">{member.specialty}</p>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-primary text-primary-foreground">
        <div className="container-custom text-center">
          <AnimatedSection>
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
              Ready to Join the Skillax Family?
            </h2>
            <p className="text-primary-foreground/80 max-w-2xl mx-auto mb-8">
              Take the first step towards your digital marketing career. 
              Contact us for a free consultation and course demo.
            </p>
            <Link to="/contact">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button 
                  size="lg"
                  className="bg-white text-primary hover:bg-white/90 rounded-full px-8 font-semibold"
                >
                  Contact Us Today
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
