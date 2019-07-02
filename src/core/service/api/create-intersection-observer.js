import Vue from 'vue'
import createCallbacks from 'uni-helpers/callbacks'

const createIntersectionObserverCallbacks = createCallbacks('requestComponentObserver')

const defaultOptions = {
  thresholds: [0],
  initialRatio: 0,
  observeAll: false
}

class MPIntersectionObserver {
  constructor (pageId, options) {
    this.pageId = pageId
    this.options = Object.assign({}, defaultOptions, options)
  }
  _makeRootMargin (margins = {}) {
    this.options.rootMargin = ['top', 'right', 'bottom', 'left'].map(name => `${Number(margins[name]) || 0}px`).join(' ')
  }
  relativeTo (selector, margins) {
    this.options.relativeToSelector = selector
    this._makeRootMargin(margins)
  }
  relativeToViewport (margins) {
    this.options.relativeToSelector = null
    this._makeRootMargin(margins)
  }
  observe (selector, callback) {
    if (typeof callback !== 'function') {
      return
    }
    this.options.selector = selector

    this.reqId = createIntersectionObserverCallbacks.push(callback)

    UniServiceJSBridge.publishHandler('requestComponentObserver', {
      reqId: this.reqId,
      options: this.options
    }, this.pageId)
  }
  disconnect () {
    UniServiceJSBridge.publishHandler('destroyComponentObserver', {
      reqId: this.reqId
    }, this.pageId)
  }
}

export function createIntersectionObserver (context, options) {
  if (!(context instanceof Vue)) {
    options = context
    context = null
  }
  if (context) {
    return new MPIntersectionObserver(context.$page.id, options)
  }
  const app = getApp()
  if (app.$route && app.$route.params.__id__) {
    return new MPIntersectionObserver(app.$route.params.__id__, options)
  } else {
    UniServiceJSBridge.emit('onError', 'createIntersectionObserver:fail')
  }
}
