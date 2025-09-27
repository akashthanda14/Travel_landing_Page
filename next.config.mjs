/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
      {
        protocol: 'http',
        hostname: '**',
      },
    ],
    formats: ['image/webp', 'image/avif'],
  },
  env: {
    CONTACT_EMAIL: process.env.CONTACT_EMAIL,
    API_URL: process.env.API_URL,
  },
}

export default nextConfig
