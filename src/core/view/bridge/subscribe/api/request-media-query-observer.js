const mediaQueryObservers = {}
const listeners = {} // 用公用对象存储监听器

// 拼接媒体查询条件
function handleMediaQueryStr ($props) {
  let mediaQueryStr = []
  const propsMenu = [
    'width',
    'minWidth',
    'maxWidth',
    'height',
    'minHeight',
    'maxHeight',
    'orientation'
  ]
  for (const item of propsMenu) {
    if (item !== 'orientation' && $props[item] !== '' && Number($props[item]) >= 0) {
      mediaQueryStr.push(`(${humpToLine(item)}: ${Number($props[item])}px)`)
    }
    if (item === 'orientation' && $props[item]) {
      mediaQueryStr.push(`(${humpToLine(item)}: ${$props[item]})`)
    }
  }
  mediaQueryStr = mediaQueryStr.join(' and ')
  return mediaQueryStr
}

function humpToLine (name) {
  return name.replace(/([A-Z])/g, '-$1').toLowerCase()
}

// 请求媒体查询对象
export function requestMediaQueryObserver ({
  reqId,
  options
}) {
  // 创建一个媒体查询对象
  const mediaQueryObserver = mediaQueryObservers[reqId] = window.matchMedia(handleMediaQueryStr(options))

  // 创建一个监听器
  const listener = listeners[reqId] = e => {
    UniViewJSBridge.publishHandler('onRequestMediaQueryObserver', {
      reqId,
      res: e.matches
    })
  }

  listener(mediaQueryObserver) // 监听前执行一次媒体查询
  mediaQueryObserver.addListener(listener)
}

// 销毁媒体查询对象
export function destroyMediaQueryObserver ({
  reqId
}) {
  const listener = listeners[reqId] // 需要移除的某个监听
  const mediaQueryObserver = mediaQueryObservers[reqId]

  if (mediaQueryObserver) {
    mediaQueryObserver.removeListener(listener) // 移除监听
    delete mediaQueryObservers[reqId]
    UniViewJSBridge.publishHandler('onRequestMediaQueryObserver', {
      reqId,
      reqEnd: true
    })
  }
}
