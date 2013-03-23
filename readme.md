# grunt-bower-requirejs [![Build Status](https://secure.travis-ci.org/yeoman/grunt-bower-requirejs.png?branch=master)](http://travis-ci.org/yeoman/grunt-bower-requirejs)

Automagically wire-up installed Bower components into your RequireJS config


## Getting Started

If you haven't used [grunt][] before, be sure to check out the [Getting Started][] guide, as it explains how to create a [gruntfile][Getting Started] as well as install and use grunt plugins. Once you're familiar with that process, install this plugin with this command:

```shell
npm install grunt-bower-requirejs --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-bower-requirejs');
```

[grunt]: http://gruntjs.com
[Getting Started]: https://github.com/gruntjs/grunt/blob/devel/docs/getting_started.md


## Example usage

```js
grunt.initConfig({
	bower: {
		target: {
			rjsConfig: 'app/config.js'
		}
	}
});

grunt.loadNpmTasks('grunt-bower-requirejs');

grunt.registerTask('default', ['bower']);
```


## Documentation

When the `bower` task is run it merges the paths of installed Bower components into the `paths` property of your RequireJS config.


### rjsConfig

**Required**  
Type: `String`

Specify a relative path to your RequireJS config.


### Options

#### exclude

Default: `[]`  
Type: `Array`

Specify components to be excluded from being added to the RequireJS config.


## License

[BSD license](http://opensource.org/licenses/bsd-license.php) and copyright Google
