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

export const styleList = {
  ub: {
    position: 'relative',
    'text-align': 'center',
    'padding-left': '14px',
    'padding-right': '14px',
    'overflow-x': 'hidden',
    'overflow-y': 'hidden',
    color: 'rgb(0, 0, 0)',
    'background-color': 'rgb(248, 248, 248)',
    'border-top-left-radius': '5px',
    'border-top-right-radius': '5px',
    'border-bottom-right-radius': '5px',
    'border-bottom-left-radius': '5px',
    'border-top-style': 'solid',
    'border-right-style': 'solid',
    'border-bottom-style': 'solid',
    'border-left-style': 'solid',
    'border-top-width': '0.5px',
    'border-right-width': '0.5px',
    'border-bottom-width': '0.5px',
    'border-left-width': '0.5px',
    'border-top-color': 'rgba(0, 0, 0, 0.2)',
    'border-right-color': 'rgba(0, 0, 0, 0.2)',
    'border-bottom-color': 'rgba(0, 0, 0, 0.2)',
    'border-left-color': 'rgba(0, 0, 0, 0.2)',
    'font-size': '18px',
    'line-height': '46px',
    // 'line-height': 2.55556,
  },
  ['ub-default']: {
    color: 'rgb(0, 0, 0)',
    'background-color': 'rgb(248, 248, 248)',
  },
  ['ub-primary']: {
    color: 'rgb(255, 255, 255)',
    'background-color': 'rgb(0, 122, 255)',
  },
  ['ub-warn']: {
    color: 'rgb(255, 255, 255)',
    'background-color': 'rgb(230, 67, 64)',
  },
  ['ub-default-plain']: {
    color: 'rgb(53, 53, 53)',
    'border-top-color': 'rgb(53, 53, 53)',
    'border-right-color': 'rgb(53, 53, 53)',
    'border-bottom-color': 'rgb(53, 53, 53)',
    'border-left-color': 'rgb(53, 53, 53)',
    'background-color': 'rgba(0, 0, 0, 0)',
    'border-top-width': '1px',
    'border-right-width': '1px',
    'border-bottom-width': '1px',
    'border-left-width': '1px',
  },
  ['ub-primary-plain']: {
    color: 'rgb(0, 122, 255)',
    'border-top-color': 'rgb(0, 122, 255)',
    'border-right-color': 'rgb(0, 122, 255)',
    'border-bottom-color': 'rgb(0, 122, 255)',
    'border-left-color': 'rgb(0, 122, 255)',
    'background-color': 'rgba(0, 0, 0, 0)',
    'border-top-width': '1px',
    'border-right-width': '1px',
    'border-bottom-width': '1px',
    'border-left-width': '1px',
  },
  ['ub-warn-plain']: {
    color: 'rgb(230, 67, 64)',
    'border-top-color': 'rgb(230, 67, 64)',
    'border-right-color': 'rgb(230, 67, 64)',
    'border-bottom-color': 'rgb(230, 67, 64)',
    'border-left-color': 'rgb(230, 67, 64)',
    'background-color': 'rgba(0, 0, 0, 0)',
    'border-top-width': '1px',
    'border-right-width': '1px',
    'border-bottom-width': '1px',
    'border-left-width': '1px',
  },
  ['ub-default-disabled']: {
    color: 'rgba(0, 0, 0, 0.3)',
    'background-color': 'rgb(247, 247, 247)',
  },
  ['ub-primary-disabled']: {
    color: 'rgba(255, 255, 255, 0.6)',
    'background-color': 'rgba(0, 122, 255, 0.6)',
  },
  ['ub-warn-disabled']: {
    color: 'rgba(255, 255, 255, 0.6)',
    'background-color': 'rgb(236, 139, 137)',
  },
  ['ub-default-disabled-plain']: {
    color: 'rgba(0, 0, 0, 0.2)',
    'border-top-color': 'rgba(0, 0, 0, 0.2)',
    'border-right-color': 'rgba(0, 0, 0, 0.2)',
    'border-bottom-color': 'rgba(0, 0, 0, 0.2)',
    'border-left-color': 'rgba(0, 0, 0, 0.2)',
    'background-color': 'rgba(0, 0, 0, 0)',
    'border-top-width': '1px',
    'border-right-width': '1px',
    'border-bottom-width': '1px',
    'border-left-width': '1px',
  },
  ['ub-primary-disabled-plain']: {
    color: 'rgba(0, 0, 0, 0.2)',
    'border-top-color': 'rgba(0, 0, 0, 0.2)',
    'border-right-color': 'rgba(0, 0, 0, 0.2)',
    'border-bottom-color': 'rgba(0, 0, 0, 0.2)',
    'border-left-color': 'rgba(0, 0, 0, 0.2)',
    'background-color': 'rgba(0, 0, 0, 0)',
    'border-top-width': '1px',
    'border-right-width': '1px',
    'border-bottom-width': '1px',
    'border-left-width': '1px',
  },
  ['ub-warn-disabled-plain']: {
    color: 'rgba(0, 0, 0, 0.2)',
    'border-top-color': 'rgba(0, 0, 0, 0.2)',
    'border-right-color': 'rgba(0, 0, 0, 0.2)',
    'border-bottom-color': 'rgba(0, 0, 0, 0.2)',
    'border-left-color': 'rgba(0, 0, 0, 0.2)',
    'background-color': 'rgba(0, 0, 0, 0)',
    'border-top-width': '1px',
    'border-right-width': '1px',
    'border-bottom-width': '1px',
    'border-left-width': '1px',
  },
  ['ub-mini']: {
    'padding-top': '0px',
    'padding-bottom': '0px',
    'padding-right': '17.5px',
    'padding-left': '17.5px',
    // 'line-height': '2.3',
    'line-height': '30px',
    'font-size': '13px',
  },
}

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
