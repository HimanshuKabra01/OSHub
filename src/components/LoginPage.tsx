"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Github, Mail, Terminal, Eye, EyeOff } from "lucide-react"
import { Link, useNavigate } from "react-router-dom"
import authService from "@/services/authService"

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
      navigate("/dashboard")
    } else {
      setError(result.message)
    }

    setLoading(false)
  }

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

          {/* error message */}
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}

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
            {loading ? "Signing in..." : "Sign In"}
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
