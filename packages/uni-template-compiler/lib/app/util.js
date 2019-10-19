const VARS = ['true', 'false', 'null']
const NUMBER_RE = /^-?\d*(\.\d+)?$/

const ID = '_i'
const ITERATOR1 = '$1'
const ITERATOR2 = '$2'
const ITERATOR3 = '$3'
const DATA_ROOT = '_$g'

const V_FOR = 'f'
const V_IF = 'i'
const V_ELSE_IF = 'e'

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

function updateEleId (el, it, state) {
  if (el.type !== 1) {
    return
  }
  const id = el.attrsMap[ID]
  const newId = Number.isInteger(id) ? `("${id}-"+${it})` : `(${id}+${it})`
  addAttr(el, ID, newId)
  const attr = el.attrs.find(attr => attr.name === ID)
  attr.value = newId
  el.children.forEach(child => {
    if (!child.for) { // 忽略嵌套 for
      updateEleId(child, it)
    } else {
      child.$parentIterator3 = (child.$parentIterator3 ? (child.$parentIterator3 + '+') : '') + it
      child.forId = `${child.forId}+'-'+${it}`
    }
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

function updateForIterator (el, state) {
  if (!el.for) {
    return
  }
  // 简单处理，确保所有 for 循环，均包含 1，2，3
  const forIteratorId = state.forIteratorId++
  if (!el.iterator1) {
    el.iterator1 = ITERATOR1 + forIteratorId
  }
  if (!el.iterator2) {
    el.iterator2 = ITERATOR2 + forIteratorId
  }
  if (!el.iterator3) {
    el.iterator3 = ITERATOR3 + forIteratorId
  }
}

function updateForEleId (el, state) {
  updateForIterator(el, state)
  if (el.for) {
    const it = el.$parentIterator3 ? (el.$parentIterator3 + '+' + el.iterator3) : el.iterator3
    updateEleId(el, it, state)
  }
}

function getForEl (el) {
  if (el.for) {
    return el
  }
  if (el.parent && el.parent.for && (el.parent.tag === 'template' || el.parent.tag === 'block')) {
    return el.parent
  }
}

function processForKey (el) {
  const forEl = getForEl(el)
  if (forEl && !el.key && !el.dynamicTexts) { // 占位的 text 标签也无需添加 key
    if (!isVar(forEl.for)) { // <view v-for="10"></view>
      return
    }
    const it = forEl.iterator3
    if (forEl.tag === 'template' || forEl.tag === 'block') {
      if (forEl !== el) {
        const keyIndex = forEl.children.indexOf(el)
        el.key = `${forEl.forId}+'-${keyIndex}'+${it}`
      } else { // 当 template 下只有文本节点
        if (el.children && el.children.length && !el.children.find(child => child.key)) {
          el.children[0].key = `${forEl.forId}+'-0'+${it}`
          return true
        }
      }
    } else {
      el.key = `${forEl.forId}+'-'+${it}`
    }
  }
}

function hasOwn (obj, key) {
  return hasOwnProperty.call(obj, key)
}

function traverseNode (el, parent, state) {
  state.transformNode(el, parent, state)
  el.children && el.children.forEach(child => traverseNode(child, el, state))
  el.ifConditions && el.ifConditions.forEach((con, index) => {
    index !== 0 && traverseNode(con.block, el, state)
  })
  el.scopedSlots && Object.values(el.scopedSlots).forEach(slot => traverseNode(slot, el, state))
}

module.exports = {
  V_FOR,
  V_IF,
  V_ELSE_IF,
  ID,
  DATA_ROOT,
  isVar,
  hasOwn,
  addAttr,
  getForEl,
  processForKey,
  updateForEleId,
  getBindingAttr,
  getAndRemoveAttr,
  traverseNode
}
