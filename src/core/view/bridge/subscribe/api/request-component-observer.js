import 'intersection-observer'

import {
  normalizeDataset
} from 'uni-helpers/index'

import {
  findElm
} from './util'

function getRect (rect) {
  return {
    bottom: rect.bottom,
    height: rect.height,
    left: rect.left,
    right: rect.right,
    top: rect.top,
    width: rect.width
  }
}

const intersectionObservers = {}

export function requestComponentObserver ({
  reqId,
  component,
  options
}, pageId) {
  const pages = getCurrentPages()

  const page = pages.find(page => page.$page.id === pageId)

  if (!page) {
    throw new Error(`Not Found：Page[${pageId}]`)
  }

  const pageVm = page.$vm

  const $el = findElm(component, pageVm)

  const root = options.relativeToSelector ? $el.querySelector(options.relativeToSelector) : null

  const intersectionObserver = intersectionObservers[reqId] = new IntersectionObserver((entries, observer) => {
    entries.forEach(entrie => {
      UniViewJSBridge.publishHandler('onRequestComponentObserver', {
        reqId,
        res: {
          intersectionRatio: entrie.intersectionRatio,
          intersectionRect: getRect(entrie.intersectionRect),
          boundingClientRect: getRect(entrie.boundingClientRect),
          relativeRect: getRect(entrie.rootBounds),
          time: Date.now(),
          dataset: normalizeDataset(entrie.target.dataset || {}),
          id: entrie.target.id
        }
      }, pageVm.$page.id)
    })
  }, {
    root,
    rootMargin: options.rootMargin,
    threshold: options.thresholds
  })
  if (options.observeAll) {
    intersectionObserver.USE_MUTATION_OBSERVER = true
    Array.prototype.map.call($el.querySelectorAll(options.selector), el => {
      intersectionObserver.observe(el)
    })
  } else {
    intersectionObserver.USE_MUTATION_OBSERVER = false
    intersectionObserver.observe($el.querySelector(options.selector))
  }
}

export function destroyComponentObserver ({
  reqId
}) {
  const intersectionObserver = intersectionObservers[reqId]
  if (intersectionObserver) {
    intersectionObserver.disconnect()
    delete intersectionObservers[reqId]
    UniViewJSBridge.publishHandler('onRequestComponentObserver', {
      reqId,
      reqEnd: true
    })
  }
}
