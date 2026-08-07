import { camelize } from '@vue/shared'
import {
  type UniDOMStringMap,
  createRpx2Unit,
  createUniDOMStringMap,
  defaultRpx2Unit,
} from '@dcloudio/uni-shared'

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
  // H5 X 第一版只做 attribute -> dataset 的单向同步：Vue/uni 运行时更新
  // data-* 后，已访问过的 dataset 会同步刷新；暂不支持 dataset 反写 DOM attribute。
  private __uniDatasetMap?: UniDOMStringMap
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
    // @ts-expect-error
    return this.__vnode?.ctx?.page || null
  }
  get uniPage() {
    return this.getPage()
  }

  get dataset(): UniDOMStringMap {
    if (!this.__uniDatasetMap) {
      this.__uniDatasetMap = createUniDOMStringMap(
        (this as unknown as { __uniDataset?: Record<string, any> })
          .__uniDataset || {}
      )
    }
    return this.__uniDatasetMap
  }

  setAttribute(qualifiedName: string, value: string) {
    super.setAttribute(qualifiedName, value)
    if (qualifiedName.startsWith('data-') && this.__uniDatasetMap) {
      this.__uniDatasetMap.set(qualifiedName, value)
    }
  }

  removeAttribute(qualifiedName: string) {
    super.removeAttribute(qualifiedName)
    if (qualifiedName.startsWith('data-') && this.__uniDatasetMap) {
      this.__uniDatasetMap.delete(qualifiedName)
    }
  }

  getBoundingClientRectAsync(callback) {
    if (callback) {
      const domRect = this.getBoundingClientRect()
      try {
        callback.success?.(domRect)
      } catch (error) {
        console.error(error)
      }
      try {
        callback.complete?.(domRect)
      } catch (error) {
        console.error(error)
      }
      return
    }
    return new Promise((resolve, reject) => {
      const domRect = this.getBoundingClientRect()
      resolve(domRect)
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
