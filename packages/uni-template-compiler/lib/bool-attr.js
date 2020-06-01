const dirRE = /^v-|^@|^:|^#/

const PROPS = ['id', 'class', 'style', 'inline-template']

module.exports = {
  preTransformNode (el) {
    if (!el.attrsList) {
      return
    }
    el.attrsList.forEach(attr => {
      if (attr.bool) {
        if (!dirRE.test(attr.name) && !PROPS.includes(attr.name)) {
          delete el.attrsMap[attr.name]
          attr.name = ':' + attr.name
          attr.value = 'true'
          el.attrsMap[attr.name] = attr.value
        }
      }
    })
  }
}
