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

You still need to create a path for *your* js files. This tool will only create paths for third party libraries specified in `bower.json`.

``` js
requirejs.config({
  baseUrl: './',
  paths: {
    myComponent: 'js/myComponent.js'
  }
});
```

The tool does not overwrite the config file, it just adds additional paths to it. So paths you add will be preserved. Keep in mind that if you change or remove one of your Bower dependencies after you've run the task, that path will still exist in the config file and you'll need to manually remove it.


### RequireJS component

Although RequireJS does not provide a `bower.json` file, a path to `require.js` will still be created in your `rjsConfig` file. The path's name will be `requirejs`. If you are optimizing your scripts with `r.js` you can use this path to make sure RequireJS is included in your bundle.


## Credit

[![Sindre Sorhus](http://gravatar.com/avatar/d36a92237c75c5337c17b60d90686bf9?s=144)](http://sindresorhus.com) | [![Rob Dodson](http://gravatar.com/avatar/95c3a3b33ea51545229c625bef42e343?s=144)](http://robdodson.me)
:---:|:---:
[Sindre Sorhus](http://sindresorhus.com) (creator) | [Rob Dodson](http://robdodson.me) (maintainer)


## License

[BSD license](http://opensource.org/licenses/bsd-license.php) and copyright Google
