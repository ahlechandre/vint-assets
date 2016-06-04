var debug = (process.env.NODE_ENV !== "production");
var webpack = require('webpack');
var vintEnv = require('./scripts/env');
var webpackProvidePlugin = new webpack.ProvidePlugin({
  $: 'jquery',
  jQuery: 'jquery',
});

module.exports = {
  context: __dirname,
  entry: vintEnv.entry,
  output: {
    path: __dirname,
    filename: vintEnv.output.filename,
  },
  module: {
    loaders: [
      { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" }
    ]
  },
  plugins: debug ? [webpackProvidePlugin] : [
    webpackProvidePlugin,
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      },
      mangle: false,
      sourcemap: false
    }),
  ],
};
