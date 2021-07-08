import { extend } from '@vue/shared'

import { UniElement } from './Element'
import { DOMException } from './DOMException'
import { normalizeEventType, UniEventListener, UniEventTarget } from './Event'
import {
  proxyStyle,
  UniCSSStyleDeclaration,
  UniCSSStyleDeclarationJSON,
} from './Style'
import { encodeAttr, encodeModifier, encodeTag } from './encode'

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
    parentNode.removeChild(node)
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

        !pageNode!.isUnmounted && pageNode!.onCreate(this, encodeTag(nodeName))
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
   * style
   */
  s?: UniCSSStyleDeclarationJSON
  /**
   * text
   */
  t?: string
}

export class UniBaseNode extends UniNode {
  attributes: Record<string, unknown> = Object.create(null)
  style: UniCSSStyleDeclaration

  protected _html: string | null = null

  constructor(
    nodeType: UniNodeType,
    nodeName: string,
    container: UniElement | IUniPageNode
  ) {
    super(nodeType, nodeName, container)
    this.style = proxyStyle(new UniCSSStyleDeclaration())
  }

  get className() {
    return (this.attributes['class'] || '') as string
  }

  set className(val: string) {
    this.setAttribute('class', val)
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
    this.setAttribute(
      normalizeEventType(type, options),
      encodeModifier(listener.modifiers || [])
    )
  }

  removeEventListener(
    type: string,
    callback: UniEventListener,
    options?: EventListenerOptions
  ) {
    super.removeEventListener(type, callback, options)
    this.removeAttribute(normalizeEventType(type, options))
  }

  getAttribute(qualifiedName: string) {
    return this.attributes[encodeAttr(qualifiedName)]
  }

  removeAttribute(qualifiedName: string): void {
    qualifiedName = encodeAttr(qualifiedName)
    delete this.attributes[qualifiedName]
    if (this.pageNode && !this.pageNode.isUnmounted) {
      this.pageNode.onRemoveAttribute(this, qualifiedName)
    }
  }

  setAttribute(qualifiedName: string, value: unknown): void {
    qualifiedName = encodeAttr(qualifiedName)
    this.attributes[qualifiedName] = value
    if (this.pageNode && !this.pageNode.isUnmounted) {
      this.pageNode.onSetAttribute(this, qualifiedName, value)
    }
  }

  toJSON(opts: { attr?: boolean; children?: boolean } = {}) {
    const res: Partial<UniNodeJSON> = {
      a: this.attributes,
      s: this.style.toJSON(),
    }
    if (!opts.attr) {
      res.i = this.nodeId
      res.n = encodeTag(this.nodeName)
    }
    if (this._text !== null) {
      res.t = this._text
    }
    return res
  }
}
