/// <reference types="@dcloudio/uni-app-x/types/native-global" />

export const RADIOGROUP_NAME = 'RadioGroup'
export const RADIOGROUP_ROOT_ELEMENT = 'uni-radio-group-element'

export class UniRadioGroupElement extends UniFormControlElement<string> {
  _initialValue: string = ''

  constructor(data: INodeData, pageNode: PageNode) {
    super(data, pageNode)
  }

  // override getAttribute(key: string): string | null {
  //   const value = this._getAttribute(key)
  //   if (value != null) {
  //     return value
  //   }
  //   return super.getAttribute(key)
  // }

  _getAttribute = (key: string): string | null => {
    return null
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

  _getValue = (): string => {
    return this._initialValue
  }
  _setValue = (value: string) => {}
}

class UniRadioGroupChangeEventDetail {
  value: string
  constructor(value: string) {
    this.value = value
  }
}

export class UniRadioGroupChangeEvent extends CustomEvent<UniRadioGroupChangeEventDetail> {
  constructor(value: string) {
    super('change', {
      detail: new UniRadioGroupChangeEventDetail(value),
    } as CustomEventOptions<any>)
  }
}
