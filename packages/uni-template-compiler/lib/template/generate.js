const {
  SELF_CLOSING_TAGS,
  INTERNAL_EVENT_LINK
} = require('../constants')

function processElement (ast, state, isRoot) {
  const platformName = state.options.platform.name
  // <template slot="f"></template>
  if (ast.type === 'template' && ast.attr.hasOwnProperty('slot')) {
    ast.type = 'view'
  }

  if (ast.attr.hasOwnProperty('textContent')) {
    ast.children = [ast.attr['textContent']]
    delete ast.attr['textContent']
  }
  if (ast.attr.hasOwnProperty('innerHTML')) {
    ast.children = [{
      type: 'rich-text',
      attr: {
        nodes: ast.attr['innerHTML']
      },
      children: []
    }]
    delete ast.attr['innerHTML']
  }
  if (state.options.platform.isComponent(ast.type)) {
    if (platformName === 'mp-alipay') {
      ast.attr['onVueInit'] = INTERNAL_EVENT_LINK
    } else if (platformName !== 'mp-baidu') {
      ast.attr['bind:' + INTERNAL_EVENT_LINK] = INTERNAL_EVENT_LINK
    }

    const children = ast.children
    // default slot
    let defaultSlot = false
    const slots = []
    for (let i = children.length - 1; i >= 0; i--) {
      const childElement = children[i]
      // <block name="left"></block> => <view name="left"></view>
      if (typeof childElement !== 'string' && childElement.attr.slot) {
        if (childElement.type === 'block') {
          childElement.type = 'view'
        }
        slots.push(childElement.attr.slot)
      } else {
        defaultSlot = true
      }
    }
    if (defaultSlot) {
      slots.push('default')
    }
    if (ast.attr.generic) {
      Object.keys(ast.attr.generic).forEach(scopedSlotName => {
        slots.push(scopedSlotName)
      })
      delete ast.attr.generic
    }
    if (slots.length && platformName !== 'mp-alipay') { // 标记 slots
      ast.attr['vue-slots'] = '{{[' + slots.reverse().map(slotName => `'${slotName}'`).join(',') + ']}}'
    }
    if (ast.attr['id'] && ast.attr['id'].indexOf('{{') === 0) {
      state.tips.add(`id 作为属性保留名,不允许在自定义组件 ${ast.type} 中定义为 props`)
    }
    if (ast.attr.hasOwnProperty('data')) { // 百度中会出现异常情况
      state.tips.add(`data 作为属性保留名,不允许在自定义组件 ${ast.type} 中定义为 props`)
    }
  }
}

function genElement (ast, state, isRoot = false) {
  if (!ast) {
    return ''
  }
  if (typeof ast === 'string') {
    return genText(ast, state)
  }

  processElement(ast, state, isRoot)

  const names = Object.keys(ast.attr)
  const props = names.length
    ? ' ' +
    names
      .map(name => {
        if (name.includes(':else')) {
          return name
        }
        if (ast.attr[name] === '' && name !== 'value') { // value属性需要保留=''
          return name
        }
        return `${name}="${ast.attr[name]}"`
      })
      .join(' ')
    : ''
  if (SELF_CLOSING_TAGS.includes(ast.type)) {
    return `<${ast.type}${props}/>`
  }

  let children = ast.children
    .map(child => {
      return genElement(child, state, isRoot && ast.type === 'block') // 如果根节点是 block，则继续 root
    })
    .join('')

  if (ast.scoped) { // 简单处理的 scoped slots 子节点的变量
    children = children.replace(new RegExp(ast.scoped + '.', 'g'), '')
  }
  return `<${ast.type}${props}>${children}</${ast.type}>`
}

function genText (ast, state) {
  return ast
}

module.exports = function generate (ast, state) {
  if (!Array.isArray(ast)) {
    ast = [ast]
  }

  let code = ast.map(ast => genElement(ast, state, true)).join('')

  const replaceCodes = state.options.replaceCodes
  if (replaceCodes) {
    Object.keys(replaceCodes).forEach(key => {
      code = code.replace(new RegExp(key.replace('$', '\\$'), 'g'), replaceCodes[key])
    })
  }

  return code
}
