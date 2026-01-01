import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ecommerce-products-new.s3.us-east-1.amazonaws.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'modernpharma-assets.s3.ap-southeast-2.amazonaws.com',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
