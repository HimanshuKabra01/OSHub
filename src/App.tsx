import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'
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
import PrivacyPage from "./components/PrivacyPage"
import TermsPage from "./components/TermsPage"
import DocsPage from "./pages/DocsPage"
import AuthService from "./services/authService"
import DashBoard from './components/Dashboard'

// Types
interface User {
  uid: string
  email: string
  displayName: string
  emailVerified: boolean
  accountType?: string
}

interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  loading: boolean
  login: (email: string, password: string) => Promise<{ success: boolean; message?: string; user?: User }>
  signup: (email: string, password: string, name: string, accountType: string) => Promise<{ success: boolean; message?: string; user?: User }>
  logout: () => Promise<{ success: boolean; message?: string }>
  updateUser: (userData: User) => void
  getCurrentUser: () => User | null
  getStoredUser: () => User | null
  clearUserData: () => void
}

interface AuthProviderProps {
  children: ReactNode
}

interface ProtectedRouteProps {
  children: ReactNode
}

interface PublicAuthRouteProps {
  children: ReactNode
}

// Create Auth Context
const AuthContext = createContext<AuthContextType | null>(null)

// Custom hook to use auth context
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

// Auth Provider Component
const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)

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
        const unsubscribe = AuthService.onAuthStateChange((firebaseUser: any) => {
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
      if (unsubscribe && typeof unsubscribe === 'function') {
        unsubscribe()
      }
    }
  }, [])

  const login = async (email: string, password: string) => {
    setLoading(true)
    try {
      const result = await AuthService.signIn(email, password)
      if (result.success) {
        setUser(result.user!)
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

  const signup = async (email: string, password: string, name: string, accountType: string) => {
    setLoading(true)
    try {
      const result = await AuthService.signUp(email, password, name, accountType)
      if (result.success) {
        setUser(result.user!)
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

  const updateUser = (userData: User) => {
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
const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
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
const PublicAuthRoute: React.FC<PublicAuthRouteProps> = ({ children }) => {
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

function App(): JSX.Element {
  return (
    <AuthProvider>
      <Router>
        <ScrollToTop />
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-slate-900">
          <Routes>
            {/* Public routes - keep existing layout structure */}
            <Route
              path="/"
              element={
                <>
                  <Navbar />
                  <HomePage />
                  <Footer />
                </>
              }
            />
            
            <Route
              path="/browse"
              element={
                <>
                  <Navbar />
                  <BrowsePage />
                  <Footer />
                </>
              }
            />
            
            <Route
              path="/bounty/:id"
              element={
                <>
                  <Navbar />
                  <BountyDetailsPage />
                  <Footer />
                </>
              }
            />
            
            <Route
              path="/guidelines"
              element={
                <>
                  <Navbar />
                  <GuidePage />
                  <Footer />
                </>
              }
            />

            <Route
              path="/docs"
              element={
                <>
                  <Navbar />
                  <DocsPage />
                  <Footer />
                </>
              }
            />

            {/* Protected routes - require authentication */}
            <Route
              path="/create"
              element={
                <ProtectedRoute>
                  <>
                    <Navbar />
                    <CreatePage />
                    <Footer />
                  </>
                </ProtectedRoute>
              }
            />

            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <>
                    <Navbar />
                    <DashBoard />
                    <Footer />
                  </>
                </ProtectedRoute>
              }
            />

            {/* Auth routes - redirect if already logged in, no navbar/footer */}
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

            {/* Static pages - keep existing structure */}
            <Route 
              path="/privacy" 
              element={<PrivacyPage />} 
            />
            
            <Route 
              path="/terms" 
              element={<TermsPage />} 
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
