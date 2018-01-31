module.exports = (ctx) => ({
  parser: ctx.file.extname === '.sss' ? 'sugarss' : false,
  plugins: {
    'postcss-partial-import': {}
  }
})