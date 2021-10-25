import type { ComponentInternalInstance } from 'vue'
import type { ScopedSlotInvokers } from './withScopedSlot'
import { getCurrentInstance } from 'vue'

export function renderSlot(name: string, props: Data = {}) {
  const instance = getCurrentInstance() as ComponentInternalInstance
  const vueIds = instance.attrs.vI as string
  if (!vueIds) {
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
