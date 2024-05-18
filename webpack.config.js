const path = require('path');
const webpack = require('webpack');

module.exports = {
	externals : ['jQuery'],
	output: {
		filename: 'script.min.js',
		path: path.join(__dirname, 'web')
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /(node_modules)/,
				use: {
					loader: 'babel-loader?plugins=babel-plugin-rewire',
					options: {
						presets: ['env'],
						plugins : ['babel-plugin-rewire']
					}
				}
			}
		]
	},
	plugins : []
};