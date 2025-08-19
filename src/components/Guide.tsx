import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { BookOpen, Workflow, Rocket, CheckCircle2, ClipboardCheck, Coins, GitPullRequest, Search, HelpCircle } from "lucide-react"
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
      {/* Hero */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-900/10 to-blue-900/10 blur-3xl"></div>
        <div className="absolute top-1/3 left-1/4 w-72 h-72 bg-emerald-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>

        <div className="max-w-3xl mx-auto text-center relative z-10">
          <Badge className="bg-gradient-to-r from-emerald-500/10 to-blue-500/10 text-emerald-300 border-emerald-500/20 mb-4">
            <BookOpen className="h-4 w-4 mr-1" />
            Developer Guide
          </Badge>
          <h1 className="text-5xl font-bold text-white mb-6 leading-tight">
            Master the{" "}
            <span className="bg-gradient-to-r from-emerald-400 via-blue-400 to-emerald-400 bg-clip-text text-transparent">
              Bounty Workflow
            </span>
          </h1>
          <p className="text-lg text-gray-300 leading-relaxed">
            Learn how to post issues, claim bounties, and contribute effectively.
            This guide walks you through every step.
          </p>
        </div>
      </section>

      {/* Maintainer Guide */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 fade-up">
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
      <section className="py-16 px-4 sm:px-6 lg:px-8 fade-up bg-black/10 backdrop-blur-sm">
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
