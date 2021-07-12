import { hasOwn } from '@vue/shared'
import { Component, createApp, reactive } from 'vue'
import {
  decodeAttr,
  formatLog,
  parseEventName,
  UniNodeJSON,
} from '@dcloudio/uni-shared'
import { UniNode } from '../elements/UniNode'
import { createInvoker } from '../modules/events'
import { createWrapper } from '.'

export class UniComponent extends UniNode {
  private $component: Component
  private $props!: Record<string, any>
  private $selector?: string
  private $holder?: Element
  private $fragment: DocumentFragment | null = null
  constructor(
    id: number,
    tag: string,
    component: Component,
    selector?: string
  ) {
    super(id, tag)
    this.$component = component
    if (selector) {
      this.$selector = selector
    }
  }
  init(nodeJson: Partial<UniNodeJSON>) {
    const container = document.createElement('div')
    this.$props = reactive({})
    const { a } = nodeJson
    if (a) {
      Object.keys(a).forEach((n) => {
        this.setAttr(n, a[n])
      })
    }
    createApp(createWrapper(this.$component, this.$props)).mount(container)
    this.$ = container.firstElementChild!
    if (hasOwn(nodeJson, 't')) {
      this.$.textContent = nodeJson.t || ''
    }
    if (this.$selector) {
      this.$holder = this.$.querySelector(this.$selector)!
    }
    if (this.$fragment) {
      if (__DEV__) {
        console.log(formatLog(this.tag, 'init', 'fragment', this.$fragment))
      }

      ;(this.$holder || this.$).appendChild(this.$fragment)
      this.$fragment = null
    }
  }
  setAttr(name: string, value: unknown) {
    const decoded = decodeAttr(name)
    if (name.indexOf('.e') === 0) {
      this.$props[decoded] = createInvoker(
        this.id,
        value as number,
        parseEventName(decoded)[1]
      )
    } else {
      this.$props[decoded] = value
    }
  }
  removeAttr(name: string) {
    this.$props[decodeAttr(name)] = null
  }
  get fragment() {
    if (!this.$fragment) {
      this.$fragment = document.createDocumentFragment()
    }
    return this.$fragment
  }
  appendChild(node: Element) {
    if (!this.$) {
      // 可能还未初始化，临时存放
      if (__DEV__) {
        console.log(
          formatLog(this.tag, 'fragment', 'appendChild', node.tagName)
        )
      }
      return this.fragment.appendChild(node)
    }
    return (this.$holder || this.$).appendChild(node)
  }
  insertBefore(newChild: Node, refChild: Node) {
    if (!this.$) {
      // 可能还未初始化，临时存放
      if (__DEV__) {
        console.log(
          formatLog(
            this.tag,
            'fragment',
            'insertBefore',
            (newChild as Element).tagName,
            (refChild as Element).tagName
          )
        )
      }
      return this.fragment.insertBefore(newChild, refChild)
    }
    return (this.$holder || this.$).insertBefore(newChild, refChild)
  }
}
