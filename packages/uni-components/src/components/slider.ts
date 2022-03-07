export const sliderProps = {
  name: {
    type: String,
    default: '',
  },
  min: {
    type: [Number, String],
    default: 0,
  },
  max: {
    type: [Number, String],
    default: 100,
  },
  value: {
    type: [Number, String],
    default: 0,
  },
  step: {
    type: [Number, String],
    default: 1,
  },
  disabled: {
    type: [Boolean, String],
    default: false,
  },
  color: {
    type: String,
    default: '#e9e9e9',
  },
  backgroundColor: {
    type: String,
    default: '#e9e9e9',
  },
  activeColor: {
    type: String,
    default: '#007aff',
  },
  selectedColor: {
    type: String,
    default: '#007aff',
  },
  blockColor: {
    type: String,
    default: '#ffffff',
  },
  blockSize: {
    type: [Number, String],
    default: 28,
  },
  showValue: {
    type: [Boolean, String],
    default: false,
  },
}
