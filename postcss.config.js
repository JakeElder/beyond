module.exports = (ctx) => ({
  plugins: [
    require('postcss-modules')({
      generateScopedName: '[name]-[local]',
      getJSON: ctx.extractModules || (() => {})
    })
  ]
})
