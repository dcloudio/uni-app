export class UniCheckboxElement extends UniViewElementImpl {
  override tagName : string = 'CHECKBOX'
  override nodeName : string = 'CHECKBOX'

  _checked : boolean = false

  get checked() : boolean {
    return this.vm?.getCheckboxChecked() ?? this._checked
  }

  set checked(val : boolean) {
    if (this._checked == val) {
      return
    }
    this._checked = val
    this.vm?.setCheckboxChecked(val)
  }
}
