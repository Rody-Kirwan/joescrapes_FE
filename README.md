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
  - Run: `mkdir src && mkdir src/app && touch src/index.html && touch src/app/app.js`
  
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
  - copy the following to src/index.html
  ```
  <!doctype html>
  <html>
    <head>
      <meta charset="utf-8">
      <title>App Title</title>
      <meta name="description" content="">
      <meta name="viewport" content="width=device-width">

    </head>
    <body>
      <div class="app" id="root">
        LOADING
      </div>
    </body>
  </html>
  ```
  
  - copy the following to src/app/app.js
  ```
  export const testFunction = () => {
    alert('Up and running here we go!')
  }

  testFunction();
  ```

  - run `npm run build && npm run dev`
  - open `http://localhost:3200`
  
  *you should now see the alert message from app.js*

  - change the message in app.js and save
  
  *app should rebuild with new alert message*
  
  ### Ignoring all of this you can just clone the repo and run
  `npm run build && npm run dev`

  # Badabing!

  ## Step 2 - Setting up Testing Process

  *This is mainly stuff you'll rarely have to touch put good to know why it's there. I think formatting is quite important for any collaborative project. It means that both our code will be written relatively similar and be a lot easier to read for both of us and any one external to the project.*
  
  *I'm adding some realtime lint rules so that your editor will flag errors in your coding style as you write. The rules are pretty strict but our code will look nice and purty.*

  *I'm also adding a lint test run before you puah to the frontend repo via githooks - If you have any errors in your code this will stop you pushing to the repo and point tyou to the files where your errors are*

  ### Install Lint Dependencies

   - Run: `npm i -D eslint_d eslint-config-airbnb eslint-plugin-react eslint-plugin-import eslint-plugin-jsx-a11y git-pre-hooks`

   - Copy the following json to a file called `.eslintrc` in the root directory

    
    {
      "parser": "babel-eslint",
      "env": {
        "browser": true,
        "es6": true
      },
      "extends": "airbnb",
      "parserOptions": {
        "sourceType": "module",
        "ecmaFeatures": {
          "jsx": true
        }
      },
      "plugins": [
        "react"
      ],
      "globals": {
        "describe": true,
        "jest": true,
        "expect": true,
        "it": true,
        "beforeEach": true,
        "spyOn": true,
        "afterEach": true
      },
      "rules": {
        "comma-dangle": [
          "warn",
          "never"
        ],
        "import/no-extraneous-dependencies": [
          "error", 
          { "devDependencies": true }
        ],
        "no-underscore-dangle": [
          "error", { "allow": ["_id"] }
        ],
        "react/jsx-filename-extension": [
          1,
          { "extensions": [".js", ".jsx"] }
        ],
        "indent": [
          "warn",
          2
        ],
        "linebreak-style": [
          "warn",
          "unix"
        ],
        "quotes": [
          "error",
          "single"
        ],
        "semi": [
          "error",
          "always"
        ],
        "no-unused-expressions": "warn",
        "no-useless-concat": "warn",
        "block-scoped-var": "error",
        "consistent-return": "error"
      }
    }
    

   - To your scripts object in package.json - add 
   
    
    "lint": "eslint_d src --ext js,jsx"
    
    
   *This tells the lint tests to run on any file in src with the extension .js or .jsx (react)*

   - Finally we add the git-prehook to run the lint tests before we push. At the top-level in package.json add:
   
    
    "git-pre-hooks": {
      "pre-push": "npm run lint"
    }
    

  *Now if you try to commit and push your changes you should be blocked. You will need to update app.js to follow our new rules*
  
    
    const testFunction = () => alert('Up and running here we go!');
    
    testFunction();

    export default testFunction;
    
    
 
# Add React Support and Initial React Component

## Install Dependencies
*React requires three dependencies to run properly*

  - Run `npm i react react-dom prop-types`
  
*We also need the babel transpiler to understand react code written in .jsx*

  - Run `npm i -D babel-cli babel-preset-react`
  
 ## Configure Babel
  
  - We also need to add a babel configuration file to the root directory: `touch .babelrc`
  
  - Then copy the following to .babelrc
  
    ```
    {
      "presets": ["env", "react"],
      "plugins": ["transform-object-rest-spread", "transform-class-properties", "transform-es2015-modules-commonjs"]
    }
    ```
  *these are extra plugins to convert some less supported es6 patterns*

