const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    entry: {
        app: "./src/scripts/script.js",
    },
    output: {
        filename: "[name].bundle.js",
        path: path.resolve(__dirname, "dist"),
        clean: true,
    },
    module: {
        rules: [
        {
            test: /\.css$/,
            use: ["style-loader", "css-loader"],
        },
        {
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
            loader: "babel-loader",
            options: {
                presets: ["@babel/preset-env"],
            },
            },
        },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
        template: "./src/index.html",
        filename: "index.html",
        chunks: ["app"],
        }),
        new HtmlWebpackPlugin({
        template: "./src/archived.html",
        filename: "archived.html",
        chunks: ["app"],
        }),
    ],
};