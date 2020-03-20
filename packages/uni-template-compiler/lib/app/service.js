const {
  ID,
  V_FOR,
  SET_DATA,
  isVar,
  getNewId,
  getForEl,
  processForKey,
  updateForEleId,
  traverseNode,
  updateScopedSlotEleId
} = require('./util')

const {
  isComponent
} = require('../util')

const {
  parseIs,
  parseIf,
  parseFor,
  parseText,
  parseDirs,
  parseAttrs,
  parseProps,
  parseBinding
} = require('./parser/base-parser')

const parseEvent = require('./parser/event-parser')
const parseBlock = require('./parser/block-parser')

const parseWxsProps = require('./parser/wxs-props-parser')
const parseWxsEvents = require('./parser/wxs-events-parser')

const preTransformNode = require('./pre-transform-node')

const optimize = require('./optimizer')

function createGenVar (id, isScopedSlot) {
  if (isScopedSlot) {
    return function genVar (name, value) {
      return `_svm.${SET_DATA}(${id},'${name}',${value})`
    }
  }
  return function genVar (name, value) {
    return `${SET_DATA}(${id},'${name}',${value})`
  }
}

function parseKey (el, isScopedSlot) {
  // add default key
  if (processForKey(el)) {
    el = el.children[0] // 当 template 下仅文本时，处理第一个动态文本
  }
  if (!el.key || el.key.indexOf(SET_DATA) === 0) {
    return
  }
  const forEl = getForEl(el)
  if (!forEl) {
    return isVar(el.key) && (el.key = createGenVar(el.attrsMap[ID], isScopedSlot)('a-key', el.key))
  }
  if (!isVar(forEl.for)) {
    return
  }
  const forId = forEl.forId
  const it = forEl.iterator2
  const genVar = createGenVar(forId, isScopedSlot)
  if (forEl === el) { // <view v-for="item in items" :key="item.id"></view>
    el.key = genVar(V_FOR, `{forIndex:${it},key:${el.key}}`)
  } else { // <template v-for="item in items"><view :key="item.id+'1'"></view><view :key="item.id+'2'"></view></template>
    const keyIndex = forEl.children.indexOf(el)
    el.key = genVar(V_FOR, `{forIndex:${it},keyIndex:${keyIndex},key:${el.key}}`)
  }
}

function parseComponentAttrs (el, genVar) {
  el.attrs && el.attrs.forEach(attr => {
    const {
      name,
      value
    } = attr
    if (name.indexOf('data-') === 0) {
      attr.value = genVar('a-' + name, value)
    }
  })
}

function checkAutoFill (el) {
  if (
    el.for &&
    (
      el.tag === 'template' ||
      el.tag === 'block'
    ) &&
    !el.children.find(child =>
      child.type === 1 &&
      child.tag !== 'template' &&
      child.tag !== 'block'
    )
  ) {
    return true
  }
  return false
}

function transformNode (el, parent, state, isScopedSlot) {
  if (el.type === 3) {
    return
  }
  parseBlock(el, parent)
  parseEvent(el)

  updateForEleId(el, state)
  updateScopedSlotEleId(el, state)

  if (el.type === 2) {
    let pid = parent.attrsMap[ID]
    if (isScopedSlot && String(pid).indexOf('_si') === -1) {
      pid = getNewId(pid, '_si')
    }
    return parseText(el, parent, {
      childIndex: state.childIndex || 0,
      index: 0,
      service: true,
      // <uni-popup>{{content}}</uni-popup>
      genVar: createGenVar(pid, isScopedSlot)
    })
  }

  const genVar = createGenVar(el.attrsMap[ID], isScopedSlot)

  parseIs(el, genVar)
  parseFor(el, createGenVar, isScopedSlot, checkAutoFill(el))
  parseKey(el, isScopedSlot)

  parseIf(el, createGenVar, isScopedSlot)
  parseBinding(el, genVar)
  parseDirs(el, genVar, ['model'])

  parseWxsProps(el, {
    isAppService: true
  })

  if (!isComponent(el.tag)) {
    parseAttrs(el, genVar)
  } else { // 目前的方案需要同步dataset
    parseComponentAttrs(el, genVar)
  }

  parseProps(el, genVar)

  parseWxsEvents(el, {
    filterModules: state.filterModules,
    isAppService: true
  })
}

function postTransformNode (el, options) {
  if (!el.parent) { // 从根节点开始递归处理
    if (options.root) { // 当根节点是由if,elseif,else组成
      parseIf(options.root, createGenVar)
    } else {
      options.root = el
    }
    traverseNode(el, false, {
      createGenVar,
      forIteratorId: 0,
      transformNode,
      filterModules: options.filterModules
    })
    optimize(el, options)
  }
}

function genVModel (el, isScopedSlot) {
  if (
    (el.tag === 'input' || el.tag === 'textarea') &&
    el.directives &&
    el.directives.find(dir => dir.name === 'model')
  ) {
    const prop = el.props.find(prop => prop.name === 'value')
    prop.value = createGenVar(el.attrsMap[ID], isScopedSlot)('v-model', prop.value)
  }
  if (el.model) {
    el.model.value = createGenVar(el.attrsMap[ID], isScopedSlot)('v-model', el.model.value)
  }
}

function genData (el) {
  delete el.$parentIterator3

  genVModel(el)

  return ''
}

module.exports = {
  preTransformNode,
  postTransformNode,
  genData
}
