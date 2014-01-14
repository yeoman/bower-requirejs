/* jshint expr: true, unused: false */
/* global describe:true, it:true */

'use strict';
var should = require('should');
var path = require('path');
var file = require('file-utils');

describe('index', function () {
  it('should throw an error if there is no config option', function () {
    require('../../lib').should.throwError('--config option is required');
  });

  it('should create a config file if one does not exist', function (done) {
    require('../../lib')({ config: 'tmp/generated-config.js' }, function () {
      file.exists(path.join(__dirname, '../../tmp/generated-config.js')).should.be.ok;
      done();
    });
  });
});
