var path = require('path');
var base = path.join(__dirname, '../../../bower_components');

module.exports = {
  jquery: base + '/jquery/jquery.js',
  handlebars: [base + '/handlebars/handlebars.js', base + '/handlebars/handlebars.runtime.js'],
  backbone: base + '/backbone',
  'backbone-amd': base + '/backbone-amd',
  anima: [base + '/anima/anima.js', base + '/anima/anima.min.js', base + '/anima/anima.min.js.map'],
  requirejs: base + '/requirejs',
  mout: base + '/mout',
  'jquery-ui-touch-punch-amd': base + '/jquery-ui-touch-punch-amd'
};
