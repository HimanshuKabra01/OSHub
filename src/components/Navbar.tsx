import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Terminal, User, LogOut, Settings, ChevronDown, Menu, X } from "lucide-react"
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from '../App' // Import the useAuth hook

export default function Navbar() {
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { user, isAuthenticated, logout, loading } = useAuth()
  const navigate = useNavigate()

  const handleLogout = async () => {
    const result = await logout()
    if (result.success) {
      navigate('/')
    }
    setIsProfileMenuOpen(false)
    setIsMobileMenuOpen(false)
  }

  const toggleProfileMenu = () => {
    setIsProfileMenuOpen(!isProfileMenuOpen)
  }

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false)
  }

  return (
    <nav className="sticky top-0 z-50 bg-black/20 backdrop-blur-lg border-b border-gray-800/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center space-x-2">
              <Terminal className="h-6 w-6 text-emerald-400" />
              <h1 className="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent">
                OSHub
              </h1>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/guidelines">
              <Button variant="ghost" className="text-gray-300 hover:bg-gray-800/50 hover:text-white">
                Guide
              </Button>
            </Link>

            <Link to="/browse">
              <Button variant="ghost" className="text-gray-300 hover:bg-gray-800/50 hover:text-white">
                Browse Issues
              </Button>
            </Link>

            {/* Show Post Bounty only for authenticated users */}
            {isAuthenticated && user ? (
              <Link to="/create">
                <Button variant="ghost" className="text-gray-300 hover:bg-gray-800/50 hover:text-white">
                  Post Bounty
                </Button>
              </Link>
            ) : null}

            {/* Authentication Section */}
            {loading ? (
              <div className="w-20 h-10 bg-gray-600 rounded animate-pulse"></div>
            ) : isAuthenticated && user ? (
              /* Authenticated User Menu */
              <div className="relative">
                <Button
                  variant="ghost"
                  onClick={toggleProfileMenu}
                  className="text-gray-300 hover:bg-gray-800/50 hover:text-white flex items-center space-x-2 px-3"
                >
                  <div className="w-8 h-8 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-full flex items-center justify-center">
                    <User className="h-4 w-4 text-white" />
                  </div>
                  <span className="max-w-24 truncate">{user.name || user.email.split('@')[0]}</span>
                  <ChevronDown className="h-4 w-4" />
                </Button>

                {/* Profile Dropdown */}
                {isProfileMenuOpen && (
                  <>
                    <div className="absolute right-0 mt-2 w-56 bg-gray-800/95 backdrop-blur-sm rounded-lg shadow-lg border border-gray-700/50 py-2 z-50">
                      {/* User Info Header */}
                      <div className="px-4 py-3 border-b border-gray-700/50">
                        <p className="text-sm font-medium text-white truncate">{user.name}</p>
                        <p className="text-xs text-gray-400 truncate">{user.email}</p>
                        <span className="inline-block mt-1 px-2 py-1 text-xs bg-emerald-500/20 text-emerald-400 rounded-full capitalize">
                          {user.accountType}
                        </span>
                      </div>
                      
                      {/* Menu Items */}
                      <div className="py-1">
                        <Link
                          to="/dashboard"
                          className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-300 hover:bg-gray-700/50 hover:text-white transition-colors duration-200"
                          onClick={() => setIsProfileMenuOpen(false)}
                        >
                          <User className="h-4 w-4" />
                          <span>Dashboard</span>
                        </Link>
                        
                        <Link
                          to="/profile"
                          className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-300 hover:bg-gray-700/50 hover:text-white transition-colors duration-200"
                          onClick={() => setIsProfileMenuOpen(false)}
                        >
                          <Settings className="h-4 w-4" />
                          <span>Settings</span>
                        </Link>
                        
                        <div className="border-t border-gray-700/50 my-1"></div>
                        
                        <button
                          onClick={handleLogout}
                          className="w-full flex items-center space-x-2 px-4 py-2 text-sm text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-colors duration-200 text-left"
                        >
                          <LogOut className="h-4 w-4" />
                          <span>Sign Out</span>
                        </button>
                      </div>
                    </div>
                    
                    {/* Click outside to close */}
                    <div 
                      className="fixed inset-0 z-40" 
                      onClick={() => setIsProfileMenuOpen(false)}
                    ></div>
                  </>
                )}
              </div>
            ) : (
              /* Login/Signup Buttons */
              <>
                <Link to="/auth/login">
                  <Button
                    variant="outline"
                    className="border-emerald-500/50 text-emerald-400 hover:bg-emerald-500/10 hover:text-emerald-300 bg-transparent"
                  >
                    Login
                  </Button>
                </Link>
                <Link to="/auth/signup">
                  <Button className="bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700">
                    Sign Up
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleMobileMenu}
              className="text-gray-300 hover:bg-gray-800/50 hover:text-white p-2"
            >
              {isMobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-gray-800/50">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-gray-900/50 backdrop-blur-sm">
              <Link to="/guidelines" onClick={closeMobileMenu}>
                <Button variant="ghost" className="w-full justify-start text-gray-300 hover:bg-gray-800/50 hover:text-white">
                  Guide
                </Button>
              </Link>

              <Link to="/browse" onClick={closeMobileMenu}>
                <Button variant="ghost" className="w-full justify-start text-gray-300 hover:bg-gray-800/50 hover:text-white">
                  Browse Issues
                </Button>
              </Link>

              {/* Mobile Auth Section */}
              {loading ? (
                <div className="px-3 py-2">
                  <div className="w-full h-10 bg-gray-600 rounded animate-pulse"></div>
                </div>
              ) : isAuthenticated && user ? (
                <>
                  <Link to="/create" onClick={closeMobileMenu}>
                    <Button variant="ghost" className="w-full justify-start text-gray-300 hover:bg-gray-800/50 hover:text-white">
                      Post Bounty
                    </Button>
                  </Link>

                  {/* Mobile User Info */}
                  <div className="px-3 py-3 border-t border-gray-700/50 mt-2">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                        <User className="h-5 w-5 text-white" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-medium text-white truncate">{user.name}</p>
                        <p className="text-xs text-gray-400 truncate">{user.email}</p>
                        <span className="inline-block mt-1 px-2 py-1 text-xs bg-emerald-500/20 text-emerald-400 rounded-full capitalize">
                          {user.accountType}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <Link to="/dashboard" onClick={closeMobileMenu}>
                    <Button variant="ghost" className="w-full justify-start text-gray-300 hover:bg-gray-800/50 hover:text-white">
                      <User className="h-4 w-4 mr-2" />
                      Dashboard
                    </Button>
                  </Link>
                  
                  <Link to="/profile" onClick={closeMobileMenu}>
                    <Button variant="ghost" className="w-full justify-start text-gray-300 hover:bg-gray-800/50 hover:text-white">
                      <Settings className="h-4 w-4 mr-2" />
                      Settings
                    </Button>
                  </Link>
                  
                  <Button 
                    variant="ghost" 
                    onClick={handleLogout}
                    className="w-full justify-start text-red-400 hover:bg-red-500/10 hover:text-red-300"
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Sign Out
                  </Button>
                </>
              ) : (
                <>
                  <Link to="/auth/login" onClick={closeMobileMenu}>
                    <Button
                      variant="outline"
                      className="w-full border-emerald-500/50 text-emerald-400 hover:bg-emerald-500/10 hover:text-emerald-300 bg-transparent"
                    >
                      Login
                    </Button>
                  </Link>
                  <Link to="/auth/signup" onClick={closeMobileMenu}>
                    <Button className="w-full bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700 mt-2">
                      Sign Up
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}