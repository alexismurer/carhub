/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Car renders bypass the optimizer (`unoptimized`), but keep the host
    // allowed in case one is ever rendered without it.
    remotePatterns: [{ protocol: "https", hostname: "cdn.imagin.studio" }],
  },
};

module.exports = nextConfig;
