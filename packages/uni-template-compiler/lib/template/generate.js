const {
  hasOwn
} = require('../util')

const {
  SELF_CLOSING_TAGS,
  INTERNAL_EVENT_LINK
} = require('../constants')

function processElement (ast, state, isRoot) {
  const platformName = state.options.platform.name
  // <template slot="f"></template>
  if (ast.type === 'template' && hasOwn(ast.attr, 'slot')) {
    ast.type = 'view'
  }

  // 由于小程序端 default 不等同于默认插槽，统一移除 default 命名
  if (ast.type === 'slot' && hasOwn(ast.attr, 'name') && ast.attr.name === 'default') {
    delete ast.attr.name
  } else if (hasOwn(ast.attr, 'slot') && ast.attr.slot === 'default') {
    delete ast.attr.slot
  }

  if (hasOwn(ast.attr, 'textContent')) {
    ast.children = [ast.attr.textContent]
    delete ast.attr.textContent
  }
  if (hasOwn(ast.attr, 'innerHTML')) {
    ast.children = [{
      type: 'rich-text',
      attr: {
        nodes: ast.attr.innerHTML
      },
      children: []
    }]
    delete ast.attr.innerHTML
  }
  if (state.options.platform.isComponent(ast.type)) {
    if (platformName === 'mp-alipay') {
      ast.attr.onVueInit = INTERNAL_EVENT_LINK
    } else if (platformName !== 'mp-baidu') {
      ast.attr['bind:' + INTERNAL_EVENT_LINK] = INTERNAL_EVENT_LINK
    }

    const children = ast.children
    // default slot
    let defaultSlot = false
    const slots = []
    for (let i = children.length - 1; i >= 0; i--) {
      const childElement = children[i]
      /**
       * 仅百度、字节支持使用 block 作为命名插槽根节点
       * 此处为了统一仅忽略默认插槽
       * <block slot="left"></block> => <view slot="left"></view>
       */
      if (typeof childElement !== 'string' && childElement.attr.slot) {
        const slot = childElement.attr.slot
        if (slot && slot !== 'default' && childElement.type === 'block') {
          childElement.type = 'view'
        }
        slots.push(slot)
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
      if (platformName === 'mp-toutiao') {
        // 用于字节跳动小程序模拟抽象节点
        ast.attr.generic = `{{${JSON.stringify(ast.attr.generic)}}}`.replace(/"/g, '\'')
      } else {
        delete ast.attr.generic
      }
    }
    if (slots.length && platformName !== 'mp-alipay') { // 标记 slots
      ast.attr['vue-slots'] = '{{[' + slots.reverse().map(slotName => `'${slotName}'`).join(',') + ']}}'
    }
    if (ast.attr.id && ast.attr.id.indexOf('{{') === 0) {
      state.tips.add(`id 作为属性保留名,不允许在自定义组件 ${ast.type} 中定义为 props`)
    }
    if (hasOwn(ast.attr, 'data') && platformName !== 'mp-toutiao') { // 百度中会出现异常情况
      // TODO 暂不输出
      // state.tips.add(`data 作为属性保留名,不允许在自定义组件 ${ast.type} 中定义为 props`)
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
        let value = ast.attr[name]
        // 微信和QQ小程序解析 {{{}}} 报错，需要使用()包裹
        value = value.replace(/(\{\{)(\{.+?\})(\}\})/, '$1($2)$3')
        return `${name}="${value}"`
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

function parsePageMeta (ast, state) {
  // 目前仅 mp-weixin 支持 page-meta
  if (state.options.platform.name === 'mp-weixin') {
    const children = ast.children
    if (Array.isArray(children) && children.find(child => child.type === 'page-meta')) {
      return children
    }
  }
  return ast
}

module.exports = function generate (ast, state) {
  ast = parsePageMeta(ast, state)

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
