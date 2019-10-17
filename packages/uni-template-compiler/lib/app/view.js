const {
  ID,
  DATA_ROOT,
  isVar,
  getForEl,
  updateForEleId,
  processForKey,
  traverseNode
} = require('./util')

const parseTag = require('./parser/tag-parser')
const parseText = require('./parser/text-parser')
const parseEvent = require('./parser/event-parser')
const parseBlock = require('./parser/block-parser')
const parseComponent = require('./parser/component-parser')

const basePreTransformNode = require('./pre-transform-node')

function createGenVar (id) {
  return function genVar (name, extra = '') {
    extra = extra ? (',' + extra) : ''
    return `${DATA_ROOT}(${id},'${name}'${extra})`
  }
}

// if 使用该方案是因为 template 节点之类无法挂靠 extras
function processIfConditions (el) {
  if (el.if) {
    el.ifConditions.forEach(con => {
      if (isVar(con.exp)) {
        con.exp = createGenVar(con.block.attrsMap[ID])(con.block.elseif ? 'v-else-if' : 'v-if')
      }
    })

    el.if = createGenVar(el.attrsMap[ID])('v-if')
  }
}

function processBinding (el, genVar) {
  if (el.classBinding) {
    el.classBinding = genVar('c')
  }

  if (el.styleBinding) {
    el.styleBinding = genVar('s')
  }
}

function processFor (el, genVal) {
  if (el.for && isVar(el.for)) {
    el.for = createGenVar(el.forId)('v-for')
    // <div><li v-for=" { a, b }  in items"></li></div>
    // =>
    // <div><li v-for="$item in items"></li></div>
    if (el.alias[0] === '{') {
      el.alias = '$item'
    }
  }
}

function processKey (el) {
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

function processIf (el) {
  processIfConditions(el)
}

function processDirs (el, genVar) {
  if (el.directives) {
    el.directives.forEach(dir => {
      dir.value && (dir.value = genVar('v-' + dir.name))
      dir.isDynamicArg && (dir.arg = genVar('v-' + dir.name + '-arg'))
    })
  }
}

function processAttrs (el, genVar) {
  el.attrs.forEach(attr => {
    attr.name !== ID && isVar(attr.value) && (attr.value = genVar('a-' + attr.name))
  })
}

function processProps (el, genVar) {
  el.props && el.props.forEach(prop => {
    isVar(prop.value) && (prop.value = genVar('a-' + prop.name))
  })
}

function processText (el, parent) {
  const state = {
    index: 0,
    view: true,
    genVar: createGenVar(parent.attrsMap[ID])
  }
  // fixed by xxxxxx 注意：保持平台一致性，trim 一下
  el.expression = parseText(el.text.trim(), false, state).expression
}

function transformNode (el, parent, state) {
  parseBlock(el)
  parseComponent(el)
  parseEvent(el)
  // 更新 id
  updateForEleId(el, state)

  if (el.type !== 1) {
    return (el.type === 2 && processText(el, parent))
  }

  const id = el.attrsMap[ID]
  const genVar = createGenVar(id)

  processFor(el, genVar)
  processKey(el)
  processIf(el)
  processBinding(el, genVar)
  processDirs(el, genVar)
  processAttrs(el, genVar)
  processProps(el, genVar)
}

function postTransformNode (el) {
  if (!el.parent) { // 从根节点开始递归处理
    traverseNode(el, false, {
      forIteratorId: 0,
      transformNode
    })
  }
}

function processEvents (events) {
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

function genData (el) {
  delete el.$parentIterator3

  if (el.model) {
    el.model.callback = `function ($$v) {}`
  }

  // 放在 postTransformNode 中处理的时机太靠前，v-model 等指令会新增 event
  // 理想情况，应该移除自定义组件的 events 配置，但目前不太好准确确定是自定义组件
  el.events && processEvents(el.events)
  el.nativeEvents && processEvents(el.nativeEvents)
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
