import { getValueByDataPath } from '@dcloudio/uni-shared'
import type { ComponentInternalInstance } from 'vue'
//@ts-expect-error
import { diff, getCurrentInstance, setCurrentRenderingInstance } from 'vue'

export interface ScopedSlotInvokers {
  [vueId: string]: ScopedSlotInvoker
}

interface ScopedSlotFn {
  (args: Data, slotName: string, index: number | string): Record<string, any>
  path: string
}

interface ScopedSlotInvoker {
  (slotName: string, args: Data, index?: number | string): void
  slots: {
    [slotName: string]: {
      fn: ScopedSlotFn
    }
  }
}

export function withScopedSlot(
  fn: ScopedSlotFn,
  {
    name,
    path,
    vueId,
  }: {
    name: string
    path: string
    vueId: string
  }
) {
  const instance = getCurrentInstance() as ComponentInternalInstance
  fn.path = path
  const scopedSlots = ((instance as any).$ssi ||
    (((instance as any).$ssi as ScopedSlotInvokers) = {})) as ScopedSlotInvokers
  const invoker =
    scopedSlots[vueId] ||
    (scopedSlots[vueId] = createScopedSlotInvoker(instance))
  if (!invoker.slots[name]) {
    invoker.slots[name] = {
      fn,
    }
  } else {
    invoker.slots[name].fn = fn
  }
  return getValueByDataPath((instance as any).ctx.$scope.data, path)
}

function createScopedSlotInvoker(instance: ComponentInternalInstance) {
  const invoker: ScopedSlotInvoker = (
    slotName: string,
    args: Data,
    index?: number | string
  ) => {
    const slot = invoker.slots[slotName]
    if (!slot) {
      // slot 可能不存在 https://github.com/dcloudio/uni-app/issues/3346
      return
    }
    const hasIndex = typeof index !== 'undefined'
    index = index || 0
    // 确保当前 slot 的上下文，类似 withCtx
    const prevInstance = setCurrentRenderingInstance(instance)
    const data = slot.fn(args, slotName + (hasIndex ? '-' + index : ''), index)
    const path = slot.fn.path
    setCurrentRenderingInstance(prevInstance)
    ;(instance.$scopedSlotsData || (instance.$scopedSlotsData = [])).push({
      path,
      index,
      data,
    })
    instance.$updateScopedSlots()
  }
  invoker.slots = {}
  return invoker
}

const numberRE = /^\d+$/

function isInteger(str: unknown): str is number {
  return numberRE.test(str as string)
}

/**
 * 暂时没啥用，原本计划仅对 scoped slot 数据部分做 diff 更新，现在还是先简单的 forceUpdate，让宿主整体更新吧
 * @param path
 * @param scopedSlotData
 * @param data
 * @returns
 */
export function initScopedSlotDataByPath(
  path: string,
  scopedSlotData: Data,
  data: Data | Data[]
): void {
  const parts = path.split('.')
  const len = parts.length
  const key: string = parts[0]
  if (len === 1) {
    ;(data as Data)[key] = [scopedSlotData]
    return
  }
  const next: string = parts[1]
  let nextData: Data | Data[]
  if (isInteger(next)) {
    // a.0 => {a:[]}
    ;(data as Data)[key] = nextData = []
  } else {
    ;(data as Data)[key] = nextData = {}
  }
  return initScopedSlotDataByPath(
    parts.slice(1).join('.'),
    scopedSlotData,
    nextData
  )
}
