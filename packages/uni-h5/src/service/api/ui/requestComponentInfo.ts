import type { ComponentPublicInstance, VNode } from 'vue'
import { isArray } from '@vue/shared'
import { getCustomDataset } from '@dcloudio/uni-shared'
import { getWindowOffset } from '@dcloudio/uni-core'
import { getContextInfo } from '@dcloudio/uni-components'
import type {
  SelectorQueryNodeInfo,
  SelectorQueryRequest,
} from '@dcloudio/uni-api'

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

class QuerySelectorHelper {
  _element: UniElement
  _commentStartVNode: VNode | undefined

  constructor(element: UniElement, vnode: VNode | undefined) {
    this._element = element
    this._commentStartVNode = vnode
  }

  static queryElement(
    element: UniElement,
    selector: string,
    all: boolean,
    vnode: VNode | undefined
  ): any | null {
    return new QuerySelectorHelper(element, vnode).query(selector, all)
  }

  query(selector: string, all: boolean): any | null {
    const isFragment =
      // @ts-expect-error
      this._element.nodeType === 3 || this._element.nodeType === 8
    if (isFragment) {
      return this.queryFragment(this._element, selector, all)
    } else {
      return all
        ? this.querySelectorAll(this._element, selector)
        : this.querySelector(this._element, selector)
    }
  }

  queryFragment(el: UniElement, selector: string, all: boolean): any | null {
    let current = el.nextSibling
    if (current == null) {
      return null
    }

    let depth = 65535
    if (all) {
      const result1: Array<any> = []
      while (depth > 0) {
        depth--
        // @ts-expect-error
        if (current.nodeName && current.nodeName == '#comment') {
          // @ts-expect-error
          current = current.nextSibling
          continue
        }
        const queryResult = this.querySelectorAll(current!, selector)
        if (queryResult != null) {
          result1.push(...queryResult)
        }
        // @ts-expect-error
        current = current.nextSibling
        if (current == null || this._commentStartVNode!.anchor == current) {
          break
        }
      }
      return result1
    } else {
      let result2: any | null = null
      while (depth > 0) {
        depth--
        // @ts-expect-error
        if (current.nodeName && current.nodeName == '#comment') {
          // @ts-expect-error
          current = current.nextSibling
          continue
        }
        result2 = this.querySelector(current!, selector)
        // @ts-expect-error
        current = current.nextSibling
        if (
          result2 != null ||
          current == null ||
          this._commentStartVNode!.anchor == current
        ) {
          break
        }
      }
      return result2
    }
  }

  querySelector(
    element: UniElement,
    selector: string
  ): SelectorQueryNodeInfo | null {
    let element2 = this.querySelf(element, selector)
    if (element2 == null) {
      element2 = element.querySelector(selector)
    }
    if (element2 != null) {
      return this.getNodeInfo(element2)
    }
    return null
  }

  querySelectorAll(
    element: UniElement,
    selector: string
  ): Array<SelectorQueryNodeInfo> | null {
    const nodesInfoArray: Array<SelectorQueryNodeInfo> = []
    const element2 = this.querySelf(element, selector)
    if (element2 != null) {
      nodesInfoArray.push(this.getNodeInfo(element))
    }
    const findNodes = element.querySelectorAll(selector)
    findNodes?.forEach((el: UniElement) => {
      nodesInfoArray.push(this.getNodeInfo(el))
    })
    return nodesInfoArray
  }

  querySelf(element: UniElement | null, selector: string): UniElement | null {
    if (element == null || selector.length < 2) {
      return null
    }

    const selectorType = selector.charAt(0)
    const selectorName = selector.slice(1)
    // @ts-expect-error
    if (selectorType == '.' && element.classList.contains(selectorName)) {
      return element
    }
    if (selectorType == '#' && element.getAttribute('id') == selectorName) {
      return element
    }
    if (selector.toUpperCase() == element.nodeName.toUpperCase()) {
      return element
    }

    return null
  }

  getNodeInfo(element: UniElement): SelectorQueryNodeInfo {
    const rect = element.getBoundingClientRect()
    const nodeInfo = {
      id: element.getAttribute('id')?.toString(),
      dataset: null,
      left: rect.left,
      top: rect.top,
      right: rect.right,
      bottom: rect.bottom,
      width: rect.width,
      height: rect.height,
    } as SelectorQueryNodeInfo
    return nodeInfo
  }
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
  //#if _X_ && !_NODE_JS_
  if (maybeFragment)
    return QuerySelectorHelper.queryElement(
      selfElement as unknown as UniElement,
      selector,
      !single,
      component?.$.subTree
    )
  //#endif

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
