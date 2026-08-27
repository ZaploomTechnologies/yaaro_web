import Navbar from '@/src/components/Navbar';
import Footer from '@/src/components/Footer';
import HeroSnapStack from '@/src/components/HeroSnapStack';
import MoveHealth from '@/src/sections/MoveHealth';
import AchieveGoals from '@/src/sections/AchieveGoals';
import PersonalizedInsights from '@/src/sections/PersonalizedInsights';
import TrackProgress from '@/src/sections/TrackProgress';
import GettingStarted from '@/src/sections/GettingStarted';
import SmarterTraining from '@/src/sections/SmarterTraining';
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

          <PersonalizedInsights />

          <TrackProgress />

          <GettingStarted />

          <SmarterTraining />
        </HeroSnapStack>
      </main>
      <Footer />
    </div>
  );
}
