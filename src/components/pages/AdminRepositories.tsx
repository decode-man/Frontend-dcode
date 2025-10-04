import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Search, ExternalLink, RefreshCw, MoreVertical } from 'lucide-react';
import logo from '../../assets/project-logo.png';

const AdminRepositories = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const allProjects = [
    { name: "habit-tracker-redux", description: "polished features", date: "Jul 24 on main" },
    { name: "cafe-design", description: "Start repository", date: "Jun 23 on main" },
    { name: "portfolio-msm", description: "changed few error", date: "Apr 22 on main" },
    { name: "get-notey", description: "footer", date: "May 19 on main" },
    { name: "v0-homeopathy-course-website", description: "Open v0", date: "Jun 6" },
    { name: "v0-next-js-meal-planner", description: "Open v0", date: "Jun 6" },
    { name: "v0-name-to-database-atbzy7...", description: "Open v0", date: "Jun 6" },
  ];

  const filteredProjects = allProjects.filter(
    (project) =>
      project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleProjectClick = (projectName: any) => {
    const projectSlug = projectName.replace(/\s+/g, '-').toLowerCase();
    navigate(`/repositories/${projectSlug}`, { state: { projectName } });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Search Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Search className="w-5 h-5" />
              Search Repositories
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-2">
              <Input
                placeholder="Search Repositories..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1"
              />
              <Button>
                <Search className="w-4 h-4" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Projects Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              Repositories
            </CardTitle>
          </CardHeader>
          <CardContent>
            {filteredProjects.length > 0 ? (
              <div className="space-y-4">
                {filteredProjects.map((project, index) => (
                  <Card
                    key={index}
                    className="border-gray-200 cursor-pointer hover:shadow-md transition-shadow"
                    onClick={() => handleProjectClick(project.name)}
                  >
                    <CardContent className="p-4">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center space-x-4">
                          <div className="w-8 h-8 rounded">
                            <img src={logo} alt="Logo" className="w-full h-full object-contain" />
                          </div>
                          <div>
                            <p className="font-medium">{project.name}</p>
                            <p className="text-sm text-gray-500">{project.description}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <p className="text-sm text-gray-500">{project.date}</p>
                          <Button variant="outline" size="sm" onClick={(e) => e.stopPropagation()}>
                            <ExternalLink className="w-4 h-4" />
                          </Button>
                          <Button variant="outline" size="sm" onClick={(e) => e.stopPropagation()}>
                            <RefreshCw className="w-4 h-4" />
                          </Button>
                          <Button variant="outline" size="sm" onClick={(e) => e.stopPropagation()}>
                            <MoreVertical className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <p className="text-center text-gray-500 py-4">No projects found.</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminRepositories;
