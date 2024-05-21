import { computed, inject, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import type { Ref } from 'vue'
import { defineBuiltInComponent } from '../../helpers/component'
import { useListeners } from '../../helpers/useListeners'
import { useBooleanAttr } from '../../helpers/useBooleanAttr'
import { UniElement } from '../../helpers/UniElement'
import { uniCheckGroupKey } from '../checkbox-group'
import type { UniCheckGroupCtx } from '../checkbox-group'
import { uniFormKey } from '../form'
import type { UniFormCtx } from '../form'
import { uniLabelKey } from '../label'
import type { UniLabelCtx } from '../label'
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
    default: '',
  },
  // 图标颜色,同color,优先级大于iconColor
  foregroundColor: {
    type: String,
    default: '',
  },
}

export class UniCheckboxElement extends UniElement {}
export default /*#__PURE__*/ defineBuiltInComponent({
  name: 'Checkbox',
  props,
  //#if _X_ && !_NODE_JS_
  rootElement: {
    name: 'uni-checkbox',
    class: UniCheckboxElement,
  },
  //#endif
  setup(props, { slots }) {
    const rootRef = ref<HTMLElement | null>(null)
    const checkboxChecked = ref(props.checked)
    const checkboxCheckedBool = computed(() => {
      return checkboxChecked.value === 'true' || checkboxChecked.value === true
    })
    const checkboxValue = ref(props.value)
    //#if _X_ && !_NODE_JS_
    const initialCheckedValue = props.checked
    //#endif

    function getCheckBoxStyle(checked: boolean) {
      if (props.disabled) {
        return {
          backgroundColor: '#E1E1E1',
          borderColor: '#D1D1D1',
        }
      }
      const style: { borderColor?: string; backgroundColor?: string } = {}
      // 兼容旧版本样式
      if (checked) {
        if (props.activeBorderColor) style.borderColor = props.activeBorderColor
        if (props.activeBackgroundColor)
          style.backgroundColor = props.activeBackgroundColor
      } else {
        if (props.borderColor) style.borderColor = props.borderColor
        if (props.backgroundColor) style.backgroundColor = props.backgroundColor
      }
      return style
    }

    const checkboxStyle = computed(() => {
      return getCheckBoxStyle(checkboxCheckedBool.value)
    })

    watch(
      [() => props.checked, () => props.value],
      ([newChecked, newModelValue]) => {
        checkboxChecked.value = newChecked
        checkboxValue.value = newModelValue
      }
    )

    const reset = () => {
      //#if _X_ && !_NODE_JS_
      checkboxChecked.value = initialCheckedValue
      //#else
      checkboxChecked.value = false
      //#endif
    }

    const { uniCheckGroup, uniLabel } = useCheckboxInject(
      checkboxChecked,
      checkboxValue,
      reset
    )

    const _onClick = ($event: Event) => {
      if (props.disabled) {
        return
      }
      checkboxChecked.value = !checkboxChecked.value
      uniCheckGroup && uniCheckGroup.checkboxChange($event)
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
    // disable之后也要能获取已设置的value
    let checkedCache = ref(checkboxCheckedBool.value)
    watch(
      () => checkboxCheckedBool.value,
      (newChecked) => {
        checkedCache.value = newChecked
      }
    )
    onMounted(() => {
      const rootElement = rootRef.value as UniCheckboxElement
      Object.defineProperty(rootElement, 'checked', {
        get() {
          return checkedCache.value
        },
        set(val) {
          checkedCache.value = val
          const style = getCheckBoxStyle(val)
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
      realCheckValue = checkboxChecked.value
      //#endif

      return (
        <uni-checkbox
          {...booleanAttrs}
          id={props.id}
          onClick={_onClick}
          ref={rootRef}
        >
          <div
            class="uni-checkbox-wrapper"
            style={{ '--HOVER-BD-COLOR': props.activeBorderColor }}
          >
            <div
              class="uni-checkbox-input"
              // @ts-expect-error
              class={{ 'uni-checkbox-input-disabled': props.disabled }}
              style={checkboxStyle.value}
            >
              {realCheckValue
                ? createSvgIconVNode(
                    ICON_PATH_SUCCESS_NO_CIRCLE,
                    props.disabled
                      ? '#ADADAD'
                      : props.foregroundColor || props.iconColor || props.color,
                    22
                  )
                : ''}
            </div>
            {slots.default && slots.default()}
          </div>
        </uni-checkbox>
      )
    }
  },
})

function useCheckboxInject(
  checkboxChecked: Ref<string | boolean>,
  checkboxValue: Ref<string>,
  reset: () => void
) {
  const field = computed(() => ({
    checkboxChecked: Boolean(checkboxChecked.value),
    value: checkboxValue.value,
  }))
  const formField = { reset }

  const uniCheckGroup = inject<UniCheckGroupCtx>(
    uniCheckGroupKey,
    false as unknown as UniCheckGroupCtx
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
  }
}
