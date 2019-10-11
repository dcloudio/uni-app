const compiler = require('../lib')
const res = compiler.compile(
  `
<view>
<component v-for="component in components" :item="component.item" :is="component.mode"/>
</view>
    `, {
    resourcePath: '/User/fxy/Documents/test.wxml',
    mp: {
      platform: 'app-plus'
    },
    // service: true
    view: true
  })
console.log(require('util').inspect(res, {
  colors: true,
  depth: null
}))
