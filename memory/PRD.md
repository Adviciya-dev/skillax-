# Skillax Digital Marketing Academy - Product Requirements Document

## Original Problem Statement
Build an ultra-premium digital marketing academy website for Skillax Academy based in Mananthavady, Kerala. The website should be visually stunning, animation-rich, and optimized for SEO, GEO (location-based targeting), and AEO (Answer Engine Optimization).

## Tech Stack
- **Frontend:** React (Create React App), Tailwind CSS, Framer Motion
- **Backend:** FastAPI (Python)
- **Database:** MongoDB
- **Architecture:** Single Page Application (SPA) with REST API

## Branding
- **Brand Name:** Skillax
- **Email:** contact@skillax.in
- **Admin Email:** admin@skillax.in
- **Location:** Mananthavady, Wayanad, Kerala 670645

## Core Features Implemented

### 1. Home Page (Comprehensive Overhaul - Feb 8, 2026)
- **Rotating Hero Text:** 8 dynamic hooks cycling through:
  - 30+ AI Tools, 30+ Certifications, Infopark Internship, 100% Placement
  - AI Agent Building, Virtual Agents, Personal AI Assistants, Corporate Ready Skills
- **Global Digital Transformation Section:** Interactive region tabs for:
  - 🇺🇸 United States (340% AI Jobs Growth, $320B Digital Ad Spend, 78% AI Adoption)
  - 🇨🇦 Canada (156% Tech Job Growth, $18B Marketing Tech, 67% Remote Work)
  - 🇦🇪 UAE & GCC ($140B Digital Economy, 180% AI Investment, 2.5M Tech Workforce)
  - 🇸🇦 Saudi Arabia ($500B Vision 2030, 1.2M Digital Jobs, 92% AI Adoption)
  - 🇮🇳 India ($1T Digital Market, 10M+ AI Professionals, 450% AI Startups)
- **Student Roadmap:** 5-phase transformation journey:
  - Foundation (Week 1-4): Digital Marketing Fundamentals
  - Growth (Week 5-8): AI Tools & Automation Mastery
  - Specialization (Week 9-12): SEO, AEO & GEO Optimization
  - Advanced (Week 13-14): AI Agent Building
  - Internship (Week 15-18): Infopark Real-World Experience
- **AI Agent Building Section:** 4 feature cards with purple gradient background:
  - Virtual Sales Agents, Personal AI Assistants
  - Marketing Automation Bots, Data Analysis Agents
  - Stats: 85% Companies Seeking Agent Builders, 3x Higher Salaries, 500% Growth, 24/7 Work
- **Running text marquee:** DIGITAL TRANSFORMATION, AGENT BUILDING, GLOBAL CAREERS, AI MARKETING

### 2. Courses Page
- **Rich Parallax Hero:** Floating icons (Rocket, Brain, Trophy, Crown), animated orbs
- **Interactive Course Cards:** Glow effects, animated accordions, gradient badges
- **Course Comparison Table:** Side-by-side comparison of Professional vs AI-Powered courses
- **AI Tools Grid:** 12 tools with individual gradient icons
- **"What Sets Us Apart" Features:** 8 animated feature cards

### 3. Technical SEO Implementation
- **robots.txt:** Created at /robots.txt with proper crawl directives
- **sitemap.xml:** Created at /sitemap.xml with all public pages
- **Canonical Tags:** Added to index.html
- **Geo Targeting:** IN-KL (Kerala) with coordinates (11.7970, 76.0054)
- **Schema.org Markup:**
  - EducationalOrganization schema
  - LocalBusiness schema
  - Course schemas (2 courses)
  - FAQPage schema (4 FAQs)
- **Open Graph Tags:** Enhanced with image dimensions, URL, locale
- **Twitter Cards:** Enhanced with site/creator handles, image alt text
- **Meta Tags:** Comprehensive keywords including AI agent building, AEO, GEO

