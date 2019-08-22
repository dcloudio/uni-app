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
    'tap': 'click'
  }
}

if (process.env.UNI_USING_NVUE_COMPILER) {
  modules.push({
    postTransformNode (el) {
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
            el.events[eventsMap[name]] = el.events[name]
            delete el.events[name]
            name = eventsMap[name]
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

module.exports = {
  preserveWhitespace: false,
  compiler: require('weex-template-compiler'),
  compilerOptions: {
    modules
  }
}
