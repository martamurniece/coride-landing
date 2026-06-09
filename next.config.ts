import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [{ source: '/legal', destination: '/privacy', permanent: true }];
  },
};

export default nextConfig;
