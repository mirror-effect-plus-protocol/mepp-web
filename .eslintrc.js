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

module.exports = {
  parser: '@babel/eslint-parser',
  parserOptions: {
    ecmaVersion: 9,
    babelOptions: {
      'presets': ['@babel/preset-react'],
    },
  },
  ignorePatterns: ['public/**/*.js'],
  extends: ['eslint:recommended', 'plugin:react/recommended', 'prettier'],
  root: true,
  env: {
    node: true,
    es6: true,
    browser: true,
  },
  globals: {
    'DeepAR': true,
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  rules: {
    'object-shorthand': ['error', 'always'],
    'react/prop-types': 'off',
    'react/jsx-boolean-value': ['error', 'never'],
    'react/jsx-curly-brace-presence': [
      'error',
      { props: 'never', children: 'never' },
    ],
  },
};
