import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar';
import { Shield, User, Building2, Plus, Users, Calendar, Mail, Globe, Github, UserPlus, Settings } from 'lucide-react';
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
    email: 'opensource@fb.com',
    createdAt: '2012-04-20',
    status: 'Active',
    maintainerCount: 28,
    visibility: 'Public'
  },
  {
    id: '3',
    name: 'google',
    description: 'Google Open Source - TensorFlow, Angular, Kubernetes, Android, and cutting-edge machine learning projects.',
    type: 'Enterprise',
    memberCount: 1234,
    repositoryCount: 892,
    githubUrl: 'https://github.com/google',
    website: 'opensource.google',
    email: 'opensource@google.com',
    createdAt: '2011-03-10',
    status: 'Active',
    maintainerCount: 67,
    visibility: 'Public'
  },
  {
    id: '4',
    name: 'vercel',
    description: 'Vercel - Next.js, SWR, and modern web development tools. Building the future of frontend development.',
    type: 'Open Source',
    memberCount: 124,
    repositoryCount: 89,
    githubUrl: 'https://github.com/vercel',
    website: 'vercel.com',
    email: 'hello@vercel.com',
    createdAt: '2020-11-05',
    status: 'Active',
    maintainerCount: 12,
    visibility: 'Public'
  },
  {
    id: '5',
    name: 'openai',
    description: 'OpenAI - Artificial intelligence research and development. GPT models, CLIP, and AI safety research.',
    type: 'Private',
    memberCount: 89,
    repositoryCount: 45,
    githubUrl: 'https://github.com/openai',
    website: 'openai.com',
    email: 'support@openai.com',
    createdAt: '2016-04-12',
    status: 'Pending',
    maintainerCount: 8,
    visibility: 'Public'
  }
];

const AdminDashboard: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const organizations = mockOrganizations;

  const getStatusBadge = (status: Organization['status']) => {
    const statusStyles = {
      Active: 'bg-green-100 text-green-800 border-green-200',
      Pending: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      Inactive: 'bg-gray-100 text-gray-800 border-gray-200'
    };
    return statusStyles[status];
  };

  const getTypeIcon = (type: Organization['type']) => {
    switch (type) {
      case 'Open Source':
        return '�';
      case 'Enterprise':
        return '�';
      case 'Private':
        return '🔒';
      case 'Educational':
        return '🎓';
      case 'Non-Profit':
        return '�';
      default:
        return '🐙'; // GitHub Octocat emoji
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-semibold">Admin Dashboard</h1>
                <p className="text-sm text-gray-600">Welcome back, {user?.name || user?.login}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Badge variant="destructive">Admin</Badge>
              <Avatar>
                <AvatarImage src={user?.avatar_url} alt={user?.name || user?.login} />
                <AvatarFallback>
                  <User className="w-4 h-4" />
                </AvatarFallback>
              </Avatar>
              <Button variant="outline" onClick={logout}>
                Logout
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto p-6">
        {/* Organization Management Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">GitHub Organizations</h2>
            <p className="text-gray-600 mt-1">Manage GitHub organizations and assign maintainers</p>
          </div>
          <Button className="bg-primary hover:bg-primary/90 text-white font-semibold px-6 py-2">
            <Plus className="w-5 h-5 mr-2" />
            Add GitHub Organisation
          </Button>
        </div>

        {/* Organizations Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {organizations.map((org) => (
            <Card 
              key={org.id} 
              className="hover:shadow-lg transition-all duration-200 border-2 hover:border-primary/20"
            >
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center text-2xl">
                      {getTypeIcon(org.type)}
                    </div>
                    <div>
                      <CardTitle className="text-lg font-semibold text-gray-900">{org.name}</CardTitle>
                      <div className="flex gap-2 mt-1">
                        <Badge variant="outline" className="text-xs">
                          {org.type}
                        </Badge>
                        <Badge variant="outline" className={`text-xs border ${getStatusBadge(org.status)}`}>
                          {org.status}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <CardDescription className="text-sm text-gray-600 mb-4 line-clamp-3">
                  {org.description}
                </CardDescription>
                
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Users className="w-4 h-4 text-gray-400" />
                    <span>{org.memberCount} members</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Building2 className="w-4 h-4 text-gray-400" />
                    <span>{org.repositoryCount} repositories</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <UserPlus className="w-4 h-4 text-gray-400" />
                    <span>{org.maintainerCount} maintainers</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Mail className="w-4 h-4 text-gray-400" />
                    <span className="truncate">{org.email}</span>
                  </div>
                  {org.website && (
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Globe className="w-4 h-4 text-gray-400" />
                      <span className="truncate">{org.website}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Github className="w-4 h-4 text-gray-400" />
                    <span className="truncate text-blue-600 hover:text-blue-800">
                      <a href={org.githubUrl} target="_blank" rel="noopener noreferrer">
                        {org.githubUrl.replace('https://github.com/', '')}
                      </a>
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    <span>Created {new Date(org.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>

                <div className="space-y-2 mt-6">
                  <Button 
                    variant="default" 
                    size="sm" 
                    className="w-full bg-primary hover:bg-primary/90 text-white"
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/admin/organization/${org.id}/maintainers`);
                    }}
                  >
                    <Users className="w-4 h-4 mr-2" />
                    View Maintainers ({org.maintainerCount})
                  </Button>
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="flex-1 hover:bg-primary/5 hover:border-primary/20"
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/admin/organization/${org.id}/add-maintainer`);
                      }}
                    >
                      <UserPlus className="w-4 h-4 mr-1" />
                      Add Maintainers
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="flex-1 hover:bg-primary/5 hover:border-primary/20"
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/admin/organization/${org.id}/settings`);
                      }}
                    >
                      <Settings className="w-4 h-4 mr-1" />
                      Manage
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {organizations.length === 0 && (
          <div className="text-center py-16">
            <Building2 className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No GitHub organizations yet</h3>
            <p className="text-gray-600 mb-6">Get started by adding your first GitHub organization to manage maintainers</p>
            <Button className="bg-primary hover:bg-primary/90 text-white">
              <Plus className="w-5 h-5 mr-2" />
              Add Your First GitHub Organisation
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;