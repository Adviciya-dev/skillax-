import React, { useEffect } from "react";
import "@/App.css";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { ThemeProvider } from "./contexts/ThemeContext";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import About from "./pages/About";
import Courses from "./pages/Courses";
import CourseDetail from "./pages/CourseDetail";
import Certifications from "./pages/Certifications";
import AITools from "./pages/AITools";
import Careers from "./pages/Careers";
import Blog from "./pages/Blog";
import Contact from "./pages/Contact";
import Admin from "./pages/Admin";
import { Toaster } from "./components/ui/sonner";

// Scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          {/* Admin route without Layout */}
          <Route path="/admin" element={<Admin />} />
          
          {/* Public routes with Layout */}
          <Route path="/" element={<Layout><Home /></Layout>} />
          <Route path="/about" element={<Layout><About /></Layout>} />
          <Route path="/courses" element={<Layout><Courses /></Layout>} />
          <Route path="/courses/:slug" element={<Layout><CourseDetail /></Layout>} />
          <Route path="/certifications" element={<Layout><Certifications /></Layout>} />
          <Route path="/blog" element={<Layout><Blog /></Layout>} />
          <Route path="/blog/:slug" element={<Layout><Blog /></Layout>} />
          <Route path="/contact" element={<Layout><Contact /></Layout>} />
          
          {/* Catch-all route */}
          <Route path="*" element={<Layout><Home /></Layout>} />
        </Routes>
        <Toaster />
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
