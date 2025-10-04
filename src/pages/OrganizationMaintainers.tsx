
import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar';
import { Progress } from '../components/ui/progress';
import { Input } from '../components/ui/input';
import { 
  ArrowLeft, 
  Search, 
  Building2, 
  Users, 
  Mail,
  Github
} from 'lucide-react';

interface Maintainer {
  id: string;
  name: string;
  username: string;
  email: string;
  avatar: string;
  role: 'maintainer' | 'lead_maintainer';
  joinedAt: string;
  stats: {
    prsCreated: number;
    prsMerged: number;
    prsReviewed: number;
    issuesCreated: number;
    issuesClosed: number;
    repositoriesManaged: number;
  };
  isActive: boolean;
}

interface OrganizationDetail {
  id: string;
  name: string;
  description: string;
  memberCount: number;
  repositoryCount: number;
  maintainerCount: number;
}

// Mock data
const getMockOrganization = (orgId: string): OrganizationDetail => {
  const orgs: Record<string, OrganizationDetail> = {
    '1': {
      id: '1',
      name: 'Microsoft',
      description: 'Microsoft Corporation - Cloud computing, productivity software, and enterprise solutions.',
      memberCount: 2450,
      repositoryCount: 1842,
      maintainerCount: 45
    },
    '2': {
      id: '2',
      name: 'Meta',
      description: 'Meta Open Source - React, React Native, PyTorch, and other innovative open source projects.',
      memberCount: 856,
      repositoryCount: 234,
      maintainerCount: 32
    }
  };
  return orgs[orgId] || orgs['1'];
};

const getMockMaintainers = (orgId: string): Maintainer[] => {
  const maintainers: Record<string, Maintainer[]> = {
    '1': [
      {
        id: '1',
        name: 'Sarah Chen',
        username: 'sarahchen',
        email: 'sarah.chen@microsoft.com',
        avatar: 'https://github.com/sarahchen.png',
        role: 'lead_maintainer',
        joinedAt: '2020-03-15',
        stats: {
          prsCreated: 342,
          prsMerged: 298,
          prsReviewed: 1247,
          issuesCreated: 89,
          issuesClosed: 156,
          repositoriesManaged: 8
        },
        isActive: true
      },
      {
        id: '3',
        name: 'David Kim',
        username: 'davidkim',
        email: 'david.kim@microsoft.com',
        avatar: 'https://github.com/davidkim.png',
        role: 'maintainer',
        joinedAt: '2021-07-10',
        stats: {
          prsCreated: 156,
          prsMerged: 142,
          prsReviewed: 567,
          issuesCreated: 23,
          issuesClosed: 67,
          repositoriesManaged: 4
        },
        isActive: true
      },
      {
        id: '4',
        name: 'Emily Johnson',
        username: 'emilyjohnson',
        email: 'emily.johnson@microsoft.com',
        avatar: 'https://github.com/emilyjohnson.png',
        role: 'maintainer',
        joinedAt: '2022-01-20',
        stats: {
          prsCreated: 89,
          prsMerged: 78,
          prsReviewed: 234,
          issuesCreated: 12,
          issuesClosed: 34,
          repositoriesManaged: 3
        },
        isActive: true
      },
      {
        id: '5',
        name: 'Michael Torres',
        username: 'michaeltorres',
        email: 'michael.torres@microsoft.com',
        avatar: 'https://github.com/michaeltorres.png',
        role: 'lead_maintainer',
        joinedAt: '2019-11-08',
        stats: {
          prsCreated: 278,
          prsMerged: 245,
          prsReviewed: 892,
          issuesCreated: 45,
          issuesClosed: 123,
          repositoriesManaged: 6
        },
        isActive: false
      }
    ],
    '2': [
      {
        id: '2',
        name: 'Alex Rodriguez',
        username: 'alexrod',
        email: 'alex.rodriguez@meta.com',
        avatar: 'https://github.com/alexrod.png',
        role: 'maintainer',
        joinedAt: '2019-08-22',
        stats: {
          prsCreated: 187,
          prsMerged: 165,
          prsReviewed: 892,
          issuesCreated: 34,
          issuesClosed: 78,
          repositoriesManaged: 5
        },
        isActive: true
      }
    ]
  };
  return maintainers[orgId] || maintainers['1'];
};

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short'
  });
};

