const compiler = require('../lib')
const res = compiler.compile(
  `
<button open-type="getPhoneNumber" @getphonenumber="getPhoneNumber">获取手机号</button>
    `, {
    resourcePath: '/User/fxy/Documents/test.wxml',
    mp: {
      minified: true,
      isTest: true,
      platform: 'mp-weixin'
    },
    filterModules: {
      t: {},
      a: {}
    }
  })
// ---BEGIN:JSON---{"n":"v"}---END:JSON---
console.log(res)
