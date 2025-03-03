import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
},
  images: {
    domains: ['assets.aceternity.com', 'images.unsplash.com', 'utfs.io']
  }
};

export default nextConfig;
