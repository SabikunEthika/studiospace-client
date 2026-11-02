import { fileURLToPath } from "node:url";

/** @type {import('next').NextConfig} */
const nextConfig = {
  turbopack: {
    root: fileURLToPath(new URL(".", import.meta.url)),
  },
  async rewrites() {
    return [
      { source: "/api/server/:path*", destination: `${process.env.SERVER_URL}/api/:path*` },
    ];
  },
};
export default nextConfig;
