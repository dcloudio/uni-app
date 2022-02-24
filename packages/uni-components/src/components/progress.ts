import { PRIMARY_COLOR } from '@dcloudio/uni-shared'

const FONT_SIZE = 16

export const PROGRESS_VALUES = {
  activeColor: PRIMARY_COLOR,
  backgroundColor: '#EBEBEB',
  activeMode: 'backwards',
}

export const progressProps = {
  percent: {
    type: [Number, String],
    default: 0,
    validator(value: number | string) {
      return !isNaN(parseFloat(value as string))
    },
  },
  fontSize: {
    type: [String, Number],
    default: FONT_SIZE,
  },
  showInfo: {
    type: [Boolean, String],
    default: false,
  },
  strokeWidth: {
    type: [Number, String],
    default: 6,
    validator(value: number | string) {
      return !isNaN(parseFloat(value as string))
    },
  },
  color: {
    type: String,
    default: PROGRESS_VALUES.activeColor,
  },
  activeColor: {
    type: String,
    default: PROGRESS_VALUES.activeColor,
  },
  backgroundColor: {
    type: String,
    default: PROGRESS_VALUES.backgroundColor,
  },
  active: {
    type: [Boolean, String],
    default: false,
  },
  activeMode: {
    type: String,
    default: PROGRESS_VALUES.activeMode,
  },
  duration: {
    type: [Number, String],
    default: 30,
    validator(value: number | string) {
      return !isNaN(parseFloat(value as string))
    },
  },
  borderRadius: {
    type: [Number, String],
    default: 0,
  },
}
