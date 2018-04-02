'use strict'
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const merge = require('webpack-merge');
const pug = require('./webpack/pug');
const devserver = require('./webpack/devserver');
const babel = require('./webpack/babel');
const sass = require('./webpack/sass');
const css = require('./webpack/css');
const extractCss = require('./webpack/css.extract');

const PATHS = {
    source: path.join(__dirname, 'src'),
    build: path.join(__dirname, 'build')
}
const common = merge([
    {
        devtool: 'source-map',
        entry: PATHS.source + '/js/index.js',
        output: {
            path: PATHS.build,
            filename: 'js/bundle.js',
        },
        plugins: [
            new HtmlWebpackPlugin({
                filename: 'index.html',
                chunks: ['index', 'common'],
                template: PATHS.source + '/index.pug'
            })
            // new webpack.optimize.CommonsChunkPlugin({
            //     name: 'common'
            // })
        ],

    },
    pug(),
    babel(),
])


module.exports = function (env) {
    if (env === "production") {
        return merge([
            common,
            extractCss()
        ]);
    }
    if (env === "development") {
        return merge([
            common,
            devserver(),
            sass(),
            css()
        ])
    }
}