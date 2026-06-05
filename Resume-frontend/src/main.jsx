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

function MissingKeyPage() {
  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center', 
      height: '100vh',
      fontFamily: 'system-ui, -apple-system, sans-serif',
      padding: '20px'
    }}>
      <h1>Configuration Required</h1>
      <p style={{ maxWidth: '500px', textAlign: 'center', lineHeight: '1.6' }}>
        This app requires a Clerk Publishable Key to function. 
        <br /><br />
        Please add <code>VITE_CLERK_PUBLISHABLE_KEY</code> to your environment variables.
        <br /><br />
        You can get your key from the <a href="https://dashboard.clerk.com" target="_blank" rel="noopener noreferrer">Clerk Dashboard</a>.
      </p>
    </div>
  )
}

if (!PUBLISHABLE_KEY) {
  console.warn('[v0] Clerk Publishable Key not found. Add VITE_CLERK_PUBLISHABLE_KEY to your environment variables.')
  const root = createRoot(document.getElementById('root'))
  root.render(<MissingKeyPage />)
} else {
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
      <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
        <RouterProvider router={router} />
      </ClerkProvider>
    </StrictMode>
  )
}
