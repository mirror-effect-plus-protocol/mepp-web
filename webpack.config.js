const merge = require('webpack-merge');

module.exports = merge(
  require('./webpack/webpack.common'),
  require(`./webpack/webpack.${
    process.env.ENV === 'staging' ? 'production' : process.env.ENV
  }.js`),
);
