export {
  pack,
  unpack,
  invoke
}
  from 'uni-core/service/bridge'

export function requireNativePlugin (name) {
  return uni.requireNativePlugin(name)
}

/**
 * 触发 service 层，与 onMethod 对应
 */
export function publish (name, res) {
  return UniServiceJSBridge.emit('api.' + name, res)
}

let lastStatusBarStyle

export function setStatusBarStyle (statusBarStyle) {
  if (!statusBarStyle) {
    const pages = getCurrentPages()
    if (!pages.length) {
      return
    }
    statusBarStyle = pages[pages.length - 1].$page.meta.statusBarStyle
    if (!statusBarStyle || statusBarStyle === lastStatusBarStyle) {
      return
    }
  }
  if (process.env.NODE_ENV !== 'production') {
    console.log(`[uni-app] setStatusBarStyle`, statusBarStyle)
  }

  lastStatusBarStyle = statusBarStyle

  plus.navigator.setStatusBarStyle(statusBarStyle)
}
