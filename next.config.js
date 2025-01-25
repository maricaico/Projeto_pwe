module.exports = {
    experimental: {
      serverActions: true,
    },
  };
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'm.media-amazon.com',
        pathname: '/images/M/**',
      },
    ],
  },
};

module.exports = nextConfig;