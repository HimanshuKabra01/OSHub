import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Workflow, Rocket, CheckCircle2, ClipboardCheck, Coins, GitPullRequest, Search, HelpCircle, Zap, Shield, Target, Code, Users, Award } from "lucide-react"
import { useEffect } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export default function GuidePage() {
  useEffect(() => {
    gsap.utils.toArray<HTMLElement>(".fade-up").forEach((el, i) => {
      gsap.fromTo(
        el,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: i * 0.2,
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            once: true,
          },
        }
      )
    })
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-slate-900">
      <section className="relative w-full min-h-screen px-4 sm:px-8 md:px-12 py-12 flex items-center justify-center text-center fade-up">
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

      <section className="relative w-full min-h-screen px-4 sm:px-8 md:px-12 py-12 flex items-center justify-center text-center bg-black/10">
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

      {/* Maintainer Guide */}
      <section className="relative w-full min-h-screen px-4 sm:px-8 md:px-12 py-12 flex items-center justify-center text-center fade-up">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">Maintainer’s Guide</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { icon: Workflow, title: "Post an Issue", desc: "Create a new issue describing the task clearly with labels." },
              { icon: Coins, title: "Set a Bounty", desc: "Define a fair reward based on complexity and urgency." },
              { icon: GitPullRequest, title: "Review Submissions", desc: "Evaluate PRs carefully, give feedback, and ensure quality." },
              { icon: CheckCircle2, title: "Release Reward", desc: "Once merged, approve and release the bounty securely." },
            ].map((step, i) => (
              <Card key={i} className="bg-gray-800/40 border-gray-700/50 backdrop-blur-sm hover:border-emerald-500/30 transition">
                <CardHeader className="flex items-center gap-3">
                  <step.icon className="h-8 w-8 text-emerald-400" />
                  <CardTitle className="text-lg text-white">{step.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-400">{step.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contributor Guide */}
      <section className="relative w-full min-h-screen px-4 sm:px-8 md:px-12 py-12 flex items-center justify-center text-center bg-black/10">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">Contributor’s Guide</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { icon: Search, title: "Browse Issues", desc: "Explore open bounties and pick one that matches your skills." },
              { icon: ClipboardCheck, title: "Claim the Task", desc: "Comment or follow project rules to get assigned officially." },
              { icon: Rocket, title: "Submit Your PR", desc: "Work on a fork, push changes, and open a pull request." },
              { icon: Coins, title: "Earn Rewards", desc: "After approval, receive the bounty directly to your wallet." },
            ].map((step, i) => (
              <Card key={i} className="bg-gray-800/40 border-gray-700/50 backdrop-blur-sm hover:border-blue-500/30 transition">
                <CardHeader className="flex items-center gap-3">
                  <step.icon className="h-8 w-8 text-blue-400" />
                  <CardTitle className="text-lg text-white">{step.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-400">{step.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 fade-up">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">FAQ</h2>
          <div className="space-y-6 text-center">
            {[
              { q: "How do I set the right bounty amount?", a: "Estimate based on complexity, time required, and importance of the issue." },
              { q: "Can multiple people claim the same issue?", a: "Usually no — but maintainers may allow multiple PRs and choose the best one." },
              { q: "How do contributors get paid?", a: "Once the PR is merged, the maintainer approves the payout and bounty is released." },
              { q: "What if my PR is rejected?", a: "You can improve it per feedback or pick another open issue." },
            ].map((faq, i) => (
              <Card key={i} className="bg-gray-800/40 border-gray-700/50 backdrop-blur-sm hover:border-gray-600/40 transition">
                <CardHeader className="flex items-center gap-3">
                  <HelpCircle className="h-6 w-6 text-emerald-400" />
                  <CardTitle className="text-white">{faq.q}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-400">{faq.a}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
