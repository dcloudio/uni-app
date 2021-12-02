import type { MPComponentInstance } from '@dcloudio/uni-mp-core'
import { ComponentInternalInstance, getCurrentInstance, isRef, Ref } from 'vue'
import { hasOwn, isFunction, isString } from '@vue/shared'

export type VNodeRef =
  | string
  | Ref
  | ((ref: object | null, refs: Record<string, any>) => void)

export function setRef(ref: VNodeRef, id: string) {
  const {
    proxy,
    ctx: { $scope },
    setupState,
  } = getCurrentInstance()! as ComponentInternalInstance & {
    ctx: { $scope: MPComponentInstance }
    setupState: Record<string, unknown>
  }
  const doSet = () => {
    let mpInstance = $scope
      .selectAllComponents('.r')
      .find((com) => com && com.properties.uI === id)
    if (!mpInstance) {
      mpInstance = $scope
        .selectAllComponents('.r-i-f')
        .find((com) => com && com.properties.uI === id)
    }
    if (!mpInstance) {
      return
    }
    // TODO 目前 $refs 实时从selectAllComponents中获取，不在 setRef 中对 $refs 做处理
    const refValue = mpInstance.$vm
    if (isString(ref)) {
      if (hasOwn(setupState, ref)) {
        setupState[ref] = refValue
      }
    } else if (isRef(ref)) {
      ref.value = refValue
    } else if (isFunction(ref)) {
      ref(refValue, {})
    }
  }

  if ($scope._$setRef) {
    $scope._$setRef(doSet)
  } else {
    proxy!.$nextTick(doSet)
  }
}
