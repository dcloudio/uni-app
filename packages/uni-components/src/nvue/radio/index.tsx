import {
  type Ref,
  computed,
  defineComponent,
  inject,
  onBeforeUnmount,
  ref,
  watch,
} from 'vue'
import { type UniLabelCtx, uniLabelKey } from '../label'
import { useListeners } from '../../helpers/useListeners'
import { type NVueComponentStyles, createNVueTextVNode } from '../utils'
import { radioProps } from '../../components/radio'
import {
  type UniRadioGroupCtx,
  uniRadioGroupKey,
} from '../../components/radio-group'
import { type UniFormCtx, uniFormKey } from '../../components/form'

const radioStyles: NVueComponentStyles = [
  {
    'uni-radio': {
      '': {
        alignItems: 'center',
        flexDirection: 'row',
      },
    },
    'uni-radio-input': {
      '': {
        position: 'relative',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: '5',
        borderStyle: 'solid',
        borderWidth: '1',
        borderColor: '#d1d1d1',
        borderRadius: 50,
        width: '22',
        height: '22',
        outline: 0,
      },
    },
    'uni-radio-input-icon': {
      '': {
        fontFamily: 'unincomponents',
        fontSize: '14',
        color: '#ffffff',
      },
    },
    'uni-radio-input-disabled': {
      '': {
        backgroundColor: '#e1e1e1',
        borderColor: '#d1d1d1',
        color: '#adadad',
      },
    },
    'uni-radio-slot': {
      '': {
        fontSize: '16',
        marginLeft: '5',
      },
    },
  },
]

export default defineComponent({
  name: 'Radio',
  props: radioProps,
  styles: radioStyles,
  emits: ['change'],
  setup(props, { slots }) {
    const rootRef = ref<HTMLElement | null>(null)
    const radioChecked = ref(props.checked)
    const radioValue = ref(props.value)

    const radioStyle = computed(() => {
      const color = props.disabled ? '#adadad' : props.color
      if (radioChecked.value) {
        return {
          backgroundColor: color,
          borderColor: color,
        }
      }
      return {
        borderColor: '#d1d1d1',
      }
    })

    const reset = () => {
      radioChecked.value = false
    }

    const { uniCheckGroup, uniLabel, field } = useRadioInject(
      radioChecked,
      radioValue,
      reset
    )

    const _onClick = ($event: Event, isLabelClick?: boolean) => {
      if (props.disabled || radioChecked.value) {
        return
      }
      if (isLabelClick) {
        // TODO
      }
      radioChecked.value = !radioChecked.value
      uniCheckGroup && uniCheckGroup.radioChange($event, field)
    }

    if (uniLabel) {
      uniLabel.addHandler(_onClick)
      onBeforeUnmount(() => {
        uniLabel.removeHandler(_onClick)
      })
    }
    useListeners(props, { 'label-click': _onClick })

    watch(
      [() => props.checked, () => props.value],
      ([newChecked, newModelValue]) => {
        radioChecked.value = newChecked
        radioValue.value = newModelValue
      }
    )

    const wrapSlots = () => {
      if (!slots.default) return []
      const vnodes = slots.default()
      if (vnodes.length === 1 && vnodes[0].type === Text) {
        return [
          createNVueTextVNode(vnodes[0].children as string, {
            class: 'uni-radio-slot',
          }),
        ]
      }
      return vnodes
    }

    return () => {
      const { disabled } = props
      return (
        <div
          ref={rootRef}
          {...{ dataUncType: 'uni-radio' }}
          onClick={_onClick}
          class="uni-radio"
        >
          <div
            style={radioStyle.value}
            class="uni-radio-input"
            // @ts-expect-error
            class={{ 'uni-radio-input-disabled': disabled }}
          >
            {radioChecked.value
              ? createNVueTextVNode('\uEA08', {
                  class: 'uni-radio-input-icon',
                })
              : null}
          </div>
          {...wrapSlots()}
        </div>
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
