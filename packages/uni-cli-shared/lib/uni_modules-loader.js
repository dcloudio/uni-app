const {
  genUniModulesExports
} = require('./uni_modules/uni_modules')

module.exports = function () {
  this.cacheable && this.cacheable()
  return genUniModulesExports()
}
