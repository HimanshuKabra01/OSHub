"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Github, Mail, Terminal, Eye, EyeOff, Loader2 } from "lucide-react"
import { Link, useNavigate } from "react-router-dom"
import authService from "@/services/authService"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [initializing, setInitializing] = useState(true)
  const [error, setError] = useState("")
  const navigate = useNavigate()

  // Check if user is already authenticated on component mount
  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        // Check localStorage first
        if (authService.isAuthenticated()) {
          const storedUser = authService.getStoredUserData()
          if (storedUser && storedUser.emailVerified) {
            navigate("/dashboard")
            return
          }
        }

        // Initialize auth state (syncs Firebase with localStorage)
        await authService.initializeAuth()
        
        // Double check after initialization
        if (authService.isAuthenticated()) {
          navigate("/dashboard")
        }
      } catch (error) {
        console.error("Auth initialization error:", error)
      } finally {
        setInitializing(false)
      }
    }

    checkAuthStatus()
  }, [navigate])

  const handleLogin = async (e?: React.FormEvent) => {
    if (e) {
      e.preventDefault()
    }
    
    // Basic validation
    if (!email.trim() || !password.trim()) {
      setError("Please fill in all fields")
      return
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Please enter a valid email address")
      return
    }

    setLoading(true)
    setError("")

    try {
      const result = await authService.signIn(email, password)

      if (result.success) {
        console.log('User logged in:', result.user)
        navigate("/dashboard")
      } else {
        setError(result.message || "Login failed. Please check your credentials.")
      }
    } catch (err) {
      console.error("Login error:", err)
      setError("An unexpected error occurred. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !loading) {
      handleLogin()
    }
  }

  // Show loading spinner while checking auth status
  if (initializing) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-slate-900 flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-emerald-400" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-slate-900 flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-gradient-to-br from-gray-800/50 to-gray-900/50 border-gray-700/50 backdrop-blur-sm relative z-10">
        <CardHeader className="text-center">
          <Link to="/" className="mx-auto mb-4 flex items-center space-x-2 hover:opacity-80 transition-opacity">
            <Terminal className="h-6 w-6 text-emerald-400" />
            <h1 className="text-3xl font-bold bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent">
              OSHub
            </h1>
          </Link>
          <CardTitle className="text-2xl text-white">Developer Login</CardTitle>
          <CardDescription className="text-gray-400">Access your developer account</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-4" onSubmit={handleLogin}>
            {/* Error message */}
            {error && (
              <div className="bg-red-500/10 border border-red-500/20 text-red-400 px-3 py-2 rounded-md text-sm">
                {error}
              </div>
            )}

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-white font-medium">
                  Email Address
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="developer@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="bg-gray-800/50 border-gray-700 text-white placeholder:text-gray-400 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                  required
                  disabled={loading}
                  autoComplete="email"
                />
              </div>
              <div className="relative space-y-2">
                <Label htmlFor="password" className="text-white font-medium">
                  Password
                </Label>
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="bg-gray-800/50 border-gray-700 text-white placeholder:text-gray-400 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 pr-10"
                  required
                  disabled={loading}
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  className="absolute right-3 top-[60%] -translate-y-1/2 text-gray-400 hover:text-gray-200 transition-colors disabled:opacity-50"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={loading}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              disabled={loading || !email.trim() || !password.trim()}
              className="w-full bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
              size="lg"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Signing in...
                </>
              ) : (
                "Sign In"
              )}
            </Button>

            <div className="text-center text-sm">
              <Link to="/auth/forgot-password" className="text-emerald-400 hover:text-emerald-300 transition-colors">
                Forgot your password?
              </Link>
            </div>

            <div className="text-center text-sm text-gray-400">
              New to OSHub?{" "}
              <Link to="/auth/signup" className="text-emerald-400 hover:text-emerald-300 transition-colors">
                Create account
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}