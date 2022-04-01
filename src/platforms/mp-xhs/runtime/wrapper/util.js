import {
  isFn,
  hasOwn
} from 'uni-shared'

export const isComponent2 = xhs.canIUse('component2')

export const mocks = ['$id']

export function initSpecialMethods (mpInstance) {
  if (!mpInstance.$vm) {
    return
  }
  let path = mpInstance.is || mpInstance.route
  if (!path) {
    return
  }
  if (path.indexOf('/') === 0) {
    path = path.substr(1)
  }
  const specialMethods = xhs.specialMethods && xhs.specialMethods[path]
  if (specialMethods) {
    specialMethods.forEach(method => {
      if (isFn(mpInstance.$vm[method])) {
        mpInstance[method] = function (event) {
          if (hasOwn(event, 'markerId')) {
            event.detail = typeof event.detail === 'object' ? event.detail : {}
            event.detail.markerId = event.markerId
          }
          // TODO normalizeEvent
          mpInstance.$vm[method](event)
        }
      }
    })
  }
}

export const handleWrap = function (mp, destory) {
  const vueId = mp.props.vueId
  const list = mp.props['data-event-list'].split(',')
  list.forEach(eventName => {
    const key = `${eventName}${vueId}`
    if (destory) {
      delete this[key]
    } else {
      // TODO remove handleRef
      this[key] = function () {
        mp.props[eventName].apply(this, arguments)
      }
    }
  })
}
