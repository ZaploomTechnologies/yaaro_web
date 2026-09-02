import AboutPage from '@/src/views/AboutPage';

export const metadata = {
  title: 'About - Yaaro',
  description:
    'Yaaro brings everyday people, coaches and gyms onto one platform — activity tracking, community and real client oversight, built for how India trains.',
  openGraph: {
    title: 'About Yaaro',
    description:
      "Our vision, mission and values — building India's leading health and fitness platform for people, coaches and gyms.",
  },
};

export default function AboutRoute() {
  return <AboutPage />;
}
