# Skillax Digital Marketing Academy - Product Requirements Document

## Original Problem Statement
Build an "ultra-premium" digital marketing academy website for Skillax Academy based in Mananthavady, Kerala. The website should be visually stunning, animation-rich, and heavily optimized for SEO, GEO (location-based targeting), and AEO (Answer Engine Optimization).

## Tech Stack
- **Frontend:** React with Tailwind CSS and Framer Motion
- **Backend:** FastAPI (Python)
- **Database:** MongoDB
- **Architecture:** Single Page Application (SPA) with REST API

## User Personas
1. **Students & Freshers (18-25):** Looking to start a career in digital marketing
2. **Working Professionals:** Want to upskill with AI-powered marketing tools
3. **Business Owners:** Need to understand digital marketing for their business
4. **Career Changers:** Transitioning from other fields to digital marketing

## Core Features Implemented

### ✅ Public Website
- **Home Page:** Ultra-premium design with rotating hero text, AI search demo, global transformation infographics, student roadmap, AI agent building sections
- **Courses Page:** Two premium courses with interactive curriculum, comparison table, testimonials
- **Course Detail Page:** Gradient hero, stats, lead capture form, module cards, certifications, FAQs
- **AI Marketing Lab:** Interactive content generator (ad copy, blog outlines) demonstrating AI capabilities
- **Course Quiz:** Multi-step quiz for lead capture and course recommendations
- **Floating Actions:** FAB menu for quick access to quiz and AI lab
- **Chatbot:** AI-powered assistant using GPT-4o for visitor engagement
- **WhatsApp Integration:** Quick contact button
- **Contact Page:** Lead capture form with course selection

### ✅ Admin CMS (Full Implementation - Feb 2026)
- **Dashboard Overview:**
  - Total Leads with new lead count
  - Page Views with unique visitors
  - Conversion Rate with converted count
  - Blog Posts count
  - Leads by Source chart with percentages
  - Top Pages section
  - Recent Leads list

- **Analytics Dashboard:**
  - Total Page Views & Unique Visitors
  - Lead Conversion Funnel (New/Contacted/Converted/Lost)
  - Leads Trend (Last 7 Days)
  - Most Visited Pages
  - Traffic Sources breakdown

- **Lead Management:**
  - Full leads table with search and filters
  - Status management (New/Contacted/Converted/Lost)
  - Export to CSV functionality
  - Contact info, interest, source tracking

- **Blog Management:**
  - Blog list with featured images
  - Create/Edit blog posts
  - Rich text editor with Markdown support
  - Category and tag management
  - Publish/Unpublish toggle
  - Delete functionality

- **Visitor Tracking:**
  - Automatic page view tracking
  - Session-based unique visitor identification
  - Path, referrer, and user agent logging

### ✅ SEO Foundations
- robots.txt and sitemap.xml
- Enhanced meta tags in index.html
- Schema.org markup (basic)

## API Endpoints

### Public Endpoints
- `POST /api/leads` - Create lead
- `POST /api/contact` - Submit contact form
- `POST /api/chat` - Chat with AI bot
- `GET /api/courses` - Get all courses
- `GET /api/courses/:slug` - Get course by slug
- `GET /api/blogs` - Get published blogs
- `GET /api/blogs/:slug` - Get blog by slug
- `POST /api/track/pageview` - Track page view

### Admin Endpoints (Protected)
- `POST /api/admin/login` - Admin login
- `GET /api/admin/me` - Get admin profile
- `GET /api/leads` - Get all leads with filters
- `PATCH /api/leads/:id/status` - Update lead status
- `GET /api/analytics/summary` - Dashboard stats
- `GET /api/analytics/lead-conversion` - Conversion funnel
- `GET /api/analytics/leads-by-source` - Traffic sources
- `GET /api/analytics/leads-by-interest` - Leads by interest
- `GET /api/analytics/top-pages` - Most visited pages
- `GET /api/analytics/page-views` - Page views trend
- `GET /api/admin/blogs` - Get all blogs (including drafts)
- `POST /api/blogs` - Create blog
- `PUT /api/blogs/:id` - Update blog
- `DELETE /api/blogs/:id` - Delete blog
- `PATCH /api/blogs/:id/publish` - Toggle publish status

## Database Collections
- `admins` - Admin users
- `leads` - Lead captures
- `courses` - Course catalog
- `blogs` - Blog posts
- `page_views` - Visitor tracking

## Admin Credentials
- **Email:** admin@skillax.in
- **Password:** SkillaxAdmin2024!

---

## Completed Tasks (Feb 2026)

### Session 1 (Initial Build)
- ✅ Basic site structure and pages
- ✅ Lead capture forms
- ✅ AI chatbot integration
- ✅ Course catalog

### Session 2 (UI/UX Overhaul)
- ✅ Ultra-premium Home page with animations
- ✅ Ultra-premium Courses page with floating elements
- ✅ AI Marketing Lab implementation
- ✅ Course Quiz with lead capture
- ✅ Floating Actions component
- ✅ Basic SEO setup (robots.txt, sitemap.xml)

### Session 3 (Admin CMS - Current)
- ✅ Verified CourseDetail page UI
- ✅ Full Admin CMS implementation:
  - Dashboard Overview with all stats
  - Analytics Dashboard with conversion funnel
  - Lead Management with CRUD and export
  - Blog Management with rich editor
  - Visitor tracking system
- ✅ All backend endpoints for analytics
- ✅ Testing: 31/31 backend tests passing

---

## Upcoming Tasks (P1-P2)

### P1: Lead-Capture Integration
- [ ] Embed Course Quiz CTAs on Home, Courses, Blog pages
- [ ] Add AI Lab banners throughout the site
- [ ] Strategic placement of lead magnets

### P2: SEO & Performance
- [ ] Implement lazy loading for all images
- [ ] Add react-helmet for dynamic meta tags
- [ ] Page-specific JSON-LD schemas
- [ ] Core Web Vitals optimization
- [ ] Image optimization and compression

### P2: AI Lab Enhancement
- [ ] Add "AI Lead Magnet Idea Generator"
- [ ] Implement "AI Competitor Analyzer"
- [ ] More "WOW factor" features

### P3: Advanced Features
- [ ] Course editor in Admin CMS
- [ ] GA4 integration for analytics
- [ ] Free SEO/AEO Audit Tool
- [ ] Geographic visitor analytics

---

## Known Limitations
1. **Tech Stack:** Uses React/FastAPI/MongoDB instead of Next.js/PostgreSQL (limits SSR for advanced SEO)
2. **Course Management:** Courses are hardcoded in frontend; Admin course editor planned for future
3. **GA4:** Not yet integrated; using custom analytics

## Third-Party Integrations
- **OpenAI GPT-4o:** AI chatbot and Marketing Lab (via Emergent LLM Key)
- **Framer Motion:** Frontend animations
- **MongoDB:** Database

---

*Last Updated: February 8, 2026*
*Version: 3.0*
