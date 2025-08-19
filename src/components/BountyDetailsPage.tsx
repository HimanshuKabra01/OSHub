"use client"

import { useState } from "react"
import { useParams } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import {
  IndianRupee,
  Clock,
  Star,
  MessageSquare,
  ExternalLink,
  Zap,
  Shield,
  Award,
  Code,
  GitBranch,
} from "lucide-react"

export default function BountyDetailsPage() {
  const { id } = useParams()
  const [isClaimed, setIsClaimed] = useState(false)

  // Mock data - in real app, this would come from API
  const bounty = {
    id: Number.parseInt(id || "1"),
    title: "Memory Leak in React useEffect Hook",
    description:
      "Production memory leak in React component causing performance degradation. The component uses useEffect hooks with event listeners and WebSocket subscriptions, but cleanup functions are not executing properly.\n\nThe issue manifests when users navigate away from the component and return multiple times. Memory usage increases progressively, eventually causing browser unresponsiveness.\n\nComponent is part of a real-time analytics dashboard that subscribes to WebSocket events for live data updates. The memory leak appears to be related to improper cleanup of event listeners and subscription handlers.",
    bounty: 12000,
    language: "React",
    difficulty: "Medium",
    timePosted: "2 hours ago",
    issueType: "Bug Fix",
    claimCount: 3,
    starred: 12,
    deadline: "2025-08-01",
    priority: "High",
    requirements:
      "• Maintain existing functionality\n• Implement proper cleanup in useEffect\n• Add comprehensive unit tests\n• Document the solution approach\n• Ensure no performance regression\n• Follow React best practices",
    tags: ["React", "JavaScript", "Memory Management", "Hooks", "WebSocket", "Performance"],
    author: {
      name: "Rajesh Kumar",
      avatar: "/placeholder.svg?height=40&width=40",
      reputation: 4.8,
      completedBounties: 23,
    },
    claims: [
      {
        id: 1,
        developer: {
          name: "Priya Sharma",
          avatar: "/placeholder.svg?height=32&width=32",
          reputation: 4.9,
          completedBounties: 45,
        },
        proposal:
          "I can resolve this memory leak by implementing proper cleanup functions in useEffect. I'll create a custom hook for WebSocket management with automatic cleanup and add comprehensive testing.",
        timeSubmitted: "1 hour ago",
        estimatedTime: "2-3 hours",
      },
      {
        id: 2,
        developer: {
          name: "Arjun Patel",
          avatar: "/placeholder.svg?height=32&width=32",
          reputation: 4.7,
          completedBounties: 31,
        },
        proposal:
          "I have extensive experience with React memory leaks. I'll implement proper cleanup, add memoization to prevent unnecessary re-renders, and provide performance benchmarks.",
        timeSubmitted: "30 minutes ago",
        estimatedTime: "1-2 hours",
      },
    ],
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Header */}
            <Card className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 border-gray-700/50 backdrop-blur-sm">
              <CardHeader>
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center space-x-2">
                    <Badge variant="secondary" className="bg-gray-700 text-gray-300 font-mono text-xs">
                      {bounty.language}
                    </Badge>
                    <Badge variant="outline" className="border-gray-600 text-gray-400 text-xs">
                      {bounty.issueType}
                    </Badge>
                    <Badge
                      variant={
                        bounty.difficulty === "Easy"
                          ? "default"
                          : bounty.difficulty === "Medium"
                            ? "secondary"
                            : "destructive"
                      }
                      className={
                        bounty.difficulty === "Easy"
                          ? "bg-green-600/20 text-green-400 border-green-600/30 text-xs"
                          : bounty.difficulty === "Medium"
                            ? "bg-yellow-600/20 text-yellow-400 border-yellow-600/30 text-xs"
                            : "bg-red-600/20 text-red-400 border-red-600/30 text-xs"
                      }
                    >
                      {bounty.difficulty}
                    </Badge>
                    {bounty.priority === "High" && (
                      <Badge className="bg-gradient-to-r from-orange-600 to-orange-500 text-white text-xs">
                        HIGH PRIORITY
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center text-emerald-400 font-bold text-2xl font-mono">
                    <IndianRupee className="h-5 w-5 mr-1" />
                    {bounty.bounty.toLocaleString()}
                  </div>
                </div>
                <CardTitle className="text-white text-2xl font-semibold">{bounty.title}</CardTitle>
                <div className="flex items-center space-x-4 text-sm text-gray-400">
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    Posted {bounty.timePosted}
                  </div>
                  <div className="flex items-center">
                    <MessageSquare className="h-4 w-4 mr-1" />
                    {bounty.claimCount} proposals
                  </div>
                  <div className="flex items-center">
                    <Star className="h-4 w-4 mr-1" />
                    {bounty.starred} starred
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="prose max-w-none">
                  <h3 className="text-lg font-semibold mb-2 text-white flex items-center">
                    <Code className="h-4 w-4 mr-2 text-emerald-400" />
                    Technical Description
                  </h3>
                  <p className="text-gray-300 whitespace-pre-line mb-4 leading-relaxed">{bounty.description}</p>

                  <h3 className="text-lg font-semibold mb-2 text-white flex items-center">
                    <GitBranch className="h-4 w-4 mr-2 text-emerald-400" />
                    Acceptance Criteria
                  </h3>
                  <p className="text-gray-300 whitespace-pre-line mb-4 leading-relaxed">{bounty.requirements}</p>

                  <h3 className="text-lg font-semibold mb-2 text-white">Technology Stack</h3>
                  <div className="flex flex-wrap gap-2">
                    {bounty.tags.map((tag) => (
                      <Badge
                        key={tag}
                        className="bg-gradient-to-r from-emerald-500/20 to-blue-500/20 text-emerald-300 border-emerald-500/30 font-mono text-xs"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Claims Section */}
            <Card className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 border-gray-700/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <MessageSquare className="h-5 w-5 mr-2 text-emerald-400" />
                  Developer Proposals ({bounty.claims.length})
                </CardTitle>
                <CardDescription className="text-gray-400">
                  Submitted solutions from qualified developers
                </CardDescription>
              </CardHeader>
              <CardContent>
                {bounty.claims.map((claim, index) => (
                  <div key={claim.id}>
                    <div className="flex items-start space-x-4">
                      <Avatar className="border-2 border-emerald-500/30">
                        <AvatarImage src={claim.developer.avatar || "/placeholder.svg"} alt={claim.developer.name} />
                        <AvatarFallback className="bg-gray-700 text-white">
                          {claim.developer.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <h4 className="font-semibold text-white">{claim.developer.name}</h4>
                          <Badge className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 text-yellow-400 border-yellow-500/30 text-xs">
                            ⭐ {claim.developer.reputation}
                          </Badge>
                          <span className="text-sm text-gray-400 font-mono">
                            {claim.developer.completedBounties} bounties completed
                          </span>
                        </div>
                        <p className="text-gray-300 mb-2 leading-relaxed">{claim.proposal}</p>
                        <div className="flex items-center space-x-4 text-sm text-gray-400">
                          <span>Submitted {claim.timeSubmitted}</span>
                          <span>Est. completion: {claim.estimatedTime}</span>
                        </div>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-emerald-500/50 text-emerald-400 hover:bg-emerald-500/10 bg-transparent text-xs"
                      >
                        View Profile
                      </Button>
                    </div>
                    {index < bounty.claims.length - 1 && <Separator className="my-4 bg-gray-700" />}
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Author Info */}
            <Card className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 border-gray-700/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white">Issue Author</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-3">
                  <Avatar className="h-12 w-12 border-2 border-emerald-500/30">
                    <AvatarImage src={bounty.author.avatar || "/placeholder.svg"} alt={bounty.author.name} />
                    <AvatarFallback className="bg-gray-700 text-white">{bounty.author.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h4 className="font-semibold text-white">{bounty.author.name}</h4>
                    <div className="flex items-center space-x-2 text-sm text-gray-400">
                      <span>⭐ {bounty.author.reputation}</span>
                      <span>•</span>
                      <span>{bounty.author.completedBounties} bounties posted</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Bounty Details */}
            <Card className="bg-gradient-to-br from-emerald-500/10 to-blue-500/10 border-emerald-500/20 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <IndianRupee className="h-5 w-5 mr-2 text-emerald-400" />
                  Bounty Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-300">Reward:</span>
                  <span className="font-semibold text-emerald-400 font-mono">₹{bounty.bounty.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">Deadline:</span>
                  <span className="text-white">{bounty.deadline}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">Proposals:</span>
                  <span className="text-white">{bounty.claims.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">Complexity:</span>
                  <Badge
                    variant={
                      bounty.difficulty === "Easy"
                        ? "default"
                        : bounty.difficulty === "Medium"
                          ? "secondary"
                          : "destructive"
                    }
                    className={
                      bounty.difficulty === "Easy"
                        ? "bg-green-600/20 text-green-400 border-green-600/30 text-xs"
                        : bounty.difficulty === "Medium"
                          ? "bg-yellow-600/20 text-yellow-400 border-yellow-600/30 text-xs"
                          : "bg-red-600/20 text-red-400 border-red-600/30 text-xs"
                    }
                  >
                    {bounty.difficulty}
                  </Badge>
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="space-y-3">
              <Button
                size="lg"
                className="w-full bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700 text-white"
                onClick={() => setIsClaimed(true)}
                disabled={isClaimed}
              >
                {isClaimed ? "✅ Claimed!" : "🚀 Submit Proposal"}
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="w-full border-yellow-500/50 text-yellow-400 hover:bg-yellow-500/10 bg-transparent"
              >
                <Star className="h-4 w-4 mr-2" />
                Star Issue
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="w-full border-blue-500/50 text-blue-400 hover:bg-blue-500/10 bg-transparent"
              >
                <ExternalLink className="h-4 w-4 mr-2" />
                Share
              </Button>
            </div>

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
                  <Award className="h-5 w-5 text-emerald-400" />
                  <div>
                    <p className="text-white text-sm font-medium">Quality Assurance</p>
                    <p className="text-gray-400 text-xs">Code review and testing included</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Submit Solution */}
            {isClaimed && (
              <Card className="bg-gradient-to-br from-emerald-500/10 to-blue-500/10 border-emerald-500/20 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <Code className="h-5 w-5 mr-2 text-emerald-400" />
                    Submit Solution
                  </CardTitle>
                  <CardDescription className="text-gray-400">
                    Provide your technical solution and implementation details
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Textarea
                    placeholder="Describe your solution approach:
• Technical implementation details
• Code repository link (GitHub/GitLab)
• Testing methodology
• Performance improvements
• Documentation provided"
                    className="min-h-24 bg-gray-800/50 border-gray-700 text-white placeholder:text-gray-400 focus:border-emerald-500"
                  />
                  <Button className="w-full bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700">
                    <GitBranch className="mr-2 h-4 w-4" />
                    Submit Solution
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
