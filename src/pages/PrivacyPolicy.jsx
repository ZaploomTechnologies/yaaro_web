import { useEffect } from 'react';
import './style.css';

export default function PrivacyPolicy() {
  useEffect(() => {
    const prev = document.title;
    document.title = 'Privacy Policy - Yaaro';
    return () => {
      document.title = prev;
    };
  }, []);

  return (
    <div className="legal-doc-page">
      <div className="container">
        <h1>Privacy Policy</h1>

        <p>
          <strong>Effective Date:</strong> 19 April 2026
        </p>
        <p>
          <strong>App Name:</strong> Yaaro
        </p>
        <p>
          <strong>Developer:</strong> Zaploom Technologies
        </p>

        <h2>1. Introduction</h2>
        <p>
          Yaaro is a social fitness tracking platform that enables users to track activities, log
          workouts, share progress, and interact with a community.
        </p>
        <p>This Privacy Policy explains how we collect, use, and protect your information.</p>

        <h2>2. Information We Collect</h2>

        <h3>2.1 Personal Information</h3>
        <ul>
          <li>Name</li>
          <li>Email address</li>
          <li>Profile photo</li>
          <li>Location (city-level or user-provided)</li>
        </ul>

        <h3>2.2 Fitness & Activity Data</h3>
        <ul>
          <li>Workout logs (sets, reps, weights)</li>
          <li>Running, walking, cycling activity data</li>
          <li>Distance, duration, speed, routes</li>
          <li>Fitness statistics and progress</li>
          <li>Body measurements (optional)</li>
        </ul>

        <h3>2.3 Location Data</h3>
        <p>We collect location data to enable:</p>
        <ul>
          <li>GPS-based activity tracking</li>
          <li>Route mapping</li>
          <li>Territory capture features</li>
        </ul>

        <div className="highlight highlight--privacy">
          Background location is accessed only during active activity tracking sessions.
        </div>

        <h3>2.4 Media & Files</h3>
        <ul>
          <li>Images uploaded to posts</li>
          <li>Photos selected from device</li>
        </ul>

        <h3>2.5 Social Data</h3>
        <ul>
          <li>Followers and following</li>
          <li>Posts, likes, interactions</li>
          <li>Club participation</li>
          <li>User search activity</li>
        </ul>

        <h3>2.6 Device & Usage Data</h3>
        <ul>
          <li>Device type and OS</li>
          <li>App usage behavior</li>
          <li>Crash logs</li>
        </ul>

        <h2>3. Permissions We Use</h2>

        <h3>Camera</h3>
        <p>Used to capture photos for profile and activity posts.</p>

        <h3>Storage / Media</h3>
        <p>Used to upload images from your device.</p>

        <h3>Location (Foreground & Background)</h3>
        <p>Used to track workouts, generate routes, and enable territory features.</p>

        <h3>Notifications</h3>
        <p>Used to notify you about activity updates, social interactions, and rewards.</p>

        <h3>Foreground Service & Wake Lock</h3>
        <p>Ensures uninterrupted tracking during active sessions.</p>

        <h2>4. How We Use Your Information</h2>
        <ul>
          <li>Provide fitness tracking features</li>
          <li>Enable social feed and interactions</li>
          <li>Show activity insights and stats</li>
          <li>Power rewards and gamification</li>
          <li>Improve performance and experience</li>
          <li>Send notifications</li>
        </ul>

        <h2>5. Social Features</h2>
        <p>
          Yaaro includes social features where content such as activities and posts may be visible to
          followers or other users depending on your settings.
        </p>

        <h2>6. Data Sharing</h2>
        <p>We do not sell your data.</p>
        <ul>
          <li>Trusted service providers</li>
          <li>Legal authorities when required</li>
        </ul>

        <h2>7. User Controls</h2>
        <ul>
          <li>Edit or delete profile</li>
          <li>Delete posts</li>
          <li>Block or report users</li>
          <li>Control content visibility</li>
        </ul>

        <h2>8. Data Retention</h2>
        <p>
          Data is retained as long as your account is active or as required for legal obligations.
        </p>

        <h2>9. Data Security</h2>
        <p>We use secure systems and encryption to protect your data.</p>

        <h2>10. Children&apos;s Privacy</h2>
        <p>This app is not intended for users under 13.</p>

        <h2>11. International Users</h2>
        <p>Data may be processed outside your country.</p>

        <h2>12. Updates</h2>
        <p>This policy may be updated periodically.</p>

        <h2>13. Contact</h2>
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
// test