'use strict';
var grunt = require('grunt');
var durableJsonLint = require('durable-json-lint');

// extract the config object as a string from the actual and expected files.
// then turn the string into json so we can deeply compare the objects.
// we do this because bower does not always create the paths object's keys
// in the same order. so a pure string to string comparison will break.
var jsonify = function (str) {
	var dirtyJson = str.slice(str.indexOf('{'), str.lastIndexOf('}') + 1);
	var cleanJson = durableJsonLint(dirtyJson).json;

	return JSON.parse(cleanJson);
};

exports.bowerRJS = {
	wireupComponent: function (test) {
		test.expect(1);

		var actual = jsonify(grunt.file.read('tmp/config.js'));
		var expected = jsonify(grunt.file.read('test/fixtures/config-expected.js'));
		test.deepEqual(actual, expected, 'should wireup Bower components in RequireJS config');

		test.done();
	},
	wireupComponentPathless: function (test) {
		test.expect(1);

		var actual = jsonify(grunt.file.read('tmp/pathless-config.js'));
		var expected = jsonify(grunt.file.read('test/fixtures/pathless-config-expected.js'));
		test.deepEqual(actual, expected, 'should wireup Bower components in RequireJS config without paths');

		test.done();
	},
	wireupComponentGlobalConfig: function (test) {
		test.expect(1);

		var actual = jsonify(grunt.file.read('tmp/global-config.js'));
		var expected = jsonify(grunt.file.read('test/fixtures/global-config-expected.js'));
		test.deepEqual(actual, expected, 'should wireup Bower components in RequireJS config');

		test.done();
	},
	wireupComponentBaseUrlConfig: function (test) {
		test.expect(1);

		var actual = jsonify(grunt.file.read('tmp/baseurl.js'));
		var expected = jsonify(grunt.file.read('test/fixtures/baseurl-expected.js'));
		test.deepEqual(actual, expected, 'should wireup Bower components relative to baseUrl');

		test.done();
	}
};
