// const migrate = require('../lib/index')

// migrate('/Users/fxy/Downloads/wa-vantui_1.1')

// migrate('/Users/fxy/Downloads/wa-vantui_1.1/pages')

const {
  parse
} = require('mustache')

function parseMustache(expr, identifier = false) {
  if (!expr) {
    return ''
  }
  const tokens = parse(expr)
  const isIdentifier = tokens.length === 1
  return tokens.map(token => {
    if (token[0] === 'text') {
      if (identifier) {
        return token[1]
      }
      return `'${token[1]}'`
    } else if (token[0] === '!') { // {{ !loading }}
      return `(!${token[1]})`
    } else if (token[0] === 'name') {
      if (isIdentifier) {
        return token[1]
      }
      return `(${token[1]})`
    }
  }).join('+')
}
console.log(parseMustache("click ",true)==='click ')

// const {
//   transformTemplate
// } = require('../lib/mp-weixin/transform/template-transformer')
// console.log(transformTemplate(
//   `<view wx:for="{{ columns }}" wx:for-item="item" wx:key="{{item.value}}"/>`, {
//     filename: 'index'
//   }
// ))
