import { camelize } from '@vue/shared'
import { createRpx2Unit, defaultRpx2Unit } from '@dcloudio/uni-shared'

const rpx2Unit = createRpx2Unit(
  defaultRpx2Unit.unit,
  defaultRpx2Unit.unitRatio,
  defaultRpx2Unit.unitPrecision
)

function transformRpx(value: string) {
  if (/(-?(?:\d+\.)?\d+)[ur]px/gi.test(value)) {
    return value.replace(/(-?(?:\d+\.)?\d+)[ur]px/gi, (text, num) => {
      return rpx2Unit(num + 'rpx')
    })
  }
  return value
}

export class UniElement extends HTMLElement {
  private _props: Record<string, any> = {}
  //#if _X_
  _page: UniPage | null = null
  //#endif
  public __isUniElement: boolean
  constructor() {
    super()
    this.__isUniElement = true
  }

  attachVmProps(props: Record<string, any>) {
    this._props = props
  }

  getAttribute(qualifiedName: string): string | null {
    const name = camelize(qualifiedName)
    const attr =
      name in this._props
        ? this._props[name] + ''
        : super.getAttribute(qualifiedName)
    return attr === undefined ? null : attr
  }
  //#if _X_
  getPage() {
    if (this._page) {
      return this._page
    }
    let parent = this.parentNode as UniElement | null
    while (parent && !parent._page) {
      parent = parent.parentNode as UniElement | null
    }
    return parent?._page || null
  }

  getBoundingClientRectAsync(callback) {
    if (callback) {
      callback.success?.(this.getBoundingClientRect())
      callback.complate?.()
      return
    }
    return new Promise((resolve, reject) => {
      resolve(this.getBoundingClientRect())
    })
  }
  //#endif

  get style() {
    const originalStyle = super.style
    // @ts-expect-error
    if (originalStyle.__patchRpx__) {
      return originalStyle
    }
    // @ts-expect-error
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

  get tagName() {
    return super.tagName.replace(/^UNI-/, '')
  }

  get nodeName() {
    return super.nodeName.replace(/^UNI-/, '')
  }
}
