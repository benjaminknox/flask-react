const path = require('path');
const ManifestRevisionPlugin = require('manifest-revision-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

var rootAssetPath = './assets';

module.exports = {
  entry: {
    app_js: [
      rootAssetPath + '/js/app.js'
    ]
  },
  output: {
    path: path.resolve(__dirname, 'webkit-build'),
    publicPath: "http://localhost:8080/",
    filename: '[name].[chunkhash].js',
    chunkFilename: '[id].[chunkhash].js'
  },
  resolve: {
    extensions: ['.js', '.css']
  },
  module: {
    loaders: [
      { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ },
      { test: /\.jsx$/, loader: 'babel-loader', exclude: /node_modules/ }
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
    new ExtractTextPlugin('[name].[chunkhash].css'),
    new ManifestRevisionPlugin(path.join('webkit-build', 'manifest.json'), {
      rootAssetPath: rootAssetPath,
      ignorePaths: ['/js', '/css','/scss']
    })
  ]
};
