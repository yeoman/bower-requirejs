/* jshint expr: true */
/* global describe:true, it:true */

'use strict';
var path = require('path');
var execFile = require('child_process').execFile;
var should = require('should');
var pkg = require('../../package.json');

describe('bin', function () {
  it('should return the version', function (done) {
    var cp = execFile('node', [path.join(__dirname, '../../', pkg.bin['bower-requirejs']), '--version', '--no-update-notifier']);
    var expected = pkg.version;

    cp.stdout.on('data', function (data) {
      data.replace(/\r\n|\n/g, '').should.eql(expected);
      done();
    });
  });
});
