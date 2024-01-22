export const BUTTON_COMPONENT_NAME = 'Button'
export const UNI_BUTTON_ELEMENT_NAME = 'uni-button-element'

// button props
export const buttonProps = {
  hoverClass: {
    type: String,
    default: 'button-hover',
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  type: {
    type: String,
    default: 'default',
  },
  size: {
    type: String,
    default: 'default',
  },
  plain: {
    type: Boolean,
    default: false,
  },
  // TODO: loading
  loading: {
    type: Boolean,
    default: false,
  },
  hoverStartTime: {
    type: Number,
    default: 20,
  },
  hoverStayTime: {
    type: Number,
    default: 70,
  },
  openType: {
    type: String,
    default: '',
  },
  formType: {
    type: String,
    default: '',
  },
}
// 这里是从 x-dom 的 global 里读取的

export class UniButtonElement extends UniTextElementImpl {
  // constructor(data: INodeData) {
  //   super()
  //   // super(data)
  // }
}

export const useButton = () => {
  return {}
}
