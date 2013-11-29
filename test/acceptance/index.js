/* global describe:true, it:true */

'use strict';
var fs = require('fs');
var should = require('should');
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

describe('index', function () {

  describe('config', function () {
    it('should return the expected result', function (done) {
      var args = [];
      var opts = { config: 'tmp/config.js', exclude: ['underscore'] };
      require('../../lib')(args, opts, function () {
        var actual = jsonify(fs.readFileSync('tmp/config.js', 'utf-8'));
        var expected = jsonify(fs.readFileSync('test/acceptance/fixtures/config-expected.js', 'utf-8'));
        actual.should.eql(expected);
        done();
      });
    });
  });

  describe('global-config', function () {
    it('should return the expected result', function (done) {
      var args = [];
      var opts = { config: 'tmp/global-config.js', exclude: ['underscore'] };
      require('../../lib')(args, opts, function () {
        var actual = jsonify(fs.readFileSync('tmp/global-config.js', 'utf-8'));
        var expected = jsonify(fs.readFileSync('test/acceptance/fixtures/global-config-expected.js', 'utf-8'));
        actual.should.eql(expected);
        done();
      });
    });
  });

  describe('baseurl', function () {
    it('should return the expected result', function (done) {
      var args = [];
      var opts = { config: 'tmp/baseurl.js', exclude: ['underscore'], baseUrl: './' };
      require('../../lib')(args, opts, function () {
        var actual = jsonify(fs.readFileSync('tmp/baseurl.js', 'utf-8'));
        var expected = jsonify(fs.readFileSync('test/acceptance/fixtures/baseurl-expected.js', 'utf-8'));
        actual.should.eql(expected);
        done();
      });
    });
  });

  describe('pathless-config', function () {
    it('should return the expected result', function (done) {
      var args = [];
      var opts = { config: 'tmp/pathless-config.js', exclude: ['underscore'] };
      require('../../lib')(args, opts, function () {
        var actual = jsonify(fs.readFileSync('tmp/pathless-config.js', 'utf-8'));
        var expected = jsonify(fs.readFileSync('test/acceptance/fixtures/pathless-config-expected.js', 'utf-8'));
        actual.should.eql(expected);
        done();
      });
    });
  });
});
