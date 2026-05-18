import ProfilePage from '@/src/views/ProfilePage';

const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3100/api/frontend';

export async function generateMetadata({ params }) {
  const { userId } = await params;
  try {
    const res = await fetch(`${baseUrl}/users/${userId}`, { next: { revalidate: 60 } });
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

export default function UserPage({ params }) {
  return <ProfilePage serverParams={params} />;
}
