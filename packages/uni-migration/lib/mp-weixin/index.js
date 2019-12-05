module.exports = {
  options: {
    extname: {
      template: '.wxml',
      style: '.wxss'
    }
  },
  transform: require('./transform'),
  patch: require('./patch')
}
