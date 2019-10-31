const compiler = require('../lib')
const res = compiler.compile(
  `
<p v-text="test"></p>
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
    // service: true,
    view: true
  })
console.log(require('util').inspect(res, {
  colors: true,
  depth: null
}))
