import { Button } from "@/components/ui/button"
import { GitBranch, Bug, Book } from "lucide-react"
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
        <div className="absolute top-1/4 left-1/4 w-40 h-40 bg-emerald-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-56 h-56 bg-blue-500/5 rounded-full blur-3xl"></div>
        
        <div className="max-w-4xl mx-auto relative z-10">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-4 leading-tight">
            Learn, Compete,{" "}
            <span className="bg-gradient-to-r from-emerald-400 via-blue-400 to-emerald-400 bg-clip-text text-transparent">
              Earn
            </span>
          </h1>
          <p className="text-lg md:text-xl text-gray-300 mb-6 max-w-3xl mx-auto leading-relaxed">
            From seasoned developers to aspiring students, solve challenges, rise through the ranks, and earn bounties. Build skills, gain recognition, and make an impact in open source.
          </p>
          <div className="flex justify-center space-x-3 flex-wrap">
            <Link to="/browse">
              <Button
                size="lg"
                variant="outline"
                className="border-emerald-500/50 text-emerald-400 hover:bg-emerald-500/10 hover:text-emerald-300 px-6 py-3 bg-transparent text-lg"
              >
                <GitBranch className="mr-2 h-5 w-5" />
                Browse Issues
              </Button>
            </Link>
            <Link to="/create">
              <Button
                size="lg"
                variant="outline"
                className="border-emerald-500/50 text-emerald-400 hover:bg-emerald-500/10 hover:text-emerald-300 px-6 py-3 bg-transparent text-lg"
              >
                <Bug className="mr-2 h-5 w-5" />
                Post Bounty
              </Button>
            </Link>
            <Link to="/courses">
              <Button
                size="lg"
                variant="outline"
                className="border-emerald-500/50 text-emerald-400 hover:bg-emerald-500/10 hover:text-emerald-300 px-6 py-3 bg-transparent text-lg"
              >
                <Book className="mr-2 h-5 w-5" />
                Explore Courses
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-4 px-4 sm:px-6 lg:px-8 relative z-10 flex-none">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="group">
              <div
                className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform font-mono stat-number"
                data-target="2500"
              >
                0
              </div>
              <div className="text-gray-300 text-sm md:text-base">Issues Resolved</div>
            </div>

            <div className="group">
              <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform font-mono">
                ₹1.2Cr+
              </div>
              <div className="text-gray-300 text-sm md:text-base">Bounties Distributed</div>
            </div>

            <div className="group">
              <div
                className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform font-mono stat-number"
                data-target="1200"
              >
                0
              </div>
              <div className="text-gray-300 text-sm md:text-base">Active Developers</div>
            </div>

            <div className="group">
              <div
                className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform font-mono stat-number"
                data-target="98.5"
                data-suffix="%"
              >
                0
              </div>
              <div className="text-gray-300 text-sm md:text-base">Success Rate</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
