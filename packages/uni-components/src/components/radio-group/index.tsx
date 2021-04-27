import { defineComponent, inject, provide, ref, onMounted } from 'vue'
import type { Ref, ExtractPropTypes, WritableComputedRef } from 'vue'
import { PolySymbol } from '@dcloudio/uni-core'
import { UniFormCtx, uniFormKey } from '../form'
import { CustomEventTrigger, useCustomEvent } from '../../helpers/useEvent'

export const uniRadioGroupKey = PolySymbol(__DEV__ ? 'uniCheckGroup' : 'ucg')

type UniRadioGroupFieldCtx = WritableComputedRef<{
  radioChecked: boolean
  value: string
}>

export interface UniRadioGroupCtx {
  addField: (field: UniRadioGroupFieldCtx) => void
  removeField: (field: UniRadioGroupFieldCtx) => void
  radioChange: ($event: Event, field: UniRadioGroupFieldCtx) => void
}

const props = {
  name: {
    type: String,
    default: '',
  },
}

type RadioGroupProps = ExtractPropTypes<typeof props>

export default /*#__PURE__*/ defineComponent({
  name: 'RadioGroup',
  props,
  // emits: ['change'],
  setup(props, { emit, slots }) {
    const rootRef: Ref<HTMLElement | null> = ref(null)
    const trigger = useCustomEvent(rootRef, emit)

    useProvideRadioGroup(props, trigger)

    return () => {
      return (
        <uni-radio-group ref={rootRef}>
          {slots.default && slots.default()}
        </uni-radio-group>
      )
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
      trigger('change', $event, {
        value: getFieldsValue(),
      })
    },
  })

  const uniForm = inject<UniFormCtx>(
    uniFormKey,
    (false as unknown) as UniFormCtx
  )
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
      } else {
        // 这里逻辑有点奇怪，但我决定保留
        fields.forEach((v, i) => {
          if (index >= i) {
            return
          }
          if (fields[i].value.radioChecked) {
            setFieldChecked(fields[index], false)
          }
        })
      }
    })
  }

  return fields
}
