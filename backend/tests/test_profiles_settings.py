"""
Skillax AI Profile Creator & Settings API Tests
Tests for: Student Profile CRUD, Profile Analytics, Site Settings, SEO Settings
"""
import pytest
import requests
import os
import uuid

BASE_URL = os.environ.get('REACT_APP_BACKEND_URL', 'https://marketedu-4.preview.emergentagent.com')


class TestStudentProfiles:
    """Test Student Profile endpoints"""
    
    @pytest.fixture(scope="class")
    def auth_token(self):
        """Get authentication token for admin"""
        response = requests.post(f"{BASE_URL}/api/admin/login", json={
            "email": "admin@skillax.in",
            "password": "SkillaxAdmin2024!"
        })
        assert response.status_code == 200
        return response.json()["token"]
    
    @pytest.fixture(scope="class")
    def headers(self, auth_token):
        """Get headers with auth token"""
        return {"Authorization": f"Bearer {auth_token}"}
    
    # ==================== PROFILE CREATION ====================
    def test_create_student_profile(self):
        """Test creating a new student profile with AI-generated content"""
        unique_email = f"test_{uuid.uuid4().hex[:8]}@example.com"
        
        response = requests.post(f"{BASE_URL}/api/profiles", json={
            "full_name": "TEST_John Doe",
            "email": unique_email,
            "phone": "+91 9876543210",
            "location": "Wayanad, Kerala",
            "linkedin_url": "https://linkedin.com/in/johndoe",
            "portfolio_url": "https://johndoe.com",
            "education_level": "bachelors",
            "field_of_study": "Computer Science",
            "institution": "Kerala University",
            "graduation_year": "2023",
            "career_stage": "fresher",
            "current_role": "Student",
            "target_role": "SEO Specialist",
            "career_goals": "Become a leading SEO expert in Kerala",
            "current_skills": ["SEO", "Content Writing", "Social Media"],
            "interests": ["Search Engine Optimization", "Content Marketing", "AI & Automation"],
            "preferred_learning_style": "hybrid",
            "why_digital_marketing": "I want to help businesses grow online",
            "availability": "full_time"
        })
        
        assert response.status_code == 200, f"Failed to create profile: {response.text}"
        data = response.json()
        
        # Verify profile data
        assert data["full_name"] == "TEST_John Doe"
        assert data["email"] == unique_email
        assert data["target_role"] == "SEO Specialist"
        assert "profile_code" in data
        assert data["profile_code"].startswith("SKX")
        assert "id" in data
        
        # Verify AI-generated content (may have defaults if AI fails)
        assert "ai_bio" in data
        assert "ai_linkedin_headline" in data
        assert "ai_course_recommendation" in data
        
        print(f"PASS: Profile created with code: {data['profile_code']}")
        print(f"AI Bio: {data.get('ai_bio', 'N/A')[:100]}...")
        
        return data["profile_code"]
    
    def test_create_profile_duplicate_email(self):
        """Test that duplicate email is rejected"""
        unique_email = f"duplicate_{uuid.uuid4().hex[:8]}@example.com"
        
        # Create first profile
        response1 = requests.post(f"{BASE_URL}/api/profiles", json={
            "full_name": "TEST_First User",
            "email": unique_email,
            "phone": "+91 9876543211",
            "location": "Kochi, Kerala",
            "education_level": "bachelors",
            "career_stage": "student",
            "target_role": "Digital Marketing Manager",
            "career_goals": "Lead marketing teams",
            "interests": ["Social Media Marketing"],
            "preferred_learning_style": "instructor_led",
            "why_digital_marketing": "Passion for marketing",
            "availability": "part_time"
        })
        assert response1.status_code == 200
        
        # Try to create second profile with same email
        response2 = requests.post(f"{BASE_URL}/api/profiles", json={
            "full_name": "TEST_Second User",
            "email": unique_email,
            "phone": "+91 9876543212",
            "location": "Trivandrum, Kerala",
            "education_level": "masters",
            "career_stage": "fresher",
            "target_role": "Content Strategist",
            "career_goals": "Create content strategies",
            "interests": ["Content Marketing"],
            "preferred_learning_style": "self_paced",
            "why_digital_marketing": "Love content creation",
            "availability": "weekends"
        })
        
        assert response2.status_code == 400
        assert "already exists" in response2.json().get("detail", "").lower()
        print("PASS: Duplicate email correctly rejected")
    
    # ==================== PUBLIC PROFILE ACCESS ====================
    def test_get_public_profile(self):
        """Test getting a public profile by profile code"""
        # First create a profile
        unique_email = f"public_{uuid.uuid4().hex[:8]}@example.com"
        
        create_response = requests.post(f"{BASE_URL}/api/profiles", json={
            "full_name": "TEST_Public Profile User",
            "email": unique_email,
            "phone": "+91 9876543213",
            "location": "Calicut, Kerala",
            "education_level": "working_professional",
            "career_stage": "3-5_years",
            "current_role": "Marketing Executive",
            "target_role": "Growth Hacker",
            "career_goals": "Master growth hacking techniques",
            "interests": ["AI & Automation", "Analytics & Data"],
            "preferred_learning_style": "hybrid",
            "why_digital_marketing": "Want to drive business growth",
            "availability": "weekends"
        })
        assert create_response.status_code == 200
        profile_code = create_response.json()["profile_code"]
        
        # Get the public profile
        response = requests.get(f"{BASE_URL}/api/profiles/{profile_code}")
        assert response.status_code == 200
        data = response.json()
        
        assert data["full_name"] == "TEST_Public Profile User"
        assert data["profile_code"] == profile_code
        assert data["is_public"] == True
        assert "profile_views" in data
        
        print(f"PASS: Public profile retrieved - {data['full_name']} ({profile_code})")
    
    def test_get_nonexistent_profile(self):
        """Test getting a profile that doesn't exist"""
        response = requests.get(f"{BASE_URL}/api/profiles/NONEXISTENT123")
        assert response.status_code == 404
        print("PASS: Nonexistent profile returns 404")
    
    def test_profile_view_count_increment(self):
        """Test that profile views are incremented on access"""
        # Create a profile
        unique_email = f"views_{uuid.uuid4().hex[:8]}@example.com"
        
        create_response = requests.post(f"{BASE_URL}/api/profiles", json={
            "full_name": "TEST_View Count User",
            "email": unique_email,
            "phone": "+91 9876543214",
            "location": "Thrissur, Kerala",
            "education_level": "high_school",
            "career_stage": "student",
            "target_role": "Social Media Manager",
            "career_goals": "Manage social media for brands",
            "interests": ["Social Media Marketing"],
            "preferred_learning_style": "self_paced",
            "why_digital_marketing": "Love social media",
            "availability": "full_time"
        })
        assert create_response.status_code == 200
        profile_code = create_response.json()["profile_code"]
        initial_views = create_response.json().get("profile_views", 0)
        
        # Access the profile multiple times
        for i in range(3):
            requests.get(f"{BASE_URL}/api/profiles/{profile_code}")
        
        # Check view count increased
        response = requests.get(f"{BASE_URL}/api/profiles/{profile_code}")
        assert response.status_code == 200
        new_views = response.json().get("profile_views", 0)
        
        # Views should have increased (at least by 3, possibly 4 including this request)
        assert new_views >= initial_views + 3
        print(f"PASS: Profile views incremented from {initial_views} to {new_views}")
    
    # ==================== ADMIN PROFILE MANAGEMENT ====================
    def test_get_all_profiles_admin(self, headers):
        """Test getting all profiles as admin"""
        response = requests.get(f"{BASE_URL}/api/admin/profiles", headers=headers)
        assert response.status_code == 200
        data = response.json()
        
        assert isinstance(data, list)
        if len(data) > 0:
            profile = data[0]
            assert "full_name" in profile
            assert "email" in profile
            assert "profile_code" in profile
            assert "career_stage" in profile
            assert "target_role" in profile
        
        print(f"PASS: Admin retrieved {len(data)} profiles")
    
    def test_profile_analytics(self, headers):
        """Test profile analytics endpoint"""
        response = requests.get(f"{BASE_URL}/api/analytics/profiles", headers=headers)
        assert response.status_code == 200
        data = response.json()
        
        assert "total_profiles" in data
        assert "by_career_stage" in data
        assert "by_education" in data
        assert "top_target_roles" in data
        assert "recent_profiles" in data
        
        assert isinstance(data["by_career_stage"], list)
        assert isinstance(data["by_education"], list)
        assert isinstance(data["top_target_roles"], list)
        assert isinstance(data["recent_profiles"], list)
        
        print(f"PASS: Profile Analytics - Total: {data['total_profiles']}, Career Stages: {len(data['by_career_stage'])}")


