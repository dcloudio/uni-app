const {
  ID,
  V_FOR,
  SET_DATA,
  isVar,
  getForEl,
  processForKey,
  updateForEleId,
  traverseNode
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

function createGenVar (id) {
  return function genVar (name, value) {
    return `${SET_DATA}(${id},'${name}',${value})`
  }
}

function parseKey (el) {
  // add default key
  if (processForKey(el)) {
    el = el.children[0] // 当 template 下仅文本时，处理第一个动态文本
  }
  if (!el.key || el.key.indexOf(SET_DATA) === 0) {
    return
  }
  const forEl = getForEl(el)
  if (!forEl) {
    return isVar(el.key) && (el.key = createGenVar(el.attrsMap[ID])('a-key', el.key))
  }
  if (!isVar(forEl.for)) {
    return
  }
  const forId = forEl.forId
  const it = forEl.iterator2
  const genVar = createGenVar(forId)
  if (forEl === el) { // <view v-for="item in items" :key="item.id"></view>
    el.key = genVar(V_FOR, `{forIndex:${it},key:${el.key}}`)
  } else { // <template v-for="item in items"><view :key="item.id+'1'"></view><view :key="item.id+'2'"></view></template>
    const keyIndex = forEl.children.indexOf(el)
    el.key = genVar(V_FOR, `{forIndex:${it},keyIndex:${keyIndex},key:${el.key}}`)
  }
}

function transformNode (el, parent, state) {
  if (el.type === 3) {
    return
  }
  parseBlock(el, parent)
  parseEvent(el)

  updateForEleId(el, state)

  if (el.type === 2) {
    return parseText(el, parent, {
      index: 0,
      service: true,
      // <uni-popup>{{content}}</uni-popup>
      genVar: createGenVar(parent.attrsMap[ID])
    })
  }

  const genVar = createGenVar(el.attrsMap[ID])

  parseIs(el, genVar)
  parseFor(el, createGenVar)
  parseKey(el)

  parseIf(el, createGenVar)
  parseBinding(el, genVar)
  parseDirs(el, genVar, ['model'])

  parseWxsProps(el, {
    isAppService: true
  })

  if (!isComponent(el.tag)) {
    parseAttrs(el, genVar)
  }

  parseProps(el, genVar)

  parseWxsEvents(el, {
    filterModules: state.filterModules,
    isAppService: true
  })
}

function postTransformNode (el, options) {
  if (!el.parent) { // 从根节点开始递归处理
    traverseNode(el, false, {
      forIteratorId: 0,
      transformNode,
      filterModules: options.filterModules
    })
    optimize(el, options)
  }
}

function genVModel (el) {
  if (
    (el.tag === 'input' || el.tag === 'textarea') &&
    el.directives &&
    el.directives.find(dir => dir.name === 'model')
  ) {
    const prop = el.props.find(prop => prop.name === 'value')
    prop.value = createGenVar(el.attrsMap[ID])('v-model', prop.value)
  }
  if (el.model) {
    el.model.value = createGenVar(el.attrsMap[ID])('v-model', el.model.value)
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
