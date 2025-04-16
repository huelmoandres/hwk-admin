/** @type {import('next').NextConfig} */

const nextConfig = {
  env: {
    API_PROD_URL: process.env.API_PROD_URL,
    API_PROD_URL_V1: process.env.API_PROD_URL_V1,
    storageURL: process.env.STORAGE_URL,
  },

  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "127.0.0.1",
      },
      {
        protocol: "http",
        hostname: "localhost",
      },
      {
        protocol: "https",
        hostname: "v0-hwkstore.vercel.app",
      },
      {
        protocol: "https",
        hostname: "http2.mlstatic.com",
      },
      {
        protocol: "http",
        hostname: "http2.mlstatic.com",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
      {
        protocol: "http",
        hostname: "res.cloudinary.com",
      }
    ],
  },
  module: {
    rules: [
      { test: /\.(ts|tsx|jsx)$/, loader: "ts-loader" },
      { test: /\.css$/, use: ["style-loader", "css-loader"] },
      {
        test: /\.(gif|svg|jpg|png|mp3|webp)$/,
        use: ["file-loader"],
      },
    ],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  ...(process.env.NODE_ENV !== "production" ? {
    async rewrites() {
      return [
        {
          source: '/api/:path*',
          destination: process.env.API_PROD_URL_V1 + "/:path*",
        },
      ];
    },
  } : {})
  // other boilerplate config goes down here
};

export default nextConfig;
