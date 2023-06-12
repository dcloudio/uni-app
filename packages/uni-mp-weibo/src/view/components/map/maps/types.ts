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
  Point as QPoint,
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
