export type UniSliderChangeEventDetail = {
  value : number
}

// #ifdef WEB
class UniCustomEvent<T> {
  detail : T
  constructor(type : string, detail : T) {
    // this.type = type
    this.detail = detail
  }
}
// #endif

export class UniSliderChangeEvent extends UniCustomEvent<UniSliderChangeEventDetail> {
  constructor(value : number) {
    super('change', { value } as UniSliderChangeEventDetail)
  }
}

export class UniSliderElement extends UniViewElementImpl {
  override tagName : string = 'SLIDER'
  override nodeName : string = 'SLIDER'

  get value(): number {
    return this.vm?.getCurrentValue()
  }

  set value(val : number) {
    if (this.value === val) {
      return
    }
    this.vm?.renderVisuals(val)
  }
}
