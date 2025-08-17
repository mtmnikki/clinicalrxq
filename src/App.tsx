/**
 * App routes for ClinicalRxQ
 * Uses createHashRouter + RouterProvider and gates member pages behind ProtectedRoute.
 * Adds a global ErrorBoundary to prevent blank screens on runtime errors.
 */

import React from 'react'
import { createHashRouter, RouterProvider } from 'react-router'
import HomePage from './pages/Home'
import LoginPage from './pages/Login'
import DashboardPage from './pages/Dashboard'
import ProgramPage from './pages/programs/ProgramPage'
import ProgramsPage from './pages/Programs'
import ResourcesPage from './pages/Resources'
import ContactPage from './pages/Contact'
import JoinPage from './pages/Join'
import ProtectedRoute from './components/auth/ProtectedRoute'
import { AuthProvider } from './components/auth/AuthContext'
import ErrorBoundary from './components/common/ErrorBoundary'

/**
 * Create the hash-based router with public and gated routes.
 */
const router = createHashRouter([
  // Public
  { path: '/', element: <HomePage /> },
  { path: '/login', element: <LoginPage /> },
  { path: '/join', element: <JoinPage /> },
  // Route alias to honor the hero CTA exactly as provided
  { path: '/enroll', element: <JoinPage /> },
  { path: '/contact', element: <ContactPage /> },

  // Member-only (Gated)
  {
    path: '/dashboard',
    element: (
      <ProtectedRoute>
        <DashboardPage />
      </ProtectedRoute>
    ),
  },
  {
    path: '/programs',
    element: (
      <ProtectedRoute>
        <ProgramsPage />
      </ProtectedRoute>
    ),
  },
  {
    path: '/programs/:slug',
    element: (
      <ProtectedRoute>
        <ProgramPage />
      </ProtectedRoute>
    ),
  },
  // Resource Library: keep /library for compatibility, add /resources to match UI links
  {
    path: '/library',
    element: (
      <ProtectedRoute>
        <ResourcesPage />
      </ProtectedRoute>
    ),
  },
  {
    path: '/resources',
    element: (
      <ProtectedRoute>
        <ResourcesPage />
      </ProtectedRoute>
    ),
  },

  // Fallback
  { path: '*', element: <HomePage /> },
])

/**
 * Root App component defining providers and RouterProvider with an ErrorBoundary wrapper.
 */
export default function App() {
  return (
    <AuthProvider>
      <ErrorBoundary>
        <RouterProvider
          router={router}
          fallbackElement={
            <div className="min-h-screen flex items-center justify-center text-slate-600">
              Loading...
            </div>
          }
        />
      </ErrorBoundary>
    </AuthProvider>
  )
}
