import { onBeforeUnmount, watch, inject, ref, computed } from 'vue'
import type { Ref } from 'vue'
import { defineBuiltInComponent } from '../../helpers/component'
import { useListeners } from '../../helpers/useListeners'
import { useBooleanAttr } from '../../helpers/useBooleanAttr'
import { UniCheckGroupCtx, uniCheckGroupKey } from '../checkbox-group'
import { UniFormCtx, uniFormKey } from '../form'
import { uniLabelKey, UniLabelCtx } from '../label'
import {
  createSvgIconVNode,
  ICON_PATH_SUCCESS_NO_CIRCLE,
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
}

export default /*#__PURE__*/ defineBuiltInComponent({
  name: 'Checkbox',
  props,
  setup(props, { slots }) {
    const checkboxChecked = ref(props.checked)
    const checkboxValue = ref(props.value)

    const checkboxStyle = computed(() => {
      if (props.disabled) {
        return {
          backgroundColor: '#E1E1E1',
          borderColor: '#D1D1D1',
        }
      }
      const style: { borderColor?: string; backgroundColor?: string } = {}
      // 兼容旧版本样式
      if (checkboxChecked.value) {
        if (props.activeBorderColor) style.borderColor = props.activeBorderColor
        if (props.activeBackgroundColor)
          style.backgroundColor = props.activeBackgroundColor
      } else {
        if (props.borderColor) style.borderColor = props.borderColor
        if (props.backgroundColor) style.backgroundColor = props.backgroundColor
      }
      return style
    })

    watch(
      [() => props.checked, () => props.value],
      ([newChecked, newModelValue]) => {
        checkboxChecked.value = newChecked
        checkboxValue.value = newModelValue
      }
    )

    const reset = () => {
      checkboxChecked.value = false
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

    return () => {
      const booleanAttrs = useBooleanAttr(props, 'disabled')

      return (
        <uni-checkbox {...booleanAttrs} onClick={_onClick}>
          <div
            class="uni-checkbox-wrapper"
            style={{ '--HOVER-BD-COLOR': props.activeBorderColor }}
          >
            <div
              class="uni-checkbox-input"
              // @ts-ignore
              class={{ 'uni-checkbox-input-disabled': props.disabled }}
              style={checkboxStyle.value}
            >
              {checkboxChecked.value
                ? createSvgIconVNode(
                    ICON_PATH_SUCCESS_NO_CIRCLE,
                    props.disabled ? '#ADADAD' : props.iconColor || props.color,
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
