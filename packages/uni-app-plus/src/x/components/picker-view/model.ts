export const UniPickerViewColumnElement = /* @__PURE__ */ (() =>
  class extends UniElementImpl {
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
  })()

export type UniPickerViewColumnElement = InstanceType<
  typeof UniPickerViewColumnElement
>

class UniPickerViewChangeEventDetail {
  value: number[]
  constructor(value: number[]) {
    this.value = value
  }
}

export const UniPickerViewChangeEvent = /* @__PURE__ */ (() =>
  class extends UniCustomEvent<UniPickerViewChangeEventDetail> {
    constructor(value: number[]) {
      super('change', {
        detail: new UniPickerViewChangeEventDetail(value),
      } as CustomEventOptions<UniPickerViewChangeEventDetail>)
    }
  })()

export type UniPickerViewChangeEvent = InstanceType<
  typeof UniPickerViewChangeEvent
>

export const UniPickerViewElement = /* @__PURE__ */ (() =>
  class extends UniElementImpl {
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
  })()

export type UniPickerViewElement = InstanceType<typeof UniPickerViewElement>
