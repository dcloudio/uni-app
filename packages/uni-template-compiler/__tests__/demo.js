const compiler = require('../lib')
const res = compiler.compile(
  `
<view>
    <view v-for="item in list[idx]" :key="item.id" class="mid-item-title" @click="mabc1(item)">
      <view class="mid-item-icon" @click.stop="mabc2(item)"></view>
    </view>
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
