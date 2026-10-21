export class UniRadioElement extends UniViewElementImpl {
  override tagName : string = 'RADIO'
  override nodeName : string = 'RADIO'

  _checked : boolean = false

  get checked() : boolean {
    return this.vm?.getRadioChecked() ?? this._checked
  }

  set checked(val : boolean) {
    this._checked = val
    this.vm?.setRadioChecked(val)
  }
}
