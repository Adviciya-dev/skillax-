import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Clock, Users, Award, ArrowRight, ChevronRight,
  BookOpen, TrendingUp, Cpu, PenTool, Briefcase, Loader2
} from 'lucide-react';
import { Button } from '../components/ui/button';
import axios from 'axios';

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

const iconMap = {
  'digital-marketing-foundation': BookOpen,
  'advanced-seo-performance': TrendingUp,
  'social-media-ads-mastery': Users,
  'ai-powered-digital-marketing': Cpu,
  'web-app-qa-marketing': PenTool,
  'freelancing-agency-building': Briefcase,
};

const colorMap = {
  'digital-marketing-foundation': 'bg-blue-500/10 text-blue-600 dark:text-blue-400',
  'advanced-seo-performance': 'bg-green-500/10 text-green-600 dark:text-green-400',
  'social-media-ads-mastery': 'bg-pink-500/10 text-pink-600 dark:text-pink-400',
  'ai-powered-digital-marketing': 'bg-purple-500/10 text-purple-600 dark:text-purple-400',
  'web-app-qa-marketing': 'bg-orange-500/10 text-orange-600 dark:text-orange-400',
  'freelancing-agency-building': 'bg-teal-500/10 text-teal-600 dark:text-teal-400',
};

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
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get(`${API}/courses`);
        setCourses(response.data);
      } catch (error) {
        console.error('Error fetching courses:', error);
        // Fallback to static data
        setCourses([
          {
            id: '1',
            title: 'Digital Marketing Foundation',
            slug: 'digital-marketing-foundation',
            short_description: 'Master the fundamentals of digital marketing from scratch',
            duration: '3 Months',
            highlights: ['100% Practical Training', 'Real Projects', 'Internship Certificate', 'Placement Assistance'],
            certification: 'Google Analytics Certification',
          },
          {
            id: '2',
            title: 'Advanced SEO & Performance',
            slug: 'advanced-seo-performance',
            short_description: 'Become an SEO expert with advanced techniques and strategies',
            duration: '2 Months',
            highlights: ['Advanced Tools Training', 'Live Projects', 'Agency Experience', 'SEO Certification'],
            certification: 'Google Ads & Analytics Certification',
          },
          {
            id: '3',
            title: 'Social Media & Ads Mastery',
            slug: 'social-media-ads-mastery',
            short_description: 'Master social media marketing and paid advertising',
            duration: '2 Months',
            highlights: ['Hands-on Ad Campaigns', 'Budget Management', 'Client Projects', 'Industry Certification'],
            certification: 'Meta Blueprint + Google Ads Certification',
          },
          {
            id: '4',
            title: 'AI-Powered Digital Marketing',
            slug: 'ai-powered-digital-marketing',
            short_description: 'Leverage AI tools to supercharge your marketing',
            duration: '1 Month',
            highlights: ['Latest AI Tools', 'Prompt Libraries', 'Automation Templates', 'Future-Ready Skills'],
            certification: 'Skillax AI Marketing Certificate',
          },
          {
            id: '5',
            title: 'Web, App & QA Marketing',
            slug: 'web-app-qa-marketing',
            short_description: 'Technical marketing for web and mobile applications',
            duration: '2 Months',
            highlights: ['Technical Skills', 'Growth Frameworks', 'MarTech Expertise', 'Industry Projects'],
            certification: 'HubSpot Marketing Certification',
          },
          {
            id: '6',
            title: 'Freelancing & Agency Building',
            slug: 'freelancing-agency-building',
            short_description: 'Start your own digital marketing business',
            duration: '1 Month',
            highlights: ['Business Templates', 'Client Pitch Deck', 'Legal Documents', 'Lifetime Support'],
            certification: 'Skillax Business Certificate',
          },
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="section-padding bg-gradient-to-br from-background via-background to-primary/5">
        <div className="container-custom">
          <AnimatedSection className="text-center max-w-4xl mx-auto">
            <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
              Our Programs
            </span>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold mb-6" data-testid="courses-page-title">
              Transform Your Career with{' '}
              <span className="gradient-text">Industry-Ready Skills</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              From foundational courses to advanced specializations, find the perfect program 
              to launch or accelerate your digital marketing career.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Courses Grid */}
      <section className="section-padding">
        <div className="container-custom">
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {courses.map((course, index) => {
                const Icon = iconMap[course.slug] || BookOpen;
                const colorClass = colorMap[course.slug] || 'bg-primary/10 text-primary';

                return (
                  <AnimatedSection key={course.id || index} delay={index * 0.1}>
                    <Link
                      to={`/courses/${course.slug}`}
                      data-testid={`course-${course.slug}`}
                      className="group block card-base h-full hover-lift"
                    >
                      {/* Icon */}
                      <div className={`inline-flex p-4 rounded-2xl ${colorClass} mb-4`}>
                        <Icon className="h-8 w-8" />
                      </div>

                      {/* Title & Description */}
                      <h3 className="font-heading font-semibold text-xl mb-2 group-hover:text-primary transition-colors">
                        {course.title}
                      </h3>
                      <p className="text-muted-foreground text-sm mb-4">
                        {course.short_description}
                      </p>

                      {/* Duration & Certification */}
                      <div className="flex items-center gap-4 mb-4">
                        <div className="flex items-center gap-2 text-sm">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <span>{course.duration}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Award className="h-4 w-4 text-muted-foreground" />
                          <span>Certified</span>
                        </div>
                      </div>

                      {/* Highlights */}
                      <div className="space-y-2 mb-6">
                        {course.highlights?.slice(0, 3).map((highlight, i) => (
                          <div key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                            <ChevronRight className="h-4 w-4 text-primary" />
                            <span>{highlight}</span>
                          </div>
                        ))}
                      </div>

                      {/* CTA */}
                      <div className="flex items-center justify-between pt-4 border-t border-border">
                        <span className="text-sm font-medium text-muted-foreground">
                          {course.certification?.split('+')[0] || 'Industry Certified'}
                        </span>
                        <span className="flex items-center gap-1 text-primary font-medium text-sm group-hover:gap-2 transition-all">
                          View Details <ArrowRight className="h-4 w-4" />
                        </span>
                      </div>
                    </Link>
                  </AnimatedSection>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* Why Choose Our Courses */}
      <section className="section-padding bg-muted/30">
        <div className="container-custom">
          <AnimatedSection className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
              Why Skillax
            </span>
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
              What Sets Our Courses Apart
            </h2>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Users, title: 'Small Batch Size', desc: 'Max 15 students per batch for personalized attention' },
              { icon: Briefcase, title: 'Real Projects', desc: 'Work on actual client projects during training' },
              { icon: Award, title: 'Global Certifications', desc: 'Get certified by Google, Meta, HubSpot & more' },
              { icon: TrendingUp, title: 'Placement Support', desc: '100% placement assistance with top companies' },
            ].map((feature, index) => {
              const Icon = feature.icon;
              return (
                <AnimatedSection key={index} delay={index * 0.1}>
                  <div className="card-base text-center h-full">
                    <div className="inline-flex p-4 bg-primary/10 rounded-2xl mb-4">
                      <Icon className="h-8 w-8 text-primary" />
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
              Our career counselors can help you find the perfect course based on your 
              background, interests, and career goals. Get a free consultation today.
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
