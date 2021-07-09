import { defineComponent, h } from 'vue'
import { UniComment } from '../elements/UniComment'
import { UniText } from '../elements/UniText'
import { UniViewElement } from '../elements/UniViewElement'
import { UniButton } from './UniButton'

export interface UniCustomElement extends Element {
  __id: number
  __listeners: Record<string, (evt: Event) => void>
}

const BuiltInComponents = [
  ,
  UniViewElement,
  ,
  ,
  UniText,
  UniComment,
  ,
  ,
  UniButton,
]

export type WrapperComponent = ReturnType<typeof createWrapper>

export function createBuiltInComponent(type: number, id: number) {
  return new BuiltInComponents[type]!(id)
}

export function createWrapper(
  component: ReturnType<typeof defineComponent>,
  props: Record<string, any>
) {
  return () => h(component, props)
}
