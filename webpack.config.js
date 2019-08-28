const webpack = require('webpack');
const path = require("path");
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const BundleTracker = require('webpack-bundle-tracker');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const glob = require('glob-all');
const PurifyCSSPlugin = require('purifycss-webpack');

module.exports = {
    //context: __dirname,
    entry: {
        404: './templates/js/error.js',
        500: './templates/js/error.js',
        home: './templates/js/home.js',
        contact: './templates/js/contact.js',
        work: './templates/js/work.js',
        privacy_policy: './templates/js/privacy_policy.js'
    },
    output: {path: __dirname + '/templates/bundle', filename: 'js/[name].js', publicPath: '/templates/bundle/'},
    module: {
        loaders: [
            {test: /\.css$/, loader: ExtractTextPlugin.extract({use: ['css-loader', 'postcss-loader'], publicPath: '../'})},
            //{test: /\.(eot|svg|ttf|woff|woff2)$/, loader: 'file-loader?name=assets/fonts/[name].[ext]'},
            //{test: /\.(jpe?g|png|gif|svg)$/i, loader: ["file-loader?name=../../[path][name].[ext]", 'image-webpack-loader']},
            {test: /\.hbs$/, loader: 'handlebars-loader', options:{helperDirs: path.resolve(__dirname, "./templates/handlebars/helpers")}}
        ]
    },
    plugins: [
        new BundleTracker({filename: './webpack-stats.json'}),
        new ExtractTextPlugin('css/[name].css'),
        new webpack.optimize.CommonsChunkPlugin('vendors'),
        new UglifyJSPlugin({mangle: {except: ['$super', '$', 'exports', 'require']}, extractComments: true}),

        //Purify CSS
        //new PurifyCSSPlugin({paths: glob.sync([path.join(__dirname, 'templates/*.html'), path.join(__dirname, 'templates/partials/*.html')]), minimize: true,
        //    purifyOptions: {whitelist: []}
        //}),

        //HTML
        new HtmlWebpackPlugin({filename: '404.html', chunks: ['vendors','error'], minify: {collapseWhitespace: true}, hash: true, template: './templates/404.html'}),
        new HtmlWebpackPlugin({filename: '500.html', chunks: ['vendors','error'], minify: {collapseWhitespace: true}, hash: true, template: './templates/500.html'}),
        new HtmlWebpackPlugin({filename: 'home.html', chunks: ['vendors','home'], minify: {collapseWhitespace: true}, hash: true, template: './templates/home.html'}),
        new HtmlWebpackPlugin({filename: 'contact.html', chunks: ['vendors','contact'], minify: {collapseWhitespace: true}, hash: true, template: './templates/contact.html'}),
        new HtmlWebpackPlugin({filename: 'work_page.html', chunks: ['vendors','work_page'], minify: {collapseWhitespace: true}, hash: true, template: './templates/work_page.html'}),
        new HtmlWebpackPlugin({filename: 'work.html', chunks: ['vendors','work'], minify: {collapseWhitespace: true}, hash: true, template: './templates/work.html'}),
        new HtmlWebpackPlugin({filename: 'privacy_policy.html', chunks: ['vendors','privacy_policy'], minify: {collapseWhitespace: true}, hash: true, template: './templates/privacy_policy.html'}),
    ],
    resolve: {
        alias: {
           handlebars: 'handlebars/dist/handlebars.min.js'
        }
    }
};