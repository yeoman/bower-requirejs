/* jshint expr: true */
/* global describe:true, it:true */

'use strict';
var should = require('should');
var parse = require('../../lib/parse');
var deps = require('./fixtures/deps');

describe('parse', function () {
  it('should return a paths object with a single path', function () {
    var actual = parse(deps.jquery, 'jquery', './');
    var expected = { paths: { jquery: 'tmp/bower_components/jquery/jquery' }};
    actual.should.eql(expected);
  });

  it('should return paths by filename if there are multiple js files', function () {
    var actual = parse(deps.handlebars, 'handlebars', './');
    var expected = {
      paths: {
        'handlebars': 'tmp/bower_components/handlebars/handlebars',
        'handlebars.runtime': 'tmp/bower_components/handlebars/handlebars.runtime'
      }
    };
    actual.should.eql(expected);
  });

  it('should ignore non-JavaScript files', function () {
    var actual = parse(deps.withCSS, 'withCSS', './');
    var expected = { paths: { withCSS: 'tmp/bower_components/withCSS/withCSS' }};
    actual.should.eql(expected);
  });

  it('should ignore single non-JavaScript file in main', function () {
    var actual = parse(deps['non-js'], 'non-js', './');
    var expected = { paths: {} };
    actual.should.eql(expected);
  });

  it('should ignore multiple non-JavaScript files in main', function () {
    var actual = parse(deps['non-jss'], 'non-jss', './');
    var expected = { paths: {} };
    actual.should.eql(expected);
  });

  it('should ignore some non-JavaScript files in main', function () {
    var actual = parse(deps['some-js'], 'some-js', './');
    var expected = { paths: { 'some-js': 'tmp/bower_components/some-js/is/js/baz' } };
    actual.should.eql(expected);
  });

  it('should return a directory path if one is listed in main', function () {
    var actual = parse(deps.mout, 'mout', './');
    var expected = { paths: { mout: 'tmp/bower_components/mout/src' }};
    actual.should.eql(expected);
  });
});
