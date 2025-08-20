import { Terminal } from "lucide-react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-black/40 backdrop-blur-sm text-white py-12 border-t border-gray-800/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Terminal className="h-6 w-6 text-emerald-400" />
              <h3 className="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent">
                OSHub
              </h3>
            </div>
            <p className="text-gray-400">
              Professional bounty platform for open source development and
              technical problem solving.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-4 text-white">Platform</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link
                  to="/browse"
                  className="hover:text-emerald-400 transition-colors"
                >
                  Browse Issues
                </Link>
              </li>
              <li>
                <Link
                  to="/create"
                  className="hover:text-emerald-400 transition-colors"
                >
                  Post Bounty
                </Link>
              </li>
              <li>
                <Link
                  to="/leaderboard"
                  className="hover:text-emerald-400 transition-colors"
                >
                  Developer Rankings
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4 text-white">Resources</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link
                  to="/docs"
                  className="hover:text-emerald-400 transition-colors"
                >
                  API Documentation
                </Link>
              </li>
              <li>
                <Link
                  to="/guidelines"
                  className="hover:text-emerald-400 transition-colors"
                >
                  Guidelines
                </Link>
              </li>
              <li>
                <Link
                  to="/blog"
                  className="hover:text-emerald-400 transition-colors"
                >
                  Developer Blog
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4 text-white">Support</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link
                  to="/help"
                  className="hover:text-emerald-400 transition-colors"
                >
                  Help Center
                </Link>
              </li>
              <li>
                <Link
                  to="/terms"
                  className="hover:text-emerald-400 transition-colors"
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link
                  to="/privacy"
                  className="hover:text-emerald-400 transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2025 OSHub. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
