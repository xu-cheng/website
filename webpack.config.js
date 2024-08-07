const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require("path");
const is_prod = process.env.JEKYLL_ENV === "production";

const config = {
    mode: is_prod ? "production" : "development",
    plugins: [new MiniCssExtractPlugin()],
    entry: {
        main: [
            "./node_modules/@popperjs/core/dist/umd/popper.js",
            "./node_modules/bootstrap/dist/js/bootstrap.js",
            "./_assets/js/katex.js",
            "./_assets/js/publication.js",
            "./_assets/js/disqus.js",
        ],
        style: ["./_assets/css/main.scss"],
        noscript: ["./_assets/css/noscript.scss"],
        image: ["./_assets/img/photo.jpg", "./_assets/img/photo@2x.jpg"],
    },
    output: {
        path: path.resolve(__dirname, "assets"),
        filename: "[name].js",
    },
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            esModule: false,
                            publicPath: "/assets/",
                        },
                    },
                    {
                        loader: "css-loader",
                        options: {
                            esModule: false,
                            sourceMap: !is_prod,
                        },
                    },
                    {
                        loader: "resolve-url-loader",
                        options: {
                            sourceMap: !is_prod,
                        },
                    },
                    {
                        loader: "sass-loader",
                        options: {
                            api: "legacy", // https://github.com/webpack-contrib/sass-loader/issues/1217
                            sourceMap: true,
                        },
                    },
                ],
            },
            {
                test: /(\.(eot|otf|ttf|woff2?)|-webfont\.svg)$/,
                use: [
                    {
                        loader: "file-loader",
                        options: {
                            esModule: false,
                            name: "[name].[ext]",
                            outputPath: "fonts/",
                            publicPath: "/assets/fonts/",
                        },
                    },
                ],
            },
            {
                test: /\.jpg$/,
                use: [
                    {
                        loader: "file-loader",
                        options: {
                            esModule: false,
                            name: "[name].[ext]",
                            publicPath: "/assets/",
                        },
                    },
                ],
            },
        ],
    },
};

module.exports = (env, argv) => {
    if (!is_prod) {
        config.devtool = "source-map";
    }
    return config;
};
