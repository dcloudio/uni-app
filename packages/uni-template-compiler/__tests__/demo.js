const compiler = require('../lib')

const res = compiler.compile(
  `
<view v-for="item in dataList" :key="item.id" @click="click1(item, 1);click2(item, 2);"/>
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
