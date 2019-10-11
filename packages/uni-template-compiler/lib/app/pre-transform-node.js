const {
  tags,
  hasOwn
} = require('@dcloudio/uni-cli-shared')

const {
  ID,
  addAttr
} = require('./util')

module.exports = function preTransformNode (el, options) {
  if (el.tag.indexOf('v-uni-') !== 0 && hasOwn(tags, el.tag)) {
    el.tag = 'v-uni-' + el.tag
  }

  if (!hasOwn(options, 'nid')) {
    options.nid = 0
  }
  addAttr(el, ID, options.nid++)
  if (el.attrsMap['v-for']) {
    el.forId = el.attrsMap[ID]
  }
}
