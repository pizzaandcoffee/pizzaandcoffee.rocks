let path = require('path');
let qs = require('qs');
let argv = require('minimist')(process.argv.slice(2));
let ExtractTextPlugin = require('extract-text-webpack-plugin');

let isProduction = !!((argv.env && argv.env.production) || argv.p);
let sourceMapQueryStr = !isProduction ? '+sourceMap' : '-sourceMap';

// webpack2 configuration: https://webpack.js.org/configuration/
module.exports = {
  cache: true,
  entry: {
    app: ['babel-polyfill', path.resolve(__dirname, '../src/main.js')]
  },
  output: {
    chunkFilename: '[id].chunk.js',
    filename: 'js/[name].[hash].js',
    path: path.resolve(__dirname, '../build'),
    sourceMapFilename: '[name].[hash].js.map'
  },
  resolve: {
    extensions: ['*', '.js', '.vue', '.css', '.json', '.html', '.scss'],
    alias: {
      assets: path.resolve(__dirname, '../src/assets'),
      components: path.resolve(__dirname, '../src/components'),
      src: path.resolve(__dirname, '../src'),
      vue$: 'vue/dist/vue.js'
    }
  },
  devServer: {
    historyApiFallback: true,
    disableHostCheck: true,
    inline: true
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        exclude: /node_modules/,
        loader: 'eslint-loader',
        test: /\.(js|vue)$/
      },
      {
        exclude: [/node_modules/, /src\/authentication\/silent-callback.html/],
        loader: 'html-loader',
        test: /\.html$/,
        options: {
          minimize: true,
          removeComments: false,
          collapseWhitespace: false
        }
      },
      {
        exclude: [/(node_modules)(?![/|\\](bootstrap|foundation-sites))/],
        test: /\.js$/,
        use: [{
          loader: 'babel-loader',
          options: {
            presets: [['es2015', { modules: false }]],
            cacheDirectory: true
          }
        }]
      },
      {
        exclude: /node_modules/,
        loader: 'vue-loader',
        test: /\.vue$/,
        options: {
          loaders: {
            js: 'buble-loader?objectAssign=Object.assign',
            scss: 'vue-style-loader!css-loader!sass-loader', // <style lang="scss">
            sass: 'vue-style-loader!css-loader!sass-loader?indentedSyntax' // <style lang="sass">
          }
        }
      },
      {
        test: /\.css$/,
        include: path.resolve(__dirname, '../src'),
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            `css-loader?${sourceMapQueryStr}`
          ]
        })
      },
      {
        test: /\.scss$/,
        include: path.resolve(__dirname, '../src'),
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          publicPath: '../',
          use: [
            `css-loader?${sourceMapQueryStr}`,
            `resolve-url-loader?${sourceMapQueryStr}`,
            `sass-loader?${sourceMapQueryStr}`
          ]
        })
      },
      {
        test: /\.(png|jpe?g|gif|svg|xml|json)$/,
        include: path.resolve(__dirname, '../src'),
        loaders: [
          `file-loader?${qs.stringify({
            name: 'assets/img/[name].[ext]'
          })}`
        ]
      },
      {
        test: /\.(ttf|eot)$/,
        include: path.resolve(__dirname, '../src'),
        loader: `file-loader?${qs.stringify({
          name: 'assets/vendor/[name].[ext]'
        })}`
      },
      {
        test: /\.woff2?$/,
        include: path.resolve(__dirname, '../src'),
        loader: `url-loader?${qs.stringify({
          limit: 10000,
          mimetype: 'application/font-woff',
          name: 'assets/vendor/[name].[ext]'
        })}`
      },
      {
        test: /\.(ttf|eot|woff2?|png|jpe?g|gif|svg)$/,
        include: /node_modules/,
        loader: 'file-loader',
        query: {
          name: 'assets/vendor/[name].[ext]'
        }
      }
    ]
  }
};
