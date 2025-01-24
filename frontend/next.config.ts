import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: process?.env?.BUILD_STANDALONE ? "standalone" : undefined
  /* config options here */
};

export default nextConfig;
