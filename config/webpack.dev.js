const { merge } = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {container} = require('webpack');
const commonConfig = require('./webpack.common');
const packageJson = require('../package.json');

const devConfig = {
  mode: 'development',
  entry: './src/index.js',
  // output: {
  //   publicPath: 'http://localhost:8081/',
  // },
  devServer: {
    port: 8081,
    historyApiFallback: {
      index: 'index.html',
    },
  },
  plugins: [
    new container.ModuleFederationPlugin({
      name: 'LICommon',
      filename: 'remoteEntry.js',
      exposes: {
        './Pagination': './src/bootstrap',
      },
      // shared: packageJson.dependencies
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
  ],
};

module.exports = merge(commonConfig, devConfig);
