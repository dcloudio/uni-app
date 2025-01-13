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

export const UniButtonElement = /* @__PURE__ */ (() =>
  class extends UniTextElementImpl {
    // constructor(data: INodeData) {
    //   super()
    //   // super(data)
    // }
  })()

export type UniButtonElement = InstanceType<typeof UniButtonElement>

export const hoverStyles = new Map<string, Map<string, any | null>>([
  [
    'default',
    new Map<string, any | null>([
      ['color', 'rgba(0, 0, 0, 0.6)'],
      ['backgroundColor', '#dedede'],
    ]),
  ],
  [
    'primary',
    new Map<string, any | null>([
      ['color', 'rgba(255, 255, 255, 0.6)'],
      ['backgroundColor', '#0062cc'],
    ]),
  ],
  [
    'warn',
    new Map<string, any | null>([
      ['color', 'rgba(255, 255, 255, 0.6)'],
      ['backgroundColor', '#ce3c39'],
    ]),
  ],
  [
    'default-plain',
    new Map<string, any | null>([
      ['color', 'rgba(53, 53, 53, 0.6)'],
      ['borderColor', 'rgba(53, 53, 53, 0.6)'],
      ['backgroundColor', 'rgba(0, 0, 0, 0)'],
    ]),
  ],
  [
    'primary-plain',
    new Map<string, any | null>([
      ['color', 'rgba(0, 122, 255, 0.6)'],
      ['borderColor', 'rgba(0, 122, 255, 0.6)'],
      ['backgroundColor', 'rgba(0, 0, 0, 0)'],
    ]),
  ],
  [
    'warn-plain',
    new Map<string, any | null>([
      ['color', 'rgba(230, 67, 64, 0.6)'],
      ['borderColor', 'rgba(230, 67, 64, 0.6)'],
      ['backgroundColor', 'rgba(0, 0, 0, 0)'],
    ]),
  ],
])
export { $dispatch } from '../../utils/index'
