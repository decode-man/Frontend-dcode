import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar';
import {
  Shield,
  User,
  Building2,
  Users,
  Calendar,
  Mail,
  Globe,
  Github,
  UserPlus,
  Settings,
  GitPullRequest,
  GitMerge,
  Activity,
  BarChart3,
  TrendingUp,
  CheckCircle,
  Star
} from 'lucide-react';
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { useAuth } from '../context/AuthContext';

interface Organization {
  id: string;
  name: string;
  description: string;
  type: 'Open Source' | 'Private' | 'Enterprise' | 'Educational' | 'Non-Profit';
  memberCount: number;
  repositoryCount: number;
  githubUrl: string;
  website?: string;
  email: string;
  createdAt: string;
  status: 'Active' | 'Pending' | 'Inactive';
  maintainerCount: number;
  visibility: 'Public' | 'Private';
}

// Mock data for charts
const weeklyActivityData = [
  { week: 'Week 1', prs: 12, reviews: 28, commits: 45, issues: 8 },
  { week: 'Week 2', prs: 18, reviews: 35, commits: 52, issues: 12 },
  { week: 'Week 3', prs: 15, reviews: 42, commits: 38, issues: 6 },
  { week: 'Week 4', prs: 22, reviews: 38, commits: 48, issues: 15 },
  { week: 'Week 5', prs: 20, reviews: 45, commits: 55, issues: 9 },
  { week: 'Week 6', prs: 25, reviews: 52, commits: 42, issues: 18 }
];

const prStatusData = [
  { name: 'Merged', value: 298, color: '#10B981' },
  { name: 'Open', value: 24, color: '#3B82F6' },
  { name: 'Draft', value: 12, color: '#F59E0B' },
  { name: 'Closed', value: 8, color: '#EF4444' }
];

const monthlyTrendsData = [
  { month: 'Jan', contributions: 145, reviewTime: 2.5, successRate: 89 },
  { month: 'Feb', contributions: 168, reviewTime: 2.2, successRate: 92 },
  { month: 'Mar', contributions: 192, reviewTime: 1.8, successRate: 88 },
  { month: 'Apr', contributions: 178, reviewTime: 2.1, successRate: 95 },
  { month: 'May', contributions: 205, reviewTime: 1.9, successRate: 91 },
  { month: 'Jun', contributions: 234, reviewTime: 1.7, successRate: 94 }
];

const repositoryMetrics = [
  { name: 'React Dashboard', stars: 1250, prs: 45, issues: 12, status: 'active' },
  { name: 'Node API', stars: 890, prs: 32, issues: 8, status: 'active' },
  { name: 'Vue Components', stars: 675, prs: 28, issues: 15, status: 'active' },
  { name: 'Python Utils', stars: 432, prs: 18, issues: 6, status: 'maintained' }
];

// Additional chart data for metrics
const prMergeData = [
  { month: 'Jan', created: 45, merged: 38, rate: 84.4 },
  { month: 'Feb', created: 52, merged: 47, rate: 90.4 },
  { month: 'Mar', created: 48, merged: 42, rate: 87.5 },
  { month: 'Apr', created: 55, merged: 51, rate: 92.7 },
  { month: 'May', created: 62, merged: 54, rate: 87.1 },
  { month: 'Jun', created: 58, merged: 52, rate: 89.7 }
];

const issuesData = [
  { month: 'Jan', opened: 15, closed: 18, resolved: 12, triaged: 8 },
  { month: 'Feb', opened: 22, closed: 25, resolved: 18, triaged: 12 },
  { month: 'Mar', opened: 18, closed: 20, resolved: 15, triaged: 10 },
  { month: 'Apr', opened: 28, closed: 32, resolved: 22, triaged: 15 },
  { month: 'May', opened: 24, closed: 28, resolved: 20, triaged: 14 },
  { month: 'Jun', opened: 20, closed: 24, resolved: 18, triaged: 12 }
];

