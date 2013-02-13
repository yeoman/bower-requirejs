'use strict';
module.exports = function (grunt) {
	var stringifyObject = require('stringify-object');
	var JSON5 = require('json5');
	var _ = require('lodash');

	grunt.registerTask('bower', 'Wire-up Bower components in RJS config', function () {
		this.requiresConfig('bower');
		var cb = this.async();
		var reConfig = /require\.config\((\{[^\)]+)/i;
		var filePath = grunt.config('bower.rjsConfig');
		var file = grunt.file.read(filePath);

		require('bower').commands.list({paths: true})
			.on('data', function (data) {
				var rjsConfig;

				if (data) {
					// remove extension from JS files
					data = _.forOwn(data, function (val, key, obj) {
						obj[key] = grunt.file.isDir(val) ? val : val.replace(/\.js$/, '');
					});

					rjsConfig = file.replace(reConfig, function (match, p1) {
						var config =JSON5.parse(p1);
						_.extend(config.paths, data);
						return 'require.config(' + stringifyObject(config, {indent: grunt.config('bower.indent') || '    '});
					});

					grunt.file.write(filePath, rjsConfig);
					grunt.log.writeln('Updated RequireJS config with installed Bower components'.green);
					cb();
				}
			})
			.on('error', function (err) {
				grunt.warn(err.message);
				cb();
			});
	});
};
