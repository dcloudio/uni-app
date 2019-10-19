const {
  ID,
  ITERATOR,
  isVar,
  getForEl,
  processForKey,
  updateForEleId,
  traverseNode
} = require('./util')

const {
  isComponent
} = require('../util')

const parseText = require('./parser/text-parser')
const parseEvent = require('./parser/event-parser')
const parseBlock = require('./parser/block-parser')

const preTransformNode = require('./pre-transform-node')

function genData (el) {
  delete el.$parentIterator3

  const {
    events,
    dynamicClass,
    dynamicStyle,
    dynamicAttrs,
    dynamicTexts,
    directivesBinding
  } = el
  let extras = ''

  if (directivesBinding) {
    const dirs = genDirectives(directivesBinding)
    dirs && (extras += dirs + ',')
  }

  if (dynamicClass) {
    extras += genDynamicClass(dynamicClass) + ','
  }

  if (dynamicStyle) {
    extras += genDynamicStyle(dynamicStyle) + ','
  }

  if (dynamicTexts) {
    extras += genDynamicTexts(dynamicTexts) + ','
  }

  if (events) {
    const dynamicHandlers = genDynamicHandlers(events)
    dynamicHandlers && (extras += dynamicHandlers + ',')
  }

  if (Array.isArray(dynamicAttrs)) {
    const dynamicProps = genDynamicProps(dynamicAttrs)
    dynamicProps && (extras += dynamicProps + ',')
  }

  extras = extras.replace(/,$/, '')

  if (extras) {
    return `extras:{${extras}},`
  }
  return ''
}

function genDirectives (dirs) {
  let directives = []
  dirs.forEach(dir => {
    isVar(dir.value) && directives.push(`"v-${dir.name}":${dir.value}`)
    dir.isDynamicArg && (directives.push(`"v-${dir.name}-arg":${dir.arg}`))
  })
  return directives.join(',')
}

function genDynamicClass (classBinding) {
  return `c:${classBinding}`
}

function genDynamicStyle (styleBinding) {
  return `s:${styleBinding}`
}

function genDynamicTexts (dynamicTexts) {
  return dynamicTexts.map(({
    name,
    value
  }) => {
    return `${name}:${value}`
  }).join(',')
}

function genDynamicHandlers (events) {
  let dynamicHandlers = []
  let index = 0
  for (let name in events) {
    const eventHandler = events[name]
    if (eventHandler.dynamic) {
      eventHandler.index = index++
      dynamicHandlers.push('"de-' + (eventHandler.index) + '":' + name)
    }
  }
  return dynamicHandlers.join(',')
}

function genDynamicProps (props, prefix = 'da') {
  let dynamicProps = []
  let index = 0
  for (let i = 0; i < props.length; i++) {
    const {
      name,
      value,
      dynamic
    } = props[i]
    if (dynamic) {
      props[i].index = index++
      dynamicProps.push(`"${prefix}-` + (props[i].index) + '-n":' + name)
      dynamicProps.push(`"${prefix}-` + (props[i].index) + '-v":' + value)
    }
  }
  return dynamicProps.join(',')
}

// if 使用该方案是因为 template 节点之类无法挂靠 extras
function processIfConditions (el) {
  if (el.if) {
    el.ifConditions.forEach(con => {
      if (isVar(con.exp)) {
        const method = con.block.elseif ? '_$e' : '_$i'
        con.exp = `${method}(${con.block.attrsMap[ID]},${con.exp})`
      }
    })
    el.if = `_$i(${el.attrsMap[ID]},${el.if})`
  }
}

function removeStatic (el) {
  delete el.staticClass
  delete el.staticStyle
}

function renameBinding (el) {
  // 重命名 classBinding,styleBinding，避免生成 class,style 属性
  if (el.classBinding) {
    el.dynamicClass = el.classBinding
    delete el.classBinding
  }
  if (el.styleBinding) {
    el.dynamicStyle = el.styleBinding
    delete el.styleBinding
  }
}

