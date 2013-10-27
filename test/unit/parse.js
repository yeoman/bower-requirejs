/* jshint expr: true */
/* global describe:true, it:true */

'use strict';
var should = require('should');
var parse = require('../../lib/parse');
var paths = require('./fixtures/paths');

describe('parse', function () {
  it('should return a paths object with a single path', function () {
    var actual = parse(paths.jquery, 'jquery', './');
    var expected = { paths: { jquery: 'bower_components/jquery/jquery' }};
    actual.should.eql(expected);
  });

  it('should return paths by filename if there are multiple js files', function () {
    var actual = parse(paths.handlebars, 'handlebars', './');
    var expected = {
      paths: {
        handlebars: 'bower_components/handlebars/handlebars',
        'handlebars.runtime': 'bower_components/handlebars/handlebars.runtime'
      }
    };
    actual.should.eql(expected);
  });

  it('should return a single path if directory contains top level js', function () {
    var actual = parse(paths.backbone, 'backbone', './');
    var expected = { paths: { backbone: 'bower_components/backbone/backbone' }};
    actual.should.eql(expected);
  });

  it('should return false if directory does not contains top level js', function () {
    var actual = parse(paths.mout, 'mout', './');
    var expected = false;
    actual.should.eql(expected);
  });

  it('should ignore non-JavaScript files', function () {
    var actual = parse(paths.anima, 'anima', './');
    var expected = { paths: { anima: 'bower_components/anima/anima.min' }};
    actual.should.eql(expected);
  });
});
