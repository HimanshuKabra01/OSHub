import { motion } from "framer-motion";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function PrivacyPage() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-slate-900">
      <Navbar />

      <main className="flex-grow max-w-3xl mx-auto p-6 text-gray-200 space-y-8">
        <motion.h1
          className="text-4xl font-extrabold text-center bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Privacy Policy
        </motion.h1>

        <motion.p
          className="text-sm text-gray-400 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          Last updated: 20 August 2025
        </motion.p>

        <motion.section
          className="space-y-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            hidden: { opacity: 0, y: 30 },
            visible: { opacity: 1, y: 0 },
          }}
          transition={{ duration: 0.6 }}
        >
          <div>
            <h2 className="text-2xl font-semibold">
              1. Information We Collect
            </h2>
            <ul className="list-disc list-inside space-y-2">
              <li>
                Profile details, account information, and contributions you
                provide
              </li>
              <li>Automatically collected data (device info, logs, cookies)</li>
              <li>Information from service providers and analytics tools</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-semibold">
              2. How We Use Information
            </h2>
            <p>
              To operate and improve OSHub, enable collaboration, track issues,
              communicate updates, and comply with legal requirements.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold">
              3. How We Share Information
            </h2>
            <ul className="list-disc list-inside space-y-2">
              <li>Public contributions (issues, pull requests, comments)</li>
              <li>Service providers under strict confidentiality contracts</li>
              <li>Legal purposes where disclosure is required</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-semibold">4. Data Retention</h2>
            <p>
              Contribution history may be retained indefinitely for
              transparency. Other data is stored only as long as necessary or
              required by law.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold">5. Security</h2>
            <p>
              We implement industry-standard safeguards to protect your data,
              though no system can guarantee complete security.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold">6. Your Choices</h2>
            <p>
              You may manage your profile, adjust cookie settings, or request
              data removal where applicable.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold">7. Contact</h2>
            <p>
              For questions, visit{" "}
              <a
                href="https://hikabra.tech"
                className="text-emerald-400 underline hover:text-emerald-300"
                target="_blank"
                rel="noreferrer"
              >
                hikabra.tech
              </a>
              .
            </p>
          </div>
        </motion.section>
      </main>

      <Footer />
    </div>
  );
}
