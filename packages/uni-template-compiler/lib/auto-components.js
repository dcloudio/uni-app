const {
  isComponent
} = require('./util')

module.exports = {
  preTransformNode (el, options) {
    if (isComponent(el.tag)) {
      // 挂在 isUnaryTag 上边,可以保证外部访问到
      (options.isUnaryTag.autoComponents || (options.isUnaryTag.autoComponents = new Set())).add(el.tag)
    }
  }
}
