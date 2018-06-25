const webpack = require('webpack');
const config = require('sapper/webpack/config.js');
const getSveltePreprocessor = require('svelte-preprocess');
const sveltePreprocessorOptions = require('./preprocess.js');
const SpriteLoaderPlugin = require('svg-sprite-loader/plugin');

const mode = process.env.NODE_ENV;
const isDev = mode === 'development';

module.exports = {
	entry: config.client.entry(),
	output: config.client.output(),
	resolve: {
		extensions: ['.js', '.json', '.html'],
		mainFields: ['svelte', 'module', 'browser', 'main']
	},
	module: {
		rules: [
			{
				test: /\.html$/,
				use: {
					loader: 'svelte-loader',
					options: {
						dev: isDev,
						hydratable: true,
						hotReload: true,
						preprocess: getSveltePreprocessor(sveltePreprocessorOptions)
					}
				}
			}, 
			{
				test: /\.svg$/,
				use: [
					{ 
						loader: 
						'svg-sprite-loader',
						options: {
							extract: true
						}
					},
					'svgo-loader'
				]
			}
		]
	},
	mode,
	plugins: [
		new SpriteLoaderPlugin({ plainSprite: true }),
		isDev && new webpack.HotModuleReplacementPlugin(),
		new webpack.DefinePlugin({
			'process.browser': true,
			'process.env.NODE_ENV': JSON.stringify(mode)
		})
	].filter(Boolean),
	devtool: isDev && 'inline-source-map'
};
