import {
  Map as GMap,
  LatLng as GLatLng,
  Polyline as GPolyline,
  PolylineOptions as GPolylineOptions,
  Circle as GCircle,
  CircleOptions as GCircleOptions,
} from './google/types'
import {
  Map as QMap,
  LatLng as QLatLng,
  Polyline as QPolyline,
  PolylineOptions as QPolylineOptions,
  Circle as QCircle,
  CircleOptions as QCircleOptions,
} from './qq/types'

export type Map = GMap | QMap
export type LatLng = GLatLng | QLatLng
export type Polyline = GPolyline | QPolyline
export type PolylineOptions = GPolylineOptions & QPolylineOptions
export type Circle = GCircle | QCircle
export type CircleOptions = GCircleOptions & QCircleOptions
