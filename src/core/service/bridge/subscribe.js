import createCallbacks from 'uni-helpers/callbacks'

import {
  callPageHook
} from '../plugins/util'

function createPageEvent (eventType) {
  return function (args, pageId) {
    const pages = getCurrentPages()
    const page = pages.find(page => page.$page.id === pageId)
    if (page) {
      callPageHook(page, eventType, args)
    } else {
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
    }
    callback(res)
  }
}

export default function initSubscribe (subscribe) {
  subscribe('onPageReady', createPageEvent('onReady'))
  subscribe('onPageScroll', createPageEvent('onPageScroll'))
  subscribe('onReachBottom', createPageEvent('onReachBottom'))

  subscribe('onRequestComponentInfo', onRequestComponentInfo)
  subscribe('onRequestComponentObserver', onRequestComponentObserver)
}
