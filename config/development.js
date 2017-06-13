var merge = require('webpack-merge');

var webpackBase = require('./webpack.base.js');
var plugins = require('./plugins');

module.exports = merge(webpackBase, {
  devtool: 'eval-source-map',
  plugins: plugins.develop
});