class TestSiteSettings:
    """Test Site Settings and SEO endpoints"""
    
    @pytest.fixture(scope="class")
    def auth_token(self):
        """Get authentication token for admin"""
        response = requests.post(f"{BASE_URL}/api/admin/login", json={
            "email": "admin@skillax.in",
            "password": "SkillaxAdmin2024!"
        })
        assert response.status_code == 200
        return response.json()["token"]
    
    @pytest.fixture(scope="class")
    def headers(self, auth_token):
        """Get headers with auth token"""
        return {"Authorization": f"Bearer {auth_token}"}
    
    # ==================== GET SETTINGS ====================
    def test_get_site_settings_public(self):
        """Test getting site settings (public endpoint for SEO)"""
        response = requests.get(f"{BASE_URL}/api/settings")
        assert response.status_code == 200
        data = response.json()
        
        # Verify required SEO fields
        assert "site_name" in data
        assert "tagline" in data
        assert "contact_email" in data
        assert "contact_phone" in data
        assert "meta_title" in data
        assert "meta_description" in data
        assert "meta_keywords" in data
        
        print(f"PASS: Site settings retrieved - {data['site_name']}")
        print(f"Meta Title: {data['meta_title']}")
    
    # ==================== UPDATE SETTINGS ====================
    def test_update_site_settings(self, headers):
        """Test updating site settings as admin"""
        # First get current settings
        get_response = requests.get(f"{BASE_URL}/api/settings")
        original_settings = get_response.json()
        
        # Update settings
        updated_settings = {
            "site_name": "Skillax Digital Marketing Academy",
            "tagline": "Kerala's #1 AI-Powered Digital Marketing Academy - Updated",
            "contact_email": "contact@skillax.in",
            "contact_phone": "+91-9876543210",
            "address": "Mananthavady, Wayanad, Kerala 670645",
            "meta_title": "Skillax Digital Marketing Academy | Mananthavady, Kerala - Updated",
            "meta_description": "Kerala's #1 AI-powered digital marketing academy. Learn SEO, AEO, GEO, Google Ads, Meta Ads, ChatGPT Ads, 30+ AI tools. Updated description.",
            "meta_keywords": "digital marketing course kerala, seo training wayanad, ai marketing",
            "social_facebook": "https://facebook.com/skillax",
            "social_instagram": "https://instagram.com/skillax",
            "social_linkedin": "https://linkedin.com/company/skillax",
            "social_twitter": "https://twitter.com/skillax",
            "social_youtube": "https://youtube.com/skillax",
            "whatsapp_number": "+919876543210",
            "google_analytics_id": "G-TESTID123"
        }
        
        response = requests.put(f"{BASE_URL}/api/admin/settings", headers=headers, json=updated_settings)
        assert response.status_code == 200
        data = response.json()
        assert "message" in data
        assert "success" in data["message"].lower()
        
        # Verify settings were updated
        verify_response = requests.get(f"{BASE_URL}/api/settings")
        assert verify_response.status_code == 200
        verified_data = verify_response.json()
        
        assert verified_data["tagline"] == updated_settings["tagline"]
        assert verified_data["meta_title"] == updated_settings["meta_title"]
        assert verified_data["social_facebook"] == updated_settings["social_facebook"]
        
        print("PASS: Site settings updated successfully")
        
        # Restore original settings
        requests.put(f"{BASE_URL}/api/admin/settings", headers=headers, json=original_settings)
    
    def test_update_settings_unauthorized(self):
        """Test that settings update requires authentication"""
        response = requests.put(f"{BASE_URL}/api/admin/settings", json={
            "site_name": "Unauthorized Update"
        })
        assert response.status_code == 401
        print("PASS: Unauthorized settings update rejected")


