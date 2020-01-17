const {
  ID,
  GET_DATA,
  isVar,
  getNewId,
  getForEl,
  updateForEleId,
  updateScopedSlotEleId,
  processForKey,
  traverseNode
} = require('./util')

const {
  parseIs,
  parseIf,
  parseFor,
  parseText,
  parseAttrs,
  parseProps,
  parseBinding
} = require('./parser/base-parser')

const parseTag = require('./parser/tag-parser')
const parseEvent = require('./parser/event-parser')
const parseBlock = require('./parser/block-parser')
const parseComponent = require('./parser/component-parser')

const parseWxsProps = require('./parser/wxs-props-parser')
const parseWxsEvents = require('./parser/wxs-events-parser')

const basePreTransformNode = require('./pre-transform-node')

function createGenVar (id, isScopedSlot) {
  if (isScopedSlot) {
    return function genVar (name, value) {
      return `_svm.${GET_DATA}(${id},'${name}')`
    }
  }
  return function genVar (name) {
    return `${GET_DATA}(${id},'${name}')`
  }
}

function parseKey (el, isScopedSlot) {
  // add default key
  processForKey(el)

  if (el.key) { // renderList key
    const forEl = getForEl(el)
    if (forEl) {
      if (!isVar(forEl.for)) {
        return
      }
      if (forEl === el) { // <view v-for="item in items" :key="item.id"></view>
        el.key = forEl.alias
      } else { // <template v-for="item in items"><view :key="item.id+'1'"></view><view :key="item.id+'2'"></view></template>
        const keyIndex = forEl.children.indexOf(el)
        el.key = `${forEl.alias}['k${keyIndex}']`
      }
    } else {
      isVar(el.key) && (el.key = createGenVar(el.attrsMap[ID], isScopedSlot)('a-key'))
    }
  }
}

function parseDirs (el, genVar, ignoreDirs, includeDirs = []) {
  if (!el.directives) {
    return
  }
  el.directives = el.directives.filter(dir => {
    if (includeDirs.indexOf(dir.name) !== -1) {
      if (ignoreDirs.indexOf(dir.name) === -1) {
        dir.value && (dir.value = genVar('v-' + dir.name, dir.value))
        dir.isDynamicArg && (dir.arg = genVar('v-' + dir.name + '-arg', dir.arg))
      }
      return true
    }
  })
}

const includeDirs = [
  'text',
  'html',
  'bind',
  'model',
  'show',
  'if',
  'else',
  'else-if',
  'for',
  'on',
  'bind',
  'slot',
  'pre',
  'cloak',
  'once'
]

const ignoreDirs = ['model']

function transformNode (el, parent, state, isScopedSlot) {
  if (el.type === 3) {
    return
  }
  parseBlock(el, parent)
  parseComponent(el)
  parseEvent(el)
  // 更新 id
  updateForEleId(el, state)
  updateScopedSlotEleId(el, state)

  if (el.type === 2) {
    let pid = parent.attrsMap[ID]
    if (isScopedSlot && String(pid).indexOf('_si') === -1) {
      pid = getNewId(pid, '_si')
    }
    return parseText(el, parent, {
      index: 0,
      view: true,
      // <uni-popup>{{content}}</uni-popup>
      genVar: createGenVar(pid, isScopedSlot)
    })
  }

  const genVar = createGenVar(el.attrsMap[ID], isScopedSlot)

  parseIs(el, genVar)

  if (parseFor(el, createGenVar, isScopedSlot)) {
    if (el.alias[0] === '{') { // <div><li v-for=" { a, b }  in items"></li></div>
      el.alias = '$item'
    }
  }
  parseKey(el, isScopedSlot)

  parseIf(el, createGenVar, isScopedSlot)
  parseBinding(el, genVar)
  parseDirs(el, genVar, ignoreDirs, includeDirs)
  parseWxsProps(el, {
    isAppView: true
  })

  // if (el.attrs) { // TODO 过滤 dataset
  //   el.attrs = el.attrs.filter(attr => attr.name.indexOf('data-') !== 0)
  // }

  parseAttrs(el, genVar)
  parseProps(el, genVar)

  parseWxsEvents(el, {
    filterModules: state.filterModules,
    isAppView: true
  })
}

function postTransformNode (el, options) {
  if (!el.parent) { // 从根节点开始递归处理
    traverseNode(el, false, {
      forIteratorId: 0,
      transformNode,
      filterModules: options.filterModules
    })
  }
}

function handleViewEvents (events) {
  Object.keys(events).forEach(name => {
    const eventOpts = events[name]
    // wxs
    if (eventOpts.value && eventOpts.value.indexOf('$handleWxsEvent') !== -1) {
      return
    }

    const modifiers = Object.create(null)

    let type = name
    const isPassive = type.charAt(0) === '&'
    type = isPassive ? type.slice(1) : type

    const isOnce = type.charAt(0) === '~'
    type = isOnce ? type.slice(1) : type

    const isCapture = type.charAt(0) === '!'
    type = isCapture ? type.slice(1) : type

    isPassive && (modifiers.passive = true)
    isOnce && (modifiers.once = true)
    isCapture && (modifiers.capture = true)

    if (Array.isArray(eventOpts)) {
      eventOpts.forEach(eventOpt => {
        eventOpt.modifiers && Object.assign(modifiers, eventOpt.modifiers)
      })
    } else {
      eventOpts.modifiers && Object.assign(modifiers, eventOpts.modifiers)
    }
    if (Object.keys(modifiers).length) {
      events[name] = {
        value: `$handleViewEvent($event,${JSON.stringify(modifiers)})`
      }
    } else {
      events[name] = {
        value: `$handleViewEvent($event)`
      }
    }
  })
}

function genVModel (el, isScopedSlot) {
  if (el.model) {
    el.model.value = createGenVar(el.attrsMap[ID], isScopedSlot)('v-model', el.model.value)
    // if (el.tag === 'v-uni-input' || el.tag === 'v-uni-textarea') {
    //   el.model.callback = `function($$v){$handleVModelEvent(${el.attrsMap[ID]},$$v)}`
    // } else {
    el.model.callback = `function(){}`
    // }
  }
}

function genData (el) {
  delete el.$parentIterator3

  genVModel(el)

  // 放在 postTransformNode 中处理的时机太靠前，v-model 等指令会新增 event
  el.events && handleViewEvents(el.events)
  el.nativeEvents && handleViewEvents(el.nativeEvents)
  return ''
}

module.exports = {
  preTransformNode: function (el, options) {
    parseTag(el)
    return basePreTransformNode(el, options)
  },
  postTransformNode,
  genData
}
