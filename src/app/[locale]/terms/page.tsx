import type { Metadata } from "next";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Terms & Conditions – Avantika Resume Builder",
  description: "Read the Terms and Conditions governing your use of Avantika Resume Builder.",
};

const LAST_UPDATED = "March 1, 2026";
const BUSINESS_NAME = "Avantika Resume Builder";
const OWNER_NAME = "Mayank Gaur";
const WEBSITE = "https://avantika-resume-builder.vercel.app";
const SUPPORT_EMAIL = "support@avantika-resume-builder.com";

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gray-50 pt-16 flex flex-col">
      <div className="max-w-4xl mx-auto px-6 py-12 flex-1 w-full">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Terms &amp; Conditions</h1>
          <p className="text-sm text-gray-500">Last updated: {LAST_UPDATED}</p>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 space-y-10">

          {/* 1. Acceptance */}
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">1. Acceptance of Terms</h2>
            <p className="text-gray-600 text-sm leading-relaxed">
              By accessing or using <strong>{BUSINESS_NAME}</strong> (the "Service"), available at <strong>{WEBSITE}</strong>, you acknowledge that you have read, understood, and agree to be legally bound by these Terms &amp; Conditions ("Terms") and our Privacy Policy. These Terms constitute a legally binding agreement between you ("User", "you") and <strong>{OWNER_NAME}</strong>, the operator of {BUSINESS_NAME}.
            </p>
            <p className="text-gray-600 text-sm leading-relaxed mt-3">
              If you do not agree to these Terms, you must not access or use the Service. We reserve the right to update these Terms at any time. Continued use of the Service after updates constitutes acceptance.
            </p>
          </section>

          {/* 2. Eligibility */}
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">2. User Eligibility</h2>
            <p className="text-gray-600 text-sm leading-relaxed mb-3">To use this Service, you must:</p>
            <ul className="list-disc list-inside text-gray-600 text-sm space-y-2 ml-2">
              <li>Be at least <strong>18 years of age</strong> (or the legal age of majority in your jurisdiction)</li>
              <li>Have the legal capacity to enter into a binding contract</li>
              <li>Not be prohibited from receiving services under applicable laws (including Indian law)</li>
              <li>Provide accurate and truthful registration information</li>
            </ul>
            <p className="text-gray-600 text-sm leading-relaxed mt-3">
              Use by minors under the supervision of a parent or legal guardian is permitted only with explicit parental consent.
            </p>
          </section>

          {/* 3. Account Registration */}
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">3. Account Registration</h2>
            <p className="text-gray-600 text-sm leading-relaxed mb-3">When registering for an account, you agree to:</p>
            <ul className="list-disc list-inside text-gray-600 text-sm space-y-2 ml-2">
              <li>Provide accurate, current, and complete information during registration</li>
              <li>Maintain and promptly update your account information</li>
              <li>Keep your password confidential and secure</li>
              <li>Accept responsibility for all activities that occur under your account</li>
              <li>Immediately notify us of any unauthorized account access at <a href={`mailto:${SUPPORT_EMAIL}`} className="text-[#00bcd4] underline">{SUPPORT_EMAIL}</a></li>
              <li>Not share your login credentials with any other person</li>
            </ul>
            <p className="text-gray-600 text-sm leading-relaxed mt-3">
              We reserve the right to suspend or terminate accounts that provide false information or violate these Terms.
            </p>
          </section>

          {/* 4. Subscription Plans */}
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">4. Subscription Plans</h2>
            <p className="text-gray-600 text-sm leading-relaxed mb-3">
              {BUSINESS_NAME} offers the following subscription tiers:
            </p>
            <div className="space-y-4">
              <div className="bg-gray-50 rounded-xl p-4">
                <p className="text-sm font-bold text-gray-800 mb-1">Free Plan</p>
                <p className="text-sm text-gray-600">Access to basic features with limited templates and 1 resume. No payment required.</p>
              </div>
              <div className="bg-cyan-50 rounded-xl p-4">
                <p className="text-sm font-bold text-gray-800 mb-1">Pro Plan – ₹499/month or ₹3,994/year</p>
                <p className="text-sm text-gray-600">Unlimited resume downloads, AI optimization, ATS Score Analysis, Job Tracker, and priority support. Billed monthly or annually.</p>
              </div>
              <div className="bg-purple-50 rounded-xl p-4">
                <p className="text-sm font-bold text-gray-800 mb-1">Premium Plan – ₹999/month or ₹7,990/year</p>
                <p className="text-sm text-gray-600">All Pro features plus Advanced AI Interview Coach, 1-on-1 Resume Review, LinkedIn Optimizer, and premium templates.</p>
              </div>
            </div>
            <p className="text-gray-600 text-sm leading-relaxed mt-3">
              All prices are in Indian Rupees (INR) and are inclusive of applicable GST. Subscription features may be modified with reasonable notice.
            </p>
          </section>

          {/* 5. Payment Obligations */}
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">5. Payment Obligations</h2>
            <ul className="list-disc list-inside text-gray-600 text-sm space-y-2 ml-2">
              <li>Paid subscriptions are billed at the start of each billing cycle (monthly or annually)</li>
              <li>All payments are processed securely via <strong>Razorpay</strong></li>
              <li>By subscribing, you authorize us to charge your selected payment method on a recurring basis</li>
              <li>If a payment fails, we may retry the charge and/or suspend access to paid features</li>
              <li>You are responsible for any taxes applicable to your purchase in your jurisdiction</li>
              <li>Prices are subject to change with 30 days advance notice via email</li>
              <li>Annual plans are billed upfront for the full year</li>
            </ul>
          </section>

          {/* 6. User Responsibilities */}
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">6. User Responsibilities</h2>
            <p className="text-gray-600 text-sm leading-relaxed mb-3">You agree to use the Service responsibly and lawfully. You are solely responsible for:</p>
            <ul className="list-disc list-inside text-gray-600 text-sm space-y-2 ml-2">
              <li>The accuracy of all content you enter into your resume or profile</li>
              <li>Ensuring your resume content does not infringe on any third-party rights</li>
              <li>Maintaining the security of your account credentials</li>
              <li>Complying with all applicable laws in your jurisdiction</li>
              <li>Using the Service only for lawful, personal career-building purposes</li>
            </ul>
          </section>

          {/* 7. Intellectual Property */}
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">7. Intellectual Property Rights</h2>
            <p className="text-gray-600 text-sm leading-relaxed mb-3">
              The Service and its original content, features, templates, design, and functionality are and will remain the exclusive property of <strong>{OWNER_NAME}</strong> and {BUSINESS_NAME}. Our trademarks and trade dress may not be used in connection with any product or service without prior written consent.
            </p>
            <p className="text-gray-600 text-sm leading-relaxed">
              You retain ownership of the personal content you create (your resume data). By using the Service, you grant us a limited, non-exclusive license to store and process your content solely to deliver the Service to you.
            </p>
          </section>

          {/* 8. Prohibited Activities */}
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">8. Prohibited Activities</h2>
            <p className="text-gray-600 text-sm leading-relaxed mb-3">You must not:</p>
            <ul className="list-disc list-inside text-gray-600 text-sm space-y-2 ml-2">
              <li>Use the Service for any unlawful purpose or in violation of any regulations</li>
              <li>Attempt to gain unauthorized access to any part of the Service or its infrastructure</li>
              <li>Reverse engineer, decompile, or disassemble any part of the platform</li>
              <li>Scrape, crawl, or extract data from the Service using automated tools</li>
              <li>Upload malicious code, viruses, or any harmful material</li>
              <li>Impersonate any person or entity, or misrepresent your affiliation</li>
              <li>Create multiple accounts to circumvent Free plan limitations</li>
              <li>Resell, redistribute, or sublicense access to the Service without written permission</li>
              <li>Use the Service to generate content that is fraudulent, defamatory, or illegal</li>
            </ul>
            <p className="text-gray-600 text-sm leading-relaxed mt-3">
              Violation of these prohibitions may result in immediate account termination and legal action.
            </p>
          </section>

          {/* 9. Cancellation Policy */}
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">9. Cancellation Policy</h2>
            <p className="text-gray-600 text-sm leading-relaxed mb-3">
              You may cancel your paid subscription at any time from <strong>Settings &gt; Billing</strong> in your account dashboard.
            </p>
            <ul className="list-disc list-inside text-gray-600 text-sm space-y-2 ml-2">
              <li>Upon cancellation, your subscription remains active until the end of the current paid billing period</li>
              <li>You will not be charged for the next billing cycle after cancellation</li>
              <li>Your account reverts to the Free plan at the end of the billing period</li>
              <li>Cancellation does not automatically trigger a refund — see our <a href="/refund-policy" className="text-[#00bcd4] underline">Refund Policy</a></li>
              <li>We reserve the right to cancel accounts that violate these Terms without a refund</li>
            </ul>
          </section>

          {/* 10. Limitation of Liability */}
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">10. Limitation of Liability</h2>
            <p className="text-gray-600 text-sm leading-relaxed mb-3">
              To the fullest extent permitted by applicable law:
            </p>
            <ul className="list-disc list-inside text-gray-600 text-sm space-y-2 ml-2">
              <li>The Service is provided on an "as is" and "as available" basis without warranties of any kind</li>
              <li>We do not guarantee that the Service will be uninterrupted, error-free, or free of viruses</li>
              <li>We are not liable for any indirect, incidental, special, consequential, or punitive damages</li>
              <li>Our total liability to you shall not exceed the amount paid by you in the last 3 months</li>
              <li>We are not responsible for employment outcomes resulting from use of our resume tools</li>
            </ul>
            <p className="text-gray-600 text-sm leading-relaxed mt-3">
              Some jurisdictions do not allow limitations on implied warranties, so the above limitations may not fully apply to you.
            </p>
          </section>

          {/* 11. Governing Law */}
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">11. Governing Law &amp; Dispute Resolution</h2>
            <p className="text-gray-600 text-sm leading-relaxed mb-3">
              These Terms are governed by the laws of <strong>India</strong>, without regard to conflict of law provisions. Any disputes arising from or relating to these Terms or the Service shall be subject to the exclusive jurisdiction of the courts located in <strong>Bengaluru, Karnataka, India</strong>.
            </p>
            <p className="text-gray-600 text-sm leading-relaxed">
              Before initiating legal proceedings, we encourage you to contact us at <a href={`mailto:${SUPPORT_EMAIL}`} className="text-[#00bcd4] underline">{SUPPORT_EMAIL}</a> or <a href="mailto:mayankopportunity@gmail.com" className="text-[#00bcd4] underline">mayankopportunity@gmail.com</a> to resolve disputes amicably within 30 days.
            </p>
          </section>

          {/* 12. Contact */}
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">12. Contact Us</h2>
            <p className="text-gray-600 text-sm leading-relaxed mb-3">
              For any questions about these Terms &amp; Conditions, please contact:
            </p>
            <div className="bg-gray-50 rounded-xl p-5 text-sm text-gray-700 space-y-1.5">
              <p><strong>Business Name:</strong> {BUSINESS_NAME}</p>
              <p><strong>Owner:</strong> {OWNER_NAME}</p>
              <p><strong>Email:</strong> <a href={`mailto:${SUPPORT_EMAIL}`} className="text-[#00bcd4] underline">{SUPPORT_EMAIL}</a></p>
              <p><strong>Alt Email:</strong> <a href="mailto:mayankopportunity@gmail.com" className="text-[#00bcd4] underline">mayankopportunity@gmail.com</a></p>
              <p><strong>Website:</strong> <a href={WEBSITE} className="text-[#00bcd4] underline">{WEBSITE}</a></p>
            </div>
          </section>

        </div>
      </div>
      <Footer />
    </div>
  );
}
