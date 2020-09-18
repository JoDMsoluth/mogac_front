const env = require('./env-config');
const withCSS = require('@zeit/next-css');
const withImage = require('next-images');
const withOffline = require('next-offline');

module.exports = withOffline(
  withCSS(
    withImage({
      webpack: (config) => {
        // Fixes npm packages that depend on `fs` module
        config.node = {
          fs: 'empty',
        };

        return config;
      },
      env,
      // service worker
      workboxOpts: {
        swDest: 'sw.js',
        runtimeCaching: [
          {
            urlPattern: /^https?.*/,
            handler: 'NetworkFirst',
            options: {
              cacheName: 'https-calls',
              networkTimeoutSeconds: 15,
              expiration: {
                maxEntries: 150,
                maxAgeSeconds: 30 * 24 * 60 * 60, // 1 month
              },
              cacheableResponse: {
                statuses: [0, 200],
              },
            },
          },
        ],
      },
    }),
  ),
);
