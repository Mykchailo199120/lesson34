const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const test = require("node:test");
const EslintWebpackPlugin = require('eslint-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer');


module.exports = {
    mode: 'development',
    entry: {
        main: './src/index.js',
        stat: './src/statistics.js'
    },
    output: {
        filename: '[name].[contenthash].js',
        path: path.resolve(__dirname, 'dist'),
    },

    target: 'web',

    devServer: {
        port: 3000,
        hot: false
    },
    module: {
        rules: [

            {
                test: /\.ts$/, // Обробка JS файлів
                exclude: /node_modules/, // Виняток для node_modules
                use: 'babel-loader',
                options: {
                    presets: [
                        '@babel/preset-env',
                        '@babel/preset-typescript'
                    ]
                }

            },
            {
                test: /\.s[ac]ss$/, // Обробка SCSS файлів
                use:[
                    {loader: MiniCssExtractPlugin.loader,
                        options: {
                        publicPath: '',
                        },
                    },
                    'css-loader',
                    'less-loader',
                    'sass-loader',
                ],
            },

            {
                test: /\.(png|jpg|jpeg|svg|gif|webp)$/,
                type: 'asset/resource',
            }
        ],
    },
    plugins: [
        new CleanWebpackPlugin({
            cleanStaleWebpackAssets: false,
            cleanOnceBeforeBuildPatterns: ['**/*']
        }),
        new HtmlWebpackPlugin({
            template: './src/index.html', // Шлях до твого шаблону HTML
            filename: 'index.html', // Ім'я згенерованого HTML файлу в папці dist
        }),
        new MiniCssExtractPlugin({
            filename: '[name].[contenthash].css',
        }),
        new EslintWebpackPlugin({
            extensions: ['js'],
            fix: true
        }),
         new BundleAnalyzerPlugin(),

    ],
};


