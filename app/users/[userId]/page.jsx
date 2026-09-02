import { notFound } from 'next/navigation';
import ProfilePage from '@/src/views/ProfilePage';
import { apiUrl } from '@/src/lib/api';

export async function generateMetadata({ params }) {
  const { userId } = await params;
  try {
    const res = await fetch(apiUrl(`/users/${userId}`), { next: { revalidate: 60 } });
    if (!res.ok) throw new Error('not found');
    const p = await res.json();
    const title = `${p.fullName} | Yaaro`;
    const description = `${p.fullName} is using Yaaro. Join Yaaro to track your activities, analyse your performance, follow friends and earn rewards. Get started by signing up for free.`;
    const image = p.profileImage || '/Yaaro-Icon.png';
    return {
      title,
      description,
      openGraph: { type: 'profile', title, description, images: [{ url: image }] },
      twitter: { card: 'summary', title, description, images: [image] },
    };
  } catch {
    return { title: 'User Profile | Yaaro' };
  }
}

export default async function UserPage({ params }) {
  const { userId } = await params;

  // Fetch server-side — triggers the 404 page on any failure
  try {
    const [res, feedRes] = await Promise.all([
      fetch(apiUrl(`/users/${userId}`), { next: { revalidate: 60 } }),
      fetch(apiUrl(`/users/${userId}/latest-feed`), { next: { revalidate: 60 } }).catch(() => null),
    ]);
    if (!res.ok) notFound();
    const data = await res.json();
    const initialFeed = feedRes && feedRes.ok ? await feedRes.json() : null;
    return <ProfilePage initialData={data} initialFeed={initialFeed} />;
  } catch {
    notFound();
  }
}
