import type { ComponentInternalInstance } from 'vue'
import { extend } from '@vue/shared'

import type { UniElement } from './Element'
import { DOMException } from './DOMException'
import {
  type UniEventListener,
  UniEventTarget,
  normalizeEventType,
} from './Event'
import type { UniCSSStyleDeclarationJSON } from './Style'
import { encodeModifier } from './encode'

export const NODE_TYPE_PAGE = 0
export const NODE_TYPE_ELEMENT = 1
export const NODE_TYPE_TEXT = 3
export const NODE_TYPE_COMMENT = 8

type UniNodeType =
  | typeof NODE_TYPE_PAGE
  | typeof NODE_TYPE_ELEMENT
  | typeof NODE_TYPE_TEXT
  | typeof NODE_TYPE_COMMENT

function sibling(node: UniNode, type: 'n' | 'p') {
  const { parentNode } = node
  if (!parentNode) {
    return null
  }
  const { childNodes } = parentNode
  return childNodes[childNodes.indexOf(node) + (type === 'n' ? 1 : -1)] || null
}

function removeNode(node: UniNode) {
  const { parentNode } = node
  if (parentNode) {
    const { childNodes } = parentNode
    const index = childNodes.indexOf(node)
    if (index > -1) {
      node.parentNode = null
      childNodes.splice(index, 1)
    }
  }
}

function checkNodeId(node: UniNode) {
  if (!node.nodeId && node.pageNode) {
    node.nodeId = node.pageNode!.genId()
  }
}

export interface IUniPageNode {
  pageId: number
  pageNode: IUniPageNode | null
  isUnmounted: boolean
  genId: () => number
  push: (...args: any[]) => void
  onCreate: (thisNode: UniNode, nodeName: string | number) => UniNode
  onInsertBefore: (
    thisNode: UniNode,
    newChild: UniNode,
    refChild: UniNode | null
  ) => UniNode
  onRemoveChild: (oldChild: UniNode) => UniNode
  onAddEvent: (thisNode: UniNode, name: string, flag: number) => void
  onAddWxsEvent: (
    thisNode: UniNode,
    name: string,
    wxsEvent: string,
    flag: number
  ) => void
  onRemoveEvent: (thisNode: UniNode, name: string) => void
  onSetAttribute: (
    thisNode: UniNode,
    qualifiedName: string,
    value: unknown
  ) => void
  onRemoveAttribute: (thisNode: UniNode, qualifiedName: string) => void
  onTextContent: (thisNode: UniNode, text: string) => void
  onNodeValue: (thisNode: UniNode, val: string | null) => void
}
// 为优化性能，各平台不使用proxy来实现node的操作拦截，而是直接通过pageNode定制
export class UniNode extends UniEventTarget {
  nodeId?: number
  nodeType: UniNodeType
  nodeName: string
  childNodes: UniNode[]

  pageNode: IUniPageNode | null = null
  parentNode: UniNode | null = null

  __vueParentComponent?: ComponentInternalInstance

  protected _text: string | null = null

  constructor(
    nodeType: UniNodeType,
    nodeName: string,
    container: UniElement | IUniPageNode
  ) {
    super()
    if (container) {
      const { pageNode } = container
      if (pageNode) {
        this.pageNode = pageNode
        this.nodeId = pageNode!.genId()

        !pageNode!.isUnmounted && pageNode!.onCreate(this, nodeName)
      }
    }
    this.nodeType = nodeType
    this.nodeName = nodeName
    this.childNodes = []
  }

  get firstChild(): UniNode | null {
    return this.childNodes[0] || null
  }

  get lastChild(): UniNode | null {
    const { childNodes } = this
    const length = childNodes.length
    return length ? childNodes[length - 1] : null
  }

  get nextSibling(): UniNode | null {
    return sibling(this, 'n')
  }

  get nodeValue() {
    return null
  }

  set nodeValue(_val: string | null) {}

  get textContent() {
    return this._text || ''
  }

