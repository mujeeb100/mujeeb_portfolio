import type { NextConfig } from "next";

/**
 * /api/py/* is served by the FastAPI app in /api/index.py.
 * - In production on Vercel it runs as a Python serverless function.
 * - In development, run `npm run dev:api` (uvicorn on :8000) alongside `npm run dev`.
 */
const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/py/:path*",
        destination: process.env.NODE_ENV === "development" ? "http://127.0.0.1:8000/api/py/:path*" : "/api/",
      },
    ];
  },
};

export default nextConfig;
