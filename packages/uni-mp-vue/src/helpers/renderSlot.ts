import type { ComponentInternalInstance } from 'vue'
import type { MPComponentInstance } from '@dcloudio/uni-mp-core'
import type { ScopedSlotInvokers } from './withScopedSlot'
import { getCurrentInstance, onMounted } from 'vue'

export function renderSlot(
  name: string,
  props: Record<string, unknown> = {},
  key?: number
) {
  const instance = getCurrentInstance() as ComponentInternalInstance & {
    ctx: { $scope: MPComponentInstance }
  }
  const {
    parent,
    isMounted,
    ctx: { $scope },
  } = instance
  // mp-alipay 为 props
  const vueIds = ($scope.properties || $scope.props).uI as string
  if (!vueIds) {
    return
  }
  if (!parent && !isMounted) {
    // 头条小程序首次 render 时，还没有 parent
    onMounted(() => {
      renderSlot(name, props, key)
    }, instance)
    return
  }
  const invoker = findScopedSlotInvoker(vueIds, instance)
  // 可能不存在，因为插槽不是必需的
  if (invoker) {
    invoker(name, props, key)
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
