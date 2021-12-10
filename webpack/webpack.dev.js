const path = require('path');
const config = require('./config');
const webpack = require('webpack');
const Dotenv = require('dotenv-webpack');

module.exports = {
  mode: 'development',

  output: {
    filename: '[name].js',
    path: config.output,
    chunkFilename: '[name].js',
  },

  module: {
    rules: [],
  },

  devServer: {
    contentBase: config.output,
    compress: true,
    hot: true,
    host: '0.0.0.0',
  },

  plugins: [
    new Dotenv({
      path: `${path.resolve(__dirname, '../', '.env')}`,
      systemvars: true,
    }),

    new webpack.HotModuleReplacementPlugin(),
  ],
};
