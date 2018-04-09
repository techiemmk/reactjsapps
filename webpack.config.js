const path = require('path');

const PORT = process.env.PORT || 1122;
const HOST = process.env.HOST || "127.0.0.1";
module.exports = {
    entry: ['./src/index.js'],    
    output: {
        path: path.join(__dirname, '/build'),
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: [
                    path.join(__dirname, '/node_modules')
                ],
                loader: 'babel-loader',
                options: {
                    presets: ['es2015', 'react']
                },
            }
        ],
    },
    devServer: {
        host: HOST,
        port: PORT
    }
}