import Vue from 'vue'
import 'intersection-observer'

const defaultOptions = {
  thresholds: [0],
  initialRatio: 0,
  observeAll: false
}

class MPIntersectionObserver {
  _intersectionObserver
  _el
  _options
  _root = null
  _rootMargin = '0'
  constructor (context, options) {
    this._el = context.$el
    this._options = Object.assign({}, defaultOptions, options)
  }
  _makeRootMargin (margins = {}) {
    this._rootMargin = ['top', 'right', 'bottom', 'left'].map(name => `${Number(margins[name]) || 0}px`).join(' ')
  }
  relativeTo (selector, margins) {
    this._root = this._el.querySelector(selector)
    this._makeRootMargin(margins)
  }
  relativeToViewport (margins) {
    this._root = null
    this._makeRootMargin(margins)
  }
  observe (selector, callback) {
    if (typeof callback !== 'function') {
      return
    }
    let options = {
      root: this._root,
      rootMargin: this._rootMargin,
      threshold: this._options.thresholds
    }
    let intersectionObserver = this._intersectionObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entrie => {
        callback({
          intersectionRatio: entrie.intersectionRatio,
          intersectionRect: entrie.intersectionRect,
          boundingClientRect: entrie.boundingClientRect,
          relativeRect: entrie.rootBounds,
          time: entrie.time,
          dataset: entrie.target.dataset,
          id: entrie.target.id
        })
      })
    }, options)
    if (this._options.observeAll) {
      intersectionObserver.USE_MUTATION_OBSERVER = true
      Array.prototype.map.call(this._el.querySelectorAll(selector), el => {
        intersectionObserver.observe(el)
      })
    } else {
      intersectionObserver.USE_MUTATION_OBSERVER = false
      intersectionObserver.observe(this._el.querySelector(selector))
    }
  }
  disconnect () {
    this._intersectionObserver && this._intersectionObserver.disconnect()
  }
}

export function createIntersectionObserver (context, options) {
  if (!(context instanceof Vue)) {
    options = context
    context = null
  }
  if (context) {
    return new MPIntersectionObserver(context, options)
  }
  const pages = getCurrentPages()
  if (pages.length) {
    context = pages[pages.length - 1]
    return new MPIntersectionObserver(context, options)
  } else {
    UniServiceJSBridge.emit('onError', 'createIntersectionObserver:fail')
  }
}
