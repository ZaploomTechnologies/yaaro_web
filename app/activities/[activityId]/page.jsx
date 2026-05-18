import WorkoutPage from '@/src/views/WorkoutPage';

const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3100/api/frontend';

function formatActivityDate(dateStr) {
  if (!dateStr) return '';
  return new Date(dateStr).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

export async function generateMetadata({ params }) {
  const { activityId } = await params;
  try {
    const res = await fetch(`${baseUrl}/activities/${activityId}`, { next: { revalidate: 60 } });
    if (!res.ok) throw new Error('not found');
    const feedData = await res.json();

    const userRes = await fetch(`${baseUrl}/users/${feedData.userId}`, { next: { revalidate: 60 } });
    const userData = userRes.ok ? await userRes.json() : {};

    const fullName = userData.fullName || feedData.userName || 'Unknown';
    const firstName = fullName.trim().split(' ')[0];
    const activityType = feedData.activityType || 'Workout';
    const date = formatActivityDate(feedData.createdAt);

    const title = `${feedData.title || activityType} | Yaaro`;
    const description = `View ${firstName}'s ${activityType} on ${date} | Yaaro`;
    const image = feedData.media?.[0] || userData.profileImage || '/Yaaro-Icon.png';
    return {
      title,
      description,
      openGraph: { type: 'article', title, description, images: [{ url: image }] },
      twitter: { card: 'summary_large_image', title, description, images: [image] },
    };
  } catch {
    return { title: 'Workout | Yaaro' };
  }
}

export default function ActivityPage({ params }) {
  return <WorkoutPage serverParams={params} />;
}
