const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');


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
    module: {
        rules: [
            {
                test: /\.js$/, // Обробка JS файлів
                exclude: /node_modules/, // Виняток для node_modules
                use: 'babel-loader', // Лоадер для Babel
            },
            {
                test: /\.scss$/, // Обробка SCSS файлів
                use: ['style-loader', 'css-loader', 'sass-loader'],
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
    ],
};

