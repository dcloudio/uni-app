import { getCurrentInstance } from 'vue'
import { useHover } from '../../helpers/useHover'
import { defineBuiltInComponent } from '@dcloudio/uni-components'
import { onEventPrevent } from '@dcloudio/uni-core'

const OPEN_TYPES = [
  'navigate',
  'redirect',
  'switchTab',
  'reLaunch',
  'navigateBack',
]

const props = {
  hoverClass: {
    type: String,
    default: 'navigator-hover',
  },
  url: {
    type: String,
    default: '',
  },
  openType: {
    type: String,
    default: 'navigate',
    validator(value: unknown) {
      return Boolean(~OPEN_TYPES.indexOf(value as string))
    },
  },
  delta: {
    type: Number,
    default: 1,
  },
  hoverStartTime: {
    type: [Number, String],
    default: 50,
  },
  hoverStayTime: {
    type: [Number, String],
    default: 600,
  },
  exists: {
    type: String,
    default: '',
  },
  hoverStopPropagation: {
    type: Boolean,
    default: false,
  },
}

export default /*#__PURE__*/ defineBuiltInComponent({
  name: 'Navigator',
  inheritAttrs: false,
  compatConfig: {
    MODE: 3,
  },
  props,
  setup(props, { slots }) {
    const vm = getCurrentInstance()
    const __scopeId = (vm && (vm.root.type as any).__scopeId) || ''
    const { hovering, binding } = useHover(props)

    function onClick($event: MouseEvent) {
      if (props.openType !== 'navigateBack' && !props.url) {
        console.error(
          '<navigator/> should have url attribute when using navigateTo, redirectTo, reLaunch or switchTab'
        )
        return
      }

      switch (props.openType) {
        case 'navigate':
          uni.navigateTo({
            url: props.url,
          })
          break
        case 'redirect':
          uni.redirectTo({
            url: props.url,
            // @ts-ignore
            exists: props.exists,
          })
          break
        case 'switchTab':
          uni.switchTab({
            url: props.url,
          })
          break
        case 'reLaunch':
          uni.reLaunch({
            url: props.url,
          })
          break
        case 'navigateBack':
          uni.navigateBack({
            delta: props.delta,
          })
          break
        default:
          break
      }
    }

    return () => {
      const { hoverClass, url } = props
      const hasHoverClass = props.hoverClass && props.hoverClass !== 'none'
      return (
        <a class="navigator-wrap" href={url} onClick={onEventPrevent}>
          <uni-navigator
            class={hasHoverClass && hovering.value ? hoverClass : ''}
            {...(hasHoverClass && binding)}
            {...(vm ? vm.attrs : {})}
            {...{
              [__scopeId]: '',
            }}
            onClick={onClick}
          >
            {slots.default && slots.default()}
          </uni-navigator>
        </a>
      )
    }
  },
})
