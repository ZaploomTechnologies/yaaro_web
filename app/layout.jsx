import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  display: 'swap',
});

export const metadata = {
  title: 'Yaaro — Track. Share. Earn. Repeat.',
  description: 'Yaaro — Track, Share, Earn, Repeat. The fitness app that rewards your hustle.',
  icons: { icon: '/Yaaro-Icon.png' },
};

export const viewport = {
  themeColor: '#0F0F0F',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.className}>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
