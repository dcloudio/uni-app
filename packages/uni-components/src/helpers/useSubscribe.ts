import {
  watch,
  onMounted,
  onBeforeUnmount,
  getCurrentInstance,
  ComponentPublicInstance,
} from 'vue'

function normalizeEvent(
  pageId: number,
  vm: ComponentPublicInstance,
  id?: string
) {
  if (!id) {
    id = (vm as any).id
  }
  if (!id) {
    return
  }
  return pageId + '.' + vm.$options.name!.toLowerCase() + '.' + id
}

function addSubscribe(name: string, callback: Function) {
  if (!name) {
    return
  }
  UniViewJSBridge.subscribe(
    name,
    ({ type, data }: { type: string; data: unknown }) => {
      callback(type, data)
    }
  )
}

function removeSubscribe(name: string) {
  if (!name) {
    return
  }
  UniViewJSBridge.unsubscribe(name)
}

export function useSubscribe(
  callback: (type: string, data: unknown) => void,
  name?: string
) {
  const instance = getCurrentInstance()!
  const vm = instance.proxy!
  const pageId = name ? 0 : vm.$root!.$page.id
  onMounted(() => {
    addSubscribe(name || normalizeEvent(pageId, vm)!, callback)
    if (!name) {
      watch(
        () => (instance as any).id,
        (value, oldValue) => {
          addSubscribe(normalizeEvent(pageId, vm, value)!, callback)
          removeSubscribe(normalizeEvent(pageId, vm, oldValue)!)
        }
      )
    }
  })
  onBeforeUnmount(() => {
    removeSubscribe(name || normalizeEvent(pageId, vm)!)
  })
}

export function useOn(name: string, callback: (...args: any[]) => any) {
  onMounted(() => UniViewJSBridge.on(name, callback))
  onBeforeUnmount(() => UniViewJSBridge.off(name))
}
