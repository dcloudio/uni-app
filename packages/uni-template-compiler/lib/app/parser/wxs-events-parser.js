const simplePathRE = /^[A-Za-z_$][\w$]*(?:\.[A-Za-z_$][\w$]*|\['[^']*?']|\["[^"]*?"]|\[\d+]|\[[A-Za-z_$][\w$]*])*$/

function isWxsEvent (expr, filterModules) {
  return !!filterModules.find(name => expr.indexOf(name + '.') === 0)
}

function parseWxsViewEvent (expr, filterModules) {
  if (!simplePathRE.test(expr)) {
    return expr
  }
  if (isWxsEvent(expr, filterModules)) {
    return `$event = $handleWxsEvent($event);${expr}($event, $getComponentDescriptor())`
  }
  return expr
}

module.exports = function parseWxsEvents (el, {
  filterModules,
  isAppService,
  isAppView
}) {
  if (!filterModules || !filterModules.length) {
    return
  }
  if (!el.events) {
    return
  }
  if (isAppService) {
    Object.keys(el.events).forEach(name => {
      const handlers = el.events[name]
      if (Array.isArray(handlers)) {
        el.events[name] = handlers.filter(handler => {
          return !isWxsEvent(handler.value, filterModules)
        })
        if (!el.events[name].length) {
          delete el.events[name]
        }
      } else {
        if (isWxsEvent(handlers.value, filterModules)) {
          delete el.events[name]
        }
      }
    })
  } else if (isAppView) {
    Object.keys(el.events).forEach(name => {
      const handlers = el.events[name]
      if (Array.isArray(handlers)) {
        handlers.forEach(handler => {
          handler.value = parseWxsViewEvent(handler.value, filterModules)
        })
      } else {
        handlers.value = parseWxsViewEvent(handlers.value, filterModules)
      }
    })
  }
}
