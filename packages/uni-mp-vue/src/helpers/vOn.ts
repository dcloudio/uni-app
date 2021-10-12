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

function createInvoker(
  initialValue: EventValue,
  instance: ComponentInternalInstance | null
) {
  const invoker: Invoker = (e: Event) => {
    callWithAsyncErrorHandling(
      patchStopImmediatePropagation(e, invoker.value),
      instance,
      ErrorCodes.NATIVE_EVENT_HANDLER,
      [e]
    )
  }
  invoker.value = initialValue
  return invoker
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
