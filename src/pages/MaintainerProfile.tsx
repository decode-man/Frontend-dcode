
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar';
import { Progress } from '../components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { 
  ArrowLeft, 
  GitPullRequest, 
  GitMerge, 
  CheckCircle, 
  Calendar, 
  Github, 
  Mail, 
  MapPin,
  Activity,
  Building2,
  MessageSquare
} from 'lucide-react';

import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';


interface MaintainerProfile {
  id: string;
  name: string;
  username: string;
  email: string;
  avatar: string;
  bio: string;
  location: string;
  githubUrl: string;
  joinedAt: string;
  role: 'maintainer' | 'lead_maintainer';
  organizationId: string;
  organizationName: string;
  stats: {
    prsCreated: number;
    prsMerged: number;
    prsReviewed: number;
    issuesCreated: number;
    issuesClosed: number;
    commitsThisMonth: number;
    repositoriesManaged: number;
  };
  repositories: Array<{
    id: string;
    name: string;
    description: string;
    stars: number;
    language: string;
    lastActivity: string;
  }>;
  recentActivity: Array<{
    id: string;
    type: 'pr_merged' | 'issue_closed' | 'pr_reviewed' | 'commit';
    title: string;
    repository: string;
    timestamp: string;
  }>;
  metrics: {
    codeReviews: {
      total: number;
      approved: number;
      changesRequested: number;
      commented: number;
      averageResponseTime: string;
    };
    issueManagement: {
      opened: number;
      closed: number;
      labeled: number;
      assigned: number;
      avgTimeToClose: string;
    };
    communityInteraction: {
      prComments: number;
      issueComments: number;
      discussionReplies: number;
      mentionsReceived: number;
      reactionsSent: number;
    };
    documentation: {
      docCommits: number;
      readmeUpdates: number;
      wikiEdits: number;
      docImprovements: number;
    };
    contributions: {
      totalPRsMerged: number;
      linesAdded: number;
      linesDeleted: number;
      filesChanged: number;
      commitCount: number;
    };
    sentimentData: {
      weekly: Array<{
        week: string;
        positive: number;
        neutral: number;
        negative: number;
      }>;
    };
  };
}

