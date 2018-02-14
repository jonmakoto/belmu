'use strict';
module.exports = (ctx) => ({
  parser: ctx.file.extname === '.sss' ? 'sugarss' : false,
  plugins: {
    'postcss-partial-import': {},
    'postcss-cssnext': {
      features: {
        customProperties: false
      }
    },
    'postcss-each': {},
    'postcss-mixins': {},
    'postcss-math': {},
    'postcss-custom-media': {},
    'postcss-media-minmax': {},
    "postcss-style-guide": {
      "project": "BELMU",
      "dest": "index.html",
      "showCode": true,
      "themePath": "css/belmu/_engine/_defaults/engine.styleguide.theme/"
    },
    'cssnano': ctx.env === 'production' ? {
      discardComments: {
        removeAll: true
      },
      filterPlugins: false,
      discardDuplicates: true,
      discardOverridden: true,
      minifySelectors: true,
      mergeRules: true,
      core: true
    } : false
  }
})