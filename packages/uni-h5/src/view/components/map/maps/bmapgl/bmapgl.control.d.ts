/// <reference path="./bmapgl.base.d.ts" />
/// <reference path="./bmapgl.maptype.d.ts" />
/// <reference path="./bmapgl.overlay.d.ts" />
declare namespace BMapGL {
  class Control {
    constructor()
    defaultAnchor: ControlAnchor
    defaultOffset: Size
    initialize(map: Map): HTMLElement
    setAnchor(anchor: ControlAnchor): void
    getAnchor(): ControlAnchor
    setOffset(offset: Size): void
    getOffset(): Size
    show(): void
    hide(): void
    isVisible(): boolean
    /** 自定义Control在add之后立马能读取到Container, 内置Control不能 */
    getContainer(): HTMLElement | undefined
  }
  interface NavigationControlOptions {
    anchor?: ControlAnchor
    offset?: Size
    type?: NavigationControlType
    showZoomInfo?: boolean
    enableGeolocation?: boolean
  }
  interface ScaleControlOptions {
    anchor?: ControlAnchor
    offset?: Size
  }
  interface CopyrightControlOptions {
    anchor?: ControlAnchor
    offset?: Size
  }
  interface ZoomControlOptions {
    anchor?: ControlAnchor
    offset?: Size
  }
  interface NavigationControl3DOptions {
    anchor?: ControlAnchor
    offset?: Size
  }
  type ControlAnchor = number
  class OverviewMapControl extends Control {
    constructor(opts: OverviewMapControlOptions)
    changeView(): void
    setSize(size: Size): void
    getSize(): Size
    onviewchanged: (event: {
      type: string
      target: any
      isOpen: boolean
    }) => void
    onviewchanging: (event: { type: string; target: any }) => void
  }
  type LengthUnit = string
  class MapTypeControl extends Control {
    constructor(opts?: MapTypeControlOptions)
  }
  class NavigationControl extends Control {
    constructor(opts?: NavigationControlOptions)
    getType(): NavigationControlOptions
    setType(type: NavigationControlType): void
  }
  interface OverviewMapControlOptions {
    anchor?: ControlAnchor
    offset?: Size
    size?: Size
    isOpen?: boolean
  }
  class CopyrightControl extends Control {
    constructor(opts?: CopyrightControlOptions)
    addCopyright(copyright: Copyright): void
    removeCopyright(id: number): void
    getCopyright(id: number): Copyright
    getCopyrightCollection(): Copyright[]
  }
  interface MapTypeControlOptions {
    type?: MapTypeControlType
    mapTypes?: MapType[]
  }
  type NavigationControlType = number
  class ScaleControl extends Control {
    constructor(opts?: ScaleControlOptions)
    getUnit(): LengthUnit
    setUnit(unit: LengthUnit): void
  }
  interface Copyright {
    id?: number
    content?: string
    bounds?: Bounds
  }
  type MapTypeControlType = number
  class GeolocationControl extends Control {
    constructor(opts?: GeolocationControlOptions)
  }
  interface GeolocationControlOptions {
    anchor?: ControlAnchor
    offset?: Size
    showAddressBar?: boolean
    enableAutoLocation?: boolean
    locationIcon?: Icon
  }
  type StatusCode = number
  class PanoramaControl extends Control {
    constructor()
  }
  class ZoomControl extends Control {
    constructor(opts?: ZoomControlOptions)
  }
  class NavigationControl3D extends Control {
    constructor(opts?: NavigationControl3DOptions)
  }
  interface CityListControlOptions {
    anchor?: ControlAnchor
    offset?: Size
    expand?: boolean
    onChangeBefore?: Callback
    onChangeAfter?: Callback
    onChangeSuccess?: Callback
  }
  class CityListControl extends Control {
    constructor(opts?: CityListControlOptions)
  }
}
declare const BMAP_UNIT_METRIC: BMapGL.LengthUnit
declare const BMAP_UNIT_IMPERIAL: BMapGL.LengthUnit

declare const BMAP_ANCHOR_TOP_LEFT: BMapGL.ControlAnchor
declare const BMAP_ANCHOR_TOP_RIGHT: BMapGL.ControlAnchor
declare const BMAP_ANCHOR_BOTTOM_LEFT: BMapGL.ControlAnchor
declare const BMAP_ANCHOR_BOTTOM_RIGHT: BMapGL.ControlAnchor

declare const BMAP_NAVIGATION_CONTROL_LARGE: BMapGL.NavigationControlType
declare const BMAP_NAVIGATION_CONTROL_SMALL: BMapGL.NavigationControlType
declare const BMAP_NAVIGATION_CONTROL_PAN: BMapGL.NavigationControlType
declare const BMAP_NAVIGATION_CONTROL_ZOOM: BMapGL.NavigationControlType

declare const BMAP_MAPTYPE_CONTROL_HORIZONTAL: BMapGL.MapTypeControlType
declare const BMAP_MAPTYPE_CONTROL_DROPDOWN: BMapGL.MapTypeControlType
declare const BMAP_MAPTYPE_CONTROL_MAP: BMapGL.MapTypeControlType

declare const BMAP_STATUS_PERMISSION_DENIED: BMapGL.StatusCode
declare const BMAP_STATUS_SERVICE_UNAVAILABLE: BMapGL.StatusCode
declare const BMAP_STATUS_TIMEOUT: BMapGL.StatusCode