// Mock data for maintainer profile
const getMockMaintainerProfile = (maintainerId: string): MaintainerProfile => {
  const maintainers: Record<string, MaintainerProfile> = {
    '1': {
      id: '1',
      name: 'Sarah Chen',
      username: 'sarahchen',
      email: 'sarah.chen@microsoft.com',
      avatar: 'https://github.com/sarahchen.png',
      bio: 'Senior Software Engineer at Microsoft, passionate about open source and developer tools. Maintainer of TypeScript and VS Code extensions.',
      location: 'Seattle, WA',
      githubUrl: 'https://github.com/sarahchen',
      joinedAt: '2020-03-15',
      role: 'lead_maintainer',
      organizationId: '1',
      organizationName: 'Microsoft',
      stats: {
        prsCreated: 342,
        prsMerged: 298,
        prsReviewed: 1247,
        issuesCreated: 89,
        issuesClosed: 156,
        commitsThisMonth: 47,
        repositoriesManaged: 8
      },
      repositories: [
        {
          id: '1',
          name: 'typescript',
          description: 'TypeScript is a superset of JavaScript that compiles to clean JavaScript output.',
          stars: 94500,
          language: 'TypeScript',
          lastActivity: '2 hours ago'
        },
        {
          id: '2',
          name: 'vscode',
          description: 'Visual Studio Code',
          stars: 156000,
          language: 'TypeScript',
          lastActivity: '4 hours ago'
        }
      ],
      recentActivity: [
        {
          id: '1',
          type: 'pr_merged',
          title: 'Fix type inference for generic constraints',
          repository: 'typescript',
          timestamp: '2 hours ago'
        },
        {
          id: '2',
          type: 'issue_closed',
          title: 'Memory leak in language server',
          repository: 'vscode',
          timestamp: '5 hours ago'
        },
        {
          id: '3',
          type: 'pr_reviewed',
          title: 'Add new debugging features',
          repository: 'vscode',
          timestamp: '1 day ago'
        }
      ],
      metrics: {
        codeReviews: {
          total: 847,
          approved: 623,
          changesRequested: 156,
          commented: 68,
          averageResponseTime: "4.2 hours"
        },
        issueManagement: {
          opened: 234,
          closed: 198,
          labeled: 456,
          assigned: 312,
          avgTimeToClose: "3.5 days"
        },
        communityInteraction: {
          prComments: 1247,
          issueComments: 892,
          discussionReplies: 234,
          mentionsReceived: 567,
          reactionsSent: 892
        },
        documentation: {
          docCommits: 89,
          readmeUpdates: 34,
          wikiEdits: 12,
          docImprovements: 45
        },
        contributions: {
          totalPRsMerged: 423,
          linesAdded: 45678,
          linesDeleted: 23456,
          filesChanged: 1234,
          commitCount: 789
        },
        sentimentData: {
          weekly: [
            { week: "Week 1", positive: 75, neutral: 20, negative: 5 },
            { week: "Week 2", positive: 82, neutral: 15, negative: 3 },
            { week: "Week 3", positive: 68, neutral: 25, negative: 7 },
            { week: "Week 4", positive: 90, neutral: 8, negative: 2 }
          ]
        }
      }
    },
    '2': {
      id: '2',
      name: 'Alex Rodriguez',
      username: 'alexrod',
      email: 'alex.rodriguez@meta.com',
      avatar: 'https://github.com/alexrod.png',
      bio: 'React Core Team member, focusing on performance and developer experience. Building the future of web development.',
      location: 'San Francisco, CA',
      githubUrl: 'https://github.com/alexrod',
      joinedAt: '2019-08-22',
      role: 'maintainer',
      organizationId: '2',
      organizationName: 'Meta',
      stats: {
        prsCreated: 187,
        prsMerged: 165,
        prsReviewed: 892,
        issuesCreated: 34,
        issuesClosed: 78,
        commitsThisMonth: 29,
        repositoriesManaged: 5
      },
      repositories: [
        {
          id: '3',
          name: 'react',
          description: 'A declarative, efficient, and flexible JavaScript library for building user interfaces.',
          stars: 218000,
          language: 'JavaScript',
          lastActivity: '1 hour ago'
        }
      ],
      recentActivity: [
        {
          id: '4',
          type: 'commit',
          title: 'Optimize rendering performance',
          repository: 'react',
          timestamp: '3 hours ago'
        }
      ]
    }
  };
  
  return maintainers[maintainerId] || maintainers['1'];
};

