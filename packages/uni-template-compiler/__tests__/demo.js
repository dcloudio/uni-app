const compiler = require('../lib')
const res = compiler.compile(
  `
<current-user>
  <template v-slot:default="{result}">
    <view v-for="(item,index) in result.list">{{item.name}}</view>
  </template>
</current-user>
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
