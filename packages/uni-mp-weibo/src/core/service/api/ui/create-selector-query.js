import {
  isFn
} from 'uni-shared'

import {
  invokeMethod,
  getCurrentPageVm
} from '../../platform'

import { CanvasContext } from '../context/canvas'
import { MapContext } from '../context/create-map-context'
import { VideoContext } from '../context/create-video-context'
import { EditorContext } from '../context/editor'

const ContextClasss = {
  canvas: CanvasContext,
  map: MapContext,
  video: VideoContext,
  editor: EditorContext
}

function convertContext (result) {
  if (result && result.context) {
    const { id, name, page } = result.context
    const ContextClass = ContextClasss[name]
    result.context = ContextClass && new ContextClass(id, page)
  }
}

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

  context (callback) {
    this._selectorQuery._push(
      this._selector,
      this._component,
      this._single, {
        context: true
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
    this._nodesRef = null
  }

  exec (callback) {
    invokeMethod('requestComponentInfo', this._page, this._queue, res => {
      const queueCbs = this._queueCb
      res.forEach((result, index) => {
        if (Array.isArray(result)) {
          result.forEach(convertContext)
        } else {
          convertContext(result)
        }
        const queueCb = queueCbs[index]
        if (isFn(queueCb)) {
          queueCb.call(this, result)
        }
      })
      isFn(callback) && callback.call(this, res)
    })

    return this._nodesRef
  }

  ['in'] (component) {
    // app-plus 平台传递 id
    this._component = component._$id || component
    return this
  }

  select (selector) {
    return (this._nodesRef = new NodesRef(this, this._component, selector, true))
  }

  selectAll (selector) {
    return (this._nodesRef = new NodesRef(this, this._component, selector, false))
  }

  selectViewport () {
    return (this._nodesRef = new NodesRef(this, 0, '', true))
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
  return new SelectorQuery(getCurrentPageVm('createSelectorQuery'))
}
