import createCallbacks from 'uni-helpers/callbacks'

import {
  callPageHook
} from '../plugins/util'

export default function initSubscribe (subscribe, {
  getApp,
  getCurrentPages
}) {
  function createPageEvent (eventType) {
    return function (args, pageId) {
      pageId = parseInt(pageId)
      const pages = getCurrentPages()
      const page = pages.find(page => page.$page.id === pageId)
      if (page) {
        callPageHook(page, eventType, args)
      } else if (process.env.NODE_ENV !== 'production') {
        console.error(`Not Found：Page[${pageId}]`)
      }
    }
  }

  const requestComponentInfoCallbacks = createCallbacks('requestComponentInfo')

  function onRequestComponentInfo ({
    reqId,
    res
  }) {
    const callback = requestComponentInfoCallbacks.pop(reqId)
    if (callback) {
      callback(res)
    }
  }

  const requestComponentObserverCallbacks = createCallbacks('requestComponentObserver')

  function onRequestComponentObserver ({
    reqId,
    reqEnd,
    res
  }) {
    const callback = requestComponentObserverCallbacks.get(reqId)
    if (callback) {
      if (reqEnd) {
        requestComponentObserverCallbacks.pop(reqId)
        return
      }
      callback(res)
    }
  }

  const requestMediaQueryObserverCallbacks = createCallbacks('requestMediaQueryObserver')

  function onRequestMediaQueryObserver ({
    reqId,
    reqEnd,
    res
  }) {
    const callback = requestMediaQueryObserverCallbacks.get(reqId)
    if (callback) {
      if (reqEnd) {
        requestMediaQueryObserverCallbacks.pop(reqId)
        return
      }
      callback(res)
    }
  }

  if (__PLATFORM__ === 'h5') {
    subscribe('onPageReady', createPageEvent('onReady'))
  }

  subscribe('onPageScroll', createPageEvent('onPageScroll'))
  subscribe('onReachBottom', createPageEvent('onReachBottom'))

  subscribe('onRequestComponentInfo', onRequestComponentInfo)
  subscribe('onRequestComponentObserver', onRequestComponentObserver)
  subscribe('onRequestMediaQueryObserver', onRequestMediaQueryObserver)
}
