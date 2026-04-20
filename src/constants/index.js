export const NAV_LINKS = [
  { label: 'Activities', href: '#activities' },
  { label: 'Features', href: '#features' },
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'Why Yaaro', href: '#why-yaaro' },
  { label: 'Download', href: '#download' },
];

export const ACTIVITIES = [
  {
    id: 1,
    title: 'Running',
    description: 'Track every mile, pace & elevation. Run smarter, not harder.',
    icon: 'run',
    image: '/running.jpg',
    stats: '5.2 km • 28 min',
    color: 'from-orange-500/60',
  },
  {
    id: 2,
    title: 'Walking',
    description: 'Every step counts. Build healthy habits one walk at a time.',
    icon: 'walk',
    image: '/walking.jpg',
    stats: '6,842 steps • 42 min',
    color: 'from-green-500/60',
  },
  {
    id: 3,
    title: 'Cycling',
    description: 'Conquer routes, track speed and distance like a pro.',
    icon: 'cycle',
    image: '/cycling.jpg',
    stats: '18 km • 55 min',
    color: 'from-blue-500/60',
  },
  {
    id: 4,
    title: 'Workout',
    description: 'Log sets, reps, and weight. Build strength progressively.',
    icon: 'workout',
    image: '/workout.jpg',
    stats: '85 kg • 4 sets',
    color: 'from-purple-500/60',
  },
  {
    id: 5,
    title: 'Dance',
    description: 'Move to the beat. Track your sessions and burn calories with rhythm.',
    icon: 'dance',
    image: '/dance.jpg',
    stats: '30 min • 280 cal',
    color: 'from-pink-500/60',
  },
  {
    id: 6,
    title: 'Yoga',
    description: 'Find your balance. Log mindful sessions and track flexibility gains.',
    icon: 'yoga',
    image: '/yoga.jpg',
    stats: '40 min • 150 cal',
    color: 'from-teal-500/60',
  },
];

export const FEATURES = [
  {
    id: 'feeds',
    title: 'Share Your Fitness Journey',
    subtitle: 'Social Feeds',
    description: 'Post your workouts, progress photos, and milestones. Inspire others and get inspired. Your journey is worth sharing.',
    badge: 'Social',
    badgeColor: 'bg-blue-500/20 text-blue-400',
  },
  {
    id: 'rewards',
    title: 'Earn While You Sweat',
    subtitle: 'Rewards System',
    description: 'Turn every activity into points. Redeem for protein vouchers, fitness bands, and exclusive gear.',
    badge: 'Rewards',
    badgeColor: 'bg-primary/20 text-primary',
  },
  {
    id: 'challenges',
    title: 'Push Your Limits',
    subtitle: 'Challenges',
    description: 'Join weekly and monthly challenges. Compete with friends, climb the leaderboard, win exclusive rewards.',
    badge: 'Challenges',
    badgeColor: 'bg-orange-500/20 text-orange-400',
  },
  {
    id: 'clubs',
    title: 'Join a Club',
    subtitle: 'Fitness Clubs',
    description: 'Discover and join clubs built around your interests. Connect with like-minded members, plan activities, and grow together.',
    badge: 'Clubs',
    badgeColor: 'bg-purple-500/20 text-purple-400',
  },
];

export const REWARDS_POINTS = [
  { label: 'Daily Activity', points: '+50 pts', icon: 'bolt', color: 'text-primary' },
  { label: 'Comment on Post', points: '+10 pts', icon: 'message', color: 'text-blue-400' },
  { label: 'Running (per km)', points: '+15 pts', icon: 'run', color: 'text-orange-400' },
  { label: 'Cycling (per km)', points: '+12 pts', icon: 'cycle', color: 'text-green-400' },
  { label: 'Complete Challenge', points: '+200 pts', icon: 'trophy', color: 'text-yellow-400' },
];

export const REWARD_ITEMS = [
  {
    id: 1,
    title: 'Protein Voucher',
    brand: 'MuscleBlaze',
    points: 1200,
    status: 'redeem',
    icon: 'bottle',
    discount: '20% OFF',
  },
  {
    id: 2,
    title: 'Fitness Band',
    brand: 'Mi Smart Band',
    points: 3500,
    status: 'locked',
    icon: 'watch',
    discount: 'Exclusive',
  },
  {
    id: 3,
    title: 'Gym Gloves',
    brand: 'Strauss',
    points: 800,
    status: 'redeem',
    icon: 'shield',
    discount: '15% OFF',
  },
];

export const CHALLENGES = [
  {
    id: 1,
    title: '10K Steps Daily',
    type: 'Weekly',
    progress: 72,
    participants: 1243,
    daysLeft: 3,
    reward: '500 pts',
    icon: 'footprint',
  },
  {
    id: 2,
    title: '100km Cycling Month',
    type: 'Monthly',
    progress: 45,
    participants: 892,
    daysLeft: 18,
    reward: '2000 pts',
    icon: 'cycle',
  },
  {
    id: 3,
    title: 'Streak Warrior',
    type: 'Ongoing',
    progress: 88,
    participants: 3201,
    daysLeft: null,
    reward: '1500 pts',
    icon: 'flame',
  },
];

export const CLUBS = [
  {
    id: 1,
    name: 'Delhi Runners',
    members: 2340,
    activity: 'Running',
    icon: 'run',
    recentActivity: '23 runs this week',
  },
  {
    id: 2,
    name: 'Bangalore Cyclists',
    members: 1892,
    activity: 'Cycling',
    icon: 'cycle',
    recentActivity: '15 rides this week',
  },
  {
    id: 3,
    name: 'Iron Tribe Gym',
    members: 4120,
    activity: 'Workout',
    icon: 'workout',
    recentActivity: '89 workouts this week',
  },
];

export const WHY_YAARO = [
  {
    icon: 'target',
    title: 'Stay Consistent',
    description: 'Daily reminders, streak tracking, and habit loops that keep you showing up every single day.',
    stat: '87% users stay consistent',
    image: 'https://images.unsplash.com/photo-1594737625785-a6cbdabd333c?w=400&q=80',
    color: 'from-lime-500/60',
  },
  {
    icon: 'trophy',
    title: 'Earn Rewards',
    description: 'Every sweat session earns you points redeemable for real fitness gear and vouchers.',
    stat: '10K+ rewards redeemed',
    image: 'https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?w=400&q=80',
    color: 'from-amber-500/60',
  },
  {
    icon: 'users',
    title: 'Build Community',
    description: 'Connect with like-minded fitness enthusiasts. Share, compete, and celebrate together.',
    stat: '50K+ active members',
    image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=400&q=80',
    color: 'from-violet-500/60',
  },
  {
    icon: 'chart',
    title: 'Track Progress',
    description: 'Advanced analytics for every metric — distance, pace, calories, heart rate and more.',
    stat: '5M+ activities logged',
    image: 'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=400&q=80',
    color: 'from-cyan-500/60',
  },
];

export const FEED_POSTS = [
  {
    id: 1,
    user: 'Arjun M.',
    avatar: 'AM',
    activity: 'Morning Run',
    time: '2h ago',
    stats: { distance: '8.4 km', pace: '5:12 /km', calories: 420 },
    likes: 48,
    comments: 12,
    image: 'https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=400&q=80',
  },
  {
    id: 2,
    user: 'Priya S.',
    avatar: 'PS',
    activity: 'Strength Training',
    time: '5h ago',
    stats: { duration: '45 min', sets: '18 sets', calories: 310 },
    likes: 63,
    comments: 8,
    image: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=400&q=80',
  },
];
