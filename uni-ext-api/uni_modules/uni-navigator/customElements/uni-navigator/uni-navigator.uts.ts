type OpenType = 'navigate' | 'navigateBack' | 'redirect' | 'reLaunch' | 'switchTab'

export class UniNavigatorElement extends UniViewElementImpl implements UniCustomElement {

  static get observedAttributes() : Array<string> {
    return ['animation-type', 'delta', 'open-type', 'url']
  }

  constructor() {
    super()

    this.addEventListener('click', (_ : UniPointerEvent) => {
      "[weak self]"
      this._onClick()
    })
  }

  // TODO 鸿蒙Bug 当所有属性可选时必须实现一个
  attributeChangedCallback(name : string, oldValue : any | null, newValue : any | null) {
  }

  private _onClick() {
    const url = this.getAttribute('url')
    const openType = this.getAttributeValue('openType', 'navigate') as OpenType
    const animationType = this.getAttributeValue('animationType', 'pop-in')
    const animationDuration = parseFloat(this.getAttributeValue('animationDuration', '300'))

    const onFail = (error: UniError) => {
			console.error(error.message)
    }

    switch (openType) {
      case 'navigate':
        uni.navigateTo({
          url: url!,
          animationType: animationType!,
          animationDuration,
          fail: onFail
        })
        break;
      case 'navigateBack':
        const delta = parseInt(this.getAttributeValue('delta', '1'))
        uni.navigateBack({
          delta: delta,
          animationType: this.getAttributeValue('animationType', 'pop-out'),
          animationDuration,
          fail: onFail
        })
        break;
      case 'redirect':
        uni.redirectTo({
          url: url!,
          fail: onFail
        })
        break;
      case 'reLaunch':
        uni.reLaunch({
          url: url!,
          fail: onFail
        });
        break;
      case 'switchTab':
        uni.switchTab({
          url: url!,
          fail: onFail
        });
        break;
      // #ifdef APP-ANDROID
      // @ts-expect-error
      case 'exit':
        uni.exit();
        break;
      // #endif
      default:
        console.log('<navigator/> openType attribute invalid')
        break;
    }
  }

  private getAttributeValue(key : string, defaultValue : string) : string {
    const value = this.getAttribute(key)
    if (value != null && value!.length > 0) {
      return value!
    }
    return defaultValue
  }
}