import { isString } from '@vue/shared'
import { dynamicSlotName } from '@dcloudio/uni-shared'
import { type ComponentInternalInstance, getCurrentInstance } from 'vue'
/**
 * quickapp-webview 不能使用 default 作为插槽名称，故统一转换 default 为 d
 * @param names
 * @returns
 */
export function dynamicSlot(names: string | string[], key?: string | number) {
  if (isString(names)) {
    return normalizeSlotName(names, key)
  }
  return names.map((name) => normalizeSlotName(name, key))
}

function normalizeSlotName(name: string, key?: string | number) {
  const slotName = dynamicSlotName(name)
  if (key === undefined) {
    return slotName
  }

  const instance = getCurrentInstance() as ComponentInternalInstance & {
    ctx: { $scope: { _$vueId: string } }
  }
  let isScopedSlot = false
  let parent = instance.parent
  while (parent) {
    const invokers = (parent as any).$ssi
    if (invokers && invokers[instance.ctx.$scope._$vueId]) {
      isScopedSlot = true
      break
    }
    parent = parent.parent
  }
  return slotName + (isScopedSlot ? `-${key}` : '')
}
