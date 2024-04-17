import { type UniNodeJSON, formatLog } from '@dcloudio/uni-shared'
import { UniAnimationElement } from './UniAnimationElement'

interface HoverProps {
  'hover-class': string | 'none'
  'hover-stop-propagation': boolean
  'hover-start-time': number
  'hover-stay-time': number
}
const PROP_NAMES_HOVER = [
  'hover-class',
  'hover-stop-propagation',
  'hover-start-time',
  'hover-stay-time',
]
export class UniHoverElement extends UniAnimationElement<HoverProps> {
  private _hover?: Hover
  constructor(
    id: number,
    element: Element,
    parentNodeId: number,
    refNodeId: number,
    nodeJson: Partial<UniNodeJSON>,
    propNames: string[] = []
  ) {
    super(id, element, parentNodeId, refNodeId, nodeJson, [
      ...PROP_NAMES_HOVER,
      ...propNames,
    ])
  }
  update(isMounted: boolean = false) {
    const hoverClass = this.$props['hover-class']
    if (hoverClass && hoverClass !== 'none') {
      if (!this._hover) {
        this._hover = new Hover(this.$, this.$props)
      }
      this._hover.addEvent()
    } else {
      if (this._hover) {
        this._hover.removeEvent()
      }
    }
    super.update(isMounted)
  }
}

class Hover {
  private $: Element

  private props: HoverProps

  private _listening: boolean = false

  private _hovering: boolean = false
  private _hoverTouch: boolean = false
  private _hoverStartTimer?: ReturnType<typeof setTimeout>
  private _hoverStayTimer?: ReturnType<typeof setTimeout>

  private __hoverTouchStart!: (evt: Event) => void
  private __hoverTouchEnd!: (evt?: Event) => void
  private __hoverTouchCancel!: (evt?: Event) => void
  constructor($: Element, props: HoverProps) {
    this.$ = $

    this.props = props

    this.__hoverTouchStart = this._hoverTouchStart.bind(this)
    this.__hoverTouchEnd = this._hoverTouchEnd.bind(this)
    this.__hoverTouchCancel = this._hoverTouchCancel.bind(this)
  }

  get hovering() {
    return this._hovering
  }

  set hovering(hovering: boolean) {
    this._hovering = hovering
    const hoverClass = this.props['hover-class'].split(' ').filter(Boolean)
    const ClassList = this.$.classList
    if (hovering) {
      this.$.classList.add.apply(ClassList, hoverClass)
    } else {
      this.$.classList.remove.apply(ClassList, hoverClass)
    }
  }

  addEvent() {
    if (this._listening) {
      return
    }
    if (__DEV__) {
      console.log(
        formatLog(
          this.$.tagName,
          'Hover',
          'addEventListener',
          this.props['hover-class']
        )
      )
    }
    this._listening = true
    this.$.addEventListener('touchstart', this.__hoverTouchStart)
    this.$.addEventListener('touchend', this.__hoverTouchEnd)
    this.$.addEventListener('touchcancel', this.__hoverTouchCancel)
  }
  removeEvent() {
    if (!this._listening) {
      return
    }
    if (__DEV__) {
      console.log(formatLog(this.$.tagName, 'Hover', 'removeEventListener'))
    }
    this._listening = false
    this.$.removeEventListener('touchstart', this.__hoverTouchStart)
    this.$.removeEventListener('touchend', this.__hoverTouchEnd)
    this.$.removeEventListener('touchcancel', this.__hoverTouchCancel)
  }
  _hoverTouchStart(evt: Event) {
    if ((evt as any)._hoverPropagationStopped) {
      return
    }
    const hoverClass = this.props['hover-class']
    if (!hoverClass || hoverClass === 'none' || (this.$ as any).disabled) {
      return
    }
    if ((evt as TouchEvent).touches.length > 1) {
      return
    }
    if (this.props['hover-stop-propagation']) {
      ;(evt as any)._hoverPropagationStopped = true
    }
    this._hoverTouch = true
    this._hoverStartTimer = setTimeout(() => {
      this.hovering = true
      if (!this._hoverTouch) {
        // 防止在hoverStartTime时间内触发了 touchend 或 touchcancel
        this._hoverReset()
      }
    }, this.props['hover-start-time'])
  }
  _hoverTouchEnd() {
    this._hoverTouch = false
    if (this.hovering) {
      this._hoverReset()
    }
  }
  _hoverReset() {
    requestAnimationFrame(() => {
      clearTimeout(this._hoverStayTimer!)
      this._hoverStayTimer = setTimeout(() => {
        this.hovering = false
      }, this.props['hover-stay-time'])
    })
  }
  _hoverTouchCancel() {
    this._hoverTouch = false
    this.hovering = false
    clearTimeout(this._hoverStartTimer!)
  }
}
