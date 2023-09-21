/// <reference path="./bmapgl.base.d.ts" />
/// <reference path="./bmapgl.control.d.ts" />
declare namespace BMapGL {
  class TileLayer {
    constructor(opts?: TileLayerOptions)
    zIndex?: number
    getTilesUrl(tileCoord: Pixel, zoom: number): string
    getCopyright(): Copyright
    isTransparentPng(): boolean
  }
  interface TileLayerOptions {
    transparentPng?: boolean
    tileUrlTemplate?: string
    copyright?: Copyright
    zIndex?: number
  }
  class TrafficLayer extends TileLayer {
    constructor(opts?: TrafficLayerOptions)
  }
  interface TrafficLayerOptions {
    predictDate?: PredictDate
  }
  interface PredictDate {
    weekday: number
    hour: number
  }
  class CustomLayer extends TileLayer {
    constructor(opts: CustomLayerOptions)
    onhotspotclick: (event: { type: string; target: any; content: any }) => void
  }
  interface Custompoi {
    poiId: string
    databoxId: string
    title: string
    address: string
    phoneNumber: string
    postcode: string
    provinceCode: number
    province: string
    cityCode: number
    city: string
    districtCode: number
    district: string
    point: Point
    tags: string[]
    typeId: number
    extendedData: any
  }
  class PanoramaCoverageLayer extends TileLayer {
    constructor()
  }
  interface CustomLayerOptions {
    databoxId?: string
    geotableId?: string
    q?: string
    tags?: string
    filter?: string
    pointDensityType?: PointDensityType
  }
  type PointDensityType = number
}

declare const BMAP_POINT_DENSITY_HIGH: BMapGL.PointDensityType
declare const BMAP_POINT_DENSITY_MEDIUM: BMapGL.PointDensityType
declare const BMAP_POINT_DENSITY_LOW: BMapGL.PointDensityType
