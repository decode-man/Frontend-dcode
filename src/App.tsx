import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';

// Import pages
import Login from './pages/Login';
import AuthCallback from './pages/AuthCallback';
import ContributorOnboarding from './pages/ContributorOnboarding';
import MyRepositories from './pages/MyRepositories';
import ContributedRepositories from './pages/ContributedRepositories';
import ContributorProfilePage from './pages/ContributorProfile';
import AdminDashboard from './pages/AdminDashboard';
import MaintainerDashboard from './pages/MaintainerDashboard';

// Protected Route component
const ProtectedRoute: React.FC<{ children: React.ReactNode; allowedRoles?: string[] }> = ({ 
  children, 
  allowedRoles 
}) => {
  const { isAuthenticated, user } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  if (allowedRoles && user && !allowedRoles.includes(user.role)) {
    return <Navigate to="/login" replace />;
  }
  
  return <>{children}</>;
};

// Public Route component (redirect to appropriate dashboard if already logged in)
const PublicRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated, user } = useAuth();
  
  if (isAuthenticated && user) {
    if (user.role === 'contributor') {
      return <Navigate to="/contributor/onboarding" replace />;
    } else {
      return <Navigate to={`/${user.role}/dashboard`} replace />;
    }
  }
  
  return <>{children}</>;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Routes>
            {/* Public routes */}
            <Route 
              path="/login" 
              element={
                <PublicRoute>
                  <Login />
                </PublicRoute>
              } 
            />
            <Route path="/auth/callback" element={<AuthCallback />} />
            
            {/* Contributor routes */}
            <Route 
              path="/contributor/onboarding" 
              element={
                <ProtectedRoute allowedRoles={['contributor']}>
                  <ContributorOnboarding />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/contributor/my-repos" 
              element={
                <ProtectedRoute allowedRoles={['contributor']}>
                  <MyRepositories />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/contributor/profile" 
              element={
                <ProtectedRoute allowedRoles={['contributor']}>
                  <ContributorProfilePage />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/contributor/contributed-repos" 
              element={
                <ProtectedRoute allowedRoles={['contributor']}>
                  <ContributedRepositories />
                </ProtectedRoute>
              } 
            />
            
            {/* Admin routes */}
            <Route 
              path="/admin/dashboard" 
              element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <AdminDashboard />
                </ProtectedRoute>
              } 
            />
            
            {/* Maintainer routes */}
            <Route 
              path="/maintainer/dashboard" 
              element={
                <ProtectedRoute allowedRoles={['maintainer']}>
                  <MaintainerDashboard />
                </ProtectedRoute>
              } 
            />
            
            {/* Default redirect */}
            <Route path="/" element={<Navigate to="/login" replace />} />
            
            {/* Catch all route */}
            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
