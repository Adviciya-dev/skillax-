import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Clock, Users, Award, ArrowRight, CheckCircle, ChevronDown,
  BookOpen, TrendingUp, Cpu, PenTool, Briefcase, Calendar, Loader2
} from 'lucide-react';
import { Button } from '../components/ui/button';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../components/ui/accordion';
import LeadForm from '../components/LeadForm';
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

const faqs = [
  {
    question: 'What are the prerequisites for this course?',
    answer: 'No prior experience is required for our foundation courses. For advanced courses, basic knowledge of digital marketing concepts is recommended. We provide a free assessment to help you choose the right course.',
  },
  {
    question: 'What is the batch timing?',
    answer: 'We offer flexible batch timings including morning (9 AM - 12 PM), afternoon (2 PM - 5 PM), and weekend batches. Online sessions are also available for working professionals.',
  },
  {
    question: 'Is placement assistance provided?',
    answer: 'Yes, we provide 100% placement assistance. Our dedicated placement cell works with 50+ hiring partners across Kerala and India. We also help with resume building, interview preparation, and job referrals.',
  },
  {
    question: 'Are there any EMI options available?',
    answer: 'Yes, we offer easy EMI options starting from ₹2,999/month. We also have tie-ups with various financing partners for no-cost EMI. Contact us for detailed payment options.',
  },
  {
    question: 'Will I get a certificate after completion?',
    answer: 'Yes, upon successful completion, you will receive a Skillax certification along with industry-recognized certifications from Google, HubSpot, or Meta depending on the course you choose.',
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

export default function CourseDetail() {
  const { slug } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await axios.get(`${API}/courses/${slug}`);
        setCourse(response.data);
      } catch (error) {
        console.error('Error fetching course:', error);
        // Fallback data
        const fallbackCourses = {
          'digital-marketing-foundation': {
            title: 'Digital Marketing Foundation',
            short_description: 'Master the fundamentals of digital marketing from scratch',
            description: 'A comprehensive 3-month program covering all aspects of digital marketing. Perfect for beginners looking to start their career in digital marketing.',
            duration: '3 Months',
            modules: [
              { title: 'Introduction to Digital Marketing', topics: ['What is Digital Marketing', 'Digital Marketing Channels', 'Marketing Funnel'] },
              { title: 'Website & Landing Pages', topics: ['WordPress Basics', 'Landing Page Optimization', 'User Experience'] },
              { title: 'Content Marketing', topics: ['Content Strategy', 'Blog Writing', 'Visual Content'] },
              { title: 'Email Marketing', topics: ['Email List Building', 'Campaign Creation', 'Automation'] },
              { title: 'SEO Basics', topics: ['On-Page SEO', 'Keyword Research', 'Google Analytics'] },
            ],
            highlights: ['100% Practical Training', 'Real Projects', 'Internship Certificate', 'Placement Assistance'],
            certification: 'Skillax Foundation Certificate + Google Analytics Certification',
          },
          'advanced-seo-performance': {
            title: 'Advanced SEO & Performance',
            short_description: 'Become an SEO expert with advanced techniques and strategies',
            description: 'Deep dive into SEO with technical optimization, link building, and performance marketing.',
            duration: '2 Months',
            modules: [
              { title: 'Technical SEO', topics: ['Site Architecture', 'Core Web Vitals', 'Schema Markup'] },
              { title: 'Advanced Keyword Research', topics: ['Competitor Analysis', 'Long-tail Keywords', 'Search Intent'] },
              { title: 'Link Building', topics: ['Backlink Strategies', 'Outreach', 'Guest Posting'] },
            ],
            highlights: ['Advanced Tools Training', 'Live Projects', 'Agency Experience', 'SEO Certification'],
            certification: 'Google Ads & Analytics Certification',
          },
        };
        setCourse(fallbackCourses[slug] || fallbackCourses['digital-marketing-foundation']);
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="font-heading text-2xl font-bold mb-4">Course Not Found</h2>
          <Link to="/courses">
            <Button>View All Courses</Button>
          </Link>
        </div>
      </div>
    );
  }

  const Icon = iconMap[slug] || BookOpen;

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="section-padding bg-gradient-to-br from-background via-background to-primary/5">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Left Content */}
            <AnimatedSection>
              <Link 
                to="/courses" 
                className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary mb-6 transition-colors"
              >
                <ArrowRight className="h-4 w-4 rotate-180" />
                All Courses
              </Link>
              
              <div className="inline-flex p-4 bg-primary/10 rounded-2xl mb-6">
                <Icon className="h-10 w-10 text-primary" />
              </div>

              <h1 className="font-heading text-4xl md:text-5xl font-bold mb-4" data-testid="course-title">
                {course.title}
              </h1>
              <p className="text-lg text-muted-foreground mb-6">
                {course.description || course.short_description}
              </p>

              {/* Course Meta */}
              <div className="flex flex-wrap gap-6 mb-8">
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-primary" />
                  <span className="font-medium">{course.duration}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Award className="h-5 w-5 text-primary" />
                  <span className="font-medium">Certified</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-primary" />
                  <span className="font-medium">Max 15 Students</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-primary" />
                  <span className="font-medium">Flexible Batches</span>
                </div>
              </div>

              {/* Highlights */}
              <div className="grid grid-cols-2 gap-3 mb-8">
                {course.highlights?.map((highlight, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-brand-success shrink-0" />
                    <span className="text-sm">{highlight}</span>
                  </div>
                ))}
              </div>

              {/* Certification */}
              <div className="p-4 bg-brand-amber/10 rounded-xl border border-brand-amber/20">
                <div className="flex items-start gap-3">
                  <Award className="h-6 w-6 text-brand-amber shrink-0" />
                  <div>
                    <div className="font-semibold mb-1">Certification</div>
                    <p className="text-sm text-muted-foreground">{course.certification}</p>
                  </div>
                </div>
              </div>
            </AnimatedSection>

            {/* Right - Enquiry Form */}
            <AnimatedSection delay={0.2}>
              <div className="card-base sticky top-24">
                <h3 className="font-heading font-semibold text-xl mb-2">Interested in This Course?</h3>
                <p className="text-muted-foreground text-sm mb-6">
                  Fill the form below and our counselor will contact you within 24 hours.
                </p>
                <LeadForm source={`course_${slug}`} />
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Curriculum Section */}
      <section className="section-padding">
        <div className="container-custom">
          <AnimatedSection className="text-center mb-12">
            <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
              Course Curriculum
            </span>
            <h2 className="font-heading text-3xl md:text-4xl font-bold">
              What You'll Learn
            </h2>
          </AnimatedSection>

          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="space-y-4">
              {course.modules?.map((module, index) => (
                <AnimatedSection key={index} delay={index * 0.1}>
                  <AccordionItem 
                    value={`module-${index}`}
                    className="card-base border-border data-[state=open]:border-primary/30"
                  >
                    <AccordionTrigger 
                      className="hover:no-underline px-6 py-4"
                      data-testid={`module-${index}`}
                    >
                      <div className="flex items-center gap-4 text-left">
                        <span className="inline-flex items-center justify-center w-8 h-8 bg-primary/10 rounded-lg text-primary font-semibold">
                          {index + 1}
                        </span>
                        <span className="font-heading font-semibold">{module.title}</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="px-6 pb-4">
                      <div className="pl-12 space-y-2">
                        {module.topics?.map((topic, i) => (
                          <div key={i} className="flex items-center gap-2 text-muted-foreground">
                            <ChevronDown className="h-4 w-4 rotate-[-90deg]" />
                            <span>{topic}</span>
                          </div>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </AnimatedSection>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* FAQs Section */}
      <section className="section-padding bg-muted/30" data-testid="course-faqs">
        <div className="container-custom">
          <AnimatedSection className="text-center mb-12">
            <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
              FAQs
            </span>
            <h2 className="font-heading text-3xl md:text-4xl font-bold">
              Frequently Asked Questions
            </h2>
          </AnimatedSection>

          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, index) => (
                <AnimatedSection key={index} delay={index * 0.1}>
                  <AccordionItem 
                    value={`faq-${index}`}
                    className="card-base border-border"
                  >
                    <AccordionTrigger className="hover:no-underline px-6 py-4 text-left font-medium">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="px-6 pb-4 text-muted-foreground">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                </AnimatedSection>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-primary text-primary-foreground">
        <div className="container-custom text-center">
          <AnimatedSection>
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
              Ready to Start Your Journey?
            </h2>
            <p className="text-primary-foreground/80 max-w-2xl mx-auto mb-8">
              Join our next batch and transform your career in digital marketing.
              Limited seats available - enroll now!
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/contact">
                <Button 
                  size="lg"
                  className="bg-white text-primary hover:bg-white/90 rounded-full px-8 font-semibold"
                >
                  Enroll Now
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <a href="https://wa.me/919876543210" target="_blank" rel="noopener noreferrer">
                <Button 
                  size="lg"
                  variant="outline"
                  className="border-2 border-white text-white hover:bg-white/10 rounded-full px-8 font-semibold"
                >
                  Chat on WhatsApp
                </Button>
              </a>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}
