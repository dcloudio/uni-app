const compiler = require('../lib')

const res = compiler.compile(
  `
<view @/>
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
