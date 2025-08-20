import React, { createContext, useContext, useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import HomePage from "./components/HomePage"
import BrowsePage from "./components/BrowsePage"
import CreatePage from "./components/CreatePage"
import BountyDetailsPage from "./components/BountyDetailsPage"
import LoginPage from "./components/LoginPage"
import SignupPage from "./components/SignupPage"
import ScrollToTop from "./components/ScrollToTop"
import GuidePage from "./components/Guide"
import AuthService from "./services/authService"
import DashBoard from './components/DashBoard'

// Create Auth Context
const AuthContext = createContext()

// Custom hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

// Auth Provider Component
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        // Check localStorage first for immediate UI update
        const storedUser = AuthService.getStoredUserData()
        const isAuthenticatedStored = AuthService.isAuthenticated()
        
        if (storedUser && isAuthenticatedStored) {
          setUser(storedUser)
          setIsAuthenticated(true)
        }

        // Initialize and sync with Firebase
        await AuthService.initializeAuth()
        
        // Re-check after Firebase sync
        const updatedUser = AuthService.getStoredUserData()
        const updatedAuth = AuthService.isAuthenticated()
        
        setUser(updatedUser)
        setIsAuthenticated(updatedAuth)

        // Listen for auth state changes
        const unsubscribe = AuthService.onAuthStateChange((firebaseUser) => {
          if (firebaseUser && firebaseUser.emailVerified) {
            const currentUser = AuthService.getStoredUserData()
            setUser(currentUser)
            setIsAuthenticated(true)
          } else {
            setUser(null)
            setIsAuthenticated(false)
          }
        })

        return unsubscribe
      } catch (error) {
        console.error('Auth initialization error:', error)
        setUser(null)
        setIsAuthenticated(false)
      } finally {
        setLoading(false)
      }
    }

    const unsubscribe = initializeAuth()
    
    return () => {
      if (typeof unsubscribe === 'function') {
        unsubscribe()
      }
    }
  }, [])

  const login = async (email, password) => {
    setLoading(true)
    try {
      const result = await AuthService.signIn(email, password)
      if (result.success) {
        setUser(result.user)
        setIsAuthenticated(true)
        return result
      }
      return result
    } catch (error) {
      console.error('Login error:', error)
      return { success: false, message: 'Login failed' }
    } finally {
      setLoading(false)
    }
  }

  const signup = async (email, password, name, accountType) => {
    setLoading(true)
    try {
      const result = await AuthService.signUp(email, password, name, accountType)
      if (result.success) {
        setUser(result.user)
        setIsAuthenticated(true)
        return result
      }
      return result
    } catch (error) {
      console.error('Signup error:', error)
      return { success: false, message: 'Signup failed' }
    } finally {
      setLoading(false)
    }
  }

  const logout = async () => {
    setLoading(true)
    try {
      const result = await AuthService.signOut()
      setUser(null)
      setIsAuthenticated(false)
      return result
    } catch (error) {
      console.error('Logout error:', error)
      return { success: false, message: 'Logout failed' }
    } finally {
      setLoading(false)
    }
  }

  const updateUser = (userData) => {
    setUser(userData)
    AuthService.storeUserData(userData)
  }

  const value = {
    user,
    isAuthenticated,
    loading,
    login,
    signup,
    logout,
    updateUser,
    // Helper methods
    getCurrentUser: () => AuthService.getCurrentUser(),
    getStoredUser: () => AuthService.getStoredUserData(),
    clearUserData: () => AuthService.clearStoredUserData()
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

// Protected Route Component - requires authentication
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading, user } = useAuth()
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-gray-900 to-slate-900">
        <div className="text-white text-lg">Loading...</div>
      </div>
    )
  }
  
  if (!isAuthenticated || !user?.emailVerified) {
    return <Navigate to="/auth/login" replace />
  }
  
  return children
}

// Public Route Component - redirects to browse if authenticated
const PublicAuthRoute = ({ children }) => {
  const { isAuthenticated, loading, user } = useAuth()
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-gray-900 to-slate-900">
        <div className="text-white text-lg">Loading...</div>
      </div>
    )
  }
  
  if (isAuthenticated && user?.emailVerified) {
    return <Navigate to="/browse" replace />
  }
  
  return children
}

// Layout wrapper component
const LayoutWrapper = ({ children, showNavAndFooter = true }) => {
  return (
    <>
      {showNavAndFooter && <Navbar />}
      {children}
      {showNavAndFooter && <Footer />}
    </>
  )
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <ScrollToTop />
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-slate-900">
          <Routes>
            {/* Public routes */}
            <Route
              path="/"
              element={
                <LayoutWrapper>
                  <HomePage />
                </LayoutWrapper>
              }
            />
            
            <Route
              path="/browse"
              element={
                <LayoutWrapper>
                  <BrowsePage />
                </LayoutWrapper>
              }
            />
            
            <Route
              path="/bounty/:id"
              element={
                <LayoutWrapper>
                  <BountyDetailsPage />
                </LayoutWrapper>
              }
            />
            
            <Route
              path="/guidelines"
              element={
                <LayoutWrapper>
                  <GuidePage />
                </LayoutWrapper>
              }
            />

            {/* Protected routes - require authentication */}
            <Route
              path="/create"
              element={
                <ProtectedRoute>
                  <LayoutWrapper>
                    <CreatePage />
                  </LayoutWrapper>
                </ProtectedRoute>
              }
            />

            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <LayoutWrapper>
                    <DashBoard />
                  </LayoutWrapper>
                </ProtectedRoute>
              }
            />
           

            {/* Auth routes - redirect if already logged in */}
            <Route 
              path="/auth/login" 
              element={
                <PublicAuthRoute>
                  <LoginPage />
                </PublicAuthRoute>
              } 
            />
            
            <Route 
              path="/auth/signup" 
              element={
                <PublicAuthRoute>
                  <SignupPage />
                </PublicAuthRoute>
              } 
            />

            {/* Catch-all route */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  )
}

export default App