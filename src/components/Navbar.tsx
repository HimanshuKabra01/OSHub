import { Button } from "@/components/ui/button";
import { Terminal } from "lucide-react";
import { Link } from "react-router-dom";
import ThemeToggle from "./themeToggle";

export default function Navbar() {
  return (
    <nav className="dark:bg-black/30 backdrop-blur-lg border-b border-gray-200 dark:border-gray-800/50 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center space-x-2">
              <Terminal className="h-6 w-6 text-emerald-400" />
              <h1 className="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent dark:from-emerald-300 dark:to-blue-300">
                OSHub
              </h1>
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <Link to="/browse">
              <Button variant="ghost" className="text-gray-300 hover:bg-gray-800/50 hover:text-white">
                Browse Issues
              </Button>
            </Link>
            <Link to="/create">
              <Button variant="ghost" className="text-gray-300 hover:bg-gray-800/50 hover:text-white">
                Post Bounty
              </Button>
            </Link>
            <Link to="/auth/login">
              <Button
                variant="outline"
                className="border-emerald-500/50 text-emerald-400 hover:bg-emerald-500/10 hover:text-emerald-300 bg-transparent"
              >
                Login
              </Button>
            </Link>
            <Link to="/auth/signup">
              <Button className="bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700">
                Sign Up
              </Button>
            </Link>
            <ThemeToggle />
          </div>
        </div>
      </div>
    </nav>
  );
}
