const path = require('path');
const ASSET_PATH = path.join(__dirname, 'public_html/assets/');

module.exports = {
    entry     : './app/build/index.js',
    output    : {
        path    : path.join(__dirname, 'public_html/assets/js'),
        filename: 'main.js',
        publicPath: ASSET_PATH
    },
    watch     : true,
    module    : {
        rules: [{
            loader : 'babel-loader',
            test   : /\.js$/,
            exclude: /node_modules/
        }, {
            test   : /\.less/,
            use    : [{
                loader: "style-loader?url=false"
            }, {
                loader: "css-loader?url=false"
            }, {
                loader: "less-loader?url=false"
            }],
            exclude: /node_modules/
        }]
    },
    stats     : {
        warnings: false
    }
};
