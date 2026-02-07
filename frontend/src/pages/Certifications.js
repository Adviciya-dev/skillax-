import React from 'react';
import { motion } from 'framer-motion';
import { Award, CheckCircle, ExternalLink, Download } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Link } from 'react-router-dom';

const certifications = [
  {
    id: 'google',
    name: 'Google Certifications',
    logo: 'https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_92x30dp.png',
    description: 'Get certified by Google in Analytics, Ads, and Digital Marketing fundamentals.',
    certs: [
      { name: 'Google Analytics Certification', included: true },
      { name: 'Google Ads Search Certification', included: true },
      { name: 'Google Ads Display Certification', included: true },
      { name: 'Google Digital Garage', included: true },
    ],
    color: 'border-blue-500/30 bg-blue-500/5',
  },
  {
    id: 'hubspot',
    name: 'HubSpot Certifications',
    logo: 'https://www.hubspot.com/hubfs/HubSpot_Logos/HubSpot-Inversed-Favicon.png',
    description: 'Master inbound marketing and content strategy with HubSpot certifications.',
    certs: [
      { name: 'Inbound Marketing Certification', included: true },
      { name: 'Content Marketing Certification', included: true },
      { name: 'Email Marketing Certification', included: true },
      { name: 'Social Media Marketing', included: true },
    ],
    color: 'border-orange-500/30 bg-orange-500/5',
  },
  {
    id: 'government',
    name: 'Government Certifications',
    logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/d/df/Skill_India.png/220px-Skill_India.png',
    description: 'Industry-recognized government certifications for career advancement.',
    certs: [
      { name: 'TSSR Certification', included: true },
      { name: 'Skill India Certificate', included: true },
      { name: 'NSDC Approved Training', included: true },
      { name: 'Ministry of Education Recognition', included: false },
    ],
    color: 'border-green-500/30 bg-green-500/5',
  },
  {
    id: 'industry',
    name: 'Industry Partner Certifications',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Meta_Platforms_Inc._logo.svg/512px-Meta_Platforms_Inc._logo.svg.png',
    description: 'Certifications from leading industry partners and platforms.',
    certs: [
      { name: 'Meta Blueprint Certification', included: true },
      { name: 'LinkedIn Marketing', included: true },
      { name: 'Semrush SEO Certificate', included: true },
      { name: 'Skillax Academy Certificate', included: true },
    ],
    color: 'border-purple-500/30 bg-purple-500/5',
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

export default function Certifications() {
  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="section-padding bg-gradient-to-br from-background via-background to-primary/5">
        <div className="container-custom">
          <AnimatedSection className="text-center max-w-4xl mx-auto">
            <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
              Industry Recognition
            </span>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold mb-6" data-testid="certifications-title">
              Earn{' '}
              <span className="gradient-text">Global Certifications</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              Stand out in the job market with industry-recognized certifications from Google, 
              HubSpot, Meta, and government-approved programs.
            </p>
          </AnimatedSection>

          {/* Certification Logos */}
          <AnimatedSection delay={0.2} className="mt-12">
            <div className="flex flex-wrap justify-center items-center gap-8">
              {certifications.map((cert, index) => (
                <a
                  key={cert.id}
                  href={`#${cert.id}`}
                  className="p-4 bg-card border border-border rounded-xl hover:border-primary/30 transition-colors"
                >
                  <img
                    src={cert.logo}
                    alt={cert.name}
                    className="h-10 w-auto object-contain grayscale hover:grayscale-0 transition-all"
                  />
                </a>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Certifications Detail */}
      <section className="section-padding">
        <div className="container-custom space-y-16">
          {certifications.map((cert, index) => (
            <AnimatedSection key={cert.id} delay={index * 0.1}>
              <div
                id={cert.id}
                className={`card-base p-8 md:p-12 border-2 ${cert.color}`}
                data-testid={`cert-${cert.id}`}
              >
                <div className="grid md:grid-cols-2 gap-8 items-start">
                  {/* Left */}
                  <div>
                    <img
                      src={cert.logo}
                      alt={cert.name}
                      className="h-12 w-auto object-contain mb-6"
                    />
                    <h2 className="font-heading text-2xl md:text-3xl font-bold mb-4">
                      {cert.name}
                    </h2>
                    <p className="text-muted-foreground mb-6">
                      {cert.description}
                    </p>
                    <Link to="/courses">
                      <Button className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-6">
                        View Courses
                        <ExternalLink className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </div>

                  {/* Right - Certifications List */}
                  <div className="space-y-3">
                    {cert.certs.map((c, i) => (
                      <div
                        key={i}
                        className={`flex items-center gap-3 p-4 rounded-xl border ${
                          c.included 
                            ? 'bg-brand-success/5 border-brand-success/20' 
                            : 'bg-muted/50 border-border opacity-60'
                        }`}
                      >
                        <CheckCircle className={`h-5 w-5 ${c.included ? 'text-brand-success' : 'text-muted-foreground'}`} />
                        <span className={c.included ? 'font-medium' : ''}>{c.name}</span>
                        {c.included && (
                          <span className="ml-auto text-xs bg-brand-success/20 text-brand-success px-2 py-1 rounded-full">
                            Included
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </AnimatedSection>
          ))}
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
              Certification Process
            </h2>
          </AnimatedSection>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              { step: '01', title: 'Enroll', desc: 'Choose your course and complete enrollment' },
              { step: '02', title: 'Learn', desc: 'Complete practical training with expert guidance' },
              { step: '03', title: 'Exam', desc: 'Take certification exams (we provide preparation)' },
              { step: '04', title: 'Certified', desc: 'Receive your industry-recognized certificate' },
            ].map((item, index) => (
              <AnimatedSection key={index} delay={index * 0.1}>
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-primary text-primary-foreground rounded-full font-heading font-bold text-2xl mb-4">
                    {item.step}
                  </div>
                  <h3 className="font-heading font-semibold text-xl mb-2">{item.title}</h3>
                  <p className="text-muted-foreground text-sm">{item.desc}</p>
                </div>
              </AnimatedSection>
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
                What Your Certificate Looks Like
              </h2>
              <p className="text-muted-foreground mb-6">
                Upon successful completion, you'll receive professionally designed certificates 
                that you can share on LinkedIn, add to your resume, or print for your portfolio.
              </p>
              <div className="space-y-4">
                {[
                  'Unique certificate ID for verification',
                  'Digital and print-ready formats',
                  'Shareable on LinkedIn with one click',
                  'Lifetime validity',
                ].map((feature, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-brand-success" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <div className="card-base p-8 text-center border-2 border-primary/20">
                <Award className="h-16 w-16 text-primary mx-auto mb-4" />
                <div className="text-xs text-muted-foreground uppercase tracking-wider mb-2">Certificate of Completion</div>
                <h3 className="font-heading text-2xl font-bold mb-1">Digital Marketing Foundation</h3>
                <p className="text-muted-foreground text-sm mb-4">This is to certify that</p>
                <p className="font-heading text-xl font-semibold text-primary mb-4">[Your Name Here]</p>
                <p className="text-muted-foreground text-sm mb-6">
                  has successfully completed the Digital Marketing Foundation course 
                  at Skillax Academy
                </p>
                <div className="flex justify-center gap-8 text-sm text-muted-foreground">
                  <div>
                    <div className="font-medium">Date</div>
                    <div>January 2025</div>
                  </div>
                  <div>
                    <div className="font-medium">Certificate ID</div>
                    <div>SKX-2025-XXXX</div>
                  </div>
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
              Ready to Get Certified?
            </h2>
            <p className="text-primary-foreground/80 max-w-2xl mx-auto mb-8">
              Choose your course and start your journey towards industry-recognized certifications.
            </p>
            <Link to="/courses">
              <Button 
                size="lg"
                className="bg-white text-primary hover:bg-white/90 rounded-full px-8 font-semibold"
              >
                Explore Courses
              </Button>
            </Link>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}
