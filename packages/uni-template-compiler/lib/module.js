const onRE = /^@|^v-on:/

function removeAttr (el, name) {
  if (el.attrsMap.hasOwnProperty(name)) {
    delete el.attrsMap[name]
    el.attrsList.splice(el.attrsList.findIndex(attr => attr.name === name), 1)
    return true
  }
}
module.exports = {
  preTransformNode (el, {
    warn
  }) {
    if (el.tag === 'slot' && !el.attrsMap['name']) {
      el.attrsList.push({
        name: 'SLOT_DEFAULT',
        value: true
      })
      el.attrsMap['SLOT_DEFAULT'] = true
    }
    // 处理 attr
    el.attrsList.forEach(attr => {
      if (
        attr.name.indexOf('v-model') === 0 &&
                attr.name.indexOf('.lazy') !== -1
      ) {
        const origName = attr.name
        const newName = origName.replace('.lazy', '')
        attr.name = newName
        el.attrsMap[newName] = attr.value
        delete el.attrsMap[origName]
      } else if (onRE.test(attr.name) && !attr.value.trim()) { // 事件为空
        attr.value = '__HOLDER__'
        el.attrsMap[attr.name] = attr.value
      }
    })
    // 暂不支持的指令
    const dirs = ['v-once', 'v-pre', 'v-cloak']
    dirs.forEach(dir => {
      if (removeAttr(el, dir)) {
        warn(`unsupported directive ${dir}`, false, true)
      }
    })

    //
  }
}
