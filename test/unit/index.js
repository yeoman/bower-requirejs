/* jshint expr: true */
/* global describe:true, it:true */

'use strict';
var should = require('should');

describe('index', function () {
  it('should throw an error if there is no config file', function () {
    require('../../lib').should.throwError('--config option is required');
  });
});
