import { inject, onBeforeUnmount, onMounted, provide, ref } from 'vue'
import type { ExtractPropTypes, Ref, WritableComputedRef } from 'vue'
import { PolySymbol } from '@dcloudio/uni-core'
import { type UniFormCtx, uniFormKey } from '../form'
import { defineBuiltInComponent } from '../../helpers/component'
import { UniElement } from '../../helpers/UniElement'
import { type CustomEventTrigger, useCustomEvent } from '../../helpers/useEvent'

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

export class UniRadioGroupElement extends UniElement {}
export default /*#__PURE__*/ defineBuiltInComponent({
  name: 'RadioGroup',
  props,
  // emits: ['change'],
  //#if _X_ && !_NODE_JS_
  rootElement: {
    name: 'uni-radio-group',
    class: UniRadioGroupElement,
  },
  //#endif
  setup(props, { emit, slots }) {
    const rootRef: Ref<HTMLElement | null> = ref(null)
    const trigger = useCustomEvent(rootRef, emit)

    useProvideRadioGroup(props, trigger)

    //#if _X_ && !_NODE_JS_
    onMounted(() => {
      const rootElement = rootRef.value as UniRadioGroupElement
      rootElement.attachVmProps(props)
    })
    //#endif
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

  //#if _X_ && !_NODE_JS_
  // @ts-expect-error
  const getFieldsValue = () =>
    fields.find((field) => field.value.radioChecked)?.value.value + ''
  //#else
  // @ts-expect-error
  const getFieldsValue = () =>
    fields.find((field) => field.value.radioChecked)?.value.value
  //#endif

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
