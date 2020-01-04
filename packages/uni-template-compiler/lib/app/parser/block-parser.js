const {
  ID,
  hasOwn,
  addRawAttr
} = require('../util')

module.exports = function parseBlock (el, parent) {
  if (el.tag === 'template' && !hasOwn(el.attrsMap, ID)) {
    /**
     * <current-user v-slot="{ user }">
     *  {{ user.firstName }}
     * </current-user>
     */
    addRawAttr(el, ID, parent.attrsMap[ID])
  } else if (el.tag === 'block') {
    el.tag = 'template'
    const vForKey = el.key
    if (vForKey) {
      delete el.key
      el.children.forEach((childEl, index) => {
        const childVForKey = childEl.key
        if (childVForKey) {
          childEl.key = `${childVForKey}+'_'+${vForKey}+'_${index}'`
        } else {
          childEl.key = `${vForKey}+'_${index}'`
        }
      })
    }
  }
}
