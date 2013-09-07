#!/usr/bin/env node
'use strict';
var nopt = require('nopt');
var path = require('path');
var project = require('../lib');

var opts = nopt({
  config: path,
  excludes: Array,
  baseurl: path
}, {
  c: '--config',
  e: '--excludes',
  b: '--baseurl'
});

var args = opts.argv.remain;

project(args, opts);
