/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      { source: "/api/server/:path*", destination: `${process.env.SERVER_URL}/api/:path*` },
    ];
  },
};
export default nextConfig;