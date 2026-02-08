import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, Sparkles, Brain, Rocket, Target, Zap, Copy, Check,
  FileText, MessageSquare, Hash, TrendingUp, Wand2,
  Loader2, RefreshCw, Download, Share2, Lightbulb,
  PenTool, BarChart3, Globe, Instagram, Facebook,
  Youtube, Linkedin, ArrowRight, Star, Crown
} from 'lucide-react';
import { Button } from './ui/button';

// AI Lab Tools
const labTools = [
  { 
    id: 'ad-copy',
    title: 'AI Ad Copy Generator',
    desc: 'Generate Google Ads & Meta Ads copies',
    icon: Target,
    gradient: 'from-blue-500 to-indigo-600',
    placeholder: 'Enter your product/service name and brief description...',
    example: 'Digital marketing course for beginners with AI tools training'
  },
  { 
    id: 'blog-outline',
    title: 'AI Blog Outline Creator',
    desc: 'Create SEO-optimized blog structures',
    icon: FileText,
    gradient: 'from-green-500 to-emerald-600',
    placeholder: 'Enter your blog topic...',
    example: 'How to use ChatGPT for digital marketing in 2026'
  },
  { 
    id: 'lead-magnet',
    title: '🔥 AI Lead Magnet Generator',
    desc: 'Create irresistible lead magnets for any niche',
    icon: Lightbulb,
    gradient: 'from-amber-500 to-red-500',
    placeholder: 'Enter your business type or target audience...',
    example: 'Digital marketing agency targeting small businesses in Kerala'
  },
  { 
    id: 'social-post',
    title: 'AI Social Media Generator',
    desc: 'Create posts for all platforms',
    icon: Hash,
    gradient: 'from-pink-500 to-rose-600',
    placeholder: 'Enter what you want to promote...',
    example: 'New digital marketing course launch with 30+ certifications'
  },
  { 
    id: 'seo-keywords',
    title: 'AI SEO Keyword Analyzer',
    desc: 'Get keyword suggestions & strategy',
    icon: TrendingUp,
    gradient: 'from-purple-500 to-violet-600',
    placeholder: 'Enter your main topic or niche...',
    example: 'Digital marketing training Kerala'
  },
  { 
    id: 'competitor-analyzer',
    title: '🚀 AI Competitor Analyzer',
    desc: 'Get insights on competitor strategies',
    icon: BarChart3,
    gradient: 'from-cyan-500 to-blue-600',
    placeholder: 'Enter your competitor website or business name...',
    example: 'DigitalVidya, Simplilearn digital marketing courses'
  },
];

