# Askillax Digital Marketing Academy - Product Requirements Document

## Original Problem Statement
Build an ultra-premium digital marketing academy website for Askillax Academy based in Mananthavady, Kerala. The website should be visually stunning, animation-rich, and optimized for SEO, GEO (location-based targeting), and AEO (Answer Engine Optimization).

## Tech Stack (Implemented)
- **Frontend:** React (Create React App), Tailwind CSS, Framer Motion for animations
- **Backend:** FastAPI (Python)
- **Database:** MongoDB
- **Architecture:** Single Page Application (SPA) with REST API backend

## Branding Updates (Feb 2026)
- **Skillax → Askillax**: All references updated throughout the application
- **25+ → 30+**: Certifications and AI tools counts updated
- **2025 → 2026**: Year references updated for current batches

## Core Features Implemented ✅

### 1. Pages Structure
- **Home Page:** Hero with AI search demo, 30+ tools/certifications badges, courses showcase
- **About Page:** Kerala Digital Landscape map, 30+ AI tools grid, company timeline (IT company since 2020), leadership section
- **Courses Page:** 2 comprehensive programs with module accordions, certifications lists
- **Certifications Page:** 30+ certification logos in animated marquee, category filtering
- **AI & Tools Page:** 30+ AI tools, Askillax proprietary tools, SEO/AEO/GEO sections
- **Careers Page:** Career paths WITHOUT salary displays, career guidance modal, Infopark internship section
- **Blog Page:** Blog listing with Askillax Team attribution
- **Contact Page:** Contact form with lead capture, WhatsApp integration

### 2. Key Features ✅
- **AI Chatbot:** "Askillax AI" branding, 30+ certifications/tools mentions, March 2026 batch info
- **Lead Capture:** All forms save to MongoDB via /api/leads
- **Theme Toggle:** Light/Dark mode
- **WhatsApp Integration:** "Askillax Academy" in messages
- **Admin Portal:** "Askillax Admin" dashboard
- **Responsive Design:** Mobile-first approach
- **Animations:** Framer Motion throughout

### 3. Content Updates ✅
- **Kerala Digital Landscape:** Kochi (Infopark), Trivandrum (Technopark), Kozhikode (Cyberpark), Wayanad (Askillax HQ)
- **AI Tools (30+):** ChatGPT, Perplexity, Gemini, Copilot, Grok, Claude, ManyChat, Zoho, GitHub Copilot, Cursor AI, Midjourney, DALL-E, Canva AI, etc.
- **Askillax Proprietary Tools:** Lead Gen, Review AI, SEO AEO Suite, Content Engine, Directors Finder
- **Company Timeline:** IT company founded 2020 → Digital solutions 2021 → AI integration 2022 → Askillax Academy 2023 → Training excellence 2024 → AI Leadership 2025 → Expansion 2026
- **Careers:** Career paths without salary amounts (removed /month displays)

## API Endpoints
- `GET /api/courses` - List all courses
- `GET /api/courses/{slug}` - Get course by slug
- `POST /api/leads` - Create lead
- `POST /api/contact` - Submit contact form
- `POST /api/admin/login` - Admin authentication
- `GET /api/admin/leads` - List leads (authenticated)
- `GET /api/admin/analytics/summary` - Get analytics
- `POST /api/chat` - Chatbot endpoint
- `GET /api/blogs` - List blogs
- `POST /api/blogs` - Create blog (admin)

## Test Credentials
- **Admin Email:** admin@skillax.in
- **Admin Password:** SkillaxAdmin2024!
- **Contact Email:** contact@askillax.in

## Testing Status
- **Backend:** 100% (19/19 pytest tests passed)
- **Frontend:** 100% (all UI components verified)
- **Last Test Report:** /app/test_reports/iteration_4.json

## P2 - Future/Backlog Tasks

### High Priority
1. **Full Admin CMS:** Allow editing page content, SEO metadata, blog posts directly from admin
2. **Custom Analytics Dashboard:** Google Analytics 4 integration with custom charts
3. **Full schema.org SEO markup:** Organization, Course, FAQ, LocalBusiness schemas

### Medium Priority
4. **Course Enrollment System:** Payment integration for direct enrollment
5. **Blog Management:** Full CRUD in admin, categories, tags
6. **Email Notifications:** Send confirmation emails on lead submission

### Lower Priority
7. **Resume/LinkedIn Upload:** Allow candidates to upload resume for assessment
8. **Testimonials CMS:** Manage testimonials from admin
9. **Performance Optimization:** Additional lazy loading, image optimization

## Code Architecture
```
/app/
├── backend/
│   ├── server.py          # Main FastAPI application
│   ├── .env               # Environment variables
│   ├── requirements.txt   # Python dependencies
│   └── tests/             # Pytest tests
└── frontend/
    ├── src/
    │   ├── pages/         # Page components (Home, About, Courses, Certifications, AITools, Careers, Blog, Contact, Admin)
    │   ├── components/    # Shared components (Navbar, Footer, Chatbot, LeadForm, WhatsAppButton)
    │   ├── contexts/      # Theme context
    │   └── App.js         # Main router
    ├── package.json       # Node dependencies
    └── tailwind.config.js # Tailwind configuration
```

## Recent Changes (Feb 2026)
1. ✅ Changed all "Skillax" → "Askillax" branding
2. ✅ Updated certifications from 25+ → 30+
3. ✅ Updated AI tools from 25+ → 30+
4. ✅ Updated year references from 2025 → 2026
5. ✅ Added more AI tools (ManyChat, Zoho, GitHub Copilot, testing tools)
6. ✅ Created Kerala Digital Landscape map with 4 locations
7. ✅ Updated timeline to show IT company journey from 2020
8. ✅ Removed salary/month displays from Careers page
9. ✅ Added Askillax proprietary tools (Lead Gen, Review AI, SEO AEO Suite, Content Engine, Directors Finder)
10. ✅ Updated Chatbot to show "Askillax AI" with 30+ certifications
