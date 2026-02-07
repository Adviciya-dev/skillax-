import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import Chatbot from './Chatbot';
import WhatsAppButton from './WhatsAppButton';

export default function Layout({ children }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-20">
        {children}
      </main>
      <Footer />
      <Chatbot />
      <WhatsAppButton />
    </div>
  );
}
