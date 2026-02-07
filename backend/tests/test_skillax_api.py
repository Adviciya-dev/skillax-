"""
Skillax Digital Marketing Academy - Backend API Tests
Tests for: leads, contact, courses, blogs, admin auth, chatbot, analytics
"""
import pytest
import requests
import os
import uuid

BASE_URL = os.environ.get('REACT_APP_BACKEND_URL', 'https://premium-mktg-school.preview.emergentagent.com').rstrip('/')

# Test credentials
ADMIN_EMAIL = "admin@skillax.in"
ADMIN_PASSWORD = "SkillaxAdmin2024!"


class TestHealthAndRoot:
    """Basic API health checks"""
    
    def test_api_root(self):
        """Test API root endpoint"""
        response = requests.get(f"{BASE_URL}/api/")
        assert response.status_code == 200
        data = response.json()
        assert data["status"] == "active"
        assert "Skillax" in data["message"]
        print(f"✓ API root working: {data['message']}")


class TestLeadsAPI:
    """Lead capture and management tests"""
    
    def test_create_lead(self):
        """Test lead creation via /api/leads"""
        unique_id = str(uuid.uuid4())[:8]
        lead_data = {
            "name": f"TEST_User_{unique_id}",
            "email": f"test_{unique_id}@example.com",
            "phone": "+91 9876543210",
            "interest": "Professional Digital Marketing",
            "source": "website",
            "message": "Test lead from automated testing"
        }
        response = requests.post(f"{BASE_URL}/api/leads", json=lead_data)
        assert response.status_code == 200
        data = response.json()
        assert data["name"] == lead_data["name"]
        assert data["email"] == lead_data["email"]
        assert "id" in data
        print(f"✓ Lead created: {data['id']}")
        return data["id"]
    
    def test_create_lead_chatbot_source(self):
        """Test lead creation from chatbot"""
        unique_id = str(uuid.uuid4())[:8]
        lead_data = {
            "name": f"TEST_Chatbot_{unique_id}",
            "email": f"chatbot_{unique_id}@skillax.in",
            "phone": "+91 8765432109",
            "interest": "Course Inquiry",
            "source": "chatbot",
            "message": "Lead captured via chatbot"
        }
        response = requests.post(f"{BASE_URL}/api/leads", json=lead_data)
        assert response.status_code == 200
        data = response.json()
        assert data["source"] == "chatbot"
        print(f"✓ Chatbot lead created: {data['id']}")
    
    def test_create_lead_career_assessment(self):
        """Test lead creation from career assessment"""
        unique_id = str(uuid.uuid4())[:8]
        lead_data = {
            "name": f"TEST_Career_{unique_id}",
            "email": f"career_{unique_id}@example.com",
            "phone": "+91 7654321098",
            "interest": "Get a high-paying digital marketing job",
            "source": "career_assessment",
            "message": "Experience: Student/Fresher (18-25), Goal: Get a high-paying digital marketing job"
        }
        response = requests.post(f"{BASE_URL}/api/leads", json=lead_data)
        assert response.status_code == 200
        data = response.json()
        assert data["source"] == "career_assessment"
        print(f"✓ Career assessment lead created: {data['id']}")


class TestContactAPI:
    """Contact form submission tests"""
    
    def test_contact_form_submission(self):
        """Test contact form submission via /api/contact"""
        unique_id = str(uuid.uuid4())[:8]
        contact_data = {
            "name": f"TEST_Contact_{unique_id}",
            "email": f"contact_{unique_id}@example.com",
            "phone": "+91 9988776655",
            "subject": "Professional Digital Marketing (4 Months)",
            "message": "I want to know more about the course"
        }
        response = requests.post(f"{BASE_URL}/api/contact", json=contact_data)
        assert response.status_code == 200
        data = response.json()
        assert "lead_id" in data
        assert "Thank you" in data["message"]
        print(f"✓ Contact form submitted: {data['lead_id']}")


class TestCoursesAPI:
    """Course listing and detail tests"""
    
    def test_get_courses(self):
        """Test getting all courses"""
        response = requests.get(f"{BASE_URL}/api/courses")
        assert response.status_code == 200
        courses = response.json()
        assert isinstance(courses, list)
        assert len(courses) >= 2  # Should have at least 2 courses
        print(f"✓ Found {len(courses)} courses")
        
        # Verify course structure
        for course in courses:
            assert "title" in course
            assert "slug" in course
            assert "duration" in course
            assert "highlights" in course
        
        # Check for expected courses
        course_titles = [c["title"] for c in courses]
        assert any("Professional" in t for t in course_titles), "Professional course not found"
        assert any("AI" in t for t in course_titles), "AI course not found"
        print(f"✓ Course titles: {course_titles}")
    
    def test_get_course_by_slug(self):
        """Test getting course by slug"""
        response = requests.get(f"{BASE_URL}/api/courses/professional-digital-marketing")
        assert response.status_code == 200
        course = response.json()
        assert course["slug"] == "professional-digital-marketing"
        assert "4 Months" in course["duration"]
        assert len(course["modules"]) > 0
        print(f"✓ Course detail: {course['title']} - {course['duration']}")
    
    def test_get_ai_course_by_slug(self):
        """Test getting AI course by slug"""
        response = requests.get(f"{BASE_URL}/api/courses/ai-powered-marketing")
        assert response.status_code == 200
        course = response.json()
        assert course["slug"] == "ai-powered-marketing"
        assert "2 Months" in course["duration"]
        print(f"✓ AI Course detail: {course['title']} - {course['duration']}")


