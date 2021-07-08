import { hasOwn } from '@vue/shared'
import { decodeAttr, UniNodeJSON } from '@dcloudio/uni-shared'

import { UniNode } from './UniNode'
import { UniCustomElement } from './utils'
import { patchClass } from './modules/class'
import { patchStyle } from './modules/style'
import { patchEvent } from './modules/events'

export class UniElement extends UniNode {
  $: UniCustomElement
  constructor(id: number, tag: string) {
    super(id, tag)
    this.$ = document.createElement(tag) as unknown as UniCustomElement
    this.$.__id = id
    this.$.__listeners = Object.create(null)
  }
  init(nodeJson: Partial<UniNodeJSON>) {
    super.init(nodeJson)
    if (hasOwn(nodeJson, 'a')) {
      this.setAttrs(nodeJson.a!)
    }
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
      this.$.setAttribute(decodeAttr(name), value as string)
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
      this.$.removeAttribute(decodeAttr(name))
    }
  }
}
