import { hasOwn } from '@vue/shared'
import { ATTR_CHANGE_PREFIX, UniNodeJSON } from '@dcloudio/uni-shared'

import { $, removeElement } from '../page'
import { queuePostActionJob } from '../scheduler'
import { createWxsPropsInvoker, WxsPropsInvoker } from '../wxs'

export class UniNode {
  id: number
  tag: string
  pid: number
  $!: Element | Text | Comment
  isMounted: boolean = false
  isUnmounted: boolean = false
  $wxsProps: Map<string, WxsPropsInvoker>
  $hasWxsProps: boolean = false
  constructor(
    id: number,
    tag: string,
    parentNodeId: number,
    element?: Element | Text | Comment
  ) {
    this.id = id
    this.tag = tag
    this.pid = parentNodeId
    if (element) {
      this.$ = element
    }
    this.$wxsProps = new Map<string, WxsPropsInvoker>()
  }
  init(nodeJson: Partial<UniNodeJSON>) {
    if (hasOwn(nodeJson, 't')) {
      this.$.textContent = nodeJson.t as string
    }
  }
  setText(text: string) {
    this.$.textContent = text
  }
  insert(parentNodeId: number, refNodeId: number) {
    const node = this.$
    const parentNode = $(parentNodeId)
    if (refNodeId === -1) {
      parentNode.appendChild(node)
    } else {
      parentNode.insertBefore(node, $(refNodeId).$)
    }
    this.isMounted = true
  }
  remove() {
    const { $ } = this
    $.parentNode!.removeChild($)
    this.isUnmounted = true
    removeElement(this.id)
  }
  appendChild(node: Node) {
    return this.$.appendChild(node)
  }
  insertBefore(newChild: Node, refChild: Node) {
    return this.$.insertBefore(newChild, refChild)
  }
  setWxsProps(attrs: Record<string, any>) {
    Object.keys(attrs).forEach((name) => {
      if (name.indexOf(ATTR_CHANGE_PREFIX) === 0) {
        const propName = name.replace(ATTR_CHANGE_PREFIX, '')
        const value = attrs[propName]
        const invoker = createWxsPropsInvoker(this, attrs[name], value)
        // 队列后再执行
        queuePostActionJob(() => invoker(value))
        this.$wxsProps.set(name, invoker)
        delete attrs[name]
        delete attrs[propName]
        this.$hasWxsProps = true
      }
    })
  }
  addWxsEvents(events: Record<string, [string, number]>) {
    Object.keys(events).forEach((name) => {
      const [wxsEvent, flag] = events[name]
      this.addWxsEvent(name, wxsEvent, flag)
    })
  }
  addWxsEvent(name: string, wxsEvent: string, flag: number) {}
  wxsPropsInvoke(name: string, value: unknown) {
    const wxsPropsInvoker =
      this.$hasWxsProps && this.$wxsProps.get(ATTR_CHANGE_PREFIX + name)
    if (wxsPropsInvoker) {
      return wxsPropsInvoker(value), true
    }
  }
}
