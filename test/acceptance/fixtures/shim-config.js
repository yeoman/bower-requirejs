var require = {
  shim: {
    'typeahead.js': {
      exports: 'jQuery'
    },
    'backbone.babysitter': {
      deps: ['backbone', '../vendor/backbone.wreqr/reports/coverage/prettify.css']
    }
  }
};
