import { Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { useThemeStore } from './store/themeStore'
import { useEffect } from 'react'

// Layout
import Layout from './components/Layout/Layout'

// Pages
import HomePage from './pages/HomePage'
import LoginPage from './pages/Auth/LoginPage'
import SignupPage from './pages/Auth/SignupPage'
import ForgotPasswordPage from './pages/Auth/ForgotPasswordPage'
import ReportLostPage from './pages/ReportLostPage'
import ReportFoundPage from './pages/ReportFoundPage'
import BrowseItemsPage from './pages/BrowseItemsPage'
import ItemDetailsPage from './pages/ItemDetailsPage'
import DashboardPage from './pages/Dashboard/DashboardPage'
import MyClaimsPage from './pages/Dashboard/MyClaimsPage'
import AdminDashboard from './pages/Admin/AdminDashboard'
import AboutPage from './pages/AboutPage'
import ContactPage from './pages/ContactPage'
import NotFoundPage from './pages/NotFoundPage'

// Protected Route
import ProtectedRoute from './components/Auth/ProtectedRoute'
import AdminRoute from './components/Auth/AdminRoute'

function App() {
  const { theme, initializeTheme } = useThemeStore()

  // Initialize theme on mount
  useEffect(() => {
    initializeTheme()
  }, [initializeTheme])

  // Apply theme class to html element
  useEffect(() => {
    const root = window.document.documentElement
    root.classList.remove('light', 'dark')
    
    if (theme === 'system') {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
      root.classList.add(systemTheme)
    } else {
      root.classList.add(theme)
    }
  }, [theme])

  return (
    <>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: theme === 'dark' ? '#1f2937' : '#ffffff',
            color: theme === 'dark' ? '#f9fafb' : '#111827',
            borderRadius: '12px',
            padding: '16px',
          },
          success: {
            iconTheme: {
              primary: '#22c55e',
              secondary: '#ffffff',
            },
          },
          error: {
            iconTheme: {
              primary: '#ef4444',
              secondary: '#ffffff',
            },
          },
        }}
      />
      
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="signup" element={<SignupPage />} />
          <Route path="forgot-password" element={<ForgotPasswordPage />} />
          <Route path="browse" element={<BrowseItemsPage />} />
          <Route path="item/:id" element={<ItemDetailsPage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="contact" element={<ContactPage />} />
          
          {/* Protected Routes */}
          <Route path="report-lost" element={
            <ProtectedRoute>
              <ReportLostPage />
            </ProtectedRoute>
          } />
          <Route path="report-found" element={
            <ProtectedRoute>
              <ReportFoundPage />
            </ProtectedRoute>
          } />
          <Route path="dashboard" element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          } />
          <Route path="my-claims" element={
            <ProtectedRoute>
              <MyClaimsPage />
            </ProtectedRoute>
          } />
          
          {/* Admin Routes */}
          <Route path="admin/*" element={
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          } />
          
          {/* 404 Page */}
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
