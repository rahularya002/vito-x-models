import { NextConfig } from 'next'

const config: NextConfig = {
  images: {
    domains: [
      'img.youtube.com',
      'i.ytimg.com',
      'res.cloudinary.com',
      'images.unsplash.com',
      'lh3.googleusercontent.com',
      'avatars.githubusercontent.com'
    ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  eslint: {
    ignoreDuringBuilds: true
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      // Client-side browser polyfills for Node.js modules
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
        child_process: false,
        os: false,
        path: false,
        crypto: false
      };
    }
    return config;
  }
};

export default config;
