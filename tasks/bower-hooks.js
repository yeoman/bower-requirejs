'use strict';
module.exports = function (grunt) {
	var _ = require('lodash');
	var requirejs = require('requirejs/bin/r.js');

	grunt.registerMultiTask('bower', 'Wire-up Bower components in RJS config', function () {
		var cb = this.async();
		var filePath = this.data.rjsConfig;
		var file = grunt.file.read(filePath);

		require('bower').commands.list({paths: true})
			.on('data', function (data) {
				var rjsConfig;

				if (data) {
					// remove extension from JS files
					data = _.forOwn(data, function (val, key, obj) {
						obj[key] = grunt.file.isDir(val) ? val : val.replace(/\.js$/, '');
					});

					requirejs.tools.useLib(function (require) {
						rjsConfig = require('transform').modifyConfig(file, function (config) {
							_.extend(config.paths, data);
							return config;
						});

						grunt.file.write(filePath, rjsConfig);
						grunt.log.writeln('Updated RequireJS config with installed Bower components'.green);
						cb();
					});
				}
			})
			.on('error', function (err) {
				grunt.warn(err.message);
				cb();
			});
	});
};
