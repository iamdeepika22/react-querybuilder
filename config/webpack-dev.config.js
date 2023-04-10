'use strict';

const HtmlPlugin = require('html-webpack-plugin');
const merge = require('webpack-merge');
const webpackCommon = require('./webpack-common.config');
const path = require('path');

module.exports = merge(webpackCommon, {
  mode: 'development',
  entry: {
    demo: './demo/main.js'
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, '../dist/demo')
  },
  module: {
    rules: [
      {
        test: /\.less$/,
        use: [{ loader: 'style-loader' }, { loader: 'css-loader' }, { loader: 'less-loader' }]
      },
      {
        test: /\.(woff|ttf|ico|woff2|jpg|jpeg|png|svg|webp)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: Math.Infinity
            }
          }
        ]
      }
    ]
  },
  devtool: 'cheap-module-source-map',
  devServer: {
    historyApiFallback: true,
    stats: {
      maxModules: 0
    }
  },

  plugins: [
    new HtmlPlugin({
      title: 'react-querybuilder (DEMO)',
      template: './demo/index.html'
    })
  ]
});
