const migrate = require('../lib/index')

migrate('/Users/fxy/Downloads/wa-vantui_1.1')

// migrate('/Users/fxy/Downloads/wa-vantui_1.1/pages')

// const {
//   parse
// } = require('mustache')
// console.log(parse("van-notice-bar__content {{ !scrollable && !wrapable ? 'van-ellipsis' : '' }}"))

// const {
//   transformTemplate
// } = require('../lib/mp-weixin/transform/template-transformer')
// console.log(transformTemplate(
//   `<uni-transition bind:click="click" bindtouchstart="startDrag" catchtouchmove="{{ catchMove ? 'noop' : '' }}"/>`, {
//     filename: 'index'
//   }
// ))
