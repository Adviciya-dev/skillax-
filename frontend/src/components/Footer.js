import React from 'react';
import { Link } from 'react-router-dom';
import { 
  MapPin, Phone, Mail, Facebook, Instagram, Linkedin, Twitter, 
  GraduationCap, Send, ArrowUpRight, Settings
} from 'lucide-react';
import { Button } from '../components/ui/button';

const LOGO_URL = "https://customer-assets.emergentagent.com/job_72a42d6f-d52d-43a7-9830-99ee47bb23ab/artifacts/27yldfrm_image.png";

const quickLinks = [
  { name: 'About Us', path: '/about' },
  { name: 'All Courses', path: '/courses' },
  { name: 'Certifications', path: '/certifications' },
  { name: 'AI & Tools', path: '/ai-tools' },
  { name: 'Careers', path: '/careers' },
  { name: 'Blog', path: '/blog' },
  { name: 'Contact', path: '/contact' },
];

const courses = [
  { name: 'Professional Digital Marketing', path: '/courses/professional-digital-marketing' },
  { name: 'Advanced AI-Powered Marketing', path: '/courses/ai-powered-marketing' },
];

const certifications = [
  { name: 'Google Certifications', path: '/certifications#google' },
  { name: 'HubSpot Certifications', path: '/certifications#hubspot' },
  { name: 'Government (TSSR)', path: '/certifications#government' },
  { name: 'Industry Partners', path: '/certifications#industry' },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-card border-t border-border">
      {/* Main Footer */}
      <div className="container-custom section-padding">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-3 mb-6">
              <img src={LOGO_URL} alt="Skillax Logo" className="h-12 w-auto" />
            </Link>
            <p className="text-muted-foreground mb-6 max-w-sm">
              Empowering the next generation of digital marketers in Wayanad, Kerala. 
              Transform your career with 30+ AI tools training and industry certifications.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3">
              <a 
                href="https://maps.google.com/?q=Mananthavady,Wayanad,Kerala" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-start gap-3 text-muted-foreground hover:text-primary transition-colors"
                data-testid="footer-location"
              >
                <MapPin className="h-5 w-5 mt-0.5 shrink-0" />
                <span>Mananthavady, Wayanad, Kerala 670645</span>
              </a>
              <a 
                href="mailto:contact@skillax.in"
                className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors"
                data-testid="footer-email"
              >
                <Mail className="h-5 w-5 shrink-0" />
                <span>contact@skillax.in</span>
              </a>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-3 mt-6">
              <a 
                href="#" 
                className="p-2 bg-primary/10 rounded-full hover:bg-primary/20 transition-colors"
                aria-label="Facebook"
                data-testid="footer-facebook"
              >
                <Facebook className="h-5 w-5 text-primary" />
              </a>
              <a 
                href="#" 
                className="p-2 bg-primary/10 rounded-full hover:bg-primary/20 transition-colors"
                aria-label="Instagram"
                data-testid="footer-instagram"
              >
                <Instagram className="h-5 w-5 text-primary" />
              </a>
              <a 
                href="#" 
                className="p-2 bg-primary/10 rounded-full hover:bg-primary/20 transition-colors"
                aria-label="LinkedIn"
                data-testid="footer-linkedin"
              >
                <Linkedin className="h-5 w-5 text-primary" />
              </a>
              <a 
                href="#" 
                className="p-2 bg-primary/10 rounded-full hover:bg-primary/20 transition-colors"
                aria-label="Twitter"
                data-testid="footer-twitter"
              >
                <Twitter className="h-5 w-5 text-primary" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading font-semibold text-lg mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link 
                    to={link.path}
                    className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-1 group"
                  >
                    <ArrowUpRight className="h-4 w-4 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Courses */}
          <div>
            <h4 className="font-heading font-semibold text-lg mb-6">Popular Courses</h4>
            <ul className="space-y-3">
              {courses.map((course) => (
                <li key={course.name}>
                  <Link 
                    to={course.path}
                    className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-1 group"
                  >
                    <ArrowUpRight className="h-4 w-4 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                    {course.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Certifications */}
          <div>
            <h4 className="font-heading font-semibold text-lg mb-6">Certifications</h4>
            <ul className="space-y-3">
              {certifications.map((cert) => (
                <li key={cert.name}>
                  <Link 
                    to={cert.path}
                    className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-1 group"
                  >
                    <ArrowUpRight className="h-4 w-4 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                    {cert.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-border">
        <div className="container-custom py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground">
              © {currentYear} Skillax Digital Marketing Academy. All rights reserved.
            </p>
            <div className="flex items-center gap-6 text-sm">
              <Link to="/privacy" className="text-muted-foreground hover:text-primary transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-muted-foreground hover:text-primary transition-colors">
                Terms of Service
              </Link>
              {/* Hidden Admin Link as Settings Icon */}
              <Link 
                to="/admin" 
                className="p-1.5 text-muted-foreground/30 hover:text-muted-foreground/60 transition-colors rounded"
                data-testid="footer-admin-link"
                title="Admin"
              >
                <Settings className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
