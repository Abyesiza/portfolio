import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
},
  images: {
    domains: ['assets.aceternity.com', 'images.unsplash.com']
  }
};

export default nextConfig;
