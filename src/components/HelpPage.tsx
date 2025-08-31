import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Workflow, Rocket, CheckCircle2, ClipboardCheck, Coins, GitPullRequest, Search, HelpCircle, Zap, Shield, Target, Code, Users, Award, Phone, Mail, MapPin, Printer } from "lucide-react"
import { useEffect } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
// import { Phone, Mail, MapPin, HelpCircle } from "lucide-react"

gsap.registerPlugin(ScrollTrigger)

export default function HelpPage() {
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
      <section className="relative w-full min-h-screen px-4 sm:px-8 md:px-12 py-12 mb-40 flex items-center justify-center text-center fade-up bg-transparent">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">Welcome to Help Center</h2>
            <p className="text-gray-300 text-lg">How can we help you today?</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center group">
              <div className="bg-gradient-to-br from-emerald-500/10 to-blue-500/10 rounded-lg p-6 w-20 h-20 mx-auto mb-6 flex items-center justify-center group-hover:scale-105 transition-transform duration-300 border border-emerald-500/20">
                <Code className="h-10 w-10 text-emerald-400" />
              </div>
              <h3 className="text-2xl font-semibold mb-4 text-white">How OSHub works?</h3>
              <p className="text-gray-300 leading-relaxed">
                <h6>Maintainer creates a bounty on an issue.</h6>
                <h6>Contributor picks the issue and works on it.</h6>
                <h6>Maintainer reviews and merges the Pull Request.</h6>
                <h6>The bounty is awarded to the contributor.</h6>
              </p>
            </div>
            <div className="text-center group">
              <div className="bg-gradient-to-br from-emerald-500/10 to-blue-500/10 rounded-lg p-6 w-20 h-20 mx-auto mb-6 flex items-center justify-center group-hover:scale-105 transition-transform duration-300 border border-emerald-500/20">
                <Users className="h-10 w-10 text-emerald-400" />
              </div>
              <h3 className="text-2xl font-semibold mb-4 text-white">For maintainers</h3>
              <p className="text-gray-300 leading-relaxed">
                <h6>Post your GitHub issues on OShub.</h6>
                <h6>Attach bounties to prioritize critical fixes.</h6>
                <h6>Review PRs and reward accepted solutions.</h6>
                <h6>Boost your project's growth with community contributions.</h6>
              </p>
            </div>
            <div className="text-center group">
              <div className="bg-gradient-to-br from-emerald-500/10 to-blue-500/10 rounded-lg p-6 w-20 h-20 mx-auto mb-6 flex items-center justify-center group-hover:scale-105 transition-transform duration-300 border border-emerald-500/20">
                <Award className="h-10 w-10 text-emerald-400" />
              </div>
              <h3 className="text-2xl font-semibold mb-4 text-white">For developers</h3>
              <p className="text-gray-300 leading-relaxed">
                <h6>Browse open-source issues with bounties.</h6>
                <h6>Pick issues that match your skills.</h6>
                <h6>Submit pull requests with your solution.</h6>
                <h6>Earn rewards when your PR is merged.</h6>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Us Section */}
      {/* Left Form */}
      <section className="relative w-full px-4 sm:px-8 md:px-12 mb-40 fade-up bg-black/10">
        <div className="mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">

          {/* Left Form */}
          <div className="bg-slate-800/50 rounded-2xl p-6">
            <h2 className="text-3xl text-center text-white font-bold mb-6">Get in Touch</h2>
            <form className="space-y-5">
              <div>
                <div className="grid grid-cols-1 md: grid-cols-2 gap-4">
                  <input type="text" placeholder="First Name" className="w-full px-4 py-4 rounded-lg text-white border border-gray-700 bg-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"></input>
                  <input type="text" placeholder="Last Name" className="w-full px-4 py-4 rounded-lg text-white border border-gray-700 bg-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"></input>
                </div>
              </div>
              <input type="email" placeholder="Your email" className="w-full px-4 py-4 rounded-lg  text-white border border-gray-700 bg-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"></input>
              <input type="text" placeholder="Your phone" className="w-full px-4 py-4 rounded-lg  text-white border border-gray-700 bg-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"></input>
              <textarea placeholder="Type your issue here" rows={4} className="input-style w-full px-4 py-4 rounded-lg  text-white border border-gray-700 bg-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"></textarea>
             
              <div className="flex justify-center">
                <button type="submit" className="px-4 py-2 rounded-lg font-semi-bold border border-gray-700 bg-emerald-500 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500">Submit</button>
              </div>
            </form>
          </div>


          {/* Right Contact Us info */}
          <div className="flex flex-col mt-4 space-y-6 ml-6">
            <h2 className="text-2xl font-semi-bold text-white">Visit OSHub</h2>
            <p className="text-gray-300 ">We’re available Monday to Friday, 9:00 AM – 6:00 PM IST. Reach out anytime! We usually respond within 24 hours. For urgent queries, call our toll-free number. Weekend support is limited to email only.</p>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <Phone className="h-6 w-6 text-emerald-400" />
                <div>
                  <p className="text-gray-300 text-small">Toll-Free</p>
                  <a href="tel:18001234567" className="text-gray-300 hover:text-emerald-400">1800-123-4567</a>


                </div>

              </div>

              <div className="flex items-center gap-4">
                <Mail className="h-6 w-6 text-emerald-400" />
                <div>
                  <p className="text-gray-300 text-small">Email</p>
                  <a href="mailto:support@oshub.dev" className="text-gray-300 hover:text-emerald-400">support@oshub.dev</a>
                </div>

              </div>

              <div className="flex items-center gap-4">
                <Printer className="h-6 w-6 text-emerald-400" />
                <div>
                  <p className="text-gray-300 text-small">Fax</p>
                  <a href="fax:+911234567890" className="text-gray-300 hover:text-emerald-400">+91-123-456-7890</a>

                </div>

              </div>

              <div className="flex items-center gap-4">
                <MapPin className="h-6 w-6 text-emerald-400" />
                <div>
                  <p className="text-gray-300 text-small">Address</p>
                  <a href="https://www.google.com/maps?q=123+OSHub+Street,+Open+Source+City" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-emerald-400">
              123 OSHub Street, Open Source City
            </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
