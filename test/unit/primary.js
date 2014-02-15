/* jshint expr: true */
/* global describe:true, it:true */

'use strict';
var should = require('should');
var primary = require('../../lib/primary');
var deps = require('./fixtures/deps');

describe('primary', function () {
  it('should return a js file that matches the project dir', function () {
    var actual = primary('backbone', deps.backbone);
    var expected = 'backbone.js';
    actual.should.eql(expected);
  });

  it('should return a js file that matches the project dir with suffix', function () {
    var actual = primary('requirejs', deps.requirejs);
    var expected = 'require.js';
    actual.should.eql(expected);
  });

  it('should return false if no primary js is found', function () {
    var actual = primary('noPrimary', deps.noPrimary);
    var expected = false;
    actual.should.eql(expected);
  });

  it('should return a js file that matches the primary js found in package.json', function () {
    var actual = primary('backbone-amd', deps['backbone-amd']);
    var expected = 'backbone.js';
    actual.should.eql(expected);
  });

  it('should exclude Gruntfiles', function () {
    var actual = primary('jquery-ui-touch-punch-amd', deps['jquery-ui-touch-punch-amd']);
    var expected = 'jquery.ui.touch-punch.js';
    actual.should.eql(expected);
  });

  it('should return a js file in dist dir that matches the project dir', function () {
    var actual = primary('uses-dist', deps['uses-dist']);
    var expected = 'dist/uses-dist.js';
    actual.should.eql(expected);
  });

  it('should return a js file in a custom seach dir that matches the project dir', function () {
    var actual = primary('uses-custom-dir', deps['uses-custom-dir'], {extraSearchDirs: ['custom']});
    var expected = 'custom/uses-custom-dir.js';
    actual.should.eql(expected);
  });
});
