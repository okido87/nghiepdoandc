import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  // Disable Next.js hot reload, handled by nodemon
  reactStrictMode: false,
  webpack: (config, { dev }) => {
    if (dev) {
      // Disable webpack hot module replacement
      config.watchOptions = {
        ignored: ['**/*'], // Ignore all file changes
      };
    }
    return config;
  },
  eslint: {
    // Ignore ESLint errors during build
    ignoreDuringBuilds: true,
  },
  // Add output configuration for Netlify
  output: 'standalone',
  // Enable static optimization where possible
  swcMinify: true,
};

export default nextConfig;
