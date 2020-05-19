const env = require('./env-config');
const withCSS = require('@zeit/next-css');
const withImage = require('next-images');
module.exports = withCSS(
  withImage({
    webpack: (config) => {
      // Fixes npm packages that depend on `fs` module
      config.node = {
        fs: 'empty',
      };

      return config;
    },
    env,
  }),
);
