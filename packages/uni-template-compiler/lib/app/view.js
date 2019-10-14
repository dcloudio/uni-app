const {
  ID,
  DATA_ROOT,
  isVar,
  getForEl,
  updateForEleId,
  processForKey
} = require('./util')

const parseTag = require('./tag-parser')
const parseText = require('./text-parser')
const parseEvent = require('./event-parser')
const parseComponent = require('./component-parser')

const preTransformNode = require('./pre-transform-node')

function createGenVar (id) {
  return function genVar (name, extra = '') {
    if (/^\d+$/.test(id)) {
      return `${DATA_ROOT}['${id}']['${name}']${extra}`
    }
    return `${DATA_ROOT}[${id}]['${name}']${extra}`
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

  el.children && el.children.forEach(child => {
    processIfConditions(child)
  })

  el.scopedSlots && Object.values(el.scopedSlots).forEach(child => {
    processIfConditions(child)
  })
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
    // items 只有两种格式 [1,2,3],[{k0:'1-0',k1:'1-1'}]
    // <div><li v-for="(item,key,index) in items"></li></div>
    // =>
    // <div><li v-for="(item,index) in items"></li></div>
    if (el.iterator2) {
      el.iterator1 = el.iterator2
      delete el.iterator2
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
  // 因为时机问题，在最后处理根节点时，遍历处理 ifConditions
  !el.parent && processIfConditions(el)
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

function processText (el, genVar) {
  const state = {
    index: 0,
    view: true,
    genVar
  }

  el.children.forEach(child => {
    if (child.type === 2) { // ASTExpression
      child.expression = parseText(child.text, false, state).expression
    }
  })
}

function postTransformNode (el) {
  parseComponent(el)
  parseTag(el)
  parseEvent(el)

  updateForEleId(el)

  const id = el.attrsMap[ID]
  const genVar = createGenVar(id)

  processFor(el, genVar)
  processKey(el)
  processIf(el)
  processBinding(el, genVar)
  processDirs(el, genVar)
  processAttrs(el, genVar)
  processProps(el, genVar)
  processText(el, genVar)
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
  preTransformNode,
  postTransformNode,
  genData
}
