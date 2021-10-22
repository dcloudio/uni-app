import { isArray } from '@vue/shared'
import {
  callWithAsyncErrorHandling,
  ComponentInternalInstance,
  ErrorCodes,
  getCurrentInstance,
} from 'vue'

type EventValue = Function | Function[]

interface Invoker extends EventListener {
  value: EventValue
}

export function vOn(value: EventValue | undefined) {
  const instance = getCurrentInstance()! as unknown as {
    $ei: number
    ctx: { $scope: Record<string, any> }
  }
  const name = 'e' + instance.$ei++
  const mpInstance = instance.ctx.$scope
  if (!value) {
    // remove
    delete mpInstance[name]
    return name
  }
  const existingInvoker = mpInstance[name] as Invoker
  if (existingInvoker) {
    // patch
    existingInvoker.value = value
  } else {
    // add
    mpInstance[name] = createInvoker(
      value,
      instance as unknown as ComponentInternalInstance
    )
  }
  return name
}

interface MPEvent extends Event {
  detail: {
    __args__?: unknown[]
  }
}

function createInvoker(
  initialValue: EventValue,
  instance: ComponentInternalInstance | null
) {
  const invoker: Invoker = (e: Event) => {
    patchMPEvent(e)
    let args: unknown[] = [e]
    if ((e as MPEvent).detail && (e as MPEvent).detail.__args__) {
      args = (e as MPEvent).detail.__args__!
    }
    callWithAsyncErrorHandling(
      patchStopImmediatePropagation(e, invoker.value),
      instance,
      ErrorCodes.NATIVE_EVENT_HANDLER,
      args
    )
  }
  invoker.value = initialValue
  return invoker
}

function patchMPEvent(e: Event) {
  if (e.type && e.target) {
    e.stopPropagation = () => {}
    e.preventDefault = () => {}
  }
}

function patchStopImmediatePropagation(
  e: Event,
  value: EventValue
): EventValue {
  if (isArray(value)) {
    const originalStop = e.stopImmediatePropagation
    e.stopImmediatePropagation = () => {
      originalStop && originalStop.call(e)
      ;(e as any)._stopped = true
    }
    return value.map((fn) => (e: Event) => !(e as any)._stopped && fn(e))
  } else {
    return value
  }
}
