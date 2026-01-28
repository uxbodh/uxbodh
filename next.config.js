/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true, // optional but recommended
  distDir: 'out', // you can keep a custom build folder if you like
  trailingSlash: true, // optional
  images: {
    unoptimized: true, // disables on-demand image optimization
  },
  // DO NOT set `output: 'export'` if you need API routes or server-side logic
};

module.exports = nextConfig;
