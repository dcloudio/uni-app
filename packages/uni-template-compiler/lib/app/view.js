const {
  ID,
  GET_DATA,
  isVar,
  getForEl,
  updateForEleId,
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

const basePreTransformNode = require('./pre-transform-node')

function createGenVar (id) {
  return function genVar (name) {
    return `${GET_DATA}(${id},'${name}')`
  }
}

function parseKey (el) {
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
      isVar(el.key) && (el.key = createGenVar(el.attrsMap[ID])('a-key'))
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

function transformNode (el, parent, state) {
  if (el.type === 3) {
    return
  }
  parseBlock(el, parent)
  parseComponent(el)
  parseEvent(el)
  // 更新 id
  updateForEleId(el, state)

  if (el.type === 2) {
    return parseText(el, parent, {
      index: 0,
      view: true,
      // <uni-popup>{{content}}</uni-popup>
      genVar: createGenVar(parent.attrsMap[ID])
    })
  }

  const genVar = createGenVar(el.attrsMap[ID])

  parseIs(el, genVar)

  if (parseFor(el, createGenVar)) {
    if (el.alias[0] === '{') { // <div><li v-for=" { a, b }  in items"></li></div>
      el.alias = '$item'
    }
  }
  parseKey(el)

  parseIf(el, createGenVar)
  parseBinding(el, genVar)
  parseDirs(el, genVar, ignoreDirs, includeDirs)
  parseAttrs(el, genVar)
  parseProps(el, genVar)
}

function postTransformNode (el) {
  if (!el.parent) { // 从根节点开始递归处理
    traverseNode(el, false, {
      forIteratorId: 0,
      transformNode
    })
  }
}

function handleViewEvents (events) {
  Object.keys(events).forEach(name => {
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

    const eventOpts = events[name]
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

function genVModel (el) {
  if (el.model) {
    el.model.value = createGenVar(el.attrsMap[ID])('v-model', el.model.value)
    if (el.tag === 'v-uni-input' || el.tag === 'v-uni-textarea') {
      el.model.callback = `function($$v){$handleVModelEvent(${el.attrsMap[ID]},$$v)}`
    } else {
      el.model.callback = `function(){}`
    }
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
