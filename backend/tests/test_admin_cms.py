"""
Skillax Admin CMS API Tests
Tests for: Admin Dashboard, Analytics, Blog Management, Lead Management, Visitor Tracking
"""
import pytest
import requests
import os

BASE_URL = os.environ.get('REACT_APP_BACKEND_URL', 'https://marketedu-4.preview.emergentagent.com')


class TestAdminCMS:
    """Test Admin CMS endpoints"""
    
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
    
    # ==================== ANALYTICS SUMMARY ====================
    def test_analytics_summary(self, headers):
        """Test analytics summary endpoint returns all required stats"""
        response = requests.get(f"{BASE_URL}/api/analytics/summary", headers=headers)
        assert response.status_code == 200
        data = response.json()
        
        # Verify all required fields for Dashboard Overview
        assert "total_leads" in data
        assert "new_leads" in data
        assert "website_leads" in data
        assert "chatbot_leads" in data
        assert "total_courses" in data
        assert "total_blogs" in data
        assert "total_page_views" in data
        assert "unique_visitors" in data
        
        print(f"PASS: Analytics Summary - Total Leads: {data['total_leads']}, Page Views: {data['total_page_views']}, Blogs: {data['total_blogs']}")
    
    # ==================== LEAD CONVERSION STATS ====================
    def test_lead_conversion_stats(self, headers):
        """Test lead conversion stats for Analytics tab"""
        response = requests.get(f"{BASE_URL}/api/analytics/lead-conversion", headers=headers)
        assert response.status_code == 200
        data = response.json()
        
        # Verify lead conversion funnel data
        assert "total_leads" in data
        assert "converted_leads" in data
        assert "pending_leads" in data
        assert "conversion_rate" in data
        assert "leads_by_status" in data
        assert "leads_trend" in data
        
        # Verify data types
        assert isinstance(data["conversion_rate"], (int, float))
        assert isinstance(data["leads_by_status"], list)
        assert isinstance(data["leads_trend"], list)
        
        print(f"PASS: Lead Conversion - Total: {data['total_leads']}, Converted: {data['converted_leads']}, Rate: {data['conversion_rate']}%")
    
    # ==================== LEADS BY SOURCE ====================
    def test_leads_by_source(self, headers):
        """Test leads by source for Traffic Sources chart"""
        response = requests.get(f"{BASE_URL}/api/analytics/leads-by-source", headers=headers)
        assert response.status_code == 200
        data = response.json()
        
        assert isinstance(data, list)
        for item in data:
            assert "source" in item
            assert "count" in item
        
        print(f"PASS: Leads by Source - {len(data)} sources found: {data}")
    
    # ==================== TOP PAGES ====================
    def test_top_pages(self, headers):
        """Test top pages analytics"""
        response = requests.get(f"{BASE_URL}/api/analytics/top-pages", headers=headers)
        assert response.status_code == 200
        data = response.json()
        
        assert isinstance(data, list)
        for item in data:
            assert "path" in item
            assert "views" in item
        
        print(f"PASS: Top Pages - {len(data)} pages tracked")
    
    # ==================== PAGE VIEWS ====================
    def test_page_views_trend(self, headers):
        """Test page views trend for last 7 days"""
        response = requests.get(f"{BASE_URL}/api/analytics/page-views?days=7", headers=headers)
        assert response.status_code == 200
        data = response.json()
        
        assert isinstance(data, list)
        for item in data:
            assert "date" in item
            assert "views" in item
        
        print(f"PASS: Page Views Trend - {len(data)} days of data")
    
    # ==================== VISITOR TRACKING ====================
    def test_track_page_view(self):
        """Test visitor tracking endpoint (public)"""
        response = requests.post(f"{BASE_URL}/api/track/pageview", json={
            "path": "/test-page",
            "referrer": "https://google.com",
            "user_agent": "TestBot/1.0",
            "session_id": "test-session-tracking-123"
        })
        assert response.status_code == 200
        data = response.json()
        
        assert data["status"] == "tracked"
        assert "id" in data
        
        print(f"PASS: Page view tracked with ID: {data['id']}")
    
    # ==================== LEADS MANAGEMENT ====================
    def test_get_leads_with_filters(self, headers):
        """Test getting leads with filters"""
        # Test without filters
        response = requests.get(f"{BASE_URL}/api/leads?limit=100", headers=headers)
        assert response.status_code == 200
        data = response.json()
        assert isinstance(data, list)
        print(f"PASS: Retrieved {len(data)} leads")
        
        # Test with status filter
        response = requests.get(f"{BASE_URL}/api/leads?status=new&limit=50", headers=headers)
        assert response.status_code == 200
        data = response.json()
        for lead in data:
            assert lead["status"] == "new"
        print(f"PASS: Retrieved {len(data)} new leads")
    
    def test_update_lead_status(self, headers):
        """Test updating lead status"""
        # First create a test lead
        create_response = requests.post(f"{BASE_URL}/api/leads", json={
            "name": "TEST_Status Update Lead",
            "email": "statustest@example.com",
            "phone": "9876543299",
            "interest": "Professional Digital Marketing",
            "source": "website"
        })
        assert create_response.status_code == 200
        lead_id = create_response.json()["id"]
        
        # Update status to contacted
        response = requests.patch(f"{BASE_URL}/api/leads/{lead_id}/status?status=contacted", headers=headers)
        assert response.status_code == 200
        data = response.json()
        assert data["status"] == "contacted"
        print(f"PASS: Lead status updated to 'contacted'")
        
        # Update status to converted
        response = requests.patch(f"{BASE_URL}/api/leads/{lead_id}/status?status=converted", headers=headers)
        assert response.status_code == 200
        data = response.json()
        assert data["status"] == "converted"
        print(f"PASS: Lead status updated to 'converted'")
    
    # ==================== BLOG MANAGEMENT ====================
    def test_get_admin_blogs(self, headers):
        """Test getting all blogs for admin (including unpublished)"""
        response = requests.get(f"{BASE_URL}/api/admin/blogs", headers=headers)
        assert response.status_code == 200
        data = response.json()
        assert isinstance(data, list)
        print(f"PASS: Retrieved {len(data)} blogs for admin")
    
    def test_create_blog(self, headers):
        """Test creating a new blog post"""
        response = requests.post(f"{BASE_URL}/api/blogs", headers=headers, json={
            "title": "TEST_Blog Post for Testing",
            "slug": "test-blog-post-testing",
            "excerpt": "This is a test blog post excerpt",
            "content": "This is the full content of the test blog post. It contains **markdown** formatting.",
            "category": "Industry Insights",
            "tags": ["test", "automation"],
            "author": "Test Author",
            "featured_image": "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800"
        })
        assert response.status_code == 200
        data = response.json()
        
        assert data["title"] == "TEST_Blog Post for Testing"
        assert data["slug"] == "test-blog-post-testing"
        assert data["published"] == True
        assert "id" in data
        
        print(f"PASS: Blog created with ID: {data['id']}")
        return data["id"]
    
    def test_update_blog(self, headers):
        """Test updating a blog post"""
        # First create a blog
        create_response = requests.post(f"{BASE_URL}/api/blogs", headers=headers, json={
            "title": "TEST_Blog to Update",
            "slug": "test-blog-to-update",
            "excerpt": "Original excerpt",
            "content": "Original content",
            "category": "Career Guide",
            "tags": ["original"],
            "author": "Original Author"
        })
        blog_id = create_response.json()["id"]
        
        # Update the blog
        response = requests.put(f"{BASE_URL}/api/blogs/{blog_id}", headers=headers, json={
            "title": "TEST_Blog Updated Title",
            "slug": "test-blog-to-update",
            "excerpt": "Updated excerpt",
            "content": "Updated content with more details",
            "category": "Marketing Strategy",
            "tags": ["updated", "test"],
            "author": "Updated Author"
        })
        assert response.status_code == 200
        data = response.json()
        
        assert data["title"] == "TEST_Blog Updated Title"
        assert data["excerpt"] == "Updated excerpt"
        assert data["category"] == "Marketing Strategy"
        
        print(f"PASS: Blog updated successfully")
    
    def test_toggle_blog_publish(self, headers):
        """Test toggling blog publish status"""
        # First create a blog
        create_response = requests.post(f"{BASE_URL}/api/blogs", headers=headers, json={
            "title": "TEST_Blog to Toggle",
            "slug": "test-blog-to-toggle",
            "excerpt": "Test excerpt",
            "content": "Test content",
            "category": "SEO Tips",
            "tags": ["test"],
            "author": "Test Author"
        })
        blog_id = create_response.json()["id"]
        
        # Unpublish the blog
        response = requests.patch(f"{BASE_URL}/api/blogs/{blog_id}/publish?published=false", headers=headers)
        assert response.status_code == 200
        data = response.json()
        assert "unpublished" in data["message"].lower()
        print(f"PASS: Blog unpublished")
        
        # Publish the blog again
        response = requests.patch(f"{BASE_URL}/api/blogs/{blog_id}/publish?published=true", headers=headers)
        assert response.status_code == 200
        data = response.json()
        assert "published" in data["message"].lower()
        print(f"PASS: Blog published")
    
    def test_delete_blog(self, headers):
        """Test deleting a blog post"""
        # First create a blog
        create_response = requests.post(f"{BASE_URL}/api/blogs", headers=headers, json={
            "title": "TEST_Blog to Delete",
            "slug": "test-blog-to-delete",
            "excerpt": "Test excerpt",
            "content": "Test content",
            "category": "AI & Automation",
            "tags": ["test"],
            "author": "Test Author"
        })
        blog_id = create_response.json()["id"]
        
        # Delete the blog
        response = requests.delete(f"{BASE_URL}/api/blogs/{blog_id}", headers=headers)
        assert response.status_code == 200
        
        # Verify it's deleted
        response = requests.get(f"{BASE_URL}/api/blogs/test-blog-to-delete")
        assert response.status_code == 404
        
        print(f"PASS: Blog deleted successfully")
    
    # ==================== LEADS BY INTEREST ====================
    def test_leads_by_interest(self, headers):
        """Test leads by interest analytics"""
        response = requests.get(f"{BASE_URL}/api/analytics/leads-by-interest", headers=headers)
        assert response.status_code == 200
        data = response.json()
        
        assert isinstance(data, list)
        for item in data:
            assert "interest" in item
            assert "count" in item
        
        print(f"PASS: Leads by Interest - {len(data)} interests found")


if __name__ == "__main__":
    pytest.main([__file__, "-v", "--tb=short"])
