# DCODE Frontend - Login System Documentation

## Overview

This is a React application built with TypeScript, Vite, and shadcn/ui components that implements a comprehensive login system with role-based access control.

## Features

### Authentication System
- **Role Selection**: Users can choose from 3 roles:
  - **Admin**: Full system access and management
  - **Maintainer**: Project oversight and maintenance  
  - **Contributor**: Contribute to open source projects

- **GitHub OAuth Integration**: 
  - Real GitHub OAuth flow (requires setup)
  - Demo mode with mock authentication for development

### Contributor Flow
After logging in as a contributor, users go through an onboarding process:

1. **Experience Selection**: 
   - "I have contributed before" → Shows contributed repositories page
   - "I haven't contributed before" → Shows personal repositories page

2. **Contributed Repositories Page**:
   - Search bar for finding new repositories
   - List of previous contributions with stats
   - Real-time search with debouncing

3. **My Repositories Page**:
   - Display user's personal GitHub repositories
   - Repository stats (stars, forks, language, last updated)
   - Links to GitHub repositories

### Admin & Maintainer Dashboards
- Placeholder dashboards with role-specific UI
- Statistics and metrics display
- Role-based access control

## Tech Stack

- **React 19** with TypeScript
- **Vite** for build tooling  
- **React Router DOM** for routing
- **shadcn/ui** components
- **Tailwind CSS** for styling
- **Lucide React** for icons

## Project Structure

```
src/
├── components/ui/          # shadcn/ui components
├── context/               # React context providers
│   └── AuthContext.tsx    # Authentication state management
├── pages/                 # Application pages
│   ├── Login.tsx          # Main login page with role selection
│   ├── AuthCallback.tsx   # OAuth callback handler
│   ├── ContributorOnboarding.tsx
│   ├── MyRepositories.tsx
│   ├── ContributedRepositories.tsx
│   ├── AdminDashboard.tsx
│   └── MaintainerDashboard.tsx
├── services/              # API services
│   └── github.ts          # GitHub API service with mock data
├── types/                 # TypeScript type definitions
│   └── index.ts           # All application types
└── App.tsx               # Main app with routing setup
```

## Setup Instructions

1. **Clone and Install**:
   ```bash
   npm install
   ```

2. **Start Development Server**:
   ```bash
   npm run dev
   ```

3. **GitHub OAuth Setup** (Optional):
   - Create a GitHub OAuth App
   - Update `GITHUB_CLIENT_ID` in `src/services/github.ts`
   - Set redirect URI to `http://localhost:5173/auth/callback`

## Features Implementation Status

### ✅ Completed
- Role-based login system
- Protected routing
- Contributor onboarding flow
- Mock GitHub API integration
- Repository display pages
- Search functionality
- Responsive UI design
- TypeScript types and interfaces

### 🔄 Demo Mode Features
- Mock user authentication
- Dummy repository data
- Simulated API calls with loading states
- Search with mock results

### 🚧 Ready for Real API Integration
The application is structured to easily plug in real APIs:

- `src/services/github.ts` - Replace mock functions with real GitHub API calls
- `src/context/AuthContext.tsx` - Update authentication flow
- Environment variables for configuration

## User Flow

1. **Landing** → Login page with role selection
2. **Role Selection** → Choose Admin, Maintainer, or Contributor
3. **GitHub Login** → OAuth authentication (or demo mode)
4. **Role-based Redirect**:
   - **Admin** → Admin Dashboard
   - **Maintainer** → Maintainer Dashboard  
   - **Contributor** → Onboarding page

### Contributor Specific Flow
5. **Onboarding** → Experience level selection
6. **Based on Selection**:
   - **Experienced** → Contributed repos page with search
   - **New** → Personal repositories page

## API Integration Points

When ready to integrate real APIs, update these areas:

1. **Authentication**: `src/services/github.ts` - `authenticateUser()`
2. **User Repos**: `src/services/github.ts` - `getUserRepositories()`  
3. **Contributions**: `src/services/github.ts` - `getContributionRepositories()`
4. **Search**: `src/services/github.ts` - `searchRepositories()`

## Development

- All components use shadcn/ui for consistent styling
- TypeScript for type safety
- Responsive design with Tailwind CSS
- Error handling and loading states
- Accessibility considerations (ARIA labels, keyboard navigation)

## Next Steps

1. Implement real GitHub OAuth
2. Connect to actual GitHub API
3. Add admin and maintainer specific features
4. Implement real contribution tracking
5. Add more detailed repository information
6. Implement project matching for contributors

The application is now ready for development with a solid foundation and clear structure for adding real functionality.