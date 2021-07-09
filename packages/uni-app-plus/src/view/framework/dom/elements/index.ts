import { isString } from '@vue/shared'
import { createBuiltInComponent } from './components'

import { UniElement } from './UniElement'
import { UniText } from './UniText'

const elements = new Map<number, UniElement | UniText>()

export function $(id: number) {
  return elements.get(id) as UniElement
}

export function createElement(id: number, tag: string | number) {
  let element: UniElement | UniText
  if (isString(tag)) {
    element = new UniElement(id, document.createElement(tag))
  } else {
    element = createBuiltInComponent(tag, id)
  }
  elements.set(id, element)
  return element
}
