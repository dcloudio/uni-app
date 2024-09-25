import { getIsAMap, getIsBMap } from '../../../../helpers/location'
import type { Overlay, LatLng as QLatLng, QQMaps } from './qq/types'
import type { LatLng as GLatLng, GoogleMaps, OverlayView } from './google/types'
export interface CalloutOptions {
  map?: any
  position?: GLatLng | QLatLng | AMap.LngLat
  display?: 'ALWAYS'
  boxShadow?: string
  content?: string
  fontSize?: number
  padding?: number
  color?: string
  borderRadius?: number
  bgColor?: string
  top?: number
  offsetY?: number
}

export function createCallout(maps: QQMaps | GoogleMaps | AMap.NameSpace) {
  function onAdd(this: Callout) {
    const div = this.div
    const panes = this.getPanes()!
    panes.floatPane.appendChild(div)
  }
  function onRemove(this: Callout) {
    const parentNode = this.div!.parentNode
    if (parentNode) {
      parentNode.removeChild(this.div!)
    }
  }

  function createAMapText(this: Callout) {
    const option = this.option
    this.Text = new (maps as AMap.NameSpace).Text({
      text: option.content,
      anchor: 'bottom-center', // 设置文本标记锚点
      offset: new (maps as AMap.NameSpace).Pixel(0, option.offsetY! - 16),
      style: {
        padding: (option.padding || 8) + 'px',
        'line-height': (option.fontSize || 14) + 'px',
        'border-radius': (option.borderRadius || 0) + 'px',
        'border-color': `${option.bgColor || '#fff'} transparent transparent`,
        'background-color': option.bgColor || '#fff',
        'box-shadow': '0 2px 6px 0 rgba(114, 124, 245, .5)',
        'text-align': 'center',
        'font-size': (option.fontSize || 14) + 'px',
        color: option.color || '#000',
      },
      position: option.position as any,
    })
    const event =
      (maps as QQMaps | GoogleMaps).event || (maps as AMap.NameSpace).Event
    event.addListener(this.Text, 'click', () => {
      this.callback!()
    })

    this.Text.setMap(option.map)
  }

  function createBMapText(this: Callout) {}

  function removeAMapText(this: Callout) {
    if (this.Text) {
      this.option.map.remove(this.Text)
    }
  }

  function removeBMapText(this: Callout) {
    if (this.Text) {
      this.option.map.remove(this.Text)
    }
  }

  class Callout implements OverlayView, Overlay {
    option: CalloutOptions
    position?: GLatLng | QLatLng | AMap.LngLat
    index?: number
    visible?: boolean
    alwaysVisible?: boolean
    div?: HTMLDivElement
    triangle?: HTMLDivElement
    callback?: Function
    Text?: AMap.Text
    setMap
    getMap
    getPanes
    getProjection
    map_changed
    // @ts-expect-error
    set: (key: string, value: any) => void
    // @ts-expect-error
    get: (key: string) => any
    // @ts-expect-error
    setOptions: (values?: object | null | undefined) => void
    bindTo
    bindsTo
    notify
    setValues
    unbind
    unbindAll
    addListener
    set onclick(callback: any) {
      this.div!.onclick = callback
    }
    get onclick(): any {
      return this.div!.onclick
    }
    constructor(option: CalloutOptions = {}, callback?: Function) {
      this.option = option || {}

      const visible =
        (this.visible =
        this.alwaysVisible =
          option.display === 'ALWAYS')

      if (getIsAMap()) {
        this.callback = callback
        if (this.visible) {
          this.createAMapText()
        }
      } else if (getIsBMap()) {
        if (this.visible) {
          this.createBMapText()
        }
      } else {
        const map = option.map
        this.position = option.position
        this.index = 1
        const div = (this.div = document.createElement('div') as HTMLDivElement)
        const divStyle = div.style
        divStyle.position = 'absolute'
        divStyle.whiteSpace = 'nowrap'
        divStyle.transform = 'translateX(-50%) translateY(-100%)'
        divStyle.zIndex = '1'
        divStyle.boxShadow = option.boxShadow || 'none'
        divStyle.display = visible ? 'block' : 'none'
        const triangle = (this.triangle = document.createElement(
          'div'
        ) as HTMLDivElement)
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
    }

    createAMapText = createAMapText
    removeAMapText = removeAMapText

    createBMapText = createBMapText
    removeBMapText = removeBMapText

    onAdd = onAdd
    construct = onAdd
    setOption(option: CalloutOptions) {
      this.option = option
      if (option.display === 'ALWAYS') {
        this.alwaysVisible = this.visible = true
      } else {
        this.alwaysVisible = false
      }

      if (getIsAMap()) {
        if (this.visible) {
          this.createAMapText()
        }
      } else if (getIsBMap()) {
        if (this.visible) {
          this.createBMapText()
        }
      } else {
        this.setPosition(option.position)
        this.setStyle(option)
      }
    }
    setStyle(option: CalloutOptions) {
      const div = this.div!
      const divStyle = div.style
      div.innerText = option.content || ''
      divStyle.lineHeight = (option.fontSize || 14) + 'px'
      divStyle.fontSize = (option.fontSize || 14) + 'px'
      divStyle.padding = (option.padding || 8) + 'px'
      divStyle.color = option.color || '#000'
      divStyle.borderRadius = (option.borderRadius || 0) + 'px'
      divStyle.backgroundColor = option.bgColor || '#fff'
      divStyle.marginTop = '-' + ((option.top || 0) + 5) + 'px'
      this.triangle!.style.borderColor = `${
        option.bgColor || '#fff'
      } transparent transparent`
    }
    setPosition(position?: GLatLng | QLatLng | AMap.LngLat) {
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
      const divStyle = this.div!.style
      divStyle.display = this.visible ? 'block' : 'none'
    }
    onRemove = onRemove
    destroy = onRemove
  }

  if (!getIsAMap() && !getIsBMap()) {
    const overlay: OverlayView | Overlay = new ((maps as GoogleMaps)
      .OverlayView || (maps as QQMaps).Overlay)()
    Callout.prototype.setMap = overlay.setMap
    Callout.prototype.getMap = overlay.getMap
    Callout.prototype.getPanes = overlay.getPanes
    Callout.prototype.getProjection = overlay.getProjection
    Callout.prototype.map_changed = (overlay as any).map_changed
    Callout.prototype.set = overlay.set
    Callout.prototype.get = overlay.get
    Callout.prototype.setOptions = overlay.setValues
    Callout.prototype.bindTo = overlay.bindTo
    Callout.prototype.bindsTo = (overlay as any).bindsTo
    Callout.prototype.notify = overlay.notify
    Callout.prototype.setValues = overlay.setValues
    Callout.prototype.unbind = overlay.unbind
    Callout.prototype.unbindAll = overlay.unbindAll
    Callout.prototype.addListener = (overlay as any).addListener
  }

  return Callout
}
