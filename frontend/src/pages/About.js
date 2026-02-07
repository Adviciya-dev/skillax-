import React from 'react';
import { motion } from 'framer-motion';
import { 
  Target, Users, Award, BookOpen, Briefcase, Heart,
  MapPin, GraduationCap, TrendingUp, CheckCircle, Star
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';

const images = {
  teamMeeting: "https://images.unsplash.com/photo-1636645096936-fc8704bc8083?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA2MjJ8MHwxfHNlYXJjaHwxfHxkaWdpdGFsJTIwbWFya2V0aW5nJTIwYWdlbmN5JTIwdGVhbSUyMG1lZXRpbmd8ZW58MHx8fHwxNzcwNDk0MDM4fDA&ixlib=rb-4.1.0&q=85",
  teamMan: "https://images.unsplash.com/photo-1659355894117-0ae6f8f28d0b?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NTYxODd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBpbmRpYW4lMjBjb3Jwb3JhdGUlMjBtYW4lMjBwb3J0cmFpdHxlbnwwfHx8fDE3NzA0OTQwMDh8MA&ixlib=rb-4.1.0&q=85",
  teamWoman: "https://images.unsplash.com/photo-1705164454513-d8274719fdf5?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1OTN8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBpbmRpYW4lMjBjb3Jwb3JhdGUlMjB3b21hbiUyMHBvcnRyYWl0fGVufDB8fHx8MTc3MDQ5NDAyMHww&ixlib=rb-4.1.0&q=85",
  wayanad: "https://images.unsplash.com/photo-1619020905969-ba8d47f8c7cf?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1NDh8MHwxfHNlYXJjaHwxfHxXYXlhbmFkJTIwdGVhJTIwZ2FyZGVuJTIwc2NlbmljfGVufDB8fHx8MTc3MDQ5NDAyNnww&ixlib=rb-4.1.0&q=85",
};

const values = [
  { icon: Target, title: 'Excellence', desc: 'We strive for excellence in everything we do, from curriculum design to student support.' },
  { icon: Heart, title: 'Passion', desc: 'Our passion for digital marketing drives us to stay updated with the latest trends and technologies.' },
  { icon: Users, title: 'Community', desc: 'We build a supportive community where students and alumni help each other grow.' },
  { icon: TrendingUp, title: 'Growth', desc: 'We are committed to the continuous growth and success of our students and partners.' },
];

const team = [
  { name: 'Rajesh Kumar', role: 'Founder & Lead Trainer', specialty: 'Digital Strategy & SEO', image: images.teamMan },
  { name: 'Priya Menon', role: 'Head of Academics', specialty: 'Social Media & Content', image: images.teamWoman },
  { name: 'Arun Nair', role: 'Industry Partnerships', specialty: 'Business Development', image: images.teamMan },
];

const milestones = [
  { year: '2020', title: 'Foundation', desc: 'Skillax Academy established in Mananthavady' },
  { year: '2021', title: 'First Batch', desc: 'Graduated 50+ students with 90% placement' },
  { year: '2022', title: 'Certifications', desc: 'Became official Google & HubSpot partner' },
  { year: '2023', title: 'Expansion', desc: 'Launched AI-powered courses and online programs' },
  { year: '2024', title: 'Recognition', desc: 'Rated #1 Digital Marketing Academy in Wayanad' },
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
                industry-relevant training that prepares students for real-world challenges.
              </p>
              <div className="flex items-center gap-6">
                <div className="text-center">
                  <div className="font-heading font-bold text-4xl text-primary">500+</div>
                  <div className="text-sm text-muted-foreground">Students Trained</div>
                </div>
                <div className="w-px h-12 bg-border" />
                <div className="text-center">
                  <div className="font-heading font-bold text-4xl text-primary">95%</div>
                  <div className="text-sm text-muted-foreground">Placement Rate</div>
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
                  of skilled professionals who drive business growth through innovative digital strategies.
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
                  combining practical training with industry certifications to ensure career success.
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
                  <div className="card-base text-center h-full">
                    <div className="inline-flex p-4 bg-primary/10 rounded-2xl mb-4">
                      <Icon className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="font-heading font-semibold text-xl mb-2">{value.title}</h3>
                    <p className="text-muted-foreground text-sm">{value.desc}</p>
                  </div>
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
            <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-border hidden md:block" />

            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <AnimatedSection key={index} delay={index * 0.1}>
                  <div className={`flex items-center gap-8 ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                    <div className={`flex-1 ${index % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                      <div className="card-base inline-block">
                        <div className="text-primary font-heading font-bold text-2xl mb-2">{milestone.year}</div>
                        <h3 className="font-heading font-semibold text-lg mb-1">{milestone.title}</h3>
                        <p className="text-muted-foreground text-sm">{milestone.desc}</p>
                      </div>
                    </div>
                    <div className="hidden md:flex items-center justify-center w-4 h-4 bg-primary rounded-full z-10" />
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
              Learn from industry professionals with years of real-world experience in digital marketing.
            </p>
          </AnimatedSection>

          <div className="grid md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <AnimatedSection key={index} delay={index * 0.1}>
                <div className="card-base text-center group">
                  <div className="relative mb-6 overflow-hidden rounded-2xl">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-72 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <h3 className="font-heading font-semibold text-xl mb-1">{member.name}</h3>
                  <p className="text-primary font-medium mb-2">{member.role}</p>
                  <p className="text-sm text-muted-foreground">{member.specialty}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Location Section */}
      <section className="section-padding bg-muted/30">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <AnimatedSection>
              <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
                Our Location
              </span>
              <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
                Located in the Heart of Wayanad
              </h2>
              <p className="text-muted-foreground mb-6">
                Nestled in the beautiful hills of Wayanad, Skillax Academy provides a serene 
                learning environment away from city distractions. Our campus in Mananthavady 
                is easily accessible and equipped with modern facilities.
              </p>
              <div className="space-y-4">
                {[
                  'Modern computer lab with high-speed internet',
                  'Air-conditioned classrooms',
                  'Library with digital marketing resources',
                  'Cafeteria and recreational area',
                ].map((feature, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-brand-success" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
              <Link to="/contact" className="inline-block mt-8">
                <Button className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-8">
                  Visit Us
                </Button>
              </Link>
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <img
                src={images.wayanad}
                alt="Wayanad Scenery"
                className="rounded-3xl shadow-xl"
              />
            </AnimatedSection>
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
              <Button 
                size="lg"
                className="bg-white text-primary hover:bg-white/90 rounded-full px-8 font-semibold"
              >
                Contact Us Today
              </Button>
            </Link>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}
