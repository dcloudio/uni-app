import {
  defineComponent,
  onBeforeUnmount,
  watch,
  inject,
  ref,
  computed,
} from 'vue'
import type { Ref } from 'vue'
import { useListeners } from '../../helpers/useListeners'
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
  color: {
    type: String,
    default: '#007aff',
  },
  value: {
    type: String,
    default: '',
  },
}

export default /*#__PURE__*/ defineComponent({
  name: 'Checkbox',
  props,
  setup(props, { slots }) {
    const checkboxChecked = ref(props.checked)
    const checkboxValue = ref(props.value)

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
    }

    uniLabel.addHandler(_onClick)
    onBeforeUnmount(() => {
      uniLabel.removeHandler(_onClick)
    })
    useListeners(props, { 'label-click': _onClick })

    return () => {
      const { disabled, color } = props

      return (
        <uni-checkbox disabled={disabled} onClick={_onClick}>
          <div class="uni-checkbox-wrapper">
            <div class="uni-checkbox-input">
              {checkboxChecked.value
                ? createSvgIconVNode(ICON_PATH_SUCCESS_NO_CIRCLE, color, 16)
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
  const filed = computed(() => ({
    checkboxChecked: Boolean(checkboxChecked.value),
    value: checkboxValue.value,
  }))
  const formField = { reset }

  const uniCheckGroup = inject<UniCheckGroupCtx>(
    uniCheckGroupKey,
    (false as unknown) as UniCheckGroupCtx
  )
  if (!!uniCheckGroup) {
    uniCheckGroup.addField(filed)
  }

  const uniForm = inject<UniFormCtx>(
    uniFormKey,
    (false as unknown) as UniFormCtx
  )
  if (!!uniForm) {
    uniForm.addField(formField)
  }

  const uniLabel = inject<UniLabelCtx>(
    uniLabelKey,
    (false as unknown) as UniLabelCtx
  )

  onBeforeUnmount(() => {
    uniCheckGroup && uniCheckGroup.removeField(filed)
    uniForm && uniForm.addField(formField)
  })

  return {
    uniCheckGroup,
    uniForm,
    uniLabel,
  }
}
