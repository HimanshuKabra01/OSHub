"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Terminal, Eye, EyeOff } from "lucide-react"
import { Link, useNavigate } from "react-router-dom"
import authService from "@/services/authService"

// A simple SVG component for the Google icon
const GoogleIcon = () => (
  <svg className="mr-2 h-4 w-4" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512">
    <path fill="currentColor" d="M488 261.8C488 403.3 381.5 512 244 512 110.3 512 0 398.8 0 256S110.3 0 244 0c73 0 135.3 29.7 181.4 76.2l-65.5 64.2C335.5 113.5 293.5 96 244 96c-85.6 0-154.5 68.5-154.5 153.3s68.9 153.3 154.5 153.3c92.2 0 131.3-64.4 136.8-98.2H244v-75.4h236.1c2.3 12.7 3.9 26.9 3.9 41.4z"></path>
  </svg>
);

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const navigate = useNavigate()

  const handleLogin = async () => {
    setLoading(true)
    setError("")

    const result = await authService.signIn(email, password)

    if (result.success) {
      navigate("/dashboard") // Or your desired route
    } else {
      setError(result.message)
    }

    setLoading(false)
  }
  
  // New handler for Google Sign-In
  const handleGoogleLogin = async () => {
    setLoading(true);
    setError("");
    const result = await authService.signInWithGoogle();
    if (result.success) {
      navigate("/dashboard"); // Or your desired route
    } else {
      setError(result.message);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-slate-900 flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-gradient-to-br from-gray-800/50 to-gray-900/50 border-gray-700/50 backdrop-blur-sm relative z-10">
        <CardHeader className="text-center">
          <Link to="/" className="mx-auto mb-4 flex items-center space-x-2">
            <Terminal className="h-6 w-6 text-emerald-400" />
            <h1 className="text-3xl font-bold bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent">
              OSHub
            </h1>
          </Link>
          <CardTitle className="text-2xl text-white">Developer Login</CardTitle>
          <CardDescription className="text-gray-400">Access your developer account</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">

          {/* Google Button */}
          <Button
            variant="outline"
            onClick={handleGoogleLogin}
            disabled={loading}
            className="w-full bg-gray-800/50 border-gray-700 text-white hover:bg-gray-700/50 hover:text-white"
          >
            <GoogleIcon />
            Continue with Google
          </Button>

          {/* Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-gray-700" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-gray-900/50 px-2 text-gray-400">Or continue with email</span>
            </div>
          </div>

          {/* Error Message */}
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}

          {/* Email and Password Form */}
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
                className="bg-gray-800/50 border-gray-700 text-white placeholder:text-gray-400 focus:border-emerald-500"
                required
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
                className="bg-gray-800/50 border-gray-700 text-white placeholder:text-gray-400 focus:border-emerald-500 pr-10"
                required
              />
              <div
                className="absolute right-3 top-[60%] -translate-y-1/2 cursor-pointer text-gray-400 hover:text-gray-200"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </div>
            </div>
          </div>

          <Button
            onClick={handleLogin}
            disabled={loading}
            className="w-full bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700"
            size="lg"
          >
            {loading ? "Signing in..." : "Sign In with Email"}
          </Button>

          <div className="text-center text-sm">
            <Link to="/auth/forgot-password" className="text-emerald-400 hover:text-emerald-300">
              Forgot your password?
            </Link>
          </div>

          <div className="text-center text-sm text-gray-400">
            New to OSHub?{" "}
            <Link to="/auth/signup" className="text-emerald-400 hover:text-emerald-300">
              Create account
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}