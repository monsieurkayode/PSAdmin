const webpack = require('webpack');
const { resolve, join } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
  template: './src/index.html',
  favicon: './src/favicon.ico',
  inject: 'body',
});

module.exports = {
  context: __dirname,
  devtool: 'source-map',
  entry: [
    resolve(__dirname, './src/index.js')
  ],
  output: {
    path: join(__dirname, 'dist'),
    filename: 'js/bundle.js',
    publicPath: '/'
  },
  resolve: {
    modules: ['./node_modules', './src'],
    extensions: ['.js', '.jsx'],
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.jsx?$/,
        use: ['eslint-loader'],
        exclude: [/node_modules/]
      },
      {
        test: /\.jsx?$/,
        use: ['babel-loader'],
        exclude: [/node_modules/],
      },
      {
        test: /\.(scss|css)$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'sass-loader'],
        }),
      },
      {
        test: /\.(ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'fonts/',
            }
          }
        ]
      },
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10000,
              mimetype: 'application/font-woff',
              name: '[name].[ext]',
              outputPath: 'fonts/',
            },
          }
        ],
      },
      {
        test: /\.(bmp|gif|jpe?g|png|svg)?$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'images/',
            },
          }
        ]
      },
    ]
  },
  plugins: [
    HtmlWebpackPluginConfig,
    new ExtractTextPlugin('css/bundle.css'),
    new webpack.HotModuleReplacementPlugin(),
  ],
  devServer: {
    publicPath: '/',
    hot: true,
    historyApiFallback: true,
  },
};
