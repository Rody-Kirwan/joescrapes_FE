# joescrapes_FE

## Setup Development Environment - Step 1
### Webpack Setup

*This is the first logical commit for setting up the frontend. There are a few of main steps involved in getting to this point.*

  - Setup Node Environment
  - Create Application Directory Structure
  - Install Initial Dependencies
  - Configure Webpack
  
### Installing Node

  - Run the following cmd in terminal: 
  `curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.9/install.sh | bash`
  - Then run `nvm install 9`
  - Check installation by `running node --version`
  
### Create Application Structure

  - Create a github repo and clone it to your desktop
  - cd in your directory
  - Run: `mkdir src && mkdir src/app && touch src/index.html && touch src/app/index.js`
  
### Install Dependencies

  - Run `npm init` and fill in each step.
    *[this will create a package.json file where application dependencies are listed and node scripts cmds are kept.]* 

    *Currently javascript is at version es7 but unfortunately not all browsers supports es7. So we need to install a code   transpiler to convert our es7 into es5 when the app is building so that all browsers can read it. For this we use* **babel**
  
  - Run `npm i -D babel-core babel-loader babel-polyfill babel-preset-env` [i => install, -D => dev-dependency]
  
    **Webpack** *is mainly a javascript bundler which takes all our .js files and bundles it into one file or several files depending on how it's configured. It also comes with a development server which makes it very easy to serve the app locally and rebuilds when you save a file change*
  
  - Install webpack dependencies: `npm i -D webpack webpack-dev-server webpack-cli html-webpack-plugin`

### Configure Webpack

- Create webpack config file: `touch webpack-dev.config.js`
***Basic Config***
```
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
```
  - Add the follwing script cmds to the top level of package.json:
```
"scripts": {
  "dev": "npm install && npm run frontend",
  "frontend": "webpack-dev-server --config webpack-dev.config.js",
  "build": "webpack --config webpack-dev.config.js"
},
```
  - run `npm run build && npm run dev`
