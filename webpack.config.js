const path = require('path')

module.exports = {
    mode: 'development',
    entry: ['./app/index.js'],
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
    }
}