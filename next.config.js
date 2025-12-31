/** @type {import('next').NextConfig} */
const nextConfig = {
  // --- Static Export Configuration ---
  // Enables export to static HTML
  output: 'export',
  distDir: 'out',
  // --- Trailing Slash ---
  // Good for static hosting (avoids 404s)
  trailingSlash: true,

  // --- Image Optimization ---
  images: {
    unoptimized: true, // disables on-demand image optimization
  },

  // Optional: if you want a custom output folder for export
  // The default for next export is 'out'
  // You can specify like: "next export -o build"
};

module.exports = nextConfig;
