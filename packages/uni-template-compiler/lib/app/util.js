const {
  parseExpression
} = require('@babel/parser')
const t = require('@babel/types')

const ID = '_i'
const ITERATOR1 = '$1'
const ITERATOR2 = '$2'
const ITERATOR3 = '$3'
const SET_DATA = '_$s'
const GET_DATA = '_$g'
const SET_MP_CLASS = '_$smc'
const GET_CHANGE_DATA = '_$gc' // wxs

const C_IS = 'is'

const V_FOR = 'f'
const V_IF = 'i'
const V_ELSE_IF = 'e'

function isVar (str) {
  if (!str) {
    return false
  }
  const expr = parseExpression(str)
  if (
    t.isStringLiteral(expr) ||
    t.isNumericLiteral(expr) ||
    t.isBooleanLiteral(expr) ||
    t.isNullLiteral(expr)
  ) {
    return false
  }
  return true
}

function addRawAttr (el, name, value) {
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
  const newId = getNewId(el.attrsMap[ID], it)
  addRawAttr(el, ID, newId)
  if (el.attrs) {
    const attr = el.attrs.find(attr => attr.name === ID)
    attr.value = newId
  }
  el.children.forEach(child => {
    if (!child.for) { // 忽略嵌套 for
      updateEleId(child, it)
    } else {
      child.$parentIterator3 = (child.$parentIterator3 ? (child.$parentIterator3 + '+') : '') + it
      child.forId = `${child.forId}+'-'+${it}`
    }
  })
  el.ifConditions && el.ifConditions.forEach((con, index) => {
    index !== 0 && updateEleId(con.block, it, state)
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
    const it = el.$parentIterator3 ? (el.$parentIterator3 + '+' + "'-'" + '+' + el.iterator3) : el.iterator3
    updateEleId(el, it, state)
  }
}

function getNewId (id, it) {
  return Number.isInteger(id) ? `("${id}-"+${it})` : `(${id}+${it})`
}

function updateScopedSlotEleId (el, state) {
  // TODO 暂不考虑 scopedSlot 嵌套情况
  if (el.slotScope) {
    const updateEleId = function (el) {
      if (el.type !== 1) {
        return
      }
      const it = '_si'
      const newId = getNewId(el.attrsMap[ID], it)
      if (el.forId) {
        el.forId = getNewId(el.forId, it)
      }
      addRawAttr(el, ID, newId)
      if (el.attrs) {
        const attr = el.attrs.find(attr => attr.name === ID)
        attr.value = newId
      }
      el.children.forEach(child => {
        if (!child.slotScope) { // 忽略嵌套 scopedSlot
          updateEleId(child, state)
        }
      })
    }
    if (el.tag === 'template' && el.slotTarget) { // new v-slot
      el.children.forEach(child => {
        if (!child.slotScope) { // 忽略嵌套 scopedSlot
          updateEleId(child, state)
        }
      })
    } else { // old slot-scope
      updateEleId(el)
    }
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
  if (forEl && !el.key) { // 占位的 text 标签也无需添加 key
    if (!isVar(forEl.for)) { // <view v-for="10"></view>
      return
    }
    const it = forEl.iterator3
    if (forEl.tag === 'template' || forEl.tag === 'block') {
      if (forEl !== el) {
        const keyIndex = forEl.children.indexOf(el)
        el.key = `${forEl.forId}+'-${keyIndex}'+${it}`
      } else { // 当 template 下只有文本节点
        if (
          el.children &&
          el.children.length &&
          !el.children.find(child => child.type === 1)
        ) {
          el.children[0].parent = el
          if (!el.children.find(child => child.key)) {
            el.children[0].key = `${forEl.forId}+'-0'+${it}`
          }
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

function traverseNode (el, parent, state, isScopedSlot) {
  state.transformNode(el, parent, state, isScopedSlot)
  el.children && el.children.forEach((child, index) => {
    state.childIndex = index
    traverseNode(child, el, state, isScopedSlot)
  })
  el.ifConditions && el.ifConditions.forEach((con, index) => {
    if (index !== 0) {
      state.childIndex = index
      traverseNode(con.block, el, state, isScopedSlot)
    }
  })
  el.scopedSlots && Object.values(el.scopedSlots).forEach((slot, index) => {
    state.childIndex = index
    slot.slotScope = `${slot.slotScope}, _svm, _si`
    if (slot.slotTargetDynamic && slot.slotTarget) {
      slot.slotTarget = state.createGenVar(slot.attrsMap[ID])('st', slot.slotTarget)
    }
    traverseNode(slot, el, state, true)
  })
}

function addAttr (el, name, value, dynamic) {
  const attrs = dynamic
    ? (el.dynamicAttrs || (el.dynamicAttrs = []))
    : (el.attrs || (el.attrs = []))
  attrs.push({
    name,
    value,
    dynamic
  })
  el.plain = false
}

function removeRawAttr (el, name) {
  delete el.attrsMap[name]
  const index = el.attrsList.findIndex(attr => attr.name === name)
  index !== -1 && el.attrsList.splice(index, 1)
}

function removeRawBindingAttr (el, name) {
  removeRawAttr(el, ':' + name)
  removeRawAttr(el, 'v-bind:' + name)
}

function addHandler (el, name, value, important) {
  const events = el.events || (el.events = {})
  const handlers = events[name]
  const newHandler = {
    value: value.trim(),
    dynamic: undefined
  }
  if (Array.isArray(handlers)) {
    important ? handlers.unshift(newHandler) : handlers.push(newHandler)
  } else if (handlers) {
    events[name] = important ? [newHandler, handlers] : [handlers, newHandler]
  } else {
    events[name] = newHandler
  }
  el.plain = false
}

module.exports = {
  C_IS,
  V_FOR,
  V_IF,
  V_ELSE_IF,
  ID,
  SET_DATA,
  GET_DATA,
  SET_MP_CLASS,
  GET_CHANGE_DATA,
  isVar,
  hasOwn,
  addAttr,
  addRawAttr,
  removeRawAttr,
  removeRawBindingAttr,
  getNewId,
  getForEl,
  addHandler,
  processForKey,
  updateForEleId,
  updateScopedSlotEleId,
  getBindingAttr,
  getAndRemoveAttr,
  traverseNode
}
