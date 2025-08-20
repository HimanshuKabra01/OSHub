import { motion } from "framer-motion";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { Link } from "react-router-dom";

export default function TermsPage() {
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
          Terms of Service
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
            <h2 className="text-2xl font-semibold">1. Contributions</h2>
            <p>
              You retain ownership of your work but grant OSHub the right to
              host, display, and share contributions publicly. Ensure your
              submissions comply with laws and respect intellectual property.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold">2. Bounties & Payment</h2>
            <p>
              Rewards and bounties are managed transparently. OSHub is not
              liable for disputes beyond what is outlined in bounty agreements.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold">3. Prohibited Activities</h2>
            <ul className="list-disc list-inside space-y-2">
              <li>Uploading malicious code</li>
              <li>Harassment, spam, or abusive behavior</li>
              <li>Using OSHub for illegal or harmful purposes</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-semibold">4. Responsibilities</h2>
            <p>
              You are responsible for your account and activity. OSHub may
              remove content or suspend access for violations of these Terms.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold">
              5. Disclaimer & Liability
            </h2>
            <p>
              OSHub is provided “as is.” We do not guarantee uninterrupted or
              error-free service. To the maximum extent allowed by law, OSHub is
              not liable for indirect or consequential damages.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold">6. Updates to Terms</h2>
            <p>
              We may update these Terms occasionally. Continued use of OSHub
              means you accept the revised version.
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
