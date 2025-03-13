/// <reference types="@dcloudio/uni-app-x/types/native-global" />

export const CHECKBOX_NAME = 'Checkbox'
export const CHECKBOX_ROOT_ELEMENT = 'uni-checkbox-element'

export const UniCheckboxElement = /* @__PURE__ */ (() =>
  class extends UniElementImpl {
    constructor(data: INodeData, pageNode: PageNode) {
      super(data, pageNode)
    }

    override tagName = 'CHECKBOX'
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

export type UniCheckboxElement = InstanceType<typeof UniCheckboxElement>

// UniElementImpl

export const checkboxProps = {
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
  // 图标颜色
  color: {
    type: String,
    default: '#007aff',
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
  // 选中时的背景颜色
  activeBackgroundColor: {
    type: String,
    default: '#ffffff',
  },
  // 选中时的边框颜色
  activeBorderColor: {
    type: String,
    default: '#d1d1d1',
  },
  // 图标颜色,同color,优先级大于color
  iconColor: {
    type: String,
    default: '',
  },
  // 图标颜色,同color,优先级大于iconColor
  foreColor: {
    type: String,
    default: '',
  },
}
