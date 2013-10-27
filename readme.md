# bower-requirejs [![Build Status](https://secure.travis-ci.org/yeoman/bower-requirejs.png?branch=master)](http://travis-ci.org/yeoman/bower-requirejs)

Automagically wire-up installed Bower components into your RequireJS config


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
-c, --config         # Path to your requirejs config file'
-e, --excludes       # Name of a dependency to be excluded from the process'
-b, --baseurl        # Path which all dependencies will be relative to'
```

## Things to remember

### Config file

You need to already have a `config.js` file at the location specified by the `--config` option. At a minimum, the file should look like this:

``` js
requirejs.config({
  baseUrl: './',
  paths: {}
});
```

You still need to create a path for *your* js files. The grunt task will only create paths for third party libraries specified in `bower.json`.

``` js
requirejs.config({
  baseUrl: './',
  paths: {
    myComponent: 'js/myComponent.js'
  }
});
```

The task does not overwrite the config file, it just adds additional paths to it. So paths you add will be preserved. Keep in mind that if you change or remove one of your bower dependencies after you've run the task, that path will still exist in the config file and you'll need to manually remove it.

### RequireJS component

Although RequireJS does not provide a `bower.json` file, a path to `require.js` will still be created in your `rjsConfig` file. The path's name will be `requirejs`. If you are optimizing your scripts with `r.js` you can use this path to make sure RequireJS is included in your bundle.


## License

[BSD license](http://opensource.org/licenses/bsd-license.php) and copyright Google
