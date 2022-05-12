<<<<<<< HEAD
var path = require('path');
module.exports = {
    mode: "development",
    entry: [path.resolve(__dirname, './app/index.js')],
    output: {
        path: __dirname+'/build',
=======
const path = require('path');
const webpack = require('webpack');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

const PORT = process.env.PORT || 1122;
const HOST = process.env.HOST || "127.0.0.1";
module.exports = {
    devtool: 'cheap-module-source-map',
    entry: ['./src/index.js'],
    plugins: [
        new UglifyJSPlugin({sourceMap: true}),
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production')
            }
        })
    ],
    output: {
        path: path.join(__dirname, '/build'),
>>>>>>> a30ba13031c9a87b97151e308553dc5ee99fd878
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: [
<<<<<<< HEAD
                    __dirname+'/node_modules'
=======
                    path.join(__dirname, '/node_modules')
>>>>>>> a30ba13031c9a87b97151e308553dc5ee99fd878
                ],
                loader: 'babel-loader',
                options: {
                    presets: ['es2015', 'react']
                },
            }
        ],
    },
    devServer: {
        port: PORT
    }
}