class TestBlogsAPI:
    """Blog listing and detail tests"""
    
    def test_get_blogs(self):
        """Test getting all blogs"""
        response = requests.get(f"{BASE_URL}/api/blogs")
        assert response.status_code == 200
        blogs = response.json()
        assert isinstance(blogs, list)
        print(f"✓ Found {len(blogs)} blogs")
        
        if len(blogs) > 0:
            blog = blogs[0]
            assert "title" in blog
            assert "slug" in blog
            assert "excerpt" in blog
    
    def test_get_blog_by_slug(self):
        """Test getting blog by slug"""
        # First get list to find a valid slug
        response = requests.get(f"{BASE_URL}/api/blogs")
        blogs = response.json()
        
        if len(blogs) > 0:
            slug = blogs[0]["slug"]
            response = requests.get(f"{BASE_URL}/api/blogs/{slug}")
            assert response.status_code == 200
            blog = response.json()
            assert blog["slug"] == slug
            print(f"✓ Blog detail: {blog['title']}")
        else:
            print("⚠ No blogs to test detail endpoint")


class TestAdminAuth:
    """Admin authentication tests"""
    
    def test_admin_login_success(self):
        """Test admin login with valid credentials"""
        response = requests.post(f"{BASE_URL}/api/admin/login", json={
            "email": ADMIN_EMAIL,
            "password": ADMIN_PASSWORD
        })
        assert response.status_code == 200
        data = response.json()
        assert "token" in data
        assert "user" in data
        assert data["user"]["email"] == ADMIN_EMAIL
        assert data["user"]["role"] == "admin"
        print(f"✓ Admin login successful: {data['user']['name']}")
        return data["token"]
    
    def test_admin_login_invalid_credentials(self):
        """Test admin login with invalid credentials"""
        response = requests.post(f"{BASE_URL}/api/admin/login", json={
            "email": "wrong@email.com",
            "password": "wrongpassword"
        })
        assert response.status_code == 401
        print("✓ Invalid credentials rejected correctly")
    
    def test_admin_profile(self):
        """Test getting admin profile with token"""
        # First login
        login_response = requests.post(f"{BASE_URL}/api/admin/login", json={
            "email": ADMIN_EMAIL,
            "password": ADMIN_PASSWORD
        })
        token = login_response.json()["token"]
        
        # Get profile
        response = requests.get(
            f"{BASE_URL}/api/admin/me",
            headers={"Authorization": f"Bearer {token}"}
        )
        assert response.status_code == 200
        data = response.json()
        assert data["email"] == ADMIN_EMAIL
        print(f"✓ Admin profile retrieved: {data['name']}")


class TestAdminLeadsManagement:
    """Admin leads management tests"""
    
    def get_admin_token(self):
        """Helper to get admin token"""
        response = requests.post(f"{BASE_URL}/api/admin/login", json={
            "email": ADMIN_EMAIL,
            "password": ADMIN_PASSWORD
        })
        return response.json()["token"]
    
    def test_get_leads_authenticated(self):
        """Test getting leads with admin auth"""
        token = self.get_admin_token()
        response = requests.get(
            f"{BASE_URL}/api/leads",
            headers={"Authorization": f"Bearer {token}"}
        )
        assert response.status_code == 200
        leads = response.json()
        assert isinstance(leads, list)
        print(f"✓ Retrieved {len(leads)} leads as admin")
    
    def test_get_leads_unauthenticated(self):
        """Test getting leads without auth fails"""
        response = requests.get(f"{BASE_URL}/api/leads")
        assert response.status_code == 401
        print("✓ Unauthenticated leads access rejected")


class TestAnalyticsAPI:
    """Analytics endpoint tests"""
    
    def get_admin_token(self):
        """Helper to get admin token"""
        response = requests.post(f"{BASE_URL}/api/admin/login", json={
            "email": ADMIN_EMAIL,
            "password": ADMIN_PASSWORD
        })
        return response.json()["token"]
    
    def test_analytics_summary(self):
        """Test analytics summary endpoint"""
        token = self.get_admin_token()
        response = requests.get(
            f"{BASE_URL}/api/analytics/summary",
            headers={"Authorization": f"Bearer {token}"}
        )
        assert response.status_code == 200
        data = response.json()
        assert "total_leads" in data
        assert "new_leads" in data
        assert "website_leads" in data
        assert "chatbot_leads" in data
        assert "total_courses" in data
        assert "total_blogs" in data
        print(f"✓ Analytics summary: {data['total_leads']} total leads, {data['total_courses']} courses")
    
    def test_leads_by_source(self):
        """Test leads by source analytics"""
        token = self.get_admin_token()
        response = requests.get(
            f"{BASE_URL}/api/analytics/leads-by-source",
            headers={"Authorization": f"Bearer {token}"}
        )
        assert response.status_code == 200
        data = response.json()
        assert isinstance(data, list)
        print(f"✓ Leads by source: {len(data)} sources")
    
    def test_leads_by_interest(self):
        """Test leads by interest analytics"""
        token = self.get_admin_token()
        response = requests.get(
            f"{BASE_URL}/api/analytics/leads-by-interest",
            headers={"Authorization": f"Bearer {token}"}
        )
        assert response.status_code == 200
        data = response.json()
        assert isinstance(data, list)
        print(f"✓ Leads by interest: {len(data)} interests")


class TestChatbotAPI:
    """Chatbot endpoint tests"""
    
    def test_chat_endpoint(self):
        """Test chatbot chat endpoint"""
        chat_data = {
            "message": "What courses do you offer?",
            "session_id": f"test_session_{uuid.uuid4()}"
        }
        response = requests.post(f"{BASE_URL}/api/chat", json=chat_data)
        assert response.status_code == 200
        data = response.json()
        assert "response" in data
        assert "session_id" in data
        print(f"✓ Chatbot responded: {data['response'][:100]}...")


if __name__ == "__main__":
    pytest.main([__file__, "-v", "--tb=short"])
