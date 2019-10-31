const compiler = require('../lib')
const res = compiler.compile(
  `
<keep-alive exclude="componentWithStatus1"><component is="componentWithStatus"/></keep-alive>
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
