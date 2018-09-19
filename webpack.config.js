var webpack = require('webpack')
var path = require('path')
var pkg = require('./package.json')
var util = require('util')
var NODE_ENV = process.env.NODE_ENV // production, development, test
var TEST = 'test' == NODE_ENV
var DEBUG = 'development' == NODE_ENV
var PRODUCTION = true

if (TEST) {
  console.log('test mode')
  DEBUG = true // test mode also use debug mode
}

if (DEBUG) {
  console.log('debug mode')
  PRODUCTION = false
}

if (PRODUCTION) {
  console.log('production')
}

var config = {
  entry: {
    'min-util': './'
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].js',
    libraryTarget: 'umd',
    library: '_'
  },
  plugins: [
    new webpack.optimize.DedupePlugin(),
    new webpack.BannerPlugin(util.format('%s@%s by %s', pkg.name, pkg.version, pkg.author)),
    new webpack.DefinePlugin({
      VERSION: JSON.stringify(pkg.version),
      DEBUG: DEBUG
    })
  ]
}

if (TEST) {
  var dir = path.join(__dirname, 'test/public')
  config.entry = './test/index.js'
  config.output.filename = 'tests.js'
  config.output.path = dir
  config.devServer.contentBase = dir
}

if (DEBUG) {
  config.devtool = 'source-map'
}

if (PRODUCTION) {
  config.plugins.push(
    new webpack.optimize.UglifyJsPlugin({minimize: true})
  )
}

module.exports = config