const reviewsData = [
  { week: 'W1', reviews: 28, approved: 22, changesRequested: 4, commented: 2 },
  { week: 'W2', reviews: 35, approved: 28, changesRequested: 5, commented: 2 },
  { week: 'W3', reviews: 42, approved: 35, changesRequested: 6, commented: 1 },
  { week: 'W4', reviews: 38, approved: 30, changesRequested: 7, commented: 1 },
  { week: 'W5', reviews: 45, approved: 38, changesRequested: 5, commented: 2 },
  { week: 'W6', reviews: 52, approved: 45, changesRequested: 6, commented: 1 }
];

const commitsData = [
  { month: 'Jan', commits: 145, additions: 2840, deletions: 1120 },
  { month: 'Feb', commits: 168, additions: 3200, deletions: 1450 },
  { month: 'Mar', commits: 192, additions: 3680, deletions: 1680 },
  { month: 'Apr', commits: 178, additions: 3420, deletions: 1520 },
  { month: 'May', commits: 205, additions: 3950, deletions: 1820 },
  { month: 'Jun', commits: 234, additions: 4480, deletions: 2100 }
];

const mockOrganizations: Organization[] = [
  {
    id: '1',
    name: 'microsoft',
    description: 'Microsoft Corporation - Cloud computing, productivity software, and enterprise solutions. Home to TypeScript, VS Code, and Azure.',
    type: 'Enterprise',
    memberCount: 2450,
    repositoryCount: 1842,
    githubUrl: 'https://github.com/microsoft',
    website: 'microsoft.com',
    email: 'opensource@microsoft.com',
    createdAt: '2014-01-15',
    status: 'Active',
    maintainerCount: 45,
    visibility: 'Public'
  },
  {
    id: '2',
    name: 'facebook',
    description: 'Meta Open Source - React, React Native, PyTorch, and other innovative open source projects from Meta.',
    type: 'Open Source',
    memberCount: 856,
    repositoryCount: 234,
    githubUrl: 'https://github.com/facebook',
    website: 'opensource.fb.com',
    email: 'opensource@meta.com',
    createdAt: '2015-03-22',
    status: 'Active',
    maintainerCount: 23,
    visibility: 'Public'
  },
  {
    id: '3',
    name: 'google',
    description: 'Google Open Source - TensorFlow, Angular, Kubernetes, and cutting-edge AI and cloud technologies.',
    type: 'Enterprise',
    memberCount: 1234,
    repositoryCount: 567,
    githubUrl: 'https://github.com/google',
    website: 'opensource.google',
    email: 'opensource@google.com',
    createdAt: '2016-05-10',
    status: 'Active',
    maintainerCount: 34,
    visibility: 'Public'
  },
  {
    id: '4',
    name: 'vercel',
    description: 'Vercel - Next.js creators and frontend cloud platform. Building the future of web development.',
    type: 'Open Source',
    memberCount: 189,
    repositoryCount: 89,
    githubUrl: 'https://github.com/vercel',
    website: 'vercel.com',
    email: 'opensource@vercel.com',
    createdAt: '2020-04-21',
    status: 'Active',
    maintainerCount: 12,
    visibility: 'Public'
  },
  {
    id: '5',
    name: 'openai',
    description: 'OpenAI - Artificial intelligence research and deployment. Home to GPT, DALL-E, and Whisper.',
    type: 'Open Source',
    memberCount: 234,
    repositoryCount: 45,
    githubUrl: 'https://github.com/openai',
    website: 'openai.com',
    email: 'opensource@openai.com',
    createdAt: '2018-12-05',
    status: 'Active',
    maintainerCount: 18,
    visibility: 'Public'
  }
];

