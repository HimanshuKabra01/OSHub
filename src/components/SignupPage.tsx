"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Github, Mail, Terminal, Eye, EyeOff, CheckCircle, Loader2 } from "lucide-react"
import { Link, useNavigate } from "react-router-dom"
import AuthService from "@/services/authService"

export default function SignupPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    userType: "",
  })

  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [initializing, setInitializing] = useState(true)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [termsAccepted, setTermsAccepted] = useState(false)
  const navigate = useNavigate()

  // Check if user is already authenticated on component mount
  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        if (AuthService.isAuthenticated()) {
          const storedUser = AuthService.getStoredUserData()
          if (storedUser && storedUser.emailVerified) {
            navigate("/dashboard")
            return
          }
        }

        await AuthService.initializeAuth()
        
        if (AuthService.isAuthenticated()) {
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

  const updateFormData = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const validateForm = (): boolean => {
    // Check required fields
    if (!formData.firstName.trim() || !formData.lastName.trim() || !formData.email.trim() || 
        !formData.password.trim() || !formData.confirmPassword.trim()) {
      setError("Please fill in all fields")
      return false
    }

    // Email validation
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      setError("Please enter a valid email address")
      return false
    }

    // Terms acceptance
    if (!termsAccepted) {
      setError("Please accept the Terms of Service and Privacy Policy")
      return false
    }

    // Password match
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match")
      return false
    }

    // Account type
    if (!formData.userType) {
      setError("Please select an account type")
      return false
    }

    // Password strength validation
    if (AuthService.validatePassword) {
      const passwordValidation = AuthService.validatePassword(formData.password)
      if (!passwordValidation.isValid) {
        setError(passwordValidation.message)
        return false
      }
    } else {
      // Basic password validation if validatePassword method doesn't exist
      if (formData.password.length < 8) {
        setError("Password must be at least 8 characters long")
        return false
      }
    }

    return true
  }

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setSuccess("")

    if (!validateForm()) {
      return
    }

    try {
      setLoading(true)
      const response = await AuthService.signUp(
        formData.email,
        formData.password,
        `${formData.firstName} ${formData.lastName}`,
        formData.userType
      )

      if (response.success) {
        setSuccess(response.message || "Account created successfully! Please check your email to verify your account.")
        console.log('User registered:', response.user)
        
        // Clear form
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          password: "",
          confirmPassword: "",
          userType: "",
        })
        setTermsAccepted(false)

        // Redirect to verification page after 3 seconds
        setTimeout(() => {
          navigate("/auth/verify-email")
        }, 3000)
      } else {
        setError(response.message || "Registration failed. Please try again.")
      }
    } catch (err: any) {
      console.error('Signup error:', err)
      setError("Something went wrong. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !loading) {
      handleSignup(e as any)
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
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-r from-emerald-900/10 to-blue-900/10 blur-3xl"></div>
      <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-emerald-500/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>

      <Card className="w-full max-w-md bg-gradient-to-br from-gray-800/50 to-gray-900/50 border-gray-700/50 backdrop-blur-sm relative z-10">
        <CardHeader className="text-center">
          <Link to="/" className="mx-auto mb-4 flex items-center space-x-2 hover:opacity-80 transition-opacity">
            <Terminal className="h-6 w-6 text-emerald-400" />
            <h1 className="text-3xl font-bold bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent">
              OSHub
            </h1>
          </Link>
          <CardTitle className="text-2xl text-white">Join OSHub</CardTitle>
          <CardDescription className="text-gray-400">
            Connect with the developer community and start earning bounties
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-4" onSubmit={handleSignup}>
            {/* Success Message */}
            {success && (
              <div className="bg-green-500/10 border border-green-500/20 text-green-400 px-3 py-2 rounded-md text-sm flex items-center">
                <CheckCircle className="h-4 w-4 mr-2 flex-shrink-0" />
                <span>{success}</span>
              </div>
            )}

            {/* Error Message */}
            {error && (
              <div className="bg-red-500/10 border border-red-500/20 text-red-400 px-3 py-2 rounded-md text-sm">
                {error}
              </div>
            )}

            {/* Names */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName" className="text-white font-medium">
                  First Name
                </Label>
                <Input
                  id="firstName"
                  placeholder="Rajesh"
                  value={formData.firstName}
                  onChange={(e) => updateFormData("firstName", e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="bg-gray-800/50 border-gray-700 text-white placeholder:text-gray-400 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                  required
                  disabled={loading}
                  autoComplete="given-name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName" className="text-white font-medium">
                  Last Name
                </Label>
                <Input
                  id="lastName"
                  placeholder="Kumar"
                  value={formData.lastName}
                  onChange={(e) => updateFormData("lastName", e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="bg-gray-800/50 border-gray-700 text-white placeholder:text-gray-400 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                  required
                  disabled={loading}
                  autoComplete="family-name"
                />
              </div>
            </div>

            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-white font-medium">
                Email Address
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="developer@example.com"
                value={formData.email}
                onChange={(e) => updateFormData("email", e.target.value)}
                onKeyDown={handleKeyDown}
                className="bg-gray-800/50 border-gray-700 text-white placeholder:text-gray-400 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                required
                disabled={loading}
                autoComplete="email"
              />
            </div>

            {/* Account Type */}
            <div className="space-y-2">
              <Label htmlFor="userType" className="text-white font-medium">
                Account Type
              </Label>
              <Select
                value={formData.userType}
                onValueChange={(value) => updateFormData("userType", value)}
                disabled={loading}
              >
                <SelectTrigger className="bg-gray-800/50 border-gray-700 text-white focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500">
                  <SelectValue placeholder="Select your role" />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-700">
                  <SelectItem value="developer">Developer</SelectItem>
                  <SelectItem value="client">Client</SelectItem>
                  <SelectItem value="both">Both</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Password */}
            <div className="relative space-y-2">
              <Label htmlFor="password" className="text-white font-medium">
                Password
              </Label>
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={(e) => updateFormData("password", e.target.value)}
                onKeyDown={handleKeyDown}
                className="bg-gray-800/50 border-gray-700 text-white placeholder:text-gray-400 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 pr-10"
                required
                disabled={loading}
                autoComplete="new-password"
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

            {/* Confirm Password */}
            <div className="relative space-y-2">
              <Label htmlFor="confirmPassword" className="text-white font-medium">
                Confirm Password
              </Label>
              <Input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                value={formData.confirmPassword}
                onChange={(e) => updateFormData("confirmPassword", e.target.value)}
                onKeyDown={handleKeyDown}
                className="bg-gray-800/50 border-gray-700 text-white placeholder:text-gray-400 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 pr-10"
                required
                disabled={loading}
                autoComplete="new-password"
              />
              <button
                type="button"
                className="absolute right-3 top-[60%] -translate-y-1/2 text-gray-400 hover:text-gray-200 transition-colors disabled:opacity-50"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                disabled={loading}
                aria-label={showConfirmPassword ? "Hide password" : "Show password"}
              >
                {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>

            {/* Terms */}
            <div className="flex items-start space-x-2">
              <Checkbox 
                id="terms" 
                className="border-gray-600 mt-1" 
                checked={termsAccepted}
                onCheckedChange={setTermsAccepted}
                disabled={loading}
                required 
              />
              <Label htmlFor="terms" className="text-sm text-gray-300 leading-5">
                I agree to the{" "}
                <Link to="/terms" className="text-emerald-400 hover:text-emerald-300 transition-colors">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link to="/privacy" className="text-emerald-400 hover:text-emerald-300 transition-colors">
                  Privacy Policy
                </Link>
              </Label>
            </div>

            {/* Submit */}
            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
              size="lg"
              disabled={loading || !termsAccepted}
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating Account...
                </>
              ) : (
                "Create Developer Account"
              )}
            </Button>

            <div className="text-center text-sm text-gray-400">
              Already have an account?{" "}
              <Link to="/auth/login" className="text-emerald-400 hover:text-emerald-300 transition-colors">
                Sign in
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}