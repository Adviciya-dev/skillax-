import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  MapPin, Phone, Mail, Clock, Send, MessageCircle,
  CheckCircle, Loader2
} from 'lucide-react';
import { Button } from '../components/ui/button';
import axios from 'axios';

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

const images = {
  wayanad: "https://images.unsplash.com/photo-1619020905969-ba8d47f8c7cf?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1NDh8MHwxfHNlYXJjaHwxfHxXYXlhbmFkJTIwdGVhJTIwZ2FyZGVuJTIwc2NlbmljfGVufDB8fHx8MTc3MDQ5NDAyNnww&ixlib=rb-4.1.0&q=85",
};

const contactInfo = [
  { icon: MapPin, title: 'Visit Us', content: 'Mananthavady, Wayanad, Kerala 670645', link: 'https://maps.google.com/?q=Mananthavady,Wayanad,Kerala' },
  { icon: Mail, title: 'Email Us', content: 'contact@skillax.in', link: 'mailto:contact@skillax.in' },
  { icon: Phone, title: 'Call Us', content: '+91 98765 43210', link: 'tel:+919876543210' },
  { icon: Clock, title: 'Working Hours', content: 'Mon - Sat: 9AM - 6PM', link: null },
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
      <section className="section-padding bg-gradient-to-br from-background via-background to-primary/5">
        <div className="container-custom">
          <AnimatedSection className="text-center max-w-4xl mx-auto">
            <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
              Get in Touch
            </span>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold mb-6" data-testid="contact-title">
              Let's Start Your{' '}
              <span className="gradient-text">Digital Journey</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              Have questions about our courses? Want to schedule a visit? 
              We're here to help you take the first step towards your digital marketing career.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-12 -mt-8 relative z-10">
        <div className="container-custom">
          <div className="grid md:grid-cols-4 gap-4">
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
                    className={`card-base text-center ${info.link ? 'hover:border-primary/30 cursor-pointer' : ''}`}
                  >
                    <div className="inline-flex p-3 bg-primary/10 rounded-xl mb-3">
                      <Icon className="h-6 w-6 text-primary" />
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

      {/* Contact Form & Map */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Form */}
            <AnimatedSection>
              <div className="card-base">
                <h2 className="font-heading text-2xl font-bold mb-2">Send us a Message</h2>
                <p className="text-muted-foreground mb-6">
                  Fill out the form below and we'll get back to you within 24 hours.
                </p>

                {isSuccess ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-12"
                  >
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-brand-success/10 rounded-full mb-4">
                      <CheckCircle className="h-8 w-8 text-brand-success" />
                    </div>
                    <h3 className="font-heading font-semibold text-xl mb-2">Message Sent!</h3>
                    <p className="text-muted-foreground mb-4">
                      Thank you for reaching out. We'll get back to you soon.
                    </p>
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
                          Subject <span className="text-destructive">*</span>
                        </label>
                        <select
                          name="subject"
                          value={formData.subject}
                          onChange={handleChange}
                          data-testid="contact-subject"
                          className="w-full input-base"
                          required
                        >
                          <option value="">Select a topic</option>
                          <option value="Course Inquiry">Course Inquiry</option>
                          <option value="Admission">Admission</option>
                          <option value="Placement">Placement</option>
                          <option value="Corporate Training">Corporate Training</option>
                          <option value="Other">Other</option>
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
                        placeholder="How can we help you?"
                        data-testid="contact-message"
                        className="w-full input-base min-h-[150px] resize-none"
                        rows={5}
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
                      className="w-full bg-primary hover:bg-primary/90 text-primary-foreground rounded-full py-6 font-semibold"
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
                          Send Message
                        </>
                      )}
                    </Button>
                  </form>
                )}
              </div>
            </AnimatedSection>

            {/* Map & Info */}
            <AnimatedSection delay={0.2}>
              <div className="space-y-6">
                {/* Map */}
                <div className="card-base overflow-hidden p-0">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d62391.77455697478!2d75.95!3d11.8!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba5deeb8b0c8d5b%3A0x4c7b5e6f7a8d9c0e!2sMananthavady%2C%20Kerala%2C%20India!5e0!3m2!1sen!2sin!4v1234567890"
                    width="100%"
                    height="300"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Skillax Academy Location"
                    className="grayscale hover:grayscale-0 transition-all"
                  />
                </div>

                {/* WhatsApp CTA */}
                <div className="card-base bg-[#25D366]/10 border-[#25D366]/20">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-[#25D366] rounded-xl">
                      <MessageCircle className="h-6 w-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-heading font-semibold mb-1">Chat on WhatsApp</h3>
                      <p className="text-sm text-muted-foreground">Get instant responses to your queries</p>
                    </div>
                    <a
                      href="https://wa.me/919876543210?text=Hi!%20I'm%20interested%20in%20learning%20more%20about%20Skillax%20courses."
                      target="_blank"
                      rel="noopener noreferrer"
                      data-testid="contact-whatsapp"
                    >
                      <Button className="bg-[#25D366] hover:bg-[#25D366]/90 text-white rounded-full">
                        Chat Now
                      </Button>
                    </a>
                  </div>
                </div>

                {/* Image */}
                <div className="rounded-2xl overflow-hidden">
                  <img
                    src={images.wayanad}
                    alt="Wayanad Scenery"
                    className="w-full h-48 object-cover"
                  />
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-primary text-primary-foreground">
        <div className="container-custom text-center">
          <AnimatedSection>
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
              Visit Our Campus
            </h2>
            <p className="text-primary-foreground/80 max-w-2xl mx-auto mb-8">
              Experience our world-class facilities firsthand. Schedule a campus visit 
              and meet our expert faculty.
            </p>
            <a
              href="https://maps.google.com/?q=Mananthavady,Wayanad,Kerala"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button 
                size="lg"
                className="bg-white text-primary hover:bg-white/90 rounded-full px-8 font-semibold"
              >
                <MapPin className="mr-2 h-5 w-5" />
                Get Directions
              </Button>
            </a>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}
