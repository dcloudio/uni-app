const uniI18n = require('@dcloudio/uni-cli-i18n')

const EVENTS = {
  click: 'tap'
}
const tags = {
  // 小程序平台通用组件
  base: [
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
  ],
  'mp-baidu': [
    'animation-video',
    'animation-view',
    'ar-camera',
    'rtc-room',
    'rtc-room-item',
    'tabs',
    'tab-item',
    'follow-swan',
    'login',
    'inline-payment-panel',
    'talos-linear-gradient',
    'talos-rc-view',
    'talos-nested-scroll-view',
    'talos-nested-scroll-top-container',
    'talos-nested-scroll-bottom-container',
    'talos-waterfall-view',
    'talos-waterfall-item',
    'talos-waterfall-header',
    'talos-waterfall-footer',
    'talos-pull-refresh',
    'talos-control-container',
    'talos-na-refresh-control',
    'talos-modal',
    'talos-svg'
  ],
  'mp-weixin': [
    'page-container',
    'page-meta',
    'navigation-bar',
    'match-media',
    'share-element',
    'channel-live',
    'channel-video',
    'voip-room',
    'root-portal',
    'subscribe',
    // 手势组件
    'tap-gesture-handler',
    'double-tap-gesture-handler',
    'scale-gesture-handler',
    'force-press-gesture-handler',
    'pan-gesture-handler',
    'vertical-drag-gesture-handler',
    'horizontal-drag-gesture-handler',
    'long-press-gesture-handler',
    'grid-view',
    'list-view',
    'sticky-header',
    'sticky-section'
  ],
  // 支付宝小程序平台独有组件
  'mp-alipay': [
    'lifestyle',
    'life-follow',
    'contact-button',
    'spread',
    'error-view',
    'poster',
    'cashier',
    'ix-grid',
    'ix-native-grid',
    'ix-native-list',
    'mkt',
    'page-container',
    'page-meta',
    'lottie'
  ]
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
    return !tags.base.concat(tags[this.name] || []).includes(tagName)
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
