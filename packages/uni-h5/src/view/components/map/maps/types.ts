import type {
  Circle as GCircle,
  CircleOptions as GCircleOptions,
  LatLng as GLatLng,
  Map as GMap,
  Polyline as GPolyline,
  PolylineOptions as GPolylineOptions,
} from './google/types'
import type {
  Circle as QCircle,
  CircleOptions as QCircleOptions,
  LatLng as QLatLng,
  Map as QMap,
  Point as QPoint,
  Polyline as QPolyline,
  PolylineOptions as QPolylineOptions,
} from './qq/types'

export type GoogleMap = GMap
export type QQMap = QMap
export type Map = GMap | QMap | AMap.Map
export type LatLng = GLatLng | QLatLng
export type Polyline = GPolyline | QPolyline | AMap.Polyline
export type PolylineOptions = GPolylineOptions &
  QPolylineOptions &
  AMap.PolylineOptions
export type Circle = GCircle | QCircle | AMap.Circle
export type CircleOptions = GCircleOptions & QCircleOptions & AMap.CircleOptions
export type Point = QPoint
