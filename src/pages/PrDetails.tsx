import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

// Improved dummy PR data for demonstration
const dummyPr: PrData = {
  id: '87',
  title: 'Implement Dark Mode & Improve Accessibility',
  author: 'Priya Sharma',
  description: `- Added dark mode toggle with smooth transitions.
- Improved color contrast for better accessibility.
- Updated all buttons and inputs for keyboard navigation.
- Fixed minor layout bugs on mobile devices.
- Enhanced documentation for theme usage.

**Reviewers:**  
@Abhishek-Verma @DHRUV-KUMAR

**Linked Issue:**  
#145`,
  status: 'Open',
  createdAt: '2025-10-05T18:45:00Z',
};

interface PrData {
  id: string;
  title: string;
  author: string;
  description: string;
  status: string;
  createdAt: string;
}

const statusColors: Record<string, string> = {
  Open: 'bg-green-100 text-green-800',
  Merged: 'bg-purple-100 text-purple-800',
  Closed: 'bg-red-100 text-red-800',
};

// Dummy PR journey data
const prJourney: Array<{
  type: 'commit' | 'comment' | 'review' | 'opened' | 'merged' | 'closed';
  author: string;
  message?: string;
  hash?: string;
  status?: string;
  date: string;
}> = [
  {
    type: 'opened',
    author: 'Priya Sharma',
    message: 'opened this pull request',
    date: '2025-10-05T18:45:00Z',
  },
  {
    type: 'commit',
    author: 'Priya Sharma',
    message: 'feat: add dark mode toggle and transitions',
    hash: 'a1b2c3d',
    date: '2025-10-05T18:50:00Z',
  },
  {
    type: 'commit',
    author: 'Priya Sharma',
    message: 'fix: improve color contrast for accessibility',
    hash: 'd4e5f6g',
    date: '2025-10-05T19:10:00Z',
  },
  {
    type: 'comment',
    author: 'Abhishek Verma',
    message: 'Great work! Please check the mobile layout once.',
    date: '2025-10-05T19:30:00Z',
  },
  {
    type: 'commit',
    author: 'Priya Sharma',
    message: 'fix: mobile layout bugs',
    hash: 'h7i8j9k',
    date: '2025-10-05T20:00:00Z',
  },
  {
    type: 'review',
    author: 'DHRUV KUMAR',
    status: 'APPROVED',
    message: 'Looks good to me!',
    date: '2025-10-05T20:30:00Z',
  },
  {
    type: 'comment',
    author: 'Adityaraj Pal',
    message: 'Can you update the documentation for theme usage?',
    date: '2025-10-05T20:45:00Z',
  },
  {
    type: 'commit',
    author: 'Priya Sharma',
    message: 'docs: enhance documentation for theme usage',
    hash: 'l0m1n2o',
    date: '2025-10-05T21:00:00Z',
  },
];

