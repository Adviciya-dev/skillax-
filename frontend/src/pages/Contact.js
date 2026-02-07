import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  MapPin, Phone, Mail, Clock, Send, MessageCircle,
  CheckCircle, Loader2, Sparkles, Building, Users,
  ArrowRight, Calendar, Gift
} from 'lucide-react';
import { Button } from '../components/ui/button';
import axios from 'axios';

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

const images = {
  wayanad: "https://images.unsplash.com/photo-1619020905969-ba8d47f8c7cf?w=800&q=80",
  office: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80",
};

const contactInfo = [
  { 
    icon: MapPin, 
    title: 'Visit Us', 
    content: 'Mananthavady, Wayanad, Kerala 670645',
    link: 'https://maps.google.com/?q=Mananthavady,Wayanad,Kerala',
    color: 'bg-blue-500/10 text-blue-600'
  },
  { 
    icon: Mail, 
    title: 'Email Us', 
    content: 'contact@skillax.in', 
    link: 'mailto:contact@skillax.in',
    color: 'bg-purple-500/10 text-purple-600'
  },
  { 
    icon: Clock, 
    title: 'Working Hours', 
    content: 'Mon - Sat: 9AM - 6PM', 
    link: null,
    color: 'bg-green-500/10 text-green-600'
  },
  { 
    icon: MessageCircle, 
    title: 'WhatsApp', 
    content: 'Quick Response', 
    link: 'https://wa.me/919876543210',
    color: 'bg-[#25D366]/10 text-[#25D366]'
  },
];

