from fastapi import FastAPI, APIRouter, HTTPException, Depends, Query
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, EmailStr, ConfigDict
from typing import List, Optional, Dict, Any
import uuid
from datetime import datetime, timezone
import jwt
import bcrypt
from emergentintegrations.llm.chat import LlmChat, UserMessage

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ.get('MONGO_URL', 'mongodb://localhost:27017')
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ.get('DB_NAME', 'skillax_academy')]

# JWT Configuration
JWT_SECRET = os.environ.get('JWT_SECRET', 'skillax-secret-key-2024')
JWT_ALGORITHM = "HS256"

# OpenAI Configuration
EMERGENT_LLM_KEY = os.environ.get('EMERGENT_LLM_KEY', '')

# Create the main app
app = FastAPI(title="Skillax Digital Marketing Academy API")

# Create routers
api_router = APIRouter(prefix="/api")
security = HTTPBearer(auto_error=False)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

# ==================== MODELS ====================

class LeadCreate(BaseModel):
    name: str
    email: EmailStr
    phone: str
    interest: str
    source: str = "website"
    message: Optional[str] = None

class Lead(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: str
    phone: str
    interest: str
    source: str
    message: Optional[str] = None
    status: str = "new"
    created_at: str = Field(default_factory=lambda: datetime.now(timezone.utc).isoformat())

class ContactForm(BaseModel):
    name: str
    email: EmailStr
    phone: str
    subject: str
    message: str

class BlogPostCreate(BaseModel):
    title: str
    slug: str
    excerpt: str
    content: str
    category: str
    tags: List[str] = []
    author: str = "Skillax Team"
    featured_image: Optional[str] = None

class BlogPost(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    title: str
    slug: str
    excerpt: str
    content: str
    category: str
    tags: List[str] = []
    author: str
    featured_image: Optional[str] = None
    published: bool = True
    created_at: str = Field(default_factory=lambda: datetime.now(timezone.utc).isoformat())
    updated_at: str = Field(default_factory=lambda: datetime.now(timezone.utc).isoformat())

class CourseCreate(BaseModel):
    title: str
    slug: str
    short_description: str
    description: str
    duration: str
    modules: List[Dict[str, Any]]
    highlights: List[str]
    certification: str
    price: Optional[str] = None
    featured_image: Optional[str] = None

class Course(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    title: str
    slug: str
    short_description: str
    description: str
    duration: str
    modules: List[Dict[str, Any]]
    highlights: List[str]
    certification: str
    price: Optional[str] = None
    featured_image: Optional[str] = None
    active: bool = True
    created_at: str = Field(default_factory=lambda: datetime.now(timezone.utc).isoformat())

class AdminLogin(BaseModel):
    email: EmailStr
    password: str

class AdminUser(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    email: str
    name: str
    role: str = "admin"
    created_at: str = Field(default_factory=lambda: datetime.now(timezone.utc).isoformat())

class ChatMessage(BaseModel):
    message: str
    session_id: str

class AnalyticsSummary(BaseModel):
    total_leads: int
    new_leads: int
    website_leads: int
    chatbot_leads: int
    total_courses: int
    total_blogs: int
    total_page_views: int = 0
    unique_visitors: int = 0

class PageView(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    path: str
    referrer: Optional[str] = None
    user_agent: Optional[str] = None
    ip_address: Optional[str] = None
    country: Optional[str] = None
    city: Optional[str] = None
    session_id: str
    timestamp: str = Field(default_factory=lambda: datetime.now(timezone.utc).isoformat())

class PageViewCreate(BaseModel):
    path: str
    referrer: Optional[str] = None
    user_agent: Optional[str] = None
    session_id: str

class LeadConversionStats(BaseModel):
    total_leads: int
    converted_leads: int
    pending_leads: int
    conversion_rate: float
    leads_by_status: List[Dict[str, Any]]
    leads_trend: List[Dict[str, Any]]

# ==================== STUDENT PROFILE MODELS ====================

class StudentProfileCreate(BaseModel):
    # Basic Info
    full_name: str
    email: EmailStr
    phone: str
    location: str
    linkedin_url: Optional[str] = None
    portfolio_url: Optional[str] = None
    
    # Education
    education_level: str  # high_school, bachelors, masters, working_professional
    field_of_study: Optional[str] = None
    institution: Optional[str] = None
    graduation_year: Optional[str] = None
    
    # Career Info
    career_stage: str  # student, fresher, 1-3_years, 3-5_years, 5+_years
    current_role: Optional[str] = None
    target_role: str
    career_goals: str
    
    # Skills & Interests
    current_skills: List[str] = []
    interests: List[str] = []
    preferred_learning_style: str  # self_paced, instructor_led, hybrid
    
    # Additional
    why_digital_marketing: str
    availability: str  # full_time, part_time, weekends

class StudentProfile(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    profile_code: str = Field(default_factory=lambda: f"SKX{uuid.uuid4().hex[:8].upper()}")
    
    # Basic Info
    full_name: str
    email: str
    phone: str
    location: str
    linkedin_url: Optional[str] = None
    portfolio_url: Optional[str] = None
    
    # Education
    education_level: str
    field_of_study: Optional[str] = None
    institution: Optional[str] = None
    graduation_year: Optional[str] = None
    
    # Career Info
    career_stage: str
    current_role: Optional[str] = None
    target_role: str
    career_goals: str
    
    # Skills & Interests
    current_skills: List[str] = []
    interests: List[str] = []
    preferred_learning_style: str
    
    # Additional
    why_digital_marketing: str
    availability: str
    
    # AI Generated Content
    ai_bio: Optional[str] = None
    ai_linkedin_headline: Optional[str] = None
    ai_career_roadmap: Optional[List[Dict[str, Any]]] = None
    ai_skill_gaps: Optional[List[str]] = None
    ai_course_recommendation: Optional[str] = None
    ai_strengths: Optional[List[str]] = None
    
    # Metadata
    profile_views: int = 0
    is_public: bool = True
    status: str = "active"
    created_at: str = Field(default_factory=lambda: datetime.now(timezone.utc).isoformat())
    updated_at: str = Field(default_factory=lambda: datetime.now(timezone.utc).isoformat())

class SiteSettings(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = "site_settings"
    site_name: str = "Skillax Digital Marketing Academy"
    tagline: str = "Kerala's #1 AI-Powered Digital Marketing Academy"
    contact_email: str = "contact@skillax.in"
    contact_phone: str = "+91-9876543210"
    address: str = "Mananthavady, Wayanad, Kerala 670645"
    social_facebook: Optional[str] = None
    social_instagram: Optional[str] = None
    social_linkedin: Optional[str] = None
    social_twitter: Optional[str] = None
    social_youtube: Optional[str] = None
    whatsapp_number: Optional[str] = None
    google_analytics_id: Optional[str] = None
    meta_title: str = "Skillax Digital Marketing Academy | Mananthavady, Kerala"
    meta_description: str = "Kerala's #1 AI-powered digital marketing academy. Learn SEO, AEO, GEO, Google Ads, Meta Ads, ChatGPT Ads, 30+ AI tools."
    meta_keywords: str = "digital marketing course kerala, seo training wayanad"
    updated_at: str = Field(default_factory=lambda: datetime.now(timezone.utc).isoformat())

# ==================== AUTH HELPERS ====================

def create_token(user_id: str, email: str, role: str) -> str:
    payload = {
        "user_id": user_id,
        "email": email,
        "role": role,
        "exp": datetime.now(timezone.utc).timestamp() + 86400  # 24 hours
    }
    return jwt.encode(payload, JWT_SECRET, algorithm=JWT_ALGORITHM)

def verify_token(token: str) -> dict:
    try:
        payload = jwt.decode(token, JWT_SECRET, algorithms=[JWT_ALGORITHM])
        return payload
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Token expired")
    except jwt.InvalidTokenError:
        raise HTTPException(status_code=401, detail="Invalid token")

async def get_current_admin(credentials: HTTPAuthorizationCredentials = Depends(security)):
    if not credentials:
        raise HTTPException(status_code=401, detail="Not authenticated")
    payload = verify_token(credentials.credentials)
    if payload.get("role") != "admin":
        raise HTTPException(status_code=403, detail="Admin access required")
    return payload

# ==================== ROOT ENDPOINT ====================

@api_router.get("/")
async def root():
    return {"message": "Skillax Digital Marketing Academy API", "status": "active"}

# ==================== LEAD ENDPOINTS ====================

@api_router.post("/leads", response_model=Lead)
async def create_lead(lead_data: LeadCreate):
    lead = Lead(**lead_data.model_dump())
    doc = lead.model_dump()
    await db.leads.insert_one(doc)
    logger.info(f"New lead created: {lead.email} from {lead.source}")
    return lead

@api_router.get("/leads", response_model=List[Lead])
async def get_leads(
    status: Optional[str] = None,
    source: Optional[str] = None,
    limit: int = Query(default=100, le=1000),
    skip: int = 0,
    admin: dict = Depends(get_current_admin)
):
    query = {}
    if status:
        query["status"] = status
    if source:
        query["source"] = source
    
    leads = await db.leads.find(query, {"_id": 0}).sort("created_at", -1).skip(skip).limit(limit).to_list(limit)
    return leads

@api_router.patch("/leads/{lead_id}/status")
async def update_lead_status(lead_id: str, status: str, admin: dict = Depends(get_current_admin)):
    result = await db.leads.update_one(
        {"id": lead_id},
        {"$set": {"status": status}}
    )
    if result.modified_count == 0:
        raise HTTPException(status_code=404, detail="Lead not found")
    return {"message": "Lead status updated", "lead_id": lead_id, "status": status}

# ==================== CONTACT ENDPOINT ====================

@api_router.post("/contact")
async def submit_contact_form(form: ContactForm):
    lead = Lead(
        name=form.name,
        email=form.email,
        phone=form.phone,
        interest=form.subject,
        source="contact_form",
        message=form.message
    )
    doc = lead.model_dump()
    await db.leads.insert_one(doc)
    logger.info(f"Contact form submitted: {form.email}")
    return {"message": "Thank you for contacting us! We'll get back to you soon.", "lead_id": lead.id}

# ==================== BLOG ENDPOINTS ====================

@api_router.get("/blogs", response_model=List[BlogPost])
async def get_blogs(
    category: Optional[str] = None,
    limit: int = Query(default=10, le=50),
    skip: int = 0
):
    query = {"published": True}
    if category:
        query["category"] = category
    
    blogs = await db.blogs.find(query, {"_id": 0}).sort("created_at", -1).skip(skip).limit(limit).to_list(limit)
    return blogs

@api_router.get("/blogs/{slug}", response_model=BlogPost)
async def get_blog_by_slug(slug: str):
    blog = await db.blogs.find_one({"slug": slug, "published": True}, {"_id": 0})
    if not blog:
        raise HTTPException(status_code=404, detail="Blog post not found")
    return blog

@api_router.post("/blogs", response_model=BlogPost)
async def create_blog(blog_data: BlogPostCreate, admin: dict = Depends(get_current_admin)):
    blog = BlogPost(**blog_data.model_dump())
    doc = blog.model_dump()
    await db.blogs.insert_one(doc)
    return blog

@api_router.put("/blogs/{blog_id}", response_model=BlogPost)
async def update_blog(blog_id: str, blog_data: BlogPostCreate, admin: dict = Depends(get_current_admin)):
    update_data = blog_data.model_dump()
    update_data["updated_at"] = datetime.now(timezone.utc).isoformat()
    
    result = await db.blogs.update_one(
        {"id": blog_id},
        {"$set": update_data}
    )
    if result.modified_count == 0:
        raise HTTPException(status_code=404, detail="Blog not found")
    
    blog = await db.blogs.find_one({"id": blog_id}, {"_id": 0})
    return blog

@api_router.delete("/blogs/{blog_id}")
async def delete_blog(blog_id: str, admin: dict = Depends(get_current_admin)):
    result = await db.blogs.delete_one({"id": blog_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Blog not found")
    return {"message": "Blog deleted successfully"}

# ==================== COURSE ENDPOINTS ====================

@api_router.get("/courses", response_model=List[Course])
async def get_courses(category: Optional[str] = None):
    query = {"active": True}
    courses = await db.courses.find(query, {"_id": 0}).to_list(100)
    return courses

@api_router.get("/courses/{slug}", response_model=Course)
async def get_course_by_slug(slug: str):
    course = await db.courses.find_one({"slug": slug, "active": True}, {"_id": 0})
    if not course:
        raise HTTPException(status_code=404, detail="Course not found")
    return course

@api_router.post("/courses", response_model=Course)
async def create_course(course_data: CourseCreate, admin: dict = Depends(get_current_admin)):
    course = Course(**course_data.model_dump())
    doc = course.model_dump()
    await db.courses.insert_one(doc)
    return course

@api_router.put("/courses/{course_id}", response_model=Course)
async def update_course(course_id: str, course_data: CourseCreate, admin: dict = Depends(get_current_admin)):
    update_data = course_data.model_dump()
    
    result = await db.courses.update_one(
        {"id": course_id},
        {"$set": update_data}
    )
    if result.modified_count == 0:
        raise HTTPException(status_code=404, detail="Course not found")
    
    course = await db.courses.find_one({"id": course_id}, {"_id": 0})
    return course

# ==================== ADMIN AUTH ENDPOINTS ====================

@api_router.post("/admin/login")
async def admin_login(credentials: AdminLogin):
    admin = await db.admins.find_one({"email": credentials.email}, {"_id": 0})
    
    if not admin:
        raise HTTPException(status_code=401, detail="Invalid credentials")
    
    if not bcrypt.checkpw(credentials.password.encode(), admin["password"].encode()):
        raise HTTPException(status_code=401, detail="Invalid credentials")
    
    token = create_token(admin["id"], admin["email"], admin["role"])
    return {
        "token": token,
        "user": {
            "id": admin["id"],
            "email": admin["email"],
            "name": admin["name"],
            "role": admin["role"]
        }
    }

@api_router.get("/admin/me")
async def get_admin_profile(admin: dict = Depends(get_current_admin)):
    user = await db.admins.find_one({"email": admin["email"]}, {"_id": 0, "password": 0})
    return user

# ==================== CHATBOT ENDPOINT ====================

# Store chat sessions in memory (for demo - in production, store in DB)
chat_sessions: Dict[str, LlmChat] = {}

CHATBOT_SYSTEM_PROMPT = """You are Skillax AI Assistant, a friendly and knowledgeable chatbot for Skillax Digital Marketing Academy located in Mananthavady, Wayanad, Kerala.

About Skillax Academy:
- Premier digital marketing training institute in Wayanad
- Offers comprehensive courses from foundation to advanced levels
- Industry-recognized certifications (Google, HubSpot, Government TSSR)
- Expert faculty with real-world experience
- 100% placement assistance
- Contact: contact@skillax.in

Available Courses:
1. Digital Marketing Foundation (3 months) - Perfect for beginners
2. Advanced SEO & Performance (2 months) - Master search engines
3. Social Media & Ads Mastery (2 months) - Facebook, Instagram, Google Ads
4. AI-Powered Digital Marketing (1 month) - Latest AI tools and automation
5. Web, App & QA Marketing (2 months) - Technical marketing skills
6. Freelancing & Agency Building (1 month) - Start your own business

Certifications:
- Google Ads Certification
- Google Analytics Certification
- HubSpot Marketing Certification
- Government TSSR Certification
- Skill India Certification

Your tasks:
1. Answer questions about courses, fees, duration, and curriculum
2. Help visitors understand which course suits them best
3. Collect lead information (name, phone, email, interest) naturally
4. Guide them to contact the academy for enrollment
5. Be helpful, professional, and enthusiastic about digital marketing

If someone asks about fees, encourage them to contact the academy for the latest pricing and offers.
Keep responses concise and helpful. Use a friendly, professional tone."""

@api_router.post("/chat")
async def chat_with_bot(chat_data: ChatMessage):
    session_id = chat_data.session_id
    
    try:
        # Get or create chat session
        if session_id not in chat_sessions:
            chat_sessions[session_id] = LlmChat(
                api_key=EMERGENT_LLM_KEY,
                session_id=session_id,
                system_message=CHATBOT_SYSTEM_PROMPT
            ).with_model("openai", "gpt-4o")
        
        chat = chat_sessions[session_id]
        user_message = UserMessage(text=chat_data.message)
        response = await chat.send_message(user_message)
        
        return {
            "response": response,
            "session_id": session_id
        }
    except Exception as e:
        logger.error(f"Chatbot error: {str(e)}")
        return {
            "response": "I apologize, but I'm having trouble connecting right now. Please contact us directly at contact@skillax.in or call our office. We'd be happy to help you!",
            "session_id": session_id,
            "error": True
        }

# ==================== ANALYTICS ENDPOINTS ====================

@api_router.get("/analytics/summary", response_model=AnalyticsSummary)
async def get_analytics_summary(admin: dict = Depends(get_current_admin)):
    total_leads = await db.leads.count_documents({})
    new_leads = await db.leads.count_documents({"status": "new"})
    website_leads = await db.leads.count_documents({"source": {"$in": ["website", "contact_form"]}})
    chatbot_leads = await db.leads.count_documents({"source": "chatbot"})
    total_courses = await db.courses.count_documents({"active": True})
    total_blogs = await db.blogs.count_documents({"published": True})
    total_page_views = await db.page_views.count_documents({})
    
    # Count unique visitors by session_id
    unique_sessions = await db.page_views.distinct("session_id")
    unique_visitors = len(unique_sessions)
    
    return AnalyticsSummary(
        total_leads=total_leads,
        new_leads=new_leads,
        website_leads=website_leads,
        chatbot_leads=chatbot_leads,
        total_courses=total_courses,
        total_blogs=total_blogs,
        total_page_views=total_page_views,
        unique_visitors=unique_visitors
    )

@api_router.get("/analytics/leads-by-source")
async def get_leads_by_source(admin: dict = Depends(get_current_admin)):
    pipeline = [
        {"$group": {"_id": "$source", "count": {"$sum": 1}}},
        {"$sort": {"count": -1}}
    ]
    result = await db.leads.aggregate(pipeline).to_list(100)
    return [{"source": item["_id"], "count": item["count"]} for item in result]

@api_router.get("/analytics/leads-by-interest")
async def get_leads_by_interest(admin: dict = Depends(get_current_admin)):
    pipeline = [
        {"$group": {"_id": "$interest", "count": {"$sum": 1}}},
        {"$sort": {"count": -1}}
    ]
    result = await db.leads.aggregate(pipeline).to_list(100)
    return [{"interest": item["_id"], "count": item["count"]} for item in result]

# ==================== VISITOR TRACKING ENDPOINTS ====================

@api_router.post("/track/pageview")
async def track_page_view(page_view_data: PageViewCreate):
    """Track a page view - public endpoint for frontend tracking"""
    page_view = PageView(**page_view_data.model_dump())
    doc = page_view.model_dump()
    await db.page_views.insert_one(doc)
    return {"status": "tracked", "id": page_view.id}

@api_router.get("/analytics/page-views")
async def get_page_views(
    days: int = Query(default=7, le=90),
    admin: dict = Depends(get_current_admin)
):
    """Get page views grouped by day"""
    from datetime import timedelta
    start_date = (datetime.now(timezone.utc) - timedelta(days=days)).isoformat()
    
    pipeline = [
        {"$match": {"timestamp": {"$gte": start_date}}},
        {"$addFields": {"date": {"$substr": ["$timestamp", 0, 10]}}},
        {"$group": {"_id": "$date", "views": {"$sum": 1}}},
        {"$sort": {"_id": 1}}
    ]
    result = await db.page_views.aggregate(pipeline).to_list(100)
    return [{"date": item["_id"], "views": item["views"]} for item in result]

@api_router.get("/analytics/top-pages")
async def get_top_pages(
    limit: int = Query(default=10, le=50),
    admin: dict = Depends(get_current_admin)
):
    """Get most visited pages"""
    pipeline = [
        {"$group": {"_id": "$path", "views": {"$sum": 1}}},
        {"$sort": {"views": -1}},
        {"$limit": limit}
    ]
    result = await db.page_views.aggregate(pipeline).to_list(limit)
    return [{"path": item["_id"], "views": item["views"]} for item in result]

@api_router.get("/analytics/visitors-by-country")
async def get_visitors_by_country(admin: dict = Depends(get_current_admin)):
    """Get visitor distribution by country"""
    pipeline = [
        {"$match": {"country": {"$ne": None}}},
        {"$group": {"_id": "$country", "visitors": {"$sum": 1}}},
        {"$sort": {"visitors": -1}},
        {"$limit": 10}
    ]
    result = await db.page_views.aggregate(pipeline).to_list(10)
    return [{"country": item["_id"] or "Unknown", "visitors": item["visitors"]} for item in result]

@api_router.get("/analytics/lead-conversion")
async def get_lead_conversion_stats(admin: dict = Depends(get_current_admin)):
    """Get lead conversion statistics"""
    total_leads = await db.leads.count_documents({})
    converted_leads = await db.leads.count_documents({"status": "converted"})
    pending_leads = await db.leads.count_documents({"status": {"$in": ["new", "contacted"]}})
    
    conversion_rate = (converted_leads / total_leads * 100) if total_leads > 0 else 0
    
    # Leads by status
    status_pipeline = [
        {"$group": {"_id": "$status", "count": {"$sum": 1}}},
        {"$sort": {"count": -1}}
    ]
    status_result = await db.leads.aggregate(status_pipeline).to_list(10)
    leads_by_status = [{"status": item["_id"], "count": item["count"]} for item in status_result]
    
    # Leads trend (last 7 days)
    from datetime import timedelta
    start_date = (datetime.now(timezone.utc) - timedelta(days=7)).isoformat()
    trend_pipeline = [
        {"$match": {"created_at": {"$gte": start_date}}},
        {"$addFields": {"date": {"$substr": ["$created_at", 0, 10]}}},
        {"$group": {"_id": "$date", "leads": {"$sum": 1}}},
        {"$sort": {"_id": 1}}
    ]
    trend_result = await db.leads.aggregate(trend_pipeline).to_list(7)
    leads_trend = [{"date": item["_id"], "leads": item["leads"]} for item in trend_result]
    
    return LeadConversionStats(
        total_leads=total_leads,
        converted_leads=converted_leads,
        pending_leads=pending_leads,
        conversion_rate=round(conversion_rate, 1),
        leads_by_status=leads_by_status,
        leads_trend=leads_trend
    )

# ==================== ADMIN BLOG MANAGEMENT ====================

@api_router.get("/admin/blogs", response_model=List[BlogPost])
async def get_all_blogs_admin(
    limit: int = Query(default=50, le=100),
    skip: int = 0,
    admin: dict = Depends(get_current_admin)
):
    """Get all blogs including unpublished for admin"""
    blogs = await db.blogs.find({}, {"_id": 0}).sort("created_at", -1).skip(skip).limit(limit).to_list(limit)
    return blogs

@api_router.patch("/blogs/{blog_id}/publish")
async def toggle_blog_publish(blog_id: str, published: bool, admin: dict = Depends(get_current_admin)):
    """Toggle blog publish status"""
    result = await db.blogs.update_one(
        {"id": blog_id},
        {"$set": {"published": published, "updated_at": datetime.now(timezone.utc).isoformat()}}
    )
    if result.modified_count == 0:
        raise HTTPException(status_code=404, detail="Blog not found")
    return {"message": f"Blog {'published' if published else 'unpublished'}", "blog_id": blog_id}

# ==================== SEED DATA ENDPOINT (For Initial Setup) ====================

@api_router.post("/seed")
async def seed_data():
    """Seed initial data for the academy"""
    
    # Check if admin exists
    existing_admin = await db.admins.find_one({"email": "admin@skillax.in"})
    if not existing_admin:
        # Create default admin
        hashed_password = bcrypt.hashpw("SkillaxAdmin2024!".encode(), bcrypt.gensalt()).decode()
        admin = {
            "id": str(uuid.uuid4()),
            "email": "admin@skillax.in",
            "name": "Skillax Admin",
            "password": hashed_password,
            "role": "admin",
            "created_at": datetime.now(timezone.utc).isoformat()
        }
        await db.admins.insert_one(admin)
    
    # Clear and reseed courses
    await db.courses.delete_many({})
    courses = [
        {
            "id": str(uuid.uuid4()),
            "title": "Professional Digital Marketing",
            "slug": "professional-digital-marketing",
            "short_description": "Complete A-Z digital marketing mastery with AI tools, live projects & guaranteed internship at Infopark IT company.",
            "description": "Our flagship 4-month comprehensive digital marketing program covering everything from SEO to AI tools. Get hands-on experience with live projects and a guaranteed internship at top IT companies in Infopark, Kochi.",
            "duration": "4 Months",
            "modules": [
                {"title": "Digital Marketing Fundamentals", "topics": ["Marketing Basics", "Digital Channels", "Customer Journey"]},
                {"title": "Search Engine Optimization (SEO)", "topics": ["On-Page SEO", "Technical SEO", "Link Building", "Local SEO"]},
                {"title": "Search Engine Marketing (SEM)", "topics": ["Google Ads", "Campaign Setup", "Bidding Strategies", "Optimization"]},
                {"title": "Social Media Marketing", "topics": ["Facebook", "Instagram", "LinkedIn", "Content Strategy"]},
                {"title": "Content & Email Marketing", "topics": ["Content Strategy", "Copywriting", "Email Campaigns", "Automation"]},
                {"title": "AI Tools & Automation", "topics": ["ChatGPT", "Midjourney", "Canva AI", "Marketing Automation"]},
                {"title": "Analytics & Reporting", "topics": ["Google Analytics", "Data Studio", "ROI Tracking"]},
                {"title": "Internship at Infopark", "topics": ["Live Projects", "Client Work", "Portfolio Building"]}
            ],
            "highlights": ["SEO, SEM, SMM, Email Marketing", "AI Tools: ChatGPT, Midjourney, Canva AI", "Google Ads & Meta Ads Certification", "Live Client Projects", "Guaranteed Internship at Infopark", "100% Placement Assistance"],
            "certification": "Google Ads + Google Analytics + Meta Blueprint + HubSpot + SEMrush + Skillax Pro Certificate",
            "price": "Contact for pricing",
            "featured_image": "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800",
            "active": True,
            "created_at": datetime.now(timezone.utc).isoformat()
        },
        {
            "id": str(uuid.uuid4()),
            "title": "Advanced AI-Powered Marketing",
            "slug": "ai-powered-marketing",
            "short_description": "Master cutting-edge AI marketing tools and automation. Perfect for working professionals wanting to upskill.",
            "description": "Our intensive 2-month program focused on AI-powered marketing tools. Learn to leverage ChatGPT, AI content generators, and marketing automation to stay ahead of the competition. Weekend batches available.",
            "duration": "2 Months",
            "modules": [
                {"title": "AI Fundamentals for Marketers", "topics": ["Understanding AI", "AI in Marketing", "Ethics & Best Practices"]},
                {"title": "ChatGPT & Content Creation", "topics": ["Prompt Engineering", "Content Writing", "Ad Copy", "Blogs"]},
                {"title": "AI Image & Video Generation", "topics": ["Midjourney", "DALL-E", "Canva AI", "Video Tools"]},
                {"title": "Marketing Automation Tools", "topics": ["HubSpot", "Mailchimp AI", "Social Schedulers"]},
                {"title": "Prompt Engineering Mastery", "topics": ["Advanced Prompts", "Chain Prompting", "Custom GPTs"]},
                {"title": "AI-Powered Analytics", "topics": ["Predictive Analytics", "AI Reporting", "Data Insights"]}
            ],
            "highlights": ["ChatGPT for Marketing", "AI Content Generation", "AI Image & Video Creation", "Marketing Automation", "Prompt Engineering Mastery", "Weekend Batches Available"],
            "certification": "Skillax AI Expert + HubSpot Automation Certificate",
            "price": "Contact for pricing",
            "featured_image": "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800",
            "active": True,
            "created_at": datetime.now(timezone.utc).isoformat()
        }
    ]
    await db.courses.insert_many(courses)
    
    # Seed sample blog posts if none exist
    blogs_count = await db.blogs.count_documents({})
    if blogs_count == 0:
        blogs = [
            {
                "id": str(uuid.uuid4()),
                "title": "10 Digital Marketing Trends to Watch in 2025",
                "slug": "digital-marketing-trends-2025",
                "excerpt": "Stay ahead of the curve with these emerging digital marketing trends that will shape the industry in 2025.",
                "content": "Digital marketing is evolving rapidly. Here are the top trends to watch...",
                "category": "Industry Insights",
                "tags": ["trends", "2025", "digital marketing"],
                "author": "Skillax Team",
                "featured_image": "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800",
                "published": True,
                "created_at": datetime.now(timezone.utc).isoformat(),
                "updated_at": datetime.now(timezone.utc).isoformat()
            },
            {
                "id": str(uuid.uuid4()),
                "title": "How to Start a Career in Digital Marketing in Kerala",
                "slug": "career-digital-marketing-kerala",
                "excerpt": "A complete guide to launching your digital marketing career in Kerala with tips from industry experts.",
                "content": "Kerala's digital economy is growing rapidly. Here's how to get started...",
                "category": "Career Guide",
                "tags": ["career", "kerala", "jobs"],
                "author": "Skillax Team",
                "featured_image": "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800",
                "published": True,
                "created_at": datetime.now(timezone.utc).isoformat(),
                "updated_at": datetime.now(timezone.utc).isoformat()
            },
            {
                "id": str(uuid.uuid4()),
                "title": "SEO vs Social Media Marketing: Which is Right for Your Business?",
                "slug": "seo-vs-social-media-marketing",
                "excerpt": "Understanding the differences between SEO and social media marketing to make informed decisions.",
                "content": "Both SEO and social media are powerful marketing channels. Let's compare...",
                "category": "Marketing Strategy",
                "tags": ["seo", "social media", "strategy"],
                "author": "Skillax Team",
                "featured_image": "https://images.unsplash.com/photo-1611926653458-09294b3142bf?w=800",
                "published": True,
                "created_at": datetime.now(timezone.utc).isoformat(),
                "updated_at": datetime.now(timezone.utc).isoformat()
            }
        ]
        await db.blogs.insert_many(blogs)
    
    return {"message": "Data seeded successfully", "admin_email": "admin@skillax.in", "admin_password": "SkillaxAdmin2024!"}

# Include the router
app.include_router(api_router)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
