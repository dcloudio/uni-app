import { getCurrentInstance, toRaw } from 'vue'

export function setUniElementId(id: string, tagName: string) {
  const ins = getCurrentInstance()
  if (ins) {
    const { $uniElementIds } = ins
    id = toRaw(id)
    // 仅保留第一个，其他忽略
    if (!$uniElementIds.has(id)) {
      $uniElementIds.set(id, { name: tagName })
    }
  }
  return id
}
