import {
  defineComponent,
  inject,
  provide,
  ComputedRef,
  ref,
  ExtractPropTypes,
} from 'vue'
import { uniRadioGroupKey } from '../../components/radio-group'
import { UniFormCtx, uniFormKey } from '../../components/form'
import {
  CustomEventTrigger,
  useCustomEvent,
  EmitEvent,
} from '../../helpers/useEvent'

type UniRadioGroupFieldCtx = ComputedRef<{
  radioChecked: boolean
  value: string
}>

const props = {
  name: {
    type: String,
    default: '',
  },
}

type RadioGroupProps = ExtractPropTypes<typeof props>

export interface UniRadioGroupCtx {
  addField: (field: UniRadioGroupFieldCtx) => void
  removeField: (field: UniRadioGroupFieldCtx) => void
  radioChange: ($event: Event) => void
}

export default defineComponent({
  name: 'RadioGroup',
  props,
  emits: ['change'],
  setup(props, { slots, emit }) {
    const rootRef = ref<HTMLElement | null>(null)
    const trigger = useCustomEvent<EmitEvent<typeof emit>>(rootRef, emit)

    useProvideRadioGroup(props, trigger)

    return () => {
      return <div ref={rootRef}>{slots.default && slots.default()}</div>
    }
  },
})

function useProvideRadioGroup(
  props: RadioGroupProps,
  trigger: CustomEventTrigger
) {
  const fields: UniRadioGroupFieldCtx[] = []

  const getFieldsValue = () =>
    fields.reduce((res, field) => {
      if (field.value.radioChecked) {
        res.push(field.value.value)
      }
      return res
    }, new Array())

  provide<UniRadioGroupCtx>(uniRadioGroupKey, {
    addField(field: UniRadioGroupFieldCtx) {
      fields.push(field)
    },
    removeField(field: UniRadioGroupFieldCtx) {
      fields.splice(fields.indexOf(field), 1)
    },
    radioChange($event) {
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
