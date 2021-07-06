import { extend, capitalize, camelize, hyphenate } from '@vue/shared'
import { formatLog } from '../log'
import { UniElement } from './Element'
import { UniNode } from './Node'

export function normalizeEventType(type: string) {
  return `on${capitalize(camelize(type))}`
}

export interface UniEventListener {
  (evt: UniEvent): void
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

  timeStamp = Date.now()

  _stop: boolean = false
  _end: boolean = false

  constructor(type: string, opts: UniEventOptions) {
    this.type = type.toLowerCase()
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

export class UniEventTarget {
  private _listeners: Record<string, UniEventListener[]> = {}

  dispatchEvent(evt: UniEvent): boolean {
    const listeners = this._listeners[evt.type]
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
    const len = listeners.length
    for (let i = 0; i < len; i++) {
      listeners[i].call(this, evt)
      if (evt._end) {
        break
      }
    }
    return evt.cancelable && evt.defaultPrevented
  }

  addEventListener(
    type: string,
    listener: UniEventListener,
    options?: AddEventListenerOptions
  ): void {
    const isOnce = options && options.once
    if (isOnce) {
      const wrapper = function (this: UniElement, evt: UniEvent) {
        listener.apply(this, [evt])
        this.removeEventListener(type, wrapper, options)
      }
      return this.addEventListener(
        type,
        wrapper,
        extend(options, { once: false })
      )
    }
    ;(this._listeners[type] || (this._listeners[type] = [])).push(listener)
  }

  removeEventListener(
    type: string,
    callback: UniEventListener,
    options?: EventListenerOptions
  ): void {
    const listeners = this._listeners[type.toLowerCase()]
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
