const VARS = ['true', 'false', 'null']
const NUMBER_RE = /^-?\d*(\.\d+)?$/

const ID = '_i'
const ITERATOR = '$i'
const DATA_ROOT = '$r'

function isVar (str) {
  if (!str) {
    return false
  }
  const firstLetter = str[0]
  if (
    firstLetter === '"' || // string
    firstLetter === '\'' || // string
    VARS.includes(str) || // boolean | null
    NUMBER_RE.test(str) // number
  ) {
    return false
  }
  return true
}

function addAttr (el, name, value) {
  el.attrsMap[name] = value
  el.attrsList.push({
    name,
    value
  })
}

function updateEleId (el, it) {
  if (el.type !== 1) {
    return
  }
  const id = el.attrsMap[ID]
  const newId = Number.isInteger(id) ? `("${id}-"+${it})` : `(${id}+${it})`
  addAttr(el, ID, newId)
  const attr = el.attrs.find(attr => attr.name === ID)
  attr.value = newId
  el.children.forEach(child => {
    updateEleId(child, it)
  })
}

function getBindingAttr (el, name) {
  return getAndRemoveAttr(el, ':' + name) ||
    getAndRemoveAttr(el, 'v-bind:' + name)
}

function getAndRemoveAttr (el, name) {
  let val
  if ((val = el.attrsMap[name]) != null) {
    const list = el.attrsList
    for (let i = 0, l = list.length; i < l; i++) {
      if (list[i].name === name) {
        list.splice(i, 1)
        break
      }
    }
  }
  delete el.attrsMap[name]
  return val
}

function updateForEleId (el) {
  if (el.for) {
    if (!el.iterator1) {
      el.iterator1 = ITERATOR
    }
    updateEleId(el, el.iterator2 || el.iterator1)
  }
}

function getForEl (el) {
  if (el.for) {
    return el
  }
  if (el.parent && el.parent.for && el.parent.tag === 'template') {
    return el.parent
  }
}

function processForKey (el) {
  const forEl = getForEl(el)
  if (forEl && !el.key) {
    if (!isVar(forEl.for)) { // <view v-for="10"></view>
      return
    }
    const it = forEl.iterator2 || forEl.iterator1 || ITERATOR
    if (forEl.tag === 'template') {
      if (forEl !== el) {
        const keyIndex = forEl.children.indexOf(el)
        el.key = `'${forEl.forId}-${keyIndex}-'+${it}`
      } else { // 当 template 下只有文本节点
        if (el.children && el.children.length && !el.children.find(child => child.key)) {
          el.children[0].key = `'${forEl.forId}-0-'+${it}`
          return true
        }
      }
    } else {
      el.key = `'${forEl.forId}-'+${it}`
    }
  }
}

function hasOwn (obj, key) {
  return hasOwnProperty.call(obj, key)
}

module.exports = {
  ID,
  DATA_ROOT,
  ITERATOR,
  isVar,
  hasOwn,
  addAttr,
  getForEl,
  processForKey,
  updateForEleId,
  getBindingAttr,
  getAndRemoveAttr
}
