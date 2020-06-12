const traverse = require('./traverse')
const generate = require('./generate')

module.exports = function transform(ast, options) {
  options.wxs = []
  // wxml 中使用 import 导入的组件
  options.components = []
  // wxml 中使用 <template name> 声明的模板
  options.templates = []
  // wxml 中 <template is> 分析得到的 props
  options.props = {}
  options.shouldWrapper = options.shouldWrapper || function noop () { }
  return generate(traverse(ast, options), options)
}
