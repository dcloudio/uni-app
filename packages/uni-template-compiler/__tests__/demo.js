const compiler = require('../lib')
const res = compiler.compile(
  `
<div>
<view v-for="(item, index) in list" :key="index">
<view ref="add" class="warp" @change="change">
<view v-for="(sub, key) in item.data">
</view>
</view>
</view>
</div>
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
