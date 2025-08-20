import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
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

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-slate-900">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Navbar />
                <HomePage />
                <Footer />
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
          <Route path="/auth/login" element={<LoginPage />} />
          <Route path="/auth/signup" element={<SignupPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/terms" element={<TermsPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
