const webpack = require("webpack");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const NullPlugin = require("webpack-null-plugin");
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");

module.exports = {
    mode: process.env.NODE_ENV === "production" ? "production" : "development",

    // Enable sourcemaps for debugging webpack's output.
    devtool: process.env.NODE_ENV !== "production" ? "source-map" : "",

    resolve: {
        extensions: [".ts", ".tsx", ".js", ".scss", ".css"],
        plugins: [new TsconfigPathsPlugin({ configFile: "tsconfig.json" })]
    },

    entry: {
        src: "react-hot-loader/patch",
        index: __dirname + "/src/app/index.tsx", // webpack entry point. Module to start building dependency graph
    },
    output: {
      path: __dirname + "/dist", // Folder to store generated bundle
      filename: "js/[name].js",  // Name of generated bundle after build
      publicPath: "/" // public URL of the output directory when referenced in a browser
    },

    module: {
        rules: [
            {
                test: /\.ts(x?)$/,
                exclude: /node_modules/,
                use: [{
                        loader: "ts-loader"
                }]
            },
            // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
            {
                enforce: "pre",
                test: /\.js$/,
                loader: "source-map-loader"
            },
            // '.scss'
            {
                test: /\.scss$/,
                use: [{
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            hmr: process.env.NODE_ENV !== "production"
                        }
                    },
                    {
                        loader: "css-loader",
                        options: { sourceMap: process.env.NODE_ENV !== "production" }
					},
					{
                        loader: "postcss-loader"
					},
					{
                        loader: "sass-loader",
                        options: { sourceMap: process.env.NODE_ENV !== "production" }
				}]
            }
        ]
    },

    plugins: [  // Array of plugins to apply to build chunk
        new webpack.HotModuleReplacementPlugin(),
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: "style/[name].css"
        }),
        process.env.NODE_ENV === "production" ? new OptimizeCSSAssetsPlugin({
            cssProcessorOptions: { discardComments: { 
                removeAll: true
            },
            map: process.env.NODE_ENV !== "production" ? {
                inline: false,
                annotation: true,
              } : false
            },
            canPrint: true
        }) : new NullPlugin(),
        // index.html
        new HtmlWebpackPlugin({
            template: __dirname + "/src/public/index.html",
            inject: false,
            filename: "index.html",
            depExtension: process.env.NODE_ENV === "production" ? "production.min" : "development",
        })
    ],

    // When importing a module whose path matches one of the following, just
    // assume a corresponding global variable exists and use that instead.
    // This is important because it allows us to avoid bundling all of our
    // dependencies, which allows browsers to cache those libraries between builds.
    externals: {
        "react": "React",
        "react-dom": "ReactDOM"
    },

    devServer: {  // configuration for webpack-dev-server
        contentBase: __dirname + "/src/public",  //source of static assets
        port: 5000, // port to run dev-server
        hot: true,
        publicPath: "/",
        historyApiFallback: true,
    }
};
