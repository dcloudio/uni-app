const {
  tags
} = require('@dcloudio/uni-cli-shared')
const parser = require('@babel/parser')
const t = require('@babel/types')

const simplePathRE = /^[A-Za-z_$][\w$]*(?:\.[A-Za-z_$][\w$]*|\['[^']*?']|\["[^"]*?"]|\[\d+]|\[[A-Za-z_$][\w$]*])*$/

function isFunction (expr) {
  try {
    const body = parser.parse(`(${expr})`).program.body[0]
    const expression = body.expression
    return t.isFunctionDeclaration(body) || t.isArrowFunctionExpression(expression) || t.isFunctionExpression(
      expression)
  } catch (error) {}
}

function processEvent (expr, filterModules) {
  const isMethodPath = simplePathRE.test(expr)
  if (isMethodPath || isFunction(expr)) {
    if (filterModules.find(name => expr.indexOf(name + '.') === 0)) {
      return `
$event = $handleWxsEvent($event);
(${expr})($event, $getComponentDescriptor())
`
    } else {
      expr = `(${expr})(...arguments)`
    }
  }
  return `
arguments[0] = $event = $handleEvent($event);
${expr}
`
}

function hasOwn (obj, key) {
  return hasOwnProperty.call(obj, key)
}

const deprecated = {
  events: {
    tap: 'click',
    longtap: 'longpress'
  }
}

function addTag (tag) {
  if (!process.UNI_TAGS) {
    process.UNI_TAGS = new Set()
  }
  process.UNI_TAGS.add(tag)
}

module.exports = {
  h5: true,
  modules: [require('../format-text'), {
    preTransformNode (el, options) {
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
      if (el.events || el.nativeEvents) {
        filterModules = filterModules || []
        const {
          events: eventsMap
        } = deprecated
        // const warnLogs = new Set()
        normalizeEvent(el.events, eventsMap, filterModules)
        normalizeEvent(el.nativeEvents, eventsMap, filterModules)
      }
    }
  }]
}

function normalizeEvent (events, eventsMap, filterModules) {
  if (!events) {
    return
  }
  Object.keys(events).forEach(name => {
    // 过时事件类型转换
    if (eventsMap[name]) {
      events[eventsMap[name]] = events[name]
      delete events[name]
      // warnLogs.add(`警告：事件${name}已过时，推荐使用${eventsMap[name]}代替`)
      name = eventsMap[name]
    }

    const handlers = events[name]
    if (Array.isArray(handlers)) {
      handlers.forEach(handler => {
        handler.value = processEvent(handler.value, filterModules)
      })
    } else {
      handlers.value = processEvent(handlers.value, filterModules)
    }
  })
}
