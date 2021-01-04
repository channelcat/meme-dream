const path = require('path');

// webpack.config.js
const projectPath = path.resolve(__dirname, '../');

module.exports = [
  {
    entry: path.join(projectPath, 'src/main/main.ts'),
    target: 'electron-main',
    module: {
      rules: [
        {
          test: /\.(js|ts)$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env", "@babel/preset-typescript"],
              plugins: ["@babel/plugin-proposal-class-properties"]
            }
          }
        }
      ]
    },
    resolve: {
      extensions: ['.ts', '.js', '.json']
    },
    output: {
      path: path.join(projectPath, 'dist'),
      filename: 'main.js'
    }
  }
];