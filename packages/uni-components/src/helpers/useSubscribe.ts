import {
  watch,
  onMounted,
  onBeforeMount,
  getCurrentInstance,
  ComponentPublicInstance,
} from 'vue'

function normalizeEvent(componentId: string, vm: ComponentPublicInstance) {
  return (
    vm.$page.id +
    '-' +
    vm.$options.name!.replace(/VUni([A-Z])/, '$1').toLowerCase() +
    '-' +
    componentId
  )
}

function addSubscribe(
  componentId: string,
  vm: ComponentPublicInstance,
  callback: Function
) {
  UniViewJSBridge.subscribe(
    normalizeEvent(componentId, vm),
    ({ type, data }: { type: string; data: unknown }) => {
      callback(type, data)
    }
  )
}

function removeSubscribe(componentId: string, vm: ComponentPublicInstance) {
  UniViewJSBridge.unsubscribe(normalizeEvent(componentId, vm))
}

export function useSubscribe(callback: (type: string, data: unknown) => void) {
  const instance = getCurrentInstance()!.proxy!
  onMounted(() => {
    addSubscribe((instance as any).id, instance, callback)
    watch(
      () => (instance as any).id,
      (value, oldValue) => {
        addSubscribe(value, instance, callback)
        removeSubscribe(oldValue, instance)
      }
    )
  })
  onBeforeMount(() => {
    removeSubscribe((instance as any).id, instance)
  })
}
