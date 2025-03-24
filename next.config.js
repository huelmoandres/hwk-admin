/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  env: {
    API_PROD_URL: process.env.API_PROD_URL,
    API_PROD_URL_V1: process.env.API_PROD_URL_V1,
    storageURL: process.env.STORAGE_URL,
  },
  redirects: async () => {
    return [
      {
        source: "/",
        destination: "/dashboard",
        permanent: true,
      },
      {
        source: "/en",
        destination: "/dashboard",
        permanent: true,
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
      },
      {
        protocol: "http",
        hostname: "127.0.0.1:8000",
      },
      {
        protocol: "http",
        hostname: "127.0.0.1:3001",
      },
      {
        protocol: "https",
        hostname: "v0-hwkstore.vercel.app",
      },
    ],
  },
  devIndicators: {
    buildActivity: false,
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: process.env.API_PROD_URL_V1 + "/:path*",
      },
    ];
  },
};

module.exports = nextConfig;
