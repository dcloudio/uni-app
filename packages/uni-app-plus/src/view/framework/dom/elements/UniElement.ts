import { hasOwn } from '@vue/shared'
import {
  ATTR_CLASS,
  ATTR_STYLE,
  ATTR_INNER_HTML,
  ATTR_TEXT_CONTENT,
  ATTR_V_SHOW,
  ATTR_V_OWNER_ID,
  ATTR_V_RENDERJS,
  UniNodeJSON,
} from '@dcloudio/uni-shared'
import { reactive, watch } from 'vue'
import { UniNode } from './UniNode'
import { patchClass } from '../modules/class'
import { patchStyle } from '../modules/style'
import { patchEvent, patchWxsEvent } from '../modules/events'
import { UniCustomElement } from '../components'
import {
  JOB_PRIORITY_RENDERJS,
  JOB_PRIORITY_UPDATE,
  queuePostActionJob,
} from '../scheduler'
import { decodeAttr, isCssVar } from '../utils'
import { patchVShow, VShowElement } from '../directives/vShow'
import { initRenderjs } from '../renderjs'
import { normalizeStyleValue } from '../../../utils'

export class UniElement<T extends object> extends UniNode {
  declare $: UniCustomElement
  $props: T = reactive({} as any)
  $propNames: string[]
  protected _update?: Function
  constructor(
    id: number,
    element: Element,
    parentNodeId: number,
    refNodeId: number,
    nodeJson: Partial<UniNodeJSON>,
    propNames: string[] = []
  ) {
    super(id, element.tagName, parentNodeId, element)
    this.$.__id = id
    this.$.__listeners = Object.create(null)
    this.$propNames = propNames
    this._update = this.update.bind(this)
    this.init(nodeJson)
    this.insert(parentNodeId, refNodeId)
  }
  init(nodeJson: Partial<UniNodeJSON>, isCreate: boolean = true) {
    if (hasOwn(nodeJson, 'a')) {
      this.setAttrs(nodeJson.a!)
    }
    if (hasOwn(nodeJson, 's')) {
      this.setAttr('style', nodeJson.s)
    }
    if (hasOwn(nodeJson, 'e')) {
      this.addEvents(nodeJson.e!)
    }
    if (hasOwn(nodeJson, 'w')) {
      this.addWxsEvents(nodeJson.w!)
    }
    super.init(nodeJson)
    // insert 的时候可能也会调用该 init
    if (isCreate) {
      watch(
        this.$props,
        () => {
          queuePostActionJob(this._update!, JOB_PRIORITY_UPDATE)
        },
        { flush: 'sync' }
      )
      this.update(true)
    }
  }
  setAttrs(attrs: Record<string, any>) {
    // 初始化时，先提取 wxsProps，再 setAttr
    this.setWxsProps(attrs)
    Object.keys(attrs).forEach((name) => {
      this.setAttr(name, attrs[name])
    })
  }

  addEvents(events: Record<string, number>) {
    Object.keys(events).forEach((name) => {
      this.addEvent(name, events[name])
    })
  }
  addWxsEvent(name: string, wxsEvent: string, flag: number) {
    patchWxsEvent(this.$, name, wxsEvent, flag)
  }
  addEvent(name: string, value: number) {
    patchEvent(this.$, name, value)
  }
  removeEvent(name: string) {
    patchEvent(this.$, name, -1)
  }
  setAttr(name: string, value: unknown) {
    if (name === ATTR_CLASS) {
      patchClass(this.$, value as string)
    } else if (name === ATTR_STYLE) {
      patchStyle(this.$, value as string | Record<string, any>)
    } else if (name === ATTR_V_SHOW) {
      patchVShow(this.$ as VShowElement, value)
    } else if (name === ATTR_V_OWNER_ID) {
      this.$.__ownerId = value as number
    } else if (name === ATTR_V_RENDERJS) {
      // 本轮渲染结束后初始化
      queuePostActionJob(
        () => initRenderjs(this, value as Record<string, string>),
        JOB_PRIORITY_RENDERJS
      )
    } else if (name === ATTR_INNER_HTML) {
      this.$.innerHTML = value as string
    } else if (name === ATTR_TEXT_CONTENT) {
      this.setText(value as string)
    }
    // 不提供动态修改wxsProps
    // else if (this.$hasWxsProps && name.indexOf(ATTR_CHANGE_PREFIX) === 0) {
    //   this.$wxsProps.set(name, value as string)
    // }
    else {
      this.setAttribute(name, value as string)
    }
    this.updateView()
  }
  removeAttr(name: string) {
    if (name === ATTR_CLASS) {
      patchClass(this.$, '')
    } else if (name === ATTR_STYLE) {
      patchStyle(this.$, '')
    } else {
      this.removeAttribute(name)
    }
    this.updateView()
  }
  setAttribute(name: string, value: unknown) {
    value = decodeAttr(value, this.$)
    if (this.$propNames.indexOf(name) !== -1) {
      ;(this.$props as any)[name] = value
    } else if (isCssVar(name)) {
      this.$.style.setProperty(name, normalizeStyleValue(value as string))
    } else {
      if (!this.wxsPropsInvoke(name, value)) {
        this.$.setAttribute(name, value as string)
      }
    }
  }
  removeAttribute(name: string) {
    if (this.$propNames.indexOf(name) !== -1) {
      delete (this.$props as any)[name]
    } else if (isCssVar(name)) {
      this.$.style.removeProperty(name)
    } else {
      this.$.removeAttribute(name)
    }
  }
  update(isMounted: boolean = false) {}
}
