const compiler = require('../lib')
const res = compiler.compile(
  `
<div><block v-for="item in items"><div></div><div></div></block></div>
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
    service: true,
    view: true
  })
console.log(require('util').inspect(res, {
  colors: true,
  depth: null
}))
