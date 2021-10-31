import type { ComponentInternalInstance } from 'vue'
import type { ScopedSlotInvokers } from './withScopedSlot'
import { onMounted, getCurrentInstance } from 'vue'

export function renderSlot(name: string, props: Data = {}) {
  const instance = getCurrentInstance() as ComponentInternalInstance
  const vueIds = instance.attrs.vI as string
  if (!vueIds) {
    return
  }
  if (!instance.parent && !instance.isMounted) {
    // 头条小程序首次 render 时，还没有 parent
    onMounted(() => {
      renderSlot(name, props)
    }, instance)
    return
  }
  const invoker = findScopedSlotInvoker(vueIds.split(',')[0], instance)
  // 可能不存在，因为插槽不是必需的
  if (invoker) {
    invoker(name, props)
  }
}

function findScopedSlotInvoker(
  vueId: string,
  instance: ComponentInternalInstance
) {
  let parent = instance.parent
  while (parent) {
    const invokers = (parent as any).$ssi as ScopedSlotInvokers
    if (invokers && invokers[vueId]) {
      return invokers[vueId]
    }
    parent = parent.parent
  }
}
