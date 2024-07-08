export class UniPickerViewColumnElement extends UniElementImpl {
  constructor(data: INodeData, pageNode: PageNode) {
    super(data, pageNode)
  }

  override tagName = 'PICKER-VIEW-COLUMN'
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
}

class UniPickerViewChangeEventDetail {
  value: number[]
  constructor(value: number[]) {
    this.value = value
  }
}

export class UniPickerViewChangeEvent extends UniCustomEvent<UniPickerViewChangeEventDetail> {
  constructor(value: number[]) {
    super('change', {
      detail: new UniPickerViewChangeEventDetail(value),
    } as CustomEventOptions<UniPickerViewChangeEventDetail>)
  }
}

export class UniPickerViewElement extends UniElementImpl {
  constructor(data: INodeData, pageNode: PageNode) {
    super(data, pageNode)
  }

  override tagName = 'PICKER-VIEW'
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
}