## Create an Initial App Container Component 
  
  - Now we add our first react component in components/app/App.js [*I use a capital letter for component filenames*]
  
    ```
    // src/components/app/App.js
    import React, { Component } from 'react';
    import PropTypes from 'prop-types';

    class App extends Component {
      static propTypes = {
        title: PropTypes.string.isRequired
      }

      handleClick = (e) => {
        alert(e);
      }

      render() {
        const { title } = this.props;
        return (
          <div>
            <h1>{title}</h1>
            <button
              onClick={((e) => {
                this.handleClick(e);
              })}
            >
              Test Click
            </button>
          </div>
        );
      }
    }

    export default App;
    ```
 
  - Finally we need our root app.js file to import this component and render it within our index.html root <div>
  
    ```
    // src/app/app.js
    import React from 'react';
    import { render } from 'react-dom';

    import App from './components/app';

    render(
      <App title="My Test Title" />,
      document.getElementById('root')
    );
    ```
    
 Now you should be able to run `npm run dev` and view your working component at `localhost:3200`
 
 # BOSH!


# Add CSS support using SASS as a pre-processor

*SASS is basically a pumped up CSS processor. You can use nesting, create variables and write functions that outpucan then be transpiled into normal CSS that any browser can read. The basic syntax is the same so not much of a learning curve from writing normal CSS. This is just a step by step to setting it up with our webpack bundler so that during a build it takes all our .scss modules and compiles them into a single css file which is referenced in index.html*

## Install Dependencies
*SASS-WEBPACK requires a few libraries in order to work the way we want - realistically it only needs node-sass. But because we want webpack to be able to read and compile it we also need a few style-loading libraries in order for webpack to deal with .scss file type*

  - Run `npm i -D node-sass sass-loader css-loader style-loader`
  
*Then we also want webpack to bundle all our separate sass files into a single file and generate a stylesheet link in index.html - for that we need a plugin*

  - Run `npm i -D extract-text-webpack-plugin@next`

## Add some styling to our App component.
  
  - In `components/app/App.js` add a class "app-container" to the surrounding div element.

    ```
    <div className="app-container">
      <h1>{title}</h1>
      <button
        onClick={((e) => {
          this.handleClick('I\'ve done clicked the button');
        })}
      >
        Test Click
      </button>
    </div>
    ```
  
  *Note: In jsx (react) the syntax for adding a DOM class is `className=""` instead of `class=""`*
  
  - Then within the components/app directory - create App.scss. This will host only the styling for the App component and is a pattern we'll use throughout development.

  - Add the following to App.scss
  
    ```
    .app-container {
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: auto;
      background: red;
      padding: 20px;
    }
    ```

  *this is just some test styling to make sure everything is working when we're done.*

  - Now we want to import this into our app component - add `import './App.scss'` at the top of App.js. Your file should look like the following:

    ```
    import PropTypes from 'prop-types';

    import './App.scss';

    class App extends Component {
      static propTypes = {
        title: PropTypes.string.isRequired
      }

      handleClick = (msg) => {
        alert(msg);
      }

      render() {
        const { title } = this.props;

        return (
          <div className="app-container">
            <h1>{title}</h1>
            <button
              onClick={(() => {
                this.handleClick('I\'ve done clicked the button');
              })}
            >
              Test Click
            </button>
          </div>
        );
      }
    }

    export default App;

    ```
  
  - Now start up webpack again `npm run dev`

  *We should get an error here in the terminal telling us that webpack does not understand the file and that we may need the appropriate loader*

  ## Configure Webpack for SASS

  - First of we need to import the extract-text-plugin. At the top of `webpack-dev.config.js` add `const ExtractTextPlugin = require('extract-text-webpack-plugin');`

  - Then add the plugin to the config - in the plugins array - add the following:

    ```
    new ExtractTextPlugin({
      filename: '[name].css',
      disable: process.env.NODE_ENV === 'development'
    })
    ```
  *Note: The filename field will name our css file based on our entrypoint i.e app.css*
  
  - We also need to add the loader so that webpack can process sass files. In the module.rules array add:

    ```
    {
      test: /\.scss$/,
      use: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: [
          {
            loader: 'css-loader'
          },
          {
            loader: 'sass-loader'
          }
        ]
      })
    }
    ```
  *This tells webpack that for any files with .scss extension we want to compile them with sass-loader*

  ### Your webpack-dev.config should now look like this:

    ```
    const webpack = require('webpack');
    const HtmlWebpackPlugin = require('html-webpack-plugin');
    const ExtractTextPlugin = require('extract-text-webpack-plugin');

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
      module: {
        rules: [
          {
            test: /\.jsx?$/,
            exclude: /node_modules/,
            loader: 'babel-loader'
          },
          {
            test: /\.scss$/,
            use: ExtractTextPlugin.extract({
              fallback: 'style-loader',
              use: [
                {
                  loader: 'css-loader'
                },
                {
                  loader: 'sass-loader'
                }
              ]
            })
          }
        ]
      },
      mode: 'development', // Determines how the bundle is built e.g(whether it's minified or not) - see: https://medium.com/webpack/webpack-4-mode-and-optimization-5423a6bc597a 
      devtool: 'eval', // Again determines how the bundle is built - theres a few different options - eval is good for debugging in development
      devServer: {
        contentBase: './build', // This tells the devServer where to serve files from i.e where ever index.html is
        port: 3200 // Port that the app will be served on - i.e http://localhost:3200
      },
      plugins: [
        // This plugin bundles our scss files into browser readable css and generates the
        // stylesheet link in index.html.
        new ExtractTextPlugin({
          filename: '[name].css',
          disable: process.env.NODE_ENV === 'development'
        }),
        // This plugin will move our html files to the build folder and
        // generate the <script> tags for our bundle
        new HtmlWebpackPlugin({
          template: './src/index.html', // The original html file
          filename: '../index.html' // The output html file
        })
      ]
    };
    ```

  You should now be able to run `npm run dev` and see that your styles are now working.

