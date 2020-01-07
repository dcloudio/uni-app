const compiler = require('../lib')
const res = compiler.compile(
  `
<div><template v-for="item in items">text</template></div>
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
      platform: 'mp-weixin'
    },
    filterModules: ['swipe'],
    service: true,
    view: true

  })
console.log(require('util').inspect(res, {
  colors: true,
  depth: null
}))
