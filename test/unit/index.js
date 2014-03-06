/* jshint expr: true, unused: false */
/* global describe:true, it:true */

'use strict';
var should = require('should');
var path = require('path');
var file = require('file-utils');

describe('index', function () {
  describe('when config option provided', function () {
    it('should create a config file if one does not exist', function (done) {
      require('../../lib')({ config: 'tmp/generated-config.js' }, function (generatedConfig) {
        file.exists(path.join(__dirname, '../../tmp/generated-config.js')).should.be.ok;
        generatedConfig.should.be.ok;
        done();
      });
    });
  });

  describe('when no config option is provided', function () {
    it('should just fire callback with generatedConfig object', function (done) {
      require('../../lib')({}, function (generatedConfig) {
        generatedConfig.should.be.ok;
        done();
      });
    });
  });
});
