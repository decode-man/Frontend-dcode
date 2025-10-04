import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { 
  ArrowLeft, 
  Star, 
  Eye, 
  GitFork, 
  Calendar, 
  UserPlus, 
  Users,
  CircleDot,
  Building2,
  Globe,
  Github
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface Repository {
  id: string;
  name: string;
  description: string;
  language: string;
  stars: number;
  forks: number;
  watchers: number;
  issues: number;
  isPrivate: boolean;
  updatedAt: string;
  url: string;
}

interface Organization {
  id: string;
  name: string;
  description: string;
  type: string;
  memberCount: number;
  repositoryCount: number;
  githubUrl: string;
  website?: string;
  email: string;
  maintainerCount: number;
  visibility: string;
}

const getMockOrganization = (id: string): Organization => {
  const organizations = {
    '1': {
      id: '1',
      name: 'Microsoft',
      description: 'Microsoft Corporation is a multinational technology corporation that develops, manufactures, licenses, supports, and sells computer software, consumer electronics, personal computers, and related services.',
      type: 'Enterprise',
      memberCount: 2450,
      repositoryCount: 1842,
      githubUrl: 'https://github.com/microsoft',
      website: 'microsoft.com',
      email: 'opensource@microsoft.com',
      maintainerCount: 45,
      visibility: 'Public',
      repositories: [
        {
          id: 'vscode',
          name: 'vscode',
          description: 'Visual Studio Code',
          language: 'TypeScript',
          stars: 162000,
          forks: 28900,
          watchers: 3600,
          issues: 5420,
          isPrivate: false,
          updatedAt: '2024-03-20',
          url: 'https://github.com/microsoft/vscode'
        },
        {
          id: 'typescript',
          name: 'TypeScript',
          description: 'TypeScript is a superset of JavaScript',
          language: 'TypeScript',
          stars: 100000,
          forks: 13100,
          watchers: 1800,
          issues: 3845,
          isPrivate: false,
          updatedAt: '2024-03-19',
          url: 'https://github.com/microsoft/typescript'
        },
        {
          id: 'powertoys',
          name: 'PowerToys',
          description: 'Windows system utilities to maximize productivity',
          language: 'C#',
          stars: 109000,
          forks: 6400,
          watchers: 1200,
          issues: 1234,
          isPrivate: false,
          updatedAt: '2024-03-18',
          url: 'https://github.com/microsoft/powertoys'
        },
        {
          id: 'azure-docs',
          name: 'azure-docs',
          description: 'Open source documentation of Microsoft Azure',
          language: 'PowerShell',
          stars: 10100,
          forks: 21500,
          watchers: 650,
          issues: 892,
          isPrivate: false,
          updatedAt: '2024-03-17',
          url: 'https://github.com/microsoftdocs/azure-docs'
        },
        {
          id: 'playwright',
          name: 'Playwright',
          description: 'Playwright is a framework for Web Testing and Automation',
          language: 'TypeScript',
          stars: 65000,
          forks: 3600,
          watchers: 650,
          issues: 567,
          isPrivate: false,
          updatedAt: '2024-03-16',
          url: 'https://github.com/microsoft/playwright'
        },
        {
          id: 'monaco-editor',
          name: 'monaco-editor',
          description: 'A browser based code editor',
          language: 'TypeScript',
          stars: 39800,
          forks: 3600,
          watchers: 570,
          issues: 423,
          isPrivate: false,
          updatedAt: '2024-03-15',
          url: 'https://github.com/microsoft/monaco-editor'
        }
      ]
    },
    '2': {
      id: '2',
      name: 'Facebook',
      description: 'Meta (formerly Facebook) builds technologies that help people connect, find communities, and grow businesses.',
      type: 'Open Source',
      memberCount: 856,
      repositoryCount: 234,
      githubUrl: 'https://github.com/facebook',
      website: 'opensource.fb.com',
      email: 'opensource@meta.com',
      maintainerCount: 23,
      visibility: 'Public'
    },
    '3': {
      id: '3',
      name: 'Google',
      description: 'Google LLC is an American multinational technology company that specializes in Internet-related services and products.',
      type: 'Enterprise',
      memberCount: 1234,
      repositoryCount: 567,
      githubUrl: 'https://github.com/google',
      website: 'opensource.google',
      email: 'opensource@google.com',
      maintainerCount: 34,
      visibility: 'Public'
    },
    '4': {
      id: '4',
      name: 'Vercel',
      description: 'Vercel is the Frontend Cloud. Build, scale, and secure a faster, personalized web.',
      type: 'Open Source',
      memberCount: 189,
      repositoryCount: 89,
      githubUrl: 'https://github.com/vercel',
      website: 'vercel.com',
      email: 'opensource@vercel.com',
      maintainerCount: 12,
      visibility: 'Public'
    },
    '5': {
      id: '5',
      name: 'OpenAI',
      description: 'OpenAI is an AI research and deployment company.',
      type: 'Open Source',
      memberCount: 234,
      repositoryCount: 45,
      githubUrl: 'https://github.com/openai',
      website: 'openai.com',
      email: 'opensource@openai.com',
      maintainerCount: 18,
      visibility: 'Public'
    }
  };
  
  return organizations[id as keyof typeof organizations] || organizations['1'];
};

const getMockRepositories = (orgName: string): Repository[] => {
  const repositoryMap: { [key: string]: Repository[] } = {
    'microsoft': [
      {
        id: 'repo1',
        name: 'TypeScript',
        description: 'TypeScript is a superset of JavaScript that compiles to clean JavaScript output.',
        language: 'TypeScript',
        stars: 98234,
        forks: 12845,
        watchers: 3421,
        issues: 1234,
        isPrivate: false,
        updatedAt: '2024-10-03',
        url: 'https://github.com/microsoft/TypeScript'
      },
      {
        id: 'repo2',
        name: 'vscode',
        description: 'Visual Studio Code - Open source source code editor developed by Microsoft.',
        language: 'TypeScript',
        stars: 159843,
        forks: 28123,
        watchers: 6543,
        issues: 2456,
        isPrivate: false,
        updatedAt: '2024-10-04',
        url: 'https://github.com/microsoft/vscode'
      },
      {
        id: 'repo3',
        name: 'PowerToys',
        description: 'Windows system utilities to maximize productivity',
        language: 'C#',
        stars: 105234,
        forks: 6123,
        watchers: 2876,
        issues: 567,
        isPrivate: false,
        updatedAt: '2024-10-02',
        url: 'https://github.com/microsoft/PowerToys'
      },
      {
        id: 'repo4',
        name: 'azure-docs',
        description: 'Open source documentation of Microsoft Azure',
        language: 'PowerShell',
        stars: 9876,
        forks: 15234,
        watchers: 987,
        issues: 892,
        isPrivate: false,
        updatedAt: '2024-10-01',
        url: 'https://github.com/MicrosoftDocs/azure-docs'
      }
    ],
    'facebook': [
      {
        id: 'repo1',
        name: 'react',
        description: 'The library for web and native user interfaces',
        language: 'JavaScript',
        stars: 223456,
        forks: 45678,
        watchers: 8765,
        issues: 3421,
        isPrivate: false,
        updatedAt: '2024-10-04',
        url: 'https://github.com/facebook/react'
      },
      {
        id: 'repo2',
        name: 'react-native',
        description: 'A framework for building native applications using React',
        language: 'C++',
        stars: 116543,
        forks: 24123,
        watchers: 4321,
        issues: 1876,
        isPrivate: false,
        updatedAt: '2024-10-03',
        url: 'https://github.com/facebook/react-native'
      },
      {
        id: 'repo3',
        name: 'pytorch',
        description: 'Tensors and Dynamic neural networks in Python with strong GPU acceleration',
        language: 'Python',
        stars: 78234,
        forks: 21456,
        watchers: 3456,
        issues: 2567,
        isPrivate: false,
        updatedAt: '2024-10-04',
        url: 'https://github.com/pytorch/pytorch'
      }
    ],
    'google': [
      {
        id: 'repo1',
        name: 'tensorflow',
        description: 'An Open Source Machine Learning Framework for Everyone',
        language: 'C++',
        stars: 183456,
        forks: 87234,
        watchers: 6789,
        issues: 4321,
        isPrivate: false,
        updatedAt: '2024-10-04',
        url: 'https://github.com/tensorflow/tensorflow'
      },
      {
        id: 'repo2',
        name: 'angular',
        description: 'The modern web developer\'s platform',
        language: 'TypeScript',
        stars: 93456,
        forks: 24567,
        watchers: 3456,
        issues: 2987,
        isPrivate: false,
        updatedAt: '2024-10-03',
        url: 'https://github.com/angular/angular'
      },
      {
        id: 'repo3',
        name: 'kubernetes',
        description: 'Production-Grade Container Scheduling and Management',
        language: 'Go',
        stars: 107234,
        forks: 38456,
        watchers: 4567,
        issues: 3654,
        isPrivate: false,
        updatedAt: '2024-10-04',
        url: 'https://github.com/kubernetes/kubernetes'
      }
    ],
    'vercel': [
      {
        id: 'repo1',
        name: 'next.js',
        description: 'The React Framework for the Web',
        language: 'JavaScript',
        stars: 122345,
        forks: 26789,
        watchers: 4567,
        issues: 1987,
        isPrivate: false,
        updatedAt: '2024-10-04',
        url: 'https://github.com/vercel/next.js'
      },
      {
        id: 'repo2',
        name: 'swr',
        description: 'React Hooks for Data Fetching',
        language: 'TypeScript',
        stars: 29876,
        forks: 1876,
        watchers: 987,
        issues: 234,
        isPrivate: false,
        updatedAt: '2024-10-03',
        url: 'https://github.com/vercel/swr'
      },
      {
        id: 'repo3',
        name: 'vercel',
        description: 'Develop. Preview. Ship.',
        language: 'TypeScript',
        stars: 12456,
        forks: 2345,
        watchers: 567,
        issues: 345,
        isPrivate: false,
        updatedAt: '2024-10-02',
        url: 'https://github.com/vercel/vercel'
      }
    ],
    'openai': [
      {
        id: 'repo1',
        name: 'openai-python',
        description: 'The official Python library for the OpenAI API',
        language: 'Python',
        stars: 19876,
        forks: 2456,
        watchers: 876,
        issues: 432,
        isPrivate: false,
        updatedAt: '2024-10-04',
        url: 'https://github.com/openai/openai-python'
      },
      {
        id: 'repo2',
        name: 'whisper',
        description: 'Robust Speech Recognition via Large-Scale Weak Supervision',
        language: 'Python',
        stars: 64123,
        forks: 7234,
        watchers: 2345,
        issues: 567,
        isPrivate: false,
        updatedAt: '2024-10-03',
        url: 'https://github.com/openai/whisper'
      },
      {
        id: 'repo3',
        name: 'openai-cookbook',
        description: 'Examples and guides for using the OpenAI API',
        language: 'Python',
        stars: 56789,
        forks: 8234,
        watchers: 1234,
        issues: 123,
        isPrivate: false,
        updatedAt: '2024-10-02',
        url: 'https://github.com/openai/openai-cookbook'
      }
    ]
  };

  return repositoryMap[orgName] || [];
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

const formatNumber = (num: number): string => {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M';
  } else if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K';
  }
  return num.toString();
};

const MaintainerOrganizationDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();

  if (!user || user.role !== 'maintainer') {
    navigate('/login');
    return null;
  }

  const organization = getMockOrganization(id || '');
  const repositories = getMockRepositories(organization.name.toLowerCase());

  const handleBack = () => {
    navigate('/maintainer/dashboard');
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
            Back to Dashboard
          </Button>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-primary/10 rounded-lg flex items-center justify-center">
                <Building2 className="w-8 h-8 text-primary" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">{organization.name}</h1>
                <p className="text-gray-600 mt-1">Organization • {organization.type}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto p-6">
        {/* Organization Info */}
        <Card className="mb-8">
          <CardHeader>
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <CardTitle className="text-2xl font-bold mb-2">{organization.name}</CardTitle>
                <CardDescription className="text-base mb-4">
                  {organization.description}
                </CardDescription>
                <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    <span>{organization.memberCount} members</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Building2 className="w-4 h-4" />
                    <span>{organization.repositoryCount} repositories</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <UserPlus className="w-4 h-4" />
                    <span>{organization.maintainerCount} maintainers</span>
                  </div>
                  {organization.website && (
                    <div className="flex items-center gap-2">
                      <Globe className="w-4 h-4" />
                      <a href={`https://${organization.website}`} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800">
                        {organization.website}
                      </a>
                    </div>
                  )}
                  <div className="flex items-center gap-2">
                    <Github className="w-4 h-4" />
                    <a href={organization.githubUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800">
                      {organization.githubUrl.replace('https://github.com/', '')}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </CardHeader>
        </Card>

        {/* Repositories Section */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Repositories</h2>
          <p className="text-gray-600 mb-6">Manage repositories and assign maintainers</p>
        </div>

        {/* Repositories Grid */}
        <div className="grid gap-4">
          {repositories.map((repo) => (
            <Card 
              key={repo.id} 
              className="hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => navigate(`/maintainer/repository/${repo.id}`)}
            >
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">{repo.name}</h3>
                      <Badge variant="outline" className={getLanguageColor(repo.language)}>
                        {repo.language}
                      </Badge>
                      {repo.isPrivate && (
                        <Badge variant="secondary">Private</Badge>
                      )}
                    </div>
                    <p className="text-gray-600 mb-4">{repo.description}</p>
                    
                    <div className="flex items-center gap-6 text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4" />
                        <span>{formatNumber(repo.stars)}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <GitFork className="w-4 h-4" />
                        <span>{formatNumber(repo.forks)}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Eye className="w-4 h-4" />
                        <span>{formatNumber(repo.watchers)}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <CircleDot className="w-4 h-4" />
                        <span>{formatNumber(repo.issues)} issues</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        <span>Updated {new Date(repo.updatedAt).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex gap-2 ml-4">
                    <Button variant="outline" size="sm" asChild>
                      <a href={repo.url} target="_blank" rel="noopener noreferrer">
                        <Github className="w-4 h-4 mr-1" />
                        View on GitHub
                      </a>
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

export default MaintainerOrganizationDetail;