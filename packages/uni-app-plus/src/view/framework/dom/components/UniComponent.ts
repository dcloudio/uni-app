import { hasOwn } from '@vue/shared'
import {
  App,
  Component,
  ComponentInternalInstance,
  createApp,
  reactive,
  // @ts-expect-error
  flushPostFlushCbs,
} from 'vue'
import {
  ATTR_V_SHOW,
  formatLog,
  parseEventName,
  UniNodeJSON,
} from '@dcloudio/uni-shared'
import { UniNode } from '../elements/UniNode'
import { createInvoker } from '../modules/events'
import { createWrapper, UniCustomElement } from '.'
import { $, removeElement } from '../page'
import { queuePostActionJob } from '../scheduler'
import { decodeAttr } from '../utils'
import { patchVShow, VShowElement } from '../directives/vShow'

export class UniComponent extends UniNode {
  declare $: UniCustomElement
  protected $props!: Record<string, any>
  $holder?: Element
  $app!: App
  constructor(
    id: number,
    tag: string,
    component: Component,
    parentNodeId: number,
    refNodeId: number,
    nodeJson: Partial<UniNodeJSON>,
    selector?: string
  ) {
    super(id, tag, parentNodeId)
    const container = document.createElement('div')
    ;(container as any).__vueParent = getVueParent(this)
    this.$props = reactive({})
    this.init(nodeJson)
    this.$app = createApp(createWrapper(component, this.$props))
    this.$app.mount(container)
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
    // 初始化时，处理一次vShow
    if (nodeJson.a && hasOwn(nodeJson.a, ATTR_V_SHOW)) {
      patchVShow(this.$ as VShowElement, nodeJson.a[ATTR_V_SHOW])
    }
    this.insert(parentNodeId, refNodeId)
    // 延迟到insert之后，再flush，确保mounted等生命周期触发正常
    flushPostFlushCbs()
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
    const decoded = name
    this.$props[decoded] = createInvoker(
      this.id,
      value,
      parseEventName(decoded)[1]
    )
  }
  removeEvent(name: string) {
    this.$props[name] = null
  }
  setAttr(name: string, value: unknown) {
    if (name === ATTR_V_SHOW) {
      if (this.$) {
        patchVShow(this.$ as VShowElement, value)
      }
    } else {
      this.$props[name] = decodeAttr(value)
    }
  }
  removeAttr(name: string) {
    this.$props[name] = null
  }

  remove() {
    this.isUnmounted = true
    this.$app.unmount()
    removeElement(this.id)
  }
  appendChild(node: Element) {
    return (this.$holder || this.$).appendChild(node)
  }
  insertBefore(newChild: Node, refChild: Node) {
    return (this.$holder || this.$).insertBefore(newChild, refChild)
  }
}

export class UniContainerComponent extends UniComponent {
  private _rebuild!: Function
  constructor(
    id: number,
    tag: string,
    component: Component,
    parentNodeId: number,
    refNodeId: number,
    nodeJson: Partial<UniNodeJSON>,
    selector?: string
  ) {
    super(id, tag, component, parentNodeId, refNodeId, nodeJson, selector)
  }
  getRebuildFn() {
    if (!this._rebuild) {
      this._rebuild = this.rebuild.bind(this)
    }
    return this._rebuild
  }
  setText(text: string) {
    queuePostActionJob(this.getRebuildFn())
    return super.setText(text)
  }
  appendChild(node: Element) {
    queuePostActionJob(this.getRebuildFn())
    return super.appendChild(node)
  }
  insertBefore(newChild: Node, refChild: Node) {
    queuePostActionJob(this.getRebuildFn())
    return super.insertBefore(newChild, refChild)
  }
  rebuild() {
    // 刷新容器组件状态
    if (__DEV__) {
      console.log(formatLog('rebuild', this.id, this.tag))
    }
    const vm = this.$.__vueParentComponent
    if ((vm as any).rebuild) {
      ;(vm as any).rebuild()
    }
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
