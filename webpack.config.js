const FixStyleOnlyEntriesPlugin = require("webpack-fix-style-only-entries");
const path = require('path');
const is_prod = process.env.JEKYLL_ENV === 'production';

module.exports = {
    mode: is_prod ? 'production' : 'development',
    entry: {
        'main': [
            './node_modules/jquery/dist/jquery.js',
            './node_modules/popper.js/dist/popper.js',
            './node_modules/bootstrap/dist/js/bootstrap.js',
            './_assets/js/katex.js',
            './_assets/js/publication.js',
            './_assets/js/google_analytics.js',
        ],
        'disqus': [
            './_assets/js/disqus.js',
        ],
        'style': [
            './_assets/css/main.scss',
            './_assets/css/noscript.scss',
        ],
        'image': [
            './_assets/img/photo.jpg',
            './_assets/img/photo@2x.jpg',
        ],
    },
    output: {
        path: path.resolve(__dirname, 'assets'),
        filename: '[name].js',
    },
    module: {
        rules: [{
            test: /\.scss$/,
            use: [{
                    loader: 'file-loader',
                    options: {
                        esModule: false,
                        name: '[name].css',
                        publicPath: '/assets/',
                    },
                },
                {
                    loader: 'extract-loader',
                },
                {
                    loader: 'css-loader',
                    options: {
                        sourceMap: !is_prod,
                    },
                },
                {
                    loader: 'resolve-url-loader',
                    options: {
                        sourceMap: !is_prod,
                    },
                },
                {
                    loader: 'sass-loader',
                    options: {
                        sourceMap: true,
                    },
                },
            ],
        }, {
            test: /(\.(eot|otf|ttf|woff2?)|-webfont\.svg)$/,
            use: [{
                loader: 'file-loader',
                options: {
                    esModule: false,
                    name: '[name].[ext]',
                    outputPath: 'fonts/',
                    publicPath: '/assets/fonts/',
                },
            }, ],
        }, {
            test: /\.jpg$/,
            use: [{
                loader: 'file-loader',
                options: {
                    esModule: false,
                    name: '[name].[ext]',
                    publicPath: '/assets/',
                },
            }, ],
        }, ],
    },
    plugins: [
        new FixStyleOnlyEntriesPlugin(),
    ],
};