// Floating orb
function GlowingOrb({ className, color = 'primary' }) {
  const colors = {
    primary: 'bg-primary/20',
    purple: 'bg-purple-500/20',
    pink: 'bg-pink-500/20',
  };

  return (
    <motion.div
      className={`absolute rounded-full blur-3xl ${colors[color]} ${className}`}
      animate={{
        scale: [1, 1.2, 1],
        opacity: [0.3, 0.5, 0.3],
      }}
      transition={{
        duration: 6,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    />
  );
}

export default function AIMarketingLab({ isOpen, onClose }) {
  const [selectedTool, setSelectedTool] = useState(null);
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [copied, setCopied] = useState(false);
  const [generationCount, setGenerationCount] = useState(0);

  const generateContent = async () => {
    if (!input.trim() || !selectedTool) return;
    
    setIsGenerating(true);
    setOutput('');
    
    try {
      const prompts = {
        'ad-copy': `You are an expert digital marketing copywriter. Generate 3 compelling ad copies for Google Ads and 2 for Meta Ads (Facebook/Instagram) for the following product/service:

"${input}"

Format the output as:

🎯 GOOGLE ADS COPIES:

Ad 1:
Headline 1: [max 30 chars]
Headline 2: [max 30 chars]
Headline 3: [max 30 chars]
Description 1: [max 90 chars]
Description 2: [max 90 chars]

Ad 2:
[Same format]

Ad 3:
[Same format]

📱 META ADS COPIES:

Ad 1:
Primary Text: [engaging copy, 2-3 sentences]
Headline: [short, punchy]
Call to Action: [suggestion]

Ad 2:
[Same format]

Make them compelling, action-oriented, and highlight unique value propositions.`,

        'blog-outline': `You are an SEO expert and content strategist. Create a comprehensive, SEO-optimized blog outline for the topic:

"${input}"

Format the output as:

📝 BLOG TITLE OPTIONS:
1. [SEO-optimized title option 1]
2. [SEO-optimized title option 2]
3. [SEO-optimized title option 3]

🎯 TARGET KEYWORDS:
Primary: [main keyword]
Secondary: [3-5 related keywords]
Long-tail: [2-3 long-tail keywords]

📋 BLOG STRUCTURE:

Introduction (150-200 words)
- Hook the reader
- State the problem
- Preview what they'll learn

H2: [Section 1 Title]
- Key point 1
- Key point 2
- Key point 3

H2: [Section 2 Title]
- Key point 1
- Key point 2
- Key point 3

[Continue for 4-6 main sections]

H2: Conclusion
- Summary of key takeaways
- Call to action

💡 SEO TIPS:
- [Tip 1]
- [Tip 2]
- [Tip 3]`,

        'lead-magnet': `You are a lead generation and content marketing expert. Create 5 IRRESISTIBLE lead magnet ideas with full implementation plans for:

"${input}"

Format the output as:

🎁 LEAD MAGNET IDEAS:

━━━━━━━━━━━━━━━━━━━━━━━━━
🥇 IDEA #1: [Name of Lead Magnet]
━━━━━━━━━━━━━━━━━━━━━━━━━
Type: [eBook/Checklist/Template/Calculator/Video Course/Webinar/etc.]
Format: [PDF/Spreadsheet/Video/Interactive Tool]
Target Audience: [Who will download this]
Pain Point Addressed: [What problem does it solve]
Compelling Title: "[Catchy, benefit-driven title]"
Description: [2-3 sentence description]

📋 Content Outline:
1. [Section 1]
2. [Section 2]
3. [Section 3]
4. [Section 4]
5. [Section 5]

🎯 Landing Page Headline: "[High-converting headline]"
📧 Follow-up Email Subject: "[Engaging subject line]"
💰 Potential Upsell: [What paid product/service to offer next]

━━━━━━━━━━━━━━━━━━━━━━━━━
🥈 IDEA #2: [Name]
━━━━━━━━━━━━━━━━━━━━━━━━━
[Same detailed format]

━━━━━━━━━━━━━━━━━━━━━━━━━
🥉 IDEA #3: [Name]
━━━━━━━━━━━━━━━━━━━━━━━━━
[Same detailed format]

━━━━━━━━━━━━━━━━━━━━━━━━━
⭐ IDEA #4: [Name]
━━━━━━━━━━━━━━━━━━━━━━━━━
[Same detailed format]

━━━━━━━━━━━━━━━━━━━━━━━━━
🔥 IDEA #5: [Name] - HIGHEST CONVERSION POTENTIAL
━━━━━━━━━━━━━━━━━━━━━━━━━
[Same detailed format]

💡 PRO TIP: [Expert advice on lead magnet implementation]`,

        'social-post': `You are a social media marketing expert. Create engaging social media posts for multiple platforms about:

"${input}"

Format the output as:

📸 INSTAGRAM POST:
Caption: [Engaging caption with emojis, 150-200 words]
Hashtags: [15-20 relevant hashtags]

📘 FACEBOOK POST:
[Longer, conversational post, 100-150 words with emojis]

🐦 TWITTER/X POST:
[Concise, punchy, max 280 characters with 2-3 hashtags]

💼 LINKEDIN POST:
[Professional tone, value-driven, 150-200 words]
[Include 3-5 relevant hashtags]

🎬 YOUTUBE COMMUNITY POST:
[Engaging question or announcement, 100 words]

Make each post platform-appropriate and engaging!`,

        'seo-keywords': `You are an SEO and keyword research expert. Analyze and provide comprehensive keyword suggestions for:

"${input}"

Format the output as:

🎯 PRIMARY KEYWORDS:
1. [Keyword] - Search Volume: [Est.] - Difficulty: [Low/Medium/High]
2. [Keyword] - Search Volume: [Est.] - Difficulty: [Low/Medium/High]
3. [Keyword] - Search Volume: [Est.] - Difficulty: [Low/Medium/High]

🔗 LONG-TAIL KEYWORDS:
1. [Long-tail keyword phrase]
2. [Long-tail keyword phrase]
3. [Long-tail keyword phrase]
4. [Long-tail keyword phrase]
5. [Long-tail keyword phrase]

❓ QUESTION KEYWORDS (Great for AEO):
1. [Question format keyword]
2. [Question format keyword]
3. [Question format keyword]

📍 LOCAL SEO KEYWORDS:
1. [Location-based keyword]
2. [Location-based keyword]
3. [Location-based keyword]

📊 KEYWORD STRATEGY:
- Focus Area: [recommendation]
- Content Types: [blog, video, etc.]
- Quick Wins: [low-hanging fruit keywords]

💡 AEO (Answer Engine Optimization) TIPS:
- [Tip for ranking in AI answers]
- [Tip for featured snippets]
- [Tip for voice search]`,

        'competitor-analyzer': `You are a competitive intelligence and digital marketing strategist. Analyze and provide strategic insights for competing against:

"${input}"

Format the output as:

🔍 COMPETITOR ANALYSIS REPORT
━━━━━━━━━━━━━━━━━━━━━━━━━

📊 MARKET POSITIONING:
- Competitor's Strengths: [List 3-5 key strengths]
- Competitor's Weaknesses: [List 3-5 vulnerabilities]
- Their Unique Value Proposition: [What makes them stand out]

🎯 THEIR TARGET AUDIENCE:
- Primary Demographic: [Who they're targeting]
- Pain Points They Address: [What problems they solve]
- Pricing Strategy: [How they price their offerings]

📱 DIGITAL PRESENCE ANALYSIS:

SEO Strategy:
- Likely Target Keywords: [5-7 keywords they probably target]
- Content Strategy: [Types of content they produce]
- Estimated Domain Authority: [Low/Medium/High]

Social Media:
- Primary Platforms: [Where they're most active]
- Content Types: [What they post]
- Engagement Strategy: [How they engage]

Paid Advertising:
- Likely Ad Platforms: [Google Ads, Meta, etc.]
- Ad Messaging Themes: [What they emphasize]

🚀 YOUR COMPETITIVE ADVANTAGES:
1. [How you can differentiate]
2. [Gap in their offering you can fill]
3. [Audience segment they're missing]
4. [Service/feature you can offer better]
5. [Unique positioning opportunity]

💡 STRATEGIC RECOMMENDATIONS:

Quick Wins (0-30 days):
1. [Immediate action item]
2. [Immediate action item]
3. [Immediate action item]

Medium-term (30-90 days):
1. [Strategic initiative]
2. [Strategic initiative]

Long-term Dominance:
1. [Major strategic move]
2. [Sustainable competitive advantage to build]

🎯 KILLER DIFFERENTIATION STATEMENT:
"[A compelling one-liner that positions you against this competitor]"

📝 CONTENT IDEAS TO OUTRANK THEM:
1. [Blog post idea targeting their weakness]
2. [Video content idea]
3. [Lead magnet idea]
4. [Social campaign idea]
5. [SEO opportunity they're missing]`
      };

      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: prompts[selectedTool.id],
          session_id: `lab_${Date.now()}`
        })
      });

      const data = await response.json();
      setOutput(data.response || 'Error generating content. Please try again.');
      setGenerationCount(prev => prev + 1);
    } catch (error) {
      console.error('Error:', error);
      setOutput('Error generating content. Please try again.');
    }
    
    setIsGenerating(false);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const resetTool = () => {
    setInput('');
    setOutput('');
    setSelectedTool(null);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 30 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 30 }}
          className="bg-card border border-border rounded-3xl w-full max-w-5xl max-h-[90vh] overflow-hidden shadow-2xl relative"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Background effects */}
          <GlowingOrb className="top-0 right-0 w-96 h-96 -translate-y-1/2 translate-x-1/2" color="primary" />
          <GlowingOrb className="bottom-0 left-0 w-80 h-80 translate-y-1/2 -translate-x-1/2" color="purple" />

          {/* Header */}
          <div className="relative bg-gradient-to-r from-primary via-indigo-600 to-purple-600 p-6 text-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <motion.div 
                  className="p-3 bg-white/10 rounded-2xl backdrop-blur-sm"
                  animate={{ rotate: [0, 5, -5, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  <Brain className="h-8 w-8" />
                </motion.div>
                <div>
                  <h2 className="font-heading font-bold text-2xl flex items-center gap-2">
                    AI Marketing Lab
                    <motion.span
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      <Sparkles className="h-5 w-5 text-amber-400" />
                    </motion.span>
                  </h2>
                  <p className="text-white/80 text-sm">Experience the power of AI marketing - Powered by Skillax</p>
                </div>
              </div>
              <button 
                onClick={onClose}
                className="p-2 hover:bg-white/10 rounded-full transition-colors"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            {/* Stats bar */}
            <div className="flex items-center gap-6 mt-4 text-sm">
              <div className="flex items-center gap-2 px-3 py-1 bg-white/10 rounded-full">
                <Zap className="h-4 w-4 text-amber-400" />
                <span>Generations: {generationCount}</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-1 bg-white/10 rounded-full">
                <Star className="h-4 w-4 text-amber-400" />
                <span>Powered by GPT-4</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-1 bg-green-500/20 rounded-full">
                <Crown className="h-4 w-4 text-green-400" />
                <span>Free Demo</span>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="relative p-6 overflow-y-auto max-h-[calc(90vh-180px)]">
            {!selectedTool ? (
              // Tool Selection
              <div>
                <h3 className="font-heading font-semibold text-xl mb-6 text-center">
                  Choose an AI Tool to Try
                </h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  {labTools.map((tool, index) => {
                    const Icon = tool.icon;
                    return (
                      <motion.button
                        key={tool.id}
                        onClick={() => setSelectedTool(tool)}
                        className="group relative text-left"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ scale: 1.02, y: -5 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <div className={`absolute inset-0 bg-gradient-to-r ${tool.gradient} rounded-2xl blur-xl opacity-0 group-hover:opacity-30 transition-opacity`} />
                        <div className="relative bg-card border border-border rounded-2xl p-6 hover:border-primary/50 transition-all">
                          <div className="flex items-start gap-4">
                            <motion.div 
                              className={`p-4 bg-gradient-to-br ${tool.gradient} rounded-xl text-white shadow-lg`}
                              whileHover={{ rotate: [0, -10, 10, 0] }}
                              transition={{ duration: 0.5 }}
                            >
                              <Icon className="h-7 w-7" />
                            </motion.div>
                            <div className="flex-1">
                              <h4 className="font-heading font-semibold text-lg mb-1">{tool.title}</h4>
                              <p className="text-sm text-muted-foreground">{tool.desc}</p>
                            </div>
                            <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                          </div>
                        </div>
                      </motion.button>
                    );
                  })}
                </div>

                {/* Info box */}
                <motion.div 
                  className="mt-6 p-4 bg-amber-500/10 border border-amber-500/30 rounded-xl"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  <div className="flex items-start gap-3">
                    <Lightbulb className="h-5 w-5 text-amber-500 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-amber-600 mb-1">This is just a taste!</p>
                      <p className="text-sm text-muted-foreground">
                        At Skillax, you'll master 30+ AI tools and learn to build your own marketing automation agents. 
                        Each generation is unique - try the same prompt twice and get different results!
                      </p>
                    </div>
                  </div>
                </motion.div>
              </div>
            ) : (
              // Tool Interface
              <div>
                {/* Tool Header */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <motion.div 
                      className={`p-3 bg-gradient-to-br ${selectedTool.gradient} rounded-xl text-white shadow-lg`}
                      animate={{ rotate: isGenerating ? 360 : 0 }}
                      transition={{ duration: 2, repeat: isGenerating ? Infinity : 0, ease: 'linear' }}
                    >
                      <selectedTool.icon className="h-6 w-6" />
                    </motion.div>
                    <div>
                      <h3 className="font-heading font-semibold text-xl">{selectedTool.title}</h3>
                      <p className="text-sm text-muted-foreground">{selectedTool.desc}</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" onClick={resetTool} className="rounded-full">
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Try Another Tool
                  </Button>
                </div>

                {/* Input Area */}
                <div className="mb-6">
                  <label className="block text-sm font-medium mb-2">Your Input</label>
                  <div className="relative">
                    <textarea
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      placeholder={selectedTool.placeholder}
                      className="w-full h-32 p-4 bg-muted/50 border border-border rounded-xl resize-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                    />
                    <button
                      onClick={() => setInput(selectedTool.example)}
                      className="absolute bottom-3 right-3 text-xs text-muted-foreground hover:text-primary transition-colors"
                    >
                      Try example →
                    </button>
                  </div>
                </div>

                {/* Generate Button */}
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button
                    onClick={generateContent}
                    disabled={!input.trim() || isGenerating}
                    className={`w-full bg-gradient-to-r ${selectedTool.gradient} text-white rounded-xl py-6 font-semibold text-lg shadow-lg`}
                  >
                    {isGenerating ? (
                      <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        AI is creating magic...
                      </>
                    ) : (
                      <>
                        <Wand2 className="mr-2 h-5 w-5" />
                        Generate with AI
                        <Sparkles className="ml-2 h-5 w-5" />
                      </>
                    )}
                  </Button>
                </motion.div>

                {/* Output Area */}
                {output && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-6"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <label className="block text-sm font-medium">AI Generated Content</label>
                      <div className="flex gap-2">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={generateContent}
                          disabled={isGenerating}
                          className="rounded-full"
                        >
                          <RefreshCw className="h-4 w-4 mr-1" />
                          Regenerate
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={copyToClipboard}
                          className="rounded-full"
                        >
                          {copied ? <Check className="h-4 w-4 mr-1" /> : <Copy className="h-4 w-4 mr-1" />}
                          {copied ? 'Copied!' : 'Copy'}
                        </Button>
                      </div>
                    </div>
                    <div className="p-4 bg-muted/30 border border-border rounded-xl max-h-96 overflow-y-auto">
                      <pre className="whitespace-pre-wrap text-sm font-mono">{output}</pre>
                    </div>
                  </motion.div>
                )}

                {/* CTA */}
                {output && (
                  <motion.div 
                    className="mt-6 p-4 bg-gradient-to-r from-primary/10 to-purple-500/10 border border-primary/30 rounded-xl"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-semibold text-primary">Want to master this and 30+ more AI tools?</p>
                        <p className="text-sm text-muted-foreground">Join Skillax and become an AI Marketing Expert!</p>
                      </div>
                      <Button asChild className="rounded-full bg-primary">
                        <a href="/contact">
                          Enroll Now
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </a>
                      </Button>
                    </div>
                  </motion.div>
                )}
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
