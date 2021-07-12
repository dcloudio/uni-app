import { hasOwn } from '@vue/shared'
import { Component, createApp, reactive } from 'vue'
import {
  decodeAttr,
  // formatLog,
  parseEventName,
  UniNodeJSON,
} from '@dcloudio/uni-shared'
import { UniNode } from '../elements/UniNode'
import { createInvoker } from '../modules/events'
import { createWrapper } from '.'

export class UniComponent extends UniNode {
  declare $: Element
  private $props!: Record<string, any>
  private $holder?: Element
  // private $fragment: DocumentFragment | null = null
  constructor(
    id: number,
    tag: string,
    component: Component,
    nodeJson: Partial<UniNodeJSON>,
    selector?: string
  ) {
    super(id, tag)
    const container = document.createElement('div')
    this.$props = reactive({})
    this.init(nodeJson)
    createApp(createWrapper(component, this.$props)).mount(container)
    this.$ = container.firstElementChild!
    if (selector) {
      this.$holder = this.$.querySelector(selector)!
    }
    if (hasOwn(nodeJson, 't')) {
      this.setText(nodeJson.t || '')
    }
  }
  init(nodeJson: Partial<UniNodeJSON>) {
    const { a } = nodeJson
    if (a) {
      Object.keys(a).forEach((n) => {
        this.setAttr(n, a[n])
      })
    }
  }
  setText(text: string) {
    ;(this.$holder || this.$).textContent = text
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
  // get fragment() {
  //   if (!this.$fragment) {
  //     this.$fragment = document.createDocumentFragment()
  //   }
  //   return this.$fragment
  // }
  appendChild(node: Element) {
    // if (!this.$) {
    //   // 可能还未初始化，临时存放
    //   if (__DEV__) {
    //     console.log(
    //       formatLog(this.tag, 'fragment', 'appendChild', node.tagName)
    //     )
    //   }
    //   return this.fragment.appendChild(node)
    // }
    return (this.$holder || this.$).appendChild(node)
  }
  insertBefore(newChild: Node, refChild: Node) {
    // if (!this.$) {
    //   // 可能还未初始化，临时存放
    //   if (__DEV__) {
    //     console.log(
    //       formatLog(
    //         this.tag,
    //         'fragment',
    //         'insertBefore',
    //         (newChild as Element).tagName,
    //         (refChild as Element).tagName
    //       )
    //     )
    //   }
    //   return this.fragment.insertBefore(newChild, refChild)
    // }
    return (this.$holder || this.$).insertBefore(newChild, refChild)
  }
}
