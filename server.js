'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _serveFavicon = require('serve-favicon');

var _serveFavicon2 = _interopRequireDefault(_serveFavicon);

var _compression = require('compression');

var _compression2 = _interopRequireDefault(_compression);

var _path = require('path');

var _webpack = require('webpack');

var _webpack2 = _interopRequireDefault(_webpack);

var _webpackDevMiddleware = require('webpack-dev-middleware');

var _webpackDevMiddleware2 = _interopRequireDefault(_webpackDevMiddleware);

var _webpackHotMiddleware = require('webpack-hot-middleware');

var _webpackHotMiddleware2 = _interopRequireDefault(_webpackHotMiddleware);

var _webpack3 = require('../webpack.config');

var _webpack4 = _interopRequireDefault(_webpack3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//eslint-disable-line

//eslint-disable-line
/* eslint-disable no-console */
var compiler = (0, _webpack2.default)(_webpack4.default); //eslint-disable-line


var app = (0, _express2.default)();
var port = process.env.PORT || 5000;

app.use((0, _compression2.default)());
app.use(_express2.default.static('dist'));
app.use('/favicon.ico', (0, _serveFavicon2.default)((0, _path.resolve)(__dirname, './favicon.ico')));

if (process.env.NODE_ENV !== 'production') {
  app.use((0, _webpackDevMiddleware2.default)(compiler, {
    noInfo: true,
    publicPath: _webpack4.default.output.publicPath
  }));
  app.use((0, _webpackHotMiddleware2.default)(compiler));
}

app.use('*', function (req, res) {
  res.sendFile((0, _path.resolve)(__dirname, './index.html'));
});

app.listen(port, function (err) {
  if (err) {
    console.log(err);
  }
  console.log('Server started on ' + port);
});