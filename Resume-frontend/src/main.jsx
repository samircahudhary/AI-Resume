import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { ClerkProvider } from '@clerk/clerk-react'

import ProtectedRoute from './components/ProtectedRoute.jsx'
import SignInPage from './auth/sign-in/sign-in.jsx'
import Home from './home/home.jsx'
import Dashboard from './Dashboard/dashboard.jsx'
import EditResume from './pages/EditResume.jsx'
import ResumePreviewPage from './pages/ResumePreviewPage.jsx'
import SelectTemplate from './pages/SelectTemplate.jsx'

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
  console.warn('[v0] Clerk Publishable Key not found. Add VITE_CLERK_PUBLISHABLE_KEY to your environment variables. Authentication features will be disabled.')
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/auth/sign-in/*',
    element: <SignInPage />,
  },
  // ---- Protected routes ----
  {
    path: '/dashboard',
    element: (
      <ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>
    ),
  },
  {
    path: '/select-template',
    element: (
      <ProtectedRoute>
        <SelectTemplate />
      </ProtectedRoute>
    ),
  },
  {
    path: '/resume/:id',
    element: (
      <ProtectedRoute>
        <EditResume />
      </ProtectedRoute>
    ),
  },
  {
    path: '/resume-preview/:id',
    element: (
      <ProtectedRoute>
        <ResumePreviewPage />
      </ProtectedRoute>
    ),
  },
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY || ''}>
      <RouterProvider router={router} />
    </ClerkProvider>
  </StrictMode>
)
