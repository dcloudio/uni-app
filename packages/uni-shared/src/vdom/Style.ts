export type UniCSSStyleDeclarationJSON =
  | string
  | null
  | Record<string, string | string[]>
  | [string, Record<string, string | string[]>]

export class UniCSSStyleDeclaration {
  [name: string]: string | unknown
  private _cssText: string | null = null
  private _value: Record<string, string | string[]> | null = null

  setProperty(property: string, value: string | null): void {
    if (value === null || value === '') {
      this.removeProperty(property)
    } else {
      if (!this._value) {
        this._value = {}
      }
      this._value[property] = value
    }
  }

  getPropertyValue(property: string) {
    if (!this._value) {
      return ''
    }
    return this._value[property] || ''
  }

  removeProperty(property: string): string {
    if (!this._value) {
      return ''
    }
    const value = this._value[property]
    delete this._value[property]
    return value as string
  }

  get cssText() {
    return this._cssText || ''
  }

  set cssText(cssText: string) {
    this._cssText = cssText
  }

  toJSON(): UniCSSStyleDeclarationJSON | undefined {
    const { _cssText, _value } = this
    const hasCssText = _cssText !== null
    const hasValue = _value !== null
    if (hasCssText && hasValue) {
      return [_cssText!, _value!]
    }
    if (hasCssText) {
      return _cssText
    }
    if (hasValue) {
      return _value
    }
  }
}

const STYLE_PROPS = [
  '_value',
  '_cssText',
  'cssText',
  'getPropertyValue',
  'setProperty',
  'removeProperty',
  'toJSON',
]

export function proxyStyle(uniCssStyle: UniCSSStyleDeclaration) {
  return new Proxy(uniCssStyle, {
    get(target, key, receiver) {
      if (STYLE_PROPS.indexOf(key as string) === -1) {
        return target.getPropertyValue(key as string)
      }
      return Reflect.get(target, key, receiver)
    },
    set(target, key, value, receiver) {
      if (STYLE_PROPS.indexOf(key as string) === -1) {
        target.setProperty(key as string, value)
        return true
      }
      return Reflect.set(target, key, value, receiver)
    },
  })
}
