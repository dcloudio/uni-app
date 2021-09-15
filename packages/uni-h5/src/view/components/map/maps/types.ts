import {
  Map as GMap,
  LatLng as GLatLng,
  Polyline as GPolyline,
  Circle as GCircle,
} from './google/types'
import {
  Map as QMap,
  LatLng as QLatLng,
  Polyline as QPolyline,
  Circle as QCircle,
} from './qq/types'

export type Map = GMap | QMap
export type LatLng = GLatLng | QLatLng
export type Polyline = GPolyline | QPolyline
export type Circle = GCircle | QCircle
