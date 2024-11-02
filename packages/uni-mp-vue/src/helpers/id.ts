import { type ComponentInternalInstance, getCurrentInstance, toRaw } from 'vue'

export function setUniElementId(id: string) {
  const { $uniElementIds } =
    getCurrentInstance() as ComponentInternalInstance & {
      $uniElementIds: Set<string>
    }
  id = toRaw(id)
  $uniElementIds.add(id)
  return id
}
