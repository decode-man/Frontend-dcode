import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar';
import { Shield, User, Building2, Users, Calendar, Mail, Globe, Github, UserPlus, Settings } from 'lucide-react';
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
      <div className="max-w-6xl mx-auto p-6">
        {/* Profile Section */}
        <div className="mb-8">
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">My Profile & Statistics</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                      <Shield className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-green-600">87.2%</p>
                      <p className="text-sm text-gray-600">PR Merge Rate</p>
                    </div>
                  </div>
                  <div className="mt-3">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-green-600 h-2 rounded-full w-[87.2%]"></div>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">298 merged of 342 created</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <User className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-blue-600">156</p>
                      <p className="text-sm text-gray-600">Issues Closed</p>
                    </div>
                  </div>
                  <div className="mt-3">
                    <p className="text-xs text-gray-500">89 created • 175% close rate</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                      <Users className="w-5 h-5 text-purple-600" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-purple-600">1,247</p>
                      <p className="text-sm text-gray-600">PRs Reviewed</p>
                    </div>
                  </div>
                  <div className="mt-3">
                    <p className="text-xs text-gray-500">This month: 47 reviews</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                      <Building2 className="w-5 h-5 text-orange-600" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-orange-600">8</p>
                      <p className="text-sm text-gray-600">Repositories</p>
                    </div>
                  </div>
                  <div className="mt-3">
                    <p className="text-xs text-gray-500">Actively maintained</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="flex justify-end">
              <Button 
                variant="outline" 
                onClick={() => navigate('/maintainer-profile/1')}
                className="flex items-center gap-2"
              >
                <User className="w-4 h-4" />
                View Full Profile
              </Button>
            </div>
          </div>
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