const { resolve } = require('path');
const merge = require('webpack-merge');
const common = require('./webpack.common');


module.exports = merge(common, {
  mode: 'production',
  entry: [
    resolve(__dirname, './src/index.js')
  ],
});
