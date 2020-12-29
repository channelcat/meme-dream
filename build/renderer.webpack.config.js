var HtmlWebpackPlugin = require('html-webpack-plugin');
var path = require('path');

const projectPath = path.resolve(__dirname, '../');

module.exports = {
    entry: path.join(projectPath, 'src/renderer/index.tsx'),
    target: 'electron-renderer',
    module: {
        rules: [
            {
                test: /\.(js|ts|jsx|tsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: [
                            "@babel/preset-env",
                            "@babel/preset-react",
                            "@babel/preset-typescript"
                        ]
                    }
                }
            }
        ]
    },
    resolve: {
        extensions: ['.ts', '.js', '.json', '.jsx', '.tsx']
    },
    output: {
        path: path.join(projectPath, 'dist'),
        filename: 'index.js'
    },
    plugins: [new HtmlWebpackPlugin({
        template: path.join(projectPath, 'src', 'renderer', 'index.html')
    })]
};