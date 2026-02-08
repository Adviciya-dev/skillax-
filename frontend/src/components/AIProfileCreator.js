import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  User, Mail, Phone, MapPin, Linkedin, Globe, GraduationCap,
  Briefcase, Target, Sparkles, Brain, CheckCircle, ArrowRight,
  ArrowLeft, Loader2, Download, Share2, Copy, Check, Star,
  Rocket, Award, TrendingUp, BookOpen, Clock, Zap, Heart,
  ExternalLink, X
} from 'lucide-react';
import { Button } from './ui/button';
import { toast } from 'sonner';

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

// Multi-step form steps
const formSteps = [
  { id: 'basic', title: 'Basic Info', icon: User },
  { id: 'education', title: 'Education', icon: GraduationCap },
  { id: 'career', title: 'Career Goals', icon: Target },
  { id: 'skills', title: 'Skills & Interests', icon: Brain },
  { id: 'additional', title: 'Final Details', icon: Sparkles },
];

// Options
const educationLevels = [
  { value: 'high_school', label: 'High School / +2', icon: BookOpen },
  { value: 'bachelors', label: "Bachelor's Degree", icon: GraduationCap },
  { value: 'masters', label: "Master's Degree", icon: Award },
  { value: 'working_professional', label: 'Working Professional', icon: Briefcase },
];

const careerStages = [
  { value: 'student', label: 'Student', desc: 'Currently studying' },
  { value: 'fresher', label: 'Fresher', desc: '0-1 year experience' },
  { value: '1-3_years', label: '1-3 Years', desc: 'Early career' },
  { value: '3-5_years', label: '3-5 Years', desc: 'Mid-level' },
  { value: '5+_years', label: '5+ Years', desc: 'Experienced' },
];

const targetRoles = [
  'SEO Specialist', 'Digital Marketing Manager', 'Social Media Manager',
  'Content Strategist', 'PPC Specialist', 'AI Marketing Expert',
  'Growth Hacker', 'Marketing Analyst', 'Brand Manager', 'Freelance Marketer'
];

const skillOptions = [
  'SEO', 'Google Ads', 'Facebook Ads', 'Content Writing', 'Social Media',
  'Email Marketing', 'Analytics', 'Graphic Design', 'Video Editing',
  'Copywriting', 'WordPress', 'HTML/CSS', 'Python', 'Data Analysis'
];

const interestOptions = [
  'Search Engine Optimization', 'Paid Advertising', 'Social Media Marketing',
  'Content Marketing', 'AI & Automation', 'E-commerce', 'Influencer Marketing',
  'Video Marketing', 'Email Marketing', 'Analytics & Data', 'Brand Strategy'
];

const learningStyles = [
  { value: 'self_paced', label: 'Self-Paced', desc: 'Learn at your own speed' },
  { value: 'instructor_led', label: 'Instructor-Led', desc: 'Live classes with mentors' },
  { value: 'hybrid', label: 'Hybrid', desc: 'Mix of both' },
];

const availabilityOptions = [
  { value: 'full_time', label: 'Full-Time', desc: 'Weekdays 9-6' },
  { value: 'part_time', label: 'Part-Time', desc: 'Few hours daily' },
  { value: 'weekends', label: 'Weekends Only', desc: 'Saturday & Sunday' },
];

