import { onMounted, provide, ref } from 'vue'
import {
  type CustomEventTrigger,
  type EmitEvent,
  useCustomEvent,
} from '@dcloudio/uni-components'
import { PolySymbol } from '@dcloudio/uni-core'
import { defineBuiltInComponent } from '../../helpers/component'
import { UniElement } from '../../helpers/UniElement'

export const uniFormKey = PolySymbol(__DEV__ ? 'uniForm' : 'uf')

export interface UniFormCtx {
  addField: (field: UniFormFieldCtx) => void
  removeField: (field: UniFormFieldCtx) => void
  submit: (evt: Event) => void
  reset: (evt: Event) => void
}

interface UniFormFieldCtx {
  submit?: () => [string, any]
  reset?: () => void
}

export class UniFormElement extends UniElement {}
export default /*#__PURE__*/ defineBuiltInComponent({
  name: 'Form',
  emits: ['submit', 'reset'],
  //#if _X_ && !_NODE_JS_
  rootElement: {
    name: 'uni-form',
    class: UniFormElement,
  },
  //#endif
  setup(_props, { slots, emit }) {
    const rootRef = ref<HTMLElement | null>(null)
    provideForm(useCustomEvent<EmitEvent<typeof emit>>(rootRef, emit))
    //#if _X_ && !_NODE_JS_
    onMounted(() => {
      const rootElement = rootRef.value as UniFormElement
      rootElement.attachVmProps(_props)
    })
    //#endif
    return () => (
      <uni-form ref={rootRef}>
        <span>{slots.default && slots.default()}</span>
      </uni-form>
    )
  },
})

function provideForm(trigger: CustomEventTrigger) {
  const fields: UniFormFieldCtx[] = []
  provide<UniFormCtx>(uniFormKey, {
    addField(field: UniFormFieldCtx) {
      fields.push(field)
    },
    removeField(field: UniFormFieldCtx) {
      fields.splice(fields.indexOf(field), 1)
    },
    submit(evt: Event) {
      trigger('submit', evt, {
        value: fields.reduce((res, field) => {
          if (field.submit) {
            const [name, value] = field.submit()
            name && (res[name] = value)
          }
          return res
        }, Object.create(null)),
      })
    },
    reset(evt: Event) {
      fields.forEach((field) => field.reset && field.reset())
      trigger('reset', evt)
    },
  })
  return fields
}
