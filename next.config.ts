import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ['gdkshsciapndkwomfrse.supabase.co']
  },
  eslint: {
    ignoreDuringBuilds: true
  }
};

export default nextConfig;
