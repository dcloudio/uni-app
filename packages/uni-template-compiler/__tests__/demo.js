const compiler = require('../lib')
const res = compiler.compile(
  `
<view>
<page-head v-if="a" v-for="item in items" :title="title"></page-head>
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
