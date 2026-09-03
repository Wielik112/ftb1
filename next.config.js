/** @type {import('next').NextConfig} */
const nextConfig = {
  // The existing marketing site lives in public/ as static .html files.
  // Send the bare domain to the static homepage; everything else (shop.html,
  // product.html, css/, js/, assets/) is served straight from public/.
  async redirects() {
    return [
      { source: '/', destination: '/index.html', permanent: false },
    ];
  },
};

module.exports = nextConfig;
