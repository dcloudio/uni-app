import { formatLog } from '@dcloudio/uni-shared'
import type { UniNode } from './elements/UniNode'
import type { UniElement } from './elements/UniElement'

const elements = new Map<number, UniNode>()

export function $(id: number) {
  return elements.get(id) as UniElement<any>
}

export function getElement(id: number) {
  return elements.get(id)
}

export function setElement(id: number, element: UniNode) {
  elements.set(id, element)
}

export function removeElement(id: number) {
  if (__DEV__) {
    console.log(formatLog('Remove', id, elements.size - 1))
  }
  return elements.delete(id)
}
