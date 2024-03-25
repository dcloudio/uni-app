import { ComponentPublicInstance } from 'vue'
import { isArray } from '@vue/shared'
import { getCustomDataset } from '@dcloudio/uni-shared'
import { getWindowOffset } from '@dcloudio/uni-core'
import { getContextInfo } from '@dcloudio/uni-components'
import { SelectorQueryNodeInfo, SelectorQueryRequest } from '@dcloudio/uni-api'

type NodeField = UniApp.NodeField

function getRootInfo(fields: NodeField) {
  const info: SelectorQueryNodeInfo = {}
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

function getNodeInfo(
  el: HTMLElement,
  fields: NodeField
): SelectorQueryNodeInfo {
  const info: SelectorQueryNodeInfo = {}
  const { top, topWindowHeight } = getWindowOffset()
  if (fields.node) {
    // TODO
    const tagName = el.tagName.split('-')[1]
    if (tagName) {
      info.node = el.querySelector(tagName)
    }
  }
  if (fields.id) {
    info.id = el.id
  }
  if (fields.dataset) {
    info.dataset = getCustomDataset(el)
  }
  if (fields.rect || fields.size) {
    const rect = el.getBoundingClientRect()
    if (fields.rect) {
      info.left = rect.left
      info.right = rect.right
      info.top = rect.top - top - topWindowHeight
      info.bottom = rect.bottom - top - topWindowHeight
    }
    if (fields.size) {
      info.width = rect.width
      info.height = rect.height
    }
  }
  // TODO 组件 props
  if (isArray(fields.properties)) {
    fields.properties.forEach((prop) => {
      prop = prop.replace(/-([a-z])/g, function (e, t) {
        return t.toUpperCase()
      })
      // props
    })
  }
  if (fields.scrollOffset) {
    if (el.tagName === 'UNI-SCROLL-VIEW') {
      const scroll = el.children[0].children[0]
      info.scrollLeft = scroll.scrollLeft
      info.scrollTop = scroll.scrollTop
      info.scrollHeight = scroll.scrollHeight
      info.scrollWidth = scroll.scrollWidth
    } else {
      info.scrollLeft = 0
      info.scrollTop = 0
      info.scrollHeight = 0
      info.scrollWidth = 0
    }
  }
  if (isArray(fields.computedStyle)) {
    const sytle = getComputedStyle(el)
    fields.computedStyle.forEach((name) => {
      info[name as keyof CSSStyleDeclaration] =
        sytle[name as keyof CSSStyleDeclaration]
    })
  }
  if (fields.context) {
    info.contextInfo = getContextInfo(el)
  }
  return info
}

export function findElm(
  component: ComponentPublicInstance | undefined | null,
  pageVm: ComponentPublicInstance
): HTMLElement {
  if (!component) {
    return pageVm.$el
  }
  if (__APP_VIEW__) {
    // App 端，传入的是 nodeId
    return (window as any).__$__(component).$
  }
  return component.$el
}

function matches(element: HTMLElement, selectors: string) {
  type Matches = typeof element.matches
  interface HTMLElementExt extends HTMLElement {
    matchesSelector?: Matches
    mozMatchesSelector?: Matches
    msMatchesSelector?: Matches
    oMatchesSelector?: Matches
  }

  const matches =
    element.matches ||
    (element as HTMLElementExt).matchesSelector ||
    (element as HTMLElementExt).mozMatchesSelector ||
    (element as HTMLElementExt).msMatchesSelector ||
    (element as HTMLElementExt).oMatchesSelector ||
    element.webkitMatchesSelector ||
    function (this: HTMLElement, selectors: string) {
      const matches = (this.parentElement as HTMLElement).querySelectorAll(
        selectors
      )
      let i = matches.length
      while (--i >= 0 && matches.item(i) !== this) {}
      return i > -1
    }

  return matches.call(element, selectors)
}

function getNodesInfo(
  pageVm: ComponentPublicInstance,
  component: ComponentPublicInstance | undefined | null,
  selector: string,
  single: boolean,
  fields: NodeField
): SelectorQueryNodeInfo | SelectorQueryNodeInfo[] | null {
  const selfElement = findElm(component, pageVm)
  const parentElement = selfElement.parentElement
  if (!parentElement) {
    return single ? null : []
  }
  // 使用片段时从父元素查找，会超出当前组件范围
  const { nodeType } = selfElement
  // ssr 时，可能为8
  const maybeFragment = nodeType === 3 || nodeType === 8
  if (single) {
    const node = maybeFragment
      ? (parentElement.querySelector(selector) as HTMLElement)
      : matches(selfElement, selector)
      ? selfElement
      : (selfElement.querySelector(selector) as HTMLElement)
    if (node) {
      return getNodeInfo(node, fields)
    }
    return null
  } else {
    let infos: SelectorQueryNodeInfo[] = []
    const nodeList = (
      maybeFragment ? parentElement : selfElement
    ).querySelectorAll(selector)
    if (nodeList && nodeList.length) {
      ;[].forEach.call(nodeList, (node) => {
        infos.push(getNodeInfo(node, fields))
      })
    }
    if (!maybeFragment && matches(selfElement, selector)) {
      infos.unshift(getNodeInfo(selfElement, fields))
    }
    return infos
  }
}

export function requestComponentInfo(
  page: ComponentPublicInstance,
  reqs: Array<SelectorQueryRequest>,
  callback: (result: Array<SelectorQueryNodeInfo | null>) => void
) {
  const result: Array<SelectorQueryNodeInfo | null> = []
  reqs.forEach(({ component, selector, single, fields }) => {
    if (component === null) {
      result.push(getRootInfo(fields))
    } else {
      result.push(getNodesInfo(page, component, selector, single, fields))
    }
  })
  callback(result)
}