const PrDetails = () => {
  const { prId } = useParams<{ prId: string }>();
  const [pr, setPr] = useState<PrData | null>(null);

  useEffect(() => {
    // Simulate API call delay
    setTimeout(() => {
      setPr(dummyPr);
    }, 500);
  }, [prId]);

  if (!pr) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-lg text-gray-600 animate-pulse">Loading PR details...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-0">
      {/* PR Details Header */}
      <div className="w-full mx-auto border-b border-gray-200 pb-6 px-0">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 px-6">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-green-700 mb-2">
              {pr.title}
            </h1>
            <div className="flex flex-wrap items-center gap-2 text-sm text-gray-600">
              <span className="font-mono bg-green-100 text-green-800 px-2 py-0.5 rounded">PR #{pr.id}</span>
              <span>•</span>
              <span>
                Opened by <span className="font-semibold text-green-800">{pr.author}</span>
              </span>
              <span>•</span>
              <span>
                {new Date(pr.createdAt).toLocaleString(undefined, {
                  dateStyle: 'medium',
                  timeStyle: 'short',
                })}
              </span>
            </div>
          </div>
          <span
            className={`px-5 py-2 rounded-full text-sm font-semibold shadow-sm ${statusColors[pr.status] || 'bg-gray-100 text-gray-700'}`}
          >
            {pr.status}
          </span>
        </div>
      </div>
      {/* PR Description */}
      <div className="w-full px-0">
        <div className="border-b border-gray-200 py-8 px-6">
          <ul className="list-disc ml-6 space-y-2 text-base text-gray-800">
            {pr.description
              .split('\n')
              .filter(line => line.startsWith('- '))
              .map((line, idx) => (
                <li key={idx}>{line.replace('- ', '')}</li>
              ))}
          </ul>
          <div className="mt-6 space-y-2 text-base">
            {pr.description.split('\n').map((line, idx) => {
              if (line.startsWith('**Reviewers:**')) {
                return (
                  <div key={idx} className="w-30 items-center gap-2 border-l-4 border-green-300 pl-3 py-1 bg-green-100">
                    <span className="font-semibold text-green-700">Reviewers:</span>
                    <span className="text-green-900">{line.replace('**Reviewers:**  ', '')}</span>
                  </div>
                );
              }
              if (line.startsWith('**Linked Issue:**')) {
                return (
                  <div key={idx} className="w-45 flex items-center gap-2 border-l-4 border-blue-300 pl-3 py-1 bg-blue-50">
                    <span className="font-semibold text-blue-700">Linked Issue:</span>
                    <span className="text-blue-700">{line.replace('**Linked Issue:**  ', '')}</span>
                  </div>
                );
              }
              if (line.trim() === '---') {
                return <hr key={idx} className="my-4 border-gray-200" />;
              }
              if (
                !line.startsWith('- ') &&
                !line.startsWith('**Reviewers:**') &&
                !line.startsWith('**Linked Issue:**') &&
                line.trim() !== '' &&
                line.trim() !== '---'
              ) {
                return (
                  <p key={idx} className="text-gray-700">
                    {line}
                  </p>
                );
              }
              return null;
            })}
          </div>
        </div>
      </div>
      {/* PR Journey Timeline */}
      <div className="w-full px-0">
        <div className="py-8 px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-green-700 mb-6">Pull Request Journey</h2>
          <ol className="relative border-l-2 border-gray-300 ml-4">
            {prJourney.map((event, idx) => (
              <li key={idx} className="mb-8 ml-6">
                <span className="absolute -left-3 flex items-center justify-center w-6 h-6 bg-white border-2 border-green-400 rounded-full">
                  {event.type === 'commit' && (
                    <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 2a2 2 0 012 2v2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2v2a2 2 0 01-2 2H8a2 2 0 01-2-2v-2H4a2 2 0 01-2-2V8a2 2 0 012-2h2V4a2 2 0 012-2h2zm0 2H8v2H6a1 1 0 00-1 1v2a1 1 0 001 1h2v2h2v-2h2a1 1 0 001-1V7a1 1 0 00-1-1h-2V4z"/>
                    </svg>
                  )}
                  {event.type === 'opened' && (
                    <svg className="w-4 h-4 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 2a8 8 0 100 16 8 8 0 000-16zm1 11H9v-2h2v2zm0-4H9V7h2v2z"/>
                    </svg>
                  )}
                  {event.type === 'review' && (
                    <svg className="w-4 h-4 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M18 10c0 3.866-3.582 7-8 7s-8-3.134-8-7 3.582-7 8-7 8 3.134 8 7zm-8 5c3.314 0 6-2.239 6-5s-2.686-5-6-5-6 2.239-6 5 2.686 5 6 5zm-1-7h2v4h-2V8zm0 6h2v2h-2v-2z"/>
                    </svg>
                  )}
                  {event.type === 'comment' && (
                    <svg className="w-4 h-4 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M18 10c0 3.866-3.582 7-8 7s-8-3.134-8-7 3.582-7 8-7 8 3.134 8 7zm-8 5c3.314 0 6-2.239 6-5s-2.686-5-6-5-6 2.239-6 5 2.686 5 6 5zm-1-7h2v4h-2V8zm0 6h2v2h-2v-2z"/>
                    </svg>
                  )}
                </span>
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-green-800">{event.author}</span>
                    <span className="text-xs text-gray-400">{new Date(event.date).toLocaleString(undefined, { dateStyle: 'medium', timeStyle: 'short' })}</span>
                  </div>
                  <div className="ml-1">
                    {event.type === 'commit' && (
                      <div>
                        <span className="inline-block font-mono text-xs bg-gray-100 text-gray-700 px-2 py-0.5 rounded mr-2">commit</span>
                        <span className="text-gray-800">{event.message}</span>
                        <span className="ml-2 font-mono text-xs text-blue-700">[{event.hash}]</span>
                      </div>
                    )}
                    {event.type === 'opened' && (
                      <span className="inline-block font-mono text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded mr-2">opened</span>
                    )}
                    {event.type === 'review' && (
                      <span className="inline-block font-mono text-xs bg-purple-100 text-purple-700 px-2 py-0.5 rounded mr-2">
                        review: {event.status}
                      </span>
                    )}
                    {event.type === 'comment' && (
                      <span className="inline-block font-mono text-xs bg-gray-100 text-gray-700 px-2 py-0.5 rounded mr-2">comment</span>
                    )}
                    <span className="text-gray-700">{event.message}</span>
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
};

export default PrDetails;