# WOOP!


# Add Icon Support - Font Awesome

  *This is just a small step to add an icon library that we can use throughout the application. We'll use the font-awesome-react library as it seems pretty simple to implement and maintain*

## Install Dependencies

  - Run `npm i --save @fortawesome/fontawesome @fortawesome/react-fontawesome @fortawesome/fontawesome-free-brands @fortawesome/fontawesome-free-solid`

  - Create an icons.js - Run `touch ./src/app/icons.js`

  - Add the following to icons.js

    ```
    import fontawesome from '@fortawesome/fontawesome';
    import brands from '@fortawesome/fontawesome-free-brands';
    import { faCheckSquare, faCoffee } from '@fortawesome/fontawesome-free-solid';


    const initIcons = () => fontawesome.library.add(brands, faCheckSquare, faCoffee);

    export default initIcons;
    ```
*Now we import icons here as needed - we'll initialise thee library in App.js later*
# Thats it! 



# Add Component State

*So this is a pretty big leap into actually having a working Application. When I talk about state - I mean data storage and maintenance for a component tree.*
*For this step we want to use our test data (from the scheduleNTS.json) to populate the App component with a list of Event Components for each json event.*
*Then - When the user selects an event - we want to do two things.*
  - POST our data to an API which will create the calendar events via your script
  - If that request is successful - we want to store the artist as a selecteArtist so that we can reflect that visually in the UI. [*Eventually we should store this in a persistent DB but this is good for now*]


## Create and Import Mock Data
*Obviously down the line we will be fetching this data from an API but for the moment we'll mock it here*

  - Create a data folder containing schedule.js. Run `mkdir ./src/app/data && touch ./src/app/data/schedule.js`

  - Convert your json into a JS Array of objects and export it from schedule.js *[See: the file above]*

  - Import the data into App.js (At the top of the file)

    ```
    import schedule from '../../../data/schedule';
    ```
