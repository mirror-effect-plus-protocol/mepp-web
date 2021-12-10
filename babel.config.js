module.exports = function (api) {
  api.cache(true);

  const presets = [['@babel/preset-env'], '@babel/preset-react'];

  const plugins = [
    '@babel/transform-react-constant-elements',
    '@babel/plugin-transform-runtime',
    'react-hot-loader/babel',
  ];

  if (process.env['ENV'] === 'production') {
    plugins.push(['@babel/plugin-transform-react-inline-elements']);
  }

  return {
    presets,
    plugins,
  };
};
