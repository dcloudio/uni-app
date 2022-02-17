import {
  defineComponent,
  inject,
  onBeforeUnmount,
  ref,
  computed,
  watch,
} from 'vue'
import { uniLabelKey, UniLabelCtx } from '../label'
import { useListeners } from '../../helpers/useListeners'
import { NVueComponentStyles, createNVueTextVNode } from '../utils'
import { checkboxProps } from '../../components/checkbox'

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
    const onClick = (e: Event, isLabelClick?: boolean) => {
      if (props.disabled) {
        return
      }
      if (isLabelClick) {
        rootRef.value!.click()
      }
      checkboxChecked.value = !checkboxChecked.value
    }

    const checkboxColor = computed(() =>
      props.disabled ? '#adadad' : props.color
    )

    watch(
      [() => props.checked, () => props.value],
      ([newChecked, newModelValue]) => {
        checkboxChecked.value = newChecked
        checkboxValue.value = newModelValue
      }
    )

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
          onClick={onClick}
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
