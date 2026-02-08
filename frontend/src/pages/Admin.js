import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LayoutDashboard, Users, FileText, BookOpen, Settings,
  LogOut, Menu, X, Eye, Download, Loader2, TrendingUp,
  MessageCircle, Globe, ChevronRight, RefreshCcw
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

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

// Login Component
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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-primary/5 p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="card-base">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-2xl mb-4">
              <LayoutDashboard className="h-8 w-8 text-primary" />
            </div>
            <h1 className="font-heading text-2xl font-bold">Admin Portal</h1>
            <p className="text-muted-foreground text-sm">Sign in to manage your academy</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4" data-testid="admin-login-form">
            <div>
              <label className="block text-sm font-medium mb-1.5">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@skillax.in"
                data-testid="admin-email"
                className="w-full input-base"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1.5">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                data-testid="admin-password"
                className="w-full input-base"
                required
              />
            </div>

            {error && (
              <p className="text-sm text-destructive">{error}</p>
            )}

            <Button
              type="submit"
              data-testid="admin-submit"
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground rounded-full py-6"
              disabled={loading}
            >
              {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : 'Sign In'}
            </Button>
          </form>

          <p className="text-center text-xs text-muted-foreground mt-6">
            Default: admin@skillax.in / SkillaxAdmin2024!
          </p>
        </div>
      </motion.div>
    </div>
  );
}

