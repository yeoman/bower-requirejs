'use strict';
var path = require('path');
var fs = require('fs');
var bower = require('bower');
var file = require('file-utils');
var requirejs = require('requirejs/bin/r.js');
var _ = require('lodash');
var assign = require('object-assign');
var chalk = require('chalk');
var success = chalk.green;
var danger = chalk.black.bgRed;
var parse = require('./parse');

/**
 * Convert bower dependencies into paths for
 * RequireJS config file
 */
module.exports = function (opts, done) {
  opts = opts || {};

  var configPath = opts.config;
  if (!configPath) {
    throw new Error('--config option is required');
  }
  var configDir = path.dirname(configPath);
  var exclude = opts.exclude || [];
  var baseUrl = opts.baseUrl || configDir;

  // Grab the config file, or create one if it doesn't exist
  var config;

  if (file.exists(configPath)) {
    config = fs.readFileSync(String(configPath), 'utf8');
  } else {
    config = fs.readFileSync(path.join(__dirname, '../templates/config.js'), 'utf8');
  }


  function run() {
    bower.commands.list({}, { offline: true })
      .on('end', function (data) {
        if (data) {
          writeConfig(buildPaths(data.dependencies));
        }
      })
      .on('error', function (err) {
        console.error(danger('ERR'), process.argv.slice(2).join(' '), '\n');
        console.error(opts.debug ? err.stack : err.message);
        process.exit(err.code || 1);
      });
  }

  /**
   * Turn bower dependencies into paths objects
   */
  function buildPaths (deps) {
    var dependencies = {};
    _.forOwn(deps, function (dep, name) {
      if (exclude.indexOf(name) !== -1) {
        return;
      }

      var pathsObj = parse(dep, name, baseUrl);
      if (pathsObj) {
        dependencies = assign(dependencies, pathsObj.paths);
      }
    });

    return dependencies;
  }

  /**
   * Write all dependencies to rjs config file
   */
  function writeConfig (dependencies) {
    var rjsConfig;
    requirejs.tools.useLib(function (require) {
      rjsConfig = require('transform').modifyConfig(config, function (config) {

        // If the original config defines paths, add the
        // bower component paths to it; otherwise, add a
        // paths map with the bower components.
        if (config.paths) {
          assign(config.paths, dependencies);
        } else {
          config.paths = dependencies;
        }

        return config;
      });

      fs.writeFileSync(configPath, rjsConfig, 'utf-8');
      console.log(success('Updated RequireJS config with installed Bower components'));

      if (!done) {
        done = function () {};
      }
      done();
    });
  }

  run();
};
