const webpack = require('webpack');

module.exports = {
    entry: './src/js/module.js',
    output: {
        path: 'build',
        filename: 'bundle.js'
    }, // output
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                loader: 'babel',
                query: {
                    presets: ['es2015']
                }
            } // babel loader
        ] // loaders
    } // module
}; // exports
