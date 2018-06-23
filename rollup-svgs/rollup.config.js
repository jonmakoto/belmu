const json = require('rollup-plugin-json');

module.exports = {
	write: {
		// make the file browser compatible
		format: 'iife',
		sourceMap: true,
	},
	plugins: [
		// this plugin will allow us to `import` JSON as an object
		json({
			exclude: 'node_modules'
		})
	]
};