const MaintainerDashboard: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleOrganizationClick = (orgId: string) => {
    navigate(`/maintainer/organization/${orgId}`);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Inactive':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Enterprise':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Open Source':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'Private':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'Educational':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Non-Profit':
        return 'bg-pink-100 text-pink-800 border-pink-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-6xl mx-auto p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Maintainer Dashboard</h1>
                <p className="text-gray-600">Manage GitHub organizations and repositories</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">
                Maintainer
              </Badge>
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarImage src={user?.avatar_url} alt={user?.name || user?.login} />
                  <AvatarFallback>
                    <User className="w-4 h-4" />
                  </AvatarFallback>
                </Avatar>
                <div className="text-right">
                  <p className="text-sm font-medium">{user?.name || user?.login}</p>
                  <p className="text-xs text-gray-500">Maintainer</p>
                </div>
              </div>
              <Button variant="outline" onClick={logout}>
                Logout
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto p-6">
        {/* Enhanced Statistics Overview */}
        <div className="mb-8">
          <div className="bg-gradient-to-br from-white to-gray-50 rounded-xl shadow-lg border p-8">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Performance Dashboard</h2>
                <p className="text-gray-600">Your contribution metrics and activity overview</p>
              </div>
              <Button
                variant="outline"
                onClick={() => navigate('/maintainer-profile/1')}
                className="flex items-center gap-2 bg-primary text-white hover:bg-primary/90 border-primary"
              >
                <User className="w-4 h-4" />
                View Full Profile
              </Button>
            </div>

            {/* Enhanced Metrics Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              {/* PR Merge Rate Chart */}
              <Card className="border-0 shadow-md bg-gradient-to-br from-green-50 to-emerald-50">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center">
                        <GitMerge className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <CardTitle className="text-lg font-bold text-green-700">PR Merge Rate</CardTitle>
                        <CardDescription className="text-green-600">Success rate over time</CardDescription>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-green-700">89.7%</p>
                      <Badge className="bg-green-100 text-green-700 border-green-200">+5.2%</Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="h-48">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={prMergeData}>
                        <defs>
                          <linearGradient id="colorMergeRate" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#10B981" stopOpacity={0.3} />
                            <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#D1FAE5" />
                        <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#065F46' }} />
                        <YAxis tick={{ fontSize: 11, fill: '#065F46' }} />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: 'white',
                            border: 'none',
                            borderRadius: '12px',
                            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                            fontSize: '12px'
                          }}
                          formatter={(value, name) => [
                            name === 'rate' ? `${value}%` : value,
                            name === 'rate' ? 'Merge Rate' : name === 'created' ? 'Created' : 'Merged'
                          ]}
                        />
                        <Area
                          type="monotone"
                          dataKey="rate"
                          stroke="#10B981"
                          fillOpacity={1}
                          fill="url(#colorMergeRate)"
                          strokeWidth={3}
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
                    <div className="text-center p-2 bg-white rounded-lg">
                      <p className="font-bold text-green-700">342</p>
                      <p className="text-green-600">Total Created</p>
                    </div>
                    <div className="text-center p-2 bg-white rounded-lg">
                      <p className="font-bold text-green-700">298</p>
                      <p className="text-green-600">Successfully Merged</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Issues Resolution Chart */}
              <Card className="border-0 shadow-md bg-gradient-to-br from-blue-50 to-indigo-50">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center">
                        <CheckCircle className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <CardTitle className="text-lg font-bold text-blue-700">Issues Management</CardTitle>
                        <CardDescription className="text-blue-600">Resolution tracking</CardDescription>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-blue-700">156</p>
                      <Badge className="bg-blue-100 text-blue-700 border-blue-200">+12%</Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="h-48">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={issuesData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#DBEAFE" />
                        <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#1E40AF' }} />
                        <YAxis tick={{ fontSize: 11, fill: '#1E40AF' }} />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: 'white',
                            border: 'none',
                            borderRadius: '12px',
                            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                            fontSize: '12px'
                          }}
                        />
                        <Line
                          type="monotone"
                          dataKey="opened"
                          stroke="#F59E0B"
                          strokeWidth={2}
                          dot={{ fill: '#F59E0B', strokeWidth: 2, r: 3 }}
                        />
                        <Line
                          type="monotone"
                          dataKey="closed"
                          stroke="#3B82F6"
                          strokeWidth={3}
                          dot={{ fill: '#3B82F6', strokeWidth: 2, r: 4 }}
                        />
                        <Line
                          type="monotone"
                          dataKey="resolved"
                          stroke="#10B981"
                          strokeWidth={2}
                          dot={{ fill: '#10B981', strokeWidth: 2, r: 3 }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="mt-4 flex justify-between text-xs">
                    <div className="flex items-center gap-1">
                      <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                      <span className="text-blue-600">Opened</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span className="text-blue-600">Closed</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-blue-600">Resolved</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* PR Reviews Chart */}
              <Card className="border-0 shadow-md bg-gradient-to-br from-purple-50 to-violet-50">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-violet-600 rounded-xl flex items-center justify-center">
                        <GitPullRequest className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <CardTitle className="text-lg font-bold text-purple-700">PR Reviews</CardTitle>
                        <CardDescription className="text-purple-600">Weekly review activity</CardDescription>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-purple-700">1,247</p>
                      <Badge className="bg-purple-100 text-purple-700 border-purple-200">+8%</Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="h-48">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={reviewsData}>
                        <defs>
                          <linearGradient id="colorReviews" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.3} />
                            <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0} />
                          </linearGradient>
                          <linearGradient id="colorApproved" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#10B981" stopOpacity={0.2} />
                            <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#E9D5FF" />
                        <XAxis dataKey="week" tick={{ fontSize: 11, fill: '#6B21A8' }} />
                        <YAxis tick={{ fontSize: 11, fill: '#6B21A8' }} />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: 'white',
                            border: 'none',
                            borderRadius: '12px',
                            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                            fontSize: '12px'
                          }}
                        />
                        <Area
                          type="monotone"
                          dataKey="reviews"
                          stroke="#8B5CF6"
                          fillOpacity={1}
                          fill="url(#colorReviews)"
                          strokeWidth={2}
                        />
                        <Area
                          type="monotone"
                          dataKey="approved"
                          stroke="#10B981"
                          fillOpacity={1}
                          fill="url(#colorApproved)"
                          strokeWidth={2}
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="mt-4 grid grid-cols-3 gap-2 text-xs">
                    <div className="text-center p-2 bg-white rounded-lg">
                      <p className="font-bold text-green-600">198</p>
                      <p className="text-purple-600">Approved</p>
                    </div>
                    <div className="text-center p-2 bg-white rounded-lg">
                      <p className="font-bold text-orange-600">33</p>
                      <p className="text-purple-600">Changes</p>
                    </div>
                    <div className="text-center p-2 bg-white rounded-lg">
                      <p className="font-bold text-purple-600">1.8h</p>
                      <p className="text-purple-600">Avg Time</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Monthly Commits Chart */}
              <Card className="border-0 shadow-md bg-gradient-to-br from-orange-50 to-amber-50">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-amber-600 rounded-xl flex items-center justify-center">
                        <Activity className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <CardTitle className="text-lg font-bold text-orange-700">Monthly Commits</CardTitle>
                        <CardDescription className="text-orange-600">Code contribution activity</CardDescription>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-orange-700">234</p>
                      <Badge className="bg-orange-100 text-orange-700 border-orange-200">+14%</Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="h-48">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={commitsData}>
                        <defs>
                          <linearGradient id="colorCommits" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#F59E0B" stopOpacity={0.3} />
                            <stop offset="95%" stopColor="#F59E0B" stopOpacity={0} />
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#FEF3C7" />
                        <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#92400E' }} />
                        <YAxis tick={{ fontSize: 11, fill: '#92400E' }} />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: 'white',
                            border: 'none',
                            borderRadius: '12px',
                            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                            fontSize: '12px'
                          }}
                          formatter={(value, name) => [
                            typeof value === 'number' ? value.toLocaleString() : value,
                            name === 'commits' ? 'Commits' : name === 'additions' ? 'Lines Added' : 'Lines Deleted'
                          ]}
                        />
                        <Area
                          type="monotone"
                          dataKey="commits"
                          stroke="#F59E0B"
                          fillOpacity={1}
                          fill="url(#colorCommits)"
                          strokeWidth={3}
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="mt-4 grid grid-cols-3 gap-2 text-xs">
                    <div className="text-center p-2 bg-white rounded-lg">
                      <p className="font-bold text-green-600">21.2k</p>
                      <p className="text-orange-600">Lines Added</p>
                    </div>
                    <div className="text-center p-2 bg-white rounded-lg">
                      <p className="font-bold text-red-600">9.7k</p>
                      <p className="text-orange-600">Lines Removed</p>
                    </div>
                    <div className="text-center p-2 bg-white rounded-lg">
                      <p className="font-bold text-orange-600">1,322</p>
                      <p className="text-orange-600">Total Commits</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Weekly Activity Chart */}
              <Card className="border-0 shadow-md">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
                      <BarChart3 className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">Weekly Activity</CardTitle>
                      <CardDescription>Your contribution patterns over time</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={weeklyActivityData}>
                        <defs>
                          <linearGradient id="colorPrs" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3} />
                            <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
                          </linearGradient>
                          <linearGradient id="colorReviews" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#10B981" stopOpacity={0.3} />
                            <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                        <XAxis dataKey="week" tick={{ fontSize: 12 }} stroke="#6B7280" />
                        <YAxis tick={{ fontSize: 12 }} stroke="#6B7280" />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: 'white',
                            border: 'none',
                            borderRadius: '8px',
                            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                          }}
                        />
                        <Area
                          type="monotone"
                          dataKey="prs"
                          stroke="#3B82F6"
                          fillOpacity={1}
                          fill="url(#colorPrs)"
                          strokeWidth={2}
                        />
                        <Area
                          type="monotone"
                          dataKey="reviews"
                          stroke="#10B981"
                          fillOpacity={1}
                          fill="url(#colorReviews)"
                          strokeWidth={2}
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="flex items-center justify-center gap-6 mt-4">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                      <span className="text-sm text-gray-600">Pull Requests</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <span className="text-sm text-gray-600">Reviews</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* PR Status Distribution */}
              <Card className="border-0 shadow-md">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-teal-600 rounded-lg flex items-center justify-center">
                      <GitPullRequest className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">PR Status Distribution</CardTitle>
                      <CardDescription>Current status of your pull requests</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={prStatusData}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={100}
                          paddingAngle={5}
                          dataKey="value"
                        >
                          {prStatusData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip
                          contentStyle={{
                            backgroundColor: 'white',
                            border: 'none',
                            borderRadius: '8px',
                            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                          }}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="grid grid-cols-2 gap-4 mt-4">
                    {prStatusData.map((item, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <div
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: item.color }}
                        ></div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">{item.name}</p>
                          <p className="text-xs text-gray-600">{item.value}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Monthly Trends */}
            <Card className="border-0 shadow-md mt-8">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-violet-500 to-indigo-600 rounded-lg flex items-center justify-center">
                    <TrendingUp className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">Monthly Performance Trends</CardTitle>
                    <CardDescription>Track your progress and improvement over time</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={monthlyTrendsData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                      <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="#6B7280" />
                      <YAxis tick={{ fontSize: 12 }} stroke="#6B7280" />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: 'white',
                          border: 'none',
                          borderRadius: '8px',
                          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                        }}
                      />
                      <Line
                        type="monotone"
                        dataKey="contributions"
                        stroke="#8B5CF6"
                        strokeWidth={3}
                        dot={{ fill: '#8B5CF6', strokeWidth: 2, r: 4 }}
                      />
                      <Line
                        type="monotone"
                        dataKey="successRate"
                        stroke="#10B981"
                        strokeWidth={3}
                        dot={{ fill: '#10B981', strokeWidth: 2, r: 4 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
                <div className="flex items-center justify-center gap-6 mt-4">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-violet-500 rounded-full"></div>
                    <span className="text-sm text-gray-600">Total Contributions</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="text-sm text-gray-600">Success Rate (%)</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Repository Performance Overview */}
        <div className="mb-8">
          <Card className="border-0 shadow-lg bg-gradient-to-br from-white to-gray-50">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-blue-600 rounded-lg flex items-center justify-center">
                  <Building2 className="w-4 h-4 text-white" />
                </div>
                <div>
                  <CardTitle className="text-lg">Repository Overview</CardTitle>
                  <CardDescription>Performance metrics across your maintained repositories</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {repositoryMetrics.map((repo, index) => (
                  <div key={index} className="p-4 bg-white rounded-lg border border-gray-100 hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-medium text-gray-900 truncate">{repo.name}</h4>
                      <Badge
                        className={`text-xs ${repo.status === 'active'
                            ? 'bg-green-100 text-green-700 border-green-200'
                            : 'bg-blue-100 text-blue-700 border-blue-200'
                          }`}
                      >
                        {repo.status}
                      </Badge>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600 flex items-center gap-1">
                          <Star className="w-3 h-3" />
                          Stars
                        </span>
                        <span className="font-medium text-gray-900">{repo.stars.toLocaleString()}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600 flex items-center gap-1">
                          <GitPullRequest className="w-3 h-3" />
                          PRs
                        </span>
                        <span className="font-medium text-gray-900">{repo.prs}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600 flex items-center gap-1">
                          <CheckCircle className="w-3 h-3" />
                          Issues
                        </span>
                        <span className="font-medium text-gray-900">{repo.issues}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Action Bar */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">GitHub Organizations</h2>
            <p className="text-gray-600 mt-1">Manage and monitor your GitHub organizations</p>
          </div>
        </div>

        {/* Organizations Grid */}
        <div className="grid gap-6">
          {mockOrganizations.map((org) => (
            <Card
              key={org.id}
              className="hover:shadow-lg transition-all duration-200 cursor-pointer border-l-4 border-l-primary/20 hover:border-l-primary"
              onClick={() => handleOrganizationClick(org.id)}
            >
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4 flex-1">
                    <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-primary/10 rounded-lg flex items-center justify-center">
                      <Building2 className="w-8 h-8 text-primary" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-xl font-semibold text-gray-900 truncate">{org.name}</h3>
                        <Badge variant="outline" className={getTypeColor(org.type)}>
                          {org.type}
                        </Badge>
                        <Badge variant="outline" className={getStatusColor(org.status)}>
                          {org.status}
                        </Badge>
                        <Badge variant="outline" className="bg-gray-50 text-gray-600 border-gray-200">
                          {org.visibility}
                        </Badge>
                      </div>

                      <p className="text-gray-600 mb-4 line-clamp-2 leading-relaxed">
                        {org.description}
                      </p>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div className="flex items-center gap-2 text-gray-600">
                          <Users className="w-4 h-4" />
                          <span>{org.memberCount.toLocaleString()} members</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-600">
                          <Building2 className="w-4 h-4" />
                          <span>{org.repositoryCount} repositories</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-600">
                          <UserPlus className="w-4 h-4" />
                          <span>{org.maintainerCount} maintainers</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-600">
                          <Calendar className="w-4 h-4" />
                          <span>Since {new Date(org.createdAt).getFullYear()}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-4 mt-4 pt-4 border-t border-gray-100">
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <Github className="w-4 h-4" />
                          <a
                            href={org.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-primary transition-colors"
                            onClick={(e) => e.stopPropagation()}
                          >
                            {org.githubUrl.replace('https://github.com/', '')}
                          </a>
                        </div>
                        {org.website && (
                          <div className="flex items-center gap-2 text-sm text-gray-500">
                            <Globe className="w-4 h-4" />
                            <a
                              href={`https://${org.website}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="hover:text-primary transition-colors"
                              onClick={(e) => e.stopPropagation()}
                            >
                              {org.website}
                            </a>
                          </div>
                        )}
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <Mail className="w-4 h-4" />
                          <a
                            href={`mailto:${org.email}`}
                            className="hover:text-primary transition-colors"
                            onClick={(e) => e.stopPropagation()}
                          >
                            {org.email}
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 ml-4">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        window.open(org.githubUrl, '_blank');
                      }}
                    >
                      <Github className="w-4 h-4 mr-1" />
                      View
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        // TODO: Implement settings functionality
                        console.log('Settings clicked for', org.name);
                      }}
                    >
                      <Settings className="w-4 h-4 mr-1" />
                      Settings
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MaintainerDashboard;