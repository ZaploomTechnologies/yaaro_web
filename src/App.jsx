import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Hero from './sections/Hero';
import Activities from './sections/Activities';
import Features from './sections/Features';
import WhyYaaro from './sections/WhyYaaro';
import AppPreview from './sections/AppPreview';
import CTASection from './sections/CTASection';
import ProfilePage from './pages/ProfilePage';
import WorkoutPage from './pages/WorkoutPage';
import ClubPage from './pages/ClubPage';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsPage from './pages/TermsPage';
import DeleteAccountRequestPage from './pages/DeleteAccountRequestPage';
import ScrollToTop from './components/ScrollToTop';

function LandingPage() {
  return (
    <div className="bg-surface-bg min-h-screen overflow-x-hidden">
      <Navbar />
      <main>
        <Hero />

        {/* Divider */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent" />
        </div>

        <Activities />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent" />
        </div>

        <Features />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent" />
        </div>

        <WhyYaaro />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent" />
        </div>

        <AppPreview />

        <CTASection />
      </main>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/users/:userId" element={<ProfilePage />} />
        <Route path="/activities/:activityId" element={<WorkoutPage />} />
        <Route path="/clubs/:clubId" element={<ClubPage />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms" element={<TermsPage />} />
        <Route path="/delete-account-request" element={<DeleteAccountRequestPage />} />
      </Routes>
    </>
  );
}
