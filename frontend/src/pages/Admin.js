import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LayoutDashboard, Users, FileText, BookOpen, Settings,
  LogOut, Menu, X, Download, Loader2, TrendingUp,
  MessageCircle, Globe, ChevronRight, RefreshCcw, Plus,
  Edit, Trash2, Eye, EyeOff, Save, ArrowLeft, BarChart3,
  PieChart, Activity, MapPin, Calendar, Clock, CheckCircle,
  XCircle, AlertCircle, Search, Filter, ChevronDown
} from 'lucide-react';
import { Button } from '../components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../components/ui/card';
import axios from 'axios';
import { toast } from 'sonner';

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

// ==================== LOGIN COMPONENT ====================
function AdminLogin({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await axios.post(`${API}/admin/login`, { email, password });
      localStorage.setItem('adminToken', response.data.token);
      localStorage.setItem('adminUser', JSON.stringify(response.data.user));
      onLogin(response.data.user);
    } catch (err) {
      setError('Invalid credentials. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl mb-4 shadow-lg">
              <LayoutDashboard className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-white">Admin Portal</h1>
            <p className="text-slate-400 text-sm">Sign in to manage your academy</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4" data-testid="admin-login-form">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1.5">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@skillax.in"
                data-testid="admin-email"
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1.5">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                data-testid="admin-password"
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            {error && (
              <p className="text-sm text-red-400">{error}</p>
            )}

            <Button
              type="submit"
              data-testid="admin-submit"
              className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-xl py-6 font-semibold"
              disabled={loading}
            >
              {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : 'Sign In'}
            </Button>
          </form>

          <p className="text-center text-xs text-slate-500 mt-6">
            Default: admin@skillax.in / SkillaxAdmin2024!
          </p>
        </div>
      </motion.div>
    </div>
  );
}

// ==================== STAT CARD COMPONENT ====================
function StatCard({ title, value, subtitle, icon: Icon, trend, color = 'blue' }) {
  const colors = {
    blue: 'from-blue-500 to-blue-600',
    green: 'from-green-500 to-green-600',
    purple: 'from-purple-500 to-purple-600',
    amber: 'from-amber-500 to-amber-600',
    pink: 'from-pink-500 to-pink-600',
    cyan: 'from-cyan-500 to-cyan-600',
  };

  return (
    <motion.div whileHover={{ y: -2, scale: 1.01 }} transition={{ duration: 0.2 }}>
      <Card className="overflow-hidden">
        <CardContent className="p-0">
          <div className="flex items-stretch">
            <div className={`w-2 bg-gradient-to-b ${colors[color]}`} />
            <div className="flex-1 p-5">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{title}</p>
                  <p className="text-3xl font-bold mt-1">{value}</p>
                  {subtitle && (
                    <div className="flex items-center gap-1.5 mt-2">
                      {trend !== undefined && (
                        <TrendingUp className={`h-4 w-4 ${trend >= 0 ? 'text-green-500' : 'text-red-500 rotate-180'}`} />
                      )}
                      <span className="text-sm text-muted-foreground">{subtitle}</span>
                    </div>
                  )}
                </div>
                <div className={`p-3 rounded-xl bg-gradient-to-br ${colors[color]} text-white`}>
                  <Icon className="h-6 w-6" />
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

// ==================== BLOG EDITOR COMPONENT ====================
function BlogEditor({ blog, onSave, onCancel }) {
  const [formData, setFormData] = useState({
    title: blog?.title || '',
    slug: blog?.slug || '',
    excerpt: blog?.excerpt || '',
    content: blog?.content || '',
    category: blog?.category || '',
    tags: blog?.tags?.join(', ') || '',
    author: blog?.author || 'Skillax Team',
    featured_image: blog?.featured_image || '',
  });
  const [saving, setSaving] = useState(false);

  const generateSlug = (title) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  };

  const handleTitleChange = (e) => {
    const title = e.target.value;
    setFormData(prev => ({
      ...prev,
      title,
      slug: blog?.id ? prev.slug : generateSlug(title)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const payload = {
        ...formData,
        tags: formData.tags.split(',').map(t => t.trim()).filter(Boolean)
      };
      await onSave(payload);
    } finally {
      setSaving(false);
    }
  };

  const categories = ['Industry Insights', 'Career Guide', 'Marketing Strategy', 'SEO Tips', 'AI & Automation', 'Success Stories'];

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="flex items-center gap-4 mb-6">
        <Button type="button" variant="ghost" onClick={onCancel}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
        <h2 className="text-xl font-bold">{blog?.id ? 'Edit Blog Post' : 'Create New Blog Post'}</h2>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1.5">Title *</label>
            <input
              type="text"
              value={formData.title}
              onChange={handleTitleChange}
              className="w-full px-4 py-3 bg-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1.5">Slug</label>
            <input
              type="text"
              value={formData.slug}
              onChange={(e) => setFormData(prev => ({ ...prev, slug: e.target.value }))}
              className="w-full px-4 py-3 bg-muted border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1.5">Category *</label>
            <select
              value={formData.category}
              onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
              className="w-full px-4 py-3 bg-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary"
              required
            >
              <option value="">Select Category</option>
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1.5">Tags (comma separated)</label>
            <input
              type="text"
              value={formData.tags}
              onChange={(e) => setFormData(prev => ({ ...prev, tags: e.target.value }))}
              placeholder="seo, marketing, ai"
              className="w-full px-4 py-3 bg-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1.5">Featured Image URL</label>
            <input
              type="url"
              value={formData.featured_image}
              onChange={(e) => setFormData(prev => ({ ...prev, featured_image: e.target.value }))}
              placeholder="https://..."
              className="w-full px-4 py-3 bg-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1.5">Author</label>
            <input
              type="text"
              value={formData.author}
              onChange={(e) => setFormData(prev => ({ ...prev, author: e.target.value }))}
              className="w-full px-4 py-3 bg-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1.5">Excerpt *</label>
            <textarea
              value={formData.excerpt}
              onChange={(e) => setFormData(prev => ({ ...prev, excerpt: e.target.value }))}
              rows={3}
              className="w-full px-4 py-3 bg-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary resize-none"
              placeholder="Brief summary of the post..."
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1.5">Content * (Supports Markdown)</label>
            <textarea
              value={formData.content}
              onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
              rows={15}
              className="w-full px-4 py-3 bg-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary font-mono text-sm resize-none"
              placeholder="Write your blog content here... Use Markdown for formatting."
              required
            />
            <p className="text-xs text-muted-foreground mt-1">
              Use **bold**, *italic*, # headings, - lists, and [links](url)
            </p>
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-3 pt-4 border-t">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" disabled={saving} className="bg-primary">
          {saving ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Save className="h-4 w-4 mr-2" />}
          {blog?.id ? 'Update Post' : 'Create Post'}
        </Button>
      </div>
    </form>
  );
}

// ==================== DASHBOARD COMPONENT ====================
function Dashboard({ user, onLogout }) {
  const [activeTab, setActiveTab] = useState('overview');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [analytics, setAnalytics] = useState(null);
  const [leads, setLeads] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [leadsBySource, setLeadsBySource] = useState([]);
  const [leadConversion, setLeadConversion] = useState(null);
  const [topPages, setTopPages] = useState([]);
  const [pageViews, setPageViews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingBlog, setEditingBlog] = useState(null);
  const [showBlogEditor, setShowBlogEditor] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  const token = localStorage.getItem('adminToken');
  const headers = { Authorization: `Bearer ${token}` };

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const [analyticsRes, leadsRes, sourceRes, conversionRes, topPagesRes, pageViewsRes, blogsRes] = await Promise.all([
        axios.get(`${API}/analytics/summary`, { headers }),
        axios.get(`${API}/leads?limit=100`, { headers }),
        axios.get(`${API}/analytics/leads-by-source`, { headers }),
        axios.get(`${API}/analytics/lead-conversion`, { headers }),
        axios.get(`${API}/analytics/top-pages`, { headers }),
        axios.get(`${API}/analytics/page-views?days=7`, { headers }),
        axios.get(`${API}/admin/blogs`, { headers }),
      ]);
      setAnalytics(analyticsRes.data);
      setLeads(leadsRes.data);
      setLeadsBySource(sourceRes.data);
      setLeadConversion(conversionRes.data);
      setTopPages(topPagesRes.data);
      setPageViews(pageViewsRes.data);
      setBlogs(blogsRes.data);
    } catch (error) {
      console.error('Error fetching data:', error);
      toast.error('Failed to fetch data');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const menuItems = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'leads', label: 'Leads', icon: Users },
    { id: 'blogs', label: 'Blog Posts', icon: FileText },
    { id: 'courses', label: 'Courses', icon: BookOpen },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
    onLogout();
  };

  const exportLeads = () => {
    const csv = [
      ['Name', 'Email', 'Phone', 'Interest', 'Source', 'Status', 'Date'].join(','),
      ...leads.map(l => [l.name, l.email, l.phone, l.interest, l.source, l.status, l.created_at].join(','))
    ].join('\n');
    
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'skillax_leads.csv';
    a.click();
    toast.success('Leads exported successfully');
  };

  const updateLeadStatus = async (leadId, status) => {
    try {
      await axios.patch(`${API}/leads/${leadId}/status?status=${status}`, {}, { headers });
      setLeads(prev => prev.map(l => l.id === leadId ? { ...l, status } : l));
      toast.success('Lead status updated');
    } catch (error) {
      toast.error('Failed to update lead status');
    }
  };

  const handleSaveBlog = async (blogData) => {
    try {
      if (editingBlog?.id) {
        await axios.put(`${API}/blogs/${editingBlog.id}`, blogData, { headers });
        toast.success('Blog post updated');
      } else {
        await axios.post(`${API}/blogs`, blogData, { headers });
        toast.success('Blog post created');
      }
      setShowBlogEditor(false);
      setEditingBlog(null);
      fetchData();
    } catch (error) {
      toast.error('Failed to save blog post');
    }
  };

  const handleDeleteBlog = async (blogId) => {
    if (!window.confirm('Are you sure you want to delete this blog post?')) return;
    try {
      await axios.delete(`${API}/blogs/${blogId}`, { headers });
      toast.success('Blog post deleted');
      fetchData();
    } catch (error) {
      toast.error('Failed to delete blog post');
    }
  };

  const toggleBlogPublish = async (blogId, currentStatus) => {
    try {
      await axios.patch(`${API}/blogs/${blogId}/publish?published=${!currentStatus}`, {}, { headers });
      setBlogs(prev => prev.map(b => b.id === blogId ? { ...b, published: !currentStatus } : b));
      toast.success(currentStatus ? 'Blog unpublished' : 'Blog published');
    } catch (error) {
      toast.error('Failed to update blog status');
    }
  };

  const filteredLeads = leads.filter(lead => {
    const matchesSearch = !searchTerm || 
      lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = !statusFilter || lead.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const statusColors = {
    new: 'bg-green-500/10 text-green-600 border-green-500/20',
    contacted: 'bg-amber-500/10 text-amber-600 border-amber-500/20',
    converted: 'bg-blue-500/10 text-blue-600 border-blue-500/20',
    lost: 'bg-red-500/10 text-red-600 border-red-500/20',
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      {/* Mobile Header */}
      <div className="lg:hidden flex items-center justify-between p-4 bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700">
        <h1 className="font-bold text-lg">Skillax Admin</h1>
        <button onClick={() => setSidebarOpen(!sidebarOpen)}>
          {sidebarOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      <div className="flex">
        {/* Sidebar */}
        <AnimatePresence>
          {(sidebarOpen || window.innerWidth >= 1024) && (
            <motion.aside
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              className="fixed lg:static inset-y-0 left-0 z-50 w-64 bg-white dark:bg-slate-800 border-r border-slate-200 dark:border-slate-700 p-6 flex flex-col shadow-xl lg:shadow-none"
            >
              <div className="mb-8">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                    <LayoutDashboard className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h1 className="font-bold text-lg">Skillax CMS</h1>
                    <p className="text-xs text-muted-foreground">{user?.name}</p>
                  </div>
                </div>
              </div>

              <nav className="flex-1 space-y-1">
                {menuItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        setActiveTab(item.id);
                        setSidebarOpen(false);
                        setShowBlogEditor(false);
                      }}
                      data-testid={`admin-nav-${item.id}`}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                        activeTab === item.id
                          ? 'bg-primary text-primary-foreground shadow-md'
                          : 'hover:bg-slate-100 dark:hover:bg-slate-700'
                      }`}
                    >
                      <Icon className="h-5 w-5" />
                      {item.label}
                    </button>
                  );
                })}
              </nav>

              <button
                onClick={handleLogout}
                data-testid="admin-logout"
                className="flex items-center gap-3 px-4 py-3 text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-xl transition-colors mt-auto"
              >
                <LogOut className="h-5 w-5" />
                Logout
              </button>
            </motion.aside>
          )}
        </AnimatePresence>

        {/* Main Content */}
        <main className="flex-1 p-6 lg:p-8 overflow-auto min-h-screen">
          {loading ? (
            <div className="flex items-center justify-center h-64">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : (
            <>
              {/* Overview Tab */}
              {activeTab === 'overview' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-2xl font-bold">Dashboard Overview</h2>
                      <p className="text-muted-foreground">Welcome back, {user?.name}</p>
                    </div>
                    <Button onClick={fetchData} variant="outline" size="sm">
                      <RefreshCcw className="h-4 w-4 mr-2" />
                      Refresh
                    </Button>
                  </div>

                  {/* Stats Grid */}
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    <StatCard 
                      title="Total Leads" 
                      value={analytics?.total_leads || 0}
                      subtitle={`${analytics?.new_leads || 0} new leads`}
                      icon={Users}
                      color="blue"
                    />
                    <StatCard 
                      title="Page Views" 
                      value={analytics?.total_page_views || 0}
                      subtitle={`${analytics?.unique_visitors || 0} unique visitors`}
                      icon={Eye}
                      color="green"
                    />
                    <StatCard 
                      title="Conversion Rate" 
                      value={`${leadConversion?.conversion_rate || 0}%`}
                      subtitle={`${leadConversion?.converted_leads || 0} converted`}
                      icon={TrendingUp}
                      color="purple"
                    />
                    <StatCard 
                      title="Blog Posts" 
                      value={analytics?.total_blogs || 0}
                      subtitle="Published articles"
                      icon={FileText}
                      color="amber"
                    />
                  </div>

                  <div className="grid lg:grid-cols-2 gap-6">
                    {/* Leads by Source */}
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <PieChart className="h-5 w-5 text-primary" />
                          Leads by Source
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {leadsBySource.map((item, index) => {
                            const total = leadsBySource.reduce((sum, i) => sum + i.count, 0);
                            const percentage = total > 0 ? ((item.count / total) * 100).toFixed(0) : 0;
                            return (
                              <div key={index} className="space-y-2">
                                <div className="flex items-center justify-between text-sm">
                                  <span className="capitalize font-medium">{item.source?.replace('_', ' ') || 'Unknown'}</span>
                                  <span className="text-muted-foreground">{item.count} ({percentage}%)</span>
                                </div>
                                <div className="h-2 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                                  <motion.div 
                                    className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
                                    initial={{ width: 0 }}
                                    animate={{ width: `${percentage}%` }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                  />
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </CardContent>
                    </Card>

                    {/* Top Pages */}
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Activity className="h-5 w-5 text-primary" />
                          Top Pages
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          {topPages.length > 0 ? topPages.slice(0, 5).map((page, index) => (
                            <div key={index} className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
                              <span className="text-sm font-medium truncate flex-1">{page.path || '/'}</span>
                              <span className="text-sm text-muted-foreground ml-2">{page.views} views</span>
                            </div>
                          )) : (
                            <p className="text-sm text-muted-foreground text-center py-4">No page views recorded yet</p>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Recent Leads */}
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between">
                      <div>
                        <CardTitle>Recent Leads</CardTitle>
                        <CardDescription>Latest inquiries from the website</CardDescription>
                      </div>
                      <Button onClick={() => setActiveTab('leads')} variant="ghost" size="sm">
                        View All <ChevronRight className="h-4 w-4 ml-1" />
                      </Button>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {leads.slice(0, 5).map((lead, index) => (
                          <div key={index} className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800 rounded-xl">
                            <div className="flex items-center gap-4">
                              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
                                {lead.name.charAt(0).toUpperCase()}
                              </div>
                              <div>
                                <div className="font-medium">{lead.name}</div>
                                <div className="text-sm text-muted-foreground">{lead.email}</div>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="text-sm font-medium">{lead.interest}</div>
                              <span className={`text-xs px-2 py-1 rounded-full border ${statusColors[lead.status] || 'bg-slate-100'}`}>
                                {lead.status}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}

              {/* Analytics Tab */}
              {activeTab === 'analytics' && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-bold">Analytics Dashboard</h2>
                    <p className="text-muted-foreground">Detailed insights into your website performance</p>
                  </div>

                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    <StatCard 
                      title="Total Page Views" 
                      value={analytics?.total_page_views || 0}
                      icon={Eye}
                      color="blue"
                    />
                    <StatCard 
                      title="Unique Visitors" 
                      value={analytics?.unique_visitors || 0}
                      icon={Users}
                      color="green"
                    />
                    <StatCard 
                      title="Total Leads" 
                      value={analytics?.total_leads || 0}
                      icon={MessageCircle}
                      color="purple"
                    />
                    <StatCard 
                      title="Conversion Rate" 
                      value={`${leadConversion?.conversion_rate || 0}%`}
                      icon={TrendingUp}
                      color="amber"
                    />
                  </div>

                  <div className="grid lg:grid-cols-2 gap-6">
                    {/* Lead Conversion Funnel */}
                    <Card>
                      <CardHeader>
                        <CardTitle>Lead Conversion Funnel</CardTitle>
                        <CardDescription>Track leads through the sales pipeline</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {leadConversion?.leads_by_status?.map((item, index) => (
                            <div key={index} className="flex items-center gap-4">
                              <div className={`w-3 h-3 rounded-full ${
                                item.status === 'new' ? 'bg-green-500' :
                                item.status === 'contacted' ? 'bg-amber-500' :
                                item.status === 'converted' ? 'bg-blue-500' : 'bg-red-500'
                              }`} />
                              <div className="flex-1">
                                <div className="flex items-center justify-between mb-1">
                                  <span className="capitalize font-medium">{item.status}</span>
                                  <span className="text-muted-foreground">{item.count}</span>
                                </div>
                                <div className="h-2 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                                  <motion.div 
                                    className={`h-full rounded-full ${
                                      item.status === 'new' ? 'bg-green-500' :
                                      item.status === 'contacted' ? 'bg-amber-500' :
                                      item.status === 'converted' ? 'bg-blue-500' : 'bg-red-500'
                                    }`}
                                    initial={{ width: 0 }}
                                    animate={{ width: `${(item.count / (leadConversion?.total_leads || 1)) * 100}%` }}
                                  />
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>

                    {/* Leads Trend */}
                    <Card>
                      <CardHeader>
                        <CardTitle>Leads Trend (Last 7 Days)</CardTitle>
                        <CardDescription>Daily lead acquisition</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          {leadConversion?.leads_trend?.length > 0 ? leadConversion.leads_trend.map((item, index) => (
                            <div key={index} className="flex items-center gap-4">
                              <Calendar className="h-4 w-4 text-muted-foreground" />
                              <span className="flex-1 text-sm">{new Date(item.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}</span>
                              <span className="font-semibold">{item.leads} leads</span>
                            </div>
                          )) : (
                            <p className="text-sm text-muted-foreground text-center py-4">No leads in the last 7 days</p>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Top Pages & Traffic Sources */}
                  <div className="grid lg:grid-cols-2 gap-6">
                    <Card>
                      <CardHeader>
                        <CardTitle>Most Visited Pages</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          {topPages.length > 0 ? topPages.map((page, index) => (
                            <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                              <div className="flex items-center gap-3">
                                <span className="w-6 h-6 rounded-full bg-primary/10 text-primary text-xs flex items-center justify-center font-semibold">
                                  {index + 1}
                                </span>
                                <span className="text-sm font-medium">{page.path || 'Home'}</span>
                              </div>
                              <span className="text-sm text-muted-foreground">{page.views}</span>
                            </div>
                          )) : (
                            <p className="text-sm text-muted-foreground text-center py-4">No page views recorded yet. Tracking will start automatically.</p>
                          )}
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle>Traffic Sources</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          {leadsBySource.map((item, index) => (
                            <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                              <div className="flex items-center gap-3">
                                <Globe className="h-4 w-4 text-muted-foreground" />
                                <span className="text-sm font-medium capitalize">{item.source?.replace('_', ' ')}</span>
                              </div>
                              <span className="text-sm font-semibold">{item.count}</span>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              )}

              {/* Leads Tab */}
              {activeTab === 'leads' && (
                <div className="space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <h2 className="text-2xl font-bold">Lead Management</h2>
                      <p className="text-muted-foreground">View and manage all inquiries</p>
                    </div>
                    <Button onClick={exportLeads} data-testid="export-leads">
                      <Download className="h-4 w-4 mr-2" />
                      Export CSV
                    </Button>
                  </div>

                  {/* Filters */}
                  <div className="flex flex-col sm:flex-row gap-4">
                    <div className="relative flex-1">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <input
                        type="text"
                        placeholder="Search by name or email..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 bg-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                    <select
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value)}
                      className="px-4 py-2.5 bg-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                      <option value="">All Status</option>
                      <option value="new">New</option>
                      <option value="contacted">Contacted</option>
                      <option value="converted">Converted</option>
                      <option value="lost">Lost</option>
                    </select>
                  </div>

                  <Card>
                    <CardContent className="p-0">
                      <div className="overflow-x-auto">
                        <table className="w-full">
                          <thead className="bg-slate-50 dark:bg-slate-800">
                            <tr>
                              <th className="px-4 py-3 text-left text-sm font-medium">Lead</th>
                              <th className="px-4 py-3 text-left text-sm font-medium">Contact</th>
                              <th className="px-4 py-3 text-left text-sm font-medium">Interest</th>
                              <th className="px-4 py-3 text-left text-sm font-medium">Source</th>
                              <th className="px-4 py-3 text-left text-sm font-medium">Status</th>
                              <th className="px-4 py-3 text-left text-sm font-medium">Date</th>
                              <th className="px-4 py-3 text-left text-sm font-medium">Actions</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-border">
                            {filteredLeads.map((lead, index) => (
                              <tr key={index} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                                <td className="px-4 py-3">
                                  <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                                      {lead.name.charAt(0).toUpperCase()}
                                    </div>
                                    <span className="font-medium">{lead.name}</span>
                                  </div>
                                </td>
                                <td className="px-4 py-3">
                                  <div className="text-sm">{lead.email}</div>
                                  <div className="text-xs text-muted-foreground">{lead.phone}</div>
                                </td>
                                <td className="px-4 py-3 text-sm">{lead.interest}</td>
                                <td className="px-4 py-3">
                                  <span className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full capitalize">
                                    {lead.source?.replace('_', ' ')}
                                  </span>
                                </td>
                                <td className="px-4 py-3">
                                  <select
                                    value={lead.status}
                                    onChange={(e) => updateLeadStatus(lead.id, e.target.value)}
                                    className={`px-2 py-1 text-xs rounded-full border appearance-none cursor-pointer ${statusColors[lead.status] || 'bg-slate-100'}`}
                                  >
                                    <option value="new">New</option>
                                    <option value="contacted">Contacted</option>
                                    <option value="converted">Converted</option>
                                    <option value="lost">Lost</option>
                                  </select>
                                </td>
                                <td className="px-4 py-3 text-sm text-muted-foreground">
                                  {new Date(lead.created_at).toLocaleDateString()}
                                </td>
                                <td className="px-4 py-3">
                                  <Button variant="ghost" size="sm">
                                    <Eye className="h-4 w-4" />
                                  </Button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                        {filteredLeads.length === 0 && (
                          <div className="text-center py-8 text-muted-foreground">
                            No leads found matching your criteria
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}

              {/* Blogs Tab */}
              {activeTab === 'blogs' && !showBlogEditor && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-2xl font-bold">Blog Management</h2>
                      <p className="text-muted-foreground">Create and manage blog posts</p>
                    </div>
                    <Button onClick={() => { setEditingBlog(null); setShowBlogEditor(true); }} data-testid="create-blog">
                      <Plus className="h-4 w-4 mr-2" />
                      New Post
                    </Button>
                  </div>

                  <div className="grid gap-4">
                    {blogs.length > 0 ? blogs.map((blog, index) => (
                      <Card key={index} className="overflow-hidden">
                        <CardContent className="p-0">
                          <div className="flex items-center">
                            {blog.featured_image && (
                              <div className="w-32 h-24 flex-shrink-0">
                                <img 
                                  src={blog.featured_image} 
                                  alt={blog.title}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                            )}
                            <div className="flex-1 p-4">
                              <div className="flex items-start justify-between">
                                <div>
                                  <h3 className="font-semibold">{blog.title}</h3>
                                  <p className="text-sm text-muted-foreground line-clamp-1">{blog.excerpt}</p>
                                  <div className="flex items-center gap-2 mt-2">
                                    <span className="text-xs px-2 py-1 bg-primary/10 text-primary rounded-full">
                                      {blog.category}
                                    </span>
                                    <span className={`text-xs px-2 py-1 rounded-full ${blog.published ? 'bg-green-500/10 text-green-600' : 'bg-amber-500/10 text-amber-600'}`}>
                                      {blog.published ? 'Published' : 'Draft'}
                                    </span>
                                    <span className="text-xs text-muted-foreground">
                                      {new Date(blog.created_at).toLocaleDateString()}
                                    </span>
                                  </div>
                                </div>
                                <div className="flex items-center gap-1">
                                  <Button 
                                    variant="ghost" 
                                    size="sm"
                                    onClick={() => toggleBlogPublish(blog.id, blog.published)}
                                  >
                                    {blog.published ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                  </Button>
                                  <Button 
                                    variant="ghost" 
                                    size="sm"
                                    onClick={() => { setEditingBlog(blog); setShowBlogEditor(true); }}
                                  >
                                    <Edit className="h-4 w-4" />
                                  </Button>
                                  <Button 
                                    variant="ghost" 
                                    size="sm"
                                    onClick={() => handleDeleteBlog(blog.id)}
                                    className="text-red-500 hover:text-red-600"
                                  >
                                    <Trash2 className="h-4 w-4" />
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    )) : (
                      <Card>
                        <CardContent className="py-12 text-center">
                          <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                          <h3 className="font-semibold mb-2">No blog posts yet</h3>
                          <p className="text-muted-foreground mb-4">Start creating content to engage your audience</p>
                          <Button onClick={() => { setEditingBlog(null); setShowBlogEditor(true); }}>
                            <Plus className="h-4 w-4 mr-2" />
                            Create First Post
                          </Button>
                        </CardContent>
                      </Card>
                    )}
                  </div>
                </div>
              )}

              {/* Blog Editor */}
              {activeTab === 'blogs' && showBlogEditor && (
                <Card>
                  <CardContent className="p-6">
                    <BlogEditor 
                      blog={editingBlog}
                      onSave={handleSaveBlog}
                      onCancel={() => { setShowBlogEditor(false); setEditingBlog(null); }}
                    />
                  </CardContent>
                </Card>
              )}

              {/* Courses Tab - Placeholder */}
              {activeTab === 'courses' && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-bold">Course Management</h2>
                    <p className="text-muted-foreground">Manage your course catalog</p>
                  </div>
                  <Card>
                    <CardContent className="py-12 text-center">
                      <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <h3 className="font-semibold mb-2">Course Editor Coming Soon</h3>
                      <p className="text-muted-foreground">
                        Currently courses are managed via the frontend code. 
                        A full course editor will be available in the next update.
                      </p>
                    </CardContent>
                  </Card>
                </div>
              )}

              {/* Settings Tab - Placeholder */}
              {activeTab === 'settings' && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-bold">Settings</h2>
                    <p className="text-muted-foreground">Configure your admin panel</p>
                  </div>
                  <Card>
                    <CardContent className="py-12 text-center">
                      <Settings className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <h3 className="font-semibold mb-2">Settings Panel Coming Soon</h3>
                      <p className="text-muted-foreground">
                        Site settings, user management, and integrations will be available here.
                      </p>
                    </CardContent>
                  </Card>
                </div>
              )}
            </>
          )}
        </main>
      </div>
    </div>
  );
}

// ==================== MAIN ADMIN COMPONENT ====================
export default function Admin() {
  const [user, setUser] = useState(null);
  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    const storedUser = localStorage.getItem('adminUser');
    
    if (token && storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setCheckingAuth(false);
  }, []);

  if (checkingAuth) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-900">
        <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
      </div>
    );
  }

  if (!user) {
    return <AdminLogin onLogin={setUser} />;
  }

  return <Dashboard user={user} onLogout={() => setUser(null)} />;
}
