import type { ExtractPropTypes } from 'vue'

const OPEN_TYPES = [
  'navigate',
  'redirect',
  'switchTab',
  'reLaunch',
  'navigateBack',
]

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
}