// Profile Display Component
function ProfileDisplay({ profile, onClose }) {
  const [copied, setCopied] = useState(false);
  const profileUrl = `${window.location.origin}/profile/${profile.profile_code}`;

  const copyLink = () => {
    navigator.clipboard.writeText(profileUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    toast.success('Profile link copied!');
  };

  const shareProfile = async () => {
    if (navigator.share) {
      await navigator.share({
        title: `${profile.full_name}'s Digital Marketing Profile`,
        text: profile.ai_bio,
        url: profileUrl,
      });
    } else {
      copyLink();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="space-y-6"
    >
      {/* Success Header */}
      <div className="text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 200 }}
          className="inline-flex p-4 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full text-white mb-4"
        >
          <CheckCircle className="h-10 w-10" />
        </motion.div>
        <h3 className="font-heading text-2xl font-bold mb-2">
          Your Profile is Ready!
        </h3>
        <p className="text-muted-foreground">
          Profile Code: <span className="font-mono font-bold text-primary">{profile.profile_code}</span>
        </p>
      </div>

      {/* Profile Card */}
      <div className="bg-gradient-to-br from-primary/5 to-purple-500/5 border border-primary/20 rounded-2xl p-6">
        {/* Header */}
        <div className="flex items-start gap-4 mb-6">
          <div className="w-16 h-16 bg-gradient-to-br from-primary to-purple-600 rounded-2xl flex items-center justify-center text-white text-2xl font-bold">
            {profile.full_name.charAt(0)}
          </div>
          <div className="flex-1">
            <h4 className="font-heading font-bold text-xl">{profile.full_name}</h4>
            <p className="text-primary font-medium">{profile.ai_linkedin_headline}</p>
            <div className="flex items-center gap-2 mt-1 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4" />
              {profile.location}
            </div>
          </div>
        </div>

        {/* AI Bio */}
        <div className="mb-6">
          <h5 className="font-semibold text-sm text-muted-foreground mb-2">AI-Generated Bio</h5>
          <p className="text-sm leading-relaxed">{profile.ai_bio}</p>
        </div>

        {/* Strengths */}
        {profile.ai_strengths && profile.ai_strengths.length > 0 && (
          <div className="mb-6">
            <h5 className="font-semibold text-sm text-muted-foreground mb-2">Your Strengths</h5>
            <div className="flex flex-wrap gap-2">
              {profile.ai_strengths.map((strength, i) => (
                <span key={i} className="px-3 py-1 bg-green-500/10 text-green-600 rounded-full text-sm">
                  {strength}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Skill Gaps */}
        {profile.ai_skill_gaps && profile.ai_skill_gaps.length > 0 && (
          <div className="mb-6">
            <h5 className="font-semibold text-sm text-muted-foreground mb-2">Skills to Develop</h5>
            <div className="flex flex-wrap gap-2">
              {profile.ai_skill_gaps.map((skill, i) => (
                <span key={i} className="px-3 py-1 bg-amber-500/10 text-amber-600 rounded-full text-sm">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Course Recommendation */}
        {profile.ai_course_recommendation && (
          <div className="p-4 bg-primary/10 border border-primary/20 rounded-xl">
            <div className="flex items-center gap-2 mb-2">
              <Rocket className="h-5 w-5 text-primary" />
              <h5 className="font-semibold">Recommended Course</h5>
            </div>
            <p className="text-sm">{profile.ai_course_recommendation}</p>
          </div>
        )}

        {/* Career Roadmap */}
        {profile.ai_career_roadmap && profile.ai_career_roadmap.length > 0 && (
          <div className="mt-6">
            <h5 className="font-semibold text-sm text-muted-foreground mb-3">Your Career Roadmap</h5>
            <div className="grid sm:grid-cols-2 gap-3">
              {profile.ai_career_roadmap.map((phase, i) => (
                <div key={i} className="p-3 bg-card border border-border rounded-xl">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center text-xs font-bold text-primary">
                      {i + 1}
                    </div>
                    <div>
                      <span className="text-xs text-muted-foreground">{phase.phase}</span>
                      <h6 className="font-semibold text-sm">{phase.title}</h6>
                    </div>
                  </div>
                  <ul className="space-y-1">
                    {phase.goals?.map((goal, j) => (
                      <li key={j} className="text-xs text-muted-foreground flex items-start gap-1">
                        <CheckCircle className="h-3 w-3 text-green-500 mt-0.5 shrink-0" />
                        {goal}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-3">
        <Button onClick={copyLink} variant="outline" className="flex-1 rounded-full">
          {copied ? <Check className="h-4 w-4 mr-2" /> : <Copy className="h-4 w-4 mr-2" />}
          {copied ? 'Copied!' : 'Copy Profile Link'}
        </Button>
        <Button onClick={shareProfile} className="flex-1 rounded-full bg-primary">
          <Share2 className="h-4 w-4 mr-2" />
          Share Profile
        </Button>
      </div>

      <div className="text-center">
        <Button asChild variant="outline" className="rounded-full">
          <a href={`/profile/${profile.profile_code}`} target="_blank" rel="noopener noreferrer">
            <ExternalLink className="h-4 w-4 mr-2" />
            View Public Profile
          </a>
        </Button>
      </div>

      <p className="text-center text-xs text-muted-foreground">
        Our team will contact you within 24 hours with personalized guidance!
      </p>
    </motion.div>
  );
}

// Main Profile Creator Component
export default function AIProfileCreator({ isOpen, onClose }) {
  const [step, setStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [profile, setProfile] = useState(null);
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    phone: '',
    location: '',
    linkedin_url: '',
    portfolio_url: '',
    education_level: '',
    field_of_study: '',
    institution: '',
    graduation_year: '',
    career_stage: '',
    current_role: '',
    target_role: '',
    career_goals: '',
    current_skills: [],
    interests: [],
    preferred_learning_style: '',
    why_digital_marketing: '',
    availability: '',
  });

  const updateField = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const toggleArrayField = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].includes(value)
        ? prev[field].filter(v => v !== value)
        : [...prev[field], value]
    }));
  };

  const canProceed = () => {
    switch (step) {
      case 0: return formData.full_name && formData.email && formData.phone && formData.location;
      case 1: return formData.education_level;
      case 2: return formData.career_stage && formData.target_role && formData.career_goals;
      case 3: return formData.interests.length > 0 && formData.preferred_learning_style;
      case 4: return formData.why_digital_marketing && formData.availability;
      default: return true;
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const response = await fetch(`${API}/profiles`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.detail || 'Failed to create profile');
      }

      const result = await response.json();
      setProfile(result);
      toast.success('Profile created successfully!');
    } catch (error) {
      toast.error(error.message || 'Failed to create profile');
    } finally {
      setIsSubmitting(false);
    }
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
          className="bg-card border border-border rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-hidden shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-purple-600 via-pink-600 to-rose-500 p-6 text-white relative overflow-hidden">
            <motion.div
              className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full blur-3xl"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 4, repeat: Infinity }}
            />
            <div className="relative z-10 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <motion.div
                  className="p-3 bg-white/20 rounded-2xl backdrop-blur-sm"
                  animate={{ rotate: [0, 5, -5, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  <User className="h-8 w-8" />
                </motion.div>
                <div>
                  <h2 className="font-heading font-bold text-2xl flex items-center gap-2">
                    AI Profile Creator
                    <Sparkles className="h-5 w-5 text-amber-300" />
                  </h2>
                  <p className="text-white/80 text-sm">Get your professional digital marketing profile</p>
                </div>
              </div>
              <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                <X className="h-6 w-6" />
              </button>
            </div>

            {/* Progress Steps */}
            {!profile && (
              <div className="flex items-center justify-between mt-6">
                {formSteps.map((s, i) => {
                  const Icon = s.icon;
                  return (
                    <div key={s.id} className="flex items-center">
                      <div className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-bold transition-all ${
                        i < step ? 'bg-white text-primary' :
                        i === step ? 'bg-white/30 text-white ring-2 ring-white' :
                        'bg-white/10 text-white/50'
                      }`}>
                        {i < step ? <CheckCircle className="h-5 w-5" /> : <Icon className="h-4 w-4" />}
                      </div>
                      {i < formSteps.length - 1 && (
                        <div className={`w-8 sm:w-12 h-0.5 mx-1 ${i < step ? 'bg-white' : 'bg-white/20'}`} />
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Content */}
          <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
            {profile ? (
              <ProfileDisplay profile={profile} onClose={onClose} />
            ) : (
              <AnimatePresence mode="wait">
                <motion.div
                  key={step}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  {/* Step 0: Basic Info */}
                  {step === 0 && (
                    <>
                      <div>
                        <h3 className="font-heading font-semibold text-xl mb-1">Let's Start with the Basics</h3>
                        <p className="text-sm text-muted-foreground">Tell us about yourself</p>
                      </div>
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium mb-1.5">Full Name *</label>
                          <input
                            type="text"
                            value={formData.full_name}
                            onChange={(e) => updateField('full_name', e.target.value)}
                            placeholder="John Doe"
                            className="w-full px-4 py-3 bg-muted/50 border border-border rounded-xl focus:ring-2 focus:ring-primary/50"
                            data-testid="profile-name"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-1.5">Email *</label>
                          <input
                            type="email"
                            value={formData.email}
                            onChange={(e) => updateField('email', e.target.value)}
                            placeholder="john@example.com"
                            className="w-full px-4 py-3 bg-muted/50 border border-border rounded-xl focus:ring-2 focus:ring-primary/50"
                            data-testid="profile-email"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-1.5">Phone *</label>
                          <input
                            type="tel"
                            value={formData.phone}
                            onChange={(e) => updateField('phone', e.target.value)}
                            placeholder="+91 98765 43210"
                            className="w-full px-4 py-3 bg-muted/50 border border-border rounded-xl focus:ring-2 focus:ring-primary/50"
                            data-testid="profile-phone"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-1.5">Location *</label>
                          <input
                            type="text"
                            value={formData.location}
                            onChange={(e) => updateField('location', e.target.value)}
                            placeholder="Wayanad, Kerala"
                            className="w-full px-4 py-3 bg-muted/50 border border-border rounded-xl focus:ring-2 focus:ring-primary/50"
                            data-testid="profile-location"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-1.5">LinkedIn URL (optional)</label>
                          <input
                            type="url"
                            value={formData.linkedin_url}
                            onChange={(e) => updateField('linkedin_url', e.target.value)}
                            placeholder="linkedin.com/in/..."
                            className="w-full px-4 py-3 bg-muted/50 border border-border rounded-xl focus:ring-2 focus:ring-primary/50"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-1.5">Portfolio URL (optional)</label>
                          <input
                            type="url"
                            value={formData.portfolio_url}
                            onChange={(e) => updateField('portfolio_url', e.target.value)}
                            placeholder="yourportfolio.com"
                            className="w-full px-4 py-3 bg-muted/50 border border-border rounded-xl focus:ring-2 focus:ring-primary/50"
                          />
                        </div>
                      </div>
                    </>
                  )}

                  {/* Step 1: Education */}
                  {step === 1 && (
                    <>
                      <div>
                        <h3 className="font-heading font-semibold text-xl mb-1">Your Education Background</h3>
                        <p className="text-sm text-muted-foreground">Help us understand your academic journey</p>
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        {educationLevels.map((level) => {
                          const Icon = level.icon;
                          return (
                            <motion.button
                              key={level.value}
                              onClick={() => updateField('education_level', level.value)}
                              className={`p-4 border-2 rounded-xl text-left transition-all ${
                                formData.education_level === level.value
                                  ? 'border-primary bg-primary/5'
                                  : 'border-border hover:border-primary/50'
                              }`}
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                            >
                              <Icon className={`h-6 w-6 mb-2 ${formData.education_level === level.value ? 'text-primary' : 'text-muted-foreground'}`} />
                              <span className="font-medium block">{level.label}</span>
                            </motion.button>
                          );
                        })}
                      </div>
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium mb-1.5">Field of Study</label>
                          <input
                            type="text"
                            value={formData.field_of_study}
                            onChange={(e) => updateField('field_of_study', e.target.value)}
                            placeholder="Computer Science, Commerce..."
                            className="w-full px-4 py-3 bg-muted/50 border border-border rounded-xl focus:ring-2 focus:ring-primary/50"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-1.5">Institution</label>
                          <input
                            type="text"
                            value={formData.institution}
                            onChange={(e) => updateField('institution', e.target.value)}
                            placeholder="Your college/university"
                            className="w-full px-4 py-3 bg-muted/50 border border-border rounded-xl focus:ring-2 focus:ring-primary/50"
                          />
                        </div>
                      </div>
                    </>
                  )}

                  {/* Step 2: Career */}
                  {step === 2 && (
                    <>
                      <div>
                        <h3 className="font-heading font-semibold text-xl mb-1">Career Goals</h3>
                        <p className="text-sm text-muted-foreground">Where are you headed?</p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Career Stage *</label>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                          {careerStages.map((stage) => (
                            <motion.button
                              key={stage.value}
                              onClick={() => updateField('career_stage', stage.value)}
                              className={`p-3 border-2 rounded-xl text-left transition-all ${
                                formData.career_stage === stage.value
                                  ? 'border-primary bg-primary/5'
                                  : 'border-border hover:border-primary/50'
                              }`}
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                            >
                              <span className="font-medium block text-sm">{stage.label}</span>
                              <span className="text-xs text-muted-foreground">{stage.desc}</span>
                            </motion.button>
                          ))}
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1.5">Current Role (if any)</label>
                        <input
                          type="text"
                          value={formData.current_role}
                          onChange={(e) => updateField('current_role', e.target.value)}
                          placeholder="e.g., Marketing Executive, Student"
                          className="w-full px-4 py-3 bg-muted/50 border border-border rounded-xl focus:ring-2 focus:ring-primary/50"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Target Role *</label>
                        <div className="flex flex-wrap gap-2">
                          {targetRoles.map((role) => (
                            <motion.button
                              key={role}
                              onClick={() => updateField('target_role', role)}
                              className={`px-4 py-2 rounded-full text-sm transition-all ${
                                formData.target_role === role
                                  ? 'bg-primary text-white'
                                  : 'bg-muted hover:bg-muted/80'
                              }`}
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                            >
                              {role}
                            </motion.button>
                          ))}
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1.5">Career Goals *</label>
                        <textarea
                          value={formData.career_goals}
                          onChange={(e) => updateField('career_goals', e.target.value)}
                          placeholder="What do you want to achieve in your digital marketing career?"
                          rows={3}
                          className="w-full px-4 py-3 bg-muted/50 border border-border rounded-xl focus:ring-2 focus:ring-primary/50 resize-none"
                        />
                      </div>
                    </>
                  )}

                  {/* Step 3: Skills */}
                  {step === 3 && (
                    <>
                      <div>
                        <h3 className="font-heading font-semibold text-xl mb-1">Skills & Interests</h3>
                        <p className="text-sm text-muted-foreground">Tell us what you know and want to learn</p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Current Skills (select all that apply)</label>
                        <div className="flex flex-wrap gap-2">
                          {skillOptions.map((skill) => (
                            <motion.button
                              key={skill}
                              onClick={() => toggleArrayField('current_skills', skill)}
                              className={`px-3 py-1.5 rounded-full text-sm transition-all ${
                                formData.current_skills.includes(skill)
                                  ? 'bg-green-500 text-white'
                                  : 'bg-muted hover:bg-muted/80'
                              }`}
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                            >
                              {skill}
                            </motion.button>
                          ))}
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Areas of Interest * (select at least one)</label>
                        <div className="flex flex-wrap gap-2">
                          {interestOptions.map((interest) => (
                            <motion.button
                              key={interest}
                              onClick={() => toggleArrayField('interests', interest)}
                              className={`px-3 py-1.5 rounded-full text-sm transition-all ${
                                formData.interests.includes(interest)
                                  ? 'bg-primary text-white'
                                  : 'bg-muted hover:bg-muted/80'
                              }`}
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                            >
                              {interest}
                            </motion.button>
                          ))}
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Preferred Learning Style *</label>
                        <div className="grid grid-cols-3 gap-3">
                          {learningStyles.map((style) => (
                            <motion.button
                              key={style.value}
                              onClick={() => updateField('preferred_learning_style', style.value)}
                              className={`p-3 border-2 rounded-xl text-center transition-all ${
                                formData.preferred_learning_style === style.value
                                  ? 'border-primary bg-primary/5'
                                  : 'border-border hover:border-primary/50'
                              }`}
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                            >
                              <span className="font-medium block text-sm">{style.label}</span>
                              <span className="text-xs text-muted-foreground">{style.desc}</span>
                            </motion.button>
                          ))}
                        </div>
                      </div>
                    </>
                  )}

                  {/* Step 4: Additional */}
                  {step === 4 && (
                    <>
                      <div>
                        <h3 className="font-heading font-semibold text-xl mb-1">Final Details</h3>
                        <p className="text-sm text-muted-foreground">Almost there!</p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1.5">Why Digital Marketing? *</label>
                        <textarea
                          value={formData.why_digital_marketing}
                          onChange={(e) => updateField('why_digital_marketing', e.target.value)}
                          placeholder="What excites you about digital marketing? Why do you want to pursue this career?"
                          rows={4}
                          className="w-full px-4 py-3 bg-muted/50 border border-border rounded-xl focus:ring-2 focus:ring-primary/50 resize-none"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Availability *</label>
                        <div className="grid grid-cols-3 gap-3">
                          {availabilityOptions.map((option) => (
                            <motion.button
                              key={option.value}
                              onClick={() => updateField('availability', option.value)}
                              className={`p-3 border-2 rounded-xl text-center transition-all ${
                                formData.availability === option.value
                                  ? 'border-primary bg-primary/5'
                                  : 'border-border hover:border-primary/50'
                              }`}
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                            >
                              <span className="font-medium block text-sm">{option.label}</span>
                              <span className="text-xs text-muted-foreground">{option.desc}</span>
                            </motion.button>
                          ))}
                        </div>
                      </div>
                      <div className="p-4 bg-amber-500/10 border border-amber-500/30 rounded-xl">
                        <div className="flex items-start gap-3">
                          <Sparkles className="h-5 w-5 text-amber-500 shrink-0 mt-0.5" />
                          <div>
                            <p className="font-semibold text-amber-600 mb-1">What happens next?</p>
                            <p className="text-sm text-muted-foreground">
                              Our AI will analyze your profile and generate a professional bio, 
                              LinkedIn headline, personalized career roadmap, and course recommendation!
                            </p>
                          </div>
                        </div>
                      </div>
                    </>
                  )}

                  {/* Navigation */}
                  <div className="flex items-center justify-between pt-4 border-t">
                    <Button
                      variant="outline"
                      onClick={() => setStep(prev => prev - 1)}
                      disabled={step === 0}
                      className="rounded-full"
                    >
                      <ArrowLeft className="h-4 w-4 mr-2" />
                      Back
                    </Button>
                    
                    {step < formSteps.length - 1 ? (
                      <Button
                        onClick={() => setStep(prev => prev + 1)}
                        disabled={!canProceed()}
                        className="rounded-full bg-primary"
                      >
                        Next
                        <ArrowRight className="h-4 w-4 ml-2" />
                      </Button>
                    ) : (
                      <Button
                        onClick={handleSubmit}
                        disabled={!canProceed() || isSubmitting}
                        className="rounded-full bg-gradient-to-r from-purple-500 to-pink-500"
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                            Creating Profile...
                          </>
                        ) : (
                          <>
                            <Sparkles className="h-4 w-4 mr-2" />
                            Create My Profile
                          </>
                        )}
                      </Button>
                    )}
                  </div>
                </motion.div>
              </AnimatePresence>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
