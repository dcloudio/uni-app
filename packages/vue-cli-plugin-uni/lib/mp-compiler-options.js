const {
  camelize,
  convertStaticStyle
} = require('@dcloudio/uni-cli-shared')

module.exports = {
  modules: [require('./format-text'), {
    preTransformNode (el, {
      warn
    }) {
      if (el.attrsMap) {
        if (el.attrsMap.style) {
          el.attrsMap.style = convertStaticStyle(el.attrsMap.style)
        }
        if (process.env.UNI_PLATFORM === 'mp-baidu') { // fixed data-index => dataIndex
          Object.keys(el.attrsMap).forEach(attr => {
            if (attr.indexOf(':data-') === 0) {
              el.attrsMap[camelize(attr)] = el.attrsMap[attr]
              delete el.attrsMap[attr]
            }
          })
        }
      }
      if (el.attrsList && el.attrsList.length) {
        el.attrsList.forEach(attr => {
          if (attr.name === 'style' && attr.value) {
            attr.value = convertStaticStyle(attr.value)
          }
          if (process.env.UNI_PLATFORM === 'mp-baidu') { // fixed data-index => dataIndex
            if (attr.name.indexOf(':data-') === 0) {
              attr.name = camelize(attr.name)
            }
          }
        })
      }
    },
    postTransformNode (el) {
      if (process.env.UNI_PLATFORM === 'mp-alipay') {
        if (el.tag === 'slot') {
          if (!el.children.length) {
            el.children.push({
              type: 1,
              tag: 'view',
              attrsList: [],
              attrsMap: {},
              parent: el,
              children: [],
              plain: true
            })
          }
        }
      }
    }
  }]
}
