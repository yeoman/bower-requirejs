'use strict';
var _ = require('lodash');
var assign = require('object-assign');
var parse = require('./parse');


/**
 * Build requirejs config object from bower dependencies object.
 */
module.exports = function (dependencyGraph, opts) {
  opts = opts || {};
  var exclude = opts.exclude || [];
  var baseUrl = opts.baseUrl || '';

  var dependencies = {};
  // Recursively register dependencies if transitive option is specified.
  if (opts.transitive) {
    var registerTransitiveDependencies = function (node) {
      if (node.dependencies) {
        _.forOwn(node.dependencies, function (dep, name) {
          if (! _.has(dependencies, name)) {
            dependencies[name] = dep;
            registerTransitiveDependencies(dep);
          }
        });
      }
    };
    registerTransitiveDependencies(dependencyGraph);
  } else {
    // Otherwise just use top-level dependencies.
    dependencies = dependencyGraph.dependencies;
  }

  var config = {
    paths: {},
    packages: []
  };

  _.forOwn(dependencies, function (dep, name) {
    if (exclude.indexOf(name) !== -1) {
      return;
    }

    var configElement = parse(dep, name, baseUrl);
    if (configElement) {
      if (configElement.paths) {
        assign(config.paths, configElement.paths);
      } 
      if (configElement.package) {
        config.packages.push(configElement.package);
      }
    }
  });

  return config;
};
