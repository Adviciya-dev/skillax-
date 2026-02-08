# Skillax Digital Marketing Academy - Product Requirements Document

## Original Problem Statement
Build an "ultra-premium" digital marketing academy website for Skillax Academy based in Mananthavady, Kerala. The website should be visually stunning, animation-rich, and heavily optimized for SEO, GEO, and AEO.

## Tech Stack
- **Frontend:** React with Tailwind CSS, Framer Motion, react-helmet-async
- **Backend:** FastAPI (Python)
- **Database:** MongoDB
- **AI:** OpenAI GPT-4o (via Emergent LLM Key)

---

## ✅ All Features Implemented (Feb 8, 2026)

### 1. Ultra-Premium UI/UX
- Home page with rotating hero text, AI Search Demo, global transformation infographics
- Courses page with floating elements, parallax scrolling, premium course cards
- CourseDetail page with gradient hero, interactive curriculum, lead capture
- Glassmorphism, gradients, micro-animations throughout

### 2. Admin CMS (Full End-to-End Coverage)

**Dashboard Overview:**
- Total Leads, Page Views, Unique Visitors, Conversion Rate, Blog Posts
- Leads by Source chart with percentages
- Top Pages, Recent Leads

**Analytics Dashboard:**
- Lead Conversion Funnel (New → Contacted → Converted → Lost)
- Leads Trend (Last 7 Days) with daily breakdown
- Most Visited Pages with view counts
- Traffic Sources breakdown (Website, Chatbot, AI Profile Creator, etc.)

**Lead Management:**
- Search and filter by name/email/status
- Status updates (New/Contacted/Converted/Lost)
- CSV Export functionality

**AI Profiles Tab:**
- Total Profiles, Students, Freshers, Professionals counts
- Recent Profiles list with profile codes, target roles, view counts
- Direct link to public profiles

**Courses Tab:**
- Course list with title, duration, status (Active/Inactive)
- External preview links
- Note about pre-configured content

**Settings Tab (SEO Editor):**
- Site Information: Name, Tagline, Contact Email, Phone, WhatsApp, Address
- SEO Settings: Meta Title (60 char limit), Meta Description (160 char), Keywords, GA4 ID
- Social Media Links: Facebook, Instagram, LinkedIn, YouTube
- Save Settings functionality

### 3. AI Profile Creator (Lead Magnet)

**5-Step Multi-Form:**
1. Basic Info: Name, Email, Phone, Location, LinkedIn, Portfolio
2. Education: Level, Field of Study, Institution
3. Career Goals: Career Stage, Current Role, Target Role, Goals
4. Skills & Interests: Current Skills, Areas of Interest, Learning Style
5. Final Details: Why Digital Marketing, Availability

**AI-Generated Content (GPT-4o):**
- Professional Bio (3-4 sentences)
- LinkedIn Headline
- Key Strengths (4 points)
- Skills to Develop (5 points)
- Personalized Career Roadmap (4 phases)
- Course Recommendation with justification

**Profile Output:**
- Unique Profile Code (SKX{8-hex})
- Public shareable URL: /profile/{profile_code}
- Copy/Share buttons
- View counter
- Verified badge

### 4. Hooks and Funnels

**Floating Action Button (FAB):**
- Find Your Course (Quiz)
- AI Marketing Lab
- Create AI Profile *(NEW)*

**Strategic CTAs:**
- Quiz CTA Banner after hero ("Limited Founding Batch - March 2026")
- AI Lab CTA Section with feature highlights
- Enrollment CTA before footer

### 5. AI Marketing Lab (6 Tools)

1. AI Ad Copy Generator - Google Ads & Meta Ads
2. AI Blog Outline Creator - SEO-optimized structures
3. 🔥 AI Lead Magnet Generator - 5 irresistible lead magnet ideas
4. AI Social Media Generator - Multi-platform posts
5. AI SEO Keyword Analyzer - Keywords with AEO tips
6. 🚀 AI Competitor Analyzer - Strategic insights

### 6. SEO & Performance

- react-helmet-async for dynamic meta tags
- Page-specific JSON-LD schemas
- robots.txt and sitemap.xml
- LazyImage component for lazy loading

### 7. Hidden Admin Access
- Settings icon in footer (low opacity) → /admin

---

## API Endpoints

### Public
- `POST /api/leads` - Create lead
- `POST /api/contact` - Submit contact form
- `POST /api/chat` - AI chatbot
- `GET /api/courses` - All courses
- `GET /api/courses/:slug` - Course by slug
- `GET /api/blogs` - Published blogs
- `POST /api/track/pageview` - Track page view
- `POST /api/profiles` - Create student profile (with AI generation)
- `GET /api/profiles/:code` - Get public profile
- `GET /api/settings` - Get site settings

### Admin (Protected)
- `POST /api/admin/login` - Login
- `GET /api/leads` - All leads with filters
- `PATCH /api/leads/:id/status` - Update status
- `GET /api/analytics/*` - All analytics endpoints
- `GET/POST/PUT/DELETE /api/blogs/*` - Blog CRUD
- `GET /api/admin/profiles` - All student profiles
- `GET /api/analytics/profiles` - Profile analytics
- `PUT /api/admin/settings` - Update site settings

---

## Database Collections
- `admins` - Admin users
- `leads` - Lead captures
- `courses` - Course catalog
- `blogs` - Blog posts
- `page_views` - Visitor tracking
- `student_profiles` - AI-generated student profiles
- `site_settings` - SEO and site configuration

## Admin Credentials
- **Email:** admin@skillax.in
- **Password:** SkillaxAdmin2024!

---

## Testing Results (Feb 8, 2026)
- **Backend:** 43/43 tests passed (100%)
- **Frontend:** All features verified (100%)
- **Test Report:** `/app/test_reports/iteration_10.json`

---

## Future/Backlog (P3)
- [ ] GA4 deep integration for real-time analytics
- [ ] Free SEO/AEO Audit Tool as lead magnet
- [ ] Course content management (modules, pricing)
- [ ] Email notification system for new leads

---

## Third-Party Integrations
- **OpenAI GPT-4o:** AI chatbot, Marketing Lab, Profile Creator (via Emergent LLM Key)
- **Framer Motion:** Frontend animations
- **react-helmet-async:** Dynamic SEO tags

---

*Last Updated: February 8, 2026*
*Version: 5.0 - Final Build with AI Profile Creator*
