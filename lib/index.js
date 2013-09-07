'use strict';
var path = require('path');
var fs = require('fs');
var requirejs = require('requirejs/bin/r.js');
var _ = require('lodash');
var chalk = require('chalk');
var success = chalk.green;
var danger = chalk.black.bgRed;
var parse = require('./parse');

module.exports = function (args, opts, done) {
  args = args || [];
  opts = opts || {};

  var config = opts.config;
  if (!config) {
    throw new Error('config is required');
  }
  var configDir = path.dirname(config);
  var excludes = opts.excludes || [];
  var baseUrl = opts.baseUrl || configDir;
  var file = fs.readFileSync(String(config), 'utf8');

  function run () {
    require('bower').commands.list({ paths: true, relative: false })
      .on('end', function (data) {
        if (data) {
          var dependencies = makeDependencies(data);
          writeConfig(dependencies);
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

  function makeDependencies (data) {
    var dependencies = {};
    _.forOwn(data, function (val, key) {
      if (isExcluded(key)) {
        return;
      }
      var dep = parse(val, key, baseUrl);
      if (dep) {
        dependencies = _.extend(dependencies, dep.paths);
      }
    });

    return dependencies;
  }

  /**
   * If the dependency should be excluded
   */

  function isExcluded (name) {
    return excludes.indexOf(name) !== -1;
  }

  /**
   * Write all dependencies to rjs config file
   */

  function writeConfig (dependencies) {
    var rjsConfig;
    requirejs.tools.useLib(function (require) {
      rjsConfig = require('transform').modifyConfig(file, function (config) {

        // If the original config defines paths, add the
        // bower component paths to it; otherwise, add a
        // paths map with the bower components.
        if (config.paths) {
          _.extend(config.paths, dependencies);
        } else {
          config.paths = dependencies;
        }

        return config;
      });

      fs.writeFileSync(config, rjsConfig, 'utf-8');
      console.log(success('Updated RequireJS config with installed Bower components'));
      if (!done) {
        done = function () {};
      }
      done();
    });
  }

  run();
};
