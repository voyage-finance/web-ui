const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  optimizeFonts: false,
  experimental: {
    outputStandalone: true,
  },
  webpack(config, options) {
    const { dev, isServer } = options;
    if (dev && isServer) {
      config.plugins.push(new ForkTsCheckerWebpackPlugin());
    }
    return config;
  },
};

module.exports = nextConfig;
