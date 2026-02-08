import requests
import sys
import json
from datetime import datetime

class SkillaxAPITester:
    def __init__(self, base_url="https://marketedu-4.preview.emergentagent.com/api"):
        self.base_url = base_url
        self.admin_token = None
        self.tests_run = 0
        self.tests_passed = 0
        self.failed_tests = []
        self.session = requests.Session()
        self.session.headers.update({'Content-Type': 'application/json'})

    def log_test(self, name, success, details=""):
        """Log test results"""
        self.tests_run += 1
        if success:
            self.tests_passed += 1
            print(f"✅ {name}")
        else:
            self.failed_tests.append({"test": name, "details": details})
            print(f"❌ {name} - {details}")

    def run_test(self, name, method, endpoint, expected_status, data=None, headers=None):
        """Run a single API test"""
        url = f"{self.base_url}/{endpoint}"
        test_headers = self.session.headers.copy()
        if headers:
            test_headers.update(headers)

        print(f"\n🔍 Testing {name}...")
        
        try:
            if method == 'GET':
                response = self.session.get(url, headers=test_headers)
            elif method == 'POST':
                response = self.session.post(url, json=data, headers=test_headers)
            elif method == 'PUT':
                response = self.session.put(url, json=data, headers=test_headers)
            elif method == 'PATCH':
                response = self.session.patch(url, json=data, headers=test_headers)
            elif method == 'DELETE':
                response = self.session.delete(url, headers=test_headers)

            success = response.status_code == expected_status
            if success:
                self.log_test(name, True)
                try:
                    return True, response.json()
                except:
                    return True, response.text
            else:
                self.log_test(name, False, f"Expected {expected_status}, got {response.status_code}")
                return False, {}

        except Exception as e:
            self.log_test(name, False, f"Error: {str(e)}")
            return False, {}

    def test_root_endpoint(self):
        """Test API root endpoint"""
        return self.run_test("API Root", "GET", "", 200)

    def test_seed_data(self):
        """Test seeding initial data"""
        return self.run_test("Seed Data", "POST", "seed", 200)

    def test_admin_login(self):
        """Test admin login"""
        success, response = self.run_test(
            "Admin Login",
            "POST",
            "admin/login",
            200,
            data={"email": "admin@skillax.in", "password": "SkillaxAdmin2024!"}
        )
        if success and 'token' in response:
            self.admin_token = response['token']
            self.session.headers.update({'Authorization': f'Bearer {self.admin_token}'})
            return True
        return False

    def test_admin_profile(self):
        """Test getting admin profile"""
        if not self.admin_token:
            self.log_test("Admin Profile", False, "No admin token available")
            return False
        return self.run_test("Admin Profile", "GET", "admin/me", 200)

    def test_create_lead(self):
        """Test creating a lead"""
        lead_data = {
            "name": f"Test User {datetime.now().strftime('%H%M%S')}",
            "email": f"test{datetime.now().strftime('%H%M%S')}@example.com",
            "phone": "+91 9876543210",
            "interest": "Digital Marketing Foundation",
            "source": "website",
            "message": "Interested in learning more about the course"
        }
        success, response = self.run_test("Create Lead", "POST", "leads", 200, data=lead_data)
        if success:
            return response.get('id')
        return None

    def test_get_leads(self):
        """Test getting leads (admin only)"""
        if not self.admin_token:
            self.log_test("Get Leads", False, "No admin token available")
            return False
        return self.run_test("Get Leads", "GET", "leads", 200)

    def test_contact_form(self):
        """Test contact form submission"""
        contact_data = {
            "name": f"Contact Test {datetime.now().strftime('%H%M%S')}",
            "email": f"contact{datetime.now().strftime('%H%M%S')}@example.com",
            "phone": "+91 9876543210",
            "subject": "Course Inquiry",
            "message": "I would like to know more about your courses"
        }
        return self.run_test("Contact Form", "POST", "contact", 200, data=contact_data)

    def test_get_courses(self):
        """Test getting courses"""
        return self.run_test("Get Courses", "GET", "courses", 200)

    def test_get_course_by_slug(self):
        """Test getting specific course by slug"""
        return self.run_test("Get Course by Slug", "GET", "courses/professional-digital-marketing", 200)

    def test_get_blogs(self):
        """Test getting blog posts"""
        return self.run_test("Get Blogs", "GET", "blogs", 200)

    def test_get_blog_by_slug(self):
        """Test getting specific blog by slug"""
        return self.run_test("Get Blog by Slug", "GET", "blogs/digital-marketing-trends-2025", 200)

    def test_analytics_summary(self):
        """Test analytics summary (admin only)"""
        if not self.admin_token:
            self.log_test("Analytics Summary", False, "No admin token available")
            return False
        return self.run_test("Analytics Summary", "GET", "analytics/summary", 200)

    def test_leads_by_source(self):
        """Test leads by source analytics (admin only)"""
        if not self.admin_token:
            self.log_test("Leads by Source", False, "No admin token available")
            return False
        return self.run_test("Leads by Source", "GET", "analytics/leads-by-source", 200)

    def test_chatbot(self):
        """Test chatbot functionality"""
        chat_data = {
            "message": "Hello, I want to know about your courses",
            "session_id": f"test_session_{datetime.now().strftime('%H%M%S')}"
        }
        return self.run_test("Chatbot", "POST", "chat", 200, data=chat_data)

    def test_invalid_endpoints(self):
        """Test invalid endpoints return 404"""
        success, _ = self.run_test("Invalid Endpoint", "GET", "nonexistent", 404)
        return success

    def run_all_tests(self):
        """Run all API tests"""
        print("🚀 Starting Skillax Academy API Tests")
        print("=" * 50)

        # Test basic connectivity
        self.test_root_endpoint()
        
        # Seed data first
        self.test_seed_data()
        
        # Test admin authentication
        self.test_admin_login()
        self.test_admin_profile()
        
        # Test public endpoints
        self.test_get_courses()
        self.test_get_course_by_slug()
        self.test_get_blogs()
        self.test_get_blog_by_slug()
        
        # Test lead creation
        lead_id = self.test_create_lead()
        self.test_contact_form()
        
        # Test admin endpoints
        self.test_get_leads()
        self.test_analytics_summary()
        self.test_leads_by_source()
        
        # Test chatbot
        self.test_chatbot()
        
        # Test error handling
        self.test_invalid_endpoints()

        # Print results
        print("\n" + "=" * 50)
        print(f"📊 Test Results: {self.tests_passed}/{self.tests_run} passed")
        
        if self.failed_tests:
            print("\n❌ Failed Tests:")
            for test in self.failed_tests:
                print(f"  - {test['test']}: {test['details']}")
        
        return self.tests_passed == self.tests_run

def main():
    tester = SkillaxAPITester()
    success = tester.run_all_tests()
    return 0 if success else 1

if __name__ == "__main__":
    sys.exit(main())