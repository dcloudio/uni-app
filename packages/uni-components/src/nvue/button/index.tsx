import { inject, onBeforeUnmount, ref, defineComponent, Text } from 'vue'
import { uniLabelKey, UniLabelCtx } from '../label'
import { useListeners } from '../../helpers/useListeners'
import { useHoverClass } from '../utils'
import { buttonProps } from '../../components/button'
import { extend } from '@vue/shared'

const buttonStyle = [
  {
    ub: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
      paddingLeft: '5',
      paddingRight: '5',
      overflow: 'hidden',
      color: '#000000',
      backgroundColor: '#f8f8f8',
      borderRadius: '5',
      borderStyle: 'solid',
      borderWidth: '1',
      borderColor: '#dbdbdb',
    },
    'ub-t': {
      color: '#000000',
      fontSize: '18',
      textDecoration: 'none',
      lineHeight: '46',
    },
    'ub-d': {
      backgroundColor: '#f8f8f8',
    },
    'ub-p': {
      backgroundColor: '#007aff',
      borderColor: '#0062cc',
    },
    'ub-w': {
      backgroundColor: '#e64340',
      borderColor: '#b83633',
    },
    'ub-d-t': {
      color: '#000000',
    },
    'ub-p-t': {
      color: '#ffffff',
    },
    'ub-w-t': {
      color: '#ffffff',
    },
    'ub-d-d': {
      backgroundColor: '#f7f7f7',
    },
    'ub-p-d': {
      backgroundColor: '#63acfc',
      borderColor: '#4f8aca',
    },
    'ub-w-d': {
      backgroundColor: '#ec8b89',
      borderColor: '#bd6f6e',
    },
    'ub-d-t-d': {
      color: '#cccccc',
    },
    'ub-p-t-d': {
      color: 'rgba(255,255,255,0.6)',
    },
    'ub-w-t-d': {
      color: 'rgba(255,255,255,0.6)',
    },
    'ub-d-plain': {
      borderColor: '#353535',
      backgroundColor: 'rgba(0,0,0,0)',
    },
    'ub-p-plain': {
      borderColor: '#007aff',
      backgroundColor: 'rgba(0,0,0,0)',
    },
    'ub-w-plain': {
      borderColor: '#e64340',
      backgroundColor: 'rgba(0,0,0,0)',
    },
    'ub-d-t-plain': {
      color: '#353535',
    },
    'ub-p-t-plain': {
      color: '#007aff',
    },
    'ub-w-t-plain': {
      color: '#e64340',
    },
    'ub-d-d-plain': {
      borderColor: '#c6c6c6',
      backgroundColor: 'rgba(0,0,0,0)',
    },
    'ub-p-d-plain': {
      borderColor: '#c6c6c6',
      backgroundColor: 'rgba(0,0,0,0)',
    },
    'ub-w-d-plain': {
      borderColor: '#c6c6c6',
      backgroundColor: 'rgba(0,0,0,0)',
    },
    'ub-d-t-d-plain': {
      color: 'rgba(0,0,0,0.2)',
    },
    'ub-p-t-d-plain': {
      color: 'rgba(0,0,0,0.2)',
    },
    'ub-w-t-d-plain': {
      color: 'rgba(0,0,0,0.2)',
    },
    'ub-mini': {
      lineHeight: '30',
      fontSize: '13',
      paddingTop: 0,
      paddingRight: '17.5',
      paddingBottom: 0,
      paddingLeft: '17.5',
    },
    'ub-loading': {
      width: '18',
      height: '18',
      marginRight: '10',
    },
    'ub-d-loading': {
      color: 'rgba(255,255,255,0.6)',
      backgroundColor: 'rgba(0,0,0,0)',
    },
    'ub-p-loading': {
      color: 'rgba(255,255,255,0.6)',
      backgroundColor: 'rgba(0,0,0,0)',
    },
    'ub-w-loading': {
      color: 'rgba(255,255,255,0.6)',
      backgroundColor: 'rgba(0,0,0,0)',
    },
    'ub-d-loading-plain': {
      color: '#353535',
    },
    'ub-p-loading-plain': {
      color: '#007aff',
      backgroundColor: '#0062cc',
    },
    'ub-w-loading-plain': {
      color: '#e64340',
      backgroundColor: 'rgba(0,0,0,0)',
    },
    'ub-d-hover': {
      opacity: 0.8,
      backgroundColor: '#dedede',
    },
    'ub-p-hover': {
      opacity: 0.8,
      backgroundColor: '#0062cc',
    },
    'ub-w-hover': {
      opacity: 0.8,
      backgroundColor: '#ce3c39',
    },
    'ub-d-t-hover': {
      color: 'rgba(0,0,0,0.6)',
    },
    'ub-p-t-hover': {
      color: 'rgba(255,255,255,0.6)',
    },
    'ub-w-t-hover': {
      color: 'rgba(255,255,255,0.6)',
    },
    'ub-d-hover-plain': {
      color: 'rgba(53,53,53,0.6)',
      borderColor: 'rgba(53,53,53,0.6)',
      backgroundColor: 'rgba(0,0,0,0)',
    },
    'ub-p-hover-plain': {
      color: 'rgba(26,173,25,0.6)',
      borderColor: 'rgba(0,122,255,0.6)',
      backgroundColor: 'rgba(0,0,0,0)',
    },
    'ub-w-hover-plain': {
      color: 'rgba(230,67,64,0.6)',
      borderColor: 'rgba(230,67,64,0.6)',
      backgroundColor: 'rgba(0,0,0,0)',
    },
  },
]
const TYPES = {
  default: 'd',
  primary: 'p',
  warn: 'w',
}

export default defineComponent({
  name: 'Button',
  props: extend(buttonProps, {
    type: {
      type: String,
      default: 'default',
    },
    size: {
      type: String,
      default: 'default',
    },
  }),
  styles: buttonStyle,
  setup(props, { slots, attrs }) {
    const type = props.type as keyof typeof TYPES
    const rootRef = ref<HTMLElement | null>(null)
    const onClick = (e: Event, isLabelClick?: boolean) => {
      if (props.disabled) {
        return
      }
      if (isLabelClick) {
        rootRef.value!.click()
      }
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

    const _getClass = (t: string) => {
      let cl = 'ub-' + TYPES[type] + t
      props.disabled && (cl += '-d')
      props.plain && (cl += '-plain')
      props.size === 'mini' && t === '-t' && (cl += ' ub-mini')
      return cl
    }
    const _getHoverClass = (t: string) => {
      if (props.disabled) {
        return ''
      }
      let cl = 'ub-' + TYPES[type] + t + '-hover'
      props.plain && (cl += '-plain')
      return cl
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

    const wrapSlots = () => {
      if (!slots.default) return []
      const _slots = slots.default()
      return _slots.map((slot) => {
        if (slot.type === Text) {
          return <text>{slot}</text>
        }
        return slot
      })
    }

    return () => {
      return (
        <div
          ref={rootRef}
          class="ub"
          // @ts-expect-error
          class={_getClass('')}
          {...extend({}, useHoverClass(props), {
            hoverClass: _getHoverClass(''),
          })}
          onClick={onClick}
        >
          {props.loading ? (
            <loading-indicator
              class="ub-loading"
              // @ts-expect-error
              class={`ub-${TYPES[type]}-loading`}
              {...{ arrow: 'false', animating: 'true' }}
            ></loading-indicator>
          ) : null}
          {...wrapSlots()}
        </div>
      )
    }
  },
})
