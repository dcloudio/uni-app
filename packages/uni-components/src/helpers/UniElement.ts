function transformRpx(value: string) {
  if (/-?\d+[ur]px/gi.test(value)) {
    return value.replace(/(-?\d+)[ur]px/gi, (text, num) => {
      return `${uni.upx2px(parseFloat(num))}px`
    })
    // eslint-disable-next-line no-useless-escape
  }
  return value
}

export class UniElement extends HTMLElement {
  private _props: Record<string, any> = {}
  constructor() {
    super()
  }

  attachVmProps(props: Record<string, any>) {
    this._props = props
  }

  getAttribute(qualifiedName: string): string | null {
    const name =
      qualifiedName.indexOf('-') > -1
        ? qualifiedName.replace(/-(\w)/g, (_, c) => c.toUpperCase())
        : qualifiedName
    return name in this._props
      ? this._props[name] + ''
      : super.getAttribute(qualifiedName) || null
  }

  get style() {
    const originalStyle = super.style
    // @ts-ignore
    if (originalStyle.__patchRpx__) {
      return originalStyle
    }
    // @ts-ignore
    originalStyle.__patchRpx__ = true
    const originalSetProperty = originalStyle.setProperty.bind(originalStyle)
    super.style.setProperty = function (
      property: string,
      value: string | null,
      priority?: string
    ) {
      return originalSetProperty(
        property,
        value ? transformRpx(value + '') : value,
        priority || undefined
      )
    }
    return super.style
  }
}
