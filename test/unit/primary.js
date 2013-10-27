/* jshint expr: true */
/* global describe:true, it:true */

'use strict';
var path = require('path');
var should = require('should');
var primary = require('../../lib/primary');
var paths = require('./fixtures/paths');

describe('primary', function () {
  it('should return a js file that matches the project dir', function () {
    var actual = primary('backbone', paths.backbone);
    var expected = path.join(paths.backbone, 'backbone.js');
    actual.should.eql(expected);
  });

  it('should return a js file that matches the project dir with suffix', function () {
    var actual = primary('requirejs', paths.requirejs);
    var expected = path.join(paths.requirejs, 'require.js');
    actual.should.eql(expected);
  });

  it('should return false if no primary js is found', function () {
    var actual = primary('mout', paths.mout);
    var expected = false;
    actual.should.eql(expected);
  });

  it('should return a js file that matches the primary js found in package.json', function () {
    var actual = primary('backbone-amd', paths['backbone-amd']);
    var expected = path.join(paths['backbone-amd'], 'backbone.js');
    actual.should.eql(expected);
  });

  it('should exclude Gruntfiles', function () {
    var actual = primary('jquery-ui-touch-punch-amd', paths['jquery-ui-touch-punch-amd']);
    var expected = path.join(paths['jquery-ui-touch-punch-amd'], 'jquery.ui.touch-punch.js');
    actual.should.eql(expected);
  });
});