## Render Clickable Event Tiles
  
  *Now we want to create a clickable tile for each event. As schedule is an array we can loop over the array of objects and return a div element (with the event title) for each one.*


  - Add the following to the render method in App.js:

    ```
    render() {

      return (
        <div className="app-container">
          { schedule.map(event => (
            <div
              onClick={(() => alert(`clicked ${event.title}`))}
              className="event"
            >
              { event.title }
            </div>
          ))
          }
        </div>
      );
    }
    ```

  *Now when you save you should see a plain list of all the event titles*
  *We'll need some styling*

  - Add the following to App.scss

    ```
    .event {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      // flex-basis: 10%;
      flex-grow: 1;
      text-align: center;
      box-sizing: border-box;
      padding: 20px;
      height: 100px;
      background: #efefef;
      border: 1px solid #ddd;
      cursor: pointer;

      &:focus {
        outline: 0; // this just overrides browser highlighting of focused elements
      }
    }
    ```

  *Now you should have some nice clickable event tiles for each artist. Clicking on an element should throw a browser alert with the selected event name*

## Store Selected Events in Component State
*Instead of throwing an alert message with the event name - we want to store each selected event in our Application state. This way we can reflect selected events in the UI by giving those tiles a different colour.*

  - First of all we need to add a component-state object with initial values - with in App.js add:

    ```
    state = {
      user: 'rody.kirwan@gmail.com',
      selectedEvents: []
    }
    ```

  - We also want to add a function that will update selectedEvents with each event we click on:

    ```
    selectEvent = event => {
      const { selectedEvents } = this.state;

      this.setState({
        selectedEvents: [...selectedEvents, event]
      });
    }
    ```
  *Above you take the existing selectedEvents array from the state - then we reset the state with a new array containing the existing selectedEvents and the new event*
  *We want to call this function in place of our alert()*
  *Note: the `[...selectedEvents]` syntax is known as object-spread - it will take the contents of one object or array and spread them into the new object*
  ### Important: Each time setState is called the component will re-render to reflect the updated data

  - Update the onClick function to call `selectEvent()`

    ```
    <div className="app-container">
      { schedule.map(event => (
        <div
          onClick={(() => this.selectEvent(event.title))}
          className="event"
        >
          { event.title }
        </div>
      ))
      }
    </div>
    ```

  *Now each time we click a tile the event name is added to our selectedEvents array. With this in place we can track which tiles have been selected by checking if the title exists in the array*
  *If the title exists in the array - we are going to change the background colour of the tile to blue by adding a CSS class*

  - Update the render function with the following:

    ```
    render() {
      const { selectedEvents } = this.state;

      return (
        <div className="app-container">
          { schedule.map(event => (
            <div
              onClick={(() => this.selectEvent(event.title))}
              className={`event ${selectedEvents.includes(event.title) ? 'selected' : ''}`}
            >
              { event.title }
            </div>
          ))
          }
        </div>
      );
    }
    ```
  ### Probably a few things to clarify here
  *As you can see I've updated the className of the event tile with - what's called - a template literal. Using backticks instead of quote marks we can concatenate strings with JS expressions wrapped in ${}.*
  *The expression used above is basically a one-line if statement. (A pattern used a lot in JS.) It would equate to the following:*

    ```
    if (selectedEvents includes(event.title)) {
      print 'selected'
    } else {
      print = ''
    }
    ```

  *So for any selected tile will receive an added css class 'selected'*

  *I'm also using a pattern called "object destructuring" to declare variables - i.e `const { selectedEvents } = this.state`*
  *This is basically a means of plucking object attributes into separate variables. `const selectedEvents = this.state.selectedEvents`*
  *I suppose the pattern becomes more useful when you want to do something like `const { a, b, c, d, e } = obj`*

  - Now we need to add a modifier class to the CSS. In App.scss add the following for .event:

    ```
    &.selected {
      background: aliceblue;
    }
    ```

  *App.scss should look like this:*

    ```
    .app-container {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      // height: 100%;

      button {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 10px 20px;
        width: 200px;
      }
    }

    .event {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      flex-grow: 1;
      text-align: center;
      box-sizing: border-box;
      padding: 20px;
      height: 100px;
      background: #efefef;
      border: 1px solid #ddd;
      cursor: pointer;

      &.selected {
        background: aliceblue;
      }

      &:focus {
        outline: 0;
      }
    }
    ```
  
  *App.js should look like this:*

    ```
    import React, { Component } from 'react';
    import schedule from '../../../data/schedule';

    import './App.scss';

    class App extends Component {
      state = {
        user: 'rody.kirwan@gmail.com',
        selectedEvents: []
      }

      selectEvent = (event) => {
        const { selectedEvents } = this.state;

        this.setState({
          selectedEvents: [...selectedEvents, event]
        });
      }

      render() {
        const { selectedEvents } = this.state;

        return (
          <div className="app-container">
            { schedule.map(event => (
              <div
                onClick={(() => this.selectEvent(event.title))}
                className={`event ${selectedEvents.includes(event.title) ? 'selected' : ''}`}
              >
                { event.title }
              </div>
            ))
            }
          </div>
        );
      }
    }

    export default App;
    ```


  **Now selecting tiles should be turn them blue**

 
