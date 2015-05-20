/* jshint expr: true */
/* global describe:true, it:true */

'use strict';
var should = require('should');
var parse = require('../../lib/parse');
var path = require('path');
var deps = require('./fixtures/deps');

describe('parse', function () {
  it('should return a paths object with a single path', function () {
    var actual = parse(deps.jquery, 'jquery', './');
    var expected = { type: 'paths', paths: { jquery: 'tmp/bower_components/jquery/jquery' }};
    actual.should.eql(expected);
  });

  it('should return paths by filename if there are multiple js files', function () {
    var actual = parse(deps.handlebars, 'handlebars', './');
    var expected = {
      type: 'paths',
      paths: {
        'handlebars': 'tmp/bower_components/handlebars/handlebars',
        'handlebars.runtime': 'tmp/bower_components/handlebars/handlebars.runtime'
      }
    };
    actual.should.eql(expected);
  });

  it('should ignore non-JavaScript files', function () {
    var actual = parse(deps.withCSS, 'withCSS', './');
    var expected = {
      type: 'paths',
      paths: { withCSS: 'tmp/bower_components/withCSS/withCSS' }
    };
    actual.should.eql(expected);
  });

  it('should ignore single non-JavaScript file in main', function () {
    var actual = parse(deps['non-js'], 'non-js', './');
    var expected = {
      type: 'paths',
      paths: {}
    };
    actual.should.eql(expected);
  });

  it('should ignore multiple non-JavaScript files in main', function () {
    var actual = parse(deps['non-jss'], 'non-jss', './');
    var expected = {
      type: 'paths',
      paths: {}
    };
    actual.should.eql(expected);
  });

  it('should ignore some non-JavaScript files in main', function () {
    var actual = parse(deps['some-js'], 'some-js', './');
    var expected = {
      type: 'paths',
      paths: { 'some-js': 'tmp/bower_components/some-js/is/js/baz' }
    };
    actual.should.eql(expected);
  });

  it('should return a directory path if one is listed in main', function () {
    var actual = parse(deps.mout, 'mout', './');
    var expected = {
      type: 'paths',
      paths: {
        mout: 'tmp/bower_components/mout/src'
      }
    };
    actual.should.eql(expected);
  });

  it('should return a package if moduleType is node', function () {
    var name = 'some-package';
    var actual = parse(deps[name], name, './');
    var expected = {
      type: 'package',
      package: {
        name: 'some-package',
        main: 'main.js'
      }
    };
    actual.should.eql(expected);
  });

  it('should parse package main if given', function () {
    var name = 'some-package-with-a-main';
    var actual = parse(deps[name], name, './');
    var expected = {
      type: 'package',
      package: {
        name: 'some-package-with-a-main',
        main: 'some-main.js'
      }
    };
    actual.should.eql(expected);
  });

  it('should parse as AMD when both AMD and node are supported', function () {
    var name = 'supports-amd-and-node';
    var actual = parse(deps[name], name, './');
    var expected = {
      type: 'paths',
      paths: false
    };
    actual.should.eql(expected);
  });
});
