import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import AdminRepositories from './components/pages/AdminRepositories';
import RepoSection from './components/pages/RepoSection';

// Import pages
import Login from './pages/Login';
import AuthCallback from './pages/AuthCallback';
import ContributorOnboarding from './pages/ContributorOnboarding';
import MyRepositories from './pages/MyRepositories';
import ContributedRepositories from './pages/ContributedRepositories';
import ContributorProfilePage from './pages/ContributorProfile';
import Layout from './components/Layout';
import AdminDashboard from './pages/AdminDashboard';
import MaintainerDashboard from './pages/MaintainerDashboard';
import OrganizationDetail from './pages/OrganizationDetail';
import RepositoryDetail from './pages/RepositoryDetail';
import IssueDetail from './pages/IssueDetail';
import MaintainerOrganizationDetail from './pages/MaintainerOrganizationDetail';
import MaintainerRepositoryDetail from './pages/MaintainerRepositoryDetail';
import MaintainerIssueDetail from './pages/MaintainerIssueDetail';

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
            <Route path="/admin/repositories" element={<AdminRepositories />} />
            <Route path="/repositories/:slug" element={<RepoSection />} />
            <Route path="/auth/callback" element={<AuthCallback />} />
            
            {/* Contributor routes nested under Layout (shared navbar/layout) */}
            <Route
              element={
                <ProtectedRoute allowedRoles={['contributor']}>
                  <Layout />
                </ProtectedRoute>
              }
            >
              <Route path="/contributor/onboarding" element={<ContributorOnboarding />} />
              <Route path="/contributor/my-repos" element={<MyRepositories />} />
              <Route path="/contributor/contributed-repos" element={<ContributedRepositories />} />
              <Route path="/contributor/profile" element={<ContributorProfilePage />} />
            </Route>
            
            {/* Admin routes */}
            <Route 
              path="/admin/dashboard" 
              element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <AdminDashboard />
                  {/* <LeaderboardPage /> */}
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/admin/organization/:id" 
              element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <OrganizationDetail />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/admin/repository/:repoId" 
              element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <RepositoryDetail />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/admin/issue/:issueId" 
              element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <IssueDetail />
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
            <Route 
              path="/maintainer/organization/:id" 
              element={
                <ProtectedRoute allowedRoles={['maintainer']}>
                  <MaintainerOrganizationDetail />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/maintainer/repository/:repoId" 
              element={
                <ProtectedRoute allowedRoles={['maintainer']}>
                  <MaintainerRepositoryDetail />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/maintainer/issue/:issueId" 
              element={
                <ProtectedRoute allowedRoles={['maintainer']}>
                  <MaintainerIssueDetail />
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
