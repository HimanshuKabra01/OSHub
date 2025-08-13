import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import HomePage from "./components/HomePage"
import BrowsePage from "./components/BrowsePage"
import CreatePage from "./components/CreatePage"
import BountyDetailsPage from "./components/BountyDetailsPage"
import LoginPage from "./components/LoginPage"
import SignupPage from "./components/SignupPage"

export default App
function App() {
  return (
    <Router>
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
          <Route path="/auth/login" element={<LoginPage />} />
          <Route path="/auth/signup" element={<SignupPage />} />
        </Routes>
      </div>
    </Router>
  )
}
