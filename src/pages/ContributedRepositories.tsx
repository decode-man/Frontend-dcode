import React, { useState, useEffect } from 'react';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Input } from '../components/ui/input';
import { Skeleton } from '../components/ui/skeleton';

import { 
  Search, 
  ExternalLink, 
  RefreshCw,
  GitBranch,
  Clock
} from 'lucide-react';

import { githubService } from '../services/github';
import type { Repository, ContributionRepository } from '../types';

const ContributedRepositories: React.FC = () => {
  const [contributedRepos, setContributedRepos] = useState<ContributionRepository[]>([]);
  const [searchResults, setSearchResults] = useState<Repository[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoadingContributions, setIsLoadingContributions] = useState(true);
  const [isSearching, setIsSearching] = useState(false);
  const [error, setError] = useState<string | null>(null);


  const fetchContributedRepositories = async () => {
    try {
      setIsLoadingContributions(true);
      setError(null);
      const repos = await githubService.getContributionRepositories();
      setContributedRepos(repos);
    } catch (err) {
      setError('Failed to fetch contributed repositories. Please try again.');
      console.error('Error fetching contributed repositories:', err);
    } finally {
      setIsLoadingContributions(false);
    }
  };

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      setSearchResults([]);
      return;
    }

    try {
      setIsSearching(true);
      const results = await githubService.searchRepositories(searchQuery);
      setSearchResults(results);
    } catch (err) {
      console.error('Search failed:', err);
    } finally {
      setIsSearching(false);
    }
  };

  useEffect(() => {
    fetchContributedRepositories();
  }, []);

  useEffect(() => {
    const delayedSearch = setTimeout(() => {
      if (searchQuery) {
        handleSearch();
      } else {
        setSearchResults([]);
      }
    }, 500);

    return () => clearTimeout(delayedSearch);
  }, [searchQuery]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getLanguageColor = (language: string | null) => {
    const colors: { [key: string]: string } = {
      JavaScript: 'bg-yellow-500',
      TypeScript: 'bg-blue-600',
      Python: 'bg-green-600',
      Java: 'bg-red-500',
      'C++': 'bg-pink-600',
      Go: 'bg-cyan-500',
      Rust: 'bg-orange-600',
      default: 'bg-gray-500'
    };
    return colors[language || 'default'] || colors.default;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">

      {/* Main Content */}
      <div className="max-w-6xl mx-auto p-6 space-y-8">
        {/* Search Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Search className="w-5 h-5" />
              Search Repositories
            </CardTitle>
            <CardDescription>
              Find new repositories to contribute to
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex gap-2">
              <Input
                placeholder="Search for repositories..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1"
              />
              <Button
                onClick={handleSearch}
                disabled={isSearching || !searchQuery.trim()}
              >
                {isSearching ? (
                  <RefreshCw className="w-4 h-4 animate-spin" />
                ) : (
                  <Search className="w-4 h-4" />
                )}
              </Button>
            </div>

            {/* Search Results */}
            {searchResults.length > 0 && (
              <div className="mt-6">
                <h3 className="text-lg font-semibold mb-4">Search Results</h3>
                <div className="grid gap-4">
                  {searchResults.map((repo) => (
                    <Card key={`search-${repo.id}`} className="border-blue-200">
                      <CardHeader className="pb-3">
                        <div className="flex items-start justify-between">
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <h4 className="font-semibold">{repo.name}</h4>
                              <Badge variant="outline" className="text-xs">
                                {repo.owner.login}
                              </Badge>
                            </div>
                            {repo.description && (
                              <p className="text-sm text-gray-600">{repo.description}</p>
                            )}
                          </div>
                          <Button variant="outline" size="sm" asChild>
                            <a href={repo.html_url} target="_blank" rel="noopener noreferrer" title={`View ${repo.name} on GitHub`}>
                              <ExternalLink className="w-4 h-4" />
                            </a>
                          </Button>
                        </div>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <div className="flex items-center gap-4 text-sm text-gray-600">
                          {repo.language && (
                            <div className="flex items-center gap-2">
                              <div className={`w-3 h-3 rounded-full ${getLanguageColor(repo.language)}`} />
                              <span>{repo.language}</span>
                            </div>
                          )}
                          <span>⭐ {repo.stargazers_count}</span>
                          <span>🍴 {repo.forks_count}</span>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Previous Contributions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <GitBranch className="w-5 h-5" />
              Previous Contributions
            </CardTitle>
            <CardDescription>
              Repositories you've contributed to before
            </CardDescription>
          </CardHeader>
          <CardContent>
            {error && (
              <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                <div className="flex items-center gap-2 text-red-700">
                  <span>{error}</span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={fetchContributedRepositories}
                    className="ml-auto"
                  >
                    Try Again
                  </Button>
                </div>
              </div>
            )}

            <div className="grid gap-4">
              {isLoadingContributions ? (
                // Loading skeletons
                Array.from({ length: 3 }).map((_, index) => (
                  <Card key={index} className="border-gray-200">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="space-y-2 flex-1">
                          <Skeleton className="h-5 w-1/3" />
                          <Skeleton className="h-4 w-2/3" />
                        </div>
                        <Skeleton className="h-8 w-16" />
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center gap-4">
                        <Skeleton className="h-4 w-20" />
                        <Skeleton className="h-4 w-16" />
                        <Skeleton className="h-4 w-24" />
                      </div>
                    </CardContent>
                  </Card>
                ))
              ) : contributedRepos.length === 0 ? (
                <div className="text-center py-8">
                  <GitBranch className="w-12 h-12 mx-auto text-gray-400 mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No contributions found</h3>
                  <p className="text-gray-600">
                    Start contributing to open source projects to see them here!
                  </p>
                </div>
              ) : (
                contributedRepos.map((repo) => (
                  <Card key={repo.id} className="hover:shadow-md transition-shadow border-green-200">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <h4 className="font-semibold">{repo.name}</h4>
                            <Badge variant="outline" className="text-xs">
                              {repo.owner.login}
                            </Badge>
                            <Badge variant="secondary" className="text-xs bg-green-100 text-green-800">
                              {repo.contributions} contributions
                            </Badge>
                          </div>
                          {repo.description && (
                            <p className="text-gray-600">{repo.description}</p>
                          )}
                        </div>
                        <Button variant="outline" size="sm" asChild>
                          <a href={repo.html_url} target="_blank" rel="noopener noreferrer" title={`View ${repo.name} on GitHub`}>
                            <ExternalLink className="w-4 h-4" />
                          </a>
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center gap-6 text-sm text-gray-600">
                        {repo.language && (
                          <div className="flex items-center gap-2">
                            <div className={`w-3 h-3 rounded-full ${getLanguageColor(repo.language)}`} />
                            <span>{repo.language}</span>
                          </div>
                        )}
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          <span>Last contribution: {formatDate(repo.last_contribution)}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ContributedRepositories;