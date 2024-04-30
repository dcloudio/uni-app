import { withModifiers } from 'vue'
import { normalizeNativeEvent } from '@dcloudio/uni-core'
import {
  ACTION_TYPE_EVENT,
  EventModifierFlags,
  formatLog,
  normalizeEventType,
  parseEventName,
} from '@dcloudio/uni-shared'
import { VD_SYNC } from '../../../../constants'
import type { UniCustomElement } from '../components'
import { invokeWxsEvent } from '../wxs'
import type { UniComponent } from '../components/UniComponent'
import { isUniComponent } from '../utils'

function removeEventListener(el: UniCustomElement, type: string) {
  const listener = el.__listeners[type]
  if (listener) {
    el.removeEventListener(type, listener)
  } else if (__DEV__) {
    console.error(
      formatLog(`tag`, el.tagName, el.__id, 'event[' + type + '] not found')
    )
  }
}

function isEventListenerExists(el: UniCustomElement, type: string) {
  if (el.__listeners[type]) {
    if (__DEV__) {
      console.error(
        formatLog(
          `tag`,
          el.tagName,
          el.__id,
          'event[' + type + '] already registered'
        )
      )
    }
    return true
  }
}

export function patchEvent(el: UniCustomElement, name: string, flag: number) {
  const [type, options] = parseEventName(name)
  if (flag === -1) {
    // remove
    removeEventListener(el, type)
  } else {
    // add
    if (!isEventListenerExists(el, type)) {
      el.addEventListener(
        type,
        (el.__listeners[type] = createInvoker(el.__id!, flag, options)),
        options
      )
    }
  }
}

export function createInvoker(
  id: number,
  flag: number,
  options?: AddEventListenerOptions
) {
  const invoker = (evt: Event) => {
    const [event] = normalizeNativeEvent(evt)
    ;(event as any).type = normalizeEventType(evt.type, options)
    UniViewJSBridge.publishHandler(VD_SYNC, [[ACTION_TYPE_EVENT, id, event]])
  }
  if (!flag) {
    return invoker
  }
  return withModifiers(invoker, resolveModifier(flag))
}

function resolveModifier(flag: number) {
  const modifiers: string[] = []
  if (flag & EventModifierFlags.prevent) {
    modifiers.push('prevent')
  }
  if (flag & EventModifierFlags.self) {
    modifiers.push('self')
  }
  if (flag & EventModifierFlags.stop) {
    modifiers.push('stop')
  }
  return modifiers
}

export function patchWxsEvent(
  el: UniCustomElement,
  name: string,
  wxsEvent: string,
  flag: number
) {
  const [type, options] = parseEventName(name)
  if (flag === -1) {
    // remove
    removeEventListener(el, type)
  } else {
    // add
    if (!isEventListenerExists(el, type)) {
      el.addEventListener(
        type,
        (el.__listeners[type] = createWxsEventInvoker(el, wxsEvent, flag)),
        options
      )
    }
  }
}

export function createWxsEventInvoker(
  el: UniCustomElement | UniComponent,
  wxsEvent: string,
  flag: number
) {
  const invoker = (evt: Event) => {
    invokeWxsEvent(
      isUniComponent(el) ? el.$ : el,
      wxsEvent,
      normalizeNativeEvent(evt)[0] as Record<string, any>
    )
  }
  if (!flag) {
    return invoker
  }
  return withModifiers(invoker, resolveModifier(flag))
}
