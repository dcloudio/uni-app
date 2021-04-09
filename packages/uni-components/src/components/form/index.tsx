import { PolySymbol } from '@dcloudio/uni-core'
import { defineComponent, provide, SetupContext } from 'vue'

export const uniFormKey = PolySymbol(__DEV__ ? 'uniForm' : 'uf')

export interface UniFormCtx {
  addField: (field: UniFormFieldCtx) => void
  removeField: (field: UniFormFieldCtx) => void
  submit: () => void
  reset: () => void
}

interface UniFormFieldCtx {
  submit: () => [string, any]
  reset: () => void
}

export default defineComponent({
  name: 'Form',
  setup(_props, { slots, emit }) {
    provideForm(emit)
    return () => (
      <uni-form>
        <span>{slots.default && slots.default()}</span>
      </uni-form>
    )
  },
})

function provideForm(emit: SetupContext['emit']) {
  const fields: UniFormFieldCtx[] = []
  provide<UniFormCtx>(uniFormKey, {
    addField(field: UniFormFieldCtx) {
      fields.push(field)
    },
    removeField(field: UniFormFieldCtx) {
      fields.splice(fields.indexOf(field), 1)
    },
    submit() {
      emit('submit', {
        detail: {
          value: fields.reduce((res, field) => {
            const [name, value] = field.submit()
            name && (res[name] = value)
            return res
          }, Object.create(null)),
        },
      })
    },
    reset() {
      fields.forEach((field) => field.reset())
      emit('reset')
    },
  })
  return fields
}
