const {
  ID,
  hasOwn,
  addAttr
} = require('./util')

module.exports = function preTransformNode (el, options) {
  if (!hasOwn(options, 'nid')) {
    options.nid = 0
  }
  addAttr(el, ID, options.nid++)
  if (el.attrsMap['v-for']) {
    el.forId = el.attrsMap[ID]
  }
}
