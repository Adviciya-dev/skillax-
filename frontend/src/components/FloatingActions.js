import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sparkles, Brain, GraduationCap, X, ChevronUp,
  Rocket, Target, Zap, ArrowRight, User
} from 'lucide-react';
import AIMarketingLab from './AIMarketingLab';
import AIProfileCreator from './AIProfileCreator';

// Course Quiz Modal (simplified version)
function CourseQuizModal({ isOpen, onClose }) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState(null);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const questions = [
    {
      id: 'experience',
      question: 'Your current experience level?',
      options: [
        { value: 'beginner', label: 'Complete Beginner' },
        { value: 'basic', label: 'Basic Knowledge' },
        { value: 'intermediate', label: 'Some Experience' },
        { value: 'advanced', label: 'Experienced Pro' },
      ]
    },
    {
      id: 'goal',
      question: 'Your primary goal?',
      options: [
        { value: 'job', label: 'Get a High-Paying Job' },
        { value: 'freelance', label: 'Start Freelancing' },
        { value: 'business', label: 'Grow My Business' },
        { value: 'upskill', label: 'Upskill for Promotion' },
      ]
    },
    {
      id: 'interest',
      question: 'What interests you most?',
      options: [
        { value: 'seo', label: 'SEO, AEO & GEO' },
        { value: 'ads', label: 'Google & Meta Ads' },
        { value: 'ai', label: 'AI Tools & Agents' },
        { value: 'all', label: 'Everything!' },
      ]
    },
  ];

  const calculateResult = () => {
    const { experience, interest } = answers;
    if (experience === 'beginner' || experience === 'basic' || interest === 'all' || interest === 'seo' || interest === 'ads') {
      return 'professional';
    }
    return 'advanced';
  };

  const handleAnswer = (questionId, value) => {
    setAnswers({ ...answers, [questionId]: value });
    if (step < questions.length - 1) {
      setStep(step + 1);
    } else {
      setResult(calculateResult());
      setStep(questions.length);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/leads`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          interest: result === 'professional' ? 'Professional Digital Marketing' : 'AI-Powered Marketing',
          source: 'floating_quiz',
          message: `Quiz Result: ${result}`
        })
      });
    } catch (error) {
      console.error('Error:', error);
    }
    setIsSubmitting(false);
    setStep(questions.length + 1);
  };

  const resetQuiz = () => {
    setStep(0);
    setAnswers({});
    setResult(null);
    setFormData({ name: '', email: '', phone: '' });
  };

  if (!isOpen) return null;

  const courses = {
    professional: { title: 'Professional Digital Marketing', duration: '4 Months', color: 'from-blue-500 to-indigo-600' },
    advanced: { title: 'Advanced AI-Powered Marketing', duration: '2 Months', color: 'from-purple-500 to-pink-600' }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 30 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 30 }}
          className="bg-card border border-border rounded-3xl p-6 max-w-md w-full shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <motion.div 
                className="p-2 bg-gradient-to-br from-primary to-purple-600 rounded-xl"
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <GraduationCap className="h-5 w-5 text-white" />
              </motion.div>
              <div>
                <h3 className="font-heading font-bold text-lg">Find Your Course</h3>
                <p className="text-xs text-muted-foreground">
                  {step <= questions.length - 1 ? `Q${step + 1}/${questions.length}` : 
                   step === questions.length ? 'Result' : 'Done!'}
                </p>
              </div>
            </div>
            <button onClick={onClose} className="p-1 hover:bg-muted rounded-full">
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Progress */}
          <div className="w-full bg-muted rounded-full h-1.5 mb-6">
            <motion.div 
              className="bg-gradient-to-r from-primary to-purple-600 h-1.5 rounded-full"
              animate={{ width: `${((step + 1) / (questions.length + 2)) * 100}%` }}
            />
          </div>

          {/* Questions */}
          {step < questions.length && (
            <motion.div key={step} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
              <h4 className="font-semibold text-lg mb-4 text-center">{questions[step].question}</h4>
              <div className="space-y-2">
                {questions[step].options.map((option) => (
                  <motion.button
                    key={option.value}
                    onClick={() => handleAnswer(questions[step].id, option.value)}
                    className="w-full p-3 border border-border rounded-xl text-left hover:border-primary hover:bg-primary/5 transition-all"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {option.label}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}

          {/* Result */}
          {step === questions.length && result && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <div className={`p-4 rounded-xl bg-gradient-to-r ${courses[result].color} text-white mb-4`}>
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles className="h-5 w-5" />
                  <span className="font-semibold">Perfect Match!</span>
                </div>
                <h4 className="font-bold text-lg">{courses[result].title}</h4>
                <p className="text-sm opacity-90">{courses[result].duration}</p>
              </div>
              <div className="space-y-3">
                <input
                  type="text"
                  placeholder="Full Name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full p-3 bg-muted/50 border border-border rounded-xl"
                />
                <input
                  type="tel"
                  placeholder="Phone Number"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full p-3 bg-muted/50 border border-border rounded-xl"
                />
                <motion.button
                  onClick={handleSubmit}
                  disabled={!formData.name || !formData.phone || isSubmitting}
                  className={`w-full p-3 bg-gradient-to-r ${courses[result].color} text-white rounded-xl font-semibold disabled:opacity-50`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {isSubmitting ? 'Submitting...' : 'Get Free Counseling'}
                </motion.button>
              </div>
            </motion.div>
          )}

          {/* Thank You */}
          {step === questions.length + 1 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-4">
              <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Sparkles className="h-8 w-8 text-green-500" />
              </div>
              <h4 className="font-bold text-lg mb-2">Thank You!</h4>
              <p className="text-sm text-muted-foreground mb-4">We'll contact you within 24 hours.</p>
              <button onClick={() => { resetQuiz(); onClose(); }} className="text-primary text-sm">Close</button>
            </motion.div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export default function FloatingActions() {
  const [showQuiz, setShowQuiz] = useState(false);
  const [showLab, setShowLab] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <>
      {/* Floating Action Buttons */}
      <div className="fixed bottom-24 right-6 z-40 flex flex-col items-end gap-3">
        <AnimatePresence>
          {isExpanded && (
            <>
              {/* AI Profile Creator Button */}
              <motion.button
                initial={{ opacity: 0, y: 20, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 20, scale: 0.8 }}
                transition={{ delay: 0.2 }}
                onClick={() => { setShowProfile(true); setIsExpanded(false); }}
                className="group flex items-center gap-3 px-4 py-3 bg-gradient-to-r from-rose-500 to-pink-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                data-testid="fab-profile-btn"
              >
                <User className="h-5 w-5" />
                <span className="font-semibold text-sm">Create AI Profile</span>
                <motion.span
                  animate={{ scale: [1, 1.3, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                >
                  <Sparkles className="h-4 w-4" />
                </motion.span>
              </motion.button>

              {/* AI Lab Button */}
              <motion.button
                initial={{ opacity: 0, y: 20, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 20, scale: 0.8 }}
                transition={{ delay: 0.1 }}
                onClick={() => { setShowLab(true); setIsExpanded(false); }}
                className="group flex items-center gap-3 px-4 py-3 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                data-testid="fab-lab-btn"
              >
                <Brain className="h-5 w-5" />
                <span className="font-semibold text-sm">AI Marketing Lab</span>
              </motion.button>

              {/* Course Quiz Button */}
              <motion.button
                initial={{ opacity: 0, y: 20, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 20, scale: 0.8 }}
                onClick={() => { setShowQuiz(true); setIsExpanded(false); }}
                className="group flex items-center gap-3 px-4 py-3 bg-gradient-to-r from-amber-500 to-orange-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                data-testid="fab-quiz-btn"
              >
                <GraduationCap className="h-5 w-5" />
                <span className="font-semibold text-sm">Find Your Course</span>
              </motion.button>
            </>
          )}
        </AnimatePresence>

        {/* Main Toggle Button */}
        <motion.button
          onClick={() => setIsExpanded(!isExpanded)}
          className="relative p-4 bg-gradient-to-r from-primary to-purple-600 text-white rounded-full shadow-xl hover:shadow-2xl transition-all"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          animate={{ rotate: isExpanded ? 180 : 0 }}
          data-testid="fab-main-btn"
        >
          {/* Pulsing ring */}
          <motion.div
            className="absolute inset-0 rounded-full bg-primary"
            animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          
          {/* Blinking dot */}
          <motion.div
            className="absolute -top-1 -right-1 w-4 h-4 bg-amber-500 rounded-full border-2 border-white"
            animate={{ scale: [1, 1.2, 1], opacity: [1, 0.7, 1] }}
            transition={{ duration: 0.8, repeat: Infinity }}
          />
          
          <motion.div
            animate={{ rotate: isExpanded ? 45 : 0 }}
            transition={{ duration: 0.2 }}
          >
            {isExpanded ? <X className="h-6 w-6 relative z-10" /> : <Rocket className="h-6 w-6 relative z-10" />}
          </motion.div>
        </motion.button>
      </div>

      {/* Modals */}
      <CourseQuizModal isOpen={showQuiz} onClose={() => setShowQuiz(false)} />
      <AIMarketingLab isOpen={showLab} onClose={() => setShowLab(false)} />
      <AIProfileCreator isOpen={showProfile} onClose={() => setShowProfile(false)} />
    </>
  );
}
