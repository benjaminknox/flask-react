const path = require('path');
const ManifestRevisionPlugin = require('manifest-revision-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

var rootAssetPath = './assets';

var extractSASS = new ExtractTextPlugin('[name].[chunkhash].css');

module.exports = {
  entry: {
    app_js: [
      rootAssetPath + '/js/app.js'
    ],
    app_css: [
      rootAssetPath + '/scss/app.sass'
    ]
  },
  output: {
    path: path.resolve(__dirname, 'webkit-build'),
    publicPath: "http://localhost:8080/",
    filename: '[name].[chunkhash].js',
    chunkFilename: '[id].[chunkhash].chunk'
  },
  resolve: {
    extensions: ['.js', '.sass']
  },
  module: {
    loaders: [
      { test: /\.js$/i, loader: 'babel-loader', exclude: /node_modules/ },
      { test: /\.jsx$/i, loader: 'babel-loader', exclude: /node_modules/ },
      { test: /\.sass$/i, loader: extractSASS.extract(['css-loader', 'sass-loader']) }
    ]
  },
  devServer: {
    contentBase: './webkit-build',
    host: '0.0.0.0',
  },
  watchOptions: {
    aggregateTimeout: 300,
    poll: 500
  },
  plugins: [
    extractSASS,
    new ManifestRevisionPlugin(path.join('webkit-build', 'manifest.json'), {
      rootAssetPath: rootAssetPath,
      ignorePaths: ['/js', '/sass']
    })
  ]
};
