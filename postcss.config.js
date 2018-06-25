'use strict';
module.exports = (ctx) => ({
  parser: ctx.file.extname === '.sss' ? 'sugarss' : false,
  plugins: {
    'postcss-partial-import': {},
    'mdcss': {
      'theme': require('mdcss-theme-sapper'),
      'destination':'./routes'
    },
    'postcss-preset-env': {
      features: {
        customProperties: false
      }
    },  
    'postcss-each': {},
    'postcss-mixins': {},
    'postcss-math': {},
    'postcss-custom-media': {},
    'postcss-media-minmax': {}
  }
})