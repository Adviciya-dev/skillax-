import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Sparkles, ArrowRight, Brain, Target, Zap, Gift, 
  Rocket, MessageSquare, Play, CheckCircle, X
} from 'lucide-react';
import { Button } from './ui/button';

// Quiz CTA Banner - Animated banner to trigger course quiz
export function QuizCTABanner({ onOpenQuiz, variant = 'default' }) {
  const variants = {
    default: {
      bg: 'from-blue-600 via-indigo-600 to-purple-600',
      text: 'Find Your Perfect Course',
      subtext: 'Take our 2-minute quiz to discover which program matches your goals',
    },
    minimal: {
      bg: 'from-primary to-purple-600',
      text: 'Not Sure Which Course?',
      subtext: 'Our AI will recommend the perfect program for you',
    },
    urgent: {
      bg: 'from-amber-500 via-orange-500 to-red-500',
      text: '🔥 Limited Founding Batch - March 2026',
      subtext: 'Only 15 seats! Find your course before they fill up',
    },
  };

  const v = variants[variant];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={`relative overflow-hidden rounded-2xl bg-gradient-to-r ${v.bg} p-6 md:p-8 text-white`}
    >
      {/* Floating elements */}
      <motion.div
        className="absolute top-4 right-4 w-20 h-20 bg-white/10 rounded-full blur-2xl"
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 4, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-4 left-4 w-16 h-16 bg-white/10 rounded-full blur-xl"
        animate={{ scale: [1.2, 1, 1.2], opacity: [0.4, 0.2, 0.4] }}
        transition={{ duration: 5, repeat: Infinity }}
      />

      <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <motion.div
            className="p-4 bg-white/20 rounded-2xl backdrop-blur-sm"
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <Target className="h-8 w-8" />
          </motion.div>
          <div>
            <h3 className="font-heading font-bold text-xl md:text-2xl">{v.text}</h3>
            <p className="text-white/80 text-sm md:text-base">{v.subtext}</p>
          </div>
        </div>
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button
            onClick={onOpenQuiz}
            size="lg"
            className="bg-white text-primary hover:bg-white/90 rounded-full px-8 font-semibold shadow-xl"
            data-testid="quiz-cta-button"
          >
            <Sparkles className="mr-2 h-5 w-5" />
            Take Free Quiz
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </motion.div>
      </div>
    </motion.div>
  );
}

// AI Lab CTA Card - Card to promote AI Marketing Lab
export function AILabCTACard({ onOpenLab }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      whileHover={{ y: -5 }}
      className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-purple-600 via-pink-600 to-rose-500 p-1"
    >
      <div className="bg-card rounded-xl p-6">
        <div className="flex items-start gap-4">
          <motion.div
            className="p-3 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl text-white"
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
          >
            <Brain className="h-7 w-7" />
          </motion.div>
          <div className="flex-1">
            <h3 className="font-heading font-bold text-lg mb-1">Try Our AI Marketing Lab</h3>
            <p className="text-muted-foreground text-sm mb-4">
              Generate ad copy, blog outlines & lead magnets instantly with AI
            </p>
            <div className="flex flex-wrap gap-2 mb-4">
              {['Ad Copy', 'Blog Outlines', 'Lead Magnets'].map((item, i) => (
                <span key={i} className="text-xs px-2 py-1 bg-primary/10 text-primary rounded-full">
                  {item}
                </span>
              ))}
            </div>
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button
                onClick={onOpenLab}
                className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full"
                data-testid="ai-lab-cta-button"
              >
                <Zap className="mr-2 h-4 w-4" />
                Try AI Lab Free
              </Button>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// Inline CTA - Small inline call-to-action
export function InlineCTA({ text, buttonText, onClick, icon: Icon = ArrowRight }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 bg-primary/5 border border-primary/20 rounded-xl"
    >
      <div className="flex items-center gap-3">
        <Gift className="h-5 w-5 text-primary" />
        <span className="text-sm font-medium">{text}</span>
      </div>
      <Button onClick={onClick} size="sm" variant="outline" className="rounded-full">
        {buttonText}
        <Icon className="ml-2 h-4 w-4" />
      </Button>
    </motion.div>
  );
}

