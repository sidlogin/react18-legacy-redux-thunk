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
        port: 3001,
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