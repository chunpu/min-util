var webpack = require('webpack')
var path = require('path')
var pkg = require('./package.json')
var util = require('util')
var NODE_ENV = process.env.NODE_ENV // production, development, test
var DEBUG = 'development' == NODE_ENV

var config = {
	entry: './',
	output: {
		path: path.join(__dirname, 'browser'),
		filename: 'browser.js',
		library: '_',
		libraryTarget: 'umd'
	},
	plugins: [
		new webpack.optimize.DedupePlugin(),
		new webpack.BannerPlugin(util.format('%s@%s by %s', pkg.name, pkg.version, pkg.author)),
		new webpack.DefinePlugin({
			VERSION: JSON.stringify(pkg.version),
			DEBUG: DEBUG
		})
	],
	devServer: {
		contentBase: './browser',
		host: '0.0.0.0'
	}
}

if (DEBUG) {
	// development
	config.devtool = 'source-map'
} else {
	// production
	config.plugins.push(
		new webpack.optimize.UglifyJsPlugin({minimize: true})
	)
}

module.exports = config
