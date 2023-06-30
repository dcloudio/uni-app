import { onBeforeUnmount, watch, inject, ref, computed } from 'vue'
import type { Ref } from 'vue'
import { defineBuiltInComponent } from '../../helpers/component'
import { useListeners } from '../../helpers/useListeners'
import { useBooleanAttr } from '../../helpers/useBooleanAttr'
import { UniRadioGroupCtx, uniRadioGroupKey } from '../radio-group'
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
  color: {
    type: String,
    default: '#007aff',
  },
  value: {
    type: String,
    default: '',
  },
}

export default /*#__PURE__*/ defineBuiltInComponent({
  name: 'Radio',
  props,
  setup(props, { slots }) {
    const radioChecked = ref(props.checked)
    const radioValue = ref(props.value)

    const checkedStyle = computed(() => {
      if (props.disabled)
        return 'background-color: #E1E1E1;border-color: ##D1D1D1;'
      return `background-color: ${props.color};border-color: ${props.color};`
    })

    watch(
      [() => props.checked, () => props.value],
      ([newChecked, newModelValue]) => {
        radioChecked.value = newChecked
        radioValue.value = newModelValue
      }
    )

    const reset = () => {
      radioChecked.value = false
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

    return () => {
      const booleanAttrs = useBooleanAttr(props, 'disabled')

      return (
        <uni-radio {...booleanAttrs} onClick={_onClick}>
          <div class="uni-radio-wrapper">
            <div
              class="uni-radio-input"
              // @ts-ignore
              class={{ 'uni-radio-input-disabled': props.disabled }}
              style={radioChecked.value ? checkedStyle.value : ''}
            >
              {radioChecked.value
                ? createSvgIconVNode(
                    ICON_PATH_SUCCESS_NO_CIRCLE,
                    props.disabled ? '#ADADAD' : '#fff',
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
