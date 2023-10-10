/*
 * MEPP - A web application to guide patients and clinicians in the process of
 * facial palsy rehabilitation, with the help of the mirror effect and principles
 * of motor learning
 * Copyright (C) 2021 MEPP <info@mirroreffectplus.org>
 *
 * This file is part of MEPP.
 *
 * MEPP is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * MEPP is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with MEPP.  If not, see <http://www.gnu.org/licenses/>.
 */

const config = require('./config');
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
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

    new CopyPlugin({
      patterns: [
        {
          from: config.public,
          globOptions: {
            ignore: ['**/*.md', '**/*.html'],
          },
        },
      ],
    }),

    new ESLintPlugin({
      extensions: ['js', 'jsx'],
      fix: true,
      emitWarning: process.env.ENV !== 'production',
    }),
  ],

  devtool: 'source-map',
};
