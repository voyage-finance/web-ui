// eslint-disable-next-line @typescript-eslint/no-var-requires
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { withSentryConfig } = require('@sentry/nextjs');

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
  sentry: {
    disableServerWebpackPlugin: process.env.NODE_ENV !== 'production',
    disableClientWebpackPlugin: process.env.NODE_ENV !== 'production',
  },
};

/**
 * @type {import('@sentry/cli').SentryCliOptions}
 */
const sentryWebpackPluginOptions = {
  authToken: process.env.SENTRY_AUTH_TOKEN,
  org: 'voyage-finance-49',
  project: process.env.SENTRY_PROJECT,
  release: process.env.VERCEL_GIT_COMMIT_SHA?.slice(0, 6) ?? '',
};

module.exports = withSentryConfig(nextConfig, sentryWebpackPluginOptions);
