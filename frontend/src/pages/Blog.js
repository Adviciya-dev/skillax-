import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, Clock, ArrowRight, Tag, User, Loader2 } from 'lucide-react';
import { Button } from '../components/ui/button';
import axios from 'axios';

const API = "https://ltz6k4u2e5.execute-api.ap-south-1.amazonaws.com/api";

const categories = ['All', 'Industry Insights', 'Career Guide', 'Marketing Strategy', 'Tutorial'];

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

export default function Blog() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get(`${API}/blogs`);
        setBlogs(response.data);
      } catch (error) {
        console.error('Error fetching blogs:', error);
        // Fallback data
        setBlogs([
          {
            id: '1',
            title: '10 Digital Marketing Trends to Watch in 2026',
            slug: 'digital-marketing-trends-2026',
            excerpt: 'Stay ahead of the curve with these emerging digital marketing trends that will shape the industry in 2026.',
            category: 'Industry Insights',
            author: 'Skillax Team',
            featured_image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800',
            created_at: '2026-01-15T10:00:00Z',
            tags: ['trends', '2026', 'digital marketing'],
          },
          {
            id: '2',
            title: 'How to Start a Career in Digital Marketing in Kerala',
            slug: 'career-digital-marketing-kerala',
            excerpt: 'A complete guide to launching your digital marketing career in Kerala with tips from industry experts.',
            category: 'Career Guide',
            author: 'Skillax Team',
            featured_image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800',
            created_at: '2026-01-10T10:00:00Z',
            tags: ['career', 'kerala', 'jobs'],
          },
          {
            id: '3',
            title: 'SEO vs Social Media Marketing: Which is Right for Your Business?',
            slug: 'seo-vs-social-media-marketing',
            excerpt: 'Understanding the differences between SEO and social media marketing to make informed decisions.',
            category: 'Marketing Strategy',
            author: 'Skillax Team',
            featured_image: 'https://images.unsplash.com/photo-1611926653458-09294b3142bf?w=800',
            created_at: '2026-01-05T10:00:00Z',
            tags: ['seo', 'social media', 'strategy'],
          },
          {
            id: '4',
            title: 'Complete Guide to Google Ads for Beginners',
            slug: 'google-ads-beginners-guide',
            excerpt: 'Learn how to set up and run your first Google Ads campaign with this step-by-step tutorial.',
            category: 'Tutorial',
            author: 'Skillax Team',
            featured_image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800',
            created_at: '2026-01-01T10:00:00Z',
            tags: ['google ads', 'tutorial', 'ppc'],
          },
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  const filteredBlogs = selectedCategory === 'All' 
    ? blogs 
    : blogs.filter(blog => blog.category === selectedCategory);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="section-padding bg-gradient-to-br from-background via-background to-primary/5">
        <div className="container-custom">
          <AnimatedSection className="text-center max-w-4xl mx-auto">
            <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
              Insights & Resources
            </span>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold mb-6" data-testid="blog-title">
              Digital Marketing{' '}
              <span className="gradient-text">Blog & Insights</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              Expert articles, guides, and tutorials to help you master digital marketing 
              and stay updated with the latest industry trends.
            </p>
          </AnimatedSection>

          {/* Category Filter */}
          <AnimatedSection delay={0.2} className="mt-12">
            <div className="flex flex-wrap justify-center gap-3">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  data-testid={`blog-filter-${category.toLowerCase().replace(' ', '-')}`}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    selectedCategory === category
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted hover:bg-muted/80'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="section-padding">
        <div className="container-custom">
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : filteredBlogs.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-muted-foreground">No blog posts found in this category.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredBlogs.map((blog, index) => (
                <AnimatedSection key={blog.id} delay={index * 0.1}>
                  <Link
                    to={`/blog/${blog.slug}`}
                    data-testid={`blog-card-${blog.slug}`}
                    className="group block card-base overflow-hidden hover-lift"
                  >
                    {/* Image */}
                    <div className="relative h-48 -mx-6 -mt-6 mb-4 overflow-hidden">
                      <img
                        src={blog.featured_image || 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800'}
                        alt={blog.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                      <span className="absolute top-4 left-4 px-3 py-1 bg-primary/90 text-primary-foreground text-xs font-medium rounded-full">
                        {blog.category}
                      </span>
                    </div>

                    {/* Content */}
                    <h3 className="font-heading font-semibold text-lg mb-2 group-hover:text-primary transition-colors line-clamp-2">
                      {blog.title}
                    </h3>
                    <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                      {blog.excerpt}
                    </p>

                    {/* Meta */}
                    <div className="flex items-center justify-between pt-4 border-t border-border">
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Calendar className="h-3 w-3" />
                        <span>{formatDate(blog.created_at)}</span>
                      </div>
                      <span className="flex items-center gap-1 text-primary font-medium text-sm group-hover:gap-2 transition-all">
                        Read More <ArrowRight className="h-4 w-4" />
                      </span>
                    </div>
                  </Link>
                </AnimatedSection>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="section-padding bg-muted/30">
        <div className="container-custom">
          <AnimatedSection className="max-w-2xl mx-auto text-center">
            <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
              Stay Updated
            </span>
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
              Subscribe to Our Newsletter
            </h2>
            <p className="text-muted-foreground mb-8">
              Get the latest digital marketing tips, trends, and course updates delivered 
              straight to your inbox.
            </p>
            <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 input-base"
              />
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-8">
                Subscribe
              </Button>
            </form>
          </AnimatedSection>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-primary text-primary-foreground">
        <div className="container-custom text-center">
          <AnimatedSection>
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
              Want to Learn More?
            </h2>
            <p className="text-primary-foreground/80 max-w-2xl mx-auto mb-8">
              Our comprehensive courses cover everything from these blog topics in depth.
              Join Skillax and master digital marketing.
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
