'use strict';
var path = require('path');
var fs = require('fs');
var file = require('file-utils');
var requirejs = require('requirejs/bin/r.js');
var _ = require('lodash');
var chalk = require('chalk');
var success = chalk.green;
var danger = chalk.black.bgRed;
var parse = require('./parse');

/**
 * Convert bower dependencies into paths for
 * RequireJS config file
 */
module.exports = function (args, opts, done) {
  args = args || [];
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
    require('bower').commands.list({paths: true, relative: false})
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
      if (exclude.indexOf(key) !== -1) {
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
          _.extend(config.paths, dependencies);
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
