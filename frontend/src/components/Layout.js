import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import Chatbot from './Chatbot';
import WhatsAppButton from './WhatsAppButton';
import FloatingActions from './FloatingActions';

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

// Generate or get session ID for visitor tracking
const getSessionId = () => {
  let sessionId = sessionStorage.getItem('visitor_session');
  if (!sessionId) {
    sessionId = 'sess_' + Math.random().toString(36).substr(2, 9) + Date.now().toString(36);
    sessionStorage.setItem('visitor_session', sessionId);
  }
  return sessionId;
};

export default function Layout({ children }) {
  const location = useLocation();

  // Track page views
  useEffect(() => {
    const trackPageView = async () => {
      try {
        await fetch(`${API}/track/pageview`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            path: location.pathname,
            referrer: document.referrer || null,
            user_agent: navigator.userAgent,
            session_id: getSessionId()
          })
        });
      } catch (error) {
        // Silently fail - tracking should not affect user experience
        console.debug('Page view tracking failed:', error);
      }
    };

    trackPageView();
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-20">
        {children}
      </main>
      <Footer />
      <Chatbot />
      <WhatsAppButton />
      <FloatingActions />
    </div>
  );
}
