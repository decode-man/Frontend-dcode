
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
  Building2
} from 'lucide-react';

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
      ]
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
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}