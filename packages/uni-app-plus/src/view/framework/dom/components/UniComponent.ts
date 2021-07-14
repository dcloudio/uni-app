import { hasOwn } from '@vue/shared'
import { Component, ComponentInternalInstance, createApp, reactive } from 'vue'
import {
  decodeAttr,
  decodeEvent,
  formatLog,
  parseEventName,
  UniNodeJSON,
} from '@dcloudio/uni-shared'
import { UniNode } from '../elements/UniNode'
import { createInvoker } from '../modules/events'
import { createWrapper, UniCustomElement } from '.'
import { $ } from '../page'

export class UniComponent extends UniNode {
  declare $: UniCustomElement
  protected $props!: Record<string, any>
  protected $holder?: Element
  constructor(
    id: number,
    tag: string,
    component: Component,
    parentNodeId: number,
    nodeJson: Partial<UniNodeJSON>,
    selector?: string
  ) {
    super(id, tag, parentNodeId)
    const container = document.createElement('div')
    ;(container as any).__vueParent = getVueParent(this)
    this.$props = reactive({})
    this.init(nodeJson)
    createApp(createWrapper(component, this.$props)).mount(container)
    this.$ = container.firstElementChild! as UniCustomElement
    if (selector) {
      this.$holder = this.$.querySelector(selector)!
      if (__DEV__) {
        if (!this.$holder) {
          console.error(formatLog(tag, 'holder', selector, this.$))
        }
      }
    }
    if (hasOwn(nodeJson, 't')) {
      this.setText(nodeJson.t || '')
    }
  }
  init(nodeJson: Partial<UniNodeJSON>) {
    const { a, e } = nodeJson
    if (a) {
      Object.keys(a).forEach((n) => {
        this.setAttr(n, a[n])
      })
    }
    if (e) {
      Object.keys(e).forEach((n) => {
        this.addEvent(n, e[n])
      })
    }
  }
  setText(text: string) {
    ;(this.$holder || this.$).textContent = text
  }
  addEvent(name: string, value: number) {
    const decoded = decodeEvent(name)
    this.$props[decoded] = createInvoker(
      this.id,
      value,
      parseEventName(decoded)[1]
    )
  }
  removeEvent(name: string) {
    this.$props[decodeEvent(name)] = null
  }
  setAttr(name: string, value: unknown) {
    this.$props[decodeAttr(name)] = value
  }
  removeAttr(name: string) {
    this.$props[decodeAttr(name)] = null
  }
  appendChild(node: Element) {
    return (this.$holder || this.$).appendChild(node)
  }
  insertBefore(newChild: Node, refChild: Node) {
    return (this.$holder || this.$).insertBefore(newChild, refChild)
  }
}

function getVueParent(node: UniNode): ComponentInternalInstance | null {
  while (node && node.pid > 0) {
    node = $(node.pid)
    if (node) {
      const { __vueParentComponent } = node.$ as unknown as {
        __vueParentComponent: ComponentInternalInstance
      }
      if (__vueParentComponent) {
        return __vueParentComponent
      }
    }
  }
  return null
}

export function setHolderText(holder: Element, clazz: string, text: string) {
  // 移除非第一个节点（uni-checkbox-wrapper,uni-radio-wrapper）
  holder.childNodes.forEach((childNode) => {
    if (childNode instanceof Element) {
      if (childNode.className.indexOf(clazz) === -1) {
        holder.removeChild(childNode)
      }
    } else {
      holder.removeChild(childNode)
    }
  })
  // 添加文本节点
  holder.appendChild(document.createTextNode(text))
}