function processKey (el) {
  // add default key
  if (processForKey(el)) {
    el = el.children[0] // 当 template 下仅文本时，处理第一个动态文本
  }
  if (el.key && (
    el.key.indexOf('_$f') !== 0 &&
      el.key.indexOf('_$s') !== 0
  )) { // renderList key
    const forEl = getForEl(el)
    if (forEl) {
      if (!isVar(forEl.for)) {
        return
      }
      const forId = forEl.forId
      const it = forEl.iterator2 || forEl.iterator1 || ITERATOR
      if (forEl === el) { // <view v-for="item in items" :key="item.id"></view>
        el.key = `_$f(${forId},{forIndex:${it},key:${el.key}})`
      } else { // <template v-for="item in items"><view :key="item.id+'1'"></view><view :key="item.id+'2'"></view></template>
        const keyIndex = forEl.children.indexOf(el)
        el.key = `_$f(${forId},{forIndex:${it},keyIndex:${keyIndex},key:${el.key}})`
      }
    } else {
      isVar(el.key) && (el.key = `_$s(${el.attrsMap[ID]},'a-key',${el.key})`)
    }
  }
}

function processIf (el) {
  processIfConditions(el)
}

function processDirs (el) {
  if (el.directives) {
    const directivesBinding = []
    el.directives = el.directives.filter(dir => {
      directivesBinding.push(dir)
      if (dir.name === 'model') {
        return true
      }
    })
    if (directivesBinding.length) {
      el.directivesBinding = directivesBinding
    }
    if (!el.directives.length) {
      delete el.directives
    }
  }
}

function processDynamicText (el, state) {
  el.type = 1
  el.tag = 'text'
  el.attrsList = [{
    name: ID,
    value: state.id
  }]
  el.attrsMap = {
    [ID]: state.id
  }
  el.rawAttrsMap = {}
  el.children = []
  el.plain = false
  el.attrs = [{
    name: ID,
    value: String(state.id)
  }]
  el.hasBindings = true

  if (el.text) {
    // fixed by xxxxxx 注意：保持平台一致性，trim 一下
    const ret = parseText(el.text.trim(), false, state)
    if (ret && ret.dynamicTexts.length) {
      el.dynamicTexts = ret.dynamicTexts
    }
  }

  delete el.expression
  delete el.tokens
  delete el.text

  return el
}

function processText (el) {
  if (!el.children.length) {
    return
  }

  const state = {
    id: el.attrsMap[ID],
    index: 0,
    service: true
  }

  el.children = el.children.filter(child => {
    if (child.type === 3) { // ASTText
      return false
    } else if (child.type === 2 && child.text) { // ASTExpression
      processDynamicText(child, state)
      child.parent = el
    }
    return true
  })

  // <div><template v-for="item in items">item</template></div>
  if (!el.children.length && el.tag === 'template' && el.for) {
    el.children.push(processDynamicText({
      parent: el
    }, state))
  }
}

function processAttrs (el) {
  if (!isComponent(el.tag)) { // 自定义组件，不能移除静态 attr
    el.attrs = el.attrs.filter(attr => attr.name === ID || isVar(attr.value))
  }
}

function processFor (el) {
  if (el.for && isVar(el.for)) {
    el.for = `_$f(${el.forId},{forItems:${el.for}})`
  }
}

function transformNode (el, parent, state) {
  parseBlock(el)
  parseEvent(el)

  removeStatic(el)
  renameBinding(el)

  processAttrs(el)
  processText(el)

  updateForEleId(el, state)

  processFor(el)
  processKey(el)
  processIf(el)
  processDirs(el)
}

function postTransformNode (el) {
  if (!el.parent) { // 从根节点开始递归处理
    traverseNode(el, false, {
      forIteratorId: 0,
      transformNode
    })
  }
}
module.exports = {
  preTransformNode,
  postTransformNode,
  genData
}