### 4. Other Pages
- **About Page:** Kerala Digital Landscape map, timeline, leadership section
- **Certifications Page:** 30+ certification marquee
- **AI & Tools Page:** 30+ AI tools, SEO/AEO/GEO sections
- **Careers Page:** Career paths, Infopark internship
- **Blog Page:** Blog listing with categories
- **Contact Page:** Lead form with WhatsApp integration
- **Admin Portal:** Dashboard with lead statistics

### 5. Key Features
- **AI Chatbot:** "Skillax AI" branding, March 2026 batch info
- **Lead Capture:** All forms save to MongoDB
- **Theme Toggle:** Light/Dark mode
- **WhatsApp Integration:** Click-to-chat
- **Emergent Branding:** REMOVED from all pages

## API Endpoints
- `GET /api/courses` - List all courses
- `POST /api/leads` - Create lead
- `POST /api/contact` - Submit contact form
- `POST /api/admin/login` - Admin authentication
- `GET /api/admin/leads` - List leads (authenticated)
- `POST /api/chat` - Chatbot endpoint (OpenAI GPT)
- `GET /api/blogs` - List blogs

## Test Credentials
- **Admin Email:** admin@skillax.in
- **Admin Password:** SkillaxAdmin2024!

## Testing Status (Feb 8, 2026)
- **Backend:** 100% (19/19 pytest tests passed)
- **Frontend:** 100% (all pages and features working)
- **Last Test Report:** /app/test_reports/iteration_6.json

## Completed Work (Feb 8, 2026)
1. ✅ Rotating hero text with 8 value proposition hooks
2. ✅ Global Digital Transformation infographics (5 regions)
3. ✅ Student Roadmap to Full Stack Digital Strategist
4. ✅ AI Agent Building curriculum section
5. ✅ Course Comparison table (side-by-side)
6. ✅ Removed Emergent branding from all pages
7. ✅ Created robots.txt for SEO
8. ✅ Created sitemap.xml for SEO
9. ✅ Added canonical tags and geo targeting
10. ✅ Enhanced Schema.org markup (2 courses, FAQs)
11. ✅ Enhanced Open Graph and Twitter cards

## P2 - Future/Backlog Tasks

### High Priority
1. **Full Admin CMS:** Content management for courses, blog posts, pages
2. **GA4 Analytics Dashboard:** Google Analytics integration with custom charts
3. **Blog Management:** Full CRUD with categories and tags

### Medium Priority
4. **Course Enrollment System:** Payment integration
5. **Email Notifications:** Send confirmation emails on lead submission
6. **Image Optimization:** WebP format, lazy loading enhancements

### Lower Priority
7. **Resume/LinkedIn Upload:** For career page
8. **Testimonials CMS:** Manage testimonials from admin
9. **Performance Optimization:** Additional Core Web Vitals improvements

## Code Architecture
```
/app/
├── backend/
│   ├── server.py
│   ├── .env
│   ├── requirements.txt
│   └── tests/
└── frontend/
    ├── public/
    │   ├── index.html (SEO enhanced)
    │   ├── robots.txt (NEW)
    │   └── sitemap.xml (NEW)
    ├── src/
    │   ├── pages/
    │   │   ├── Home.js (Major overhaul)
    │   │   ├── Courses.js (Comparison table added)
    │   │   └── ...
    │   └── components/
    └── package.json
```

## 3rd Party Integrations
- **OpenAI GPT:** AI chatbot via Emergent LLM key
- **Framer Motion:** Frontend animations
- **MongoDB:** Database

## SEO Compliance Checklist
- ✅ SEO-Friendly URL Structure
- ✅ robots.txt Configuration
- ✅ XML Sitemap Generation
- ✅ HTTPS Implementation (via Kubernetes)
- ✅ Canonical Tag Setup
- ✅ Schema.org Markup (Organization, LocalBusiness, Course, FAQ)
- ✅ Open Graph Tags
- ✅ Twitter Cards
- ✅ Geo Targeting Meta Tags
- ⏳ Core Web Vitals (further optimization possible)
- ⏳ Image Optimization (lazy loading partial)
