import ClubPage from '@/src/views/ClubPage';

const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3100/api/frontend';

export async function generateMetadata({ params }) {
  const { clubId } = await params;
  try {
    const res = await fetch(`${baseUrl}/clubs/${clubId}`, { next: { revalidate: 60 } });
    if (!res.ok) throw new Error('not found');
    const club = await res.json();
    const locationStr = club.location?.city || club.location?.state || club.location?.country || '';
    const title = `${club.title}${locationStr ? ` | ${locationStr}` : ''} | Yaaro`;
    const description = club.description || `Join ${club.title} on Yaaro.`;
    const image = club.coverImageUrl || club.imageUrl || '/Yaaro-Icon.png';
    return {
      title,
      description,
      openGraph: { type: 'website', title, description, images: [{ url: image }] },
      twitter: { card: 'summary_large_image', title, description, images: [image] },
    };
  } catch {
    return { title: 'Club | Yaaro' };
  }
}

export default function ClubPageRoute({ params }) {
  return <ClubPage serverParams={params} />;
}
