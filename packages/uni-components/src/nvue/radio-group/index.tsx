import {
  defineComponent,
  inject,
  onBeforeUnmount,
  onMounted,
  provide,
  ref,
} from 'vue'
import {
  type RadioGroupProps,
  type UniRadioGroupCtx,
  type UniRadioGroupFieldCtx,
  radioGroupProps,
  uniRadioGroupKey,
} from '../../components/radio-group'
import { type UniFormCtx, uniFormKey } from '../../components/form'
import {
  type CustomEventTrigger,
  type EmitEvent,
  useCustomEvent,
} from '../../helpers/useNVueEvent'

export default defineComponent({
  name: 'RadioGroup',
  props: radioGroupProps,
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

  onMounted(() => {
    _resetRadioGroupValue(fields.length - 1)
  })

  const getFieldsValue = () =>
    fields.find((field) => field.value.radioChecked)?.value.value

  provide<UniRadioGroupCtx>(uniRadioGroupKey, {
    addField(field: UniRadioGroupFieldCtx) {
      fields.push(field)
    },
    removeField(field: UniRadioGroupFieldCtx) {
      fields.splice(fields.indexOf(field), 1)
    },
    radioChange($event: Event, field: UniRadioGroupFieldCtx) {
      const index = fields.indexOf(field)
      _resetRadioGroupValue(index, true)
      trigger('change', {
        value: getFieldsValue(),
      })
    },
  })

  const uniForm = inject<UniFormCtx>(uniFormKey, false as unknown as UniFormCtx)
  const formField = {
    submit: () => {
      let data: [string, any] = ['', null]
      if (props.name !== '') {
        data[0] = props.name
        data[1] = getFieldsValue()
      }
      return data
    },
  }
  if (uniForm) {
    uniForm.addField(formField)
    onBeforeUnmount(() => {
      uniForm.removeField(formField)
    })
  }

  function setFieldChecked(
    field: UniRadioGroupFieldCtx,
    radioChecked: boolean
  ) {
    field.value = {
      radioChecked,
      value: field.value.value,
    }
  }

  function _resetRadioGroupValue(key: number, change?: boolean) {
    fields.forEach((value, index) => {
      if (index === key) {
        return
      }
      if (change) {
        setFieldChecked(fields[index], false)
      }
    })
  }

  return fields
}
