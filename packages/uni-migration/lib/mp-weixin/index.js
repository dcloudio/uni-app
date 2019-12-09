const patch = require('./patch')
module.exports = {
  options: {
    extname: {
      template: '.wxml',
      style: '.wxss'
    },
    shouldWrapper(filepath) {
      return patch.wrapper(filepath)
    }
  },
  transform: require('./transform'),
  patch
}
