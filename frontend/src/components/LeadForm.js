import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Loader2, CheckCircle } from 'lucide-react';
import { Button } from '../components/ui/button';
import axios from 'axios';

const API = "https://ltz6k4u2e5.execute-api.ap-south-1.amazonaws.com/api";

const interests = [
  'Professional Digital Marketing (4 Months)',
  'Advanced AI-Powered Marketing (2 Months)',
  'Free Career Counseling',
  'Corporate Training',
  'General Enquiry',
];

export default function LeadForm({ source = 'website', onSuccess }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    interest: '',
    message: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.phone || !formData.interest) {
      setError('Please fill in all required fields');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      await axios.post(`${API}/leads`, {
        ...formData,
        source,
      });
      setIsSuccess(true);
      setFormData({ name: '', email: '', phone: '', interest: '', message: '' });
      if (onSuccess) onSuccess();
    } catch (err) {
      console.error('Lead submission error:', err);
      setError('Something went wrong. Please try again or contact us directly.');
    } finally {
      setIsLoading(false);
    }
  };

  if (isSuccess) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-8"
      >
        <div className="inline-flex items-center justify-center w-16 h-16 bg-brand-success/10 rounded-full mb-4">
          <CheckCircle className="h-8 w-8 text-brand-success" />
        </div>
        <h3 className="font-heading font-semibold text-xl mb-2">Thank You!</h3>
        <p className="text-muted-foreground">
          We've received your enquiry and will get back to you within 24 hours.
        </p>
        <Button
          variant="outline"
          onClick={() => setIsSuccess(false)}
          className="mt-4"
        >
          Submit Another Enquiry
        </Button>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4" data-testid="lead-form">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1.5">
            Full Name <span className="text-destructive">*</span>
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Your name"
            data-testid="lead-form-name"
            className="w-full input-base"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1.5">
            Email <span className="text-destructive">*</span>
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="your@email.com"
            data-testid="lead-form-email"
            className="w-full input-base"
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1.5">
            Phone <span className="text-destructive">*</span>
          </label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="+91 XXXXX XXXXX"
            data-testid="lead-form-phone"
            className="w-full input-base"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1.5">
            Interested In <span className="text-destructive">*</span>
          </label>
          <select
            name="interest"
            value={formData.interest}
            onChange={handleChange}
            data-testid="lead-form-interest"
            className="w-full input-base"
            required
          >
            <option value="">Select a course</option>
            {interests.map((interest) => (
              <option key={interest} value={interest}>
                {interest}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1.5">Message (Optional)</label>
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder="Any specific questions or requirements..."
          data-testid="lead-form-message"
          className="w-full input-base min-h-[100px] resize-none"
          rows={3}
        />
      </div>

      {error && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-sm text-destructive"
        >
          {error}
        </motion.p>
      )}

      <Button
        type="submit"
        data-testid="lead-form-submit"
        className="w-full bg-primary hover:bg-primary/90 text-primary-foreground rounded-full py-6 font-semibold"
        disabled={isLoading}
      >
        {isLoading ? (
          <>
            <Loader2 className="h-5 w-5 animate-spin mr-2" />
            Submitting...
          </>
        ) : (
          <>
            <Send className="h-5 w-5 mr-2" />
            Get Started
          </>
        )}
      </Button>
    </form>
  );
}
