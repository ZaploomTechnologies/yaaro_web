import { useEffect } from 'react';
import LegalLayout, { LegalSection } from '../components/LegalLayout';

export default function PrivacyPolicy() {
  useEffect(() => {
    const prev = document.title;
    document.title = 'Privacy Policy - Yaaro';
    return () => {
      document.title = prev;
    };
  }, []);

  return (
    <LegalLayout
      title="Privacy Policy"
      subtitle="Effective Date: 19 April 2026 | App Name: Yaaro | Developer: Zaploom Technologies"
    >
      <LegalSection title="1. Introduction" step="Section 1">
        <p>
          Yaaro is a social fitness tracking platform that enables users to track activities, log
          workouts, share progress, and interact with a community.
        </p>
        <p>This Privacy Policy explains how we collect, use, and protect your information.</p>
      </LegalSection>

      <LegalSection title="2. Information We Collect" step="Section 2">
        <h3 className="text-surface-text font-semibold">2.1 Personal Information</h3>
        <ul className="list-disc pl-5 space-y-1">
          <li>Name</li>
          <li>Email address</li>
          <li>Profile photo</li>
          <li>Location (city-level or user-provided)</li>
        </ul>

        <h3 className="text-surface-text font-semibold mt-4">2.2 Fitness & Activity Data</h3>
        <ul className="list-disc pl-5 space-y-1">
          <li>Workout logs (sets, reps, weights)</li>
          <li>Running, walking, cycling activity data</li>
          <li>Distance, duration, speed, routes</li>
          <li>Fitness statistics and progress</li>
          <li>Body measurements (optional)</li>
        </ul>

        <h3 className="text-surface-text font-semibold mt-4">2.3 Location Data</h3>
        <p>We collect location data to enable:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>GPS-based activity tracking</li>
          <li>Route mapping</li>
          <li>Territory capture features</li>
        </ul>
        <div className="rounded-xl border border-primary/20 bg-primary/5 px-4 py-3 text-sm text-surface-secondary mt-3">
          Background location is accessed only during active activity tracking sessions.
        </div>

        <h3 className="text-surface-text font-semibold mt-4">2.4 Media & Files</h3>
        <ul className="list-disc pl-5 space-y-1">
          <li>Images uploaded to posts</li>
          <li>Photos selected from device</li>
        </ul>

        <h3 className="text-surface-text font-semibold mt-4">2.5 Social Data</h3>
        <ul className="list-disc pl-5 space-y-1">
          <li>Followers and following</li>
          <li>Posts, likes, interactions</li>
          <li>Club participation</li>
          <li>User search activity</li>
        </ul>

        <h3 className="text-surface-text font-semibold mt-4">2.6 Device & Usage Data</h3>
        <ul className="list-disc pl-5 space-y-1">
          <li>Device type and OS</li>
          <li>App usage behavior</li>
          <li>Crash logs</li>
        </ul>
      </LegalSection>

      <LegalSection title="3. Permissions We Use" step="Section 3">
        <h4 className="text-surface-text font-semibold">Camera</h4>
        <p>Used to capture photos for profile and activity posts.</p>

        <h4 className="text-surface-text font-semibold mt-4">Storage / Media</h4>
        <p>Used to upload images from your device.</p>

        <h4 className="text-surface-text font-semibold mt-4">Location (Foreground & Background)</h4>
        <p>Used to track workouts, generate routes, and enable territory features.</p>

        <h4 className="text-surface-text font-semibold mt-4">Notifications</h4>
        <p>Used to notify you about activity updates, social interactions, and rewards.</p>

        <h4 className="text-surface-text font-semibold mt-4">Foreground Service & Wake Lock</h4>
        <p>Ensures uninterrupted tracking during active sessions.</p>
      </LegalSection>

      <LegalSection title="4. How We Use Your Information" step="Section 4">
        <ul className="list-disc pl-5 space-y-1">
          <li>Provide fitness tracking features</li>
          <li>Enable social feed and interactions</li>
          <li>Show activity insights and stats</li>
          <li>Power rewards and gamification</li>
          <li>Improve performance and experience</li>
          <li>Send notifications</li>
        </ul>
      </LegalSection>

      <LegalSection title="5. Social Features" step="Section 5">
        <p>
          Yaaro includes social features where content such as activities and posts may be visible to
          followers or other users depending on your settings.
        </p>
      </LegalSection>

      <LegalSection title="6. Data Sharing" step="Section 6">
        <p>We do not sell your data.</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Trusted service providers</li>
          <li>Legal authorities when required</li>
        </ul>
      </LegalSection>

      <LegalSection title="7. User Controls" step="Section 7">
        <ul className="list-disc pl-5 space-y-1">
          <li>Edit or delete profile</li>
          <li>Delete posts</li>
          <li>Block or report users</li>
          <li>Control content visibility</li>
        </ul>
      </LegalSection>

      <LegalSection title="8. Data Retention" step="Section 8">
        <p>
          Data is retained as long as your account is active or as required for legal obligations.
        </p>
      </LegalSection>

      <LegalSection title="9. Data Security" step="Section 9">
        <p>We use secure systems and encryption to protect your data.</p>
      </LegalSection>

      <LegalSection title="10. Children's Privacy" step="Section 10">
        <p>This app is not intended for users under 13.</p>
      </LegalSection>

      <LegalSection title="11. International Users" step="Section 11">
        <p>Data may be processed outside your country.</p>
      </LegalSection>

      <LegalSection title="12. Updates" step="Section 12">
        <p>This policy may be updated periodically.</p>
      </LegalSection>

      <LegalSection title="13. Contact" step="Section 13">
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