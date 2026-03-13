const uniI18n = require('@dcloudio/uni-cli-i18n')
const { tags } = require('./native-tags')
const EVENTS = {
  click: 'tap'
}

const baseCompiler = {
  ref: 'data-ref',
  refInFor: 'data-ref-in-for',
  specialEvents: {},
  /**
   * TODO 暂时先简单判断是不是自定义组件，
   * 如果要依赖真实导入的组件识别，需要 template-loader 与 script-loader 结合，
   * 目前 template 在前，script 在后，要做的话，就需要把 wxml 的生成机制放到 plugin 中才可以拿到真实的组件列表
   */
  isComponent (tagName) {
    return !this.isNativeTag(tagName)
  },
  isNativeTag (tagName) {
    return tags.base.concat(tags[this.name] || []).includes(tagName)
  },
  createFilterTag (filterTag, {
    content,
    attrs
  }) {
    content = content.trim()
    if (content) {
      return `<${filterTag} module="${attrs.module}">
${content}
</${filterTag}>`
    } else if (attrs.src) {
      return `<${filterTag} src="${attrs.src}" module="${attrs.module}"></${filterTag}>`
    }
  },
  getEventType (eventType) {
    return EVENTS[eventType] || eventType
  },
  formatEventType (eventName, isCatch, isCapture, isCustom) {
    let eventType = 'bind'
    if (isCatch) {
      eventType = 'catch'
    }
    if (isCapture) {
      return `capture-${eventType}:${eventName}`
    }
    if (isCustom) {
      return `${eventType}:${eventName}`
    }
    return `${eventType}${eventName}` // 原生组件不支持 bind:input 等写法，统一使用 bindinput
  },
  createScopedSlots (slotName, props, state) {
    state.errors.add(uniI18n.__('templateCompiler.notCurrentlySupportScopedSlot', {
      0: `[${slotName}]`
    }))
    return {
      type: 'slot',
      attr: {
        name: slotName
      },
      children: []
    }
  },
  resolveScopedSlots (slotName, componentName, paramExprNode, returnExprNodes, {
    traverseExpr,
    normalizeChildren
  }, state) {
    state.errors.add(uniI18n.__('templateCompiler.notCurrentlySupportScopedSlot', {
      0: `[${slotName}]`
    }))
    return {
      type: 'view',
      attr: {
        slot: slotName
      },
      children: []
    }
  }
}

module.exports = function getCompilerOptions (platform) {
  let id = '@dcloudio/uni-' + platform
  if (global.uniPlugin) {
    id = global.uniPlugin.id
  }
  return Object.assign({
    name: platform
  },
  baseCompiler,
  require(id + '/lib/uni.compiler.js')
  )
}
