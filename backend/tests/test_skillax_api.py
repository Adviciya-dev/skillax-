"""
Skillax Digital Marketing Academy API Tests
Tests for: Home page features, Course Quiz, Admin login, Lead submission, Chatbot
"""
import pytest
import requests
import os

BASE_URL = os.environ.get('REACT_APP_BACKEND_URL', 'https://marketedu-4.preview.emergentagent.com')

class TestHealthAndRoot:
    """Test API health and root endpoint"""
    
    def test_api_root(self):
        """Test API root endpoint returns active status"""
        response = requests.get(f"{BASE_URL}/api/")
        assert response.status_code == 200
        data = response.json()
        assert data["status"] == "active"
        assert "Skillax" in data["message"]
        print(f"PASS: API root returns: {data}")


class TestAdminAuth:
    """Test admin authentication endpoints"""
    
    def test_admin_login_success(self):
        """Test admin login with valid credentials"""
        response = requests.post(f"{BASE_URL}/api/admin/login", json={
            "email": "admin@skillax.in",
            "password": "SkillaxAdmin2024!"
        })
        assert response.status_code == 200
        data = response.json()
        assert "token" in data
        assert "user" in data
        assert data["user"]["email"] == "admin@skillax.in"
        assert data["user"]["role"] == "admin"
        print(f"PASS: Admin login successful, user: {data['user']['name']}")
        return data["token"]
    
    def test_admin_login_invalid_credentials(self):
        """Test admin login with invalid credentials"""
        response = requests.post(f"{BASE_URL}/api/admin/login", json={
            "email": "wrong@skillax.in",
            "password": "wrongpassword"
        })
        assert response.status_code == 401
        print("PASS: Invalid credentials rejected with 401")
    
    def test_admin_me_without_token(self):
        """Test admin profile endpoint without token"""
        response = requests.get(f"{BASE_URL}/api/admin/me")
        assert response.status_code == 401
        print("PASS: Admin profile requires authentication")


class TestLeads:
    """Test lead management endpoints"""
    
    def test_create_lead_from_website(self):
        """Test creating a lead from website form"""
        response = requests.post(f"{BASE_URL}/api/leads", json={
            "name": "Test Lead Website",
            "email": "testlead@example.com",
            "phone": "9876543210",
            "interest": "Professional Digital Marketing",
            "source": "website",
            "message": "Interested in the course"
        })
        assert response.status_code == 200
        data = response.json()
        assert data["name"] == "Test Lead Website"
        assert data["source"] == "website"
        assert data["status"] == "new"
        print(f"PASS: Website lead created with ID: {data['id']}")
    
    def test_create_lead_from_course_quiz(self):
        """Test creating a lead from course quiz"""
        response = requests.post(f"{BASE_URL}/api/leads", json={
            "name": "Test Quiz Lead",
            "email": "quizlead@example.com",
            "phone": "9876543211",
            "interest": "Professional Digital Marketing",
            "source": "course_quiz",
            "message": "Quiz Result: professional, Answers: {experience: beginner, goal: job}"
        })
        assert response.status_code == 200
        data = response.json()
        assert data["source"] == "course_quiz"
        print(f"PASS: Course quiz lead created with ID: {data['id']}")
    
    def test_create_lead_from_chatbot(self):
        """Test creating a lead from chatbot"""
        response = requests.post(f"{BASE_URL}/api/leads", json={
            "name": "Test Chatbot Lead",
            "email": "chatbotlead@example.com",
            "phone": "9876543212",
            "interest": "AI-Powered Marketing",
            "source": "chatbot"
        })
        assert response.status_code == 200
        data = response.json()
        assert data["source"] == "chatbot"
        print(f"PASS: Chatbot lead created with ID: {data['id']}")
    
    def test_get_leads_requires_auth(self):
        """Test that getting leads requires authentication"""
        response = requests.get(f"{BASE_URL}/api/leads")
        assert response.status_code == 401
        print("PASS: Get leads requires authentication")


class TestContact:
    """Test contact form endpoint"""
    
    def test_submit_contact_form(self):
        """Test contact form submission"""
        response = requests.post(f"{BASE_URL}/api/contact", json={
            "name": "Test Contact",
            "email": "contact@example.com",
            "phone": "9876543213",
            "subject": "Course Inquiry",
            "message": "I want to know more about the courses"
        })
        assert response.status_code == 200
        data = response.json()
        assert "Thank you" in data["message"]
        assert "lead_id" in data
        print(f"PASS: Contact form submitted, lead_id: {data['lead_id']}")


