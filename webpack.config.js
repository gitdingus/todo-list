const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    mode: "development",
    entry: "./src/index.js",
    output: {
        filename: "main.js",
        path: path.resolve(__dirname, "./docs"),
    },
    devtool: 'inline-source-map',
    optimization: {
        minimize: false,
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./src/index.html",
        }),
    ],
    module: {
        rules: [
            {
                test: /\.svg$/i,
                type: "asset/resource",
            },
            {
                test: /\.png$/i,
                type: "asset/resource",
            },
            {
                test: /\.css$/i,
                use: [ "style-loader", "css-loader" ],
            },
            {
                test: /display-todo.html$/i,
                type: "asset/source",
            },
            {
                test: /new-todo-form.html$/i,
                type: "asset/source",
            },
            {
                test: /index.html$/i,
                use: [ "html-loader" ],
            }

        ],
    },
}