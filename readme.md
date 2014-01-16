# bower-requirejs [![Build Status](https://secure.travis-ci.org/yeoman/bower-requirejs.png?branch=master)](http://travis-ci.org/yeoman/bower-requirejs)

> Automagically wire-up installed Bower components into your RequireJS config


## Install

- Install with [npm](https://npmjs.org/package/grunt-bower-requirejs): `npm install --save bower-requirejs`


## Example usage

```
./node_modules/.bin/bower-requirejs -c path/to/config -e underscore -e jquery
```


## Options

```
-h, --help           # Print options and usage'
-v, --version        # Print the version number'
-c, --config         # Path to your RequireJS config file'
-e, --exclude        # Name of a dependency to be excluded from the process'
-b, --baseUrl        # Path which all dependencies will be relative to'
```


## Things to remember

### Config file

If you do not already have a `config.js` file at the location specified by the `--config` option then one will be generated for you. A basic `config.js` file looks like this:

``` js
requirejs.config({
  shim: {},
  paths: {}
});
```

You still need to create a path for *your* js files. This tool will only create paths for third party libraries specified in `bower.json`.

``` js
requirejs.config({
  shim: {},
  paths: {
    myComponent: 'js/myComponent.js'  // make sure to add your components!
  }
});
```

The tool does not overwrite the config file, it just adds additional paths to it. So paths you add will be preserved. Keep in mind that if you change or remove one of your Bower dependencies after you've run the task, that path will still exist in the config file and you'll need to manually remove it.


### RequireJS component

Although RequireJS does not provide a `bower.json` file, a path to `require.js` will still be created in your `rjsConfig` file. The path's name will be `requirejs`. If you are optimizing your scripts with `r.js` you can use this path to make sure RequireJS is included in your bundle.


## Programmatic API

### bowerRequireJS(options, callback)

- `options` — An [options object](https://github.com/yeoman/bower-requirejs#options) containing a config and optional baseUrl and excludes.
- `callback` — A callback to execute when the task is finished

You can use `bower-requirejs` directly in your app if you prefer to not rely on the binary.

```js
var bowerRequireJS = require('bower-requirejs');

var options = {
  config: 'scripts/config.js',
  exclude: ['underscore', 'jquery']
};

bowerRequrieJS(options, function () {
  // all done!
});
```


### parse(pkg, name, baseUrl)

- `pkg` — A package object returned from `bower list`
- `name` — The name of the package
- `baseUrl` — A baseUrl to use when generating the path

If you would like to just receive a paths object you can do so with the `parse` module. If your package does not contain a `bower.json` file, or if the `bower.json` does not contain a `main` attribute then the parse module will try to use the `primary` module to find a primary, top-level js file.

```js
var bower = require('bower');
var _ = require('lodash');
var parse = require('bower-requirejs/lib/parse');

var baseUrl = './';

bower.commands.list()
  .on('end', function (data) {
    _.forOwn(data.dependencies, function (pkg, name) {
      if (name == 'jquery') {
        var pathObj = parse(pkg, name, baseUrl);
      }
    });
  });
```

### primary(name, canonicalDir)

- `name` — The package name
- `canonicalDir` — The canonicalDir for the package, either returned by `bower list` or passed in manually

If you just want to look for the top-level js file in a bower component you can use the `primary` module. The `primary` module will exclude gruntfiles and `min.js` files. It will also check if `package.json` specifies a `main` js file.

```js
var primary = require('bower-requirejs/lib/primary');

var name = 'backbone';
var dep = { canonicalDir: './bower_components/backbone' };

var primaryJS = primary(name, dep);
// returns backbone.js
```

## Credit

[![Sindre Sorhus](http://gravatar.com/avatar/d36a92237c75c5337c17b60d90686bf9?s=144)](http://sindresorhus.com) | [![Rob Dodson](http://gravatar.com/avatar/95c3a3b33ea51545229c625bef42e343?s=144)](http://robdodson.me)
:---:|:---:
[Sindre Sorhus](http://sindresorhus.com) (creator) | [Rob Dodson](http://robdodson.me) (maintainer)


## License

[BSD license](http://opensource.org/licenses/bsd-license.php) and copyright Google
