import {
  defineComponent,
  inject,
  provide,
  ComputedRef,
  ref,
  ExtractPropTypes,
} from 'vue'
import { uniCheckGroupKey } from '../../components/checkbox-group'
import { UniFormCtx, uniFormKey } from '../../components/form'
import {
  CustomEventTrigger,
  useCustomEvent,
  EmitEvent,
} from '../../helpers/useEvent'

type UniCheckGroupFieldCtx = ComputedRef<{
  checkboxChecked: boolean
  value: string
}>

const props = {
  name: {
    type: String,
    default: '',
  },
}

type CheckBoxGroupProps = ExtractPropTypes<typeof props>

export interface UniCheckGroupCtx {
  addField: (field: UniCheckGroupFieldCtx) => void
  removeField: (field: UniCheckGroupFieldCtx) => void
  checkboxChange: ($event: Event) => void
}

export default defineComponent({
  name: 'CheckboxGroup',
  props,
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
      trigger('change', $event, {
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
