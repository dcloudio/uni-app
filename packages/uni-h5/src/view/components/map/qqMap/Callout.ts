import { LatLng, Overlay, QQMaps } from './types'

export interface CalloutOptions {
  map?: any
  position?: LatLng
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

export function createCallout(maps: QQMaps) {
  const overlay = new maps.Overlay()
  class Callout implements Overlay {
    option: CalloutOptions
    position?: LatLng
    index?: number
    visible?: boolean
    alwaysVisible?: boolean
    div: HTMLDivElement
    triangle: HTMLDivElement
    setMap = overlay.setMap
    getMap = overlay.getMap
    getPanes = overlay.getPanes
    getProjection = overlay.getProjection
    map_changed = overlay.map_changed
    set = overlay.set
    get = overlay.get
    setOptions = overlay.setOptions
    bindTo = overlay.bindTo
    bindsTo = overlay.bindsTo
    notify = overlay.notify
    setValues = overlay.setValues
    unbind = overlay.unbind
    unbindAll = overlay.unbindAll
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
      const visible = (this.visible = this.alwaysVisible =
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
    construct() {
      const div = this.div
      const panes = this.getPanes()
      panes.floatPane.appendChild(div)
    }
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
    setPosition(position?: LatLng) {
      this.position = position
      this.draw()
    }
    draw() {
      const overlayProjection = this.getProjection()
      if (!this.position || !this.div || !overlayProjection) {
        return
      }
      const pixel = overlayProjection.fromLatLngToDivPixel(this.position)
      const divStyle = this.div.style
      divStyle.left = pixel.x + 'px'
      divStyle.top = pixel.y + 'px'
    }
    changed() {
      const divStyle = this.div.style
      divStyle.display = this.visible ? 'block' : 'none'
    }
    destroy() {
      const parentNode = this.div.parentNode
      if (parentNode) {
        parentNode.removeChild(this.div)
      }
    }
  }
  return Callout
}
