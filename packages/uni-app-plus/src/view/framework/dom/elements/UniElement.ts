import { hasOwn } from '@vue/shared'
import { decodeAttr, UniNodeJSON } from '@dcloudio/uni-shared'
import { reactive, watch } from 'vue'
import { UniNode } from './UniNode'
import { patchClass } from '../modules/class'
import { patchStyle } from '../modules/style'
import { patchEvent } from '../modules/events'
import { UniCustomElement } from '../components'
import { queuePostActionJob } from '../scheduler'

export class UniElement<T extends object> extends UniNode {
  declare $: UniCustomElement
  $props: T = reactive({} as any)
  $propNames: string[]
  protected _update?: Function
  constructor(
    id: number,
    element: Element,
    parentNodeId: number,
    nodeJson: Partial<UniNodeJSON>,
    propNames: string[] = []
  ) {
    super(id, element.tagName, parentNodeId, element)
    this.$.__id = id
    this.$.__listeners = Object.create(null)
    this.$propNames = propNames
    this._update = this.update.bind(this)
    this.init(nodeJson)
  }
  init(nodeJson: Partial<UniNodeJSON>) {
    if (hasOwn(nodeJson, 'a')) {
      this.setAttrs(nodeJson.a!)
    }
    super.init(nodeJson)
    watch(
      this.$props,
      () => {
        queuePostActionJob(this._update!)
      },
      { flush: 'sync' }
    )
    this.update()
  }
  setAttrs(attrs: Record<string, any>) {
    Object.keys(attrs).forEach((name) => {
      this.setAttr(name, attrs[name])
    })
  }
  setAttr(name: string, value: unknown) {
    if (name === '.c') {
      patchClass(this.$, value as string)
    } else if (name === '.s') {
      patchStyle(this.$, value as string | Record<string, any>)
    } else if (name.indexOf('.e') === 0) {
      patchEvent(this.$, name, value as number)
    } else {
      this.setAttribute(decodeAttr(name), value as string)
    }
  }
  removeAttr(name: string) {
    if (name === '.c') {
      patchClass(this.$, '')
    } else if (name === '.s') {
      patchStyle(this.$, '')
    } else if (name.indexOf('.e') === 0) {
      patchEvent(this.$, name, -1)
    } else {
      this.removeAttribute(decodeAttr(name))
    }
  }
  setAttribute(name: string, value: unknown) {
    if (this.$propNames.indexOf(name) !== -1) {
      ;(this.$props as any)[name] = value
    } else {
      this.$.setAttribute(name, value as string)
    }
  }
  removeAttribute(name: string) {
    if (this.$propNames.indexOf(name) !== -1) {
      delete (this.$props as any)[name]
    } else {
      this.$.removeAttribute(name)
    }
  }
  update() {}
}
