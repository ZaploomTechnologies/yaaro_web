import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './style.css';

export default function TermsPage() {
  useEffect(() => {
    const prev = document.title;
    document.title = 'Terms & Conditions - Yaaro';
    return () => {
      document.title = prev;
    };
  }, []);

  return (
    <div className="legal-doc-page">
      <div className="container">
        <h1>Terms & Conditions</h1>

        <p>
          <strong>Effective Date:</strong> 19 April 2026
        </p>
        <p>
          <strong>App Name:</strong> Yaaro
        </p>
        <p>
          <strong>Developer:</strong> Zaploom Technologies
        </p>

        <h2>1. Acceptance of Terms</h2>
        <p>
          By accessing or using Yaaro, you agree to be bound by these Terms & Conditions. If you do
          not agree, please do not use the app.
        </p>

        <h2>2. Description of Service</h2>
        <p>
          Yaaro is a social fitness platform that allows users to track activities, log workouts,
          share progress, and interact with other users.
        </p>

        <h2>3. User Accounts</h2>
        <ul>
          <li>You must provide accurate information when creating an account</li>
          <li>You are responsible for maintaining account security</li>
          <li>You are responsible for all activities under your account</li>
        </ul>

        <h2>4. User Content</h2>
        <p>
          Users may create and share content including workouts, activities, images, and posts.
        </p>
        <ul>
          <li>You retain ownership of your content</li>
          <li>You grant us a license to display and distribute your content within the app</li>
          <li>You must not post harmful, illegal, or abusive content</li>
        </ul>

        <h2>5. Social Features</h2>
        <p>
          Yaaro includes features such as following users, liking posts, joining clubs, and sharing
          activities.
        </p>
        <ul>
          <li>You are responsible for your interactions with other users</li>
          <li>We are not liable for user behavior</li>
        </ul>

        <h2>6. Prohibited Activities</h2>
        <ul>
          <li>Posting illegal or offensive content</li>
          <li>Harassment, abuse, or threats</li>
          <li>Impersonating another person</li>
          <li>Attempting to hack or disrupt the app</li>
        </ul>

        <h2>7. Reporting & Blocking</h2>
        <p>
          Users can report or block others. We reserve the right to review and take action,
          including suspending or terminating accounts.
        </p>

        <h2>8. Subscriptions & Payments</h2>
        <p>Yaaro offers optional subscription plans:</p>
        <ul>
          <li>Monthly Plan: ₹99/month</li>
          <li>Yearly Plan: ₹999/year</li>
        </ul>

        <div className="highlight highlight--terms">
          Payments are processed through app stores (Google Play / Apple App Store). Subscription
          terms, billing, and cancellations are governed by their policies.
        </div>

        <ul>
          <li>Subscriptions auto-renew unless canceled</li>
          <li>You can cancel anytime through your app store account</li>
          <li>No refunds except as required by law or platform policy</li>
        </ul>

        <h2>9. Health Disclaimer</h2>
        <p>Yaaro provides fitness tracking and information but is not a medical service.</p>
        <ul>
          <li>Consult a professional before starting any fitness program</li>
          <li>Use the app at your own risk</li>
        </ul>

        <h2>10. Availability of Service</h2>
        <p>
          We may modify, suspend, or discontinue any part of the app at any time without notice.
        </p>

        <h2>11. Termination</h2>
        <p>We may suspend or terminate your account if you violate these terms.</p>

        <h2>12. Limitation of Liability</h2>
        <p>To the maximum extent permitted by law, we are not liable for:</p>
        <ul>
          <li>Any indirect or incidental damages</li>
          <li>Loss of data or fitness progress</li>
          <li>Injuries resulting from activities tracked in the app</li>
        </ul>

        <h2>13. Privacy</h2>
        <p>
          Your use of the app is also governed by our{' '}
          <Link to="/privacy-policy" className="legal-doc-link">
            Privacy Policy
          </Link>
          .
        </p>

        <h2>14. Changes to Terms</h2>
        <p>We may update these Terms & Conditions at any time.</p>

        <h2>15. Governing Law</h2>
        <p>These terms are governed by the laws of India.</p>

        <h2>16. Contact</h2>
        <p>
          Website: yaaro.fit
          <br />
          Email: singhkapil708@gmail.com
          <br />
          Company: Zaploom Technologies
        </p>

        <div className="footer">© 2026 Zaploom Technologies. All rights reserved.</div>
      </div>
    </div>
  );
}
