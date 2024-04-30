import type { ExtractPropTypes } from 'vue'

const OPEN_TYPES = [
  'navigate',
  'redirect',
  'switchTab',
  'reLaunch',
  'navigateBack',
]

const ANIMATION_IN = [
  'slide-in-right',
  'slide-in-left',
  'slide-in-top',
  'slide-in-bottom',
  'fade-in',
  'zoom-out',
  'zoom-fade-out',
  'pop-in',
  'none',
]

const ANIMATION_OUT = [
  'slide-out-right',
  'slide-out-left',
  'slide-out-top',
  'slide-out-bottom',
  'fade-out',
  'zoom-in',
  'zoom-fade-in',
  'pop-out',
  'none',
]

type AnimationToType = Parameters<typeof uni.navigateTo>[0]['animationType']
type AnimationBackType = Required<
  Parameters<typeof uni.navigateBack>
>[0]['animationType']
export const navigatorProps = {
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
  animationType: {
    type: String,
    default: '',
    validator(value?: string) {
      return !value || ANIMATION_IN.concat(ANIMATION_OUT).includes(value)
    },
  },
  animationDuration: {
    type: [String, Number],
    default: 300,
  },
}

export function createNavigatorOnClick(
  props: ExtractPropTypes<typeof navigatorProps>
) {
  return () => {
    if (props.openType !== 'navigateBack' && !props.url) {
      console.error(
        '<navigator/> should have url attribute when using navigateTo, redirectTo, reLaunch or switchTab'
      )
      return
    }

    const animationDuration = parseInt(props.animationDuration as string)

    switch (props.openType) {
      case 'navigate':
        uni.navigateTo({
          url: props.url,
          animationType: (props.animationType as AnimationToType) || 'pop-in',
          animationDuration,
        })
        break
      case 'redirect':
        uni.redirectTo({
          url: props.url,
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
          animationType:
            (props.animationType as AnimationBackType) || 'pop-out',
          animationDuration,
        })
        break
      default:
        break
    }
  }
}
