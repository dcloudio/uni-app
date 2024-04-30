import { camelize, capitalize, extend, hyphenate } from '@vue/shared'
import { formatLog } from '../log'
import type { UniNode } from './Node'

export function normalizeEventType(
  type: string,
  options?: AddEventListenerOptions
) {
  if (options) {
    if (options.capture) {
      type += 'Capture'
    }
    if (options.once) {
      type += 'Once'
    }
    if (options.passive) {
      type += 'Passive'
    }
  }
  return `on${capitalize(camelize(type))}`
}

export interface UniEventListener {
  (evt: UniEvent): void
  modifiers?: string[]
  wxsEvent?: string // 'wxs://['animate.start']'
}

interface UniEventOptions {
  bubbles: boolean
  cancelable: boolean
}

export class UniEvent {
  type: string
  bubbles: boolean
  cancelable: boolean
  defaultPrevented: boolean = false
  detail?: Record<string, any>

  timeStamp = Date.now()

  _stop: boolean = false
  _end: boolean = false

  constructor(type: string, opts: UniEventOptions) {
    this.type = type
    this.bubbles = !!opts.bubbles
    this.cancelable = !!opts.cancelable
  }

  preventDefault(): void {
    this.defaultPrevented = true
  }

  stopImmediatePropagation(): void {
    this._end = this._stop = true
  }

  stopPropagation(): void {
    this._stop = true
  }
}

export function createUniEvent(evt: Record<string, any>) {
  if (evt instanceof UniEvent) {
    return evt
  }
  const [type] = parseEventName(evt.type)
  const uniEvent = new UniEvent(type, {
    bubbles: false,
    cancelable: false,
  })
  extend(uniEvent, evt)
  return uniEvent
}

export class UniEventTarget {
  listeners: Record<string, UniEventListener[]> = Object.create(null)

  dispatchEvent(evt: UniEvent): boolean {
    const listeners = this.listeners[evt.type]
    if (!listeners) {
      if (__DEV__) {
        console.error(
          formatLog('dispatchEvent', (this as unknown as UniNode).nodeId),
          evt.type,
          'not found'
        )
      }
      return false
    }
    // 格式化事件类型

    const event = createUniEvent(evt)
    const len = listeners.length
    for (let i = 0; i < len; i++) {
      listeners[i].call(this, event)
      if (event._end) {
        break
      }
    }
    return event.cancelable && event.defaultPrevented
  }

  addEventListener(
    type: string,
    listener: UniEventListener,
    options?: AddEventListenerOptions
  ): void {
    type = normalizeEventType(type, options)
    ;(this.listeners[type] || (this.listeners[type] = [])).push(listener)
  }

  removeEventListener(
    type: string,
    callback: UniEventListener,
    options?: AddEventListenerOptions
  ): void {
    type = normalizeEventType(type, options)
    const listeners = this.listeners[type]
    if (!listeners) {
      return
    }
    const index = listeners.indexOf(callback)
    if (index > -1) {
      listeners.splice(index, 1)
    }
  }
}

const optionsModifierRE = /(?:Once|Passive|Capture)$/

export function parseEventName(
  name: string
): [string, EventListenerOptions | undefined] {
  let options: EventListenerOptions | undefined
  if (optionsModifierRE.test(name)) {
    options = {}
    let m
    while ((m = name.match(optionsModifierRE))) {
      name = name.slice(0, name.length - m[0].length)
      ;(options as any)[m[0].toLowerCase()] = true
      options
    }
  }
  return [hyphenate(name.slice(2)), options]
}
