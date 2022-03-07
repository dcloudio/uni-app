export const swiperProps = {
  indicatorDots: {
    type: [Boolean, String],
    default: false,
  },
  vertical: {
    type: [Boolean, String],
    default: false,
  },
  autoplay: {
    type: [Boolean, String],
    default: false,
  },
  circular: {
    type: [Boolean, String],
    default: false,
  },
  interval: {
    type: [Number, String],
    default: 5e3,
  },
  duration: {
    type: [Number, String],
    default: 500,
  },
  current: {
    type: [Number, String],
    default: 0,
  },
  indicatorColor: {
    type: String,
    default: 'rgba(0,0,0,.3)',
  },
  indicatorActiveColor: {
    type: String,
    default: '#000000',
  },
  previousMargin: {
    type: String,
    default: '',
  },
  nextMargin: {
    type: String,
    default: '',
  },
  currentItemId: {
    type: String,
    default: '',
  },
  skipHiddenItemLayout: {
    type: [Boolean, String],
    default: false,
  },
  displayMultipleItems: {
    type: [Number, String],
    default: 1,
  },
  disableTouch: {
    type: [Boolean, String],
    default: false,
  },
}
