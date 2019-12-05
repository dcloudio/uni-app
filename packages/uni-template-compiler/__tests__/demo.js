const compiler = require('../lib')
const res = compiler.compile(
  `
<view><van-grid-item v-for="(item,index) in (4)" :key="item"></van-grid-item></view>
`, {
    miniprogram: true,
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
