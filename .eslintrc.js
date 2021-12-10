module.exports = {
  parser: '@babel/eslint-parser',
  parserOptions: {
    babelOptions: {
      'presets': ['@babel/preset-react'],
    },
  },
  ignorePatterns: [
    'public/**/*.js',
    'src/admin/**/*.*', // TODO: Oli -> lint admin folder
    'src/components/admin/**/*.*', // TODO: Oli -> lint admin folder
  ],
  extends: ['eslint:recommended', 'plugin:react/recommended', 'prettier'],
  root: true,
  env: {
    node: true,
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
