import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar';
import { 
  ArrowLeft, 
  Github, 
  GitBranch, 
  Star, 
  Eye, 
  GitFork, 
  Calendar, 
  UserPlus, 
  Users,
  CircleDot,
  GitPullRequest,
  AlertCircle,
  CheckCircle,
  XCircle,
  Clock,
  MessageSquare,
  User,
  ExternalLink
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface PullRequest {
  id: string;
  number: number;
  title: string;
  description: string;
  author: string;
  authorAvatar: string;
  status: 'open' | 'merged' | 'closed';
  createdAt: string;
  updatedAt: string;
  branch: string;
  targetBranch: string;
  comments: number;
  additions: number;
  deletions: number;
  files: number;
}

interface Issue {
  id: string;
  number: number;
  title: string;
  description: string;
  author: string;
  authorAvatar: string;
  status: 'open' | 'closed';
  priority: 'low' | 'medium' | 'high' | 'critical';
  labels: string[];
  createdAt: string;
  updatedAt: string;
  comments: number;
  assignee?: string;
}

interface Repository {
  id: string;
  name: string;
  description: string;
  language: string;
  stars: number;
  forks: number;
  watchers: number;
  issues: number;
  pullRequests: number;
  isPrivate: boolean;
  updatedAt: string;
  url: string;
  organization: string;
}

const getMockRepository = (repoId: string): Repository => {
  const repositories: { [key: string]: Repository } = {
    'vscode': {
      id: 'vscode',
      name: 'vscode',
      description: 'Visual Studio Code - Open source source code editor developed by Microsoft.',
      language: 'TypeScript',
      stars: 159843,
      forks: 28123,
      watchers: 6543,
      issues: 2456,
      pullRequests: 145,
      isPrivate: false,
      updatedAt: '2024-10-04',
      url: 'https://github.com/microsoft/vscode',
      organization: 'Microsoft'
    },
    'repo1': {
      id: 'repo1',
      name: 'TypeScript',
      description: 'TypeScript is a superset of JavaScript that compiles to clean JavaScript output.',
      language: 'TypeScript',
      stars: 98234,
      forks: 12845,
      watchers: 3421,
      issues: 1234,
      pullRequests: 89,
      isPrivate: false,
      updatedAt: '2024-10-03',
      url: 'https://github.com/microsoft/TypeScript',
      organization: 'Microsoft'
    },
    'react': {
      id: 'react',
      name: 'react',
      description: 'The library for web and native user interfaces',
      language: 'JavaScript',
      stars: 223456,
      forks: 45678,
      watchers: 8765,
      issues: 3421,
      pullRequests: 234,
      isPrivate: false,
      updatedAt: '2024-10-04',
      url: 'https://github.com/facebook/react',
      organization: 'Facebook'
    }
  };

  return repositories[repoId] || repositories['vscode'];
};

const getMockPullRequests = (repoId: string): PullRequest[] => {
  return [
    {
      id: 'pr-1',
      number: 195821,
      title: 'Fix memory leak in extension host process',
      description: 'This PR addresses a critical memory leak that occurs when extensions are repeatedly loaded and unloaded.',
      author: 'alexdima',
      authorAvatar: 'https://avatars.githubusercontent.com/u/5047891?v=4',
      status: 'open',
      createdAt: '2024-10-03',
      updatedAt: '2024-10-04',
      branch: 'fix/memory-leak',
      targetBranch: 'main',
      comments: 12,
      additions: 45,
      deletions: 23,
      files: 8
    },
    {
      id: 'pr-2',
      number: 195820,
      title: 'Add support for TypeScript 5.6',
      description: 'Updates TypeScript language service to support the latest TypeScript 5.6 features.',
      author: 'mjbvz',
      authorAvatar: 'https://avatars.githubusercontent.com/u/12821956?v=4',
      status: 'merged',
      createdAt: '2024-10-02',
      updatedAt: '2024-10-03',
      branch: 'feature/typescript-5.6',
      targetBranch: 'main',
      comments: 8,
      additions: 127,
      deletions: 34,
      files: 15
    },
    {
      id: 'pr-3',
      number: 195819,
      title: 'Improve terminal performance on Windows',
      description: 'Optimizes terminal rendering and reduces CPU usage on Windows systems.',
      author: 'tyriar',
      authorAvatar: 'https://avatars.githubusercontent.com/u/2193314?v=4',
      status: 'open',
      createdAt: '2024-10-01',
      updatedAt: '2024-10-02',
      branch: 'perf/terminal-windows',
      targetBranch: 'main',
      comments: 5,
      additions: 89,
      deletions: 12,
      files: 6
    },
    {
      id: 'pr-4',
      number: 195818,
      title: 'Update electron to version 28.0.0',
      description: 'Upgrades Electron framework to the latest stable version with security improvements.',
      author: 'deepak1556',
      authorAvatar: 'https://avatars.githubusercontent.com/u/1770714?v=4',
      status: 'closed',
      createdAt: '2024-09-30',
      updatedAt: '2024-10-01',
      branch: 'update/electron-28',
      targetBranch: 'main',
      comments: 15,
      additions: 203,
      deletions: 156,
      files: 25
    },
    {
      id: 'pr-5',
      number: 195817,
      title: 'Add new theme customization options',
      description: 'Introduces new customization options for editor themes and workbench colors.',
      author: 'aeschli',
      authorAvatar: 'https://avatars.githubusercontent.com/u/6461412?v=4',
      status: 'open',
      createdAt: '2024-09-29',
      updatedAt: '2024-09-30',
      branch: 'feature/theme-customization',
      targetBranch: 'main',
      comments: 23,
      additions: 78,
      deletions: 5,
      files: 12
    }
  ];
};

const getMockIssues = (repoId: string): Issue[] => {
  return [
    {
      id: 'issue-1',
      number: 195825,
      title: 'Extension activation timeout in large workspaces',
      description: 'Extensions fail to activate properly when opening very large workspaces with thousands of files.',
      author: 'user123',
      authorAvatar: 'https://avatars.githubusercontent.com/u/1234567?v=4',
      status: 'open',
      priority: 'high',
      labels: ['bug', 'performance', 'extensions'],
      createdAt: '2024-10-04',
      updatedAt: '2024-10-04',
      comments: 8,
      assignee: 'alexdima'
    },
    {
      id: 'issue-2',
      number: 195824,
      title: 'Syntax highlighting broken for new file types',
      description: 'Syntax highlighting is not working correctly for newly added file extensions in the latest update.',
      author: 'developer456',
      authorAvatar: 'https://avatars.githubusercontent.com/u/2345678?v=4',
      status: 'open',
      priority: 'medium',
      labels: ['bug', 'editor', 'syntax-highlighting'],
      createdAt: '2024-10-03',
      updatedAt: '2024-10-04',
      comments: 12,
      assignee: 'mjbvz'
    },
    {
      id: 'issue-3',
      number: 195823,
      title: 'Feature request: Add support for custom key bindings in terminal',
      description: 'Users should be able to customize key bindings specifically for the integrated terminal.',
      author: 'poweruser789',
      authorAvatar: 'https://avatars.githubusercontent.com/u/3456789?v=4',
      status: 'open',
      priority: 'low',
      labels: ['feature-request', 'terminal', 'keybindings'],
      createdAt: '2024-10-02',
      updatedAt: '2024-10-03',
      comments: 15
    },
    {
      id: 'issue-4',
      number: 195822,
      title: 'Critical: Data loss when auto-save fails',
      description: 'Users report losing work when auto-save feature fails silently without notification.',
      author: 'concerneduser',
      authorAvatar: 'https://avatars.githubusercontent.com/u/4567890?v=4',
      status: 'open',
      priority: 'critical',
      labels: ['bug', 'critical', 'auto-save', 'data-loss'],
      createdAt: '2024-10-01',
      updatedAt: '2024-10-04',
      comments: 25,
      assignee: 'jrieken'
    },
    {
      id: 'issue-5',
      number: 195821,
      title: 'Memory usage increases over time during debugging sessions',
      description: 'VSCode memory consumption grows continuously during long debugging sessions, eventually causing performance issues.',
      author: 'debuggerpro',
      authorAvatar: 'https://avatars.githubusercontent.com/u/5678901?v=4',
      status: 'closed',
      priority: 'medium',
      labels: ['bug', 'memory', 'debugger', 'performance'],
      createdAt: '2024-09-28',
      updatedAt: '2024-10-01',
      comments: 18
    }
  ];
};

const getLanguageColor = (language: string): string => {
  const colors: { [key: string]: string } = {
    'TypeScript': 'bg-blue-100 text-blue-800',
    'JavaScript': 'bg-yellow-100 text-yellow-800',
    'Python': 'bg-green-100 text-green-800',
    'C++': 'bg-red-100 text-red-800',
    'C#': 'bg-purple-100 text-purple-800',
    'Go': 'bg-cyan-100 text-cyan-800',
    'Java': 'bg-orange-100 text-orange-800',
    'PowerShell': 'bg-blue-100 text-blue-800'
  };
  return colors[language] || 'bg-gray-100 text-gray-800';
};

const getPriorityColor = (priority: string): string => {
  const colors: { [key: string]: string } = {
    'low': 'bg-green-100 text-green-800',
    'medium': 'bg-yellow-100 text-yellow-800',
    'high': 'bg-orange-100 text-orange-800',
    'critical': 'bg-red-100 text-red-800'
  };
  return colors[priority] || 'bg-gray-100 text-gray-800';
};

const getStatusIcon = (status: string, type: 'pr' | 'issue') => {
  if (type === 'pr') {
    switch (status) {
      case 'open':
        return <GitPullRequest className="w-4 h-4 text-green-600" />;
      case 'merged':
        return <CheckCircle className="w-4 h-4 text-purple-600" />;
      case 'closed':
        return <XCircle className="w-4 h-4 text-red-600" />;
      default:
        return <GitPullRequest className="w-4 h-4 text-gray-600" />;
    }
  } else {
    switch (status) {
      case 'open':
        return <CircleDot className="w-4 h-4 text-green-600" />;
      case 'closed':
        return <CheckCircle className="w-4 h-4 text-purple-600" />;
      default:
        return <CircleDot className="w-4 h-4 text-gray-600" />;
    }
  }
};

const formatNumber = (num: number): string => {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M';
  } else if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K';
  }
  return num.toString();
};

