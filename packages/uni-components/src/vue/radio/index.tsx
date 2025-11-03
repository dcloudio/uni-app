import { computed, inject, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import type { Ref } from 'vue'
import { defineBuiltInComponent } from '../../helpers/component'
import { useListeners } from '../../helpers/useListeners'
import { useBooleanAttr } from '../../helpers/useBooleanAttr'
import { UniElement } from '../../helpers/UniElement'
import { type UniRadioGroupCtx, uniRadioGroupKey } from '../radio-group'
import { type UniFormCtx, uniFormKey } from '../form'
import { type UniLabelCtx, uniLabelKey } from '../label'
import {
  ICON_PATH_SUCCESS_NO_CIRCLE,
  createSvgIconVNode,
} from '@dcloudio/uni-core'

const props = {
  checked: {
    type: [Boolean, String],
    default: false,
  },
  id: {
    type: String,
    default: '',
  },
  disabled: {
    type: [Boolean, String],
    default: false,
  },
  value: {
    type: String,
    default: '',
  },
  color: {
    type: String,
    default: '#007aff',
  },
  backgroundColor: {
    type: String,
    default: '',
  },
  borderColor: {
    type: String,
    default: '',
  },
  activeBackgroundColor: {
    type: String,
    default: '',
  },
  activeBorderColor: {
    type: String,
    default: '',
  },
  iconColor: {
    type: String,
    default: '#ffffff',
  },
}

class UniRadioElement extends UniElement {}
export default /*#__PURE__*/ defineBuiltInComponent({
  name: 'Radio',
  props,
  //#if _X_ && !_NODE_JS_
  rootElement: {
    name: 'uni-radio',
    class: UniRadioElement,
  },
  //#endif
  setup(props, { slots }) {
    const rootRef = ref<HTMLElement | null>(null)
    const radioChecked = ref(props.checked)
    const radioValue = ref(props.value)
    //#if _X_ && !_NODE_JS_
    const initialCheckedValue = props.checked
    //#endif

    function getRadioStyle(checked: boolean | string) {
      if (props.disabled) {
        return {
          backgroundColor: '#E1E1E1',
          borderColor: '#D1D1D1',
        }
      }
      const style: { borderColor?: string; backgroundColor?: string } = {}
      // 兼容旧版本样式
      if (radioChecked.value) {
        style.backgroundColor = props.activeBackgroundColor || props.color
        style.borderColor = props.activeBorderColor || style.backgroundColor
      } else {
        if (props.borderColor) style.borderColor = props.borderColor
        if (props.backgroundColor) style.backgroundColor = props.backgroundColor
      }
      return style
    }

    const radioStyle = computed(() => {
      return getRadioStyle(radioChecked.value)
    })

    watch(
      [() => props.checked, () => props.value],
      ([newChecked, newModelValue]) => {
        radioChecked.value = newChecked
        radioValue.value = newModelValue
      }
    )

    const reset = () => {
      //#if _X_ && !_NODE_JS_
      radioChecked.value = initialCheckedValue
      //#else
      radioChecked.value = false
      //#endif
    }

    const { uniCheckGroup, uniLabel, field } = useRadioInject(
      radioChecked,
      radioValue,
      reset
    )

    const _onClick = ($event: Event) => {
      if (props.disabled || radioChecked.value) {
        return
      }
      radioChecked.value = true
      uniCheckGroup && uniCheckGroup.radioChange($event, field)
      $event.stopPropagation()
    }

    if (!!uniLabel) {
      uniLabel.addHandler(_onClick)
      onBeforeUnmount(() => {
        uniLabel.removeHandler(_onClick)
      })
    }
    useListeners(props, { 'label-click': _onClick })

    //#if _X_ && !_NODE_JS_
    const checkedCache = ref(radioChecked.value)
    watch(
      () => radioChecked.value,
      (value) => {
        checkedCache.value = value
      }
    )
    onMounted(() => {
      const rootElement = rootRef.value as UniRadioElement
      Object.defineProperty(rootElement, 'checked', {
        get() {
          return checkedCache.value
        },
        set(value: boolean | string) {
          checkedCache.value = value
          const style = getRadioStyle(value)
          const checkboxInputElement = rootElement.querySelector(
            '.uni-checkbox-input'
          ) as HTMLElement
          for (const key in style) {
            const value = style[key as keyof typeof style]
            value && checkboxInputElement.style.setProperty(key, value)
          }
        },
      })
      rootElement.attachVmProps(props)
    })
    //#endif
    return () => {
      const booleanAttrs = useBooleanAttr(props, 'disabled')

      let realCheckValue: boolean | string

      //#if _X_ && !_NODE_JS_
      realCheckValue = checkedCache.value
      //#else
      realCheckValue = radioChecked.value
      //#endif

      return (
        <uni-radio
          {...booleanAttrs}
          id={props.id}
          onClick={_onClick}
          ref={rootRef}
        >
          <div
            class="uni-radio-wrapper"
            style={{
              '--HOVER-BD-COLOR': !radioChecked.value
                ? props.activeBorderColor
                : radioStyle.value.borderColor,
            }}
          >
            <div
              class="uni-radio-input"
              // @ts-expect-error
              class={{ 'uni-radio-input-disabled': props.disabled }}
              style={radioStyle.value}
            >
              {realCheckValue
                ? createSvgIconVNode(
                    ICON_PATH_SUCCESS_NO_CIRCLE,
                    props.disabled ? '#ADADAD' : props.iconColor,
                    18
                  )
                : ''}
            </div>
            {slots.default && slots.default()}
          </div>
        </uni-radio>
      )
    }
  },
})

function useRadioInject(
  radioChecked: Ref<string | boolean>,
  radioValue: Ref<string>,
  reset: () => void
) {
  const field = computed({
    get: () => ({
      radioChecked: Boolean(radioChecked.value),
      value: radioValue.value,
    }),
    set: ({ radioChecked: checked }) => {
      radioChecked.value = checked
    },
  })
  const formField = { reset }

  const uniCheckGroup = inject<UniRadioGroupCtx>(
    uniRadioGroupKey,
    false as unknown as UniRadioGroupCtx
  )
  if (!!uniCheckGroup) {
    uniCheckGroup.addField(field)
  }

  const uniForm = inject<UniFormCtx>(uniFormKey, false as unknown as UniFormCtx)
  if (!!uniForm) {
    uniForm.addField(formField)
  }

  const uniLabel = inject<UniLabelCtx>(
    uniLabelKey,
    false as unknown as UniLabelCtx
  )

  onBeforeUnmount(() => {
    uniCheckGroup && uniCheckGroup.removeField(field)
    uniForm && uniForm.removeField(formField)
  })

  return {
    uniCheckGroup,
    uniForm,
    uniLabel,
    field,
  }
}
