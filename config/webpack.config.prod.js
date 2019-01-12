const webpack = require("webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CompressionWebpackPlugin = require("compression-webpack-plugin");
const ImageminPlugin = require("imagemin-webpack-plugin").default;
const CopyWebpackPlugin = require("copy-webpack-plugin");
const autoprefixer = require("autoprefixer");
const PATHS = require("./paths");
const path = require("path");

const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
    template: path.join(PATHS.static, "/index.html"),
    filename: "index.html",
    inject: "body"
});

// set ENVIRON CONFIG
const WebpackDefinePluginConfig = new webpack.DefinePlugin({
    development: JSON.stringify(false),
    production: JSON.stringify(true)
});

module.exports = {
    mode: "production",
    devtool: "source-map",
    entry: {
        app: [PATHS.entry]
    },
    output: {
        path: PATHS.build,
        filename: "[name].[hash].js",
        publicPath: "/"
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader"
            },
            {
                test: /\.(scss|css|sass)$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: true
                        }
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            ident: "postcss",
                            sourceMap: true,
                            plugins: () => [
                                require("postcss-flexbugs-fixes"),
                                autoprefixer({
                                    browsers: [
                                        ">1%",
                                        "last 4 versions",
                                        "Firefox ESR",
                                        "not ie < 9" // IE9 & IE9+
                                    ],
                                    flexbox: "no-2009"
                                })
                            ]
                        }
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            outputStyle: 'expanded',
                            sourceMap: true,
                            sourceMapContents: true
                        }
                    }
                ]
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
            }
        ]
    },
    resolve: {
        extensions: ["*", ".js"]
    },
    optimization: {
        minimizer: [new OptimizeCssAssetsPlugin({})]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: "[name].[hash].css",
            chunkFilename: "[id].[hash].css",
            publicPath: PATHS.build
        }),
        WebpackDefinePluginConfig,
        HtmlWebpackPluginConfig,
        new CompressionWebpackPlugin({
            cache: false
        }),
        new CopyWebpackPlugin([
            {
                from: path.join(PATHS.static, "/assets/"),
                to: path.join(PATHS.build, "/assets")
            }
        ]),
        new ImageminPlugin({
            test: /\.(jpe?g|png|gif|svg)$/i,
            pngquant: {
                quality: "95-100"
            }
        })
    ]
};