  set textContent(text: string) {
    this._text = text
    if (this.pageNode && !this.pageNode.isUnmounted) {
      this.pageNode.onTextContent(this, text)
    }
  }

  get parentElement(): UniElement | null {
    const { parentNode } = this
    if (parentNode && parentNode.nodeType === NODE_TYPE_ELEMENT) {
      return parentNode as unknown as UniElement
    }
    return null
  }

  get previousSibling(): UniNode | null {
    return sibling(this, 'p')
  }

  appendChild(newChild: UniNode): UniNode {
    return this.insertBefore(newChild, null)
  }

  cloneNode(deep?: boolean): UniNode {
    const cloned = extend(
      Object.create(Object.getPrototypeOf(this)),
      this
    ) as UniNode
    const { attributes } = cloned as unknown as UniElement
    if (attributes) {
      ;(cloned as unknown as UniElement).attributes = extend({}, attributes)
    }
    if (deep) {
      cloned.childNodes = cloned.childNodes.map((childNode) =>
        childNode.cloneNode(true)
      )
    }
    return cloned
  }

  insertBefore(newChild: UniNode, refChild: UniNode | null): UniNode {
    // 先从现在的父节点移除（注意：不能触发onRemoveChild，否则会生成先remove该 id，再 insert）
    removeNode(newChild)
    newChild.pageNode = this.pageNode
    newChild.parentNode = this
    checkNodeId(newChild)
    const { childNodes } = this
    if (refChild) {
      const index = childNodes.indexOf(refChild)
      if (index === -1) {
        throw new DOMException(
          `Failed to execute 'insertBefore' on 'Node': The node before which the new node is to be inserted is not a child of this node.`
        )
      }
      childNodes.splice(index, 0, newChild)
    } else {
      childNodes.push(newChild)
    }
    return this.pageNode && !this.pageNode.isUnmounted
      ? this.pageNode.onInsertBefore(this, newChild, refChild)
      : newChild
  }

  removeChild(oldChild: UniNode): UniNode {
    const { childNodes } = this
    const index = childNodes.indexOf(oldChild)
    if (index === -1) {
      throw new DOMException(
        `Failed to execute 'removeChild' on 'Node': The node to be removed is not a child of this node.`
      )
    }
    oldChild.parentNode = null
    childNodes.splice(index, 1)
    return this.pageNode && !this.pageNode.isUnmounted
      ? this.pageNode.onRemoveChild(oldChild)
      : oldChild
  }
}

type DictArray = [number, number][]

export interface UniNodeJSONMinify {
  /**
   * nodeId
   */
  i: number
  /**
   * nodeName
   */
  n: string | number
  /**
   * attributes
   */
  a: DictArray
  /**
   * listeners
   */
  e: DictArray
  /**
   * wxs listeners
   */
  w: [number, [number, number]][]
  /**
   * style
   */
  s?: DictArray
  /**
   * text
   */
  t?: number
}
export interface UniNodeJSON {
  /**
   * nodeId
   */
  i: number
  /**
   * nodeName
   */
  n: string | number
  /**
   * attributes
   */
  a: Record<string, unknown>
  /**
   * listeners
   */
  e: Record<string, number>
  /**
   * wxs listeners
   */
  w: Record<string, [string, number]>
  /**
   * style
   */
  s?: UniCSSStyleDeclarationJSON
  /**
   * text
   */
  t?: string
}

export const ATTR_CLASS = 'class'
export const ATTR_STYLE = 'style'
export const ATTR_INNER_HTML = 'innerHTML'
export const ATTR_TEXT_CONTENT = 'textContent'
export const ATTR_V_SHOW = '.vShow'
export const ATTR_V_OWNER_ID = '.vOwnerId'
export const ATTR_V_RENDERJS = '.vRenderjs'

export const ATTR_CHANGE_PREFIX = 'change:'
export class UniBaseNode extends UniNode {
  attributes: Record<string, unknown> = Object.create(null)
  style: null | string | Record<string, string | string[]> = null
  vShow: null | boolean = null

