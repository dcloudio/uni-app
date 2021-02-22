import {
  getTargetDataset
} from 'uni-helpers/index'

import getWindowOffset from 'uni-platform/helpers/get-window-offset'

import {
  findElm,
  elementMatchesPolyfill
} from './util'

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
    const documentElement = document.documentElement
    const body = document.body
    info.scrollLeft = documentElement.scrollLeft || body.scrollLeft || 0
    info.scrollTop = documentElement.scrollTop || body.scrollTop || 0
    info.scrollHeight = documentElement.scrollHeight || body.scrollHeight || 0
    info.scrollWidth = documentElement.scrollWidth || body.scrollWidth || 0
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
    info.dataset = getTargetDataset(el)
  }
  if (fields.rect || fields.size) {
    const rect = el.getBoundingClientRect()
    if (fields.rect) {
      info.left = rect.left
      info.right = rect.right
      info.top = rect.top - top
      info.bottom = rect.bottom - top
    }
    if (fields.size) {
      info.width = rect.width
      info.height = rect.height
    }
  }
  // TODO 组件 props
  if (Array.isArray(fields.properties)) {
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
      info.scrollHeight = 0
      info.scrollWidth = 0
    }
  }
  if (Array.isArray(fields.computedStyle)) {
    const sytle = getComputedStyle(el)
    fields.computedStyle.forEach(name => {
      info[name] = sytle[name]
    })
  }
  if (fields.context) {
    if (el.__vue__ && el.__vue__._getContextInfo) {
      info.context = el.__vue__._getContextInfo()
    }
  }
  return info
}

function getNodesInfo (pageVm, component, selector, single, fields) {
  const $el = elementMatchesPolyfill(findElm(component, pageVm))
  if (!$el || ($el && $el.nodeType === 8)) { // Comment
    return single ? null : []
  }
  if (single) {
    const node = $el.matches(selector) ? $el : $el.querySelector(selector)
    if (node) {
      return getNodeInfo(node, fields)
    }
    return null
  } else {
    let infos = []
    const nodeList = $el.querySelectorAll(selector)
    if (nodeList && nodeList.length) {
      infos = ([]).map.call(nodeList, node => {
        return getNodeInfo(node, fields)
      })
    }
    if ($el.matches(selector)) {
      infos.unshift(getNodeInfo($el, fields))
    }
    return infos
  }
}

export function requestComponentInfo ({
  reqId,
  reqs
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
  })
}
