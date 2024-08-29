const withPWA = require("@ducanh2912/next-pwa").default({
  dest: "public",
  cacheOnFrontEndNav: true,
  aggressiveFrontEndNavCaching: true,
  reloadOnOnline: true,
  swcMinify: true,
  disable: false,
  workboxOptions: {
    disableDevLogs: true
  }
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  compiler: {
    styledComponents: true
  }
};

module.exports = withPWA(nextConfig);
