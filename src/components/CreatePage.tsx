"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { IndianRupee, Plus, X, Zap, Shield, Target, Code, Bug } from "lucide-react"

export default function CreatePage() {
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [bountyAmount, setBountyAmount] = useState("")

  const availableTags = [
    "React",
    "Node.js",
    "Python",
    "JavaScript",
    "TypeScript",
    "CSS",
    "HTML",
    "PostgreSQL",
    "MongoDB",
    "Redis",
    "Docker",
    "Kubernetes",
    "AWS",
    "Git",
    "Jest",
    "Cypress",
    "GraphQL",
    "REST API",
    "Vue.js",
    "Angular",
    "Next.js",
    "Express",
    "Django",
    "Flask",
    "Go",
    "Rust",
    "Java",
    "Spring Boot",
  ]

  const addTag = (tag: string) => {
    if (!selectedTags.includes(tag)) {
      setSelectedTags([...selectedTags, tag])
    }
  }

  const removeTag = (tag: string) => {
    setSelectedTags(selectedTags.filter((t) => t !== tag))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-slate-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Post Technical{" "}
            <span className="bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent">Bounty</span>
          </h1>
          <p className="text-gray-300 text-base sm:text-lg">Define your technical challenge and attract expert developers</p>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 lg:gap-8">
          {/* Main Form */}
          <div className="xl:col-span-2">
            <Card className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 border-gray-700/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white text-xl flex items-center">
                  <Bug className="h-5 w-5 mr-2 text-emerald-400" />
                  Issue Specification
                </CardTitle>
                <CardDescription className="text-gray-400">
                  Provide comprehensive technical details and requirements for developers
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label htmlFor="title" className="text-white font-medium">
                    Issue Title
                  </Label>
                  <Input
                    id="title"
                    placeholder="e.g., Memory Leak in React useEffect Hook"
                    className="mt-2 bg-gray-800/50 border-gray-700 text-white placeholder:text-gray-400 focus:border-emerald-500"
                  />
                </div>

                <div>
                  <Label htmlFor="description" className="text-white font-medium">
                    Technical Description
                  </Label>
                  <Textarea
                    id="description"
                    placeholder="Provide detailed technical description including:
• Problem statement and context
• Steps to reproduce the issue
• Expected vs actual behavior
• Environment details
• Relevant code snippets or logs"
                    className="mt-2 min-h-32 bg-gray-800/50 border-gray-700 text-white placeholder:text-gray-400 focus:border-emerald-500"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="difficulty" className="text-white font-medium">
                      Complexity Level
                    </Label>
                    <Select>
                      <SelectTrigger className="mt-2 bg-gray-800/50 border-gray-700 text-white">
                        <SelectValue placeholder="Select complexity" />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-800 border-gray-700">
                        <SelectItem value="easy">Easy (1-4 hours)</SelectItem>
                        <SelectItem value="medium">Medium (4-12 hours)</SelectItem>
                        <SelectItem value="hard">Hard (12+ hours)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="category" className="text-white font-medium">
                      Issue Category
                    </Label>
                    <Select>
                      <SelectTrigger className="mt-2 bg-gray-800/50 border-gray-700 text-white">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-800 border-gray-700">
                        <SelectItem value="bug">Bug Fix</SelectItem>
                        <SelectItem value="feature">Feature Implementation</SelectItem>
                        <SelectItem value="performance">Performance Optimization</SelectItem>
                        <SelectItem value="security">Security Enhancement</SelectItem>
                        <SelectItem value="refactoring">Code Refactoring</SelectItem>
                        <SelectItem value="testing">Test Coverage</SelectItem>
                        <SelectItem value="devops">DevOps/Infrastructure</SelectItem>
                        <SelectItem value="integration">API Integration</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label className="text-white font-medium">Technology Stack</Label>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {selectedTags.map((tag) => (
                      <Badge
                        key={tag}
                        className="bg-gradient-to-r from-emerald-500/20 to-blue-500/20 text-emerald-300 border-emerald-500/30 flex items-center gap-1 font-mono text-xs"
                      >
                        {tag}
                        <X className="h-3 w-3 cursor-pointer hover:text-red-400" onClick={() => removeTag(tag)} />
                      </Badge>
                    ))}
                  </div>
                  <div className="mt-3 flex flex-wrap gap-2 max-h-32 overflow-y-auto">
                    {availableTags
                      .filter((tag) => !selectedTags.includes(tag))
                      .map((tag) => (
                        <Badge
                          key={tag}
                          variant="outline"
                          className="cursor-pointer hover:bg-emerald-500/10 border-gray-600 text-gray-400 hover:text-emerald-300 hover:border-emerald-500/50 font-mono text-xs"
                          onClick={() => addTag(tag)}
                        >
                          <Plus className="h-3 w-3 mr-1" />
                          {tag}
                        </Badge>
                      ))}
                  </div>
                </div>

                <div>
                  <Label htmlFor="requirements" className="text-white font-medium">
                    Acceptance Criteria
                  </Label>
                  <Textarea
                    id="requirements"
                    placeholder="Define specific acceptance criteria:
• Functional requirements
• Performance benchmarks
• Code quality standards
• Testing requirements
• Documentation needs"
                    className="mt-2 bg-gray-800/50 border-gray-700 text-white placeholder:text-gray-400 focus:border-emerald-500"
                  />
                </div>

                <div>
                  <Label htmlFor="deadline" className="text-white font-medium">
                    Target Completion Date
                  </Label>
                  <Input
                    id="deadline"
                    type="date"
                    className="mt-2 bg-gray-800/50 border-gray-700 text-white focus:border-emerald-500"
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Bounty Amount */}
            <Card className="bg-gradient-to-br from-emerald-500/10 to-blue-500/10 border-emerald-500/20 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center text-white">
                  <IndianRupee className="h-5 w-5 mr-2 text-emerald-400" />
                  Bounty Amount
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="relative">
                  <IndianRupee className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="10000"
                    value={bountyAmount}
                    onChange={(e) => setBountyAmount(e.target.value)}
                    className="pl-10 bg-gray-800/50 border-gray-700 text-white placeholder:text-gray-400 focus:border-emerald-500 font-mono"
                  />
                </div>
                <p className="text-sm text-gray-400 mt-2">Higher bounties attract more experienced developers</p>
              </CardContent>
            </Card>

            {/* Platform Features */}
            <Card className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 border-gray-700/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white">Platform Benefits</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Zap className="h-5 w-5 text-yellow-400" />
                  <div>
                    <p className="text-white text-sm font-medium">Rapid Resolution</p>
                    <p className="text-gray-400 text-xs">Expert developers available 24/7</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Shield className="h-5 w-5 text-blue-400" />
                  <div>
                    <p className="text-white text-sm font-medium">Secure Escrow</p>
                    <p className="text-gray-400 text-xs">Payment protection guaranteed</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Target className="h-5 w-5 text-emerald-400" />
                  <div>
                    <p className="text-white text-sm font-medium">Quality Assurance</p>
                    <p className="text-gray-400 text-xs">Code review and testing included</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Payment Options */}
            <Card className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 border-gray-700/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white">Payment Configuration</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Checkbox id="escrow" defaultChecked className="border-gray-600" />
                  <Label htmlFor="escrow" className="text-sm text-gray-300">
                    Escrow protection (recommended)
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="milestone" className="border-gray-600" />
                  <Label htmlFor="milestone" className="text-sm text-gray-300">
                    Milestone-based payments
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="bonus" className="border-gray-600" />
                  <Label htmlFor="bonus" className="text-sm text-gray-300">
                    Early completion bonus
                  </Label>
                </div>
              </CardContent>
            </Card>

            {/* Cost Breakdown */}
            <Card className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 border-gray-700/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white">Cost Breakdown</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm font-mono">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Bounty Amount:</span>
                    <span className="font-semibold text-emerald-400">₹{bountyAmount || "0"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Platform Fee (3%):</span>
                    <span className="text-gray-300">
                      ₹{bountyAmount ? (Number.parseFloat(bountyAmount) * 0.03).toFixed(0) : "0"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Payment Processing:</span>
                    <span className="text-gray-300">₹50</span>
                  </div>
                  <hr className="my-2 border-gray-700" />
                  <div className="flex justify-between font-semibold">
                    <span className="text-white">Total Cost:</span>
                    <span className="text-emerald-400">
                      ₹{bountyAmount ? (Number.parseFloat(bountyAmount) * 1.03 + 50).toFixed(0) : "50"}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Submit Button */}
            <Button
              size="lg"
              className="w-full bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700 text-white"
            >
              <Code className="mr-2 h-4 w-4" />
              Post Bounty
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
