import type { Metadata } from "next";
import { Link } from "@/i18n/navigation";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Refund Policy – Avantika Resume Builder",
  description: "Our refund policy for Avantika Resume Builder subscriptions. Learn how to request a refund within 7 days.",
};

const LAST_UPDATED = "March 1, 2026";
const BUSINESS_NAME = "Avantika Resume Builder";
const OWNER_NAME = "Mayank Gaur";
const SUPPORT_EMAIL = "support@avantika-resume-builder.com";
const WEBSITE = "https://avantika-resume-builder.vercel.app";

export default function RefundPolicyPage() {
  return (
    <div className="min-h-screen bg-gray-50 pt-16 flex flex-col">
      <div className="max-w-4xl mx-auto px-6 py-12 flex-1 w-full">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Refund Policy</h1>
          <p className="text-sm text-gray-500">Last updated: {LAST_UPDATED}</p>
        </div>

        {/* Quick Summary Banner */}
        <div className="bg-[#00bcd4]/10 border border-[#00bcd4]/30 rounded-2xl p-5 mb-8">
          <p className="text-sm font-semibold text-[#007b8f]">
            Quick Summary: We offer a <strong>7-day refund window</strong> on all new subscriptions. Refunds are processed within 5–7 business days back to your original payment method.
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 space-y-10">

          {/* 1. Introduction */}
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">1. Introduction</h2>
            <p className="text-gray-600 text-sm leading-relaxed">
              At <strong>{BUSINESS_NAME}</strong>, operated by <strong>{OWNER_NAME}</strong>, we want you to be completely satisfied with your subscription. This Refund Policy explains your rights and the process to request a refund for paid subscriptions. All payments are processed via <strong>Razorpay</strong>. Please read this policy carefully before making a purchase.
            </p>
          </section>

          {/* 2. Refund Eligibility */}
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">2. Refund Eligibility</h2>
            <p className="text-gray-600 text-sm leading-relaxed mb-3">You are eligible for a full refund if <strong>all</strong> of the following conditions are met:</p>
            <ul className="list-disc list-inside text-gray-600 text-sm space-y-2 ml-2">
              <li>Your refund request is submitted within <strong>7 calendar days</strong> of your initial subscription payment</li>
              <li>You have not downloaded more than <strong>3 resumes</strong> using the paid plan features</li>
              <li>Your account is in good standing (not suspended for policy violations)</li>
              <li>This is your first refund request on this account</li>
              <li>The request is made directly by the account holder</li>
            </ul>
          </section>

          {/* 3. Request Timeline */}
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">3. Refund Request Timeline</h2>
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-4">
              <p className="text-sm font-semibold text-amber-800">
                Refund Window: <strong>7 days</strong> from the date of subscription payment
              </p>
            </div>
            <ul className="list-disc list-inside text-gray-600 text-sm space-y-2 ml-2">
              <li>Requests submitted within 7 days of payment will be honored in full</li>
              <li>Requests submitted after 7 days are not eligible for a refund, except in exceptional circumstances (technical failure, duplicate charge)</li>
              <li>Renewal charges: Refund requests for renewal billing cycles must be submitted within <strong>3 days</strong> of the renewal date</li>
              <li>Annual plan purchases: Eligible for refund only within the first 7 days — partial refunds for remaining months are not offered</li>
            </ul>
          </section>

          {/* 4. Digital Services */}
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">4. Digital Services Refund Rules</h2>
            <p className="text-gray-600 text-sm leading-relaxed mb-3">
              As a digital SaaS product, the following rules apply:
            </p>
            <ul className="list-disc list-inside text-gray-600 text-sm space-y-2 ml-2">
              <li>Access to paid features is granted <strong>immediately upon payment confirmation</strong></li>
              <li>Because of the instant digital delivery nature of the service, refunds are discretionary after significant use</li>
              <li>AI-generated content (resume suggestions, cover letters) is considered "consumed" upon generation</li>
              <li>Template access and downloads are logged and considered in refund evaluations</li>
              <li>Refunds will not be issued for dissatisfaction with AI-generated content quality alone — please contact support first</li>
            </ul>
          </section>

          {/* 5. Cancellation Process */}
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">5. Subscription Cancellation Process</h2>
            <p className="text-gray-600 text-sm leading-relaxed mb-4">
              You can cancel your subscription at any time without contacting support:
            </p>
            <ol className="list-decimal list-inside text-gray-600 text-sm space-y-2 ml-2">
              <li>Log in to your {BUSINESS_NAME} account</li>
              <li>Go to <strong>Settings &gt; Billing</strong></li>
              <li>Click <strong>"Cancel Subscription"</strong></li>
              <li>Confirm the cancellation in the dialog box</li>
              <li>You will receive a confirmation email immediately</li>
            </ol>
            <p className="text-gray-600 text-sm leading-relaxed mt-3">
              After cancellation, your paid plan remains active until the end of the current billing period. You will then be automatically downgraded to the Free plan. Cancellation alone does not initiate a refund — you must also submit a refund request.
            </p>
          </section>

          {/* 6. Non-Refundable Cases */}
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">6. Non-Refundable Cases</h2>
            <p className="text-gray-600 text-sm leading-relaxed mb-3">Refunds will <strong>not</strong> be issued in the following situations:</p>
            <ul className="list-disc list-inside text-gray-600 text-sm space-y-2 ml-2">
              <li>Refund request submitted after the 7-day window (except duplicate charges)</li>
              <li>Account suspended or terminated for violating our Terms &amp; Conditions</li>
              <li>Failure to cancel before the next billing cycle begins</li>
              <li>Change of mind after extensive use of paid features (more than 3 downloads)</li>
              <li>Issues caused by third-party services (internet outages, device issues)</li>
              <li>Requests for partial refunds on annual plans mid-cycle</li>
              <li>Promotional or discounted plan subscriptions (clearly marked at purchase)</li>
              <li>Second or subsequent refund requests from the same account</li>
            </ul>
          </section>

          {/* 7. Processing Time */}
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">7. Refund Processing Time</h2>
            <p className="text-gray-600 text-sm leading-relaxed mb-3">Once your refund is approved:</p>
            <div className="overflow-hidden rounded-xl border border-gray-100">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-100">
                    <th className="text-left px-5 py-3 font-semibold text-gray-700">Payment Method</th>
                    <th className="text-left px-5 py-3 font-semibold text-gray-700">Processing Time</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["Credit / Debit Card", "5–7 business days"],
                    ["UPI", "2–3 business days"],
                    ["Net Banking", "5–7 business days"],
                    ["Wallet (Paytm, etc.)", "2–3 business days"],
                  ].map(([method, time]) => (
                    <tr key={method} className="border-b border-gray-50 last:border-0">
                      <td className="px-5 py-3 text-gray-700">{method}</td>
                      <td className="px-5 py-3 text-gray-600">{time}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-gray-500 text-xs mt-3">
              Refund timelines are subject to your bank or payment provider&apos;s processing schedule. Razorpay initiates the refund on our behalf upon approval.
            </p>
          </section>

          {/* 8. How to Request */}
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">8. How to Request a Refund</h2>
            <p className="text-gray-600 text-sm leading-relaxed mb-4">
              To request a refund, email us at <a href={`mailto:${SUPPORT_EMAIL}`} className="text-[#00bcd4] underline">{SUPPORT_EMAIL}</a> with the following details:
            </p>
            <div className="bg-gray-50 rounded-xl p-5 text-sm text-gray-700 space-y-1.5">
              <p><strong>Subject:</strong> Refund Request – [Your Registered Email]</p>
              <p><strong>Include in the email:</strong></p>
              <ul className="list-disc list-inside ml-2 space-y-1 text-gray-600">
                <li>Your full name and registered email address</li>
                <li>Razorpay payment ID or transaction reference number</li>
                <li>Date of payment</li>
                <li>Plan subscribed (Pro / Premium, Monthly / Annual)</li>
                <li>Reason for the refund request</li>
              </ul>
            </div>
            <p className="text-gray-600 text-sm leading-relaxed mt-4">
              Our support team will review your request and respond within <strong>2 business days</strong>. If approved, the refund will be initiated within 1 business day of approval.
            </p>
          </section>

          {/* 9. Exceptions */}
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">9. Exceptions &amp; Special Circumstances</h2>
            <p className="text-gray-600 text-sm leading-relaxed mb-3">
              We may offer refunds outside our standard policy in the following exceptional cases:
            </p>
            <ul className="list-disc list-inside text-gray-600 text-sm space-y-2 ml-2">
              <li><strong>Duplicate charge:</strong> Full refund initiated within 24 hours</li>
              <li><strong>Technical failure:</strong> If a payment was charged but the subscription was not activated due to a platform error</li>
              <li><strong>Unauthorized transaction:</strong> Reported within 3 days with supporting evidence</li>
            </ul>
            <p className="text-gray-600 text-sm leading-relaxed mt-3">
              For technical issues, please first contact <a href={`mailto:${SUPPORT_EMAIL}`} className="text-[#00bcd4] underline">{SUPPORT_EMAIL}</a> — many issues can be resolved without a refund.
            </p>
          </section>

          {/* 10. Contact */}
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">10. Contact Us for Refunds</h2>
            <p className="text-gray-600 text-sm leading-relaxed mb-3">
              For all refund-related queries, reach out to our support team:
            </p>
            <div className="bg-gray-50 rounded-xl p-5 text-sm text-gray-700 space-y-1.5">
              <p><strong>Business Name:</strong> {BUSINESS_NAME}</p>
              <p><strong>Owner:</strong> {OWNER_NAME}</p>
              <p><strong>Refund Email:</strong> <a href={`mailto:${SUPPORT_EMAIL}`} className="text-[#00bcd4] underline">{SUPPORT_EMAIL}</a></p>
              <p><strong>Alt Email:</strong> <a href="mailto:mayankopportunity@gmail.com" className="text-[#00bcd4] underline">mayankopportunity@gmail.com</a></p>
              <p><strong>Response Time:</strong> Within 2 business days</p>
              <p><strong>Support Hours:</strong> Monday – Saturday, 9:00 AM – 6:00 PM IST</p>
              <p><strong>Website:</strong> <a href={WEBSITE} className="text-[#00bcd4] underline">{WEBSITE}</a></p>
            </div>
            <p className="text-gray-500 text-xs mt-4">
              For additional help, visit our <Link href="/contact" className="text-[#00bcd4] underline">Contact Us</Link> page or our <Link href="/help" className="text-[#00bcd4] underline">Help Center</Link>.
            </p>
          </section>

        </div>
      </div>
      <Footer />
    </div>
  );
}
