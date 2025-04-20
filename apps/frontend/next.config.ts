import type { NextConfig } from 'next';
import withMDX from '@next/mdx';

const isProd = process.env.NODE_ENV === 'production';

const withMdx = withMDX({
  extension: /\.mdx?$/,
});

const nextConfig: NextConfig = {
  reactStrictMode: true,
  pageExtensions: ['ts', 'tsx', 'md', 'mdx'],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.motorsport.com',
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: isProd
          ? 'https://api.intoturnone.com/:path*'
          : 'http://localhost:8000/:path*',
      },
    ];
  },
};

export default withMdx(nextConfig);
