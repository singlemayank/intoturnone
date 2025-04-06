import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";

const nextConfig: NextConfig = {
  reactStrictMode: true,

  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: isProd
          ? "https://api.intoturnone.com/:path*"
          : "http://localhost:8000/:path*",
      },
    ];
  },
};

export default nextConfig;
