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
- **Location:** Mananthavady, Wayanad, Kerala 670645

## Latest Update (Feb 8, 2026) - Major Home Page Overhaul

### New Features Added:

1. **Rotating Hero Text** (8 hooks cycling):
   - 30+ AI Tools
   - 30+ Certifications
   - Infopark Internship
   - ChatGPT Ads Training (NEW!)
   - SEO AEO GEO Mastery (NEW!)
   - Google & Meta Ads (NEW!)
   - AI Agent Building
   - Performance Marketing (NEW!)
   - ❌ Removed: "100% Placement"

2. **AI Search Demo with Typing Animation**:
   - Shows queries like "best digital marketing training Kerala", "Skillax digital marketing Mananthavady"
   - AI recommends: "Skillax Academy, Mananthavady, Wayanad"
   - Tags: Training, Kerala, AI, SEO

3. **Core Digital Marketing Skills Section**:
   - SEO (On-Page, Off-Page, Technical SEO)
   - AEO (Answer Engine Optimization)
   - GEO (Local & Generative Engine)
   - GMB (Google My Business)
   - Google Ads (Search, Display, YouTube)
   - Meta Ads (Facebook & Instagram)
   - ChatGPT Ads (The Next Big Trend!)
   - Performance (ROI & Analytics)

4. **ChatGPT Ads Section** (Deep green gradient background):
   - "The Next Big Trend" badge
   - "ChatGPT Ads are Coming!" headline
   - 4 feature cards: Conversational Targeting, AI-Powered Creatives, Cross-Platform Reach, Intent-Based Bidding
   - "Learn it first at Skillax" CTA

5. **Interactive Course Quiz with Lead Capture**:
   - 4 questions: Experience level, Goal, Interest, Time commitment
   - Calculates best course recommendation
   - Shows "Perfect Match Found!" with course details
   - Captures Name, Email, Phone before showing full results
   - Saves lead to database with quiz answers

6. **Updated Student Roadmap** (6 phases):
   - Foundation (Week 1-3): Digital Marketing Fundamentals
   - SEO Mastery (Week 4-6): SEO, AEO, GEO, GMB
   - Paid Ads (Week 7-9): Google Ads, Meta Ads, ChatGPT Ads
   - AI Tools (Week 10-12): ChatGPT, Perplexity, Automation
   - Advanced (Week 13-14): Agent Building, Analytics
   - Internship (Week 15-18): Infopark Real-World Experience

7. **Running Text Marquee**:
   - "SEO AEO GEO" | "GOOGLE ADS" | "META ADS" | "AI MARKETING" | "CHATGPT ADS"

8. **Updated Course Descriptions**:
   - Professional: SEO, AEO, GEO, GMB, Google Ads, Meta Ads, ChatGPT Ads, 30+ AI tools, blog writing, website building
   - AI-Powered: 30+ AI tools, AEO, Agent Building, Automation

## Core Pages
- **Home:** Hero with rotating hooks, AI Search Demo, Core Skills, ChatGPT Ads, Roadmap, Courses, Lead Form
- **Courses:** Two programs with comparison table
- **About:** Kerala Digital Landscape, Timeline, Leadership
- **Certifications:** 30+ certification marquee
- **AI & Tools:** 30+ AI tools showcase
- **Careers:** Career paths, Infopark internship
- **Blog:** Blog listing
- **Contact:** Lead form, WhatsApp integration
- **Admin:** Dashboard with statistics

## Technical SEO
- ✅ robots.txt
- ✅ sitemap.xml
- ✅ Canonical tags
- ✅ Geo targeting (Kerala)
- ✅ Schema.org (Organization, LocalBusiness, Course, FAQ)
- ✅ Open Graph & Twitter cards

## API Endpoints
- `GET /api/courses`, `POST /api/leads`, `POST /api/contact`
- `POST /api/admin/login`, `GET /api/admin/leads`, `GET /api/admin/analytics/summary`
- `POST /api/chat`, `GET /api/blogs`

## Test Credentials
- **Admin:** admin@skillax.in / SkillaxAdmin2024!

## Testing Status (Feb 8, 2026)
- **Backend:** 100% (17/17 tests passed)
- **Frontend:** 100% (all features working)
- **Last Report:** /app/test_reports/iteration_7.json

## P2 - Future Tasks
1. **Full Admin CMS** - Content management for courses, blog posts, pages
2. **GA4 Analytics Dashboard** - Google Analytics integration
3. **Blog Management** - Full CRUD with categories and tags
4. **Image Optimization** - WebP format, enhanced lazy loading
5. **Course Enrollment** - Payment integration
6. **Email Notifications** - Confirmation emails on lead submission

## 3rd Party Integrations
- **OpenAI GPT:** AI chatbot via Emergent LLM key
- **Framer Motion:** Frontend animations
- **MongoDB:** Database