const benefits = [
  { icon: Gift, title: 'Early Bird Discount', desc: 'Save up to 20% on January batch' },
  { icon: Calendar, title: 'Flexible Batches', desc: 'Morning, evening & weekend options' },
  { icon: Building, title: 'Infopark Internship', desc: 'Guaranteed real-world experience' },
  { icon: Users, title: 'Small Batch Size', desc: 'Maximum 15 students per batch' },
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

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.phone || !formData.subject || !formData.message) {
      setError('Please fill in all fields');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      await axios.post(`${API}/contact`, formData);
      setIsSuccess(true);
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
    } catch (err) {
      console.error('Contact form error:', err);
      setError('Something went wrong. Please try again or contact us directly.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative pt-20 pb-32 overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary to-brand-indigo">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-20 left-10 w-72 h-72 bg-white rounded-full blur-3xl" />
            <div className="absolute bottom-20 right-10 w-96 h-96 bg-white rounded-full blur-3xl" />
          </div>
        </div>

        <div className="container-custom relative z-10 text-white">
          <AnimatedSection className="text-center max-w-3xl mx-auto">
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 border border-white/20 rounded-full text-sm font-medium mb-6">
              <Sparkles className="h-4 w-4" />
              Start Your Journey Today
            </span>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold mb-6" data-testid="contact-title">
              Let's Build Your{' '}
              <span className="text-brand-amber">Digital Future</span>
            </h1>
            <p className="text-lg text-white/80 mb-8">
              Get personalized career guidance, course recommendations, and scholarship information. 
              Our counselors respond within 24 hours!
            </p>

            {/* Quick Stats */}
            <div className="flex flex-wrap justify-center gap-8 mb-8">
              {[
                { value: '24hrs', label: 'Response Time' },
                { value: '15+', label: 'Certifications' },
                { value: '100%', label: 'Career Support' },
              ].map((stat, i) => (
                <div key={i} className="text-center">
                  <div className="font-heading font-bold text-3xl">{stat.value}</div>
                  <div className="text-sm text-white/70">{stat.label}</div>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>

        {/* Wave Divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 100" fill="none" className="w-full">
            <path d="M0 100V50C240 90 480 10 720 50C960 90 1200 10 1440 50V100H0Z" fill="currentColor" className="text-background"/>
          </svg>
        </div>
      </section>

      {/* Contact Cards */}
      <section className="-mt-16 relative z-20 pb-12">
        <div className="container-custom">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {contactInfo.map((info, index) => {
              const Icon = info.icon;
              const Wrapper = info.link ? 'a' : 'div';
              return (
                <AnimatedSection key={index} delay={index * 0.1}>
                  <Wrapper
                    href={info.link || undefined}
                    target={info.link?.startsWith('http') ? '_blank' : undefined}
                    rel={info.link?.startsWith('http') ? 'noopener noreferrer' : undefined}
                    data-testid={`contact-${info.title.toLowerCase().replace(' ', '-')}`}
                    className={`card-base text-center hover-lift ${info.link ? 'cursor-pointer' : ''}`}
                  >
                    <div className={`inline-flex p-3 ${info.color} rounded-xl mb-3`}>
                      <Icon className="h-6 w-6" />
                    </div>
                    <h3 className="font-heading font-semibold mb-1">{info.title}</h3>
                    <p className="text-sm text-muted-foreground">{info.content}</p>
                  </Wrapper>
                </AnimatedSection>
              );
            })}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Form Section */}
            <AnimatedSection>
              <div className="card-base border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-transparent">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-primary/10 rounded-xl">
                    <Send className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h2 className="font-heading text-2xl font-bold">Get Free Consultation</h2>
                    <p className="text-sm text-muted-foreground">We'll contact you within 24 hours</p>
                  </div>
                </div>

                {isSuccess ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-12"
                  >
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-brand-success/10 rounded-full mb-4">
                      <CheckCircle className="h-10 w-10 text-brand-success" />
                    </div>
                    <h3 className="font-heading font-bold text-2xl mb-2">Thank You!</h3>
                    <p className="text-muted-foreground mb-6">
                      Your message has been received. Our counselor will contact you shortly with personalized course recommendations.
                    </p>
                    <div className="p-4 bg-primary/5 rounded-xl border border-primary/20 mb-6">
                      <p className="text-sm">
                        <strong>What's Next?</strong><br />
                        You'll receive a call/email within 24 hours with:
                        <br />• Personalized course recommendation
                        <br />• Fee structure & scholarships
                        <br />• Batch timings
                      </p>
                    </div>
                    <Button variant="outline" onClick={() => setIsSuccess(false)}>
                      Send Another Message
                    </Button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4" data-testid="contact-form">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-1.5">
                          Full Name <span className="text-destructive">*</span>
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="Your name"
                          data-testid="contact-name"
                          className="w-full input-base"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1.5">
                          Email <span className="text-destructive">*</span>
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="your@email.com"
                          data-testid="contact-email"
                          className="w-full input-base"
                          required
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-1.5">
                          Phone <span className="text-destructive">*</span>
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="+91 XXXXX XXXXX"
                          data-testid="contact-phone"
                          className="w-full input-base"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1.5">
                          Interested In <span className="text-destructive">*</span>
                        </label>
                        <select
                          name="subject"
                          value={formData.subject}
                          onChange={handleChange}
                          data-testid="contact-subject"
                          className="w-full input-base"
                          required
                        >
                          <option value="">Select your interest</option>
                          <option value="Professional Digital Marketing">Professional Digital Marketing (4 Months)</option>
                          <option value="Advanced AI Marketing">Advanced AI Marketing (2 Months)</option>
                          <option value="Career Counseling">Free Career Counseling</option>
                          <option value="Corporate Training">Corporate Training</option>
                          <option value="Other">Other Inquiry</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1.5">
                        Message <span className="text-destructive">*</span>
                      </label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Tell us about your goals, current situation, or any questions..."
                        data-testid="contact-message"
                        className="w-full input-base min-h-[120px] resize-none"
                        rows={4}
                        required
                      />
                    </div>

                    {error && (
                      <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-sm text-destructive"
                      >
                        {error}
                      </motion.p>
                    )}

                    <Button
                      type="submit"
                      data-testid="contact-submit"
                      className="w-full bg-primary hover:bg-primary/90 text-primary-foreground rounded-full py-6 font-semibold text-lg"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="h-5 w-5 animate-spin mr-2" />
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send className="h-5 w-5 mr-2" />
                          Get Free Consultation
                        </>
                      )}
                    </Button>

                    <p className="text-xs text-center text-muted-foreground">
                      By submitting, you agree to receive communications from Skillax Academy.
                    </p>
                  </form>
                )}
              </div>
            </AnimatedSection>

            {/* Right Side Info */}
            <div className="space-y-6">
              {/* Benefits */}
              <AnimatedSection delay={0.1}>
                <div className="card-base">
                  <h3 className="font-heading font-bold text-lg mb-4">Why Join Skillax?</h3>
                  <div className="space-y-4">
                    {benefits.map((benefit, i) => {
                      const Icon = benefit.icon;
                      return (
                        <div key={i} className="flex items-start gap-3">
                          <div className="p-2 bg-primary/10 rounded-lg shrink-0">
                            <Icon className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <h4 className="font-semibold text-sm">{benefit.title}</h4>
                            <p className="text-xs text-muted-foreground">{benefit.desc}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </AnimatedSection>

              {/* WhatsApp CTA */}
              <AnimatedSection delay={0.2}>
                <div className="card-base bg-[#25D366]/5 border-[#25D366]/20">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-[#25D366] rounded-xl shrink-0">
                      <MessageCircle className="h-8 w-8 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-heading font-bold mb-1">Prefer WhatsApp?</h3>
                      <p className="text-sm text-muted-foreground">Get instant replies to your queries</p>
                    </div>
                  </div>
                  <a
                    href="https://wa.me/919876543210?text=Hi!%20I'm%20interested%20in%20digital%20marketing%20course%20at%20Skillax."
                    target="_blank"
                    rel="noopener noreferrer"
                    data-testid="contact-whatsapp"
                    className="block mt-4"
                  >
                    <Button className="w-full bg-[#25D366] hover:bg-[#25D366]/90 text-white rounded-full">
                      Chat on WhatsApp
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </a>
                </div>
              </AnimatedSection>

              {/* Map */}
              <AnimatedSection delay={0.3}>
                <div className="card-base overflow-hidden p-0">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d62391.77455697478!2d75.95!3d11.8!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba5deeb8b0c8d5b%3A0x4c7b5e6f7a8d9c0e!2sMananthavady%2C%20Kerala%2C%20India!5e0!3m2!1sen!2sin!4v1234567890"
                    width="100%"
                    height="200"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Skillax Academy Location"
                    className="grayscale hover:grayscale-0 transition-all"
                  />
                  <div className="p-4">
                    <div className="flex items-center gap-3">
                      <MapPin className="h-5 w-5 text-primary" />
                      <div>
                        <div className="font-semibold text-sm">Skillax Academy</div>
                        <div className="text-xs text-muted-foreground">Mananthavady, Wayanad, Kerala</div>
                      </div>
                    </div>
                  </div>
                </div>
              </AnimatedSection>

              {/* Scenic Image */}
              <AnimatedSection delay={0.4}>
                <div className="rounded-2xl overflow-hidden relative">
                  <img
                    src={images.wayanad}
                    alt="Wayanad Scenery"
                    className="w-full h-40 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-4 left-4 text-white">
                    <div className="font-heading font-bold">Study in Nature's Lap</div>
                    <div className="text-sm opacity-80">Wayanad, Kerala</div>
                  </div>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ or Trust Section */}
      <section className="section-padding bg-muted/30">
        <div className="container-custom">
          <AnimatedSection className="text-center mb-12">
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
              Frequently Asked Questions
            </h2>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 gap-4 max-w-4xl mx-auto">
            {[
              { q: 'Do I need prior experience?', a: 'No! Our courses are designed for complete beginners. We teach from the basics.' },
              { q: 'Is online learning available?', a: 'Yes, we offer hybrid mode with live online classes for those who cannot attend in person.' },
              { q: 'What about job placement?', a: "We provide 100% placement assistance with guaranteed internship at Infopark IT companies." },
              { q: 'Are EMI options available?', a: 'Yes! We offer easy EMI starting from ₹2,999/month with no-cost EMI options available.' },
            ].map((faq, i) => (
              <AnimatedSection key={i} delay={i * 0.1}>
                <div className="card-base">
                  <h4 className="font-semibold mb-2">{faq.q}</h4>
                  <p className="text-sm text-muted-foreground">{faq.a}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
