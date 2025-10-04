export type UserRole = 'admin' | 'maintainer' | 'contributor';

export interface User {
  id: string;
  login: string;
  name: string;
  avatar_url: string;
  email: string;
  role: UserRole;
}

export interface Repository {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  updated_at: string;
  owner: {
    login: string;
    avatar_url: string;
  };
}

export interface ContributionRepository {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  language: string | null;
  contributions: number;
  last_contribution: string;
  owner: {
    login: string;
    avatar_url: string;
  };
}

export interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (code: string, role: UserRole) => Promise<void>;
  logout: () => void;
}