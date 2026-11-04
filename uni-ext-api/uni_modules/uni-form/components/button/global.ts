// in order to get the value of text element, change UniViewElementImpl to UniTextElement.
export class UniButtonElement extends UniTextElement {
  override tagName : string = 'BUTTON'
  override nodeName : string = 'BUTTON'

  _value : string = ''

  get value() {
    if (this.vm?.isLoading()) {
        return this.vm?.getValue() ?? this._value
    }
    return super.value ?? this._value
  }
}