import {
  type Ref,
  computed,
  defineComponent,
  inject,
  onBeforeUnmount,
  ref,
  watch,
} from 'vue'
import { useListeners } from '../../helpers/useListeners'
import { type NVueComponentStyles, createNVueTextVNode } from '../utils'
import { checkboxProps } from '../../components/checkbox'
import {
  type UniCheckGroupCtx,
  uniCheckGroupKey,
} from '../../components/checkbox-group'
import { type UniFormCtx, uniFormKey } from '../../components/form'
import { type UniLabelCtx, uniLabelKey } from '../label'

const checkboxStyles: NVueComponentStyles = [
  {
    'uni-checkbox': {
      '': {
        flexDirection: 'row',
        alignItems: 'center',
      },
    },
    'uni-checkbox-input': {
      '': {
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        borderWidth: '1',
        borderColor: '#d1d1d1',
        borderStyle: 'solid',
        backgroundColor: '#ffffff',
        borderRadius: '3',
        width: '22',
        height: '22',
      },
    },
    'uni-icon': {
      '': {
        fontFamily: 'unincomponents',
        fontSize: '16',
        marginLeft: '2',
        marginTop: '2',
        color: '#007aff',
      },
    },
    'uni-checkbox-input-disabled': {
      '': {
        backgroundColor: '#e1e1e1',
      },
    },
    'uni-checkbox-input-disabled-before': {
      '': {
        color: '#adadad',
      },
    },
    'uni-checkbox-slot': {
      '': {
        fontSize: '16',
        marginLeft: '5',
      },
    },
  },
]

export default defineComponent({
  name: 'Checkbox',
  props: checkboxProps,
  styles: checkboxStyles,
  setup(props, { slots }) {
    const rootRef = ref<HTMLElement | null>(null)
    const checkboxChecked = ref(props.checked)
    const checkboxValue = ref(props.value)

    const checkboxColor = computed(() =>
      props.disabled ? '#adadad' : props.color
    )

    const reset = () => {
      checkboxChecked.value = false
    }

    const _onClick = ($event: Event, isLabelClick?: boolean) => {
      if (props.disabled) {
        return
      }
      if (isLabelClick) {
        // TODO
      }
      checkboxChecked.value = !checkboxChecked.value
      uniCheckGroup && uniCheckGroup.checkboxChange($event)
    }

    const { uniCheckGroup, uniLabel } = useCheckboxInject(
      checkboxChecked,
      checkboxValue,
      reset
    )

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
        checkboxChecked.value = newChecked
        checkboxValue.value = newModelValue
      }
    )

    const wrapSlots = () => {
      if (!slots.default) return []
      const vnodes = slots.default()
      if (vnodes.length === 1 && vnodes[0].type === Text) {
        return [
          createNVueTextVNode(vnodes[0].children as string, {
            class: 'uni-checkbox-slot',
          }),
        ]
      }
      return vnodes
    }

    return () => {
      return (
        <div
          ref={rootRef}
          {...{ dataUncType: 'uni-checkbox' }}
          onClick={_onClick}
          class="uni-checkbox"
        >
          <div
            class="uni-checkbox-input"
            // @ts-expect-error
            class={{ 'uni-checkbox-input-disabled': props.disabled }}
          >
            {checkboxChecked.value
              ? createNVueTextVNode('\uEA08', {
                  class: 'uni-icon',
                  style: {
                    color: checkboxColor.value,
                  },
                })
              : null}
          </div>
          {...wrapSlots()}
        </div>
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
