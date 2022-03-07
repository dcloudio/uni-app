export const buttonProps = {
  id: {
    type: String,
    default: '',
  },
  hoverClass: {
    type: String,
    default: 'button-hover',
  },
  hoverStartTime: {
    type: [Number, String],
    default: 20,
  },
  hoverStayTime: {
    type: [Number, String],
    default: 70,
  },
  hoverStopPropagation: {
    type: Boolean,
    default: false,
  },
  disabled: {
    type: [Boolean, String],
    default: false,
  },
  formType: {
    type: String,
    default: '',
  },
  openType: {
    type: String,
    default: '',
  },
  loading: {
    type: [Boolean, String],
    default: false,
  },
  plain: {
    type: [Boolean, String],
    default: false,
  },
}
