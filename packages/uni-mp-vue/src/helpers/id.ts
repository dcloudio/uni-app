import { type ComponentInternalInstance, getCurrentInstance, toRaw } from 'vue'

export function setUniElementId(id: string, tagName: string) {
  const { $uniElementIds } =
    getCurrentInstance() as ComponentInternalInstance & {
      $uniElementIds: Set<string>
    }
  id = toRaw(id)
  // 仅保留第一个，其他忽略
  if (!$uniElementIds.has(id)) {
    $uniElementIds.set(id, tagName)
  }
  return id
}
