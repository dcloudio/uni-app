/// <reference types="@dcloudio/uni-app-x/types/native-global" />

export const RADIOGROUP_NAME = 'RadioGroup'
export const RADIOGROUP_ROOT_ELEMENT = 'uni-radio-group-element'

export const RadioProps = {
  name: {
    type: String,
    default: '',
  },
}

export interface RadioInfo {
  name: string
  checked: boolean
  setRadioChecked: (checked: boolean) => void
}

export const UniRadioGroupElement = /* @__PURE__ */ (() =>
  class extends UniFormControlElement<string> {
    _initialValue: string = ''

    constructor(data: INodeData, pageNode: PageNode) {
      super(data, pageNode)
    }

    override tagName = 'RADIO-GROUP'
    override nodeName = this.tagName

    override getAnyAttribute(key: string): string {
      const value = this._getAttribute(key)
      if (value != null) {
        return value
      }
      return super.getAnyAttribute(key)
    }

    override get value(): string {
      return this._getValue()
    }
    override set value(value: string) {
      this._setValue(value)
    }

    override reset() {
      this.value = this._initialValue
    }

    // 带 _ 的方法、属性会在组件渲染之后被重写
    _getAttribute = (key: string): string | null => {
      return null
    }

    _getValue = (): string => {
      return this._initialValue
    }
    _setValue = (value: string) => {}
  })()

export type UniRadioGroupElement = InstanceType<typeof UniRadioGroupElement>

class UniRadioGroupChangeEventDetail {
  value: string
  constructor(value: string) {
    this.value = value
  }
}

export const UniRadioGroupChangeEvent = /* @__PURE__ */ (() =>
  class extends UniCustomEvent<UniRadioGroupChangeEventDetail> {
    constructor(value: string) {
      super('change', {
        detail: new UniRadioGroupChangeEventDetail(value),
      } as CustomEventOptions<any>)
    }
  })()

export type UniRadioGroupChangeEvent = InstanceType<
  typeof UniRadioGroupChangeEvent
>
