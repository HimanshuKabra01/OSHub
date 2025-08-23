import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Code, GitBranch, Bug } from "lucide-react"
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
          start: "top 90%",
          once: true,
        },
        onUpdate() {
          const value = this.targets()[0] as { val: number };
          if (stat.dataset.suffix === "%") {
            stat.innerText = value.val.toFixed(1) + "%";
          } else if (stat.dataset.suffix === "₹") {
            stat.innerText = "₹" + Math.floor(value.val).toLocaleString();
          } else {
            stat.innerText = Math.floor(value.val).toLocaleString() + "+";
          }
        },
      });
    });
  }, []);
  
  useEffect(() => {
    const originalOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  return (
    <div className="h-[calc(100vh-4rem)] overflow-hidden bg-gradient-to-br from-slate-900 via-gray-900 to-slate-900 flex flex-col">
      {/* Hero Section */}
      <section className="flex-1 flex flex-col items-center justify-center text-center relative px-4">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-900/10 to-blue-900/10 blur-3xl"></div>
        <div className="absolute top-1/4 left-1/4 w-40 h-40 sm:w-72 sm:h-72 bg-emerald-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-56 h-56 sm:w-96 sm:h-96 bg-blue-500/5 rounded-full blur-3xl"></div>
        
        <div className="max-w-4xl mx-auto relative z-10">
          <div className="mb-6">
            <Badge className="bg-gradient-to-r from-emerald-500/10 to-blue-500/10 text-emerald-300 border-emerald-500/20 mb-4">
              <Code className="h-3 w-3 mr-1" />
              Open Source Bounty Platform
            </Badge>
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-4 leading-tight">
            Learn, Compete,{" "}
            <span className="bg-gradient-to-r from-emerald-400 via-blue-400 to-emerald-400 bg-clip-text text-transparent">
              Earn
            </span>
          </h1>
          <p className="text-lg md:text-xl text-gray-300 mb-6 max-w-3xl mx-auto leading-relaxed">
            From seasoned developers to aspiring students, solve challenges, rise through the ranks, and earn bounties. Build skills, gain recognition, and make an impact in open source.
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-3 flex-wrap">
            <Link to="/browse">
              <Button
                size="lg"
                variant="outline"
                className="border-emerald-500/50 text-emerald-400 hover:bg-emerald-500/10 hover:text-emerald-300 px-6 py-3 bg-transparent text-lg w-full sm:w-auto"
              >
                <GitBranch className="mr-2 h-5 w-5" />
                Browse Issues
              </Button>
            </Link>
            <Link to="/create">
              <Button
                size="lg"
                variant="outline"
                className="border-emerald-500/50 text-emerald-400 hover:bg-emerald-500/10 hover:text-emerald-300 px-6 py-3 bg-transparent text-lg w-full sm:w-auto"
              >
                <Bug className="mr-2 h-5 w-5" />
                Post Bounty
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section - Compact for single screen */}
      <section className="py-4 px-4 sm:px-6 lg:px-8 relative z-10 flex-none">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-center">
            <div className="bg-black/20 backdrop-blur-sm rounded-lg border border-emerald-500/20 p-3">
              <div className="stat-number text-2xl font-bold text-emerald-400 font-mono" data-target="1250" data-suffix="+">0+</div>
              <div className="text-xs text-gray-300">Issues Solved</div>
            </div>
            <div className="bg-black/20 backdrop-blur-sm rounded-lg border border-blue-500/20 p-3">
              <div className="stat-number text-2xl font-bold text-blue-400 font-mono" data-target="2500000" data-suffix="₹">₹0</div>
              <div className="text-xs text-gray-300">Bounties Paid</div>
            </div>
            <div className="bg-black/20 backdrop-blur-sm rounded-lg border border-purple-500/20 p-3">
              <div className="stat-number text-2xl font-bold text-purple-400 font-mono" data-target="89.5" data-suffix="%">0%</div>
              <div className="text-xs text-gray-300">Success Rate</div>
            </div>
            <div className="bg-black/20 backdrop-blur-sm rounded-lg border border-orange-500/20 p-3">
              <div className="stat-number text-2xl font-bold text-orange-400 font-mono" data-target="500" data-suffix="+">0+</div>
              <div className="text-xs text-gray-300">Active Developers</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
