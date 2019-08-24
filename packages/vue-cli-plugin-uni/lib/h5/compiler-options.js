const {
  tags
} = require('@dcloudio/uni-cli-shared')

const simplePathRE = /^[A-Za-z_$][\w$]*(?:\.[A-Za-z_$][\w$]*|\['[^']*?']|\["[^"]*?"]|\[\d+]|\[[A-Za-z_$][\w$]*])*$/

function processEvent (expr, filterModules) {
  const isMethodPath = simplePathRE.test(expr)
  if (isMethodPath) {
    if (filterModules.find(name => expr.indexOf(name + '.') === 0)) {
      return `
$event = $handleWxsEvent($event);
${expr}($event, $getComponentDescriptor())
`
    } else {
      expr = expr + '($event)'
    }
  }
  return `
$event = $handleEvent($event);
${expr}
`
}

function hasOwn (obj, key) {
  return hasOwnProperty.call(obj, key)
}

const deprecated = {
  events: {
    'tap': 'click',
    'longtap': 'longpress'
  }
}

function addTag (tag) {
  if (!process.UNI_TAGS) {
    process.UNI_TAGS = new Set()
  }
  process.UNI_TAGS.add(tag)
}

module.exports = {
  preserveWhitespace: false,
  modules: [require('../format-text'), {
    preTransformNode (el, {
      warn
    }) {
      if (el.tag.indexOf('v-uni-') === 0) {
        addTag(el.tag.replace('v-uni-', ''))
      } else if (hasOwn(tags, el.tag)) {
        addTag(el.tag)
        el.tag = 'v-uni-' + el.tag
      }
    },
    postTransformNode (el, {
      warn,
      filterModules
    }) {
      if (el.tag === 'block') {
        el.tag = 'template'
        const vForKey = el.key
        if (vForKey) {
          delete el.key
          el.children.forEach((childEl, index) => {
            const childVForKey = childEl.key
            if (childVForKey) {
              childEl.key = `${childVForKey}+'_'+${vForKey}+'_${index}'`
            } else {
              childEl.key = `${vForKey}+'_${index}'`
            }
          })
        }
      }
      if (el.events) {
        filterModules = filterModules || []
        const {
          events: eventsMap
        } = deprecated
        // const warnLogs = new Set()
        Object.keys(el.events).forEach(name => {
          // 过时事件类型转换
          if (eventsMap[name]) {
            el.events[eventsMap[name]] = el.events[name]
            delete el.events[name]
            // warnLogs.add(`警告：事件${name}已过时，推荐使用${eventsMap[name]}代替`)
            name = eventsMap[name]
          }

          const handlers = el.events[name]
          if (Array.isArray(handlers)) {
            handlers.forEach(handler => {
              handler.value = processEvent(handler.value, filterModules)
            })
          } else {
            handlers.value = processEvent(handlers.value, filterModules)
          }
        })
      }
    }
  }]
}
