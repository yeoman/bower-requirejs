'use strict';
module.exports = function (grunt) {
	require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

	grunt.initConfig({
		jshint: {
			options: {
				jshintrc: '.jshintrc'
			},
			all: [
				'Gruntfile.js',
				'tasks/*.js',
				'<%= nodeunit.tests %>'
			]
		},
		clean: {
			test: [
				'tmp',
				'components'
			]
		},
		copy: {
			test: {
				files: {
					'tmp/config.js': 'test/fixtures/config.js',
					'tmp/global-config.js': 'test/fixtures/global-config.js'
				}
			}
		},
		nodeunit: {
			tasks: ['test/*_test.js']
		},
		bower: {
			standard: {
				rjsConfig: 'tmp/config.js'
			},
			global: {
				rjsConfig: 'tmp/global-config.js'
			}
		}
	});

	grunt.loadTasks('tasks');

	grunt.registerTask('mkdir', function (dir) {
		require('fs').mkdirSync(dir);
	});

	grunt.registerTask('bower-install', function() {
		require('bower').commands.install.line(['', '', 'install', 'jquery'])
			.on('end', this.async());
	});

	grunt.registerTask('test', [
		'clean',
		'mkdir:tmp',
		'copy',
		'bower-install',
		'bower',
		'nodeunit',
		'clean'
	]);

	grunt.registerTask('default', ['test']);
};
