import { decodeAttr, decodeTag } from '@dcloudio/uni-shared'

const elements = new Map<number, Element>()

export function $(id: number) {
  return elements.get(id)!
}

export function createElement(id: number, tag: string) {
  const element = document.createElement(decodeTag(tag))
  elements.set(id, element)
  return element
}

export function setElementAttr(element: Element, name: string, value: unknown) {
  // TODO
  element.setAttribute(decodeAttr(name), value as string)
}
