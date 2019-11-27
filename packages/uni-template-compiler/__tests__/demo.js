const compiler = require('../lib')
const res = compiler.compile(
  `
<div><block v-for="(item,index) in list" :key="index"><block><text>{{item}}</text></block></block></div>
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
    service: true,
    view: true

  })
console.log(require('util').inspect(res, {
  colors: true,
  depth: null
}))
