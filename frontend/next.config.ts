import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: process?.env?.BUILD_STANDALONE ? "standalone" : undefined,
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
    OTEL_SERVICE_NAME: process.env.OTEL_SERVICE_NAME,
    OTEL_LOG_LEVEL: process.env.OTEL_LOG_LEVEL,
    NEXT_PUBLIC_VERCEL_ENV: process.env.NEXT_PUBLIC_VERCEL_ENV,
    PINO_LOKI_URL: process.env.PINO_LOKI_URL,
  }
  /* config options here */
};

export default nextConfig;
