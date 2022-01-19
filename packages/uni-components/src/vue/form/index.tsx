import { provide, ref } from 'vue'
import {
  CustomEventTrigger,
  EmitEvent,
  useCustomEvent,
} from '@dcloudio/uni-components'
import { PolySymbol } from '@dcloudio/uni-core'
import { defineBuiltInComponent } from '../../helpers/component'

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

export default /*#__PURE__*/ defineBuiltInComponent({
  name: 'Form',
  emits: ['submit', 'reset'],
  setup(_props, { slots, emit }) {
    const rootRef = ref<HTMLElement | null>(null)
    provideForm(useCustomEvent<EmitEvent<typeof emit>>(rootRef, emit))
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
