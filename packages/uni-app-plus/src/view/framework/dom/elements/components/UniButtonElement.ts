import '@dcloudio/uni-components/style/button.css'
import { hasOwn } from '@vue/shared'
import { Button } from '@dcloudio/uni-components'
import { createApp, reactive, watch } from 'vue'
import { createWrapper } from '.'
import {
  decodeAttr,
  formatLog,
  parseEventName,
  UniNodeJSON,
} from '@dcloudio/uni-shared'
import { UniNode } from '../UniNode'
import { createInvoker } from '../modules/events'

const UniButton = createWrapper(Button)

export class UniButtonElement extends UniNode {
  private $props!: Record<string, any>
  constructor(id: number) {
    super(id, 'uni-button')
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
    const vm = createApp(UniButton, { attrs: this.$props }).mount(container)
    this.$ = container.firstElementChild!
    if (hasOwn(nodeJson, 't')) {
      this.$.textContent = nodeJson.t || ''
    }
    watch(this.$props, () => {
      if (__DEV__) {
        console.log(formatLog(this.tag, 'props', 'forceUpdate'))
      }
      vm.$forceUpdate()
    })
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
