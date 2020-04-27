const withImages = require('next-images');
module.exports = withImages({
  webpack(config, options) {
    return config;
  },
  env: {
    GRAPHQL_URL: 'http://localhost:3061/graphql',
  },
});
