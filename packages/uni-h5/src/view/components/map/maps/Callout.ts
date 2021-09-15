import { QQMaps, Overlay, LatLng as QLatLng } from './qq/types'
import { GoogleMaps, OverlayView, LatLng as GLatLng } from './google/types'

export interface CalloutOptions {
  map?: any
  position?: GLatLng | QLatLng
  display?: 'ALWAYS'
  boxShadow?: string
  content?: string
  fontSize?: number
  padding?: number
  color?: string
  borderRadius?: number
  bgColor?: string
  top?: number
}

export function createCallout(maps: QQMaps | GoogleMaps) {
  const overlay: OverlayView | Overlay = new ((maps as GoogleMaps)
    .OverlayView || (maps as QQMaps).Overlay)()
  function onAdd(this: Callout) {
    const div = this.div
    const panes = this.getPanes()!
    panes.floatPane.appendChild(div)
  }
  function onRemove(this: Callout) {
    const parentNode = this.div.parentNode
    if (parentNode) {
      parentNode.removeChild(this.div)
    }
  }

  class Callout implements OverlayView, Overlay {
    option: CalloutOptions
    position?: GLatLng | QLatLng
    index?: number
    visible?: boolean
    alwaysVisible?: boolean
    div: HTMLDivElement
    triangle: HTMLDivElement
    // @ts-ignore
    setMap = overlay.setMap
    // @ts-ignore
    getMap = overlay.getMap
    // @ts-ignore
    getPanes = overlay.getPanes
    // @ts-ignore
    getProjection = overlay.getProjection
    map_changed = (overlay as any).map_changed
    set = overlay.set
    get = overlay.get
    setOptions = overlay.setValues
    bindTo = overlay.bindTo
    bindsTo = (overlay as any).bindsTo
    notify = overlay.notify
    setValues = overlay.setValues
    // @ts-ignore
    unbind = overlay.unbind
    // @ts-ignore
    unbindAll = overlay.unbindAll
    addListener = (overlay as any).addListener
    set onclick(callback: any) {
      this.div.onclick = callback
    }
    get onclick(): any {
      return this.div.onclick
    }
    constructor(option: CalloutOptions = {}) {
      this.option = option || {}
      const map = option.map
      this.position = option.position
      this.index = 1
      const visible =
        (this.visible =
        this.alwaysVisible =
          option.display === 'ALWAYS')
      const div = (this.div = document.createElement('div'))
      const divStyle = div.style
      divStyle.position = 'absolute'
      divStyle.whiteSpace = 'nowrap'
      divStyle.transform = 'translateX(-50%) translateY(-100%)'
      divStyle.zIndex = '1'
      divStyle.boxShadow = option.boxShadow || 'none'
      divStyle.display = visible ? 'block' : 'none'
      const triangle = (this.triangle = document.createElement('div'))
      triangle.setAttribute(
        'style',
        'position: absolute;white-space: nowrap;border-width: 4px;border-style: solid;border-color: #fff transparent transparent;border-image: initial;font-size: 12px;padding: 0px;background-color: transparent;width: 0px;height: 0px;transform: translate(-50%, 100%);left: 50%;bottom: 0;'
      )
      this.setStyle(option)
      div.appendChild(triangle)
      if (map) {
        this.setMap(map)
      }
    }
    onAdd = onAdd
    construct = onAdd
    setOption(option: CalloutOptions) {
      this.option = option
      this.setPosition(option.position)
      if (option.display === 'ALWAYS') {
        this.alwaysVisible = this.visible = true
      } else {
        this.alwaysVisible = false
      }
      this.setStyle(option)
    }
    setStyle(option: CalloutOptions) {
      const div = this.div
      const divStyle = div.style
      div.innerText = option.content || ''
      divStyle.lineHeight = (option.fontSize || 14) + 'px'
      divStyle.fontSize = (option.fontSize || 14) + 'px'
      divStyle.padding = (option.padding || 8) + 'px'
      divStyle.color = option.color || '#000'
      divStyle.borderRadius = (option.borderRadius || 0) + 'px'
      divStyle.backgroundColor = option.bgColor || '#fff'
      divStyle.marginTop = '-' + ((option.top || 0) + 5) + 'px'
      this.triangle.style.borderColor = `${
        option.bgColor || '#fff'
      } transparent transparent`
    }
    setPosition(position?: GLatLng | QLatLng) {
      this.position = position
      this.draw()
    }
    draw() {
      const overlayProjection = this.getProjection()
      if (!this.position || !this.div || !overlayProjection) {
        return
      }
      const pixel = overlayProjection.fromLatLngToDivPixel(
        this.position as GLatLng & QLatLng
      )!
      const divStyle = this.div.style
      divStyle.left = pixel.x + 'px'
      divStyle.top = pixel.y + 'px'
    }
    changed() {
      const divStyle = this.div.style
      divStyle.display = this.visible ? 'block' : 'none'
    }
    onRemove = onRemove
    destroy = onRemove
  }
  return Callout
}
