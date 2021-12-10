const path = require('path');
const config = require('./config');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const Dotenv = require('dotenv-webpack');

module.exports = {
  mode: 'production',

  output: {
    filename: `[name].[hash].js`,
    path: config.output,
    chunkFilename: `[name].[chunkhash].js`,
  },

  optimization: {
    minimizer: [
      new TerserPlugin({
        parallel: true,
        cache: true,
        sourceMap: true,
        terserOptions: {
          compress: {
            drop_console: process.env.ENV === 'staging' ? false : true,
          },
        },
      }),
    ],

    splitChunks: {
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'initial',
        },
        async: {
          test: /[\\/]node_modules[\\/]/,
          name: 'async',
          chunks: 'async',
          minChunks: 4,
        },
      },
    },

    runtimeChunk: true,
  },

  module: {
    rules: [],
  },

  plugins: [
    new Dotenv({
      path: `${path.resolve(__dirname, '../', '.env')}`,
      systemvars: true,
    }),

    new CleanWebpackPlugin(),
  ],

  devtool: 'source-map',
};