## Move Event Tiles into Separate Component
*In order to keep things neat we want to break things up into separate components where it makes sense. In this case - we should move our event tiles into a separate Event component and pass down the data and functionality via props*

  - Create an event directory in components `mkdir src/app/components/event`
  
  - Create required component files `touch ./src/app/components/event/Event.js ./src/app/components/event/Event.scss ./src/app/components/event/index.js`

  - To Event.js add the following:

    ```
    import React, { Component } from 'react';
    import PropTypes from 'prop-types';

    import './Event.scss';

    class Event extends Component {
      static propTypes = {
        event: PropTypes.objectOf(PropTypes.string).isRequired,
        selectEvent: PropTypes.func.isRequired,
        selected: PropTypes.bool.isRequired
      }

      selectEvent = title => this.props.selectEvent(title)

      render() {
        const { event, selected } = this.props;
        const isSelected = selected ? 'selected' : '';
        return (
          <div
            onClick={(() => this.selectEvent(event.title))}
            className={`event ${isSelected}`}
          >
            { event.title }
          </div>
        );
      }
    }

    export default Event;
    ```

  - Then move the CSS for `.event` from App.scss to Event.scss

    ```
    // Event.scss

    .event {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      // flex-basis: 10%;
      flex-grow: 1;
      text-align: center;
      box-sizing: border-box;
      padding: 20px;
      height: 100px;
      background: #efefef;
      border: 1px solid #ddd;
      cursor: pointer;

      &.selected {
        background: aliceblue;
      }

      &:focus {
        outline: 0;
      }
    }
    ```

  - Finally in event/index.js add the following:

    ```
    export { default } from './Event'
    ```

  *We don't want low level components to have any state management or complexity, so we pass all functions and data via props from it's parent - in this case App.js*
  *Props are basically function parameters - Here, in the propTypes object we are telling the component that we expect/require 3 parameters for the component to work:*

  - An "event" which should be an object
  - "selectArtist" which should be a function
  - "selected" which is a boolean
  


  *Now we can update App.js to use our new component*

  - Import the Event Component `import Event from '../event';`

  - Replace the schedule.map function with the following:

    ```
     { schedule.map(event => (
        <Event
          selected={selectedEvents.includes(event.title)}
          selectEvent={this.selectEvent}
          event={event}
          key={event.title.split(' ').join('_')}
        />
      ))
      }
    ```

  *App.js should now look like this:*

    ```
    import React, { Component } from 'react';
    import Event from '../event';
    import schedule from '../../../data/schedule';

    import './App.scss';

    class App extends Component {
      state = {
        user: 'rody.kirwan@gmail.com',
        selectedEvents: []
      }

      selectEvent = (event) => {
        const { user, selectedEvents } = this.state;

        this.setState({
          selectedEvents: [...selectedEvents, artist]
        });
      }

      render() {
        const { selectedEvents } = this.state;

        return (
          <div className="app-container">
            { schedule.map(event => (
              <Event
                selected={selectedEvents.includes(event.title)}
                selectEvent={this.selectEvent}
                event={event}
                key={event.title.split(' ').join('_')}
              />
            ))
            }
          </div>
        );
      }
    }

    export default App;
    ```
  *Instead of renering a div element for each event - we now render an Event component using .jsx syntax `<Event />` we can then pass props down to the component like html attributes*
  **Note: The key attribute should be a unique id for each element in a loop.* 


