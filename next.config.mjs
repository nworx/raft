/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  output: "export",
  images: {
    unoptimized: true, // Disables Next.js image optimization
  },
};

export default nextConfig;
