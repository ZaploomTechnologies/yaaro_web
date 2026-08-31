/** @type {import('next').NextConfig} */
const nextConfig = {
  poweredByHeader: false,
  compress: true,
  // Hides the Next.js dev-mode indicator (the black strip / "N" badge) that
  // appears only in local development — no effect on the production build.
  devIndicators: false,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'api.yaaro.fit',
        pathname: '/**',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '3100',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'api.dicebear.com',
        pathname: '/**',
      },
    ],
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
        ],
      },
    ];
  },
  /**
   * When `NEXT_PUBLIC_API_URL` is the Next dev server (e.g. http://localhost:3001/frontend/v1),
   * browser requests hit this app first. Rewrite forwards `/frontend/v1/*` to Express.
   */
  async rewrites() {
    const backend = (
      process.env.BACKEND_ORIGIN ||
      process.env.NEXT_PUBLIC_BACKEND_ORIGIN ||
      'http://127.0.0.1:3100'
    ).replace(/\/$/, '');
    return [
      {
        source: '/frontend/v1/:path*',
        destination: `${backend}/frontend/v1/:path*`,
      },
    ];
  },
};

export default nextConfig;
