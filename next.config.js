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
    env: {
      GRAPHQL_URL: 'http://localhost:3061/graphql',
    },
  }),
);
