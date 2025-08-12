import { Link } from "react-router-dom";
import { useEffect } from "react";
export default function Privacy() {
  // This will set the document title when the component mounts
  useEffect(() => {
    document.title = "Privacy Policy - OSHub";
  }, []);

  return (
    <div className="max-w-4xl mx-auto px-14 py-16 text-gray-300 ">
      <div className="mb-12">
        <h1 className="text-4xl font-bold mb-4 text-white">Privacy Policy</h1>
        <p className="text-gray-400">Last Updated: August 11, 2025</p>
      </div>

      <div className="space-y-8">
        <section>
          <h2 className="text-2xl font-semibold mb-4 text-white">1. Information We Collect</h2>
          <p className="mb-4">
            When you use OSHub, we may collect:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Account information:</strong> Username, email, and public GitHub profile data (read-only)</li>
            <li><strong>Payment details:</strong> Processed via Stripe/PayPal (we don't store full payment information)</li>
            <li><strong>Technical data:</strong> IP address, browser type, and usage patterns (using cookies)</li>
            <li><strong>Bounty activity:</strong> Records of issues, submissions, and transactions</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 text-white">2. How We Use Your Data</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>Facilitate bounty transactions between developers and sponsors</li>
            <li>Improve platform functionality and user experience</li>
            <li>Prevent fraud and enforce our <Link to="/terms" className="text-emerald-400 hover:underline">Terms of Service</Link></li>
            <li>Communicate important service updates (you can opt out)</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 text-white">3. Data Sharing & Security</h2>
          <p className="mb-2">We only share data with:</p>
          <ul className="list-disc pl-6 space-y-2 mb-4">
            <li>Payment processors (Stripe, PayPal) for transaction completion</li>
            <li>GitHub (for OAuth authentication when you connect your account)</li>
            <li>Legal authorities if required by law</li>
          </ul>
          <p>We implement industry-standard security measures including encryption and secure protocols.</p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 text-white">4. Your Rights</h2>
          <p className="mb-2">You can:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Access, update, or delete your personal data in account settings</li>
            <li>Disable cookies in your browser settings (may affect functionality)</li>
            <li>Opt out of non-essential communications</li>
            <li>Request data export or account deletion</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 text-white">5. Changes to This Policy</h2>
          <p>We may update this policy and will notify users of significant changes via email or platform notification.</p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 text-white">6. Contact Us</h2>
          <p>
            For privacy concerns, email <a href="https://www.hikabra.tech/" className="text-emerald-400 hover:underline">privacy@oshub.dev</a>.
          </p>
        </section>
      </div>
    </div>
  );
}