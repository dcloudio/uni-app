import type { ComponentInternalInstance } from 'vue'
//@ts-ignore
import { patch, getCurrentInstance } from 'vue'

export interface ScopedSlotInvokers {
  [vueId: string]: ScopedSlotInvoker
}

interface ScopedSlotFn {
  (args: Data, key: number, index: number): Record<string, any>
  path: string
}

interface ScopedSlotInvoker {
  (slotName: string, args: Data): void
  slots: {
    [slotName: string]: {
      fn: ScopedSlotFn
      data: Data
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
  fn.path = path
  const instance = getCurrentInstance() as ComponentInternalInstance
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
  // 返回单元素数组，因为 scoped slot 被转换成了 for 循环
  return [invoker.slots[name].data]
}

function createScopedSlotInvoker(instance: ComponentInternalInstance) {
  const invoker: ScopedSlotInvoker = (slotName: string, args: Data) => {
    const slot = invoker.slots[slotName]
    slot.data = slot.fn(args, 0, 0)
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
