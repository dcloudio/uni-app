export class UniPickerViewColumnElement extends UniElementImpl {
  constructor(data: INodeData, pageNode: PageNode) {
    // @ts-ignore
    super(data, pageNode)
  }

  override getAttribute(key: string): string {
    const value = this._getAttribute(key)
    if (value != null) {
      return value
    }
    return super.getAttribute(key)
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

export class UniPickerViewChangeEvent extends CustomEvent<UniPickerViewChangeEventDetail> {
  constructor(value: number[]) {
    super('change', {
      detail: new UniPickerViewChangeEventDetail(value),
    } as CustomEventOptions<UniPickerViewChangeEventDetail>)
  }
}

export class UniPickerViewElement extends UniElementImpl {
  constructor(data: INodeData, pageNode: PageNode) {
    // @ts-ignore
    super(data, pageNode)
  }

  override getAttribute(key: string): string {
    const value = this._getAttribute(key)
    if (value != null) {
      return value
    }
    return super.getAttribute(key)
  }

  _getAttribute = (key: string): string | null => {
    return null
  }
}
