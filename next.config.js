// eslint-disable-next-line @typescript-eslint/no-var-requires
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
  async rewrites() {
    return [
      {
        source: '/v1/:path*',
        destination: `${process.env.NEXT_PUBLIC_API}/v1/:path*`,
      },
      {
        source: '/graphql',
        destination: process.env.NEXT_PUBLIC_GRAPH_URL,
      },
    ];
  },
};

module.exports = nextConfig;
