const {
  module: autoComponentsModule,
  compileTemplate
} = require('@dcloudio/uni-template-compiler/lib/auto-components')

const {
  isUnaryTag
} = require('@dcloudio/uni-template-compiler/lib/util')

const TAGS = [
  'text',
  'image',
  'input',
  'textarea',
  'video',
  'web-view',
  // 'switch',
  'slider'
]

const modules = []

const deprecated = {
  events: {
    tap: 'click'
  }
}

if (process.env.UNI_USING_NVUE_COMPILER) {
  const wrapperTextTag = function (el, options) {
    const tag = el.tag
    if (tag === 'text' || tag === 'u-text' || tag === 'button') {
      return
    }
    const children = el.children
    children.forEach((child, index) => {
      if (child.text) {
        children.splice(index, 1, {
          type: 1,
          tag: 'u-text',
          attrsList: [],
          attrsMap: {},
          rawAttrsMap: {},
          parent: el,
          children: [child],
          plain: true
        })
      }
    })
  }

  modules.push({
    postTransformNode (el, options) {
      wrapperTextTag(el, options)

      if (TAGS.includes(el.tag)) {
        el.tag = 'u-' + el.tag
      }
      if (el.events) {
        const {
          events: eventsMap
        } = deprecated
        Object.keys(el.events).forEach(name => {
          // 过时事件类型转换
          if (eventsMap[name]) {
            if (!(name === 'tap' && el.tag === 'map')) { // map 的 tap 事件不做转换
              el.events[eventsMap[name]] = el.events[name]
              delete el.events[name]
              name = eventsMap[name]
            }
          }
        })
      }
      if (el.tag === 'u-video') {
        if (
          Array.isArray(el.children) &&
          el.children.length &&
          el.children[0].tag !== 'u-scalable'
        ) {
          el.children = [{
            type: 1,
            tag: 'u-scalable',
            attrsList: [],
            attrsMap: {
              style: 'position: absolute;left: 0;right: 0;top: 0;bottom: 0;'
            },
            rawAttrsMap: {
              style: {
                name: 'style',
                value: 'position: absolute;left: 0;right: 0;top: 0;bottom: 0;'
              }
            },
            plain: false,
            staticStyle: '{position:"absolute",left:"0",right:"0",top:"0",bottom:"0"}',
            children: el.children
          }]
        }
      }
    }
  })
}

const compiler = require('weex-template-compiler')
const oldCompile = compiler.compile
compiler.compile = function (source, options = {}) {
  (options.modules || (options.modules = [])).push(autoComponentsModule)

  options.modules.push(require('@dcloudio/uni-template-compiler/lib/asset-url'))

  options.isUnaryTag = isUnaryTag
  // 将 autoComponents 挂在 isUnaryTag 上边
  options.isUnaryTag.autoComponents = new Set()
  options.preserveWhitespace = false
  return compileTemplate(source, options, oldCompile)
}

module.exports = {
  isAppNVue: true,
  compiler,
  compilerOptions: {
    modules
  }
}
