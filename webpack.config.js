const path = require('path');

module.exports = {
    entry: ['babel-polyfill', './development/js/src/entry.es6.js'],
    output: {
        path    : path.join(__dirname, 'development/js'), // needs absolute path
        filename: 'es6-compiled.js'
    },
    module: {
        rules: [
            {
                loader: 'babel-loader',
                test: /\.es6.js$/, // ends with .js,
                include: [
                    path.join(__dirname, 'development/js/src'),
                ]
            }
        ]
    }
};