export default function OrganizationMaintainers() {
  const { organizationId } = useParams();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  
  const organization = getMockOrganization(organizationId || '1');
  const allMaintainers = getMockMaintainers(organizationId || '1');
  
  const filteredMaintainers = allMaintainers.filter(maintainer =>
    maintainer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    maintainer.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleMaintainerClick = (maintainerId: string) => {
    navigate(`/maintainer-profile/${maintainerId}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => navigate('/admin')}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Admin
            </Button>
            <div className="flex items-center gap-3">
              <Building2 className="w-5 h-5 text-gray-500" />
              <span className="font-medium">{organization.name}</span>
              <span className="text-gray-400">/</span>
              <span className="text-gray-600">Maintainers</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Organization Overview */}
        <div className="bg-white rounded-lg shadow-sm border p-6 mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{organization.name} Maintainers</h1>
              <p className="text-gray-600 mb-4">{organization.description}</p>
              <div className="flex gap-6 text-sm text-gray-600">
                <div className="flex items-center gap-1">
                  <Users className="w-4 h-4" />
                  <span>{organization.memberCount} members</span>
                </div>
                <div className="flex items-center gap-1">
                  <Building2 className="w-4 h-4" />
                  <span>{organization.repositoryCount} repositories</span>
                </div>
                <div className="flex items-center gap-1">
                  <Users className="w-4 h-4" />
                  <span>{organization.maintainerCount} maintainers</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-sm border p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search maintainers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </div>

        {/* Statistics Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {(() => {
            const totalPRs = filteredMaintainers.reduce((sum, m) => sum + m.stats.prsCreated, 0);
            const totalMerged = filteredMaintainers.reduce((sum, m) => sum + m.stats.prsMerged, 0);
            const totalIssuesClosed = filteredMaintainers.reduce((sum, m) => sum + m.stats.issuesClosed, 0);
            const totalReviews = filteredMaintainers.reduce((sum, m) => sum + m.stats.prsReviewed, 0);
            const avgMergeRate = totalPRs > 0 ? (totalMerged / totalPRs) * 100 : 0;

            return (
              <>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-gray-600">Total PRs Created</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-blue-600">{totalPRs}</div>
                    <p className="text-xs text-gray-500">{totalMerged} merged</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-gray-600">Average Merge Rate</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-green-600">{avgMergeRate.toFixed(1)}%</div>
                    <Progress value={avgMergeRate} className="mt-2" />
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-gray-600">Issues Closed</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-purple-600">{totalIssuesClosed}</div>
                    <p className="text-xs text-gray-500">Total resolved</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-gray-600">PRs Reviewed</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-orange-600">{totalReviews}</div>
                    <p className="text-xs text-gray-500">Total reviews</p>
                  </CardContent>
                </Card>
              </>
            );
          })()}
        </div>

        {/* Maintainers List */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredMaintainers.map((maintainer) => {
            const mergeRate = maintainer.stats.prsCreated > 0 
              ? (maintainer.stats.prsMerged / maintainer.stats.prsCreated) * 100 
              : 0;

            return (
              <Card 
                key={maintainer.id} 
                className="cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => handleMaintainerClick(maintainer.id)}
              >
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Avatar className="w-12 h-12">
                        <AvatarImage src={maintainer.avatar} alt={maintainer.name} />
                        <AvatarFallback>
                          {maintainer.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <CardTitle className="text-lg">{maintainer.name}</CardTitle>
                        <p className="text-sm text-gray-600">@{maintainer.username}</p>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <Badge variant={maintainer.role === 'lead_maintainer' ? 'default' : 'secondary'}>
                        {maintainer.role === 'lead_maintainer' ? 'Lead' : 'Maintainer'}
                      </Badge>
                      <Badge variant={maintainer.isActive ? 'outline' : 'secondary'} className={
                        maintainer.isActive ? 'border-green-200 text-green-800' : 'bg-gray-100 text-gray-600'
                      }>
                        {maintainer.isActive ? 'Active' : 'Inactive'}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600">{mergeRate.toFixed(1)}%</div>
                      <p className="text-xs text-gray-500">PR Merge Rate</p>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600">{maintainer.stats.issuesClosed}</div>
                      <p className="text-xs text-gray-500">Issues Closed</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-2 text-sm text-gray-600 mb-4">
                    <div className="text-center">
                      <div className="font-semibold">{maintainer.stats.prsCreated}</div>
                      <div className="text-xs">PRs Created</div>
                    </div>
                    <div className="text-center">
                      <div className="font-semibold">{maintainer.stats.prsReviewed}</div>
                      <div className="text-xs">PRs Reviewed</div>
                    </div>
                    <div className="text-center">
                      <div className="font-semibold">{maintainer.stats.repositoriesManaged}</div>
                      <div className="text-xs">Repos Managed</div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>Joined {formatDate(maintainer.joinedAt)}</span>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="sm" asChild onClick={(e) => e.stopPropagation()}>
                        <a href={`mailto:${maintainer.email}`} title={`Email ${maintainer.name}`}>
                          <Mail className="w-3 h-3" />
                        </a>
                      </Button>
                      <Button variant="ghost" size="sm" asChild onClick={(e) => e.stopPropagation()}>
                        <a href={`https://github.com/${maintainer.username}`} target="_blank" rel="noopener noreferrer" title={`View ${maintainer.name}'s GitHub profile`}>
                          <Github className="w-3 h-3" />
                        </a>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {filteredMaintainers.length === 0 && (
          <div className="text-center py-12">
            <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">No maintainers found matching your search.</p>
          </div>
        )}
      </div>
    </div>
  );
}