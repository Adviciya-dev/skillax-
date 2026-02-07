# Skillax Digital Marketing Academy - Product Requirements Document

## Project Overview
Ultra-Premium Digital Marketing Academy website for Skillax located in Mananthavady, Wayanad, Kerala.

## Original Problem Statement
Build a top-class, ultra-premium digital academy website with:
- 4K-ready, animation-rich design
- AI chatbot (OpenAI GPT-4o)
- Admin CMS with lead management
- Lead capture forms
- WhatsApp integration
- Local SEO optimization
- Light/Dark theme toggle

## User Personas
1. **Students/Job Seekers**: Looking to start career in digital marketing
2. **Working Professionals**: Seeking to upskill in digital marketing
3. **Business Owners**: Wanting to learn marketing for their business
4. **Admin Users**: Managing leads, courses, and content

## Core Requirements (Static)
- Responsive design (mobile-first)
- SEO-optimized pages
- Fast loading performance
- Accessible UI/UX
- Industry certifications display
- Lead capture and management

## What's Been Implemented (December 2025)
### Frontend (React)
- [x] Home page with animated hero, stats, courses, testimonials, CTA
- [x] About page with vision, values, team, timeline
- [x] Courses listing page
- [x] Course detail pages with accordion curriculum and FAQs
- [x] Certifications page (Google, HubSpot, Government, Industry)
- [x] Blog page with category filtering
- [x] Contact page with form and map
- [x] Admin portal with login and dashboard
- [x] Theme toggle (light/dark)
- [x] AI Chatbot (OpenAI GPT-4o integration)
- [x] WhatsApp click-to-chat button
- [x] Responsive navigation with mega menu
- [x] Framer Motion animations

### Backend (FastAPI)
- [x] Lead capture APIs (create, list, update status)
- [x] Contact form API
- [x] Blog APIs (CRUD)
- [x] Course APIs (CRUD)
- [x] Admin authentication (JWT)
- [x] AI Chatbot API (OpenAI GPT-4o)
- [x] Analytics APIs (summary, leads by source/interest)
- [x] Data seeding endpoint

### Database (MongoDB)
- leads collection
- blogs collection
- courses collection
- admins collection

## Prioritized Backlog

### P0 - Critical (Done)
- [x] Core pages (Home, About, Courses, Contact)
- [x] Lead capture functionality
- [x] AI Chatbot
- [x] Admin portal

### P1 - High Priority (Remaining)
- [ ] Google Analytics 4 integration (requires GA4 Measurement ID)
- [ ] Blog detail page view
- [ ] Course enrollment flow
- [ ] Email notifications for leads

### P2 - Medium Priority
- [ ] Course pricing display
- [ ] Student testimonial management in admin
- [ ] Newsletter subscription
- [ ] SEO meta tags automation
- [ ] Image gallery for campus

### P3 - Low Priority
- [ ] Multi-language support (Malayalam)
- [ ] Student login portal
- [ ] Course progress tracking
- [ ] Payment integration
- [ ] Advanced analytics dashboard

## Technical Stack
- Frontend: React 19, Tailwind CSS, Framer Motion, Shadcn UI
- Backend: FastAPI, Python 3
- Database: MongoDB
- AI: OpenAI GPT-4o via Emergent LLM Key
- Hosting: Emergent Platform

## Admin Credentials
- Email: admin@skillax.in
- Password: SkillaxAdmin2024!

## Contact Information
- Email: contact@skillax.in
- Location: Mananthavady, Wayanad, Kerala 670645
