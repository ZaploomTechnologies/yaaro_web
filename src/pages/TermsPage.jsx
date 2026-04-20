import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import LegalLayout, { LegalSection } from '../components/LegalLayout';

export default function TermsPage() {
  useEffect(() => {
    const prev = document.title;
    document.title = 'Terms & Conditions - Yaaro';
    return () => {
      document.title = prev;
    };
  }, []);

  return (
    <LegalLayout 
      title="Terms & Conditions" 
      subtitle="Effective Date: 19 April 2026 | App Name: Yaaro | Developer: Zaploom Technologies"
    >
      <LegalSection title="1. Acceptance of Terms" step="Section 1">
        <p>
          By accessing or using Yaaro, you agree to be bound by these Terms & Conditions. If you do
          not agree, please do not use the app.
        </p>
      </LegalSection>

      <LegalSection title="2. Description of Service" step="Section 2">
        <p>
          Yaaro is a social fitness platform that allows users to track activities, log workouts,
          share progress, and interact with other users.
        </p>
      </LegalSection>

      <LegalSection title="3. User Accounts" step="Section 3">
        <ul className="list-disc pl-5 space-y-2">
          <li>You must provide accurate information when creating an account</li>
          <li>You are responsible for maintaining account security</li>
          <li>You are responsible for all activities under your account</li>
        </ul>
      </LegalSection>

      <LegalSection title="4. User Content" step="Section 4">
        <p>
          Users may create and share content including workouts, activities, images, and posts.
        </p>
        <ul className="list-disc pl-5 space-y-2">
          <li>You retain ownership of your content</li>
          <li>You grant us a license to display and distribute your content within the app</li>
          <li>You must not post harmful, illegal, or abusive content</li>
        </ul>
      </LegalSection>

      <LegalSection title="5. Social Features" step="Section 5">
        <p>
          Yaaro includes features such as following users, liking posts, joining clubs, and sharing
          activities.
        </p>
        <ul className="list-disc pl-5 space-y-2">
          <li>You are responsible for your interactions with other users</li>
          <li>We are not liable for user behavior</li>
        </ul>
      </LegalSection>

      <LegalSection title="6. Prohibited Activities" step="Section 6">
        <ul className="list-disc pl-5 space-y-2">
          <li>Posting illegal or offensive content</li>
          <li>Harassment, abuse, or threats</li>
          <li>Impersonating another person</li>
          <li>Attempting to hack or disrupt the app</li>
        </ul>
      </LegalSection>

      <LegalSection title="7. Reporting & Blocking" step="Section 7">
        <p>
          Users can report or block others. We reserve the right to review and take action,
          including suspending or terminating accounts.
        </p>
      </LegalSection>

      <LegalSection title="8. Subscriptions & Payments" step="Section 8">
        <p>Yaaro offers optional subscription plans:</p>
        <ul className="list-disc pl-5 space-y-2 mb-4">
          <li>Monthly Plan: ₹99/month</li>
          <li>Yearly Plan: ₹999/year</li>
        </ul>

        <div className="rounded-xl border border-primary/20 bg-primary/5 px-4 py-3 text-sm text-surface-secondary mb-4">
          Payments are processed through app stores (Google Play / Apple App Store). Subscription
          terms, billing, and cancellations are governed by their policies.
        </div>

        <ul className="list-disc pl-5 space-y-2">
          <li>Subscriptions auto-renew unless canceled</li>
          <li>You can cancel anytime through your app store account</li>
          <li>No refunds except as required by law or platform policy</li>
        </ul>
      </LegalSection>

      <LegalSection title="9. Health Disclaimer" step="Section 9">
        <p>Yaaro provides fitness tracking and information but is not a medical service.</p>
        <ul className="list-disc pl-5 space-y-2">
          <li>Consult a professional before starting any fitness program</li>
          <li>Use the app at your own risk</li>
        </ul>
      </LegalSection>

      <LegalSection title="10. Availability of Service" step="Section 10">
        <p>
          We may modify, suspend, or discontinue any part of the app at any time without notice.
        </p>
      </LegalSection>

      <LegalSection title="11. Termination" step="Section 11">
        <p>We may suspend or terminate your account if you violate these terms.</p>
      </LegalSection>

      <LegalSection title="12. Limitation of Liability" step="Section 12">
        <p>To the maximum extent permitted by law, we are not liable for:</p>
        <ul className="list-disc pl-5 space-y-2">
          <li>Any indirect or incidental damages</li>
          <li>Loss of data or fitness progress</li>
          <li>Injuries resulting from activities tracked in the app</li>
        </ul>
      </LegalSection>

      <LegalSection title="13. Privacy" step="Section 13">
        <p>
          Your use of the app is also governed by our{' '}
          <Link to="/privacy-policy" className="text-primary hover:underline">
            Privacy Policy
          </Link>
          .
        </p>
      </LegalSection>

      <LegalSection title="14. Changes to Terms" step="Section 14">
        <p>We may update these Terms & Conditions at any time.</p>
      </LegalSection>

      <LegalSection title="15. Governing Law" step="Section 15">
        <p>These terms are governed by the laws of India.</p>
      </LegalSection>

      <LegalSection title="16. Contact" step="Section 16">
        <p>
          Website: yaaro.fit
          <br />
          Email: singhkapil708@gmail.com
          <br />
          Company: Zaploom Technologies
        </p>
      </LegalSection>
    </LegalLayout>
  );
}
