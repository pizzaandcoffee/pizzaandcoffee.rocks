let argv = require('minimist')(process.argv.slice(2));
let ExtractTextPlugin = require('extract-text-webpack-plugin');
let FaviconsWebpackPlugin = require('favicons-webpack-plugin');
let HtmlWebpackPlugin = require('html-webpack-plugin');
let imageminMozjpeg = require('imagemin-mozjpeg');
let ImageminPlugin = require('imagemin-webpack-plugin').default;
let OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
let path = require('path');
let webpack = require('webpack');
let WebpackCleanupPlugin = require('webpack-cleanup-plugin');
let WebpackNotifierPlugin = require('webpack-notifier');

let pkg = require('../package.json');

let isProduction = !!((argv.env && argv.env.production) || argv.p);

/**
 * Common plugins
 * @type {*[]}
 */
let commonPlugins = [
  new HtmlWebpackPlugin({
    inject: 'body',
    template: path.resolve(__dirname, '../src/index.html'),
    favicon: path.resolve(__dirname, '../src/assets/images/favicon.ico')
  }),
  new webpack.LoaderOptionsPlugin({
    minimize: isProduction,
    debug: !isProduction,
    stats: { colors: true },
    eslint: {
      configFile: path.resolve(__dirname, '../.eslintrc'),
      failOnWarning: false,
      failOnError: true
    }
  }),
  new ImageminPlugin({
    disable: false,
    optipng: {
      optimizationLevel: 7
    },
    gifsicle: {
      optimizationLevel: 3
    },
    pngquant: {
      quality: '65-90',
      speed: 4
    },
    svgo: {
      removeUnknownsAndDefaults: false,
      cleanupIDs: false
    },
    jpegtran: null,
    plugins: [imageminMozjpeg({
      quality: 75
    })]
  }),
  new ExtractTextPlugin({
    filename: 'styles/[name].[hash].css',
    allChunks: true
  })
];

/**
 * Develop plugins
 * @type {Array.<*>}
 */
let developPlugins = [
  new WebpackNotifierPlugin({
    title: pkg.name,
    contentImage: path.join(__dirname, '../src/assets/images/logo.png')
  }),
  new webpack.optimize.OccurrenceOrderPlugin(),
  new webpack.NoEmitOnErrorsPlugin()
];

/**
 * Production plugins
 * @type {Array.<*>}
 */
let productionPlugins = [
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: '"production"'
    }
  }),
  new WebpackCleanupPlugin(),
  new webpack.optimize.OccurrenceOrderPlugin(),
  new webpack.optimize.UglifyJsPlugin({
    compressor: {
      drop_console: true,
      warnings: false,
      screw_ie8: true
    }
  }),
  new OptimizeCssAssetsPlugin({
    cssProcessorOptions: {
      discardComments: {
        removeAll: true
      }
    }
  }),
  new FaviconsWebpackPlugin({
    title: `${pkg.name} - ${pkg.description}`,
    logo: path.resolve(__dirname, '../src/assets/images/logo.png'),
    prefix: 'assets/img/icons/',
    statsFilename: 'iconstats-[hash].json',
    icons: {
      android: true,
      appleIcon: true,
      favicons: true
    }
  })
];

module.exports = {
  develop: commonPlugins.concat(developPlugins),
  production: commonPlugins.concat(productionPlugins)
};
