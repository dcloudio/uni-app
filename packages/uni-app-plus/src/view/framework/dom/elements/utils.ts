import { isString } from '@vue/shared'
import { UniComment } from './UniComment'
import { UniElement } from './UniElement'
import { UniText } from './UniText'
import { UniViewElement } from './UniViewElement'

export interface UniCustomElement extends Element {
  __id: number
  __listeners: Record<string, (evt: Event) => void>
}
const elements = new Map<number, UniElement | UniText>()

const UniBuiltInComponents = [, UniViewElement, , , UniText, UniComment]

function createUniComponent(type: number, id: number) {
  return new UniBuiltInComponents[type]!(id)
}

export function $(id: number) {
  return elements.get(id) as UniElement
}

export function createElement(id: number, tag: string | number) {
  let element: UniElement | UniText
  if (isString(tag)) {
    element = new UniElement(id, tag)
  } else {
    element = createUniComponent(tag, id)
  }
  elements.set(id, element)
  return element
}
