import { extend } from '@vue/shared'

import { UniElement } from './Element'
import { DOMException } from './DOMException'
import { normalizeEventType, UniEventListener, UniEventTarget } from './Event'
import {
  proxyStyle,
  UniCSSStyleDeclaration,
  UniCSSStyleDeclarationJSON,
} from './Style'

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
  if (!node.nodeId) {
    node.nodeId = node.pageNode!.genId()
  }
}

export interface IUniPageNode {
  pageId: number
  genId: () => number
  push: (...args: any[]) => void
}

export class UniNode extends UniEventTarget {
  nodeId?: number
  nodeType: UniNodeType
  nodeName: string
  childNodes: UniNode[]

  pageNode: IUniPageNode | null = null
  parentNode: UniNode | null = null

  protected _text: string | null = null

  constructor(nodeType: UniNodeType, nodeName: string) {
    super()
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

  appendChild<T extends UniNode>(newChild: T): T {
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

  insertBefore<T extends UniNode>(newChild: T, refChild: UniNode | null): T {
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
      childNodes.splice(childNodes.indexOf(refChild), 0, newChild)
    } else {
      childNodes.push(newChild)
    }
    return newChild
  }

  removeChild<T extends UniNode>(oldChild: T): T {
    const { childNodes } = this
    const index = childNodes.indexOf(oldChild)
    if (index === -1) {
      throw new DOMException(
        `Failed to execute 'removeChild' on 'Node': The node to be removed is not a child of this node.`
      )
    }
    oldChild.parentNode = null
    childNodes.splice(index, 1)
    return oldChild
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
  n: string
  /**
   * attributes
   */
  a: Record<string, unknown>
  /**
   * style
   */
  s: UniCSSStyleDeclarationJSON
  /**
   * text
   */
  t?: string
}

export class UniBaseNode extends UniNode {
  attributes: Record<string, unknown> = Object.create(null)
  style: UniCSSStyleDeclaration

  protected _html: string | null = null

  constructor(nodeType: UniNodeType, nodeName: string) {
    super(nodeType, nodeName)
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
    const normalized = normalizeEventType(type)
    if (!this.attributes[normalized]) {
      this.setAttribute(normalized, 1)
    }
  }

  removeEventListener(
    type: string,
    callback: UniEventListener,
    options?: EventListenerOptions
  ) {
    super.removeEventListener(type, callback, options)
    const normalized = normalizeEventType(type)
    if (this.attributes[normalized]) {
      this.removeAttribute(normalized)
    }
  }

  getAttribute(qualifiedName: string) {
    return this.attributes[qualifiedName]
  }

  removeAttribute(qualifiedName: string): void {
    delete this.attributes[qualifiedName]
  }

  setAttribute(qualifiedName: string, value: unknown): void {
    this.attributes[qualifiedName] = value
  }

  toJSON() {
    const res: UniNodeJSON = {
      i: this.nodeId!,
      n: this.nodeName,
      a: this.attributes,
      s: this.style.toJSON(),
    }
    if (this._text !== null) {
      res.t = this._text
    }
    return res
  }
}