class TestCourseManagement:
    """Test Course Management endpoints"""
    
    @pytest.fixture(scope="class")
    def auth_token(self):
        """Get authentication token for admin"""
        response = requests.post(f"{BASE_URL}/api/admin/login", json={
            "email": "admin@skillax.in",
            "password": "SkillaxAdmin2024!"
        })
        assert response.status_code == 200
        return response.json()["token"]
    
    @pytest.fixture(scope="class")
    def headers(self, auth_token):
        """Get headers with auth token"""
        return {"Authorization": f"Bearer {auth_token}"}
    
    def test_get_courses(self):
        """Test getting all active courses"""
        response = requests.get(f"{BASE_URL}/api/courses")
        assert response.status_code == 200
        data = response.json()
        
        assert isinstance(data, list)
        if len(data) > 0:
            course = data[0]
            assert "title" in course
            assert "slug" in course
            assert "duration" in course
            assert "modules" in course
            assert "active" in course
        
        print(f"PASS: Retrieved {len(data)} courses")
    
    def test_toggle_course_status(self, headers):
        """Test toggling course active status"""
        # Get a course first
        courses_response = requests.get(f"{BASE_URL}/api/courses")
        courses = courses_response.json()
        
        if len(courses) > 0:
            course_id = courses[0]["id"]
            original_status = courses[0]["active"]
            
            # Toggle status
            response = requests.patch(
                f"{BASE_URL}/api/admin/courses/{course_id}/status?active={not original_status}", 
                headers=headers
            )
            assert response.status_code == 200
            
            # Restore original status
            requests.patch(
                f"{BASE_URL}/api/admin/courses/{course_id}/status?active={original_status}", 
                headers=headers
            )
            
            print(f"PASS: Course status toggled successfully")
        else:
            print("SKIP: No courses to test status toggle")


if __name__ == "__main__":
    pytest.main([__file__, "-v", "--tb=short"])
