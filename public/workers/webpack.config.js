const webpack = require("webpack");
const path = require("path");

module.exports = {
  entry: "./fp-growth.worker.js",
  output: {
    filename: "fp-growth.worker.bundle.js",
    path: path.resolve(__dirname),
    libraryTarget: "umd",
  },
  target: "web",
  plugins: [
    new webpack.ProvidePlugin({
      process: "process/browser",
    }),
  ],
  resolve: {
    fallback: {
      process: require.resolve("process/browser"),
    },
  },
};
