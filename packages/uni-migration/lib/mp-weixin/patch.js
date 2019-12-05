const fs = require('fs-extra')

const {
  normalizePath
} = require('./util')

const VANTS = [{ // wxs array.constructor
  test(src) {
    return src.indexOf('array.wxs') !== -1
  },
  source(code) {
    return code.replace(`array.constructor === 'Array'`, 'Array.isArray(array)')
  }
}, { // vue $options conflicts
  test(src) {
    return normalizePath(src).indexOf('mixins/observer/index.js') !== -1
  },
  source(code) {
    return code.replace(`options.methods.$options`, `options.methods.$getVantOptions`)
  }
}, { // vue $options conflicts
  test(src) {
    return normalizePath(src).indexOf('mixins/observer/behavior.js') !== -1
  },
  source(code) {
    return code.replace(`!this.$options`, `!this.$getVantOptions`)
      .replace(`this.$options()`, `this.$getVantOptions()`)
  }
}]

const PATCHS = [
  ...VANTS
]

module.exports = function patch(src, dest) {
  const options = PATCHS.find(patch => patch.test(src))
  if (options) {
    console.log(`write: ${dest}`)
    fs.outputFileSync(dest, options.source(fs.readFileSync(src).toString()))
    return true
  }
  return false
}