  protected _html: string | null = null

  constructor(
    nodeType: UniNodeType,
    nodeName: string,
    container: UniElement | IUniPageNode
  ) {
    super(nodeType, nodeName, container)
  }

  get className() {
    return (this.attributes[ATTR_CLASS] || '') as string
  }

  set className(val: string) {
    this.setAttribute(ATTR_CLASS, val)
  }

  get innerHTML() {
    return ''
  }

  set innerHTML(html: string) {
    this._html = html
  }

  addEventListener(
    type: string,
    listener: UniEventListener,
    options?: AddEventListenerOptions
  ) {
    super.addEventListener(type, listener, options)
    if (this.pageNode && !this.pageNode.isUnmounted) {
      if (listener.wxsEvent) {
        this.pageNode.onAddWxsEvent(
          this,
          normalizeEventType(type, options),
          listener.wxsEvent,
          encodeModifier(listener.modifiers || [])
        )
      } else {
        this.pageNode.onAddEvent(
          this,
          normalizeEventType(type, options),
          encodeModifier(listener.modifiers || [])
        )
      }
    }
  }

  removeEventListener(
    type: string,
    callback: UniEventListener,
    options?: EventListenerOptions
  ) {
    super.removeEventListener(type, callback, options)
    if (this.pageNode && !this.pageNode.isUnmounted) {
      this.pageNode.onRemoveEvent(this, normalizeEventType(type, options))
    }
  }

  getAttribute(qualifiedName: string) {
    if (qualifiedName === ATTR_STYLE) {
      return this.style
    }
    return this.attributes[qualifiedName]
  }

  removeAttribute(qualifiedName: string): void {
    if (qualifiedName == ATTR_STYLE) {
      this.style = null
    } else {
      delete this.attributes[qualifiedName]
    }
    if (this.pageNode && !this.pageNode.isUnmounted) {
      this.pageNode.onRemoveAttribute(this, qualifiedName)
    }
  }

  setAttribute(qualifiedName: string, value: unknown): void {
    if (qualifiedName === ATTR_STYLE) {
      this.style = value as string | Record<string, string | string[]>
    } else {
      this.attributes[qualifiedName] = value
    }
    if (this.pageNode && !this.pageNode.isUnmounted) {
      this.pageNode.onSetAttribute(this, qualifiedName, value)
    }
  }

  toJSON({
    attr,
    normalize,
  }: {
    attr?: boolean
    children?: boolean
    normalize?: (val: any, includeValue?: boolean) => any | number
  } = {}) {
    const { attributes, style, listeners, _text } = this
    const res: Partial<UniNodeJSON> = {}
    if (Object.keys(attributes).length) {
      res.a = normalize ? normalize(attributes) : attributes
    }
    const events = Object.keys(listeners)
    if (events.length) {
      let w: Record<string, [string | number, number]> | undefined = undefined
      const e: Record<string, number> = {}
      events.forEach((name) => {
        const handlers = listeners[name]
        if (handlers.length) {
          // 可能存在多个 handler 且不同 modifiers 吗？
          const { wxsEvent, modifiers } = handlers[0]
          const modifier = encodeModifier(modifiers || [])
          if (!wxsEvent) {
            e[name] = modifier
          } else {
            if (!w) {
              w = {}
            }
            w[name] = [normalize ? normalize(wxsEvent!) : wxsEvent, modifier]
          }
        }
      })
      res.e = normalize ? normalize(e, false) : e
      if (w) {
        res.w = normalize ? normalize(w, false) : w
      }
    }
    if (style !== null) {
      res.s = normalize ? normalize(style) : style
    }
    if (!attr) {
      res.i = this.nodeId
      res.n = this.nodeName
    }
    if (_text !== null) {
      res.t = normalize ? normalize(_text) : _text
    }
    return res
  }
}
