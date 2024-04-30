import type { GoogleMap, QQMap } from '../maps'
import type {
  QQMaps,
  Polygon as QQPolygon,
  PolygonOptions as QQPolygonOptions,
} from '../maps/qq/types'
import type { Polygon as GPolygon, GoogleMaps } from '../maps/google/types'
import type { useCustomEvent } from '@dcloudio/uni-components'
import type props from './props'

export interface Point {
  latitude: number
  longitude: number
}

export type CustomEventTrigger = ReturnType<typeof useCustomEvent>

type OnMapReadyCallback = (
  map: QQMap | GoogleMap,
  maps: QQMaps | GoogleMaps,
  trigger: CustomEventTrigger
) => void

export type OnMapReady = (callback: OnMapReadyCallback) => void

export type Polygon = QQPolygon | GPolygon

export type PolygonOptions = QQPolygonOptions & google.maps.PolygonOptions

export type Props = Record<keyof typeof props, any>

export interface EventObj {
  [key: string]: string
}
