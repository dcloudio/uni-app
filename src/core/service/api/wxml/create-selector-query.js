import {
  isFn
} from 'uni-shared'

import createCallbacks from 'uni-helpers/callbacks'

const requestComponentInfoCallbacks = createCallbacks('requestComponentInfo')

class NodesRef {
  constructor (selectorQuery, component, selector, single) {
    this._selectorQuery = selectorQuery
    this._component = component
    this._selector = selector
    this._single = single
  }

  boundingClientRect (callback) {
    this._selectorQuery._push(
      this._selector,
      this._component,
      this._single, {
        id: true,
        dataset: true,
        rect: true,
        size: true
      },
      callback)
    return this._selectorQuery
  }

  fields (fields, callback) {
    this._selectorQuery._push(
      this._selector,
      this._component,
      this._single,
      fields,
      callback
    )
    return this._selectorQuery
  }

  scrollOffset (callback) {
    this._selectorQuery._push(
      this._selector,
      this._component,
      this._single, {
        id: true,
        dataset: true,
        scrollOffset: true
      },
      callback
    )
    return this._selectorQuery
  }
}

function requestComponentInfo (pageId, queue, callback) {
  const reqId = requestComponentInfoCallbacks.push(callback)

  UniServiceJSBridge.publishHandler('requestComponentInfo', {
    reqId,
    reqs: queue
  }, pageId)
}

class SelectorQuery {
  constructor (pageId) {
    this.pageId = pageId
    this._queue = []
    this._queueCb = []
  }

  exec (callback) {
    requestComponentInfo(this.pageId, this._queue, res => {
      const queueCbs = this._queueCb
      res.forEach((result, index) => {
        const queueCb = queueCbs[index]
        if (isFn(queueCb)) {
          queueCb.call(this, result)
        }
      })
      isFn(callback) && callback.call(this, res)
    })
  }

  ['in'] (component) {
    console.error('Unsupported method：SelectorQuery.in')
    return this
  }

  select (selector) {
    return new NodesRef(this, this._component, selector, true)
  }

  selectAll (selector) {
    return new NodesRef(this, this._component, selector, false)
  }

  selectViewport () {
    return new NodesRef(this, 0, '', true)
  }

  _push (selector, component, single, fields, callback) {
    this._queue.push({
      component,
      selector,
      single,
      fields
    })
    this._queueCb.push(callback)
  }
}

export function createSelectorQuery (context) {
  if (context) {
    return new SelectorQuery(context.$page.id)
  }
  const app = getApp()
  if (app.$route && app.$route.params.__id__) {
    return new SelectorQuery(app.$route.params.__id__)
  } else {
    UniServiceJSBridge.emit('onError', 'createSelectorQuery:fail')
  }
}
