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
      var opts = { config: 'tmp/config.js', exclude: ['underscore'] };
      require('../../lib')(opts, function () {
        var actual = jsonify(fs.readFileSync('tmp/config.js', 'utf8'));
        var expected = jsonify(fs.readFileSync('test/acceptance/fixtures/config-expected.js', 'utf8'));
        actual.should.eql(expected);
        done();
      });
    });
  });

  describe('global-config', function () {
    it('should return the expected result', function (done) {
      var opts = { config: 'tmp/global-config.js', exclude: ['underscore'] };
      require('../../lib')(opts, function () {
        var actual = jsonify(fs.readFileSync('tmp/global-config.js', 'utf8'));
        var expected = jsonify(fs.readFileSync('test/acceptance/fixtures/global-config-expected.js', 'utf8'));
        actual.should.eql(expected);
        done();
      });
    });
  });

  describe('baseurl', function () {
    it('should return the expected result', function (done) {
      var opts = { config: 'tmp/baseurl.js', exclude: ['underscore'], baseUrl: './' };
      require('../../lib')(opts, function () {
        var actual = jsonify(fs.readFileSync('tmp/baseurl.js', 'utf8'));
        var expected = jsonify(fs.readFileSync('test/acceptance/fixtures/baseurl-expected.js', 'utf8'));
        actual.should.eql(expected);
        done();
      });
    });
  });

  describe('pathless-config', function () {
    it('should return the expected result', function (done) {
      var opts = { config: 'tmp/pathless-config.js', exclude: ['underscore'] };
      require('../../lib')(opts, function () {
        var actual = jsonify(fs.readFileSync('tmp/pathless-config.js', 'utf8'));
        var expected = jsonify(fs.readFileSync('test/acceptance/fixtures/pathless-config-expected.js', 'utf8'));
        actual.should.eql(expected);
        done();
      });
    });
  });

  describe('generated-config', function () {
    it('should return the expected result', function (done) {
      var opts = { config: 'tmp/generated-config.js', exclude: ['underscore'] };
      require('../../lib')(opts, function () {
        var actual = jsonify(fs.readFileSync('tmp/generated-config.js', 'utf8'));
        var expected = jsonify(fs.readFileSync('test/acceptance/fixtures/generated-config-expected.js', 'utf8'));
        actual.should.eql(expected);
        done();
      });
    });
  });

  describe('with transitive dependencies', function () {
    it('should return the expected result', function (done) {
      var opts = { transitive: true, config: 'tmp/transitive-config.js' };
      require('../../lib')(opts, function () {
        var actual = jsonify(fs.readFileSync('tmp/transitive-config.js', 'utf8'));
        var expected = jsonify(fs.readFileSync('test/acceptance/fixtures/transitive-config-expected.js', 'utf8'));
        actual.should.eql(expected);
        done();
      });
    });
  });

  describe('when dependency is missing', function () {
    it('should callback with false', function (done) {
      var opts = { config: 'tmp/config.js' };
      fs.renameSync('bower_components/jquery', 'bower_components/foo');
      require('../../lib')(opts, function (completed) {
        console.log('Testing for missing jquery...');
        var actual = completed;
        var expected = false;
        actual.should.eql(expected);
        fs.renameSync('bower_components/foo', 'bower_components/jquery');
        done();
      });
    });
  });

  describe('without dev-dependencies', function () {
    it('should return the expected result', function (done) {
      var opts = { config: 'tmp/no-devdependencies-config.js', exclude: ['underscore'], 'exclude-dev': true };
      require('../../lib')(opts, function () {
        var actual = jsonify(fs.readFileSync('tmp/no-devdependencies-config.js', 'utf8'));
        var expected = jsonify(fs.readFileSync('test/acceptance/fixtures/no-devdependencies-config-expected.js', 'utf8'));
        actual.should.eql(expected);
        done();
      });
    });
  });
});
