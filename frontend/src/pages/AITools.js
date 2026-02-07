import React, { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { 
  Brain, Bot, Sparkles, Zap, ArrowRight, CheckCircle, 
  MessageSquare, Image, Video, Search, BarChart3,
  FileText, Code, Target, Lightbulb, TrendingUp,
  ChevronRight, Play, ExternalLink
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';

// AI Tools we teach
const aiTools = [
  {
    id: 'chatgpt',
    name: 'ChatGPT',
    company: 'OpenAI',
    icon: '🤖',
    color: 'from-green-500 to-emerald-500',
    description: 'The most powerful AI assistant for content creation, ad copy, and marketing automation.',
    uses: ['Content Writing', 'Ad Copy', 'Email Templates', 'Social Posts', 'Blog Articles', 'ChatGPT Ads (Coming!)'],
    trending: true,
  },
  {
    id: 'perplexity',
    name: 'Perplexity',
    company: 'Perplexity AI',
    icon: '🔍',
    color: 'from-blue-500 to-cyan-500',
    description: 'AI-powered search engine perfect for research and Answer Engine Optimization (AEO).',
    uses: ['Market Research', 'Competitor Analysis', 'AEO Optimization', 'Content Ideas', 'Trend Discovery'],
    trending: true,
  },
  {
    id: 'gemini',
    name: 'Gemini',
    company: 'Google',
    icon: '✨',
    color: 'from-purple-500 to-pink-500',
    description: 'Google\'s multimodal AI for advanced content and integrated Google Ads optimization.',
    uses: ['Google Ads Optimization', 'Content Strategy', 'Image Analysis', 'Competitor Research'],
    trending: true,
  },
  {
    id: 'copilot',
    name: 'Microsoft Copilot',
    company: 'Microsoft',
    icon: '💻',
    color: 'from-indigo-500 to-violet-500',
    description: 'AI assistant integrated with Microsoft 365 for professional marketing documents.',
    uses: ['Excel Analytics', 'PowerPoint Decks', 'Word Documents', 'LinkedIn Optimization'],
    trending: false,
  },
  {
    id: 'grok',
    name: 'Grok',
    company: 'X (Twitter)',
    icon: '🐦',
    color: 'from-gray-700 to-gray-900',
    description: 'X/Twitter\'s AI with real-time data access for social media marketing.',
    uses: ['Twitter Marketing', 'Trend Analysis', 'Real-time Content', 'Social Listening'],
    trending: true,
  },
  {
    id: 'claude',
    name: 'Claude',
    company: 'Anthropic',
    icon: '🧠',
    color: 'from-orange-500 to-red-500',
    description: 'Advanced AI for long-form content, analysis, and strategic planning.',
    uses: ['Long-form Content', 'Strategy Documents', 'Data Analysis', 'Research Papers'],
    trending: false,
  },
];

// Image/Video AI Tools
const creativeTools = [
  { name: 'Midjourney', icon: '🎨', desc: 'AI image generation for ads & social media' },
  { name: 'DALL-E', icon: '🖼️', desc: 'OpenAI image creation for marketing' },
  { name: 'Canva AI', icon: '✂️', desc: 'Design automation with AI' },
  { name: 'Runway', icon: '🎬', desc: 'AI video editing & generation' },
  { name: 'Pictory', icon: '📹', desc: 'Turn text to video automatically' },
  { name: 'Lumen5', icon: '🎥', desc: 'Video content from articles' },
];

// Marketing AI Categories
const marketingCategories = [
  {
    title: 'Content Creation',
    icon: FileText,
    tools: ['ChatGPT', 'Claude', 'Jasper AI', 'Copy.ai'],
    color: 'from-blue-500 to-cyan-500',
  },
  {
    title: 'SEO & AEO',
    icon: Search,
    tools: ['Perplexity', 'Gemini', 'SEMrush AI', 'Surfer SEO'],
    color: 'from-green-500 to-emerald-500',
  },
  {
    title: 'Social Media',
    icon: MessageSquare,
    tools: ['Grok', 'Buffer AI', 'Hootsuite AI', 'Lately AI'],
    color: 'from-purple-500 to-pink-500',
  },
  {
    title: 'Analytics',
    icon: BarChart3,
    tools: ['Google AI', 'HubSpot AI', 'Salesforce Einstein'],
    color: 'from-orange-500 to-red-500',
  },
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

// AI Tool Card
function AIToolCard({ tool, index }) {
  const [isExpanded, setIsExpanded] = useState(false);
  
  return (
    <AnimatedSection delay={index * 0.1}>
      <motion.div
        className="card-base h-full relative overflow-hidden cursor-pointer"
        whileHover={{ scale: 1.02, y: -5 }}
        onClick={() => setIsExpanded(!isExpanded)}
      >
        {tool.trending && (
          <div className="absolute top-4 right-4">
            <motion.span 
              className="px-3 py-1 bg-brand-amber text-white text-xs font-bold rounded-full"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              🔥 TRENDING
            </motion.span>
          </div>
        )}
        
        <div className="flex items-start gap-4 mb-4">
          <div className={`p-4 bg-gradient-to-br ${tool.color} rounded-2xl text-3xl`}>
            {tool.icon}
          </div>
          <div>
            <h3 className="font-heading font-bold text-xl">{tool.name}</h3>
            <p className="text-sm text-muted-foreground">{tool.company}</p>
          </div>
        </div>
        
        <p className="text-muted-foreground text-sm mb-4">{tool.description}</p>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {tool.uses.slice(0, isExpanded ? undefined : 3).map((use, i) => (
            <span key={i} className="px-3 py-1 bg-muted text-sm rounded-full">
              {use}
            </span>
          ))}
          {!isExpanded && tool.uses.length > 3 && (
            <span className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full">
              +{tool.uses.length - 3} more
            </span>
          )}
        </div>
        
        <div className="flex items-center text-primary text-sm font-medium">
          <span>{isExpanded ? 'Show less' : 'Learn more'}</span>
          <ChevronRight className={`h-4 w-4 ml-1 transition-transform ${isExpanded ? 'rotate-90' : ''}`} />
        </div>
      </motion.div>
    </AnimatedSection>
  );
}

export default function AITools() {
  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative pt-20 pb-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-600 via-primary to-brand-indigo">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-20 left-10 w-72 h-72 bg-white rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-20 right-10 w-96 h-96 bg-brand-amber rounded-full blur-3xl animate-pulse" />
          </div>
          {/* Floating AI icons */}
          <motion.div
            className="absolute top-32 left-20 text-white/20"
            animate={{ y: [0, -20, 0], rotate: [0, 10, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
          >
            <Bot className="h-20 w-20" />
          </motion.div>
          <motion.div
            className="absolute bottom-40 right-20 text-white/20"
            animate={{ y: [0, 20, 0], rotate: [0, -10, 0] }}
            transition={{ duration: 5, repeat: Infinity }}
          >
            <Brain className="h-24 w-24" />
          </motion.div>
        </div>

        <div className="container-custom relative z-10 text-white">
          <AnimatedSection className="text-center max-w-4xl mx-auto">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 border border-white/20 rounded-full text-sm font-medium mb-6 backdrop-blur-sm"
            >
              <Brain className="h-5 w-5 text-brand-amber" />
              <span>AI-First Curriculum</span>
            </motion.div>
            
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold mb-6" data-testid="ai-tools-title">
              Master the{' '}
              <span className="text-brand-amber">AI Tools</span>{' '}
              Dominating Marketing
            </h1>
            <p className="text-lg text-white/80 mb-8">
              Learn ChatGPT, Perplexity, Gemini, Copilot, Grok, and 15+ AI tools 
              that are revolutionizing digital marketing. Be ready for the AI future.
            </p>

            {/* Quick stats */}
            <div className="flex flex-wrap justify-center gap-6">
              {[
                { icon: Bot, label: '15+ AI Tools' },
                { icon: Sparkles, label: 'Hands-on Training' },
                { icon: TrendingUp, label: 'Future-Ready' },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + i * 0.1 }}
                  className="flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full backdrop-blur-sm"
                >
                  <item.icon className="h-5 w-5" />
                  <span className="text-sm font-medium">{item.label}</span>
                </motion.div>
              ))}
            </div>
          </AnimatedSection>
        </div>

        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 100" fill="none" className="w-full">
            <path d="M0 100V50C240 90 480 10 720 50C960 90 1200 10 1440 50V100H0Z" fill="currentColor" className="text-background"/>
          </svg>
        </div>
      </section>

      {/* Main AI Tools Grid */}
      <section className="section-padding">
        <div className="container-custom">
          <AnimatedSection className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
              Core AI Tools
            </span>
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
              The AI Tools You'll Master
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Not just ChatGPT – we teach you ALL the AI tools that matter in 2025 and beyond.
            </p>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {aiTools.map((tool, index) => (
              <AIToolCard key={tool.id} tool={tool} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Creative AI Tools */}
      <section className="section-padding bg-muted/30">
        <div className="container-custom">
          <AnimatedSection className="text-center mb-12">
            <span className="inline-block px-4 py-1.5 bg-pink-500/10 text-pink-600 rounded-full text-sm font-medium mb-4">
              Visual AI
            </span>
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
              AI for Images & Videos
            </h2>
          </AnimatedSection>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {creativeTools.map((tool, i) => (
              <AnimatedSection key={i} delay={i * 0.1}>
                <motion.div 
                  className="card-base text-center p-4"
                  whileHover={{ y: -10, scale: 1.05 }}
                >
                  <div className="text-3xl mb-2">{tool.icon}</div>
                  <h4 className="font-semibold text-sm mb-1">{tool.name}</h4>
                  <p className="text-xs text-muted-foreground">{tool.desc}</p>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Marketing AI Categories */}
      <section className="section-padding">
        <div className="container-custom">
          <AnimatedSection className="text-center mb-12">
            <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
              By Category
            </span>
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
              AI Tools for Every Marketing Need
            </h2>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {marketingCategories.map((cat, i) => {
              const Icon = cat.icon;
              return (
                <AnimatedSection key={i} delay={i * 0.1}>
                  <motion.div 
                    className="card-base h-full"
                    whileHover={{ y: -10 }}
                  >
                    <div className={`p-3 bg-gradient-to-br ${cat.color} rounded-xl inline-flex mb-4`}>
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="font-heading font-bold text-lg mb-3">{cat.title}</h3>
                    <div className="space-y-2">
                      {cat.tools.map((tool, j) => (
                        <div key={j} className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-brand-success" />
                          <span className="text-sm">{tool}</span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                </AnimatedSection>
              );
            })}
          </div>
        </div>
      </section>

      {/* SEO, AEO, GEO Section */}
      <section className="section-padding bg-gradient-to-br from-primary/5 via-background to-brand-amber/5">
        <div className="container-custom">
          <AnimatedSection className="text-center mb-12">
            <span className="inline-block px-4 py-1.5 bg-brand-amber/10 text-brand-amber rounded-full text-sm font-medium mb-4">
              🔥 The Future of Search
            </span>
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
              SEO + AEO + GEO = Complete Visibility
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We're one of the few academies teaching all three optimization strategies.
            </p>
          </AnimatedSection>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { 
                title: 'SEO', 
                full: 'Search Engine Optimization',
                desc: 'Rank on Google, Bing & traditional search engines. The foundation of digital visibility.',
                icon: Search,
                color: 'from-blue-500 to-cyan-500'
              },
              { 
                title: 'AEO', 
                full: 'Answer Engine Optimization',
                desc: 'Get recommended by ChatGPT, Perplexity & AI assistants. The present of search.',
                icon: Bot,
                color: 'from-purple-500 to-pink-500'
              },
              { 
                title: 'GEO', 
                full: 'Generative Engine Optimization',
                desc: 'Optimize for AI-generated search results & summaries. The future of discovery.',
                icon: Sparkles,
                color: 'from-orange-500 to-red-500'
              },
            ].map((item, i) => {
              const Icon = item.icon;
              return (
                <AnimatedSection key={i} delay={i * 0.15}>
                  <motion.div 
                    className="card-base text-center h-full"
                    whileHover={{ y: -10, scale: 1.02 }}
                  >
                    <div className={`inline-flex p-4 bg-gradient-to-br ${item.color} rounded-2xl mb-4`}>
                      <Icon className="h-8 w-8 text-white" />
                    </div>
                    <div className={`inline-block px-6 py-2 bg-gradient-to-r ${item.color} text-white rounded-full font-bold text-2xl mb-4`}>
                      {item.title}
                    </div>
                    <h4 className="font-semibold mb-2">{item.full}</h4>
                    <p className="text-sm text-muted-foreground">{item.desc}</p>
                  </motion.div>
                </AnimatedSection>
              );
            })}
          </div>
        </div>
      </section>

      {/* ChatGPT Ads - Hot Topic */}
      <section className="section-padding bg-gradient-to-br from-brand-amber/10 to-orange-500/10">
        <div className="container-custom">
          <AnimatedSection className="text-center">
            <motion.span 
              className="inline-block px-4 py-2 bg-brand-amber text-white text-sm font-bold rounded-full mb-6"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              🔥 NEXT BIG TREND
            </motion.span>
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              ChatGPT Ads & AI Advertising
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
              OpenAI is launching ads on ChatGPT. Google's AI Overviews are changing search. 
              Meta's AI is transforming social ads. Learn to advertise where the future is!
            </p>
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              {['ChatGPT Ads', 'Google AI Ads', 'Meta AI Ads', 'Perplexity Marketing', 'Grok for Business'].map((item, i) => (
                <motion.span 
                  key={i} 
                  className="px-4 py-2 bg-card border border-border rounded-full text-sm font-medium"
                  whileHover={{ scale: 1.05 }}
                >
                  {item}
                </motion.span>
              ))}
            </div>
            <Link to="/contact">
              <Button className="bg-brand-amber hover:bg-brand-amber/90 text-white rounded-full px-8">
                Be Among the First to Learn
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </AnimatedSection>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-gradient-to-br from-primary via-brand-indigo to-purple-600 text-white">
        <div className="container-custom text-center">
          <AnimatedSection>
            <Sparkles className="h-12 w-12 mx-auto mb-6 text-brand-amber" />
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
              Ready to Master AI Marketing?
            </h2>
            <p className="text-white/80 max-w-2xl mx-auto mb-8">
              Join our AI-first curriculum and learn the tools that will define marketing in 2025 and beyond.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/courses">
                <Button size="lg" className="bg-white text-primary hover:bg-white/90 rounded-full px-8">
                  View Courses
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/contact">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 rounded-full px-8">
                  Get Free Demo
                </Button>
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}
