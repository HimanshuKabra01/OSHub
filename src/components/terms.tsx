import {Link } from "react-router-dom"
export default function Terms(){
  return (
    <div className="max-w-4xl mx-auto px-8 py-16 text-gray-300">
      <div className="mb-12">
        <h1 className="text-4xl font-bold mb-4 text-white">Terms of Service</h1>
        <p className="text-gray-400">Effective Date: August 11, 2025</p>
      </div>

      <div className="space-y-8">
        <section>
          <h2 className="text-2xl font-semibold mb-4 text-white">1. Project Contribution</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>All contributions must be made through the OSHub platform</li>
            <li>Developers must provide original work and may not submit plagiarized solutions</li>
            <li>Project maintainers reserve the right to reject contributions that don't meet quality standards</li>
            <li>By contributing, you grant the project maintainer a license to use your work</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 text-white">2. Bounties and Payment</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>Bounty amounts are fixed at time of posting and denominated in INR</li>
            <li>Payments are processed through our secure payment partners (Stripe/PayPal)</li>
            <li>Developers receive payment after solution approval by the bounty sponsor</li>
            <li>OSHub retains a 10% platform fee on all bounty transactions</li>
            <li>Refunds are only issued if no acceptable solutions are submitted within the bounty period</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 text-white">3. Prohibited Activities</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>Creating fake bounties or fraudulent solutions</li>
            <li>Reverse engineering or hacking the platform</li>
            <li>Harassment of other users or maintainers</li>
            <li>Posting illegal or malicious code</li>
            <li>Circumventing the bounty payment system</li>
            <li>Spamming or artificially inflating contribution metrics</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 text-white">4. Responsibility of an Individual</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>Users are responsible for maintaining the confidentiality of their account</li>
            <li>You must be at least 18 years old to receive bounty payments</li>
            <li>Tax obligations for bounty earnings are the sole responsibility of the developer</li>
            <li>You agree not to hold OSHub liable for disputes between contributors and project maintainers</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 text-white">5. Dispute Resolution</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>OSHub will mediate bounty disputes at our discretion</li>
            <li>Decisions by OSHub moderators are final</li>
            <li>Repeated disputes may result in account suspension</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 text-white">6. Contact Details</h2>
          <p>
            For questions about these terms, contact us at <br />
            <Link to="mailto:legal@oshub.dev" className="text-emerald-400 hover:underline">
              legal@oshub.dev
            </Link>
          </p>
          <p className="mt-2">
            Physical correspondence address: <br />
            <span className="text-gray-400">
              OSHub Legal Department <br />
              123 Open Source Way <br />
              Banglore
            </span>
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 text-white">7. Changes to Terms</h2>
          <p>
            We may update these terms periodically. Continued use of OSHub after changes constitutes acceptance of the new terms.
          </p>
        </section>
      </div>
    </div>
  );
}