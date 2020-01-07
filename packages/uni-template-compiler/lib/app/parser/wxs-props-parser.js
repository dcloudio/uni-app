const {
  ID,
  SET_DATA,
  GET_CHANGE_DATA
} = require('../util')

function isWxsChangeProp (attr) {
  return attr.name.indexOf('change:') === 0
}

function createSetDataGenVar (id) {
  return function genVar (name, value) {
    return `${SET_DATA}(${id},'${name}',${value})`
  }
}

function createGetChangeDataGenVar (id) {
  return function genVar (name) {
    return `${GET_CHANGE_DATA}(${id},'${name}')`
  }
}

module.exports = function parseWxsProps (el, {
  isAppService,
  isAppView
}) {
  if (!el.attrs) {
    return
  }
  const wxsChangeProps = []
  el.attrs = el.attrs.filter(attr => {
    if (isWxsChangeProp(attr)) {
      wxsChangeProps.push(attr.name.replace('change:', ''))
      if (isAppService) { // service 层移除 change:prop
        return false
      }
    }
    return true
  })
  if (!wxsChangeProps.length) {
    return
  }

  const genSetVar = createSetDataGenVar(el.attrsMap[ID])
  const genGetVar = createGetChangeDataGenVar(el.attrsMap[ID])

  el.attrs.forEach(attr => {
    if (wxsChangeProps.includes(attr.name)) {
      if (isAppService) {
        attr.value = genSetVar('change:' + attr.value, attr.value)
      } else if (isAppView) {
        attr.value = genGetVar('change:' + attr.value)
      }
    }
  })
}
