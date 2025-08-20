import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  IndianRupee,
  Clock,
  Search,
  Star,
  MessageSquare,
  TrendingUp,
  Filter,
  SortAsc,
} from "lucide-react";
import { Link } from "react-router-dom";

export default function BrowsePage() {
  const bounties = [
    {
      id: 1,
      title: "Memory Leak in React useEffect Hook",
      description:
        "Production memory leak in useEffect causing performance degradation. Component fails to cleanup event listeners and WebSocket subscriptions properly on unmount.",
      bounty: 12000,
      language: "React",
      difficulty: "Medium",
      timePosted: "2 hours ago",
      issueType: "Bug Fix",
      claims: 3,
      starred: 12,
      priority: "High",
    },
    {
      id: 2,
      title: "PostgreSQL Query Performance Optimization",
      description:
        "Complex JOIN queries timing out on datasets >100K records. Need indexing strategy and query optimization for analytics dashboard.",
      bounty: 25000,
      language: "PostgreSQL",
      difficulty: "Hard",
      timePosted: "1 day ago",
      issueType: "Performance",
      claims: 1,
      starred: 8,
      priority: "Critical",
    },
    {
      id: 3,
      title: "CSS Grid Layout Responsive Bug",
      description:
        "Grid layout breaking on mobile viewports <768px. Need responsive design fix maintaining desktop functionality.",
      bounty: 6000,
      language: "CSS",
      difficulty: "Easy",
      timePosted: "3 hours ago",
      issueType: "UI/UX",
      claims: 5,
      starred: 15,
      priority: "Medium",
    },
    {
      id: 4,
      title: "Stripe Webhook Integration",
      description:
        "Implement secure webhook handling for payment events. Need proper validation, retry logic, and error handling for production environment.",
      bounty: 18000,
      language: "Node.js",
      difficulty: "Medium",
      timePosted: "5 hours ago",
      issueType: "Integration",
      claims: 2,
      starred: 6,
      priority: "High",
    },
    {
      id: 5,
      title: "Docker Multi-stage Build Optimization",
      description:
        "Container images too large (2GB+). Need multi-stage builds, layer optimization, and deployment pipeline improvements.",
      bounty: 15000,
      language: "Docker",
      difficulty: "Medium",
      timePosted: "1 day ago",
      issueType: "DevOps",
      claims: 1,
      starred: 9,
      priority: "Medium",
    },
    {
      id: 6,
      title: "Jest Unit Test Coverage Enhancement",
      description:
        "Current test coverage at 45%. Need comprehensive unit tests for business logic, edge cases, and error scenarios.",
      bounty: 10000,
      language: "Jest",
      difficulty: "Easy",
      timePosted: "6 hours ago",
      issueType: "Testing",
      claims: 4,
      starred: 11,
      priority: "Low",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-white mb-4">
            Active{" "}
            <span className="bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent">
              Issues
            </span>
          </h1>
          <p className="text-gray-300 text-lg">
            Browse technical challenges and contribute to open source projects
          </p>
        </div>

        {/* Filters */}
        <div className="bg-black/20 backdrop-blur-sm rounded-xl border border-gray-800/50 p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div className="relative md:col-span-2">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search issues, technologies..."
                className="pl-10 bg-gray-800/50 border-gray-700 text-white placeholder:text-gray-400 focus:border-emerald-500"
              />
            </div>
            <Select>
              <SelectTrigger className="bg-gray-800/50 border-gray-700 text-white">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Difficulty" />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 border-gray-700">
                <SelectItem value="easy">Easy (1-4 hrs)</SelectItem>
                <SelectItem value="medium">Medium (4-12 hrs)</SelectItem>
                <SelectItem value="hard">Hard (12+ hrs)</SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger className="bg-gray-800/50 border-gray-700 text-white">
                <SelectValue placeholder="Technology" />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 border-gray-700">
                <SelectItem value="react">React</SelectItem>
                <SelectItem value="nodejs">Node.js</SelectItem>
                <SelectItem value="python">Python</SelectItem>
                <SelectItem value="postgresql">PostgreSQL</SelectItem>
                <SelectItem value="docker">Docker</SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger className="bg-gray-800/50 border-gray-700 text-white">
                <SortAsc className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 border-gray-700">
                <SelectItem value="newest">Latest Issues</SelectItem>
                <SelectItem value="bounty-high">Highest Bounty</SelectItem>
                <SelectItem value="bounty-low">Lowest Bounty</SelectItem>
                <SelectItem value="most-starred">Most Starred</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Stats Bar */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card className="bg-gradient-to-r from-emerald-500/10 to-blue-500/10 border-emerald-500/20 backdrop-blur-sm">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-emerald-400 font-mono">
                24
              </div>
              <div className="text-sm text-gray-300">Active Issues</div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 border-green-500/20 backdrop-blur-sm">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-green-400 font-mono">
                ₹2.4L
              </div>
              <div className="text-sm text-gray-300">Total Bounties</div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border-blue-500/20 backdrop-blur-sm">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-blue-400 font-mono">
                156
              </div>
              <div className="text-sm text-gray-300">Online Developers</div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-r from-orange-500/10 to-red-500/10 border-orange-500/20 backdrop-blur-sm">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-orange-400 font-mono">
                3
              </div>
              <div className="text-sm text-gray-300">Critical Priority</div>
            </CardContent>
          </Card>
        </div>

        {/* Bounties Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {bounties.map((bounty) => (
            <Card
              key={bounty.id}
              className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 border-gray-700/50 hover:border-emerald-500/30 transition-all duration-300 hover:shadow-2xl hover:shadow-emerald-500/10 backdrop-blur-sm group"
            >
              <CardHeader>
                <div className="flex justify-between items-start mb-3">
                  <div className="flex items-center space-x-2">
                    <Badge
                      variant="secondary"
                      className="bg-gray-700 text-gray-300 font-mono text-xs"
                    >
                      {bounty.language}
                    </Badge>
                    <Badge
                      variant="outline"
                      className="border-gray-600 text-gray-400 text-xs"
                    >
                      {bounty.issueType}
                    </Badge>
                    {bounty.priority === "Critical" && (
                      <Badge className="bg-gradient-to-r from-red-600 to-red-500 text-white text-xs">
                        CRITICAL
                      </Badge>
                    )}
                    {bounty.priority === "High" && (
                      <Badge className="bg-gradient-to-r from-orange-600 to-orange-500 text-white text-xs">
                        HIGH
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center text-emerald-400 font-bold text-lg font-mono">
                    <IndianRupee className="h-4 w-4 mr-1" />
                    {bounty.bounty.toLocaleString()}
                  </div>
                </div>
                <CardTitle className="text-white text-lg group-hover:text-emerald-300 transition-colors font-semibold">
                  <Link to={`/bounty/${bounty.id}`}>{bounty.title}</Link>
                </CardTitle>
                <CardDescription className="text-gray-400 line-clamp-2 text-sm leading-relaxed">
                  {bounty.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center text-sm text-gray-500 mb-4">
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    {bounty.timePosted}
                  </div>
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
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-4 text-sm text-gray-400">
                    <div className="flex items-center">
                      <MessageSquare className="h-4 w-4 mr-1" />
                      {bounty.claims} proposals
                    </div>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 mr-1" />
                      {bounty.starred}
                    </div>
                  </div>
                  <Link to={`/bounty/${bounty.id}`}>
                    <Button
                      size="sm"
                      className="bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700 text-sm"
                    >
                      View Details
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-12">
          <Button
            size="lg"
            variant="outline"
            className="border-emerald-500/50 text-emerald-400 hover:bg-emerald-500/10 hover:text-emerald-300 px-8 bg-transparent"
          >
            Load More Issues
            <TrendingUp className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
