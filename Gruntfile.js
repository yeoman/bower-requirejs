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
				'components',
				'bower_components'
			]
		},
		copy: {
			test: {
				expand: true,
				cwd: 'test/fixtures',
				src: ['*.js', '!*-expected.js'],
				dest: 'tmp/'
			}
		},
		nodeunit: {
			tasks: ['test/test.js']
		},
		bower: {
			options: {
				exclude: ['underscore']
			},
			standard: {
				rjsConfig: 'tmp/config.js'
			},
			pathless: {
				rjsConfig: 'tmp/pathless-config.js'
			},
			global: {
				rjsConfig: 'tmp/global-config.js'
			},
			baseurl: {
				options: {
					baseUrl: './'
				},
				rjsConfig: 'tmp/baseurl.js'
			}
		}
	});

	grunt.loadTasks('tasks');

	grunt.registerTask('mkdir', function (dir) {
		require('fs').mkdirSync(dir);
	});

	grunt.registerTask('bower-install', function () {
		var done = this.async();
		var spawn = require('child_process').spawn;
		var ls = spawn('bower', ['install']);

		ls.stdout.on('data', function (data) {
			grunt.log.write(data);
		});

		ls.stderr.on('data', function (data) {
			grunt.log.write(data);
		});

		ls.on('close', function (code) {
		  grunt.log.writeln('child process exited with code ' + code);
		  done();
		});
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
