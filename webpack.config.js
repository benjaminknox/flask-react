const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

let node_modules = path.join(__dirname, "node_modules");
(rootAssetPath = "./assets"),
  (extractSASS = new MiniCssExtractPlugin({
    filename: "[name].css",
  })),
  (buildPath = path.join(__dirname, "static")),
  (manifestPath = path.join(buildPath, "manifest.json"));

module.exports = {
  entry: {
    app_js: ["./js/app.js"],
    app_css: [rootAssetPath + "/scss/app.scss"],
  },
  output: {
    path: buildPath,
    publicPath: "/static/",
    filename: "[name].js",
    chunkFilename: "[id].chunk",
  },
  resolve: {
    extensions: [".js", ".scss", ".css"],
    modules: [node_modules],
  },
  resolveLoader: {
    modules: [node_modules],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/i,
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader",
            options: { presets: ["@babel/preset-react"] },
          },
        ],
      },
      {
        test: /(\.scss|\.css)$/i,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
          },
          {
            loader: "sass-loader",
          },
        ],
      },
      {
        test: /\.(jpe?g|png|gif|eot|ttf|woff|woff2|otf|svg([\?]?.*))$/i,
        use: [
          {
            loader:
              "file-loader?context=" +
              rootAssetPath +
              "&name=[path][name].[ext]",
          },
          {
            loader:
              "image-webpack-loader?bypassOnDebug&optimizationLevel=7&interlaced=false",
          },
        ],
      },
    ],
  },
  watchOptions: {
    aggregateTimeout: 300,
    poll: 500,
    ignored: '**/node_modules',
  },
  plugins: [
    extractSASS,
  ],
};
