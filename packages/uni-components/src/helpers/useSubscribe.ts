import {
  watch,
  onMounted,
  onBeforeUnmount,
  getCurrentInstance,
  ComponentPublicInstance,
} from 'vue'
import {
  getCurrentPageId,
  registerViewMethod,
  unregisterViewMethod,
} from '@dcloudio/uni-core'

type SubscribeCallbackRes<Res = any> = (
  type: string,
  data: unknown,
  resolve: (res: Res) => void
) => void

function normalizeEvent(vm: ComponentPublicInstance, id?: string) {
  if (!id) {
    id = (vm as any).id
  }
  if (!id) {
    return
  }
  return vm.$options.name!.toLowerCase() + '.' + id
}

function addSubscribe(name: string, callback: SubscribeCallbackRes) {
  if (!name) {
    return
  }

  registerViewMethod(
    getCurrentPageId(),
    name,
    (
      { type, data }: { type: string; data: unknown },
      resolve: Parameters<SubscribeCallbackRes>[2]
    ) => {
      callback(type, data, resolve)
    }
  )
}

function removeSubscribe(name: string) {
  if (!name) {
    return
  }
  unregisterViewMethod(getCurrentPageId(), name)
}

export function useSubscribe<Res = any>(
  callback: SubscribeCallbackRes<Res>,
  name?: string,
  multiple?: boolean
) {
  const instance = getCurrentInstance()!
  const vm = instance.proxy!
  onMounted(() => {
    addSubscribe(name || normalizeEvent(vm)!, callback)
    if (multiple || !name) {
      watch(
        () => (vm as any).id,
        (value, oldValue) => {
          addSubscribe(normalizeEvent(vm, value)!, callback)
          removeSubscribe(oldValue && normalizeEvent(vm, oldValue)!)
        }
      )
    }
  })
  onBeforeUnmount(() => {
    removeSubscribe(name || normalizeEvent(vm)!)
  })
}

export function useOn(name: string, callback: (...args: any[]) => any) {
  onMounted(() => UniViewJSBridge.on(name, callback))
  onBeforeUnmount(() => UniViewJSBridge.off(name))
}
