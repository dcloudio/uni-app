const {
  isComponent
} = require('./util')

module.exports = {
  preTransformNode (el, options) {
    if (isComponent(el.tag)) {
      // 挂在 isReservedTag 上边,可以保证外部访问到
      (options.isReservedTag.autoComponents || (options.isReservedTag.autoComponents = new Set())).add(el.tag)
    }
  }
}
