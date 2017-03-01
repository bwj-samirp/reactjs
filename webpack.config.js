//external
var path    = require('path');
var webpack = require('webpack');

// internal
var DEBUG = process.argv.indexOf('--production') === -1 ? true : false;
var isProd = DEBUG === false ? true : false;

var plugins = [
    new webpack.DefinePlugin({
        PRODUCTION: isProd,
        DEVELOPMENT: DEBUG
    })
];

if ( DEBUG === false ) {
    plugins.push(
        new webpack.optimize.UglifyJsPlugin({
            minimize: true,
            compress: { warnings: false }
        })
    );
}

module.exports = {
    entry: "./src/entry.js",
    home: "./src/home.js",
    about: "./src/about.js",
    output: {
        path: path.resolve ('./assets/javascript'),
        filename:"bundle.js"
    },
    module: {
        loaders: [
            {
                test: /.jsx?$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015', 'react']
                }
            }
           // { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader"}
        ]
    },
    /**
     * Plugins
     */
    plugins: plugins,
    resolve: {
        root: [
            path.resolve('./src')
        ],
        alias: {
            config: path.resolve('./config/'),
            components: path.resolve('./src/components/')

        },
        moduleDirectories: ['./node_modules'],
        extensions: ['', '.js', '.jsx', '.json']
    }
};
