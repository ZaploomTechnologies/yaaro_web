import ContactPage from '@/src/views/ContactPage';

export const metadata = {
  title: 'Contact - Yaaro',
  description:
    'Get in touch with the Yaaro team — questions, feedback, partnership ideas or bug reports. A real person reads every message.',
  openGraph: {
    title: 'Contact Yaaro',
    description:
      'Questions, feedback, partnerships or support — reach the Yaaro team.',
  },
};

export default function ContactRoute() {
  return <ContactPage />;
}
