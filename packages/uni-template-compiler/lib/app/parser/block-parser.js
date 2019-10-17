module.exports = function parseBlock (el) {
  if (el.tag === 'block') {
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
