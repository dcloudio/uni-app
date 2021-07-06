import { hasOwn } from '@vue/shared'
import { normalizeNativeEvent } from '@dcloudio/uni-core'
import {
  decodeAttr,
  formatLog,
  parseEventName,
  UniNodeJSON,
} from '@dcloudio/uni-shared'
import { VD_SYNC } from '../../../../constants'
import { ACTION_TYPE_EVENT } from '../../../../PageAction'
import { UniNode } from './UniNode'

export class UniElement extends UniNode {
  $: Element
  private _listeners: Record<string, (evt: Event) => void> = {}
  constructor(id: number, tag: string) {
    super(id, tag)
    this.$ = document.createElement(tag)
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
      this.$.className = value as string
    } else if (name.indexOf('.e') === 0) {
      this.addEvent(name)
    } else {
      this.$.setAttribute(decodeAttr(name), value as string)
    }
  }
  removeAttr(name: string) {
    if (name === '.c') {
      this.$.className = ''
    } else if (name.indexOf('.e') === 0) {
      this.removeEvent(name)
    } else {
      this.$.removeAttribute(decodeAttr(name))
    }
  }
  addEvent(name: string) {
    const [type] = parseEventName(decodeAttr(name))
    if (this._listeners[type]) {
      if (__DEV__) {
        console.error(
          formatLog(
            `tag`,
            this.tag,
            this.id,
            'event[' + type + '] already registered'
          )
        )
      }
      return
    }
    this._listeners[type] = (evt: Event) => {
      UniViewJSBridge.publishHandler(VD_SYNC, [
        [ACTION_TYPE_EVENT, this.id, normalizeNativeEvent(evt)],
      ])
    }
    this.$.addEventListener(type, this._listeners[type])
  }
  removeEvent(name: string) {
    const [type] = parseEventName(decodeAttr(name))
    const listener = this._listeners[type]
    if (listener) {
      this.$.removeEventListener(type, listener)
    } else if (__DEV__) {
      console.error(
        formatLog(`tag`, this.tag, this.id, 'event[' + type + '] not found')
      )
    }
  }
}
