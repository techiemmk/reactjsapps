module.exports = {
    mode: "development",
    entry: ['./app/index.js'],
    output: {
        path: __dirname+"/build",
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: [
                    __dirname+"/node_modules"
                ],
                loader: "babel-loader",
                options: {
                    presets: ["es2015", "react"]
                },
            }
        ],
    },
    devServer: {
        contentBase: __dirname+"/",
        hot: false
    }
}