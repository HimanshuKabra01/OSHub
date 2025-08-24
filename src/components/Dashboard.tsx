"use client"

import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { 
  User, 
  Code, 
  Trophy, 
  IndianRupee, 
  Clock, 
  Star, 
  GitBranch, 
  CheckCircle, 
  AlertCircle,
  TrendingUp,
  Target,
  Award,
  Calendar,
  ExternalLink,
  Plus,
  Filter
} from "lucide-react"
import { useAuth } from '../App'
import { Link } from 'react-router-dom'

// Dummy JSON data
const dummyContributions = [
  {
    id: 1,
    title: "Memory Leak in React useEffect Hook",
    status: "in_progress",
    bounty: 15000,
    client: "TechCorp Solutions",
    deadline: "2024-08-30",
    progress: 75,
    technologies: ["React", "JavaScript", "Node.js"],
    description: "Fixing memory leak issues in React components with complex useEffect dependencies.",
    timeSpent: "18 hours",
    submittedAt: null
  },
  {
    id: 2,
    title: "API Rate Limiting Implementation",
    status: "completed",
    bounty: 22000,
    client: "StartupXYZ",
    deadline: "2024-08-15",
    progress: 100,
    technologies: ["Node.js", "Express", "Redis"],
    description: "Implemented robust rate limiting system with Redis backend.",
    timeSpent: "24 hours",
    submittedAt: "2024-08-14",
    rating: 5
  },
  {
    id: 3,
    title: "Database Performance Optimization",
    status: "under_review",
    bounty: 18500,
    client: "DataFlow Inc",
    deadline: "2024-08-25",
    progress: 100,
    technologies: ["PostgreSQL", "Python", "Django"],
    description: "Optimized complex database queries resulting in 60% performance improvement.",
    timeSpent: "32 hours",
    submittedAt: "2024-08-23"
  }
]

const dummyOpportunities = [
  {
    id: 4,
    title: "GraphQL Schema Optimization",
    bounty: 28000,
    client: "CloudTech Ltd",
    deadline: "2024-09-10",
    difficulty: "hard",
    technologies: ["GraphQL", "Node.js", "TypeScript"],
    description: "Optimize GraphQL schema and resolvers for better performance and caching.",
    applicants: 12,
    timeEstimate: "25-35 hours",
    postedAt: "2024-08-20"
  },
  {
    id: 5,
    title: "React Native Performance Issues",
    bounty: 16000,
    client: "MobileFirst Solutions",
    deadline: "2024-09-05",
    difficulty: "medium",
    technologies: ["React Native", "JavaScript", "iOS", "Android"],
    description: "Fix performance bottlenecks in React Native app causing slow rendering.",
    applicants: 8,
    timeEstimate: "15-20 hours",
    postedAt: "2024-08-21"
  },
  {
    id: 6,
    title: "Kubernetes Deployment Pipeline",
    bounty: 35000,
    client: "DevOps Masters",
    deadline: "2024-09-20",
    difficulty: "hard",
    technologies: ["Kubernetes", "Docker", "CI/CD", "AWS"],
    description: "Set up automated deployment pipeline with Kubernetes and monitoring.",
    applicants: 15,
    timeEstimate: "40-50 hours",
    postedAt: "2024-08-19"
  },
  {
    id: 7,
    title: "Vue.js Component Library",
    bounty: 12000,
    client: "Frontend Studio",
    deadline: "2024-09-15",
    difficulty: "easy",
    technologies: ["Vue.js", "TypeScript", "Storybook"],
    description: "Create reusable Vue.js component library with comprehensive documentation.",
    applicants: 6,
    timeEstimate: "10-15 hours",
    postedAt: "2024-08-22"
  }
]

const dummyRewards = {
  totalEarned: 127500,
  monthlyEarning: 55500,
  completedBounties: 15,
  averageRating: 4.8,
  achievements: [
    {
      id: 1,
      name: "First Bounty",
      description: "Completed your first bounty",
      icon: "🎯",
      earnedAt: "2024-06-15"
    },
    {
      id: 2,
      name: "Speed Demon",
      description: "Completed 3 bounties ahead of schedule",
      icon: "⚡",
      earnedAt: "2024-07-20"
    },
    {
      id: 3,
      name: "Tech Expert",
      description: "Earned 5-star rating on 10 bounties",
      icon: "🌟",
      earnedAt: "2024-08-10"
    },
    {
      id: 4,
      name: "High Earner",
      description: "Earned over ₹100,000 in bounties",
      icon: "💎",
      earnedAt: "2024-08-18"
    }
  ],
  recentActivity: [
    {
      id: 1,
      type: "payment",
      description: "Received payment for API Rate Limiting Implementation",
      amount: 22000,
      date: "2024-08-15"
    },
    {
      id: 2,
      type: "submission",
      description: "Submitted solution for Database Performance Optimization",
      date: "2024-08-23"
    },
    {
      id: 3,
      type: "achievement",
      description: "Earned 'High Earner' achievement",
      date: "2024-08-18"
    }
  ]
}

