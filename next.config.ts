import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: false,
  images: {
    formats: ["image/webp", "image/avif"],
  },
};

export default nextConfig;
