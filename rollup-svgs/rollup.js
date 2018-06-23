const rollup = require('rollup'),
	path = require('path'),
	fs = require('fs'),

	// completely unecessary, but makes output look nicer
	chalk = require('chalk'),

	// helps finding files within paths
	glob = require('glob'),

	// this is the file that actually generates the sprite JSON file
	generateSpriteJSON = require('./svg'),

	// this is the rollup config. kept as a .config file so can be used directly
	config = require('./rollup.config'),

	// the distribution directory
	dist_dir = 'dist/';

/**
 * Initialise things. Generates the sprite first, and then performs the rest
 * of the Rollup functions.
 */
function init(options = {}) {
	console.log(chalk.blue('Building'), 'SVG Sprite...');

	// (re)generate the SVG sprite sheet
	generateSpriteJSON(dist_dir + 'svg-sprite.json')
		.then(function() {
			// get on with the rest of the build
			startBuild();
		});
}

/**
 * Collects the JS files within the root of src/ (of which there is only one
 * for this demo) and then sends them to the build function.
 */
function startBuild() {
	let tasks = [];

	// get js files within src root and build
	glob('src/*.js', function(error, files) {
		if (error) throw error;

		// push files to a build array
		files.forEach(function(file) {
			tasks.push(build_file(file));
		});

		Promise.all(tasks)
			.then(function() {
				console.log(chalk.green('Rollup complete.'));
			});
	});
}

/**
 * Builds an indivudal file to dist/
 */
function build_file(file) {
	let plugins = config.plugins.slice(),
		file_bundle, dest_path;

	console.log(chalk.blue('Rolling up'), file + '...');

	// just some code to get a nice bundle name. Look away ;)
	file_bundle = path.basename(file);
	file_bundle = file_bundle.substr(0, file_bundle.lastIndexOf('.'));

	dest_path = dist_dir + (file_bundle + '.js').toLowerCase();

	// perform the first (compute) stage of rollup (and return the promise)
	return rollup.rollup(Object.assign({}, config.rollup, {
		entry: file,
		plugins: plugins
	}))
		.then(function(bundle) {
			var opts = {
				dest: dest_path,
			};

			// this is totally unecessary with one entry point but I left it in
			if (file_bundle === 'Index') {
				config.write.moduleName = 'window.SVGTest';
			} else {
				config.write.moduleName = 'window.SVGTest.' + file_bundle;
			}

			// perform the second (write) stage of rollup
			bundle.write(Object.assign({}, config.write, opts));
		})
		.catch(function(error) {
			console.error(error);
			process.exit(1);
		});
}

init();