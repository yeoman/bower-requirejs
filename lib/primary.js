'use strict';
var path = require('path');
var _ = require('lodash');
var warn = require('chalk').black.bgYellow;
var file = require('file-utils');

/**
 * Find primary js file in directory if no bower.json
 * exists.
 */

module.exports = function (name, dep) {

  /**
   * If we find any Gruntfiles, remove them and log a warning.
   */

  function excludeGrunt () {
    if (_.contains(main, 'grunt.js') || _.contains(main, 'Gruntfile.js')) {
      console.log(warn('WARN'), 'Ignoring Gruntfile in ' + name);
      console.log('You should inform the author to ignore this file in their bower.json\n');
      main = _.without(main, 'grunt.js', 'Gruntfile.js');
    }
    return main;
  }

  /**
   * Look for a primary .js file based on the project name
   * ex: backbone.js inside backbone dir
   */

  function findByDirname () {
    if (_.contains(main, path.basename(dep) + '.js')) {
      main = [path.basename(dep) + '.js'];
    }
  }

  /**
   * Look for a primary .js file based on the project name minus 'js'
   * ex: require.js inside requirejs dir
   */

  function findByDirnameSuffix () {
    if (_.contains(main, path.basename(dep).replace(/js$/, '') + '.js')) {
      main = [path.basename(dep).replace(/js$/, '') + '.js'];
    }
  }

  /**
   * Look for primary .js file in package.json
   */

  function findByPackage () {
    // TODO: search package.json for main
  }

  /**
   * Execute callbacks in order until test passes or
   * we run out of callbacks
   */

  function until (test, callbacks, done) {
    for (var i = 0; i < callbacks.length; i++) {
      if (test()) {
        break;
      } else {
        callbacks[i].call();
      }
    }

    done();
  }

  /**
   * Test if only one js file remains
   */

  function primaryFound () {
    return main.length === 1;
  }

  /**
   * If a top level js file is found set that to the return
   * value. Otherwise return false to indicate a failure
   */

  function end () {
    if (primaryFound()) {
      dep = path.join(dep, main[0]);
    } else {
      dep = false;
    }
  }

  // Put all top level js files into an array
  var main = file.expand({ cwd: dep }, '*.js', '!*.min.js');

  // Remove any Gruntfiles
  excludeGrunt();

  // Call find functions until test passes or
  // we run out of functions
  until(primaryFound, [
    findByDirname,
    findByDirnameSuffix,
    findByPackage
  ], end);

  return dep;
};
