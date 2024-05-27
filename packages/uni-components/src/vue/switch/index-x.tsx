import {
  inject,
  onBeforeUnmount,
  onMounted,
  onUnmounted,
  ref,
  watch,
} from 'vue'
import type { ExtractPropTypes, Ref } from 'vue'
import { defineBuiltInComponent } from '../../helpers/component'
import { useCustomEvent } from '../../helpers/useEvent'
import type { EmitEvent } from '../../helpers/useEvent'

import { uniFormKey } from '../form'
import type { UniFormCtx } from '../form'
import { uniLabelKey } from '../label'
import type { UniLabelCtx } from '../label'
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
  backgroundColor: {
    type: String,
    default: '#e9e9ea',
  },
  activeBackgroundColor: {
    type: String,
    default: '',
  },
  foregroundColor: {
    type: String,
    default: '',
  },
  activeForegroundColor: {
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

    const uniLabel = useSwitchInject(rootRef, props, switchChecked)
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

    let checkedCache = ref(switchChecked.value)
    watch(
      () => switchChecked.value,
      (val) => {
        checkedCache.value = val
      }
    )

    //#if _X_ && !_NODE_JS_
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
      const {
        activeBackgroundColor,
        activeForegroundColor,
        backgroundColor,
        color,
        foregroundColor,
        type,
      } = props
      const booleanAttrs = useBooleanAttr(props, 'disabled')
      const switchInputStyle: {
        backgroundColor?: string
        borderColor?: string
      } = {}
      const fixColor = activeBackgroundColor || color
      const bgColor = switchChecked.value ? fixColor : backgroundColor
      if (bgColor) {
        switchInputStyle['backgroundColor'] = bgColor
        switchInputStyle['borderColor'] = bgColor
      }

      const thumbStyle: {
        backgroundColor?: string
      } = {}
      const fgColor = switchChecked.value
        ? activeForegroundColor
        : foregroundColor
      if (fgColor) {
        thumbStyle['backgroundColor'] = fgColor
      }

      let realCheckValue: boolean | string
      realCheckValue = checkedCache.value

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
            >
              <div
                class="uni-switch-thumb"
                // @ts-expect-error
                class={[switchChecked.value ? 'uni-switch-thumb-checked' : '']}
                style={thumbStyle}
              />
            </div>

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
  rootRef: Ref<HTMLElement | null>,
  props: SwitchProps,
  switchChecked: Ref<string | boolean>
) {
  const initialCheckedValue: boolean = props.checked as boolean
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
        data[1] = (rootRef.value as UniSwitchElement as any).checked
      }
      return data
    },
    reset: () => {
      switchChecked.value = initialCheckedValue
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
