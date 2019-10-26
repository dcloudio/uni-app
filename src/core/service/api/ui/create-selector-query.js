import {
  isFn
} from 'uni-shared'
import {
  invokeMethod
} from '../../platform'

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

class SelectorQuery {
  constructor (page) {
    this._page = page
    this._queue = []
    this._queueCb = []
  }

  exec (callback) {
    invokeMethod('requestComponentInfo', this._page, this._queue, res => {
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
    // app-plus 平台传递 id
    this._component = component._$id || component
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
    return new SelectorQuery(context)
  }
  const pages = getCurrentPages()
  const len = pages.length
  if (!len) {
    UniServiceJSBridge.emit('onError', 'createSelectorQuery:fail')
  }
  return new SelectorQuery(pages[len - 1])
}