// Dashboard Component
function Dashboard({ user, onLogout }) {
  const [activeTab, setActiveTab] = useState('overview');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [analytics, setAnalytics] = useState(null);
  const [leads, setLeads] = useState([]);
  const [leadsBySource, setLeadsBySource] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem('adminToken');
  const headers = { Authorization: `Bearer ${token}` };

  const fetchData = async () => {
    setLoading(true);
    try {
      const [analyticsRes, leadsRes, sourceRes] = await Promise.all([
        axios.get(`${API}/analytics/summary`, { headers }),
        axios.get(`${API}/leads?limit=20`, { headers }),
        axios.get(`${API}/analytics/leads-by-source`, { headers }),
      ]);
      setAnalytics(analyticsRes.data);
      setLeads(leadsRes.data);
      setLeadsBySource(sourceRes.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const menuItems = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'leads', label: 'Leads', icon: Users },
    { id: 'courses', label: 'Courses', icon: BookOpen },
    { id: 'blogs', label: 'Blog Posts', icon: FileText },
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
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile Header */}
      <div className="lg:hidden flex items-center justify-between p-4 border-b border-border">
        <h1 className="font-heading font-bold text-lg">Askillax Admin</h1>
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
              className="fixed lg:static inset-y-0 left-0 z-50 w-64 bg-card border-r border-border p-6 flex flex-col"
            >
              <div className="mb-8">
                <h1 className="font-heading font-bold text-xl">Askillax Admin</h1>
                <p className="text-sm text-muted-foreground">{user?.name}</p>
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
                      }}
                      data-testid={`admin-nav-${item.id}`}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                        activeTab === item.id
                          ? 'bg-primary text-primary-foreground'
                          : 'hover:bg-muted'
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
                className="flex items-center gap-3 px-4 py-3 text-destructive hover:bg-destructive/10 rounded-lg transition-colors mt-auto"
              >
                <LogOut className="h-5 w-5" />
                Logout
              </button>
            </motion.aside>
          )}
        </AnimatePresence>

        {/* Main Content */}
        <main className="flex-1 p-6 lg:p-8 overflow-auto">
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
                      <h2 className="font-heading text-2xl font-bold">Dashboard Overview</h2>
                      <p className="text-muted-foreground">Welcome back, {user?.name}</p>
                    </div>
                    <Button onClick={fetchData} variant="outline" size="sm">
                      <RefreshCcw className="h-4 w-4 mr-2" />
                      Refresh
                    </Button>
                  </div>

                  {/* Stats Grid */}
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    <Card>
                      <CardHeader className="pb-2">
                        <CardDescription>Total Leads</CardDescription>
                        <CardTitle className="text-3xl">{analytics?.total_leads || 0}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center gap-1 text-sm text-brand-success">
                          <TrendingUp className="h-4 w-4" />
                          <span>{analytics?.new_leads || 0} new</span>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader className="pb-2">
                        <CardDescription>Website Leads</CardDescription>
                        <CardTitle className="text-3xl">{analytics?.website_leads || 0}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <Globe className="h-4 w-4" />
                          <span>From forms</span>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader className="pb-2">
                        <CardDescription>Chatbot Leads</CardDescription>
                        <CardTitle className="text-3xl">{analytics?.chatbot_leads || 0}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <MessageCircle className="h-4 w-4" />
                          <span>AI chatbot</span>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader className="pb-2">
                        <CardDescription>Active Courses</CardDescription>
                        <CardTitle className="text-3xl">{analytics?.total_courses || 0}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <BookOpen className="h-4 w-4" />
                          <span>Published</span>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Leads by Source */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Leads by Source</CardTitle>
                      <CardDescription>Where your leads are coming from</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {leadsBySource.map((item, index) => (
                          <div key={index} className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <div className="w-3 h-3 rounded-full bg-primary" style={{ opacity: 1 - index * 0.2 }} />
                              <span className="capitalize">{item.source?.replace('_', ' ') || 'Unknown'}</span>
                            </div>
                            <span className="font-semibold">{item.count}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

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
                      <div className="space-y-4">
                        {leads.slice(0, 5).map((lead, index) => (
                          <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                            <div>
                              <div className="font-medium">{lead.name}</div>
                              <div className="text-sm text-muted-foreground">{lead.email}</div>
                            </div>
                            <div className="text-right">
                              <div className="text-sm font-medium">{lead.interest}</div>
                              <div className="text-xs text-muted-foreground capitalize">{lead.source}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}

              {/* Leads Tab */}
              {activeTab === 'leads' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="font-heading text-2xl font-bold">Lead Management</h2>
                      <p className="text-muted-foreground">View and manage all inquiries</p>
                    </div>
                    <Button onClick={exportLeads} data-testid="export-leads">
                      <Download className="h-4 w-4 mr-2" />
                      Export CSV
                    </Button>
                  </div>

                  <Card>
                    <CardContent className="p-0">
                      <div className="overflow-x-auto">
                        <table className="w-full">
                          <thead className="bg-muted/50">
                            <tr>
                              <th className="px-4 py-3 text-left text-sm font-medium">Name</th>
                              <th className="px-4 py-3 text-left text-sm font-medium">Contact</th>
                              <th className="px-4 py-3 text-left text-sm font-medium">Interest</th>
                              <th className="px-4 py-3 text-left text-sm font-medium">Source</th>
                              <th className="px-4 py-3 text-left text-sm font-medium">Status</th>
                              <th className="px-4 py-3 text-left text-sm font-medium">Date</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-border">
                            {leads.map((lead, index) => (
                              <tr key={index} className="hover:bg-muted/30">
                                <td className="px-4 py-3 font-medium">{lead.name}</td>
                                <td className="px-4 py-3">
                                  <div className="text-sm">{lead.email}</div>
                                  <div className="text-xs text-muted-foreground">{lead.phone}</div>
                                </td>
                                <td className="px-4 py-3 text-sm">{lead.interest}</td>
                                <td className="px-4 py-3">
                                  <span className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full capitalize">
                                    {lead.source}
                                  </span>
                                </td>
                                <td className="px-4 py-3">
                                  <span className={`px-2 py-1 text-xs rounded-full capitalize ${
                                    lead.status === 'new' ? 'bg-brand-success/10 text-brand-success' :
                                    lead.status === 'contacted' ? 'bg-brand-amber/10 text-brand-amber' :
                                    'bg-muted text-muted-foreground'
                                  }`}>
                                    {lead.status}
                                  </span>
                                </td>
                                <td className="px-4 py-3 text-sm text-muted-foreground">
                                  {new Date(lead.created_at).toLocaleDateString()}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}

              {/* Other Tabs - Placeholder */}
              {['courses', 'blogs', 'settings'].includes(activeTab) && (
                <div className="space-y-6">
                  <div>
                    <h2 className="font-heading text-2xl font-bold capitalize">{activeTab}</h2>
                    <p className="text-muted-foreground">Manage your {activeTab}</p>
                  </div>
                  <Card>
                    <CardContent className="py-12 text-center">
                      <p className="text-muted-foreground">
                        {activeTab === 'courses' && 'Course management features coming soon. Courses are managed via API.'}
                        {activeTab === 'blogs' && 'Blog management features coming soon. Posts are managed via API.'}
                        {activeTab === 'settings' && 'Settings panel coming soon.'}
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

// Main Admin Component
export default function Admin() {
  const [user, setUser] = useState(null);
  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    // Check for existing token
    const token = localStorage.getItem('adminToken');
    const storedUser = localStorage.getItem('adminUser');
    
    if (token && storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setCheckingAuth(false);
  }, []);

  if (checkingAuth) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!user) {
    return <AdminLogin onLogin={setUser} />;
  }

  return <Dashboard user={user} onLogout={() => setUser(null)} />;
}
