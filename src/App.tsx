import React, { Suspense, lazy } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import ProtectedRoute from './components/auth/ProtectedRoute'
import AppLayout from './components/layout/AppLayout'
import LoadingSkeleton from './components/ui/LoadingSkeleton'

const Login          = lazy(() => import('./pages/Login'))
const Dashboard      = lazy(() => import('./pages/Dashboard'))
const UserRequest    = lazy(() => import('./pages/UserRequest'))
const UserListReport = lazy(() => import('./pages/UserListReport'))
const ProfileDetails = lazy(() => import('./pages/ProfileDetails'))
const AuditTrail     = lazy(() => import('./pages/AuditTrail'))

const PageLoader = () => (
  <div style={{ padding: 24 }}><LoadingSkeleton rows={5} /></div>
)

const App: React.FC = () => (
  <AuthProvider>
    <BrowserRouter>
      <Suspense fallback={<PageLoader />}>
        <Routes>
          {/* Public */}
          <Route path="/login" element={<Login />} />

          {/* Protected — everything behind auth */}
          <Route
            element={
              <ProtectedRoute>
                <AppLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Dashboard />} />
            <Route path="user-management">
              <Route index element={<Navigate to="user-request" replace />} />
              <Route path="user-request" element={<UserRequest />} />
              <Route path="user-request/:id/profile" element={<ProfileDetails />} />
              <Route path="user-list" element={<UserListReport />} />
              <Route path="user-list/:id/profile" element={<ProfileDetails />} />
            </Route>
            <Route path="audit-trail" element={<AuditTrail />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  </AuthProvider>
)

export default App
