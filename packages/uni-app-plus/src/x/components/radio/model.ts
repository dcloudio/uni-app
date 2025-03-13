/// <reference types="@dcloudio/uni-app-x/types/native-global" />

export const RADIO_NAME = 'Radio'
export const RADIO_ROOT_ELEMENT = 'uni-radio-element'

export const UniRadioElement = /* @__PURE__ */ (() =>
  class extends UniElementImpl {
    constructor(data: INodeData, pageNode: PageNode) {
      super(data, pageNode)
    }

    override tagName = 'RADIO'
    override nodeName = this.tagName

    override getAnyAttribute(key: string): string {
      const value = this._getAttribute(key)
      if (value != null) {
        return value
      }
      return super.getAnyAttribute(key)
    }

    _getAttribute = (key: string): string | null => {
      return null
    }
  })()

export type UniRadioElement = InstanceType<typeof UniRadioElement>

// UniElementImpl

export const radioProps = {
  checked: {
    type: Boolean,
    default: false,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  value: {
    type: [Object, String],
    default: '',
  },
  // 选中时的背景颜色
  color: {
    type: String,
    default: '#007AFF',
  },
  // 默认的背景颜色
  backgroundColor: {
    type: String,
    default: '#ffffff',
  },
  // 默认的边框颜色
  borderColor: {
    type: String,
    default: '#d1d1d1',
  },
  // 选中时的背景颜色,同color,优先级大于color
  activeBackgroundColor: {
    type: String,
    default: '',
  },
  // 选中时的边框颜色，默认为选中时的背景颜色
  activeBorderColor: {
    type: String,
    default: '',
  },
  // 图标颜色
  iconColor: {
    type: String,
    default: '#ffffff',
  },
  // 高于 iconColor 和 color
  foreColor: {
    type: String,
    default: '',
  },
}
