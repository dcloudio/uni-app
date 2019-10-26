import createCallbacks from 'uni-helpers/callbacks'

import {
  getCurrentPageVm
} from '../../platform'

const createIntersectionObserverCallbacks = createCallbacks('requestComponentObserver')

const defaultOptions = {
  thresholds: [0],
  initialRatio: 0,
  observeAll: false
}

class ServiceIntersectionObserver {
  constructor (component, options) {
    this.pageId = component.$page.id
    this.component = component._$id || component // app-plus 平台传输_$id
    this.options = Object.assign({}, defaultOptions, options)
  }
  _makeRootMargin (margins = {}) {
    this.options.rootMargin = ['top', 'right', 'bottom', 'left'].map(name => `${Number(margins[name]) || 0}px`).join(
      ' ')
  }
  relativeTo (selector, margins) {
    this.options.relativeToSelector = selector
    this._makeRootMargin(margins)
    return this
  }
  relativeToViewport (margins) {
    this.options.relativeToSelector = null
    this._makeRootMargin(margins)
    return this
  }
  observe (selector, callback) {
    if (typeof callback !== 'function') {
      return
    }
    this.options.selector = selector

    this.reqId = createIntersectionObserverCallbacks.push(callback)

    UniServiceJSBridge.publishHandler('requestComponentObserver', {
      reqId: this.reqId,
      component: this.component,
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
  if (!context._isVue) {
    options = context
    context = null
  }
  if (context) {
    return new ServiceIntersectionObserver(context, options)
  }
  return new ServiceIntersectionObserver(getCurrentPageVm('createIntersectionObserver'), options)
}
