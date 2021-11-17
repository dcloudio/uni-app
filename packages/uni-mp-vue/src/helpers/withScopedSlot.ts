import type { ComponentInternalInstance } from 'vue'
//@ts-ignore
import { patch, getCurrentInstance, setCurrentRenderingInstance } from 'vue'

export interface ScopedSlotInvokers {
  [vueId: string]: ScopedSlotInvoker
}

interface ScopedSlotFn {
  (args: Data, key: string, slotName: string): Record<string, any>
  path: string
}

interface ScopedSlotData {
  [key: string]: Data
}
interface ScopedSlotInvoker {
  (slotName: string, args: Data, key?: string | number): void
  slots: {
    [slotName: string]: {
      fn: ScopedSlotFn
      data: ScopedSlotData
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
      data: {},
      fn,
    }
  } else {
    invoker.slots[name].fn = fn
  }
  return invoker.slots[name].data
}

function createScopedSlotInvoker(instance: ComponentInternalInstance) {
  const invoker: ScopedSlotInvoker = (
    slotName: string,
    args: Data,
    key?: string | number
  ) => {
    const slot = invoker.slots[slotName]
    const hasKey = typeof key !== 'undefined'
    key = (key || '0') + ''
    if (!hasKey) {
      // 循环第一个 slot 时，重置 data
      slot.data = {}
    }
    // 确保当前 slot 的上下文，类似 withCtx
    const prevInstance = setCurrentRenderingInstance(instance)
    slot.data[key] = slot.fn(args, key, slotName + (hasKey ? '-' + key : ''))
    setCurrentRenderingInstance(prevInstance)
    // TODO 简单的 forceUpdate,理论上，可以仅对 scoped slot 部分数据 diff 更新
    instance.proxy!.$forceUpdate()
  }
  invoker.slots = {}
  return invoker
}

const nubmerRE = /^\d+$/

function isInteger(str: unknown): str is number {
  return nubmerRE.test(str as string)
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
