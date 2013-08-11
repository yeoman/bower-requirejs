'use strict';
var grunt = require('grunt');

exports.bowerRJS = {
	wireupComponent: function (test) {
		test.expect(1);

		var actual = grunt.file.read('tmp/config.js');
		var expected = grunt.file.read('test/fixtures/config-expected.js');
		test.equal(actual, expected, 'should wireup Bower components in RequireJS config');

		test.done();
	},
	wireupComponentPathless: function (test) {
		test.expect(1);

		var actual = grunt.file.read('tmp/pathless-config.js');
		var expected = grunt.file.read('test/fixtures/pathless-config-expected.js');
		test.equal(actual, expected, 'should wireup Bower components in RequireJS config without paths');

		test.done();
	},
	wireupComponentGlobalConfig: function (test) {
		test.expect(1);

		var actual = grunt.file.read('tmp/global-config.js');
		var expected = grunt.file.read('test/fixtures/global-config-expected.js');
		test.equal(actual, expected, 'should wireup Bower components in RequireJS config');

		test.done();
	},
	wireupComponentBaseUrlConfig: function (test) {
		test.expect(1);

		var actual = grunt.file.read('tmp/baseurl.js');
		var expected = grunt.file.read('test/fixtures/baseurl-expected.js');
		test.equal(actual, expected, 'should wireup Bower components relative to baseUrl');

		test.done();
	}
};
