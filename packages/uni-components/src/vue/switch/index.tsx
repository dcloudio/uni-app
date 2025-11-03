import {
  type ExtractPropTypes,
  type Ref,
  inject,
  onBeforeUnmount,
  onMounted,
  onUnmounted,
  ref,
  watch,
} from 'vue'
import { defineBuiltInComponent } from '../../helpers/component'
import { type EmitEvent, useCustomEvent } from '../../helpers/useEvent'

import { type UniFormCtx, uniFormKey } from '../form'
import { type UniLabelCtx, uniLabelKey } from '../label'
import { useListeners } from '../../helpers/useListeners'
import { useBooleanAttr } from '../../helpers/useBooleanAttr'
import { UniElement } from '../../helpers/UniElement'
import {
  ICON_PATH_SUCCESS_NO_CIRCLE,
  createSvgIconVNode,
} from '@dcloudio/uni-core'

const props = {
  name: {
    type: String,
    default: '',
  },
  checked: {
    type: [Boolean, String],
    default: false,
  },
  type: {
    type: String,
    default: 'switch',
  },
  id: {
    type: String,
    default: '',
  },
  disabled: {
    type: [Boolean, String],
    default: false,
  },
  color: {
    type: String,
    default: '',
  },
}

type SwitchProps = ExtractPropTypes<typeof props>

export class UniSwitchElement extends UniElement {}
export default /*#__PURE__*/ defineBuiltInComponent({
  name: 'Switch',
  props,
  emits: ['change'],
  //#if _X_ && !_NODE_JS_
  rootElement: {
    name: 'uni-switch',
    class: UniSwitchElement,
  },
  //#endif
  setup(props, { emit }) {
    const rootRef = ref<HTMLElement | null>(null)
    const switchChecked = ref(props.checked)

    const uniLabel = useSwitchInject(
      //#if _X_ && !_NODE_JS_
      rootRef,
      //#endif
      props,
      switchChecked
    )
    const trigger = useCustomEvent<EmitEvent<typeof emit>>(rootRef, emit)

    watch(
      () => props.checked,
      (val) => {
        switchChecked.value = val
      }
    )

    const _onClick = ($event: Event) => {
      if (props.disabled) {
        return
      }
      switchChecked.value = !switchChecked.value
      trigger('change', $event, {
        value: switchChecked.value,
      })
    }

    if (!!uniLabel) {
      uniLabel.addHandler(_onClick)
      onBeforeUnmount(() => {
        uniLabel.removeHandler(_onClick)
      })
    }

    useListeners(props, { 'label-click': _onClick })

    //#if _X_ && !_NODE_JS_
    let checkedCache = ref(switchChecked.value)
    watch(
      () => switchChecked.value,
      (val) => {
        checkedCache.value = val
      }
    )
    onMounted(() => {
      const rootElement = rootRef.value as UniSwitchElement
      Object.defineProperty(rootElement, 'checked', {
        get() {
          return checkedCache.value
        },
        set(val) {
          checkedCache.value = val
        },
      })
      rootElement.attachVmProps(props)
    })
    //#endif
    return () => {
      const { color, type } = props
      const booleanAttrs = useBooleanAttr(props, 'disabled')
      const switchInputStyle: {
        backgroundColor?: string
        borderColor?: string
      } = {}
      if (color && switchChecked.value) {
        switchInputStyle['backgroundColor'] = color
        switchInputStyle['borderColor'] = color
      }

      let realCheckValue: boolean | string

      //#if _X_ && !_NODE_JS_
      realCheckValue = checkedCache.value
      //#else
      realCheckValue = switchChecked.value
      //#endif

      return (
        <uni-switch
          id={props.id}
          ref={rootRef}
          {...booleanAttrs}
          onClick={_onClick}
        >
          <div class="uni-switch-wrapper">
            <div
              v-show={type === 'switch'}
              class="uni-switch-input"
              // @ts-expect-error
              class={[switchChecked.value ? 'uni-switch-input-checked' : '']}
              style={switchInputStyle}
            />

            <div v-show={type === 'checkbox'} class="uni-checkbox-input">
              {realCheckValue
                ? createSvgIconVNode(
                    ICON_PATH_SUCCESS_NO_CIRCLE,
                    props.color,
                    22
                  )
                : ''}
            </div>
          </div>
        </uni-switch>
      )
    }
  },
})

function useSwitchInject(
  //#if _X_ && !_NODE_JS_
  rootRef: Ref<HTMLElement | null>,
  //#endif
  props: SwitchProps,
  switchChecked: Ref<string | boolean>
) {
  //#if _X_ && !_NODE_JS_
  const initialCheckedValue: boolean = props.checked as boolean
  //#endif

  const uniForm = inject<UniFormCtx>(uniFormKey, false as unknown as UniFormCtx)
  const uniLabel = inject<UniLabelCtx>(
    uniLabelKey,
    false as unknown as UniLabelCtx
  )

  const formField = {
    submit: () => {
      const data: [string, any] = ['', null]
      if (props.name) {
        data[0] = props.name
        //#if _X_ && !_NODE_JS_
        data[1] = (rootRef.value as UniSwitchElement as any).checked
        //#else
        // @ts-expect-error
        data[1] = switchChecked.value
        //#endif
      }
      return data
    },
    reset: () => {
      //#if _X_ && !_NODE_JS_
      switchChecked.value = initialCheckedValue
      //#else
      switchChecked.value = false
      //#endif
    },
  }

  if (!!uniForm) {
    uniForm.addField(formField)
    onUnmounted(() => {
      uniForm.removeField(formField)
    })
  }

  return uniLabel
}
