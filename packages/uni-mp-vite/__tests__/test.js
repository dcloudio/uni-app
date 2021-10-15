const { parse, compile } = require('@vue/compiler-dom')
const { inspect } = require('util')
const template = `<button v-for="item in 5" type="button" @click="item?increament:a">{{item}} count is: {{ count }}</button>`
// console.log(
//   inspect(parse(template), {
//     colors: true,
//     depth: null,
//   })
// )
// _cache[0] || (_cache[0] = (...args) => ($options.increament && $options.increament(...args)))
console.log(
  inspect(compile(template, { prefixIdentifiers: true, cacheHandlers: true }), {
    colors: true,
    depth: null,
  })
)

// import a from 'a.vue'
