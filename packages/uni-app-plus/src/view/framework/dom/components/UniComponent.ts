import { hasOwn, isPlainObject } from '@vue/shared'
import {
  type App,
  type Component,
  type ComponentInternalInstance,
  createApp,
  // @ts-expect-error
  flushPostFlushCbs,
  reactive,
} from 'vue'
import {
  ATTR_STYLE,
  ATTR_V_OWNER_ID,
  ATTR_V_RENDERJS,
  ATTR_V_SHOW,
  type UniNodeJSON,
  formatLog,
  parseEventName,
} from '@dcloudio/uni-shared'
import { UniNode } from '../elements/UniNode'
import { createInvoker, createWxsEventInvoker } from '../modules/events'
import type { UniCustomElement } from '.'
import { createWrapper } from '../createWrapper'
import { $, removeElement } from '../store'
import {
  JOB_PRIORITY_REBUILD,
  JOB_PRIORITY_RENDERJS,
  queuePostActionJob,
} from '../scheduler'
import { decodeAttr, isCssVar } from '../utils'
import { type VShowElement, patchVShow } from '../directives/vShow'
import { initRenderjs } from '../renderjs'
import { normalizeStyleValue } from '../../../utils'

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
    this.$.__id = id
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
  init(nodeJson: Partial<UniNodeJSON>, isCreate: boolean = true) {
    const { a, e, w } = nodeJson
    if (a) {
      // 初始化时，先提取 wxsProps，再 setAttr
      this.setWxsProps(a)
      Object.keys(a).forEach((n) => {
        this.setAttr(n, a[n])
      })
    }
    if (hasOwn(nodeJson, 's')) {
      this.setAttr('style', nodeJson.s)
    }
    if (e) {
      Object.keys(e).forEach((n) => {
        this.addEvent(n, e[n])
      })
    }
    if (w) {
      this.addWxsEvents(nodeJson.w!)
    }
  }
  setText(text: string) {
    ;(this.$holder || this.$).textContent = text
    this.updateView()
  }
  addWxsEvent(name: string, wxsEvent: string, flag: number) {
    // 此时 $ 还不存在，故传入 this，等事件触发时，再获取 $
    this.$props[name] = createWxsEventInvoker(this, wxsEvent, flag)
  }
  addEvent(name: string, value: number) {
    this.$props[name] = createInvoker(this.id, value, parseEventName(name)[1])
  }
  removeEvent(name: string) {
    this.$props[name] = null
  }
  setAttr(name: string, value: unknown) {
    // TODO 缺少对wxs的addClass，removeClass处理
    if (name === ATTR_V_SHOW) {
      if (this.$) {
        patchVShow(this.$ as VShowElement, value)
      }
    } else if (name === ATTR_V_OWNER_ID) {
      this.$.__ownerId = value as number
    } else if (name === ATTR_V_RENDERJS) {
      // 本轮渲染结束后初始化
      queuePostActionJob(
        () => initRenderjs(this, value as Record<string, string>),
        JOB_PRIORITY_RENDERJS
      )
    } else if (name === ATTR_STYLE) {
      const newStyle = decodeAttr(value, this.$ || $(this.pid).$)
      const oldStyle = this.$props.style
      if (isPlainObject(newStyle) && isPlainObject(oldStyle)) {
        Object.keys(newStyle).forEach((n) => {
          ;(oldStyle as any)[n] = (newStyle as any)[n]
        })
      } else {
        this.$props.style = newStyle
      }
    } else if (isCssVar(name)) {
      this.$.style.setProperty(name, normalizeStyleValue(value as string))
    } else {
      value = decodeAttr(value, this.$ || $(this.pid).$)
      if (!this.wxsPropsInvoke(name, value, true)) {
        this.$props[name] = value
      }
    }
    this.updateView()
  }
  removeAttr(name: string) {
    if (isCssVar(name)) {
      this.$.style.removeProperty(name)
    } else {
      this.$props[name] = null
    }
    this.updateView()
  }

  remove() {
    this.removeUniParent()
    this.isUnmounted = true
    this.$app.unmount()
    removeElement(this.id)
    this.removeUniChildren()
    this.updateView()
  }
  appendChild(node: Element) {
    const res = (this.$holder || this.$).appendChild(node)
    this.updateView(true)
    return res
  }
  insertBefore(newChild: Node, refChild: Node) {
    const res = (this.$holder || this.$).insertBefore(newChild, refChild)
    this.updateView(true)
    return res
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
    queuePostActionJob(this.getRebuildFn(), JOB_PRIORITY_REBUILD)
    return super.setText(text)
  }
  appendChild(node: Element) {
    queuePostActionJob(this.getRebuildFn(), JOB_PRIORITY_REBUILD)
    return super.appendChild(node)
  }
  insertBefore(newChild: Node, refChild: Node) {
    queuePostActionJob(this.getRebuildFn(), JOB_PRIORITY_REBUILD)
    return super.insertBefore(newChild, refChild)
  }
  removeUniChild(node: UniNode) {
    queuePostActionJob(this.getRebuildFn(), JOB_PRIORITY_REBUILD)
    return super.removeUniChild(node)
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

const vModelNames = ['value', 'modelValue']
export function initVModel(props: Record<string, any>) {
  vModelNames.forEach((name) => {
    if (hasOwn(props, name)) {
      const event = 'onUpdate:' + name
      if (!hasOwn(props, event)) {
        props[event] = (v: string) => (props[name] = v)
      }
    }
  })
}
