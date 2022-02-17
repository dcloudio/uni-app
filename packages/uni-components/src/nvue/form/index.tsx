import { defineComponent, provide, ref } from 'vue'
import {
  useCustomEvent,
  EmitEvent,
  CustomEventTrigger,
} from '../../helpers/useNVueEvent'
import { uniFormKey, UniFormCtx, UniFormFieldCtx } from '../../components/form'

const NATIVE_COMPONENTS = ['u-input', 'u-textarea']

export default defineComponent({
  name: 'Form',
  emits: ['submit', 'reset'],
  setup({}, { slots, emit }) {
    const rootRef = ref<HTMLElement | null>(null)
    const trigger = useCustomEvent<EmitEvent<typeof emit>>(rootRef, emit)

    const vnodes = slots.default && slots.default()
    provideForm(trigger, vnodes)

    return () => {
      return <view ref={rootRef}>{vnodes}</view>
    }
  },
})

function provideForm(trigger: CustomEventTrigger, children: any) {
  const modulePlus = weex.requireModule('plus')
  const fields: UniFormFieldCtx[] = []
  const getOrClearNativeValue = (nodes: any, outResult: any): void => {
    nodes.forEach(function (node: any) {
      if (
        NATIVE_COMPONENTS.indexOf(node.type) >= 0 &&
        node.el.attr &&
        node.el.attr.name
      ) {
        if (outResult) {
          outResult[node.el.attr.name] = modulePlus.getValue(node.el.nodeId)
        } else {
          node.el.setValue('')
        }
      }
      if (
        Array.isArray(node.children) &&
        node.children &&
        node.children.length
      ) {
        getOrClearNativeValue(node.children, outResult)
      }
    })
  }

  provide<UniFormCtx>(uniFormKey, {
    addField(field: UniFormFieldCtx) {
      fields.push(field)
    },
    removeField(field: UniFormFieldCtx) {
      fields.splice(fields.indexOf(field), 1)
    },
    submit(evt: Event) {
      // 获取原生组件值
      let outFormData: any = {}
      getOrClearNativeValue(children, outFormData)

      let formData = fields.reduce((res, field) => {
        if (field.submit) {
          const [name, value] = field.submit()
          name && (res[name] = value)
        }
        return res
      }, Object.create(null))

      Object.assign(outFormData, formData)

      trigger('submit', {
        value: outFormData,
      })
    },
    reset(evt: Event) {
      // 清空原生组件值
      getOrClearNativeValue(children, null)

      fields.forEach((field) => field.reset && field.reset())
      trigger('reset', evt)
    },
  })
  return fields
}
