import { defineComponent, h, reactive } from 'vue'
import { UniComment } from '../UniComment'
import { UniText } from '../UniText'
import { UniViewElement } from '../UniViewElement'
import { UniButtonElement } from './UniButtonElement'

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
  UniButtonElement,
]

export function createBuiltInComponent(type: number, id: number) {
  return new BuiltInComponents[type]!(id)
}

export function createWrapper(component: ReturnType<typeof defineComponent>) {
  return defineComponent({
    props: ['attrs'],
    data() {
      return {
        props: this.attrs,
      }
    },
    render() {
      return h(component, this.props)
    },
  })
}
