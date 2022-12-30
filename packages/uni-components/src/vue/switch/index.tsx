import {
  ref,
  onBeforeUnmount,
  watch,
  inject,
  onUnmounted,
  ExtractPropTypes,
  Ref,
} from 'vue'
import { defineBuiltInComponent } from '../../helpers/component'
import { useCustomEvent, EmitEvent } from '../../helpers/useEvent'

import { UniFormCtx, uniFormKey } from '../form'
import { UniLabelCtx, uniLabelKey } from '../label'
import { useListeners } from '../../helpers/useListeners'
import { useBooleanAttr } from '../../helpers/useBooleanAttr'
import {
  createSvgIconVNode,
  ICON_PATH_SUCCESS_NO_CIRCLE,
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

export default /*#__PURE__*/ defineBuiltInComponent({
  name: 'Switch',
  props,
  emits: ['change'],
  setup(props, { emit }) {
    const rootRef = ref<HTMLElement | null>(null)
    const switchChecked = ref(props.checked)

    const uniLabel = useSwitchInject(props, switchChecked)
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

      return (
        <uni-switch ref={rootRef} {...booleanAttrs} onClick={_onClick}>
          <div class="uni-switch-wrapper">
            <div
              v-show={type === 'switch'}
              class="uni-switch-input"
              // @ts-ignore
              class={[switchChecked.value ? 'uni-switch-input-checked' : '']}
              style={switchInputStyle}
            />

            <div v-show={type === 'checkbox'} class="uni-checkbox-input">
              {switchChecked.value
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
  props: SwitchProps,
  switchChecked: Ref<string | boolean>
) {
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
        data[1] = switchChecked.value
      }
      return data
    },
    reset: () => {
      switchChecked.value = false
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
