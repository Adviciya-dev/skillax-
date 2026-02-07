import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView, useAnimation } from 'framer-motion';
import { 
  ArrowRight, GraduationCap, Users, Award, Briefcase, 
  BookOpen, Cpu, PenTool, Star, ChevronRight, MapPin,
  Play, CheckCircle, TrendingUp, Target, Zap
} from 'lucide-react';
import { Button } from '../components/ui/button';
import LeadForm from '../components/LeadForm';

// Images from design guidelines
const images = {
  hero: "https://images.unsplash.com/photo-1569653402334-2e98fbaa80ee?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1NzV8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjBzdHVkZW50cyUyMGRpZ2l0YWwlMjBtYXJrZXRpbmclMjBjbGFzc3Jvb20lMjBtb2Rlcm58ZW58MHx8fHwxNzcwNDkzOTkxfDA&ixlib=rb-4.1.0&q=85",
  studentMan: "https://images.unsplash.com/photo-1604177091072-b7b677a077f6?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Nzh8MHwxfHNlYXJjaHwxfHxoYXBweSUyMGluZGlhbiUyMHN0dWRlbnQlMjB3aXRoJTIwbGFwdG9wfGVufDB8fHx8MTc3MDQ5Mzk5Nnww&ixlib=rb-4.1.0&q=85",
  studentWoman: "https://images.unsplash.com/photo-1675664533677-2f3479b85c20?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Nzh8MHwxfHNlYXJjaHwyfHxoYXBweSUyMGluZGlhbiUyMHN0dWRlbnQlMjB3aXRoJTIwbGFwdG9wfGVufDB8fHx8MTc3MDQ5Mzk5Nnww&ixlib=rb-4.1.0&q=85",
  seoDashboard: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1ODh8MHwxfHNlYXJjaHwxfHxTRU8lMjBhbmFseXRpY3MlMjBkYXNoYm9hcmQlMjBzY3JlZW58ZW58MHx8fHwxNzcwNDk0MDM0fDA&ixlib=rb-4.1.0&q=85",
  teamMeeting: "https://images.unsplash.com/photo-1636645096936-fc8704bc8083?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA2MjJ8MHwxfHNlYXJjaHwxfHxkaWdpdGFsJTIwbWFya2V0aW5nJTIwYWdlbmN5JTIwdGVhbSUyMG1lZXRpbmd8ZW58MHx8fHwxNzcwNDk0MDM4fDA&ixlib=rb-4.1.0&q=85",
};

