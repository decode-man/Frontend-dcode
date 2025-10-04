import React from 'react';
import { useLocation } from 'react-router-dom';

const RepoSection = () => {
  const location = useLocation();
  const projectName = location.state?.projectName || 'habit-tracker-redux';

  // Dummy data for issues
  const issues = [
    {
      id: '4KZcU8tD9',
      status: 'Ready',
      time: '23s (73d ago)',
      repo: projectName,
      branch: 'main',
      commitId: 'c37b8bb',
      message: 'polished features',
      date: 'Jul 24 by mxm-1x',
    },
    {
      id: '68SZ51kvm',
      status: 'Ready',
      time: '12s (103d ago)',
      repo: projectName,
      branch: 'main',
      commitId: '7eebaf0',
      message: 'Start repository',
      date: 'Jun 23 by mxm-1x',
    },
    {
      id: '5oVuZGJDB',
      status: 'Ready',
      time: '42s (138d ago)',
      repo: projectName,
      branch: 'main',
      commitId: '71430e4',
      message: 'footer',
      date: 'May 19 by mxm-1x',
    },
    {
      id: 'DFiHW8pru',
      status: 'Ready',
      time: '40s (138d ago)',
      repo: projectName,
      branch: 'main',
      commitId: '151a6cb',
      message: 'changed the favicon to...',
      date: 'May 19 by mxm-1x',
    },
    {
      id: '5TaBh3oYW',
      status: 'Ready',
      time: '42s (139d ago)',
      repo: projectName,
      branch: 'main',
      commitId: '34be07b',
      message: 'added tool tip',
      date: 'May 18 by mxm-1x',
    },
    {
      id: 'DSofBAhfA',
      status: 'Ready',
      time: '40s (139d ago)',
      repo: projectName,
      branch: 'main',
      commitId: '6f39448',
      message: 'api changes',
      date: 'May 18 by mxm-1x',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b px-6 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <h1 className="text-2xl font-bold">{projectName}</h1>
        </div>
        <div className="flex items-center space-x-4">
          <button className="px-4 py-2 border rounded-md flex items-center space-x-2">
            🔗 <span>Repository</span>
          </button>
          <button className="px-4 py-2 border rounded-md flex items-center space-x-2">
            <span>Usage</span>
          </button>
          <button className="px-4 py-2 border rounded-md flex items-center space-x-2">
            <span>Domains</span>
          </button>
          <button className="px-4 py-2 bg-black text-white rounded-md flex items-center space-x-2">
            <span>Visit</span> ▼
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-col md:flex-row p-6 space-y-6 md:space-y-0 md:space-x-6">
        {/* Issues Section */}
        <div className="w-full md:w-1/2 bg-white rounded-lg border p-4 overflow-hidden">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Issues</h2>
            <div className="flex items-center space-x-4">
              <input
                type="text"
                placeholder="Select Date Range"
                className="border rounded-md px-3 py-2 text-sm w-40"
              />
              <input
                type="text"
                placeholder="All Authors..."
                className="border rounded-md px-3 py-2 text-sm w-32"
              />
              <input
                type="text"
                placeholder="All Environments"
                className="border rounded-md px-3 py-2 text-sm w-32"
              />
              <div className="flex items-center space-x-2">
                <span className="text-sm">Status</span>
                <span className="text-sm font-medium">5/6</span>
              </div>
            </div>
          </div>

          {/* Issues List */}
          <div className="space-y-4 max-h-[calc(100vh-200px)] overflow-y-auto">
            {issues.map((issue, index) => (
              <div key={index} className="border-b pb-4">
                <div className="flex justify-between items-start">
                  <div className="flex items-center space-x-4 overflow-x-auto">
                    <div className="text-sm font-medium min-w-[80px]">{issue.id}</div>
                    <div className="flex items-center space-x-2 min-w-[80px]">
                      <span className="text-green-500 text-xs">●</span>
                      <span className="text-sm">{issue.status}</span>
                    </div>
                    <div className="flex items-center space-x-2 min-w-[100px]">
                      <span className="text-gray-500 text-sm">{issue.time}</span>
                    </div>
                    <div className="flex items-center space-x-2 min-w-[150px]">
                      <img
                        src="https://via.placeholder.com/20"
                        alt="repo-icon"
                        className="w-5 h-5"
                      />
                      <span className="text-sm font-medium truncate">{issue.repo}</span>
                    </div>
                    <div className="flex items-center space-x-2 min-w-[100px]">
                      <span className="text-gray-500 text-sm">🌿 {issue.branch}</span>
                    </div>
                    <div className="flex items-center space-x-2 min-w-[120px]">
                      <span className="text-gray-500 text-sm">○ {issue.commitId}</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 min-w-[120px]">
                    <span className="text-gray-500 text-sm">{issue.date}</span>
                    <img
                      src="https://via.placeholder.com/20"
                      alt="user-icon"
                      className="w-5 h-5"
                    />
                  </div>
                </div>
                <div className="mt-2 pl-10 text-sm text-gray-700 truncate">
                  {issue.message}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Empty Second Section */}
        <div className="w-full md:w-1/2 bg-white rounded-lg border p-4">
          {/* Leave this empty for now */}
        </div>
      </div>
    </div>
  );
};

export default RepoSection;