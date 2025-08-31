import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import HomePage from "./components/HomePage";
import BrowsePage from "./components/BrowsePage";
import CreatePage from "./components/CreatePage";
import BountyDetailsPage from "./components/BountyDetailsPage";
import LoginPage from "./components/LoginPage";
import SignupPage from "./components/SignupPage";
import ScrollToTop from "./components/ScrollToTop";
import GuidePage from "./components/Guide";
import PrivacyPage from "./components/PrivacyPage";
import TermsPage from "./components/TermsPage";
import DocsPage from "./pages/DocsPage";
import HelpPage from "./components/HelpPage";   // ✅ your addition
import Loader from "./components/ui/loader";

function App() {
  const location = useLocation();
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    // Show loader whenever the route changes
    setLoading(true);
    const timeout = setTimeout(() => setLoading(false), 600); // adjust delay as needed
    return () => clearTimeout(timeout);
  }, [location]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-slate-900">
      {/* Loader overlay */}
      {loading && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50 transition-opacity duration-500 ease-in-out animate-fadeIn">
          <Loader />
        </div>
      )}
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Navbar />
              <HomePage />
            </>
          }
        />
        <Route
          path="/browse"
          element={
            <>
              <Navbar />
              <BrowsePage />
              <Footer />
            </>
          }
        />
        <Route
          path="/create"
          element={
            <>
              <Navbar />
              <CreatePage />
              <Footer />
            </>
          }
        />
        <Route
          path="/bounty/:id"
          element={
            <>
              <Navbar />
              <BountyDetailsPage />
              <Footer />
            </>
          }
        />
        <Route
          path="/guidelines"
          element={
            <>
              <Navbar />
              <GuidePage />
              <Footer />
            </>
          }
        />
        {/* ✅ your Help page route */}
        <Route
          path="/help"
          element={
            <>
              <HelpPage />
              <Footer />
            </>
          }
        />
        <Route
          path="/docs"
          element={
            <>
              <Navbar />
              <DocsPage />
            </>
          }
        />
        <Route path="/auth/login" element={<LoginPage />} />
        <Route path="/auth/signup" element={<SignupPage />} />
        <Route path="/privacy" element={<PrivacyPage />} />
        <Route path="/terms" element={<TermsPage />} />
      </Routes>
    </div>
  );
}

export default function AppWrapper() {
  return (
    <Router>
      <ScrollToTop />
      <App />
    </Router>
  );
}