// Certification logos
const certifications = [
  { name: 'Google', logo: 'https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_92x30dp.png' },
  { name: 'HubSpot', logo: 'https://www.hubspot.com/hubfs/HubSpot_Logos/HubSpot-Inversed-Favicon.png' },
  { name: 'Meta', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Meta_Platforms_Inc._logo.svg/512px-Meta_Platforms_Inc._logo.svg.png' },
  { name: 'Skill India', logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/d/df/Skill_India.png/220px-Skill_India.png' },
];

// Course data
const courses = [
  {
    title: 'Digital Marketing Foundation',
    slug: 'digital-marketing-foundation',
    duration: '3 Months',
    icon: BookOpen,
    color: 'bg-blue-500/10 text-blue-600',
    description: 'Master the fundamentals of digital marketing from scratch.',
    featured: true,
  },
  {
    title: 'Advanced SEO & Performance',
    slug: 'advanced-seo-performance',
    duration: '2 Months',
    icon: TrendingUp,
    color: 'bg-green-500/10 text-green-600',
    description: 'Become an SEO expert with advanced techniques.',
  },
  {
    title: 'Social Media & Ads Mastery',
    slug: 'social-media-ads-mastery',
    duration: '2 Months',
    icon: Users,
    color: 'bg-pink-500/10 text-pink-600',
    description: 'Master social media marketing and paid advertising.',
  },
  {
    title: 'AI-Powered Marketing',
    slug: 'ai-powered-digital-marketing',
    duration: '1 Month',
    icon: Cpu,
    color: 'bg-purple-500/10 text-purple-600',
    description: 'Leverage AI tools to supercharge your marketing.',
  },
  {
    title: 'Web, App & QA Marketing',
    slug: 'web-app-qa-marketing',
    duration: '2 Months',
    icon: PenTool,
    color: 'bg-orange-500/10 text-orange-600',
    description: 'Technical marketing for web and mobile apps.',
  },
  {
    title: 'Freelancing & Agency',
    slug: 'freelancing-agency-building',
    duration: '1 Month',
    icon: Briefcase,
    color: 'bg-teal-500/10 text-teal-600',
    description: 'Start your own digital marketing business.',
  },
];

// Stats
const stats = [
  { number: 500, suffix: '+', label: 'Students Trained', icon: Users },
  { number: 95, suffix: '%', label: 'Placement Rate', icon: TrendingUp },
  { number: 10, suffix: '+', label: 'Certifications', icon: Award },
  { number: 50, suffix: '+', label: 'Industry Partners', icon: Briefcase },
];

// Testimonials
const testimonials = [
  {
    name: 'Arjun Menon',
    role: 'Digital Marketing Manager',
    company: 'TechStart Solutions',
    content: 'Skillax transformed my career completely. The practical training and industry exposure helped me land my dream job within 2 months of completing the course.',
    image: images.studentMan,
    rating: 5,
  },
  {
    name: 'Priya Nair',
    role: 'SEO Specialist',
    company: 'WebGrowth Agency',
    content: 'The Advanced SEO course was exactly what I needed. The faculty are industry experts who teach real-world strategies that actually work.',
    image: images.studentWoman,
    rating: 5,
  },
  {
    name: 'Rahul Kumar',
    role: 'Freelance Marketer',
    company: 'Self-employed',
    content: 'Started my freelancing journey right after the course. Now earning 3x my previous salary working from Wayanad. Best investment I ever made!',
    image: images.studentMan,
    rating: 5,
  },
];

// Counter Animation Component
function AnimatedCounter({ target, suffix = '', duration = 2000 }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;

    let startTime = null;
    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * target));
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    requestAnimationFrame(animate);
  }, [isInView, target, duration]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

