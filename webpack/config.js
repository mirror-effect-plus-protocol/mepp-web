const path = require('path');
const pkg = require('../package.json');

// globals vars
process.env.PROJECT_NAME = pkg.name;
process.env.PROJECT_VERSION = pkg.version;

module.exports = {
  output: path.resolve(__dirname, '../', 'build'),
  entry: path.resolve(__dirname, '../', 'src/index.js'),
  template: path.resolve(__dirname, '../', 'public/index.html'),
  public: path.resolve(__dirname, '../', 'public'),
};
