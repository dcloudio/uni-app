module.exports = {
  preTransformNode(el) {
    if (el.tag === 'view') { // view 是最常用组件，直接映射为div标签，保证性能
      el.tag = 'div'
    }
  }
}
