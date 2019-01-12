const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const PATHS = require("./paths");
const path = require("path");
const express = require("express");

const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
    template: path.join(PATHS.static, "/index.html"),
    filename: "index.html",
    inject: "body"
});

// set ENVIRON CONFIG
const WebpackDefinePluginConfig = new webpack.DefinePlugin({
    development: JSON.stringify(true),
    production: JSON.stringify(false)
});

module.exports = {
    mode: "development",
    devtool: "eval-cheap-module-source-map",
    entry: {
        app: PATHS.entry
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader",
                options: {
                    cacheDirectory: true,
                    presets: ["env"]
                }
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                exclude: /node_modules/,
                loader: "url-loader",
                options: {
                    name: "[name]-[hash:8].[ext]",
                    outputPath: "images/",
                    limit: 10000
                }
            },
            {
                test: /\.(scss|css)$/,
                use: [
                    {
                        loader: "style-loader",
                        options: {
                            sourceMap: true
                        }
                    },
                    {
                        loader: "css-loader",
                        options: {
                            sourceMap: true
                        }
                    },
                    {
                        loader: "sass-loader",
                        options: {
                            outputStyle: 'expanded',
                            sourceMap: true,
                            sourceMapContents: true
                        }
                    }
                ]
            }
        ]
    },
    resolve: {
        extensions: ["*", ".js"]
    },
    output: {
        path: PATHS.dist,
        publicPath: "/",
        filename: "bundle.js"
    },
    plugins: [
        WebpackDefinePluginConfig,
        HtmlWebpackPluginConfig,
        new webpack.HotModuleReplacementPlugin()
    ],
    devServer: {
        port: 8081,
        publicPath: "/",
        hot: true,
        contentBase: PATHS.static,
        historyApiFallback: true
    }
};