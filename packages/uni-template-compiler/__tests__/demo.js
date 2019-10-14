const compiler = require('../lib')
const res = compiler.compile(
  `
<view>
<image src="aaaa" :a="b"/>
</view>
    `, {
    resourcePath: '/User/fxy/Documents/test.wxml',
    mp: {
      platform: 'app-plus'
    },
    service: true
    // view: true
  })
console.log(require('util').inspect(res, {
  colors: true,
  depth: null
}))