const RepositoryDetail: React.FC = () => {
  const { repoId } = useParams<{ repoId: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();

  if (!user || user.role !== 'admin') {
    navigate('/login');
    return null;
  }

  const repository = getMockRepository(repoId || '');
  const pullRequests = getMockPullRequests(repoId || '');
  const issues = getMockIssues(repoId || '');

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-6xl mx-auto p-6">
          <Button
            variant="ghost"
            onClick={handleBack}
            className="mb-4 text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Organization
          </Button>
          
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{repository.name}</h1>
              <p className="text-gray-600 mt-1">{repository.organization} • Repository</p>
            </div>
            <Button variant="outline" asChild>
              <a href={repository.url} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="w-4 h-4 mr-2" />
                View on GitHub
              </a>
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto p-6">
        {/* Repository Info */}
        <Card className="mb-8">
          <CardHeader>
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <CardTitle className="text-xl">{repository.name}</CardTitle>
                  <Badge variant="outline" className={getLanguageColor(repository.language)}>
                    {repository.language}
                  </Badge>
                  {repository.isPrivate && (
                    <Badge variant="secondary">Private</Badge>
                  )}
                </div>
                <CardDescription className="text-base mb-4">
                  {repository.description}
                </CardDescription>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Star className="w-4 h-4" />
                    <span>{formatNumber(repository.stars)} stars</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <GitFork className="w-4 h-4" />
                    <span>{formatNumber(repository.forks)} forks</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Eye className="w-4 h-4" />
                    <span>{formatNumber(repository.watchers)} watchers</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Calendar className="w-4 h-4" />
                    <span>Updated {new Date(repository.updatedAt).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
            </div>
          </CardHeader>
        </Card>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Open Pull Requests</p>
                  <p className="text-2xl font-bold text-gray-900">{pullRequests.filter(pr => pr.status === 'open').length}</p>
                </div>
                <GitPullRequest className="w-8 h-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Open Issues</p>
                  <p className="text-2xl font-bold text-gray-900">{issues.filter(issue => issue.status === 'open').length}</p>
                </div>
                <CircleDot className="w-8 h-8 text-red-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Contributors</p>
                  <p className="text-2xl font-bold text-gray-900">{Math.floor(repository.forks / 10)}</p>
                </div>
                <Users className="w-8 h-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Pull Requests Section */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <GitPullRequest className="w-5 h-5" />
              Pull Requests
            </CardTitle>
            <CardDescription>
              Recent pull requests for this repository
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {pullRequests.map((pr) => (
                <div key={pr.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        {getStatusIcon(pr.status, 'pr')}
                        <span className="font-medium text-gray-900">#{pr.number}</span>
                        <h4 className="font-semibold text-gray-900">{pr.title}</h4>
                        <Badge variant="outline" className={
                          pr.status === 'open' ? 'border-green-200 text-green-800' :
                          pr.status === 'merged' ? 'border-purple-200 text-purple-800' :
                          'border-red-200 text-red-800'
                        }>
                          {pr.status}
                        </Badge>
                      </div>
                      <p className="text-gray-600 text-sm mb-3">{pr.description}</p>
                      <div className="flex items-center gap-4 text-xs text-gray-500">
                        <div className="flex items-center gap-1">
                          <Avatar className="w-4 h-4">
                            <AvatarImage src={pr.authorAvatar} alt={pr.author} />
                            <AvatarFallback>{pr.author.charAt(0).toUpperCase()}</AvatarFallback>
                          </Avatar>
                          <span>{pr.author}</span>
                        </div>
                        <span>opened {new Date(pr.createdAt).toLocaleDateString()}</span>
                        <div className="flex items-center gap-1">
                          <MessageSquare className="w-3 h-3" />
                          <span>{pr.comments}</span>
                        </div>
                        <span className="text-green-600">+{pr.additions}</span>
                        <span className="text-red-600">-{pr.deletions}</span>
                        <span>{pr.files} files</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Issues Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CircleDot className="w-5 h-5" />
              Issues
            </CardTitle>
            <CardDescription>
              Recent issues reported for this repository
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {issues.map((issue) => (
                <div 
                  key={issue.id} 
                  className="border rounded-lg p-4 hover:bg-gray-50 transition-colors cursor-pointer"
                  onClick={() => navigate(`/admin/issue/${issue.id}`)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        {getStatusIcon(issue.status, 'issue')}
                        <span className="font-medium text-gray-900">#{issue.number}</span>
                        <h4 className="font-semibold text-gray-900">{issue.title}</h4>
                        <Badge variant="outline" className={getPriorityColor(issue.priority)}>
                          {issue.priority}
                        </Badge>
                        <Badge variant="outline" className={
                          issue.status === 'open' ? 'border-green-200 text-green-800' :
                          'border-purple-200 text-purple-800'
                        }>
                          {issue.status}
                        </Badge>
                      </div>
                      <p className="text-gray-600 text-sm mb-3">{issue.description}</p>
                      <div className="flex items-center gap-4 text-xs text-gray-500 mb-2">
                        <div className="flex items-center gap-1">
                          <Avatar className="w-4 h-4">
                            <AvatarImage src={issue.authorAvatar} alt={issue.author} />
                            <AvatarFallback>{issue.author.charAt(0).toUpperCase()}</AvatarFallback>
                          </Avatar>
                          <span>{issue.author}</span>
                        </div>
                        <span>opened {new Date(issue.createdAt).toLocaleDateString()}</span>
                        <div className="flex items-center gap-1">
                          <MessageSquare className="w-3 h-3" />
                          <span>{issue.comments}</span>
                        </div>
                        {issue.assignee && (
                          <div className="flex items-center gap-1">
                            <User className="w-3 h-3" />
                            <span>assigned to {issue.assignee}</span>
                          </div>
                        )}
                      </div>
                      <div className="flex gap-1">
                        {issue.labels.map((label, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {label}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default RepositoryDetail;