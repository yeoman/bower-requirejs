/* jshint expr: true, unused: false */
/* global describe:true, it:true */

'use strict';
var should = require('should');
var path = require('path');
var file = require('file-utils');
var _ = require('lodash');
var buildConfig = require('../../lib/build-config');


describe('buildConfig', function () {

  /*
   * Helper functions to create mock dependency graphs.
   */
  var generateDependencyGraph = function (opts) {
    var baseUrl = opts.baseUrl || '/';

    var dependencyGraph = {
      canonicalDir: '/test/canonical/dir',
      pkgMeta: {
        name: 'testName',
      },
    };

    var generatedDependencies = {};

    for (var i = 0; i < opts.dependencies.length; i++) {
      var dep = opts.dependencies[i];
      generatedDependencies[dep.name] = generateDependency(_.extend({
        baseUrl: opts.baseUrl
      }, dep));
    }

    dependencyGraph.dependencies = generatedDependencies;

    return dependencyGraph;
  };

  var generateDependency = function (opts) {
    opts = opts || {};
    var baseUrl = opts.baseUrl || '/';
    var dependencies = opts.dependencies || [];
    var moduleType = opts.moduleType;

    var dep = {
      canonicalDir: path.join(baseUrl, opts.name),
      pkgMeta: {
        name: opts.name,
        main: 'main.js',
      },
      dependencies: {}
    };

    if (moduleType) {
      dep.pkgMeta.moduleType = moduleType;
    }

    for (var i = 0; i < dependencies.length; i++) {
      var subdep = dependencies[i];
      dep.dependencies[subdep.name] = generateDependency(_.extend({
        baseUrl: baseUrl
      }, subdep));
    }

    return dep;
  };

  it('should create config w/ only top-level dependencies', function () {
    var baseUrl = '/';
    var dependencyGraph = generateDependencyGraph({
      baseUrl: baseUrl,
      dependencies: [
        {name: 'a'},
        {name: 'b', dependencies: [
          {name: 'child-of-b'}
        ]},
      ],
    });

    var actual = buildConfig(dependencyGraph, {baseUrl: baseUrl});

    var expected = {
      paths: {
        a: 'a/main',
        b: 'b/main'
      },
      packages: []
    };

    actual.should.eql(expected);
  });

  it('should create config with transitive dependencies', function () {
    var baseUrl = '/';
    var dependencyGraph = generateDependencyGraph({
      baseUrl: baseUrl,
      dependencies: [
        {name: 'a'},
        {name: 'b', dependencies: [
          {name: 'child-of-b'}
        ]},
      ],
    });

    var actual = buildConfig(dependencyGraph, {baseUrl: baseUrl, transitive: true});

    var expected = {
      paths: {
        a: 'a/main',
        b: 'b/main',
        'child-of-b': 'child-of-b/main'
      },
      packages: []
    };
    actual.should.eql(expected);
  });


  it('should create without dev-dependencies', function () {
    var baseUrl = '/';
    var dependencyGraph = generateDependencyGraph({
      baseUrl: baseUrl,
      dependencies: [
        {name: 'a'},
        {name: 'b', dependencies: [
          {name: 'child-of-b'}
        ]},
        {name: 'c'}
      ]
    });

    dependencyGraph.pkgMeta.devDependencies = {c: '*'};

    var actual = buildConfig(dependencyGraph, {baseUrl: baseUrl, transitive: true, 'exclude-dev': true});

    var expected = {
      paths: {
        a: 'a/main',
        b: 'b/main',
        'child-of-b': 'child-of-b/main'
      },
      packages: []
    };
    actual.should.eql(expected);
  });

});
