const compiler = require('../lib')
const res = compiler.compile(
  `
<p :change:prop="swipe.sizeReady" :prop="pos" @touchstart="swipe.touchstart" @touchmove="swipe.touchmove" @touchend="swipe.touchend" @change="change"></p>
`, {
    resourcePath: '/User/fxy/Documents/test.wxml',
    isReservedTag: function (tag) {
      return true
    },
    getTagNamespace () {
      return false
    },
    mp: {
      platform: 'app-plus'
    },
    filterModules: ['swipe'],
    // service: true,
    view: true

  })
console.log(require('util').inspect(res, {
  colors: true,
  depth: null
}))
