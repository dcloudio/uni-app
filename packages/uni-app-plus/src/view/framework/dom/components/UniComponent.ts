import { hasOwn } from '@vue/shared'
import { Component, createApp, reactive } from 'vue'
import { decodeAttr, parseEventName, UniNodeJSON } from '@dcloudio/uni-shared'
import { UniNode } from '../elements/UniNode'
import { createInvoker } from '../modules/events'
import { createWrapper } from '.'

export class UniComponent extends UniNode {
  private $component: Component
  private $props!: Record<string, any>
  constructor(id: number, tag: string, component: Component) {
    super(id, tag)
    this.$component = component
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
    const vm = createApp(createWrapper(this.$component, this.$props)).mount(
      container
    )
    this.$ = container.firstElementChild!
    if (hasOwn(nodeJson, 't')) {
      this.$.textContent = nodeJson.t || ''
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
}
