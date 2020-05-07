const dirRE = /^v-|^@|^:|^#/

module.exports = {
  preTransformNode (el) {
    if (!el.attrsList) {
      return
    }
    el.attrsList.forEach(attr => {
      if (attr.bool) {
        if (!dirRE.test(attr.name) && attr.name !== 'inline-template') {
          delete el.attrsMap[attr.name]
          attr.name = ':' + attr.name
          attr.value = 'true'
          el.attrsMap[attr.name] = attr.value
        }
      }
    })
  }
}
