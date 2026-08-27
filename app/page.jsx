import Navbar from '@/src/components/Navbar';
import Footer from '@/src/components/Footer';
import HeroSnapStack from '@/src/components/HeroSnapStack';
import MoveHealth from '@/src/sections/MoveHealth';
import AchieveGoals from '@/src/sections/AchieveGoals';
import Activities from '@/src/sections/Activities';
import Features from '@/src/sections/Features';
import WhyYaaro from '@/src/sections/WhyYaaro';
import AppPreview from '@/src/sections/AppPreview';
import CTASection from '@/src/sections/CTASection';
import ScrollToTop from '@/src/components/ScrollToTop';

export const metadata = {
  title: 'Yaaro — Track. Share. Earn. Repeat.',
  description: 'Yaaro — Track, Share, Earn, Repeat. The fitness app that rewards your hustle.',
};

export default function HomePage() {
  return (
    <div className="bg-surface-bg min-h-screen">
      <ScrollToTop />
      <Navbar />
      <main>
        <HeroSnapStack>
          <MoveHealth />

          <AchieveGoals />

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
        </HeroSnapStack>
      </main>
      <Footer />
    </div>
  );
}
