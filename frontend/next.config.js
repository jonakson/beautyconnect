/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000',
  },
  images: {
    domains: ['localhost'],
    formats: ['image/webp', 'image/avif'],
  },
  // Enable standalone mode for Docker
  output: 'standalone',
  // Transpile shared package
  transpilePackages: ['@beautyconnect/shared'],
};

module.exports = nextConfig;