export default function Dashboard() {
  const { user } = useAuth()
  const [activeTab, setActiveTab] = useState('overview')

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'bg-green-500/20 text-green-400'
      case 'in_progress': return 'bg-blue-500/20 text-blue-400'
      case 'under_review': return 'bg-yellow-500/20 text-yellow-400'
      default: return 'bg-gray-500/20 text-gray-400'
    }
  }

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-500/20 text-green-400'
      case 'medium': return 'bg-yellow-500/20 text-yellow-400'
      case 'hard': return 'bg-red-500/20 text-red-400'
      default: return 'bg-gray-500/20 text-gray-400'
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Welcome Section */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-full flex items-center justify-center">
                <User className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white">
                  Welcome back, {user?.name?.split(' ')[0] || 'Developer'}!
                </h1>
                <p className="text-gray-400">{user?.email}</p>
                <div className="flex items-center space-x-2 mt-1">
                  <Badge className="bg-emerald-500/20 text-emerald-400 capitalize">
                    {user?.accountType || 'Developer'}
                  </Badge>
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="text-yellow-400 font-medium">{dummyRewards.averageRating}</span>
                    <span className="text-gray-400 text-sm">rating</span>
                  </div>
                </div>
              </div>
            </div>
            
            <Link to="/create">
              <Button className="bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700 mt-4 md:mt-0">
                <Plus className="h-4 w-4 mr-2" />
                Post New Bounty
              </Button>
            </Link>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card className="bg-gradient-to-br from-emerald-500/10 to-emerald-600/10 border-emerald-500/20">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-emerald-400 text-sm font-medium">Total Earned</p>
                    <p className="text-2xl font-bold text-white">₹{dummyRewards.totalEarned.toLocaleString()}</p>
                  </div>
                  <IndianRupee className="h-8 w-8 text-emerald-400" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-blue-500/10 to-blue-600/10 border-blue-500/20">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-blue-400 text-sm font-medium">This Month</p>
                    <p className="text-2xl font-bold text-white">₹{dummyRewards.monthlyEarning.toLocaleString()}</p>
                  </div>
                  <TrendingUp className="h-8 w-8 text-blue-400" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-yellow-500/10 to-yellow-600/10 border-yellow-500/20">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-yellow-400 text-sm font-medium">Completed</p>
                    <p className="text-2xl font-bold text-white">{dummyRewards.completedBounties}</p>
                  </div>
                  <Trophy className="h-8 w-8 text-yellow-400" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-purple-500/10 to-purple-600/10 border-purple-500/20">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-purple-400 text-sm font-medium">Achievements</p>
                    <p className="text-2xl font-bold text-white">{dummyRewards.achievements.length}</p>
                  </div>
                  <Award className="h-8 w-8 text-purple-400" />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* My Contributions */}
            <Card className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 border-gray-700/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Code className="h-5 w-5 mr-2 text-emerald-400" />
                  My Contributions
                </CardTitle>
                <CardDescription className="text-gray-400">
                  Track your ongoing and completed bounties
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {dummyContributions.map((contribution) => (
                  <div key={contribution.id} className="p-4 bg-gray-800/30 rounded-lg border border-gray-700/30">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-3">
                      <div className="flex-1">
                        <h3 className="text-white font-semibold mb-1">{contribution.title}</h3>
                        <p className="text-gray-400 text-sm mb-2">{contribution.description}</p>
                        <div className="flex flex-wrap items-center gap-2 mb-2">
                          {contribution.technologies.map((tech) => (
                            <Badge key={tech} variant="outline" className="text-xs border-gray-600 text-gray-300">
                              {tech}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div className="flex flex-col items-end space-y-2">
                        <Badge className={getStatusColor(contribution.status) + ' capitalize'}>
                          {contribution.status.replace('_', ' ')}
                        </Badge>
                        <span className="text-emerald-400 font-bold">₹{contribution.bounty.toLocaleString()}</span>
                      </div>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
                      <div className="flex items-center space-x-4 text-sm text-gray-400">
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-1" />
                          {contribution.timeSpent}
                        </div>
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1" />
                          Due: {new Date(contribution.deadline).toLocaleDateString()}
                        </div>
                        {contribution.rating && (
                          <div className="flex items-center">
                            <Star className="h-4 w-4 mr-1 text-yellow-400 fill-current" />
                            {contribution.rating}/5
                          </div>
                        )}
                      </div>
                      <div className="flex items-center space-x-2">
                        <Progress value={contribution.progress} className="w-20" />
                        <span className="text-xs text-gray-400">{contribution.progress}%</span>
                      </div>
                    </div>
                  </div>
                ))}
                
                <div className="text-center">
                  <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-700">
                    View All Contributions
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Opportunities/Challenges */}
            <Card className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 border-gray-700/50 backdrop-blur-sm">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-white flex items-center">
                      <Target className="h-5 w-5 mr-2 text-blue-400" />
                      Available Opportunities
                    </CardTitle>
                    <CardDescription className="text-gray-400">
                      Discover new bounties matching your skills
                    </CardDescription>
                  </div>
                  <Button variant="outline" size="sm" className="border-gray-600 text-gray-300">
                    <Filter className="h-4 w-4 mr-2" />
                    Filter
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {dummyOpportunities.map((opportunity) => (
                  <div key={opportunity.id} className="p-4 bg-gray-800/30 rounded-lg border border-gray-700/30 hover:border-emerald-500/30 transition-colors">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-3">
                      <div className="flex-1">
                        <h3 className="text-white font-semibold mb-1">{opportunity.title}</h3>
                        <p className="text-gray-400 text-sm mb-2">{opportunity.description}</p>
                        <div className="flex flex-wrap items-center gap-2 mb-2">
                          {opportunity.technologies.map((tech) => (
                            <Badge key={tech} variant="outline" className="text-xs border-gray-600 text-gray-300">
                              {tech}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div className="flex flex-col items-end space-y-2">
                        <Badge className={getDifficultyColor(opportunity.difficulty) + ' capitalize'}>
                          {opportunity.difficulty}
                        </Badge>
                        <span className="text-emerald-400 font-bold text-lg">₹{opportunity.bounty.toLocaleString()}</span>
                      </div>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
                      <div className="flex items-center space-x-4 text-sm text-gray-400">
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-1" />
                          {opportunity.timeEstimate}
                        </div>
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1" />
                          Due: {new Date(opportunity.deadline).toLocaleDateString()}
                        </div>
                        <div className="flex items-center">
                          <User className="h-4 w-4 mr-1" />
                          {opportunity.applicants} applicants
                        </div>
                      </div>
                      <Button size="sm" className="bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700">
                        Apply Now
                      </Button>
                    </div>
                  </div>
                ))}
                
                <div className="text-center">
                  <Link to="/browse">
                    <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-700">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Browse All Opportunities
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-6">
            
            {/* Achievements */}
            <Card className="bg-gradient-to-br from-purple-500/10 to-purple-600/10 border-purple-500/20 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Award className="h-5 w-5 mr-2 text-purple-400" />
                  Achievements
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {dummyRewards.achievements.map((achievement) => (
                  <div key={achievement.id} className="flex items-center space-x-3 p-3 bg-gray-800/30 rounded-lg">
                    <div className="text-2xl">{achievement.icon}</div>
                    <div className="flex-1">
                      <p className="text-white font-medium text-sm">{achievement.name}</p>
                      <p className="text-gray-400 text-xs">{achievement.description}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 border-gray-700/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Clock className="h-5 w-5 mr-2 text-blue-400" />
                  Recent Activity
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {dummyRewards.recentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-start space-x-3 p-3 bg-gray-800/30 rounded-lg">
                    <div className="mt-1">
                      {activity.type === 'payment' && <IndianRupee className="h-4 w-4 text-green-400" />}
                      {activity.type === 'submission' && <CheckCircle className="h-4 w-4 text-blue-400" />}
                      {activity.type === 'achievement' && <Trophy className="h-4 w-4 text-yellow-400" />}
                    </div>
                    <div className="flex-1">
                      <p className="text-white text-sm">{activity.description}</p>
                      {activity.amount && (
                        <p className="text-green-400 text-sm font-medium">+₹{activity.amount.toLocaleString()}</p>
                      )}
                      <p className="text-gray-400 text-xs">{new Date(activity.date).toLocaleDateString()}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Performance Metrics */}
            <Card className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 border-gray-700/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white">Performance Metrics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-300 text-sm">Success Rate</span>
                    <span className="text-emerald-400 font-medium">93%</span>
                  </div>
                  <Progress value={93} className="h-2" />
                </div>
                
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-300 text-sm">On-time Delivery</span>
                    <span className="text-blue-400 font-medium">87%</span>
                  </div>
                  <Progress value={87} className="h-2" />
                </div>
                
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-300 text-sm">Client Satisfaction</span>
                    <span className="text-yellow-400 font-medium">96%</span>
                  </div>
                  <Progress value={96} className="h-2" />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}