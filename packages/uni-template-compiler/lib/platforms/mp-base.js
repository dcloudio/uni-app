const EVENTS = {
  click: 'tap'
}
const tags = [
  'slot',
  'block',
  'component',
  'template',

  'ad',
  'audio',
  'button',
  'camera',
  'canvas',
  'checkbox',
  'checkbox-group',
  'cover-image',
  'cover-view',
  'form',
  'functional-page-navigator',
  'icon',
  'image',
  'input',
  'label',
  'live-player',
  'live-pusher',
  'map',
  'movable-area',
  'movable-view',
  'navigator',
  'official-account',
  'open-data',
  'picker',
  'picker-view',
  'picker-view-column',
  'progress',
  'radio',
  'radio-group',
  'rich-text',
  'scroll-view',
  'slider',
  'swiper',
  'swiper-item',
  'switch',
  'text',
  'textarea',
  'video',
  'view',
  'web-view',
  'editor'
]

module.exports = {
  ref: 'data-ref',
  refInFor: 'data-ref-in-for',
  specialEvents: {},
  /**
     * TODO 暂时先简单判断是不是自定义组件，
     * 如果要依赖真实导入的组件识别，需要 template-loader 与 script-loader 结合，
     * 目前 template 在前，script 在后，要做的话，就需要把 wxml 的生成机制放到 plugin 中才可以拿到真实的组件列表
     */
  isComponent (tagName) {
    return !tags.includes(tagName)
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
    state.errors.add('暂不支持 scoped slot [' + slotName + ']')
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
    state.errors.add('暂不支持 scoped slot [' + slotName + ']')
    return {
      type: 'view',
      attr: {
        slot: slotName
      },
      children: []
    }
  }
}
