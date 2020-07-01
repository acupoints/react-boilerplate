var webpack = require('webpack');

/*
 * Default webpack configuration for development
 */
var config = {
  devtool: 'eval-source-map',
  entry:  __dirname + "/app/App.js",
  output: {
    path: __dirname + "/public",
    filename: "bundle.js"
  },
  module: {
    rules: [{
      test: /\.jsx?$/,
      use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/env','@babel/react']
          }
      },
      exclude: /node_modules/,
    }]
  },
  devServer: {
    contentBase: "./public",
    // colors: true,
    // historyApiFallback: true,
    // inline: true,
    hot: true
  },
}

/*
 * If bundling for production, optimize output
 */
if (process.env.NODE_ENV === 'production') {
  config.devtool = false;
  config.plugins = [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({comments: false}),
    new webpack.DefinePlugin({
      'process.env': {NODE_ENV: JSON.stringify('production')}
    })
  ];
};

module.exports = config;
