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
  }
};
