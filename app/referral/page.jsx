import { notFound } from 'next/navigation';
import ReferralPage from '@/src/views/ReferralPage';
import { apiUrl } from '@/src/lib/api';

const REFERRAL_CODE_REGEX = /^[A-Z]{3}\d{4}$/;

function normalizeCode(raw) {
  if (!raw) return null;
  const clean = String(raw).trim().toUpperCase().replace(/[^A-Z0-9]/g, '');
  return REFERRAL_CODE_REGEX.test(clean) ? clean : null;
}

export async function generateMetadata({ searchParams }) {
  const params = await searchParams;
  const code = normalizeCode(params?.r);

  if (!code) return { title: 'Join Yaaro | Referral' };

  try {
    const res = await fetch(apiUrl(`/referral/${code}`), { next: { revalidate: 60 } });
    if (!res.ok) throw new Error('not found');
    const data = await res.json();
    const title = `${data.fullName} invites you to join Yaaro`;
    const description = `Use referral code ${data.referralCode} to join Yaaro — The fitness app that rewards your hustle.`;
    const image = data.profileImage || '/Yaaro-Icon.png';
    return {
      title,
      description,
      openGraph: { type: 'website', title, description, images: [{ url: image }] },
      twitter: { card: 'summary', title, description, images: [image] },
    };
  } catch {
    return { title: 'Join Yaaro | Referral' };
  }
}

export default async function ReferralLandingPage({ searchParams }) {
  const params = await searchParams;
  const code = normalizeCode(params?.r);

  // Invalid or missing code → 404
  if (!code) notFound();

  // Fetch referrer — 404 if code doesn't exist in DB
  try {
    const res = await fetch(apiUrl(`/referral/${code}`), { next: { revalidate: 60 } });
    if (!res.ok) notFound();
    const data = await res.json();
    return <ReferralPage initialData={data} />;
  } catch {
    notFound();
  }
}
