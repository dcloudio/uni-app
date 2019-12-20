const {
  ID,
  hasOwn,
  addRawAttr
} = require('./util')

const dirRE = /^v-|^@|^:|^#/
/**
 * 兼容小程序Boolean属性的怪异行为(<custom loading/>为true,<custom loading=""/>为false)
 * @param {Object} el
 */
function fixBooleanAttribute (el) {
  if (!el.attrsList) {
    return
  }
  el.attrsList.forEach(attr => {
    if (attr.bool) { // <custom loading/> => <custom :loading="true"/>
      if (!dirRE.test(attr.name) && attr.name !== 'inline-template') {
        delete el.attrsMap[attr.name]
        attr.name = ':' + attr.name
        attr.value = 'true'
        el.attrsMap[attr.name] = attr.value
      }
    }
  })
}

module.exports = function preTransformNode (el, options) {
  if (!hasOwn(options, 'nid')) {
    options.nid = 0
  }
  fixBooleanAttribute(el)
  addRawAttr(el, ID, options.nid++)
  if (el.attrsMap['v-for']) {
    el.forId = el.attrsMap[ID]
  }
}
