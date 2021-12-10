const config = require('./config');
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');

module.exports = {
  entry: config.entry,

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        loader: 'babel-loader',
        exclude: /(node_modules)/,
        options: {
          presets: ['@babel/react'],
          plugins: [['import', { libraryName: 'antd', style: true }]],
        },
      },
      {
        test: /\.(js|jsx)$/,
        use: 'react-hot-loader/webpack',
        include: /node_modules/,
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              outputPath: config.public,
            },
          },
        ],
      },
      {
        test: /\.svg$/,
        use: ['@svgr/webpack'],
      },
    ],
  },

  resolve: {
    alias: {
      '@admin': path.resolve(__dirname, '../src/admin'),
      '@assets': path.resolve(__dirname, '../src/assets'),
      '@components': path.resolve(__dirname, '../src/components'),
      '@hocs': path.resolve(__dirname, '../src/hocs'),
      '@hooks': path.resolve(__dirname, '../src/hooks'),
      '@layouts': path.resolve(__dirname, '../src/layouts'),
      '@pages': path.resolve(__dirname, '../src/pages'),
      '@providers': path.resolve(__dirname, '../src/providers'),
      '@styles': path.resolve(__dirname, '../src/styles'),
      '@themes': path.resolve(__dirname, '../src/themes'),
      '@utils': path.resolve(__dirname, '../src/utils'),
    },
    modules: ['src', 'node_modules'],
    extensions: ['.js', '.jsx'],
  },

  plugins: [
    new webpack.ProgressPlugin(),

    new HtmlWebpackPlugin({
      template: config.template,
    }),

    new ScriptExtHtmlWebpackPlugin({
      defaultAttribute: 'async',
    }),

    new CopyPlugin([
      {
        from: config.public,
        ignore: ['*.md,*.html'],
      },
    ]),

    new ESLintPlugin({
      extensions: ['js', 'jsx'],
      fix: true,
      emitWarning: process.env.ENV !== 'production',
    }),
  ],

  devtool: 'source-map',
};
