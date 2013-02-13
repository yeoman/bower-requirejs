# grunt-bower-hooks [![Build Status](https://secure.travis-ci.org/yeoman/grunt-bower-hooks.png?branch=master)](http://travis-ci.org/yeoman/grunt-bower-hooks)

Automagically wire-up installed Bower components into your RequireJS config


## Getting Started

If you haven't used [grunt][] before, be sure to check out the [Getting Started][] guide, as it explains how to create a [gruntfile][Getting Started] as well as install and use grunt plugins. Once you're familiar with that process, install this plugin with this command:

```shell
npm install grunt-bower-hooks --save-dev
```

[grunt]: http://gruntjs.com
[Getting Started]: https://github.com/gruntjs/grunt/blob/devel/docs/getting_started.md


## Example usage

```js
grunt.initConfig({
	bower: {
		rjsConfig: 'app/config.js'
	}
});

grunt.registerTask('default', ['bower']);
```


## Documentation

When the `bower` task is run it merges the paths to installed Bower components into the `paths` property of your RequireJS config.


### rjsConfig

**Required**  
Type: `String`

Specify a relative path to your RequireJS config


### indent

**Optional**  
Type: `String`

Specify an indentation string to use when updating the paths property. Default is 4 spaces


## License

[BSD license](http://opensource.org/licenses/bsd-license.php) and copyright Google
