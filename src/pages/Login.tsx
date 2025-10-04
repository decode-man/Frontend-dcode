import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Github } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { githubService } from '../services/github';
import type { UserRole } from '../types';

const Login: React.FC = () => {
  const [selectedRole, setSelectedRole] = useState<UserRole>('contributor');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const roles: { value: UserRole; label: string; description: string }[] = [
    {
      value: 'admin',
      label: 'Admin',
      description: 'Full system access and management'
    },
    {
      value: 'maintainer',
      label: 'Maintainer',
      description: 'Project oversight and maintenance'
    },
    {
      value: 'contributor',
      label: 'Contributor',
      description: 'Contribute to open source projects'
    }
  ];

  const handleGitHubLogin = async () => {
    setIsLoading(true);
    try {
      // In a real application, redirect to GitHub OAuth
      // For demo, simulate successful auth
      const mockCode = 'demo_auth_code_' + Date.now();
      await login(mockCode, selectedRole);
      
      // Navigate based on role
      if (selectedRole === 'contributor') {
        navigate('/contributor/onboarding');
      } else {
        // For admin and maintainer, navigate to their respective dashboards
        navigate(`/${selectedRole}/dashboard`);
      }
    } catch (error) {
      console.error('Login failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRealGitHubLogin = () => {
    // For real GitHub OAuth integration
    const authUrl = githubService.getAuthURL();
    window.location.href = authUrl;
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">Welcome to DCODE</CardTitle>
          <CardDescription>
            Choose your role and sign in with GitHub to get started
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Role Selection */}
          <div className="space-y-3">
            <label className="text-sm font-medium">Select your role:</label>
            <div className="grid gap-2">
              {roles.map((role) => (
                <div
                  key={role.value}
                  className={`p-3 border rounded-lg cursor-pointer transition-all ${
                    selectedRole === role.value
                      ? 'border-primary bg-primary/5'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => setSelectedRole(role.value)}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{role.label}</span>
                        {selectedRole === role.value && (
                          <Badge variant="default" className="text-xs">
                            Selected
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-gray-600 mt-1">
                        {role.description}
                      </p>
                    </div>
                    <div className={`w-4 h-4 rounded-full border-2 ${
                      selectedRole === role.value
                        ? 'border-primary bg-primary'
                        : 'border-gray-300'
                    }`} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* GitHub Login Button */}
          <div className="space-y-4">
            <Button
              onClick={handleGitHubLogin}
              disabled={isLoading}
              className="w-full"
              size="lg"
            >
              <Github className="w-5 h-5 mr-2" />
              {isLoading ? 'Signing in...' : 'Continue with GitHub'}
            </Button>
            
            <div className="text-center">
              <Button
                variant="outline"
                onClick={handleRealGitHubLogin}
                className="text-sm"
              >
                Use Real GitHub OAuth
              </Button>
            </div>
          </div>

          <p className="text-xs text-gray-500 text-center">
            By continuing, you agree to our Terms of Service and Privacy Policy
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;