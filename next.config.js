/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  turbopack: {
    root: __dirname, // fixes multiple lockfile warning
  },
};

module.exports = nextConfig;