import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "http://103.76.204.104:5401/api/:path*",
      },
    ];
  },
};

export default nextConfig;
