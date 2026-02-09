import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  User, MapPin, Linkedin, Globe, Mail, Phone, GraduationCap,
  Briefcase, Target, CheckCircle, ArrowRight, Download, Share2,
  Rocket, Award, TrendingUp, BookOpen, Clock, Star, Eye,
  Copy, Check, ExternalLink, Sparkles
} from 'lucide-react';
import { Button } from '../components/ui/button';
import SEO from '../components/SEO';
import { toast } from 'sonner';

const API = "https://ltz6k4u2e5.execute-api.ap-south-1.amazonaws.com/api";

export default function PublicProfile() {
  const { profileCode } = useParams();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch(`${API}/profiles/${profileCode}`);
        if (!response.ok) {
          throw new Error('Profile not found');
        }
        const data = await response.json();
        setProfile(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [profileCode]);

  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    toast.success('Profile link copied!');
  };

  const shareProfile = async () => {
    if (navigator.share && profile) {
      await navigator.share({
        title: `${profile.full_name}'s Digital Marketing Profile`,
        text: profile.ai_bio,
        url: window.location.href,
      });
    } else {
      copyLink();
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-muted">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full"
        />
      </div>
    );
  }

  if (error || !profile) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-muted">
        <div className="text-center">
          <User className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
          <h1 className="text-2xl font-bold mb-2">Profile Not Found</h1>
          <p className="text-muted-foreground mb-6">This profile may have been removed or is not public.</p>
          <Button asChild>
            <Link to="/">Go to Home</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 py-12">
      <SEO 
        title={`${profile.full_name} - Digital Marketing Profile`}
        description={profile.ai_bio}
        url={window.location.href}
      />

      <div className="container-custom max-w-4xl">
        {/* Profile Header Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-card border border-border rounded-3xl overflow-hidden shadow-xl mb-8"
        >
          {/* Banner */}
          <div className="h-32 bg-gradient-to-r from-purple-600 via-pink-600 to-rose-500 relative">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml,...')] opacity-20" />
            <div className="absolute top-4 right-4 flex items-center gap-2">
              <Button onClick={copyLink} size="sm" variant="secondary" className="rounded-full bg-white/20 backdrop-blur-sm text-white hover:bg-white/30">
                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              </Button>
              <Button onClick={shareProfile} size="sm" variant="secondary" className="rounded-full bg-white/20 backdrop-blur-sm text-white hover:bg-white/30">
                <Share2 className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Profile Info */}
          <div className="px-8 pb-8 -mt-16 relative">
            {/* Avatar */}
            <div className="w-32 h-32 bg-gradient-to-br from-primary to-purple-600 rounded-3xl border-4 border-card flex items-center justify-center text-white text-5xl font-bold shadow-xl mb-4">
              {profile.full_name.charAt(0)}
            </div>

            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
              <div>
                <h1 className="font-heading text-3xl font-bold mb-1" data-testid="profile-name">{profile.full_name}</h1>
                <p className="text-primary font-medium text-lg mb-3">{profile.ai_linkedin_headline}</p>
                
                <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    {profile.location}
                  </span>
                  {profile.linkedin_url && (
                    <a href={profile.linkedin_url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:text-primary">
                      <Linkedin className="h-4 w-4" />
                      LinkedIn
                    </a>
                  )}
                  {profile.portfolio_url && (
                    <a href={profile.portfolio_url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:text-primary">
                      <Globe className="h-4 w-4" />
                      Portfolio
                    </a>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="text-center px-4 py-2 bg-primary/10 rounded-xl">
                  <Eye className="h-5 w-5 text-primary mx-auto mb-1" />
                  <span className="text-sm font-medium">{profile.profile_views} views</span>
                </div>
                <div className="px-3 py-1 bg-green-500/10 text-green-600 rounded-full text-sm font-medium">
                  Verified
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="md:col-span-2 space-y-6">
            {/* Bio */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-card border border-border rounded-2xl p-6"
            >
              <h2 className="font-heading font-semibold text-lg mb-3 flex items-center gap-2">
                <User className="h-5 w-5 text-primary" />
                About
              </h2>
              <p className="text-muted-foreground leading-relaxed">{profile.ai_bio}</p>
            </motion.div>

            {/* Career Goals */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-card border border-border rounded-2xl p-6"
            >
              <h2 className="font-heading font-semibold text-lg mb-3 flex items-center gap-2">
                <Target className="h-5 w-5 text-primary" />
                Career Goals
              </h2>
              <p className="text-muted-foreground mb-4">{profile.career_goals}</p>
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">Target Role:</span>
                <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">{profile.target_role}</span>
              </div>
            </motion.div>

            {/* Strengths */}
            {profile.ai_strengths && profile.ai_strengths.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-card border border-border rounded-2xl p-6"
              >
                <h2 className="font-heading font-semibold text-lg mb-3 flex items-center gap-2">
                  <Star className="h-5 w-5 text-amber-500" />
                  Key Strengths
                </h2>
                <div className="flex flex-wrap gap-2">
                  {profile.ai_strengths.map((strength, i) => (
                    <span key={i} className="px-4 py-2 bg-green-500/10 text-green-600 rounded-xl text-sm font-medium">
                      {strength}
                    </span>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Skills to Develop */}
            {profile.ai_skill_gaps && profile.ai_skill_gaps.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-card border border-border rounded-2xl p-6"
              >
                <h2 className="font-heading font-semibold text-lg mb-3 flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-primary" />
                  Skills to Develop
                </h2>
                <div className="flex flex-wrap gap-2">
                  {profile.ai_skill_gaps.map((skill, i) => (
                    <span key={i} className="px-4 py-2 bg-amber-500/10 text-amber-600 rounded-xl text-sm font-medium">
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Career Roadmap */}
            {profile.ai_career_roadmap && profile.ai_career_roadmap.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="bg-card border border-border rounded-2xl p-6"
              >
                <h2 className="font-heading font-semibold text-lg mb-4 flex items-center gap-2">
                  <Rocket className="h-5 w-5 text-primary" />
                  Personalized Career Roadmap
                </h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  {profile.ai_career_roadmap.map((phase, i) => (
                    <motion.div 
                      key={i} 
                      className="p-4 bg-muted/50 rounded-xl border border-border"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.6 + i * 0.1 }}
                    >
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-8 h-8 bg-gradient-to-br from-primary to-purple-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">
                          {i + 1}
                        </div>
                        <div>
                          <span className="text-xs text-muted-foreground block">{phase.phase}</span>
                          <h3 className="font-semibold">{phase.title}</h3>
                        </div>
                      </div>
                      <ul className="space-y-2">
                        {phase.goals?.map((goal, j) => (
                          <li key={j} className="text-sm text-muted-foreground flex items-start gap-2">
                            <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 shrink-0" />
                            {goal}
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-card border border-border rounded-2xl p-6"
            >
              <h2 className="font-heading font-semibold text-lg mb-4">Quick Info</h2>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <GraduationCap className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <span className="text-sm text-muted-foreground">Education</span>
                    <p className="font-medium capitalize">{profile.education_level?.replace('_', ' ')}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Briefcase className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <span className="text-sm text-muted-foreground">Career Stage</span>
                    <p className="font-medium capitalize">{profile.career_stage?.replace('_', ' ')}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <span className="text-sm text-muted-foreground">Availability</span>
                    <p className="font-medium capitalize">{profile.availability?.replace('_', ' ')}</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Interests */}
            {profile.interests && profile.interests.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-card border border-border rounded-2xl p-6"
              >
                <h2 className="font-heading font-semibold text-lg mb-3">Interests</h2>
                <div className="flex flex-wrap gap-2">
                  {profile.interests.map((interest, i) => (
                    <span key={i} className="px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium">
                      {interest}
                    </span>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Course Recommendation */}
            {profile.ai_course_recommendation && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-gradient-to-br from-primary/10 to-purple-500/10 border border-primary/20 rounded-2xl p-6"
              >
                <div className="flex items-center gap-2 mb-3">
                  <Sparkles className="h-5 w-5 text-primary" />
                  <h2 className="font-heading font-semibold">Recommended Course</h2>
                </div>
                <p className="text-sm text-muted-foreground mb-4">{profile.ai_course_recommendation}</p>
                <Button asChild className="w-full rounded-full bg-primary">
                  <Link to="/courses">
                    View Courses
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Link>
                </Button>
              </motion.div>
            )}

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-card border border-border rounded-2xl p-6 text-center"
            >
              <h3 className="font-semibold mb-2">Create Your Own Profile</h3>
              <p className="text-sm text-muted-foreground mb-4">Get AI-powered career guidance and professional profile</p>
              <Button asChild className="w-full rounded-full">
                <Link to="/?createProfile=true">
                  Create Profile
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Link>
              </Button>
            </motion.div>

            {/* Skillax Badge */}
            <div className="text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-muted rounded-full text-sm">
                <img 
                  src="https://customer-assets.emergentagent.com/job_72a42d6f-d52d-43a7-9830-99ee47bb23ab/artifacts/27yldfrm_image.png" 
                  alt="Skillax" 
                  className="h-5"
                />
                <span className="text-muted-foreground">Powered by Skillax AI</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
