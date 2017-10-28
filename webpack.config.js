const path = require('path');
const ManifestPlugin = require('webpack-manifest-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

var node_modules = path.join(__dirname, 'node_modules');
    rootAssetPath = './assets',
    extractSASS = new MiniCssExtractPlugin('[name].[chunkhash].css'),
    buildPath = path.join(__dirname, 'webkit-build'),
    manifestPath = path.join(buildPath, 'manifest.json');

module.exports = {
  entry: {
    app_js: [ './js/app.js' ],
    app_css: [ rootAssetPath + '/scss/app.scss' ]
  },
  output: {
    path: buildPath,
    publicPath: "/dist/",
    filename: '[name].[chunkhash].js',
    chunkFilename: '[id].[chunkhash].chunk'
  },
  resolve: {
    extensions: ['.js', '.scss'],
    modules: [node_modules]
  },
  resolveLoader:{
    modules: [node_modules] },
  module: {
    rules: [
      { 
        test: /\.(js|jsx)$/i,
        exclude: /node_modules/,
        use : [{
          loader: 'babel-loader',
          options: { presets: ['@babel/preset-react'] } 
        }]
      }, { test: /\.scss$/i,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader'
          },
          {
            loader: 'sass-loader'
          }
        ]
      },
      { test: /\.(jpe?g|png|gif|eot|ttf|woff|woff2|otf|svg([\?]?.*))$/i,
        loaders: [
          'file-loader?context=' + rootAssetPath + '&name=[path][name].[hash].[ext]',
          'image-webpack-loader?bypassOnDebug&optimizationLevel=7&interlaced=false'
        ]
      },
    ]
  },
  watchOptions: {
    aggregateTimeout: 300,
    poll: 500
  },
  plugins: [
    extractSASS,
    new ManifestPlugin({
      fileName: manifestPath,
      publicPath: '/dist/',
    })
  ]
};
