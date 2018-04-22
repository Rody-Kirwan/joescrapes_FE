const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    app: [
      'babel-polyfill', // polyfill transpiles es6 javascript => es5 javascript (certain browsers will not read es6 yet, but we want to write es6)
      './src/app/app' // This is the point where the bundle begins
    ],
  },
  output: {
    filename: '[name].js', // Filename for output bundle - [name] place holder will be replaced by the entry point filename
    path: `${__dirname}/build/app/`, // Directory where bundle file will be put
    publicPath: '/build/' // public path to the app root
  },
  mode: "development", // Determines how the bundle is built e.g(whether it's minified or not) - see: https://medium.com/webpack/webpack-4-mode-and-optimization-5423a6bc597a 
  devtool: 'eval', // Again determines how the bundle is built - theres a few different options - eval is good for debugging in development
  devServer: {
    contentBase: "./build", // This tells the devServer where to serve files from i.e where ever index.html is
    port: 3200 // Port that the app will be served on - i.e http://localhost:3200
  },
  plugins: [
    // This plugin will move our html files to the build folder and generate the <script> tags for our bundle
    new HtmlWebpackPlugin({
      template: './src/index.html', // The original html file
      filename: '../index.html' // The output html file
    })
  ]
};