const SentimentTemperature: React.FC<{ data: Array<{ week: string; positive: number; neutral: number; negative: number }> }> = ({ data }) => {
  const avgPositive = data.reduce((sum, item) => sum + item.positive, 0) / data.length;
  const avgNeutral = data.reduce((sum, item) => sum + item.neutral, 0) / data.length;
  const avgNegative = data.reduce((sum, item) => sum + item.negative, 0) / data.length;
  
  return (
    <Card className="overflow-hidden border-0 shadow-lg bg-gradient-to-br from-white to-gray-50">
      <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
            <Activity className="w-5 h-5 text-white" />
          </div>
          <div>
            <CardTitle className="text-xl font-bold text-gray-900">Sentiment Temperature</CardTitle>
            <CardDescription className="text-gray-600">Review tone analysis over time</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <div className="h-80 mb-6">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <XAxis 
                dataKey="week" 
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: '#6B7280' }}
              />
              <YAxis 
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: '#6B7280' }}
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'white',
                  border: 'none',
                  borderRadius: '12px',
                  boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
                  padding: '12px'
                }}
                labelStyle={{ fontWeight: 'bold', color: '#374151' }}
              />
              <Line 
                type="monotone" 
                dataKey="positive" 
                stroke="#10B981" 
                strokeWidth={3}
                dot={{ fill: '#10B981', strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, fill: '#10B981', stroke: 'white', strokeWidth: 2 }}
              />
              <Line 
                type="monotone" 
                dataKey="neutral" 
                stroke="#F59E0B" 
                strokeWidth={3}
                dot={{ fill: '#F59E0B', strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, fill: '#F59E0B', stroke: 'white', strokeWidth: 2 }}
              /> 
              <Line 
                type="monotone" 
                dataKey="negative" 
                stroke="#EF4444" 
                strokeWidth={3}
                dot={{ fill: '#EF4444', strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, fill: '#EF4444', stroke: 'white', strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        
        {/* Enhanced Statistics Grid */}
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border border-green-100">
            <div className="text-3xl font-bold text-green-600 mb-1">{avgPositive.toFixed(1)}%</div>
            <div className="text-sm font-medium text-green-700">Positive</div>
            <div className="text-xs text-gray-500 mt-1">Average sentiment</div>
          </div>
          <div className="text-center p-4 bg-gradient-to-br from-yellow-50 to-orange-50 rounded-xl border border-yellow-100">
            <div className="text-3xl font-bold text-yellow-600 mb-1">{avgNeutral.toFixed(1)}%</div>
            <div className="text-sm font-medium text-yellow-700">Neutral</div>
            <div className="text-xs text-gray-500 mt-1">Average sentiment</div>
          </div>
          <div className="text-center p-4 bg-gradient-to-br from-red-50 to-pink-50 rounded-xl border border-red-100">
            <div className="text-3xl font-bold text-red-600 mb-1">{avgNegative.toFixed(1)}%</div>
            <div className="text-sm font-medium text-red-700">Negative</div>
            <div className="text-xs text-gray-500 mt-1">Average sentiment</div>
          </div>
        </div>
        
        {/* Legend */}
        <div className="flex items-center justify-center gap-6 mt-6 pt-4 border-t border-gray-100">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span className="text-sm text-gray-600">Positive</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <span className="text-sm text-gray-600">Neutral</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <span className="text-sm text-gray-600">Negative</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

const getActivityIcon = (type: string) => {
  switch (type) {
    case 'pr_merged':
      return <GitMerge className="w-4 h-4 text-green-600" />;
    case 'issue_closed':
      return <CheckCircle className="w-4 h-4 text-blue-600" />;
    case 'pr_reviewed':
      return <GitPullRequest className="w-4 h-4 text-purple-600" />;
    case 'commit':
      return <Activity className="w-4 h-4 text-orange-600" />;
    default:
      return <Activity className="w-4 h-4 text-gray-600" />;
  }
};

export default function MaintainerProfile() {
  const { maintainerId } = useParams();
  const navigate = useNavigate();
  const maintainer = getMockMaintainerProfile(maintainerId || '1');

  const prMergeRate = maintainer.stats.prsCreated > 0 
    ? (maintainer.stats.prsMerged / maintainer.stats.prsCreated) * 100 
    : 0;

  const issueCloseRate = maintainer.stats.issuesCreated > 0 
    ? (maintainer.stats.issuesClosed / maintainer.stats.issuesCreated) * 100 
    : 0;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => navigate(-1)}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </Button>
            <div className="flex items-center gap-3">
              <Building2 className="w-5 h-5 text-gray-500" />
              <span className="text-sm text-gray-600">{maintainer.organizationName}</span>
              <span className="text-gray-400">/</span>
              <span className="font-medium">Maintainer Profile</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Profile Header */}
        <div className="bg-white rounded-lg shadow-sm border p-8 mb-8">
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="flex-shrink-0">
              <Avatar className="w-32 h-32">
                <AvatarImage src={maintainer.avatar} alt={maintainer.name} />
                <AvatarFallback className="text-2xl">
                  {maintainer.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
            </div>
            
            <div className="flex-1">
              <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 mb-4">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">{maintainer.name}</h1>
                  <p className="text-xl text-gray-600 mb-2">@{maintainer.username}</p>
                  <Badge variant={maintainer.role === 'lead_maintainer' ? 'default' : 'secondary'} className="mb-4">
                    {maintainer.role === 'lead_maintainer' ? 'Lead Maintainer' : 'Maintainer'}
                  </Badge>
                </div>
                
                <div className="flex gap-2">
                  <Button variant="outline" asChild>
                    <a href={maintainer.githubUrl} target="_blank" rel="noopener noreferrer">
                      <Github className="w-4 h-4 mr-2" />
                      GitHub
                    </a>
                  </Button>
                  <Button variant="outline" asChild>
                    <a href={`mailto:${maintainer.email}`}>
                      <Mail className="w-4 h-4 mr-2" />
                      Email
                    </a>
                  </Button>
                </div>
              </div>
              
              <p className="text-gray-700 mb-6 leading-relaxed">{maintainer.bio}</p>
              
              <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                <div className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  {maintainer.location}
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  Joined {formatDate(maintainer.joinedAt)}
                </div>
                <div className="flex items-center gap-1">
                  <Building2 className="w-4 h-4" />
                  {maintainer.organizationName}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">PR Merge Rate</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600 mb-2">{prMergeRate.toFixed(1)}%</div>
              <Progress value={prMergeRate} className="mb-2" />
              <p className="text-xs text-gray-500">
                {maintainer.stats.prsMerged} merged of {maintainer.stats.prsCreated} created
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Issues Closed</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600 mb-2">{maintainer.stats.issuesClosed}</div>
              <div className="text-xs text-gray-500 mb-2">
                {maintainer.stats.issuesCreated} created
              </div>
              <Progress value={issueCloseRate} className="mb-1" />
              <p className="text-xs text-gray-500">{issueCloseRate.toFixed(1)}% close rate</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">PRs Reviewed</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-600">{maintainer.stats.prsReviewed}</div>
              <p className="text-xs text-gray-500 mt-2">Total reviews completed</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Monthly Commits</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-600">{maintainer.stats.commitsThisMonth}</div>
              <p className="text-xs text-gray-500 mt-2">This month</p>
            </CardContent>
          </Card>
        </div>

        {/* Detailed Information */}
        <Tabs defaultValue="activity" className="space-y-6">
          <TabsList>
            <TabsTrigger value="activity">Recent Activity</TabsTrigger>
            <TabsTrigger value="repositories">Repositories</TabsTrigger>
            <TabsTrigger value="stats">Detailed Stats</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="activity">
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Latest contributions and activities</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {maintainer.recentActivity.map((activity) => (
                    <div key={activity.id} className="flex items-center gap-4 p-4 border rounded-lg">
                      {getActivityIcon(activity.type)}
                      <div className="flex-1">
                        <p className="font-medium">{activity.title}</p>
                        <p className="text-sm text-gray-600">{activity.repository}</p>
                      </div>
                      <span className="text-sm text-gray-500">{activity.timestamp}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="repositories">
            <Card>
              <CardHeader>
                <CardTitle>Managed Repositories</CardTitle>
                <CardDescription>Repositories under maintainer's care</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {maintainer.repositories.map((repo) => (
                    <div key={repo.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <h3 className="font-semibold">{repo.name}</h3>
                        <p className="text-sm text-gray-600 mb-2">{repo.description}</p>
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <span className="flex items-center gap-1">
                            <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                            {repo.language}
                          </span>
                          <span>⭐ {repo.stars.toLocaleString()}</span>
                          <span>Updated {repo.lastActivity}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="stats">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Pull Request Statistics</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span>Created</span>
                    <span className="font-semibold">{maintainer.stats.prsCreated}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Merged</span>
                    <span className="font-semibold text-green-600">{maintainer.stats.prsMerged}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Reviewed</span>
                    <span className="font-semibold text-purple-600">{maintainer.stats.prsReviewed}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Merge Rate</span>
                    <span className="font-semibold">{prMergeRate.toFixed(1)}%</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Issue Management</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span>Created</span>
                    <span className="font-semibold">{maintainer.stats.issuesCreated}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Closed</span>
                    <span className="font-semibold text-blue-600">{maintainer.stats.issuesClosed}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Close Rate</span>
                    <span className="font-semibold">{issueCloseRate.toFixed(1)}%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Repositories Managed</span>
                    <span className="font-semibold">{maintainer.stats.repositoriesManaged}</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="overflow-hidden border-0 shadow-lg bg-gradient-to-br from-white to-gray-50">
      <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50 border-b">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
            <CheckCircle className="w-5 h-5 text-white" />
          </div>
          <div>
            <CardTitle className="text-xl font-bold text-gray-900">Code Review Impact</CardTitle>
            <CardDescription className="text-gray-600">Review patterns and effectiveness</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <div className="space-y-6">
          {/* Total Reviews Highlight */}
          <div className="text-center p-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border border-green-100">
            <div className="text-4xl font-bold text-green-600 mb-2">{maintainer.metrics.codeReviews.total}</div>
            <div className="text-lg font-medium text-gray-700">Total Reviews</div>
            <div className="text-sm text-gray-500">This month</div>
          </div>
          
          {/* Approval Rate with Enhanced Progress */}
          <div className="bg-white p-4 rounded-xl border border-gray-100">
            <div className="flex justify-between mb-3">
              <span className="font-medium text-gray-700">Approval Rate</span>
              <span className="font-bold text-2xl text-green-600">
                {((maintainer.metrics.codeReviews.approved / maintainer.metrics.codeReviews.total) * 100).toFixed(1)}%
              </span>
            </div>
            <div className="relative">
              <Progress 
                value={(maintainer.metrics.codeReviews.approved / maintainer.metrics.codeReviews.total) * 100} 
                className="h-3 bg-gray-100"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full" 
                   style={{ width: `${(maintainer.metrics.codeReviews.approved / maintainer.metrics.codeReviews.total) * 100}%` }}>
              </div>
            </div>
          </div>
          
          {/* Enhanced Statistics Grid */}
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border border-green-100 hover:shadow-md transition-shadow">
              <div className="text-2xl font-bold text-green-600 mb-1">
                {maintainer.metrics.codeReviews.approved}
              </div>
              <div className="text-sm font-medium text-green-700">Approved</div>
              <div className="text-xs text-gray-500 mt-1">Reviews</div>
            </div>
            <div className="text-center p-4 bg-gradient-to-br from-orange-50 to-yellow-50 rounded-xl border border-orange-100 hover:shadow-md transition-shadow">
              <div className="text-2xl font-bold text-orange-600 mb-1">
                {maintainer.metrics.codeReviews.changesRequested}
              </div>
              <div className="text-sm font-medium text-orange-700">Changes</div>
              <div className="text-xs text-gray-500 mt-1">Requested</div>
            </div>
            <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border border-blue-100 hover:shadow-md transition-shadow">
              <div className="text-2xl font-bold text-blue-600 mb-1">
                {maintainer.metrics.codeReviews.averageResponseTime}
              </div>
              <div className="text-sm font-medium text-blue-700">Response</div>
              <div className="text-xs text-gray-500 mt-1">Time</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>

    <Card className="overflow-hidden border-0 shadow-lg bg-gradient-to-br from-white to-gray-50">
      <CardHeader className="bg-gradient-to-r from-purple-50 to-indigo-50 border-b">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-lg flex items-center justify-center">
            <MessageSquare className="w-5 h-5 text-white" />
          </div>
          <div>
            <CardTitle className="text-xl font-bold text-gray-900">Community Engagement</CardTitle>
            <CardDescription className="text-gray-600">Interaction with contributors</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <div className="space-y-6">
          {/* Enhanced Main Stats */}
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-indigo-50 rounded-xl border border-purple-100 hover:shadow-md transition-all">
              <div className="text-3xl font-bold text-purple-600 mb-2">
                {maintainer.metrics.communityInteraction.prComments + 
                 maintainer.metrics.communityInteraction.issueComments}
              </div>
              <div className="text-sm font-medium text-purple-700">Total Comments</div>
              <div className="text-xs text-gray-500 mt-1">PR & Issue comments</div>
            </div>
            <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl border border-blue-100 hover:shadow-md transition-all">
              <div className="text-3xl font-bold text-blue-600 mb-2">
                {maintainer.metrics.communityInteraction.discussionReplies}
              </div>
              <div className="text-sm font-medium text-blue-700">Discussion Replies</div>
              <div className="text-xs text-gray-500 mt-1">Community discussions</div>
            </div>
          </div>
          
          {/* Enhanced Engagement Breakdown */}
          <div className="bg-white p-5 rounded-xl border border-gray-100">
            <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Activity className="w-4 h-4 text-gray-600" />
              Engagement Breakdown
            </h4>
            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg">
                <span className="text-sm font-medium text-gray-700">PR Comments</span>
                <span className="font-bold text-lg text-purple-600">{maintainer.metrics.communityInteraction.prComments}</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg">
                <span className="text-sm font-medium text-gray-700">Issue Comments</span>
                <span className="font-bold text-lg text-blue-600">{maintainer.metrics.communityInteraction.issueComments}</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg">
                <span className="text-sm font-medium text-gray-700">Mentions Received</span>
                <span className="font-bold text-lg text-indigo-600">{maintainer.metrics.communityInteraction.mentionsReceived}</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
            </div>
          </TabsContent>

          <TabsContent value="analytics">
            <div className="space-y-6">
              <SentimentTemperature data={maintainer.metrics.sentimentData.weekly} />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}