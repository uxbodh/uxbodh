/** @type {import('next').NextConfig} */

const nextConfig = {
  // --- Static Export Configuration ---
  // This is the most important setting. It tells Next.js to export the site
  // as a collection of static HTML, CSS, and JS files, instead of a server application.
  //output: 'export',

  // --- Output Directory Configuration ---
  // By default, static exports go to an 'out' folder.
  // This line changes the name to 'build' to match your expectation.
  distDir: 'build',

  // --- Trailing Slash ---
  // Ensures all links in your generated HTML end with a '/', which is good practice
  // for static hosting servers to avoid routing issues.
  //trailingSlash: true,

  // --- Image Optimization ---
  // For static exports, it's often best to disable the built-in image optimizer.
  // Static hosts can't handle the on-demand image optimization Next.js does by default.
  images: {
    unoptimized: true,
  },
};

// This line makes the configuration available to Next.js
module.exports = nextConfig;