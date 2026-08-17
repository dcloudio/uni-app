export class UniPickerElement extends UniViewElementImpl {
  override tagName : string = 'PICKER'
  override nodeName : string = 'PICKER'

  _value : any = ''

  get value() : any {
    return this.vm?.getPickerValue() ?? this._value
  }

  set value(val : any) {
    this._value = val
    this.vm?.setPickerValue(val)
  }
}
