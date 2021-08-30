import 'intersection-observer'

import {
  getTargetDataset
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

// 在相交比很小的情况下，Chrome会返回相交为0
function rectifyIntersectionRatio (entrie) {
  const {
    intersectionRatio,
    boundingClientRect: { height: overAllHeight, width: overAllWidth },
    intersectionRect: { height: intersectionHeight, width: intersectionWidth }
  } = entrie

  if (intersectionRatio !== 0) return intersectionRatio

  return intersectionHeight === overAllHeight
    ? intersectionWidth / overAllWidth
    : intersectionHeight / overAllHeight
}

const intersectionObservers = {}

export function requestComponentObserver ({
  reqId,
  component,
  options
}, pageId) {
  let pageVm
  if (pageId._isVue) {
    pageVm = pageId
  } else {
    const pages = getCurrentPages() // 跨平台时，View 层也应该实现该方法，举例 App 上，View 层的 getCurrentPages 返回长度为1的当前页面数组
    const page = pages.find(page => page.$page.id === pageId)
    if (!page) {
      throw new Error(`Not Found：Page[${pageId}]`)
    }
    pageVm = page.$vm
  }
  const $el = findElm(component, pageVm)
  const root = options.relativeToSelector ? $el.querySelector(options.relativeToSelector) : null
  const intersectionObserver = intersectionObservers[reqId] = new IntersectionObserver((entries, observer) => {
    entries.forEach(entrie => {
      UniViewJSBridge.publishHandler('onRequestComponentObserver', {
        reqId,
        res: {
          intersectionRatio: rectifyIntersectionRatio(entrie),
          intersectionRect: getRect(entrie.intersectionRect),
          boundingClientRect: getRect(entrie.boundingClientRect),
          relativeRect: getRect(entrie.rootBounds),
          time: Date.now(),
          dataset: getTargetDataset(entrie.target),
          id: entrie.target.id
        }
      })
    })
  }, {
    root,
    rootMargin: options.rootMargin,
    threshold: options.thresholds
  })
  if (options.observeAll) {
    intersectionObserver.USE_MUTATION_OBSERVER = true
    Array.prototype.map.call($el.querySelectorAll(options.selector), el => {
      if (!el) {
        console.warn(`Node ${options.selector} is not found. Intersection observer will not trigger.`)
        return
      }
      intersectionObserver.observe(el)
    })
  } else {
    intersectionObserver.USE_MUTATION_OBSERVER = false
    const el = $el.querySelector(options.selector)
    if (!el) {
      console.warn(`Node ${options.selector} is not found. Intersection observer will not trigger.`)
      return
    }
    intersectionObserver.observe(el)
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