## POST Selected Events to an API
*Currently when we click an "Event Tile" we are only adding superficial functionality. Nothing is actually changing except our display*
*Before we store our selected event we want to POST a request to the server to initiate the Google Calendar Script. Only when that request is successful do we want to store our event as selected*

  - Install fetch library for http requests `npm i --save fetch`

  *We want the fetch function to be global so we will add the dependency as an entry in webpack config*

  - Update webpack-dev.config with the following:

    ```
    entry: {
      app: [
        'babel-polyfill', // polyfill transpiles es6 javascript => es5 javascript (certain browsers will not read es6 yet, but we want to write es6)
        'whatwg-fetch', // This will globalise the fetch method that we will use for XHRhttp requests
        './src/app/app' // This is the point where the bundle begins
      ],
    },
    ```
  
  - Create an app/modules directory `mkdir src/app/modules` [*the modules directory will eventually manage all data but for now we will just maintain API requests*]

  - Create an events directory with an api.js file `mkdir src/app/modules/events && touch api.js`

  - Add the following function to api.js:

    ```
    const sendCalendarRequest = (payload) => {
    const url = 'api/calendar/add';

    const OPTIONS = {
      credentials: 'same-origin',
      method: 'POST',
      body: JSON.stringify(payload),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    };

    return fetch(url, OPTIONS)
      .then((response) => {
        if (!response.ok) {
          return Promise.reject(response);
        }
        return Promise.resolve(response.json());
      })
      .then(json => json);
    };

    export default sendCalendarRequest;
    ```
  

  - Import the function in our App.js component `import sendCalendarRequest from '../../modules/events/api';`

  - Now update the selectEvent function:

    ```
    selectEvent = (event) => {
      const { user, selectedEvents } = this.state;

      sendCalendarRequest({
        user,
        event
      }).then(() => this.setState({
        selectedEvents: [...selectedEvents, event]
      }));
    }
    ```

  *JS uses something called promises for async functions (like http request).*

  **A promise has three states:**

  - pending (operation is in-flight)
  - fulfilled (operation is successful)
  - rejected (operation failed)

  *Here we are sending our data `{ user: 'rody.kirwan@gmail.com', event: event }` to an API at the url specified in the fetch function.*
  *When that API responds with a success - then we add our event to selectedEvents thereby truely reflecting the persisted state of our application*

  **This request will return with a 404 fail at the moment as the endpoint does not exist**
  *However, you can check the network tab to verify the request is being made*




  # Add Support for Absolute Filepaths
  *This step is quite a small thing. I just want to remove the relative filepaths from our module imports i.e (`import x from '../../../components/x'` => `import x from 'components/x'`).*
  *For this we need to install a path resolver plugin and config*

  ## Install Dependencies

  - Run npm i --save babel-plugin-module-resolver eslint-import-resolver-babel-module

  *Note: Normally we would only need the 'babel-plugin' for this but because we're running lint tests before each push - we also need eslint to resolve the paths as well.*

  - In `.babelrc` add the following to the plugins array:

      ```
      "plugins": [
        "transform-object-rest-spread",
        "transform-class-properties",
        "transform-es2015-modules-commonjs",
        [
          "module-resolver",
          {
            "root": "./",
            "alias": {
              "components": "./src/app/components",
              "data": "./src/data"
            }
          }
        ]
      ]
      ```
    
  *So now when we `import foo from 'components/foo'` babel will check the module-resolver plugin and look for an alias from 'components'. It will resolve the filepath as if accessing from the root of the app*

  - Then we just need to tell eslint to use the babel-plugin. To `eslint.rc` - below the "rules" field - add:

      ```
      "settings": {
        "import/resolver": {
          "babel-module": {}
        }
      }
      ```

  - Finally, we can change our relative file paths for 'data' and 'components' directory

    ```
    // app/app.js

    import App from 'components/app';

    ...

    ```

    ```
    // components/app/App.js

    import Event from 'components/event';
    import schedule from 'data/schedule';   

    ...
    ```

  - Just realised `esint_d` lib won't accept the resolver so just update the "lint" script in `package.json` to:

      ```
      "lint": "eslint src --ext js,jsx"
      ```

  # That's it for the moment as far as the frontend is concerned! 
  ## We need to build a small node server that will accept our calendar request.

  - Head over to  https://github.com/Rody-Kirwan/joescrapes_BE.

