import type { User, Repository, ContributionRepository } from '../types';

// GitHub OAuth configuration
const GITHUB_CLIENT_ID = 'your_github_client_id'; // Replace with your actual client ID
const GITHUB_REDIRECT_URI = 'http://localhost:5173/auth/callback';

class GitHubService {
  private token: string | null = null;

  constructor() {
    this.token = localStorage.getItem('github_token');
  }

  // Generate GitHub OAuth URL
  getAuthURL(): string {
    const params = new URLSearchParams({
      client_id: GITHUB_CLIENT_ID,
      redirect_uri: GITHUB_REDIRECT_URI,
      scope: 'user:email,repo',
      state: Math.random().toString(36).substring(7),
    });
    return `https://github.com/login/oauth/authorize?${params.toString()}`;
  }

  // Exchange code for access token and get user data
  async authenticateUser(_code: string): Promise<User> {
    try {
      // In a real application, this should be done on your backend
      // For demo purposes, we'll simulate getting user data
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock user data - in real app, you'd exchange code for token first
      const mockUser: User = {
        id: '12345',
        login: 'demo_user',
        name: 'Demo User',
        avatar_url: 'https://avatars.githubusercontent.com/u/12345?v=4',
        email: 'demo@example.com',
        role: 'contributor' // This will be overridden by the selected role
      };
      
      // Store mock token
      this.token = 'mock_github_token_' + Date.now();
      localStorage.setItem('github_token', this.token);
      
      return mockUser;
    } catch (error) {
      console.error('Authentication failed:', error);
      throw new Error('Failed to authenticate with GitHub');
    }
  }

  // Get user's repositories
  async getUserRepositories(): Promise<Repository[]> {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Mock repositories data
      const mockRepos: Repository[] = [
        {
          id: 1,
          name: 'awesome-project',
          full_name: 'demo_user/awesome-project',
          description: 'An awesome React project for learning',
          html_url: 'https://github.com/demo_user/awesome-project',
          language: 'TypeScript',
          stargazers_count: 15,
          forks_count: 3,
          updated_at: '2024-12-01T10:00:00Z',
          owner: {
            login: 'demo_user',
            avatar_url: 'https://avatars.githubusercontent.com/u/12345?v=4'
          }
        },
        {
          id: 2,
          name: 'node-api-server',
          full_name: 'demo_user/node-api-server',
          description: 'RESTful API server built with Node.js and Express',
          html_url: 'https://github.com/demo_user/node-api-server',
          language: 'JavaScript',
          stargazers_count: 8,
          forks_count: 2,
          updated_at: '2024-11-28T14:30:00Z',
          owner: {
            login: 'demo_user',
            avatar_url: 'https://avatars.githubusercontent.com/u/12345?v=4'
          }
        },
        {
          id: 3,
          name: 'python-data-analysis',
          full_name: 'demo_user/python-data-analysis',
          description: 'Data analysis scripts and notebooks',
          html_url: 'https://github.com/demo_user/python-data-analysis',
          language: 'Python',
          stargazers_count: 22,
          forks_count: 7,
          updated_at: '2024-11-25T09:15:00Z',
          owner: {
            login: 'demo_user',
            avatar_url: 'https://avatars.githubusercontent.com/u/12345?v=4'
          }
        }
      ];
      
      return mockRepos;
    } catch (error) {
      console.error('Failed to fetch repositories:', error);
      throw new Error('Failed to fetch repositories');
    }
  }

  // Get repositories user has contributed to
  async getContributionRepositories(): Promise<ContributionRepository[]> {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock contribution repositories data
      const mockContributions: ContributionRepository[] = [
        {
          id: 101,
          name: 'open-source-project',
          full_name: 'opensource/open-source-project',
          description: 'A popular open source project',
          html_url: 'https://github.com/opensource/open-source-project',
          language: 'TypeScript',
          contributions: 12,
          last_contribution: '2024-11-30T16:20:00Z',
          owner: {
            login: 'opensource',
            avatar_url: 'https://avatars.githubusercontent.com/u/101?v=4'
          }
        },
        {
          id: 102,
          name: 'react-components',
          full_name: 'community/react-components',
          description: 'Reusable React components library',
          html_url: 'https://github.com/community/react-components',
          language: 'JavaScript',
          contributions: 8,
          last_contribution: '2024-11-22T11:45:00Z',
          owner: {
            login: 'community',
            avatar_url: 'https://avatars.githubusercontent.com/u/102?v=4'
          }
        },
        {
          id: 103,
          name: 'documentation-site',
          full_name: 'docs/documentation-site',
          description: 'Documentation website built with Next.js',
          html_url: 'https://github.com/docs/documentation-site',
          language: 'TypeScript',
          contributions: 5,
          last_contribution: '2024-11-18T08:30:00Z',
          owner: {
            login: 'docs',
            avatar_url: 'https://avatars.githubusercontent.com/u/103?v=4'
          }
        }
      ];
      
      return mockContributions;
    } catch (error) {
      console.error('Failed to fetch contribution repositories:', error);
      throw new Error('Failed to fetch contribution repositories');
    }
  }

  // Search repositories
  async searchRepositories(query: string): Promise<Repository[]> {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 600));
      
      // Mock search results based on query
      const mockSearchResults: Repository[] = [
        {
          id: 201,
          name: `${query}-search-result-1`,
          full_name: `user/${query}-search-result-1`,
          description: `Search result for ${query} - first result`,
          html_url: `https://github.com/user/${query}-search-result-1`,
          language: 'TypeScript',
          stargazers_count: 156,
          forks_count: 23,
          updated_at: '2024-12-01T12:00:00Z',
          owner: {
            login: 'user',
            avatar_url: 'https://avatars.githubusercontent.com/u/201?v=4'
          }
        },
        {
          id: 202,
          name: `${query}-library`,
          full_name: `organization/${query}-library`,
          description: `A library for ${query} functionality`,
          html_url: `https://github.com/organization/${query}-library`,
          language: 'JavaScript',
          stargazers_count: 89,
          forks_count: 12,
          updated_at: '2024-11-29T15:30:00Z',
          owner: {
            login: 'organization',
            avatar_url: 'https://avatars.githubusercontent.com/u/202?v=4'
          }
        }
      ];
      
      return mockSearchResults;
    } catch (error) {
      console.error('Failed to search repositories:', error);
      throw new Error('Failed to search repositories');
    }
  }
}

export const githubService = new GitHubService();