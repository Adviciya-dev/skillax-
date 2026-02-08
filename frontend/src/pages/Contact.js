import React, { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { 
  MapPin, Mail, Clock, Send, MessageCircle,
  CheckCircle, Loader2, Sparkles, Building, Users,
  ArrowRight, Calendar, Gift, Phone, Globe, Star
} from 'lucide-react';
import { Button } from '../components/ui/button';
import axios from 'axios';

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

const images = {
  wayanad: "https://images.unsplash.com/photo-1619020905969-ba8d47f8c7cf?w=800&q=80",
  office: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80",
  students: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&q=80",
};

const contactInfo = [
  { 
    icon: MapPin, 
    title: 'Visit Us', 
    content: 'Mananthavady, Wayanad',
    subtext: 'Kerala 670645',
    link: 'https://maps.google.com/?q=Mananthavady,Wayanad,Kerala',
    gradient: 'from-blue-500 to-cyan-500'
  },
  { 
    icon: Mail, 
    title: 'Email Us', 
    content: 'contact@askillax.in', 
    subtext: '24hr response',
    link: 'mailto:contact@askillax.in',
    gradient: 'from-purple-500 to-pink-500'
  },
  { 
    icon: Clock, 
    title: 'Working Hours', 
    content: 'Mon - Sat',
    subtext: '9AM - 6PM', 
    link: null,
    gradient: 'from-green-500 to-emerald-500'
  },
  { 
    icon: MessageCircle, 
    title: 'WhatsApp', 
    content: 'Chat Now',
    subtext: 'Instant Reply', 
    link: 'https://wa.me/919876543210',
    gradient: 'from-[#25D366] to-[#128C7E]'
  },
];

const benefits = [
  { icon: Gift, title: 'March Batch Discount', desc: '15% OFF for early enrollment!' },
  { icon: Calendar, title: 'Flexible Batches', desc: 'Morning, evening & weekend' },
  { icon: Building, title: 'Infopark Internship', desc: 'Guaranteed real experience' },
  { icon: Users, title: 'Small Batch', desc: 'Max 15 students only' },
];

const testimonials = [
  { name: 'Rahul K.', role: 'Digital Marketer', text: 'Best decision I made! Got placed at Infopark company.' },
  { name: 'Priya M.', role: 'Freelancer', text: 'Earning 3x my previous salary now. Thank you Skillax!' },
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
    
    if (!formData.name || !formData.email || !formData.phone || !formData.subject) {
      setError('Please fill in all required fields');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      await axios.post(`${API}/contact`, {
        ...formData,
        message: formData.message || 'Contact form submission'
      });
      setIsSuccess(true);
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
    } catch (err) {
      console.error('Contact form error:', err);
      setError('Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative pt-20 pb-40 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-brand-indigo to-purple-600">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-20 left-10 w-72 h-72 bg-white rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-20 right-10 w-96 h-96 bg-brand-amber rounded-full blur-3xl animate-pulse animation-delay-1000" />
          </div>
          {/* Grid Pattern */}
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjA1KSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-50" />
        </div>

        <div className="container-custom relative z-10 text-white">
          <AnimatedSection className="text-center max-w-3xl mx-auto">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring' }}
              className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 border border-white/20 rounded-full text-sm font-medium mb-6 backdrop-blur-sm"
            >
              <Sparkles className="h-5 w-5 text-brand-amber" />
              <span>March 2026 Batch - Limited Seats!</span>
            </motion.div>
            
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold mb-6" data-testid="contact-title">
              Your Digital Marketing{' '}
              <span className="text-brand-amber">Journey Starts Here</span>
            </h1>
            <p className="text-lg text-white/80 mb-8">
              Get personalized course recommendations, scholarship info, and 
              batch details. Our counselors respond within 24 hours!
            </p>

            {/* Trust Badges */}
            <div className="flex flex-wrap justify-center gap-6">
              {[
                { icon: Star, text: '4.9 Rating' },
                { icon: Users, text: '100+ Alumni' },
                { icon: Globe, text: '30+ Certifications' },
              ].map((badge, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + i * 0.1 }}
                  className="flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full backdrop-blur-sm"
                >
                  <badge.icon className="h-4 w-4" />
                  <span className="text-sm">{badge.text}</span>
                </motion.div>
              ))}
            </div>
          </AnimatedSection>
        </div>

        {/* Wave Divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" className="w-full">
            <path d="M0 120V60C240 100 480 20 720 60C960 100 1200 20 1440 60V120H0Z" fill="currentColor" className="text-background"/>
          </svg>
        </div>
      </section>

      {/* Contact Cards */}
      <section className="-mt-20 relative z-20 pb-12">
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
                    className={`card-base text-center hover-lift group ${info.link ? 'cursor-pointer' : ''}`}
                  >
                    <div className={`inline-flex p-3 bg-gradient-to-br ${info.gradient} rounded-xl mb-3 text-white group-hover:scale-110 transition-transform`}>
                      <Icon className="h-6 w-6" />
                    </div>
                    <h3 className="font-heading font-semibold mb-0.5">{info.title}</h3>
                    <p className="text-sm font-medium">{info.content}</p>
                    <p className="text-xs text-muted-foreground">{info.subtext}</p>
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
              <div className="card-base border-2 border-primary/20 bg-gradient-to-br from-primary/5 via-transparent to-brand-amber/5">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 bg-gradient-to-br from-primary to-brand-indigo rounded-xl">
                    <Send className="h-6 w-6 text-white" />
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
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', delay: 0.2 }}
                      className="inline-flex items-center justify-center w-20 h-20 bg-brand-success/10 rounded-full mb-4"
                    >
                      <CheckCircle className="h-10 w-10 text-brand-success" />
                    </motion.div>
                    <h3 className="font-heading font-bold text-2xl mb-2">Thank You!</h3>
                    <p className="text-muted-foreground mb-6">
                      Your details have been received. Our counselor will contact you shortly.
                    </p>
                    <div className="p-4 bg-primary/5 rounded-xl border border-primary/20 text-left mb-6">
                      <p className="text-sm font-medium mb-2">What happens next?</p>
                      <ul className="text-sm text-muted-foreground space-y-2">
                        <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-brand-success" /> Counselor callback within 24 hours</li>
                        <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-brand-success" /> Personalized course recommendation</li>
                        <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-brand-success" /> Fee details & scholarship options</li>
                        <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-brand-success" /> March 2026 batch enrollment</li>
                      </ul>
                    </div>
                    <Button variant="outline" onClick={() => setIsSuccess(false)} className="rounded-full">
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
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                          <option value="">Select course</option>
                          <option value="Professional Digital Marketing (4 Months)">Professional Digital Marketing (4 Months)</option>
                          <option value="Advanced AI Marketing (2 Months)">Advanced AI Marketing (2 Months)</option>
                          <option value="Free Career Counseling">Free Career Counseling</option>
                          <option value="Corporate Training">Corporate Training</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1.5">Message (Optional)</label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Any specific questions or requirements..."
                        data-testid="contact-message"
                        className="w-full input-base min-h-[100px] resize-none"
                        rows={3}
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
                      className="w-full bg-gradient-to-r from-primary to-brand-indigo hover:opacity-90 text-white rounded-full py-6 font-semibold text-lg"
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
                  </form>
                )}
              </div>
            </AnimatedSection>

            {/* Right Side */}
            <div className="space-y-6">
              {/* Benefits */}
              <AnimatedSection delay={0.1}>
                <div className="card-base">
                  <h3 className="font-heading font-bold text-lg mb-4">Why Join March 2026 Batch?</h3>
                  <div className="grid grid-cols-2 gap-4">
                    {benefits.map((benefit, i) => {
                      const Icon = benefit.icon;
                      return (
                        <motion.div 
                          key={i} 
                          className="flex items-start gap-3 p-3 bg-muted/50 rounded-xl"
                          whileHover={{ scale: 1.02 }}
                        >
                          <div className="p-2 bg-primary/10 rounded-lg shrink-0">
                            <Icon className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <h4 className="font-semibold text-sm">{benefit.title}</h4>
                            <p className="text-xs text-muted-foreground">{benefit.desc}</p>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>
              </AnimatedSection>

              {/* WhatsApp CTA */}
              <AnimatedSection delay={0.2}>
                <motion.div 
                  className="card-base bg-gradient-to-br from-[#25D366]/10 to-[#128C7E]/10 border-[#25D366]/30"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className="p-3 bg-[#25D366] rounded-xl shrink-0">
                      <MessageCircle className="h-8 w-8 text-white" />
                    </div>
                    <div>
                      <h3 className="font-heading font-bold text-lg">Prefer WhatsApp?</h3>
                      <p className="text-sm text-muted-foreground">Get instant replies to your queries</p>
                    </div>
                  </div>
                  <a
                    href="https://wa.me/919876543210?text=Hi!%20I'm%20interested%20in%20digital%20marketing%20course%20at%20Skillax.%20March%202025%20batch."
                    target="_blank"
                    rel="noopener noreferrer"
                    data-testid="contact-whatsapp"
                    className="block"
                  >
                    <Button className="w-full bg-[#25D366] hover:bg-[#128C7E] text-white rounded-full py-5">
                      Chat Now on WhatsApp
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </a>
                </motion.div>
              </AnimatedSection>

              {/* Testimonials */}
              <AnimatedSection delay={0.3}>
                <div className="card-base">
                  <h3 className="font-heading font-bold text-lg mb-4">What Students Say</h3>
                  <div className="space-y-4">
                    {testimonials.map((t, i) => (
                      <motion.div 
                        key={i} 
                        className="p-4 bg-muted/50 rounded-xl"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                      >
                        <div className="flex gap-1 mb-2">
                          {[...Array(5)].map((_, j) => (
                            <Star key={j} className="h-4 w-4 fill-brand-amber text-brand-amber" />
                          ))}
                        </div>
                        <p className="text-sm text-muted-foreground italic mb-2">"{t.text}"</p>
                        <div className="text-sm font-semibold">{t.name}</div>
                        <div className="text-xs text-muted-foreground">{t.role}</div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </AnimatedSection>

              {/* Map */}
              <AnimatedSection delay={0.4}>
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
                  <div className="p-4 flex items-center gap-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <MapPin className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <div className="font-semibold text-sm">Skillax Academy</div>
                      <div className="text-xs text-muted-foreground">Mananthavady, Wayanad, Kerala</div>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section-padding bg-muted/30">
        <div className="container-custom">
          <AnimatedSection className="text-center mb-12">
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
              Frequently Asked Questions
            </h2>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 gap-4 max-w-4xl mx-auto">
            {[
              { q: 'Do I need prior experience?', a: 'No! Our courses are designed for complete beginners. We teach everything from scratch.' },
              { q: 'Is online learning available?', a: 'Yes! We offer hybrid mode with live online classes for those who cannot attend in person.' },
              { q: 'What about job placement?', a: 'We provide 100% placement assistance with guaranteed internship at Infopark IT companies.' },
              { q: 'Are EMI options available?', a: 'Yes! Easy EMI starting from ₹2,999/month with no-cost EMI options available.' },
              { q: 'When is the next batch?', a: 'March 2025 batch is now enrolling. Morning, evening & weekend options available.' },
              { q: 'What AI tools will I learn?', a: 'ChatGPT, Perplexity, Gemini, Copilot, Grok, Midjourney & many more!' },
            ].map((faq, i) => (
              <AnimatedSection key={i} delay={i * 0.05}>
                <motion.div 
                  className="card-base hover:border-primary/30 transition-colors"
                  whileHover={{ scale: 1.02 }}
                >
                  <h4 className="font-semibold mb-2">{faq.q}</h4>
                  <p className="text-sm text-muted-foreground">{faq.a}</p>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