class TestCourses:
    """Test course endpoints"""
    
    def test_get_courses(self):
        """Test getting all courses"""
        response = requests.get(f"{BASE_URL}/api/courses")
        assert response.status_code == 200
        data = response.json()
        assert isinstance(data, list)
        # Should have at least 2 courses
        assert len(data) >= 2
        print(f"PASS: Retrieved {len(data)} courses")
        
        # Check course structure
        for course in data:
            assert "title" in course
            assert "slug" in course
            assert "duration" in course
            print(f"  - {course['title']} ({course['duration']})")
    
    def test_get_course_by_slug(self):
        """Test getting a specific course by slug"""
        response = requests.get(f"{BASE_URL}/api/courses/professional-digital-marketing")
        assert response.status_code == 200
        data = response.json()
        assert data["title"] == "Professional Digital Marketing"
        assert "modules" in data
        assert "highlights" in data
        print(f"PASS: Retrieved course: {data['title']}")
    
    def test_get_nonexistent_course(self):
        """Test getting a course that doesn't exist"""
        response = requests.get(f"{BASE_URL}/api/courses/nonexistent-course")
        assert response.status_code == 404
        print("PASS: Nonexistent course returns 404")


class TestBlogs:
    """Test blog endpoints"""
    
    def test_get_blogs(self):
        """Test getting all blogs"""
        response = requests.get(f"{BASE_URL}/api/blogs")
        assert response.status_code == 200
        data = response.json()
        assert isinstance(data, list)
        print(f"PASS: Retrieved {len(data)} blogs")
    
    def test_get_blog_by_slug(self):
        """Test getting a specific blog by slug"""
        # First get all blogs to find a valid slug
        response = requests.get(f"{BASE_URL}/api/blogs")
        blogs = response.json()
        
        if len(blogs) > 0:
            slug = blogs[0]["slug"]
            response = requests.get(f"{BASE_URL}/api/blogs/{slug}")
            assert response.status_code == 200
            data = response.json()
            assert data["slug"] == slug
            print(f"PASS: Retrieved blog: {data['title']}")
        else:
            print("SKIP: No blogs available to test")


class TestChatbot:
    """Test chatbot endpoint"""
    
    def test_chatbot_response(self):
        """Test chatbot responds to messages"""
        response = requests.post(f"{BASE_URL}/api/chat", json={
            "message": "What courses do you offer?",
            "session_id": "test-session-123"
        })
        assert response.status_code == 200
        data = response.json()
        assert "response" in data
        assert "session_id" in data
        assert data["session_id"] == "test-session-123"
        print(f"PASS: Chatbot responded: {data['response'][:100]}...")


class TestAnalytics:
    """Test analytics endpoints (requires auth)"""
    
    @pytest.fixture
    def auth_token(self):
        """Get authentication token"""
        response = requests.post(f"{BASE_URL}/api/admin/login", json={
            "email": "admin@skillax.in",
            "password": "SkillaxAdmin2024!"
        })
        return response.json()["token"]
    
    def test_analytics_summary(self, auth_token):
        """Test analytics summary endpoint"""
        headers = {"Authorization": f"Bearer {auth_token}"}
        response = requests.get(f"{BASE_URL}/api/analytics/summary", headers=headers)
        assert response.status_code == 200
        data = response.json()
        assert "total_leads" in data
        assert "new_leads" in data
        assert "total_courses" in data
        print(f"PASS: Analytics summary - Total leads: {data['total_leads']}, Courses: {data['total_courses']}")
    
    def test_leads_by_source(self, auth_token):
        """Test leads by source analytics"""
        headers = {"Authorization": f"Bearer {auth_token}"}
        response = requests.get(f"{BASE_URL}/api/analytics/leads-by-source", headers=headers)
        assert response.status_code == 200
        data = response.json()
        assert isinstance(data, list)
        print(f"PASS: Leads by source: {data}")


if __name__ == "__main__":
    pytest.main([__file__, "-v", "--tb=short"])
