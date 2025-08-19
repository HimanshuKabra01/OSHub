import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Code, IndianRupee, Users, Clock, Award, Zap, Target, Shield, Terminal, GitBranch, Bug } from "lucide-react"
import { Link } from "react-router-dom"
import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);


export default function HomePage() {
  useEffect(() => {
    const stats = document.querySelectorAll<HTMLElement>(".stat-number");

    stats.forEach((stat) => {
      if (stat.dataset.static === "true") return;
      const target = parseFloat(stat.dataset.target || "0");

      gsap.to({ val: 0 }, {
        val: target,
        duration: 2,
        ease: "power1.out",
        scrollTrigger: {
          trigger: stat,
          start: "top 80%",
          once: true, // animation triggers only once
        },
        onUpdate() {
          const value = this.targets()[0] as { val: number };
          if (stat.dataset.suffix === "%") {
            stat.innerText = value.val.toFixed(1) + "%";
          } else if (stat.dataset.suffix === "₹") {
            stat.innerText = "₹" + Math.floor(value.val).toLocaleString();
          } else {
            stat.innerText = Math.floor(value.val).toLocaleString()  + "+";
          }
        },
      });
    });
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-slate-900">
      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-900/10 to-blue-900/10 blur-3xl"></div>
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-emerald-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="mb-6">
            <Badge className="bg-gradient-to-r from-emerald-500/10 to-blue-500/10 text-emerald-300 border-emerald-500/20 mb-4">
              <Code className="h-3 w-3 mr-1" />
              Open Source Bounty Platform
            </Badge>
          </div>
          <h1 className="text-6xl font-bold text-white mb-6 leading-tight">
            Code Solutions,{" "}
            <span className="bg-gradient-to-r from-emerald-400 via-blue-400 to-emerald-400 bg-clip-text text-transparent">
              Earn Bounties
            </span>
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed">
            A professional platform connecting developers with technical challenges. Contribute to open source projects,
            solve complex problems, and get rewarded for your expertise.
          </p>
          <div className="flex justify-center space-x-4">
            <Link to="/browse">
              <Button
                size="lg"
                className="bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700 text-white px-8 py-4 text-lg"
              >
                <GitBranch className="mr-2 h-5 w-5" />
                Browse Issues
              </Button>
            </Link>
            <Link to="/create">
              <Button
                size="lg"
                variant="outline"
                className="border-emerald-500/50 text-emerald-400 hover:bg-emerald-500/10 hover:text-emerald-300 px-8 py-4 text-lg bg-transparent"
              >
                <Bug className="mr-2 h-5 w-5" />
                Post Bounty
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Bounties */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-black/10 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">Active Bounties</h2>
            <p className="text-gray-300 text-lg">High-priority issues seeking expert developers</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "Memory Leak in React useEffect Hook",
                description: "Production memory leak causing performance degradation in dashboard component",
                bounty: "₹12,000",
                language: "React",
                difficulty: "Medium",
                timePosted: "2 hours ago",
                priority: "High",
              },
              {
                title: "Database Query Optimization",
                description: "PostgreSQL queries timing out on large datasets, need indexing strategy",
                bounty: "₹25,000",
                language: "PostgreSQL",
                difficulty: "Hard",
                timePosted: "1 day ago",
                priority: "Critical",
              },
              {
                title: "Mobile Responsive Layout Bug",
                description: "CSS Grid layout breaking on viewport widths below 768px",
                bounty: "₹6,000",
                language: "CSS",
                difficulty: "Easy",
                timePosted: "3 hours ago",
                priority: "Medium",
              },
            ].map((bounty, index) => (
              <Card
                key={index}
                className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 border-gray-700/50 hover:border-emerald-500/30 transition-all duration-300 hover:shadow-2xl hover:shadow-emerald-500/10 backdrop-blur-sm group"
              >
                <CardHeader>
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex items-center space-x-2">
                      <Badge variant="secondary" className="bg-gray-700 text-gray-300 font-mono text-xs">
                        {bounty.language}
                      </Badge>
                      {bounty.priority === "Critical" && (
                        <Badge className="bg-gradient-to-r from-red-600 to-red-500 text-white text-xs">CRITICAL</Badge>
                      )}
                      {bounty.priority === "High" && (
                        <Badge className="bg-gradient-to-r from-orange-600 to-orange-500 text-white text-xs">
                          HIGH
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center text-emerald-400 font-bold text-lg font-mono">
                      <IndianRupee className="h-4 w-4 mr-1" />
                      {bounty.bounty.replace("₹", "")}
                    </div>
                  </div>
                  <CardTitle className="text-white text-lg group-hover:text-emerald-300 transition-colors font-semibold">
                    {bounty.title}
                  </CardTitle>
                  <CardDescription className="text-gray-400 text-sm leading-relaxed">
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
                  <Button className="w-full bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700 text-sm">
                    View Issue
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">Development Workflow</h2>
            <p className="text-gray-300 text-lg">Professional bounty-driven development process</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center group">
              <div className="bg-gradient-to-br from-emerald-500/10 to-blue-500/10 rounded-lg p-6 w-20 h-20 mx-auto mb-6 flex items-center justify-center group-hover:scale-105 transition-transform duration-300 border border-emerald-500/20">
                <Code className="h-10 w-10 text-emerald-400" />
              </div>
              <h3 className="text-2xl font-semibold mb-4 text-white">1. Issue Specification</h3>
              <p className="text-gray-300 leading-relaxed">
                Define technical requirements, acceptance criteria, and bounty amount. Provide comprehensive
                documentation and reproduction steps for developers.
              </p>
            </div>
            <div className="text-center group">
              <div className="bg-gradient-to-br from-emerald-500/10 to-blue-500/10 rounded-lg p-6 w-20 h-20 mx-auto mb-6 flex items-center justify-center group-hover:scale-105 transition-transform duration-300 border border-emerald-500/20">
                <Users className="h-10 w-10 text-emerald-400" />
              </div>
              <h3 className="text-2xl font-semibold mb-4 text-white">2. Developer Assignment</h3>
              <p className="text-gray-300 leading-relaxed">
                Experienced developers review requirements, submit proposals, and get assigned based on expertise and
                track record. Transparent selection process.
              </p>
            </div>
            <div className="text-center group">
              <div className="bg-gradient-to-br from-emerald-500/10 to-blue-500/10 rounded-lg p-6 w-20 h-20 mx-auto mb-6 flex items-center justify-center group-hover:scale-105 transition-transform duration-300 border border-emerald-500/20">
                <Award className="h-10 w-10 text-emerald-400" />
              </div>
              <h3 className="text-2xl font-semibold mb-4 text-white">3. Solution & Payment</h3>
              <p className="text-gray-300 leading-relaxed">
                Code review, testing, and validation process. Automatic bounty release upon successful merge and
                acceptance. Quality-assured deliverables.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-black/10 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">Platform Features</h2>
            <p className="text-gray-300 text-lg">Built for professional software development</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Zap,
                title: "Rapid Deployment",
                description:
                  "Fast-track critical fixes with priority queuing. Get production issues resolved within hours by expert developers.",
              },
              {
                icon: Shield,
                title: "Escrow Protection",
                description:
                  "Secure payment system with milestone-based releases. Funds held in escrow until successful delivery and acceptance.",
              },
              {
                icon: Target,
                title: "Code Quality Assurance",
                description:
                  "Mandatory code review, testing, and documentation. All solutions meet industry standards and best practices.",
              },
            ].map((feature, index) => (
              <Card
                key={index}
                className="bg-gradient-to-br from-gray-800/30 to-gray-900/30 border-gray-700/50 hover:border-emerald-500/30 transition-all duration-300 backdrop-blur-sm"
              >
                <CardContent className="p-6 text-center">
                  <feature.icon className="h-12 w-12 text-emerald-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
                  <p className="text-gray-400 leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div className="group">
            <div
              className="text-4xl font-bold bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform font-mono stat-number"
              data-target="2500"
            >
              0
            </div>
            <div className="text-gray-300 text-sm">Issues Resolved</div>
          </div>

          <div className="group">
            <div
              className="text-4xl font-bold bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform font-mono"
            >
              ₹1.2Cr+
            </div>
            <div className="text-gray-300 text-sm">Bounties Distributed</div>
          </div>

          <div className="group">
            <div
              className="text-4xl font-bold bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform font-mono stat-number"
              data-target="1200"
            >
              0
            </div>
            <div className="text-gray-300 text-sm">Active Developers</div>
          </div>

          <div className="group">
            <div
              className="text-4xl font-bold bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform font-mono stat-number"
              data-target="98.5"
              data-suffix="%"
            >
              0
            </div>
            <div className="text-gray-300 text-sm">Success Rate</div>
          </div>
        </div>
      </div>
    </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-emerald-900/20 to-blue-900/20 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-6">Join the Developer Community</h2>
          <p className="text-xl text-gray-300 mb-8">
            Connect with professional developers, contribute to open source, and earn competitive bounties
          </p>
          <div className="flex justify-center space-x-4">
            <Link to="/auth/signup">
              <Button
                size="lg"
                className="bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700 text-white px-8 py-4 text-lg"
              >
                <Terminal className="mr-2 h-5 w-5" />
                Start Contributing
              </Button>
            </Link>
            <Link to="/browse">
              <Button
                size="lg"
                variant="outline"
                className="border-emerald-500/50 text-emerald-400 hover:bg-emerald-500/10 hover:text-emerald-300 px-8 py-4 text-lg bg-transparent"
              >
                <Code className="mr-2 h-5 w-5" />
                Explore Issues
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
