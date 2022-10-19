const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: "/src/index.js",
    plugins: [
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, 'src/index.html'),
        filename: 'index.html'
      })
    ],
    devServer: {
      static: {
        directory: path.resolve(__dirname, 'dist'),
        publicPath: '/'
      },
      hot: true,
      port: 8080,
      proxy: {
        '/api': {
          target: 'http://localhost:3000',
          secure: false
         }
      }
    },
    output: { path: path.resolve(__dirname, "dist") },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: path.resolve(__dirname, 'node_modules'),
          use: {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env", "@babel/preset-react"],
            }
          }
        },
        {
          test: /\.s[a|c]ss$/,
          use: ['style-loader', 'css-loader', 'sass-loader']
        }

      ],
    },
  };