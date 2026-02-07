import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';
import { 
  Menu, X, ChevronDown, Sun, Moon, GraduationCap, 
  BookOpen, Award, Cpu, Briefcase, PenTool, Users 
} from 'lucide-react';
import { Button } from '../components/ui/button';

const LOGO_URL = "https://customer-assets.emergentagent.com/job_72a42d6f-d52d-43a7-9830-99ee47bb23ab/artifacts/27yldfrm_image.png";

const courses = [
  { name: 'Professional Digital Marketing', slug: 'professional-digital-marketing', icon: BookOpen, desc: '4 Months - Complete Mastery' },
  { name: 'Advanced AI-Powered Marketing', slug: 'ai-powered-marketing', icon: Cpu, desc: '2 Months - AI Tools Expert' },
];

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'Courses', path: '/courses', hasDropdown: true },
  { name: 'Certifications', path: '/certifications' },
  { name: 'AI & Tools', path: '/ai-tools' },
  { name: 'Careers', path: '/careers' },
  { name: 'Blog', path: '/blog' },
  { name: 'Contact', path: '/contact' },
];

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showCoursesDropdown, setShowCoursesDropdown] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
    setShowCoursesDropdown(false);
  }, [location]);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-background/95 backdrop-blur-md shadow-lg border-b border-border' 
          : 'bg-transparent'
      }`}
    >
      <div className="container-custom">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group" data-testid="navbar-logo">
            <img 
              src={LOGO_URL} 
              alt="Skillax Logo" 
              className="h-12 w-auto object-contain group-hover:scale-105 transition-transform"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <div 
                key={link.name} 
                className="relative"
                onMouseEnter={() => link.hasDropdown && setShowCoursesDropdown(true)}
                onMouseLeave={() => link.hasDropdown && setShowCoursesDropdown(false)}
              >
                <Link
                  to={link.path}
                  data-testid={`nav-${link.name.toLowerCase()}`}
                  className={`flex items-center gap-1 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                    location.pathname === link.path
                      ? 'text-primary bg-primary/10'
                      : 'text-foreground/80 hover:text-primary hover:bg-primary/5'
                  }`}
                >
                  {link.name}
                  {link.hasDropdown && (
                    <ChevronDown className={`h-4 w-4 transition-transform ${showCoursesDropdown ? 'rotate-180' : ''}`} />
                  )}
                </Link>

                {/* Mega Menu Dropdown */}
                {link.hasDropdown && (
                  <AnimatePresence>
                    {showCoursesDropdown && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full left-1/2 -translate-x-1/2 pt-4 w-[600px]"
                      >
                        <div className="bg-card border border-border rounded-2xl shadow-xl p-6">
                          <div className="flex items-center gap-2 mb-4 pb-4 border-b border-border">
                            <GraduationCap className="h-5 w-5 text-primary" />
                            <span className="font-heading font-semibold">Our Courses</span>
                          </div>
                          <div className="grid grid-cols-2 gap-3">
                            {courses.map((course) => {
                              const Icon = course.icon;
                              return (
                                <Link
                                  key={course.slug}
                                  to={`/courses/${course.slug}`}
                                  data-testid={`nav-course-${course.slug}`}
                                  className="flex items-start gap-3 p-3 rounded-xl hover:bg-primary/5 transition-colors group"
                                >
                                  <div className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                                    <Icon className="h-5 w-5 text-primary" />
                                  </div>
                                  <div>
                                    <div className="font-medium text-sm">{course.name}</div>
                                    <div className="text-xs text-muted-foreground">{course.desc}</div>
                                  </div>
                                </Link>
                              );
                            })}
                          </div>
                          <Link 
                            to="/courses"
                            className="block mt-4 pt-4 border-t border-border text-center text-sm text-primary font-medium hover:underline"
                          >
                            View All Courses →
                          </Link>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                )}
              </div>
            ))}
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-3">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              data-testid="theme-toggle"
              className="p-2 rounded-full hover:bg-primary/10 transition-colors"
              aria-label="Toggle theme"
            >
              {theme === 'light' ? (
                <Moon className="h-5 w-5 text-foreground/80" />
              ) : (
                <Sun className="h-5 w-5 text-foreground/80" />
              )}
            </button>

            {/* CTA Button */}
            <Link to="/contact" className="hidden sm:block">
              <Button 
                data-testid="nav-enroll-btn"
                className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-6 font-semibold"
              >
                Enroll Now
              </Button>
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              data-testid="mobile-menu-btn"
              className="lg:hidden p-2 rounded-lg hover:bg-primary/10 transition-colors"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden overflow-hidden"
            >
              <div className="py-4 space-y-2 border-t border-border">
                {navLinks.map((link) => (
                  <div key={link.name}>
                    <Link
                      to={link.path}
                      data-testid={`mobile-nav-${link.name.toLowerCase()}`}
                      className={`block px-4 py-3 rounded-lg font-medium transition-colors ${
                        location.pathname === link.path
                          ? 'text-primary bg-primary/10'
                          : 'text-foreground/80 hover:text-primary hover:bg-primary/5'
                      }`}
                    >
                      {link.name}
                    </Link>
                    {link.hasDropdown && (
                      <div className="pl-4 mt-2 space-y-1">
                        {courses.map((course) => (
                          <Link
                            key={course.slug}
                            to={`/courses/${course.slug}`}
                            className="block px-4 py-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                          >
                            {course.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
                <div className="pt-4 px-4">
                  <Link to="/contact">
                    <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground rounded-full font-semibold">
                      Enroll Now
                    </Button>
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
}
