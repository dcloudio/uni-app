/// <reference types="@dcloudio/uni-app-x/types/native-global" />
import { defineBuiltInComponent } from '@dcloudio/uni-components'
import {
  type ComponentInternalInstance,
  type Ref,
  type VNode,
  getCurrentInstance,
  onMounted,
  ref,
} from 'vue'

export const UniFormElement = /* @__PURE__ */ (() =>
  class extends UniElementImpl {
    constructor(data: INodeData, pageNode: PageNode) {
      super(data, pageNode)
    }

    // override getAttribute(key: string): string | null {
    //   const value = this._getAttribute(key)
    //   if (value != null) {
    //     return value
    //   }
    //   return super.getAttribute(key)
    // }

    _getAttribute = (key: string): string | null => {
      return null
    }
  })()

export type UniFormElement = InstanceType<typeof UniFormElement>

class UniFormSubmitEventDetail {
  value = {}
  constructor(value: any) {
    this.value = value
  }
}

class UniFormResetEventDetail {}

export const UniFormSubmitEvent = /* @__PURE__ */ (() =>
  class extends CustomEvent<UniFormSubmitEventDetail> {
    constructor(value: any) {
      super('change', {
        detail: new UniFormSubmitEventDetail(value),
      } as CustomEventOptions<UniFormSubmitEventDetail>)
    }
  })()

export type UniFormSubmitEvent = InstanceType<typeof UniFormSubmitEvent>

export const UniFormResetEvent = /* @__PURE__ */ (() =>
  class extends CustomEvent<UniFormResetEventDetail> {
    constructor() {
      super('change', {
        detail: new UniFormResetEventDetail(),
      } as CustomEventOptions<UniFormResetEventDetail>)
    }
  })()

export type UniFormResetEvent = InstanceType<typeof UniFormResetEvent>

export default /*#__PURE__*/ defineBuiltInComponent({
  name: 'Form',
  rootElement: {
    name: 'uni-form-element',
    // @ts-expect-error not web element
    class: UniFormElement,
  },
  emits: ['submit', 'reset'],
  setup({}, { emit, slots, expose }) {
    const $data = {
      $uniFormElement: null as null | UniFormElement,
    }
    const formRef: Ref<UniFormElement | null> = ref(null)

    let instance: ComponentInternalInstance | null

    function setFormControlsData(formData: any) {
      const controls: UniFormControlElement<unknown>[] = []
      findFormControls(instance!.subTree!, controls)
      controls.forEach((control, _) => {
        setFormData(formData, control.name, control.value as any)
      })
    }

    function setFormData(formData: any, name: string, value: any) {
      // 微信小程序 重复 name 被覆盖
      formData[name] = value
    }

    function findFormControls(
      vNode: VNode,
      controls: UniFormControlElement<unknown>[]
    ) {
      if (!Array.isArray(vNode.children)) {
        return
      }
      const vNodes = vNode.children as VNode[]
      vNodes.forEach((node: VNode) => {
        if (node.el instanceof UniFormControlElement) {
          const control = node.el as UniFormControlElement<unknown>
          if (control.name.length > 0) {
            controls.push(control)
          }
        } else if (node.component != null) {
        } else {
          findFormControls(node, controls)
        }
      })
    }

    function submit() {
      let form_data_out = {}
      setFormControlsData(form_data_out)
      emit('submit', new UniFormSubmitEvent(form_data_out))
    }

    function reset() {
      const controls: UniFormControlElement<unknown>[] = []
      findFormControls(instance!.subTree!, controls)
      controls.forEach((control, _) => {
        control.reset()
      })
      emit('reset', new UniFormResetEvent())
    }

    onMounted(() => {
      instance = getCurrentInstance()!
      instance.$waitNativeRender(() => {
        $data.$uniFormElement = formRef.value!
      })
    })

    expose({
      submit,
      reset,
    })

    return () => {
      return (
        <uni-form-element ref={formRef}>{slots.default?.()}</uni-form-element>
      )
    }
  },
})
