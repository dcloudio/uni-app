import {
  normalizeDataset
} from 'uni-helpers/index'

import getWindowOffset from 'uni-platform/helpers/get-window-offset'

function getRootInfo (fields) {
  const info = {}
  if (fields.id) {
    info.id = ''
  }
  if (fields.dataset) {
    info.dataset = {}
  }
  if (fields.rect) {
    info.left = 0
    info.right = 0
    info.top = 0
    info.bottom = 0
  }
  if (fields.size) {
    info.width = document.documentElement.clientWidth
    info.height = document.documentElement.clientHeight
  }
  if (fields.scrollOffset) {
    info.scrollLeft = document.documentElement.scrollLeft || document.body.scrollLeft || 0
    info.scrollTop = document.documentElement.scrollTop || document.body.scrollTop || 0
  }
  return info
}

function getNodeInfo (el, fields) {
  const info = {}
  const {
    top
  } = getWindowOffset()
  if (fields.id) {
    info.id = el.id
  }
  if (fields.dataset) {
    info.dataset = normalizeDataset(el.dataset || {})
  }
  if (fields.rect || fields.size) {
    const rect = el.getBoundingClientRect()
    if (fields.rect) {
      info.left = rect.left
      info.right = rect.right
      info.top = rect.top - top
      info.bottom = rect.bottom
    }
    if (fields.size) {
      info.width = rect.width
      info.height = rect.height
    }
  }
  // TODO 组件 props
  if (fields.properties) {
    fields.properties.forEach(prop => {
      prop = prop.replace(/-([a-z])/g, function (e, t) {
        return t.toUpperCase()
      })
      // props
    })
  }
  if (fields.scrollOffset) {
    if (el.tagName === 'UNI-SCROLL-VIEW' && el.__vue__ && el.__vue__.getScrollPosition) {
      Object.assign(info, el.__vue__.getScrollPosition())
    } else {
      info.scrollLeft = 0
      info.scrollTop = 0
    }
  }
  return info
}

function getNodesInfo (pageVm, component, selector, single, fields) {
  /* eslint-disable no-mixed-operators */
  const $el = component && component.$el || pageVm.$el
  if (single) {
    const node = $el && ($el.matches(selector) ? $el : $el.querySelector(selector))
    if (node) {
      return getNodeInfo(node, fields)
    }
    return null
  } else if (!$el) {
    return []
  } else {
    let infos = []
    const nodeList = $el.querySelectorAll(selector)
    if (nodeList && nodeList.length) {
      infos = ([]).map.call(nodeList, node => {
        return getNodeInfo(node, fields)
      })
    }
    if ($el.matches(selector)) {
      infos.unshift($el)
    }
    return infos
  }
}

export default function requestComponentInfo ({
  reqId,
  reqs
}, pageId) {
  const pages = getCurrentPages() // 跨平台时，View 层也应该实现该方法，举例 App 上，View 层的 getCurrentPages 返回长度为1的当前页面数组

  const pageVm = pages.find(page => page.$page.id === pageId)

  if (!pageVm) {
    // TODO 是否需要 defer
    throw new Error(`Not Found：Page[${pageId}]`)
  }

  const result = []
  reqs.forEach(function ({
    component,
    selector,
    single,
    fields
  }) {
    if (component === 0) {
      result.push(getRootInfo(fields))
    } else {
      result.push(getNodesInfo(pageVm, component, selector, single, fields))
    }
  })

  UniViewJSBridge.publishHandler('onRequestComponentInfo', {
    reqId,
    res: result
  }, pageVm.$page.id)
}
