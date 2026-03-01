import type { Metadata } from "next";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Privacy Policy – Avantika Resume Builder",
  description: "Learn how Avantika Resume Builder collects, uses, and protects your personal information.",
};

const LAST_UPDATED = "March 1, 2026";
const BUSINESS_NAME = "Avantika Resume Builder";
const OWNER_NAME = "Mayank Gaur";
const WEBSITE = "https://avantika-resume-builder.vercel.app";
const SUPPORT_EMAIL = "support@avantika-resume-builder.com";

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-gray-50 pt-16 flex flex-col">
      <div className="max-w-4xl mx-auto px-6 py-12 flex-1 w-full">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Privacy Policy</h1>
          <p className="text-sm text-gray-500">Last updated: {LAST_UPDATED}</p>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 space-y-10">

          {/* 1. Introduction */}
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">1. Introduction</h2>
            <p className="text-gray-600 text-sm leading-relaxed">
              Welcome to <strong>{BUSINESS_NAME}</strong> ("{BUSINESS_NAME}", "we", "us", or "our"), operated by <strong>{OWNER_NAME}</strong> at <strong>{WEBSITE}</strong>. We are committed to protecting your privacy and ensuring that your personal information is handled in a safe and responsible manner. This Privacy Policy describes how we collect, use, disclose, and protect your personal information when you use our SaaS platform, website, and related services (collectively, the "Service").
            </p>
            <p className="text-gray-600 text-sm leading-relaxed mt-3">
              By accessing or using our Service, you agree to the collection and use of information in accordance with this policy. If you do not agree with any part of this Privacy Policy, please discontinue use of the Service immediately.
            </p>
          </section>

          {/* 2. Information We Collect */}
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">2. Information We Collect</h2>
            <p className="text-gray-600 text-sm leading-relaxed mb-3">We collect several types of information to provide and improve our Service:</p>

            <h3 className="text-base font-semibold text-gray-800 mb-2">2.1 Personal Information</h3>
            <ul className="list-disc list-inside text-gray-600 text-sm space-y-1.5 mb-4 ml-2">
              <li>Full name, email address, and password (for account registration)</li>
              <li>Phone number and residential/billing address (for payment processing)</li>
              <li>Profile photo and professional information entered in your resume</li>
              <li>Employment history, education, skills, and other resume content</li>
            </ul>

            <h3 className="text-base font-semibold text-gray-800 mb-2">2.2 Payment Information</h3>
            <ul className="list-disc list-inside text-gray-600 text-sm space-y-1.5 mb-4 ml-2">
              <li>Payment card details (processed securely via Razorpay — we do not store raw card data)</li>
              <li>UPI IDs, net banking information (handled directly by Razorpay)</li>
              <li>Billing address and GST details (if applicable)</li>
              <li>Transaction IDs and payment history</li>
            </ul>

            <h3 className="text-base font-semibold text-gray-800 mb-2">2.3 Usage Data</h3>
            <ul className="list-disc list-inside text-gray-600 text-sm space-y-1.5 ml-2">
              <li>IP address, browser type, and device information</li>
              <li>Pages visited, time spent on pages, and click behavior</li>
              <li>Log data and error reports</li>
              <li>Resume creation activity and feature usage patterns</li>
            </ul>
          </section>

          {/* 3. Data Usage Policy */}
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">3. How We Use Your Information</h2>
            <p className="text-gray-600 text-sm leading-relaxed mb-3">We use the collected information for the following purposes:</p>
            <ul className="list-disc list-inside text-gray-600 text-sm space-y-2 ml-2">
              <li>To create and manage your user account</li>
              <li>To provide, operate, and maintain the resume builder and related features</li>
              <li>To process subscription payments and manage billing</li>
              <li>To send transactional emails (receipts, account confirmation, password reset)</li>
              <li>To send product updates, newsletters, and promotional offers (with opt-out option)</li>
              <li>To improve our platform using aggregated, anonymized analytics</li>
              <li>To provide customer support and respond to your queries</li>
              <li>To comply with legal obligations under Indian law</li>
              <li>To detect and prevent fraud, unauthorized access, and security threats</li>
            </ul>
          </section>

          {/* 4. Payment Information Security */}
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">4. Payment Information Security</h2>
            <p className="text-gray-600 text-sm leading-relaxed mb-3">
              All payment transactions on {BUSINESS_NAME} are processed through <strong>Razorpay Software Private Limited</strong>, a PCI DSS compliant payment gateway. We do <strong>not</strong> store, transmit, or have access to your raw payment card details (card numbers, CVV, expiry dates).
            </p>
            <ul className="list-disc list-inside text-gray-600 text-sm space-y-2 ml-2">
              <li>All payment data is encrypted using <strong>256-bit SSL/TLS encryption</strong></li>
              <li>Razorpay is PCI DSS Level 1 certified — the highest level of payment security</li>
              <li>We only store anonymized transaction IDs and payment status for billing records</li>
              <li>Your UPI or card data never touches our servers</li>
            </ul>
            <p className="text-gray-600 text-sm leading-relaxed mt-3">
              For Razorpay&apos;s privacy practices, see: <a href="https://razorpay.com/privacy/" className="text-[#00bcd4] underline" target="_blank" rel="noopener noreferrer">razorpay.com/privacy</a>
            </p>
          </section>

          {/* 5. Cookies */}
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">5. Cookies and Tracking Technologies</h2>
            <p className="text-gray-600 text-sm leading-relaxed mb-3">
              We use cookies and similar tracking technologies to enhance your experience on our platform.
            </p>
            <ul className="list-disc list-inside text-gray-600 text-sm space-y-2 ml-2">
              <li><strong>Essential Cookies:</strong> Required for login sessions and core functionality</li>
              <li><strong>Analytics Cookies:</strong> Help us understand how users interact with our platform (e.g., Google Analytics)</li>
              <li><strong>Preference Cookies:</strong> Remember your settings (language, theme)</li>
              <li><strong>Marketing Cookies:</strong> Used to deliver relevant advertisements (opt-out available)</li>
            </ul>
            <p className="text-gray-600 text-sm leading-relaxed mt-3">
              You can control cookie preferences through your browser settings. Disabling essential cookies may affect platform functionality.
            </p>
          </section>

          {/* 6. Third-Party Services */}
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">6. Third-Party Services</h2>
            <p className="text-gray-600 text-sm leading-relaxed mb-3">We integrate with trusted third-party services to deliver our platform:</p>
            <ul className="list-disc list-inside text-gray-600 text-sm space-y-2 ml-2">
              <li><strong>Razorpay</strong> – Payment processing (PCI DSS compliant)</li>
              <li><strong>Google Analytics</strong> – Website usage analytics (anonymized)</li>
              <li><strong>Vercel</strong> – Hosting and infrastructure</li>
              <li><strong>OpenAI / AI Providers</strong> – AI-powered resume suggestions (no PII shared)</li>
              <li><strong>Resend / Email Service</strong> – Transactional email delivery</li>
            </ul>
            <p className="text-gray-600 text-sm leading-relaxed mt-3">
              Each third-party provider operates under their own privacy policies and is contractually obligated to protect your data. We do not sell your personal information to any third party.
            </p>
          </section>

          {/* 7. User Rights */}
          <section id="do-not-sell">
            <h2 className="text-xl font-bold text-gray-900 mb-3">7. Your Rights</h2>
            <p className="text-gray-600 text-sm leading-relaxed mb-3">As a user, you have the following rights regarding your personal data:</p>
            <ul className="list-disc list-inside text-gray-600 text-sm space-y-2 ml-2">
              <li><strong>Right to Access:</strong> Request a copy of your personal data we hold</li>
              <li><strong>Right to Rectification:</strong> Correct inaccurate or incomplete data</li>
              <li><strong>Right to Erasure:</strong> Request deletion of your account and associated data</li>
              <li><strong>Right to Portability:</strong> Export your resume data in standard formats</li>
              <li><strong>Right to Opt-Out:</strong> Unsubscribe from marketing emails at any time</li>
              <li><strong>Do Not Sell My Personal Information:</strong> We do not sell or share your personal information with third parties for their own marketing purposes</li>
            </ul>
            <p className="text-gray-600 text-sm leading-relaxed mt-3">
              To exercise any of these rights, email us at <a href={`mailto:${SUPPORT_EMAIL}`} className="text-[#00bcd4] underline">{SUPPORT_EMAIL}</a> with the subject line "Privacy Request".
            </p>
          </section>

          {/* 8. Data Protection */}
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">8. Data Protection & Retention</h2>
            <p className="text-gray-600 text-sm leading-relaxed mb-3">
              We implement industry-standard security measures to protect your personal information:
            </p>
            <ul className="list-disc list-inside text-gray-600 text-sm space-y-2 ml-2">
              <li>All data is encrypted in transit using HTTPS/TLS</li>
              <li>Passwords are hashed using bcrypt — never stored in plain text</li>
              <li>Access controls restrict who can view personal data internally</li>
              <li>Regular security audits and vulnerability assessments</li>
            </ul>
            <p className="text-gray-600 text-sm leading-relaxed mt-3">
              We retain your personal data for as long as your account is active. Upon account deletion, your data is removed within 30 days, except where we are legally required to retain records (e.g., financial transactions for tax compliance under Indian GST laws).
            </p>
            <p className="text-gray-600 text-sm leading-relaxed mt-3">
              Your data is stored on servers located in India and/or the European Union (Vercel infrastructure). We comply with applicable data protection laws including the <strong>Information Technology Act, 2000</strong> and <strong>SPDI Rules, 2011</strong>.
            </p>
          </section>

          {/* 9. Contact */}
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">9. Contact Information</h2>
            <p className="text-gray-600 text-sm leading-relaxed mb-3">
              For any privacy-related questions, data requests, or concerns, please contact our Data Controller:
            </p>
            <div className="bg-gray-50 rounded-xl p-5 text-sm text-gray-700 space-y-1.5">
              <p><strong>Business Name:</strong> {BUSINESS_NAME}</p>
              <p><strong>Owner:</strong> {OWNER_NAME}</p>
              <p><strong>Email:</strong> <a href={`mailto:${SUPPORT_EMAIL}`} className="text-[#00bcd4] underline">{SUPPORT_EMAIL}</a></p>
              <p><strong>Alt Email:</strong> <a href="mailto:mayankopportunity@gmail.com" className="text-[#00bcd4] underline">mayankopportunity@gmail.com</a></p>
              <p><strong>Website:</strong> <a href={WEBSITE} className="text-[#00bcd4] underline">{WEBSITE}</a></p>
            </div>
            <p className="text-gray-500 text-xs mt-4">
              We will respond to all legitimate privacy requests within <strong>72 hours</strong>.
            </p>
          </section>

          {/* Updates */}
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">10. Changes to This Policy</h2>
            <p className="text-gray-600 text-sm leading-relaxed">
              We may update this Privacy Policy from time to time. We will notify you of any significant changes by email or by posting a prominent notice on our website. Continued use of the Service after changes constitutes acceptance of the updated policy. We encourage you to review this page periodically.
            </p>
          </section>

        </div>
      </div>
      <Footer />
    </div>
  );
}
