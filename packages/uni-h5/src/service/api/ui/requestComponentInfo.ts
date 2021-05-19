import { ComponentPublicInstance } from 'vue'
import { getCostomDataset } from '@dcloudio/uni-shared'
import { getWindowOffset } from '@dcloudio/uni-core'
import { getContextInfo } from '@dcloudio/uni-components'

type NodeField = UniApp.NodeField

interface NodeInfo
  extends UniApp.NodeInfo,
    Omit<
      Partial<Record<keyof CSSStyleDeclaration, any>>,
      'top' | 'bottom' | 'left' | 'right' | 'height' | 'width'
    > {
  contextInfo?: ReturnType<typeof getContextInfo>
}

export interface Request {
  component: ComponentPublicInstance | undefined | null
  selector: string
  single: boolean
  fields: NodeField
}

function getRootInfo(fields: NodeField) {
  const info: NodeInfo = {}
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

function getNodeInfo(el: HTMLElement, fields: NodeField): NodeInfo {
  const info: NodeInfo = {}
  const { top } = getWindowOffset()
  if (fields.id) {
    info.id = el.id
  }
  if (fields.dataset) {
    info.dataset = getCostomDataset(el)
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
  if (Array.isArray(fields.computedStyle)) {
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
  return component ? component.$el : pageVm.$el
}

function getNodesInfo(
  pageVm: ComponentPublicInstance,
  component: ComponentPublicInstance | undefined | null,
  selector: string,
  single: boolean,
  fields: NodeField
): NodeInfo | NodeInfo[] | null {
  const parentElement = findElm(component, pageVm).parentElement
  if (!parentElement) {
    return single ? null : []
  }
  if (single) {
    const node = parentElement.querySelector(selector) as HTMLElement
    if (node) {
      return getNodeInfo(node, fields)
    }
    return null
  } else {
    let infos: NodeInfo[] = []
    const nodeList = parentElement.querySelectorAll(selector)
    if (nodeList && nodeList.length) {
      ;[].forEach.call(nodeList, (node) => {
        infos.push(getNodeInfo(node, fields))
      })
    }
    return infos
  }
}

export function requestComponentInfo(
  page: ComponentPublicInstance,
  reqs: Array<Request>,
  callback: (result: Array<NodeInfo | null>) => void
) {
  const result: Array<NodeInfo | null> = []
  reqs.forEach(({ component, selector, single, fields }) => {
    if (component === null) {
      result.push(getRootInfo(fields))
    } else {
      result.push(getNodesInfo(page, component, selector, single, fields))
    }
  })
  callback(result)
}