// Sticky Bottom CTA - Fixed bottom bar for mobile
export function StickyBottomCTA({ onOpenQuiz, onOpenLab }) {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <motion.div
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      className="fixed bottom-0 left-0 right-0 z-40 lg:hidden bg-card border-t border-border p-3 shadow-2xl"
    >
      <div className="flex items-center gap-2">
        <Button
          onClick={onOpenQuiz}
          className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full text-sm"
          data-testid="sticky-quiz-btn"
        >
          <Target className="mr-1.5 h-4 w-4" />
          Find Course
        </Button>
        <Button
          onClick={onOpenLab}
          variant="outline"
          className="flex-1 rounded-full text-sm"
          data-testid="sticky-lab-btn"
        >
          <Brain className="mr-1.5 h-4 w-4" />
          AI Lab
        </Button>
        <button
          onClick={() => setIsVisible(false)}
          className="p-2 hover:bg-muted rounded-full"
        >
          <X className="h-4 w-4 text-muted-foreground" />
        </button>
      </div>
    </motion.div>
  );
}

// Feature Highlight Card - For showcasing key features
export function FeatureHighlightCard({ icon: Icon, title, description, color = 'blue' }) {
  const colors = {
    blue: 'from-blue-500 to-cyan-500',
    purple: 'from-purple-500 to-pink-500',
    green: 'from-green-500 to-emerald-500',
    amber: 'from-amber-500 to-orange-500',
  };

  return (
    <motion.div
      whileHover={{ y: -5, scale: 1.02 }}
      className="relative group"
    >
      <div className={`absolute inset-0 bg-gradient-to-r ${colors[color]} rounded-2xl blur-lg opacity-0 group-hover:opacity-30 transition-opacity`} />
      <div className="relative bg-card border border-border rounded-2xl p-5 h-full">
        <div className={`inline-flex p-3 bg-gradient-to-br ${colors[color]} rounded-xl text-white mb-4`}>
          <Icon className="h-6 w-6" />
        </div>
        <h3 className="font-semibold text-lg mb-2">{title}</h3>
        <p className="text-muted-foreground text-sm">{description}</p>
      </div>
    </motion.div>
  );
}

// Success Stories Mini Card
export function SuccessStoryMini({ name, role, quote, image }) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="bg-card border border-border rounded-xl p-4"
    >
      <div className="flex items-center gap-3 mb-3">
        <div className="w-10 h-10 bg-gradient-to-br from-primary to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
          {image || name.charAt(0)}
        </div>
        <div>
          <div className="font-medium text-sm">{name}</div>
          <div className="text-xs text-muted-foreground">{role}</div>
        </div>
      </div>
      <p className="text-sm text-muted-foreground italic">"{quote}"</p>
    </motion.div>
  );
}

// Enrollment CTA Section - Full section for enrollment push
export function EnrollmentCTASection({ onOpenQuiz }) {
  const benefits = [
    'SEO, AEO, GEO & GMB Mastery',
    'Google Ads & Meta Ads Certification',
    '30+ AI Tools Training',
    'Guaranteed Infopark Internship',
  ];

  return (
    <section className="py-16 bg-gradient-to-br from-primary via-indigo-600 to-purple-700 text-white relative overflow-hidden">
      {/* Background effects */}
      <motion.div
        className="absolute top-10 left-10 w-72 h-72 bg-white/10 rounded-full blur-3xl"
        animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 6, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-10 right-10 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl"
        animate={{ scale: [1.2, 1, 1.2], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 8, repeat: Infinity }}
      />

      <div className="container-custom relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full text-sm font-medium mb-6 backdrop-blur-sm"
          >
            <Rocket className="h-4 w-4 text-amber-400" />
            <span>Founding Batch - March 2026 - Only 15 Seats</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-heading text-3xl md:text-5xl font-bold mb-4"
          >
            Ready to Transform Your Career?
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-white/80 text-lg mb-8"
          >
            Join Kerala's most comprehensive AI-powered digital marketing program
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-wrap justify-center gap-3 mb-8"
          >
            {benefits.map((benefit, i) => (
              <span key={i} className="flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full text-sm backdrop-blur-sm">
                <CheckCircle className="h-4 w-4 text-green-400" />
                {benefit}
              </span>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-wrap justify-center gap-4"
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                onClick={onOpenQuiz}
                size="lg"
                className="bg-white text-primary hover:bg-white/90 rounded-full px-10 py-7 font-bold shadow-2xl"
                data-testid="enrollment-quiz-btn"
              >
                <Target className="mr-2 h-5 w-5" />
                Find Your Perfect Course
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