// Section Animation Wrapper
function AnimatedSection({ children, className = '', delay = 0 }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

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

export default function Home() {
  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center section-padding bg-gradient-to-br from-background via-background to-primary/5">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgwLDAsMCwwLjAzKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-50" />
        
        <div className="container-custom relative">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-8">
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full border border-primary/20"
              >
                <MapPin className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium text-primary">Mananthavady, Wayanad, Kerala</span>
              </motion.div>

              {/* Headline */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight"
              >
                Launch Your{' '}
                <span className="gradient-text">Digital Marketing</span>{' '}
                Career Today
              </motion.h1>

              {/* Subheadline */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-lg md:text-xl text-muted-foreground max-w-xl"
              >
                Kerala's premier digital marketing academy offering industry-recognized certifications, 
                hands-on training, and 100% placement assistance. Transform your future with Skillax.
              </motion.p>

              {/* Features */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="flex flex-wrap gap-4"
              >
                {['Industry Certifications', '100% Practical Training', 'Placement Support'].map((feature, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm">
                    <CheckCircle className="h-5 w-5 text-brand-success" />
                    <span>{feature}</span>
                  </div>
                ))}
              </motion.div>

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="flex flex-wrap gap-4"
              >
                <Link to="/courses">
                  <Button 
                    size="lg" 
                    data-testid="hero-explore-courses"
                    className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-8 font-semibold shadow-lg hover:shadow-xl transition-all"
                  >
                    Explore Courses
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link to="/contact">
                  <Button 
                    size="lg" 
                    variant="outline"
                    data-testid="hero-free-consultation"
                    className="rounded-full px-8 font-semibold border-2"
                  >
                    Free Consultation
                  </Button>
                </Link>
              </motion.div>
            </div>

            {/* Right - Image & Stats Card */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="lg:col-span-5 relative"
            >
              <div className="relative">
                {/* Main Image */}
                <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                  <img
                    src={images.hero}
                    alt="Digital Marketing Classroom"
                    className="w-full h-[400px] object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                </div>

                {/* Floating Stats Card */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                  className="absolute -bottom-6 -left-6 bg-card border border-border rounded-2xl p-4 shadow-xl"
                >
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-brand-success/10 rounded-xl">
                      <TrendingUp className="h-6 w-6 text-brand-success" />
                    </div>
                    <div>
                      <div className="font-heading font-bold text-2xl">95%</div>
                      <div className="text-sm text-muted-foreground">Placement Rate</div>
                    </div>
                  </div>
                </motion.div>

                {/* Floating Badge */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1 }}
                  className="absolute -top-4 -right-4 bg-brand-amber text-white p-4 rounded-2xl shadow-xl"
                >
                  <Award className="h-8 w-8" />
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Certification Logos Marquee */}
      <section className="py-12 bg-muted/50 border-y border-border">
        <div className="container-custom mb-6">
          <p className="text-center text-sm text-muted-foreground uppercase tracking-wider font-medium">
            Certified By Industry Leaders
          </p>
        </div>
        <div className="marquee-container">
          <div className="marquee-content">
            {[...certifications, ...certifications].map((cert, i) => (
              <div
                key={i}
                className="flex items-center gap-3 px-8 py-3 bg-card rounded-xl border border-border"
              >
                <img
                  src={cert.logo}
                  alt={cert.name}
                  className="h-8 w-auto object-contain grayscale hover:grayscale-0 transition-all"
                />
                <span className="font-medium text-muted-foreground">{cert.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="section-padding bg-primary text-primary-foreground">
        <div className="container-custom">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <AnimatedSection key={index} delay={index * 0.1}>
                  <div className="text-center">
                    <div className="inline-flex items-center justify-center w-14 h-14 bg-white/10 rounded-2xl mb-4">
                      <Icon className="h-7 w-7" />
                    </div>
                    <div className="font-heading font-bold text-4xl md:text-5xl mb-2">
                      <AnimatedCounter target={stat.number} suffix={stat.suffix} />
                    </div>
                    <div className="text-primary-foreground/80">{stat.label}</div>
                  </div>
                </AnimatedSection>
              );
            })}
          </div>
        </div>
      </section>

      {/* Courses Section */}
      <section className="section-padding" data-testid="courses-section">
        <div className="container-custom">
          <AnimatedSection className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
              Our Programs
            </span>
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              Industry-Ready Courses
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              From fundamentals to advanced specializations, our courses are designed to make you 
              job-ready with practical skills and industry certifications.
            </p>
          </AnimatedSection>

          {/* Bento Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course, index) => {
              const Icon = course.icon;
              return (
                <AnimatedSection key={course.slug} delay={index * 0.1}>
                  <Link
                    to={`/courses/${course.slug}`}
                    data-testid={`course-card-${course.slug}`}
                    className={`group block card-base hover-lift ${
                      course.featured ? 'md:col-span-2 lg:col-span-1' : ''
                    }`}
                  >
                    <div className={`inline-flex p-3 rounded-xl ${course.color} mb-4`}>
                      <Icon className="h-6 w-6" />
                    </div>
                    <h3 className="font-heading font-semibold text-xl mb-2 group-hover:text-primary transition-colors">
                      {course.title}
                    </h3>
                    <p className="text-muted-foreground text-sm mb-4">
                      {course.description}
                    </p>
                    <div className="flex items-center justify-between pt-4 border-t border-border">
                      <span className="text-sm font-medium text-muted-foreground">
                        {course.duration}
                      </span>
                      <span className="flex items-center gap-1 text-primary font-medium text-sm group-hover:gap-2 transition-all">
                        Learn More <ChevronRight className="h-4 w-4" />
                      </span>
                    </div>
                  </Link>
                </AnimatedSection>
              );
            })}
          </div>

          <AnimatedSection className="text-center mt-12">
            <Link to="/courses">
              <Button 
                size="lg" 
                variant="outline"
                data-testid="view-all-courses"
                className="rounded-full px-8 font-semibold"
              >
                View All Courses
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </AnimatedSection>
        </div>
      </section>

      {/* Why Skillax Section */}
      <section className="section-padding bg-muted/30">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left - Image */}
            <AnimatedSection>
              <div className="relative">
                <img
                  src={images.teamMeeting}
                  alt="Team Meeting"
                  className="rounded-3xl shadow-xl"
                />
                <div className="absolute -bottom-6 -right-6 bg-card border border-border rounded-2xl p-6 shadow-xl max-w-xs">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-brand-amber/10 rounded-xl shrink-0">
                      <Zap className="h-6 w-6 text-brand-amber" />
                    </div>
                    <div>
                      <div className="font-heading font-semibold mb-1">Industry Experts</div>
                      <div className="text-sm text-muted-foreground">Learn from professionals with 10+ years experience</div>
                    </div>
                  </div>
                </div>
              </div>
            </AnimatedSection>

            {/* Right - Content */}
            <div className="space-y-8">
              <AnimatedSection>
                <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
                  Why Choose Us
                </span>
                <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
                  Your Success is Our Mission
                </h2>
                <p className="text-muted-foreground">
                  At Skillax, we don't just teach digital marketing – we create industry-ready professionals. 
                  Our unique approach combines theory with real-world projects, ensuring you're prepared for success.
                </p>
              </AnimatedSection>

              <div className="space-y-4">
                {[
                  { icon: Target, title: 'Practical Training', desc: '80% hands-on projects with real clients' },
                  { icon: Award, title: 'Global Certifications', desc: 'Google, HubSpot, Meta certified courses' },
                  { icon: Briefcase, title: '100% Placement Support', desc: 'Dedicated placement cell with industry connections' },
                  { icon: Users, title: 'Small Batch Size', desc: 'Personalized attention with max 15 students per batch' },
                ].map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <AnimatedSection key={index} delay={index * 0.1}>
                      <div className="flex items-start gap-4 p-4 bg-card rounded-xl border border-border hover:border-primary/30 transition-colors">
                        <div className="p-2 bg-primary/10 rounded-lg shrink-0">
                          <Icon className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <h4 className="font-heading font-semibold mb-1">{item.title}</h4>
                          <p className="text-sm text-muted-foreground">{item.desc}</p>
                        </div>
                      </div>
                    </AnimatedSection>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="section-padding" data-testid="testimonials-section">
        <div className="container-custom">
          <AnimatedSection className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
              Success Stories
            </span>
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              What Our Students Say
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Real stories from real students who transformed their careers with Skillax.
            </p>
          </AnimatedSection>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <AnimatedSection key={index} delay={index * 0.1}>
                <div className="card-base h-full flex flex-col">
                  {/* Stars */}
                  <div className="flex gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-brand-amber text-brand-amber" />
                    ))}
                  </div>

                  {/* Content */}
                  <p className="text-muted-foreground flex-1 mb-6">
                    "{testimonial.content}"
                  </p>

                  {/* Author */}
                  <div className="flex items-center gap-3 pt-4 border-t border-border">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                      <div className="font-heading font-semibold">{testimonial.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {testimonial.role} at {testimonial.company}
                      </div>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-primary text-primary-foreground relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
        </div>

        <div className="container-custom relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <AnimatedSection>
              <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
                Ready to Start Your Digital Marketing Journey?
              </h2>
              <p className="text-primary-foreground/80 text-lg mb-8">
                Join 500+ successful students who have transformed their careers with Skillax. 
                Get industry-recognized certifications and 100% placement assistance.
              </p>
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5" />
                  <span>Free Career Counseling</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5" />
                  <span>Flexible Batches</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5" />
                  <span>EMI Available</span>
                </div>
              </div>
            </AnimatedSection>

            {/* Right - Form */}
            <AnimatedSection delay={0.2}>
              <div className="bg-card text-card-foreground rounded-2xl p-8 shadow-2xl">
                <h3 className="font-heading font-semibold text-xl mb-6">
                  Get Free Career Consultation
                </h3>
                <LeadForm source="home_cta" />
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>
    </div>
  );
}
