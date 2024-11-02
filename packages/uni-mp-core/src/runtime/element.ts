import type { ComponentInternalInstance, ComponentPublicInstance } from 'vue'

import { UniElement } from './dom/UniElement'

/**
 * 每次 render 完成，删除不在 $uniElementIds 中的元素
 * @param ins
 */
export function pruneUniElements(ins: ComponentInternalInstance) {
  // 如果 $uniElements 不在 $uniElementIds 中，则删除
  ins.$uniElements.forEach((_, id) => {
    if (!ins.$uniElementIds.includes(id)) {
      ins.$uniElements.delete(id)
    }
  })
}

/**
 * 根据指定 id 查找元素
 * @param id
 * @param ins
 * @returns
 */
export function findUniElement(
  id: string,
  ins: ComponentInternalInstance
): UniElement | null {
  // 缓存
  const element = ins.$uniElements.get(id) as UniElement | undefined
  if (element) {
    return element
  }
  if (ins.$uniElementIds.includes(id)) {
    const element = new UniElement(id)
    // @ts-expect-error
    ins.$uniElements.set(id, element)
    return element
  }
  // 递归查找
  if (ins.proxy) {
    const children = (
      ins.proxy as unknown as { $children: ComponentPublicInstance[] }
    ).$children
    for (const child of children) {
      const element = findUniElement(id, child.$)
      if (element) {
        return element
      }
    }
  }
  return null
}
