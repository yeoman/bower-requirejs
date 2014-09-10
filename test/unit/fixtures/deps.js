module.exports = {
  // dependencies without a main field for testing primary.js
  // these items are paired with dummy files in the fixtures/bower_components dir
  'backbone': {
    canonicalDir: './tmp/bower_components/backbone'
  },
  'requirejs': {
    canonicalDir: './tmp/bower_components/requirejs'
  },
  'backbone-amd': {
    canonicalDir: './tmp/bower_components/backbone-amd'
  },
  'jquery-ui-touch-punch-amd': {
    canonicalDir: './tmp/bower_components/jquery-ui-touch-punch-amd'
  },
  'noPrimary': {
    canonicalDir: './tmp/bower_components/no-primary'
  },

  // dependencies with a main field for testing parse.js
  'jquery': {
    canonicalDir: './tmp/bower_components/jquery',
    pkgMeta: {
      main: 'jquery.js'
    }
  },
  'handlebars': {
    canonicalDir: './tmp/bower_components/handlebars',
    pkgMeta: {
      main: ['handlebars.js', 'handlebars.runtime.js']
    }
  },
  'withCSS': {
    canonicalDir: './tmp/bower_components/withCSS',
    pkgMeta: {
      main: ['withCSS.js', 'withCSS.css']
    }
  },
  'mout': {
    canonicalDir: './tmp/bower_components/mout',
    pkgMeta: {
      main: 'src/'
    }
  },
  'non-js': {
    canonicalDir: './tmp/bower_components/non-js',
    pkgMeta: {
      main: 'not/js/foo.css'
    }
  },
  'non-jss': {
    canonicalDir: './tmp/bower_components/non-jss',
    pkgMeta: {
      main: [
        'not/js/foo.css',
        'not/js/also/bar.css'
      ]
    }
  },
  'some-js': {
    canonicalDir: './tmp/bower_components/some-js',
    pkgMeta: {
      main: [
        'not/js/foo.css',
        'not/js/also/bar.css',
        'is/js/baz.js'
      ]
    }
  },
  'some-package': {
    canonicalDir: './tmp/bower_components/some-package',
    pkgMeta: {
      moduleType: ['node']
    }
  },
  'relative-location': {
    canonicalDir: './tmp/bower_components/relative-location',
    pkgMeta: {
      moduleType: ['node'],
      location: 'location'
    }
  },
  'absolute-location': {
    canonicalDir: './tmp/bower_components/absolute-location',
    pkgMeta: {
      moduleType: ['node'],
      location: '/location'
    }
  },
  'some-package-with-a-main': {
    canonicalDir: './tmp/bower_components/some-package-with-a-main',
    pkgMeta: {
      moduleType: ['node'],
      main: 'some-main.js'
    }
  },

  // Dependencies that use extra search directories.
  'uses-dist': {
    canonicalDir: './tmp/bower_components/uses-dist',
    pkgMeta: {}
  },
  'uses-custom-dir': {
    canonicalDir: './tmp/bower_components/uses-custom-dir',
    pkgMeta: {}
  }
};
