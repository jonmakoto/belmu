const config = require('sapper/webpack/config.js');
const pkg = require('../package.json');
const SpriteLoaderPlugin = require('svg-sprite-loader/plugin');

module.exports = {
	entry: config.server.entry(),
	output: config.server.output(),
	target: 'node',
	resolve: {
		extensions: ['.js', '.json', '.html'],
		mainFields: ['svelte', 'module', 'browser', 'main']
	},
	externals: Object.keys(pkg.dependencies),
	module: {
		rules: [
			{
				test: /\.html$/,
				use: {
					loader: 'svelte-loader',
					options: {
						css: false,
						generate: 'ssr'
					}
				}
			},
			{
				test: /\.svg$/,
				loader: 'svg-sprite-loader',
				options: {
					extract: true
				}
			}
		]
	},
	mode: process.env.NODE_ENV,
	plugins: [
		new SpriteLoaderPlugin({ plainSprite: true })
	],
	performance: {
		hints: false // it doesn't matter if server.js is large
	}
};