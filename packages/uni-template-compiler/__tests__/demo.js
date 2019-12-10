const compiler = require('../lib')
const res = compiler.compile(
  `
<view>
<view v-for="(item, index) in dataList" :key="item.id">
    <view v-if="dataType === 2">
    </view>
    <view v-else>
            {{ item.text }}
    </view>
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
    filterModules: ['swipe'],
    service: true,
    view: true

  })
console.log(require('util').inspect(res, {
  colors: true,
  depth: null
}))
