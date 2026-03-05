type UniProgressActiveendEventDetail = {
  curPercent : number
}

// TODO Activeend 命名格式错误，因历史问题考虑修正为 ActiveEnd？
export class UniProgressActiveendEvent extends UniCustomEvent<UniProgressActiveendEventDetail> {
  constructor(type : string, curPercent : number) {
    super(type, { curPercent } as UniProgressActiveendEventDetail)
  }
}

export class UniProgressElement extends UniViewElementImpl implements UniCustomElement {
  static get observedAttributes() : Array<string> {
    return [
      'duration',
      'percent',
      'show-info',
      'active',
      'active-mode',
      'border-radius',
      'font-size',
      'stroke-width',
      'background-color',
      'active-color',
      'color'
    ]
  }

  private progressBar! : UniElement
  private progressBarValue! : UniElement
  private progressInfo! : UniTextElement
  private _showInfo = false
  private _percent = 0
  private _lastPercent = 0
  private _timerId = 0

  constructor() {
    super()

    this.style.setProperty('flexDirection', 'row')
    this.style.setProperty('align-items', 'center')

    const progressBar = this.uniPage.createElement('view')
    const progressBarStyle = progressBar.style
    progressBarStyle.setProperty('flexGrow', '1')
    progressBarStyle.setProperty('flexDirection', 'row')
    progressBarStyle.setProperty('backgroundColor', this.backgroundColor)
    progressBarStyle.setProperty('borderRadius', this.borderRadiusToPixel)
    progressBarStyle.setProperty('height', this.strokeWidthToPixel)
    progressBarStyle.setProperty('overflow', 'hidden')

    const progressBarValue = this.uniPage.createElement('view')
    const progressValueStyle = progressBarValue.style
    progressValueStyle.setProperty('backgroundColor', this.activeColor)
    progressBar.appendChild(progressBarValue)

    const progressInfo = this.uniPage.createElement('text') as UniTextElement
    const progressInfoStyle = progressInfo.style
    progressInfoStyle.setProperty('fontSize', this.fontSizeToPixel)
    progressInfoStyle.setProperty('color', '#000000')
    progressInfoStyle.setProperty('marginLeft', '10px')
    progressInfoStyle.setProperty('textAlign', 'right')

    this.progressBar = progressBar
    this.progressBarValue = progressBarValue
    this.progressInfo = progressInfo

    this.updateMinWidth()
  }

  connectedCallback() {
    this.appendChild(this.progressBar)
    if (this._showInfo) {
      this.appendChild(this.progressInfo)
    }
  }

  disconnectedCallback() {
    this.clearTimer()
    this.progressBar.remove()
    this.progressInfo.remove()
  }

  attributeChangedCallback(name : string, oldValue : any | null, newValue : any | null) {
    switch (name) {
      case 'percent':
        this._percent = newValue as number
        this._animate()
        break;
      case 'background-color':
        this.progressBar.style.setProperty('backgroundColor', this.backgroundColor)
        break;
      case 'stroke-width':
        this.progressBar.style.setProperty('height', this.strokeWidthToPixel)
        break;
      case 'border-radius':
        this.progressBar.style.setProperty('borderRadius', this.borderRadiusToPixel)
        break;
      case 'active-color':
      case 'color':
        this.progressBarValue.style.setProperty('backgroundColor', this.activeColor)
        break;
      case 'font-size':
        this.progressInfo.style.setProperty('fontSize', this.fontSizeToPixel)
        this.updateMinWidth()
        break;
      case 'show-info':
        this.showInfo = (typeof newValue == 'string' || newValue == true) ? true : false
        break;
      default:
        break;
    }
  }

  get active() : boolean {
    return this.getAttribute('active') == 'true' ? true : false
  }

  get activeMode() : string {
    return this.getAttributeValue('activeMode', 'backwards')
  }

  get showInfo() : boolean {
    return this._showInfo
  }

  set showInfo(value : boolean) {
    this._showInfo = value

    if (!this.isConnected) {
      return
    }

    if (value) {
      this.appendChild(this.progressInfo)
      this.progressInfo.setAttribute('value', this.percentToPixel)
    } else {
      this.progressInfo.remove()
    }
  }

  get duration() : number {
    return parseFloat(this.getAttributeValue('duration', '30'))
  }

  get percent() : number {
    return this._percent
  }

  set percent(value : number) {
    this._percent = value

    const percentString = value + '%'
    this.progressBarValue.style.setProperty('width', percentString)

    if (this.showInfo) {
      this.progressInfo.setAttribute('value', percentString)
    }
  }

  get percentToPixel() : string {
    return (this.percent + '%')
  }

  get fontSize() : number {
    return parseFloat(this.getAttributeValue('fontSize', '12'))
  }

  get fontSizeToPixel() : string {
    return this.fontSize + 'px'
  }

  get borderRadius() : number {
    return parseFloat(this.getAttributeValue('borderRadius', '0'))
  }

  get borderRadiusToPixel() : string {
    return this.borderRadius + 'px'
  }

  get strokeWidth() : number {
    return parseFloat(this.getAttributeValue('strokeWidth', '3'))
  }

  get strokeWidthToPixel() : string {
    return this.strokeWidth + 'px'
  }

  get backgroundColor() : string {
    return this.getAttributeValue('backgroundColor', '#ebebeb')
  }

  get activeColor() : string {
    return this.getAttributeValue('activeColor', this.color)
  }

  get color() : string {
    return this.getAttributeValue('color', '#007aff')
  }

  get finalPercent() : number {
    let percent = this.percent
    if (percent > 100) percent = 100
    if (percent < 0) percent = 0
    return percent
  }

  private _animate() {
    let finalPercent = this.finalPercent
    if (!this.active) {
      this.percent = finalPercent
      return
    }

    this.clearTimer()

    this.percent = this.activeMode == 'forwards' ? this._lastPercent : 0
    this._timerId = setInterval(() => {
      if (finalPercent <= this.percent + 1) {
        this.clearTimer()
        this.percent = finalPercent
        this.dispatchEvent(new UniProgressActiveendEvent('activeend', this.percent))
        this._lastPercent = finalPercent
      } else {
        ++this.percent
      }
    }, this.duration)
  }

  private clearTimer() {
    clearInterval(this._timerId)
  }

  private getAttributeValue(key : string, defaultValue : string) : string {
    const value = this.getAttribute(key)
    if (value != null && value!.length > 0) {
      return value!
    }
    return defaultValue
  }

  private updateMinWidth() {
    this.progressInfo.style.setProperty('minWidth', this.fontSize * 2.5 + 'px')
  }
}
