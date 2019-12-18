const compiler = require('../lib')
const res = compiler.compile(
  `
<view class="custom-class">
<uni-badge/>
<uni-badge/>
<uni-tag/>
<uni-tag/>
</view>
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
    filterModules: ['swipe']
    // service: true,
    // view: true

  })
console.log(require('util').inspect(res, {
  colors: true,
  depth: null
}))
