import {
  type ExtractPropTypes,
  type Ref,
  defineComponent,
  inject,
  onBeforeUnmount,
  onUnmounted,
  ref,
  watch,
} from 'vue'
import { type EmitEvent, useCustomEvent } from '../../helpers/useNVueEvent'
import { type UniFormCtx, uniFormKey } from '../../components/form'
import { type UniLabelCtx, uniLabelKey } from '../label'
import { useListeners } from '../../helpers/useListeners'
import { switchProps } from '../../components/switch'

const SwitchType = {
  switch: 'switch',
  checkbox: 'checkbox',
}
const DCSwitchSize = {
  width: 52,
  height: 32,
}

type SwitchProps = ExtractPropTypes<typeof switchProps>

export default defineComponent({
  name: 'Switch',
  props: switchProps,
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

    const _onClick = ($event: Event | CustomEvent, isLabelClick?: boolean) => {
      if (props.disabled) {
        return
      }
      if (isLabelClick) {
        // TODO
      }
      switchChecked.value = ($event as CustomEvent).detail
        ? ($event as CustomEvent).detail.value
        : !switchChecked.value
      trigger('change', {
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
      const { color, type, disabled } = props
      return (
        <div ref={rootRef}>
          {type === SwitchType.switch ? (
            <dc-switch
              {...{ dataUncType: 'uni-switch' }}
              onChange={_onClick}
              {...{
                checked: switchChecked.value,
                color: color,
                disabled: disabled,
              }}
              style={DCSwitchSize}
            />
          ) : null}
          {type === SwitchType.checkbox ? (
            <checkbox
              style={{ color: color }}
              {...{ checked: switchChecked.value, disabled: disabled }}
              onClick={_onClick}
            />
          ) : null}
        </div>
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
