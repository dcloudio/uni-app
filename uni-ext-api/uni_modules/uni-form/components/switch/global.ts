export class UniSwitchElement extends UniViewElementImpl {
  override tagName : string = 'SWITCH'
  override nodeName : string = 'SWITCH'

  _checked : boolean = false

  get checked() : boolean {
    return this.vm?.getSwitchChecked() ?? this._checked
  }

  set checked(val : boolean) {
    this._checked = val
    this.vm?.setSwitchChecked(val)
  }
}
