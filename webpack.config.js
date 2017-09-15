var path = require('path');

module.exports = {
  entry: './app.js',
  output: {
    filename: './app-bundle.js',
    path: path.resolve(__dirname, './js')
  },
  module: {}
};