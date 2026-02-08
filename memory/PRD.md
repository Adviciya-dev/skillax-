# Skillax Digital Marketing Academy - Product Requirements Document

## Original Problem Statement
Build an ultra-premium digital marketing academy website for Skillax Academy based in Mananthavady, Kerala. The website should be visually stunning, animation-rich, and optimized for SEO, GEO (location-based targeting), and AEO (Answer Engine Optimization).

## Tech Stack (Implemented)
- **Frontend:** React (Create React App), Tailwind CSS, Framer Motion for animations
- **Backend:** FastAPI (Python)
- **Database:** MongoDB
- **Architecture:** Single Page Application (SPA) with REST API backend

## Branding
- **Brand Name:** Skillax (not Askillax)
- **Email:** contact@skillax.in
- **Admin Email:** admin@skillax.in
- **Location:** Mananthavady, Wayanad, Kerala 670645

## Core Features Implemented

### 1. Pages Structure
- **Home Page:** Hero with AI search demo, Founding Batch March 2026 section, 30+ tools/certifications badges, courses showcase, lead form
- **About Page:** Kerala Digital Landscape map, company timeline (IT company since 2020), leadership section, internship hub info (Kochi Infopark)
- **Courses Page:** Rich animated UI with parallax hero, floating orbs, glow cards, animated accordions, AI tools grid, 2 comprehensive programs
- **Certifications Page:** 30+ certification logos in animated marquee, category filtering
- **AI & Tools Page:** 30+ AI tools, Skillax proprietary tools, SEO/AEO/GEO sections
- **Careers Page:** Career paths without salary displays, career guidance modal, Infopark internship section
- **Blog Page:** Blog listing with Skillax Team attribution
- **Contact Page:** Contact form with lead capture, WhatsApp integration, location info

### 2. Key Features
- **AI Chatbot:** "Skillax AI" branding, 30+ certifications/tools mentions, March 2026 batch info
- **Lead Capture:** All forms save to MongoDB via /api/leads
- **Theme Toggle:** Light/Dark mode with smooth transitions
- **WhatsApp Integration:** "Skillax Academy" in messages
- **Admin Portal:** Dashboard with lead statistics
- **Responsive Design:** Mobile-first approach
- **Rich Animations:** Framer Motion throughout - parallax, floating orbs, glow effects, stagger animations

### 3. Content Details
- **Kerala Digital Landscape:** Kochi (Infopark), Trivandrum (Technopark), Kozhikode (Cyberpark), Wayanad (Skillax HQ)
- **AI Tools (30+):** ChatGPT, Perplexity, Gemini, Copilot, Grok, Claude, Midjourney, DALL-E, Canva AI, Jasper, Copy.ai, HubSpot
- **Company Timeline:** IT company founded 2020 → Digital solutions 2021 → AI integration 2022 → Skillax Academy 2023 → Training excellence 2024 → AI Leadership 2025 → Expansion 2026

## API Endpoints
- `GET /api/courses` - List all courses
- `GET /api/courses/{slug}` - Get course by slug
- `POST /api/leads` - Create lead
- `POST /api/contact` - Submit contact form
- `POST /api/admin/login` - Admin authentication
- `GET /api/admin/leads` - List leads (authenticated)
- `GET /api/admin/analytics/summary` - Get analytics
- `POST /api/chat` - Chatbot endpoint (OpenAI GPT)
- `GET /api/blogs` - List blogs
- `POST /api/blogs` - Create blog (admin)

## Test Credentials
- **Admin Email:** admin@skillax.in
- **Admin Password:** SkillaxAdmin2024!

## Testing Status (Feb 8, 2026)
- **Backend:** 100% (19/19 pytest tests passed)
- **Frontend:** 100% (all 8 pages load correctly)
- **Last Test Report:** /app/test_reports/iteration_5.json

## Recent Completed Work (Feb 8, 2026)
1. Revamped Courses page with premium rich UI:
   - Parallax hero with floating icons (Rocket, Brain, Trophy, Crown)
   - Floating orbs with animated gradients
   - Glow cards with hover effects
   - Animated stat counters
   - Interactive module accordions with colored badges
   - AI Tools showcase grid (12 tools with gradient icons)
   - "What Sets Us Apart" features section
   - Premium CTA with glassmorphism

2. Fixed branding inconsistencies:
   - Updated Footer: askillax.in → skillax.in
   - Updated Contact page: askillax.in → skillax.in  
   - Updated Chatbot: 3 email references fixed

3. Verified all pages working correctly:
   - Home, About, Courses, Certifications, AI Tools, Careers, Blog, Contact
   - Admin login and dashboard functional
   - Lead form submission working
   - AI Chatbot responding
   - Theme toggle working
   - Navigation working

## P2 - Future/Backlog Tasks

### High Priority
1. **Full Admin CMS:** Allow editing page content, SEO metadata, blog posts directly from admin panel
2. **Custom Analytics Dashboard:** Google Analytics 4 integration with custom charts
3. **Full schema.org SEO markup:** Organization, Course, FAQ, LocalBusiness schemas (dynamic, per-page)

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

## 3rd Party Integrations
- **OpenAI GPT:** Used for AI chatbot via Emergent LLM key
- **Framer Motion:** Frontend animations
- **MongoDB:** Database

## Known Limitations
- Tech stack is React SPA (not Next.js as originally requested), which limits SSR/SSG SEO capabilities
- All content is hardcoded in components (not CMS-managed yet)
- Schema.org markup is basic (only Organization schema in index.html)
