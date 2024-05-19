# React-18-webpack-setup
Create new react application from scratch using webpack 5

## Basic steps:
1. Create a folder for react project
2. Go inside of newly created folder and run `npm init` command to generate package.json
3. Create `public` folder inside project folder and create `index.html` file
4. Create the `src` folder inside the react project folder
5. Create `App.css`, `App.js` and `index.js` inside the `src` folder
6. Install the `react` and `react-dom` node packages `npm i react react-dom`

## Babel transpiler configutation:
1. To run the React with `ES6` module which supports `jsx` syntax. Install the following node packages `npm i --save-dev @babel/core @babel/preset-env @babel/preset-react @babel/cli`
2. Create the `.babelrc` configuration file, this tells babel transpiler to what preset and plugins to use to transpile our code

## Webpack setup and configutation
Webpack run the custom build on the React code from source directory and converts ES6 or JSX syntax in to common-js syntax. It host output in to our public directory to view our react application in to browser.
1. Install following npm packages `npm i --save-dev webpack webpack-cli webpack-dev-server babel-loader css-loader style-loader url-loader sass sass-loader html-webpack-plugin`
2. Create the `webpack.config.js` file and add the webpack configuration
3. Add the following script in package.json `"dev": "webpack serve --mode development"`
4. Add the following script in package.json `"webpack --mode production"`

### NPM commands
```
npm init
npm i react react-dom
npm i --save-dev @babel/core @babel/preset-env @babel/preset-react @babel/cli
npm i --save-dev babel-loader css-loader html-webpack-plugin style-loader sass sass-loader html-webpack-plugin url-loader 
npm i --save-dev webpack webpack-cli webpack-dev-server
```

### App.js code
```
import React from 'react';
import './App/css';

const App = () => {
    return (
        <div className="App">
            <h1>Hello React</h1>
        </div>
    )
}
export default App;
```

### index.js code
```
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

ReactDOM.render(<App />, document.getElementById('root'));
```
### index.js for React-18
```
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

const container = document.getElementById('root');
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(<App />);
```
### HTML Code
```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>React Ecosystem</title>
</head>
<body>
    <div id="root"></div>
    <noscript>Please enable the javascript to view this application.</noscript>
    <script src="../dist/bundle.js"></script>
</body>
</html>
```
### Webpack configuration
```
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: path.join(__dirname, "src", "index.js"),
    mode: 'development',
    output: {
        path: path.resolve(__dirname, 'dist/'),
        filename: 'bundle.js'
    },
    devServer: {
        port: 3000,
        historyApiFallback: {
            index: 'index.html',
        }
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.join(__dirname, "public", "index.html"),
        })
    ],
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react']
                    }
                }
            },
            {
                test: /\.(sa|sc|c)ss$/,
                use: ["style-loader", "css-loader", "sass-loader"]
            },
            {
                test: /\.(png|woff|woff2|eot|ttf}svg)ss$/,
                loader: "url-loader",
                options: {
                    limit: false
                }
            }
        ],
    },
};
```
