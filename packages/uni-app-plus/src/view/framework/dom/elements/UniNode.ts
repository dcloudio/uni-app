import { hasOwn } from '@vue/shared'
import { ATTR_CHANGE_PREFIX, UniNodeJSON } from '@dcloudio/uni-shared'

import { $, getElement, removeElement } from '../page'
import { JOB_PRIORITY_WXS_PROPS, queuePostActionJob } from '../scheduler'
import { createWxsPropsInvoker, WxsPropsInvoker } from '../wxs'
import { destroyRenderjs } from '../renderjs'
import { nextTick } from 'vue'

export class UniNode {
  id: number
  tag: string
  pid: number
  $!: Element | Text | Comment
  isMounted: boolean = false
  isUnmounted: boolean = false
  $wxsProps: Map<string, WxsPropsInvoker>
  $hasWxsProps: boolean = false
  $parent: UniNode | undefined
  $children: UniNode[] = []
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
    const parent = (this.$parent = getElement(parentNodeId))
    if (parent) {
      parent.appendUniChild(this)
    }
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
    this.removeUniParent()
    const { $ } = this
    $.parentNode!.removeChild($)
    this.isUnmounted = true
    removeElement(this.id)
    destroyRenderjs(this)
    this.removeUniChildren()
  }
  appendChild(node: Node) {
    return this.$.appendChild(node)
  }
  insertBefore(newChild: Node, refChild: Node) {
    return this.$.insertBefore(newChild, refChild)
  }
  appendUniChild(node: UniNode) {
    this.$children.push(node)
  }
  removeUniChild(node: UniNode) {
    const index = this.$children.indexOf(node)
    if (index >= 0) {
      this.$children.splice(index, 1)
    }
  }
  removeUniParent() {
    const { $parent } = this
    if ($parent) {
      $parent.removeUniChild(this)
      this.$parent = undefined
    }
  }
  removeUniChildren() {
    this.$children.forEach((node) => node.remove())
    this.$children.length = 0
  }
  setWxsProps(attrs: Record<string, any>) {
    Object.keys(attrs).forEach((name) => {
      if (name.indexOf(ATTR_CHANGE_PREFIX) === 0) {
        const propName = name.replace(ATTR_CHANGE_PREFIX, '')
        const value = attrs[propName]
        const invoker = createWxsPropsInvoker(this, attrs[name], value)
        // 队列后再执行
        queuePostActionJob(() => invoker(value), JOB_PRIORITY_WXS_PROPS)
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
  wxsPropsInvoke(name: string, value: unknown, isNextTick = false) {
    const wxsPropsInvoker =
      this.$hasWxsProps && this.$wxsProps.get(ATTR_CHANGE_PREFIX + name)
    if (wxsPropsInvoker) {
      return (
        // 等待其他属性先更新，因为开发者可能在invoker中获取当前节点的最新属性信息
        // vue组件中的change:props需要nextTick后执行，普通element，队列后执行
        queuePostActionJob(
          () =>
            isNextTick
              ? nextTick(() => wxsPropsInvoker(value))
              : wxsPropsInvoker(value),
          JOB_PRIORITY_WXS_PROPS
        ),
        true
      )
    }
  }
}
