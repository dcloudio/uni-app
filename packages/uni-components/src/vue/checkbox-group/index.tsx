import { inject, provide, ref, onMounted } from 'vue'
import type { Ref, ExtractPropTypes, ComputedRef } from 'vue'
import { PolySymbol } from '@dcloudio/uni-core'
import { UniFormCtx, uniFormKey } from '../form'
import {
  CustomEventTrigger,
  useCustomEvent,
  EmitEvent,
} from '../../helpers/useEvent'
import { defineBuiltInComponent } from '../../helpers/component'
import { UniElement } from '../../helpers/UniElement'

export const uniCheckGroupKey = PolySymbol(__DEV__ ? 'uniCheckGroup' : 'ucg')

type UniCheckGroupFieldCtx = ComputedRef<{
  checkboxChecked: boolean
  value: string
}>

export interface UniCheckGroupCtx {
  addField: (field: UniCheckGroupFieldCtx) => void
  removeField: (field: UniCheckGroupFieldCtx) => void
  checkboxChange: ($event: Event) => void
}

const props = {
  name: {
    type: String,
    default: '',
  },
}

type CheckBoxGroupProps = ExtractPropTypes<typeof props>

export class UniCheckboxGroupElement extends UniElement {}
export default /*#__PURE__*/ defineBuiltInComponent({
  name: 'CheckboxGroup',
  props,
  emits: ['change'],
  //#if _X_ && !_NODE_JS_
  rootElement: {
    name: 'uni-checkbox-group',
    class: UniCheckboxGroupElement,
  },
  //#endif
  setup(props, { emit, slots }) {
    const rootRef: Ref<HTMLElement | null> = ref(null)
    const trigger = useCustomEvent<EmitEvent<typeof emit>>(rootRef, emit)

    useProvideCheckGroup(props, trigger)

    //#if _X_ && !_NODE_JS_
    onMounted(() => {
      const rootElement = rootRef.value as UniCheckboxGroupElement
      rootElement.attachVmProps(props)
    })
    //#endif
    return () => {
      return (
        <uni-checkbox-group ref={rootRef}>
          {slots.default && slots.default()}
        </uni-checkbox-group>
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
        //#if _X_ && !_NODE_JS_
        // @ts-ignore
        res.push(field.value.value + '')
        //#else
        // @ts-ignore
        res.push(field.value.value)
        //#endif
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
