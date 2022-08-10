import { QQMap, GoogleMap } from '../maps'
import {
  Polygon as QQPolygon,
  PolygonOptions as QQPolygonOptions,
  QQMaps,
} from '../maps/qq/types'
import { GoogleMaps, Polygon as GPolygon } from '../maps/google/types'
import { useCustomEvent } from '@dcloudio/uni-components'
import props from './props'

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
