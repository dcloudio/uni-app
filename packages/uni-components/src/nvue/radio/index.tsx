import {
  defineComponent,
  inject,
  onBeforeUnmount,
  ref,
  computed,
  watch,
  reactive,
  ExtractPropTypes,
} from 'vue'
import { uniLabelKey, UniLabelCtx } from '../label'
import { useListeners } from '../../helpers/useListeners'
import { NVueComponentStyles, createNVueTextVNode } from '../utils'
import { radioProps } from '../../components/radio'

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

type RadioProps = ExtractPropTypes<typeof radioProps>

export default defineComponent({
  name: 'Radio',
  props: radioProps,
  styles: radioStyles,
  emits: ['change'],
  setup(props, { slots }) {
    const rootRef = ref<HTMLElement | null>(null)

    const state = useRadioState(props)

    const onClick = (e: Event, isLabelClick?: boolean) => {
      if (props.disabled) {
        return
      }
      if (isLabelClick) {
        rootRef.value!.click()
      }
      state.radioChecked = !state.radioChecked
      /* const formType = props.formType
      if (formType) {
        if (!uniForm) {
          return
        }
        if (formType === 'submit') {
          uniForm.submit(e)
        } else if (formType === 'reset') {
          uniForm.reset(e)
        }
      } */
    }

    const uniLabel = inject<UniLabelCtx>(
      uniLabelKey,
      false as unknown as UniLabelCtx
    )
    if (uniLabel) {
      uniLabel.addHandler(onClick)
      onBeforeUnmount(() => {
        uniLabel.removeHandler(onClick)
      })
    }
    useListeners(props, { 'label-click': onClick })

    watch(
      [() => props.checked, () => props.value],
      ([newChecked, newModelValue]) => {
        state.radioChecked = newChecked
        state.radioValue = newModelValue
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
      const { radioChecked, radioStyle } = state
      return (
        <div
          ref={rootRef}
          {...{ dataUncType: 'uni-radio' }}
          onClick={onClick}
          class="uni-radio"
        >
          <div
            style={radioStyle}
            class="uni-radio-input"
            // @ts-expect-error
            class={{ 'uni-radio-input-disabled': disabled }}
          >
            {radioChecked
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

function useRadioState(props: RadioProps) {
  const radioChecked = ref(props.checked)
  const radioValue = ref(props.value)

  const radioStyle = computed(() => {
    if (radioChecked.value) {
      return {
        backgroundColor: props.color,
        borderColor: props.color,
      }
    }
    return {
      borderColor: '#d1d1d1',
    }
  })

  const radioColor = computed(() => (props.disabled ? '#adadad' : props.color))

  const state = reactive({
    radioStyle,
    radioColor,
    radioChecked,
    radioValue,
  })
  return state
}
