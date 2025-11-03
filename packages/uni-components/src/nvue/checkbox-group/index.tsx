import { defineComponent, inject, provide, ref } from 'vue'
import {
  type CustomEventTrigger,
  type EmitEvent,
  useCustomEvent,
} from '../../helpers/useNVueEvent'
import {
  type CheckBoxGroupProps,
  type UniCheckGroupCtx,
  type UniCheckGroupFieldCtx,
  checkboxGroupProps,
  uniCheckGroupKey,
} from '../../components/checkbox-group'
import { type UniFormCtx, uniFormKey } from '../../components/form'

export default defineComponent({
  name: 'CheckboxGroup',
  props: checkboxGroupProps,
  emits: ['change'],
  setup(props, { slots, emit }) {
    const rootRef = ref<HTMLElement | null>(null)
    const trigger = useCustomEvent<EmitEvent<typeof emit>>(rootRef, emit)

    useProvideCheckGroup(props, trigger)

    return () => {
      return (
        <div ref={rootRef} class="uni-checkbox-group">
          {slots.default && slots.default()}
        </div>
      )
    }
  },
})

function useProvideCheckGroup(
  props: CheckBoxGroupProps,
  trigger: CustomEventTrigger
) {
  const fields: UniCheckGroupFieldCtx[] = []

  const getFieldsValue = () =>
    fields.reduce((res, field) => {
      if (field.value.checkboxChecked) {
        res.push(field.value.value)
      }
      return res
    }, new Array())

  provide<UniCheckGroupCtx>(uniCheckGroupKey, {
    addField(field: UniCheckGroupFieldCtx) {
      fields.push(field)
    },
    removeField(field: UniCheckGroupFieldCtx) {
      fields.splice(fields.indexOf(field), 1)
    },
    checkboxChange($event) {
      trigger('change', {
        value: getFieldsValue(),
      })
    },
  })

  const uniForm = inject<UniFormCtx>(uniFormKey, false as unknown as UniFormCtx)
  if (uniForm) {
    uniForm.addField({
      submit: () => {
        let data: [string, any] = ['', null]
        if (props.name !== '') {
          data[0] = props.name
          data[1] = getFieldsValue()
        }
        return data
      },
    })
  }

  return getFieldsValue
}
