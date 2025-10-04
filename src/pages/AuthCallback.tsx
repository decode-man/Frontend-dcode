import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Card, CardContent } from '../components/ui/card';
import { Spinner } from '../components/ui/spinner';
import { useAuth } from '../context/AuthContext';
import type { UserRole } from '../types';

const AuthCallback: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { login } = useAuth();

  useEffect(() => {
    const handleCallback = async () => {
      const code = searchParams.get('code');
      const error = searchParams.get('error');
      
      if (error) {
        console.error('OAuth error:', error);
        navigate('/login?error=oauth_failed');
        return;
      }

      if (!code) {
        console.error('No authorization code received');
        navigate('/login?error=no_code');
        return;
      }

      try {
        // Get the role from localStorage or default to contributor
        const selectedRole = (localStorage.getItem('selected_role') as UserRole) || 'contributor';
        localStorage.removeItem('selected_role');
        
        await login(code, selectedRole);
        
        // Navigate based on role
        if (selectedRole === 'contributor') {
          navigate('/contributor/onboarding');
        } else {
          navigate(`/${selectedRole}/dashboard`);
        }
      } catch (error) {
        console.error('Login failed:', error);
        navigate('/login?error=login_failed');
      }
    };

    handleCallback();
  }, [searchParams, navigate, login]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
      <Card className="w-full max-w-md">
        <CardContent className="pt-6">
          <div className="flex flex-col items-center gap-4">
            <Spinner className="w-8 h-8" />
            <div className="text-center">
              <h2 className="text-lg font-semibold mb-2">Signing you in...</h2>
              <p className="text-sm text-gray-600">
                Please wait while we complete your authentication with GitHub.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AuthCallback;