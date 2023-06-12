import { extend, isArray } from '@vue/shared'
import {
  onMounted,
  reactive,
  Ref,
  ref,
  watch,
  SetupContext,
  PropType,
  provide,
} from 'vue'
import {
  defineBuiltInComponent,
  useContextInfo,
  useSubscribe,
  useCustomEvent,
  CustomEventTrigger,
} from '@dcloudio/uni-components'
import '@amap/amap-jsapi-types'
import { callOptions } from '@dcloudio/uni-shared'
import { Point } from '../../../helpers/location'
import { Maps, Map, loadMaps, LatLng, QQMap, GoogleMap } from './maps'
import { QQMaps } from './maps/qq/types'
import { GoogleMaps } from './maps/google/types'
import MapMarker, {
  Props as MapMarkerProps,
  Context as MapMarkerContext,
} from './MapMarker'
import MapPolyline, { Props as MapPolylineProps } from './MapPolyline'
import MapCircle, { Props as MapCircleProps } from './MapCircle'
import MapControl, { Props as MapControlProps } from './MapControl'
import MapLocation, {
  Context as MapLocationContext,
  CONTEXT_ID as MAP_LOCATION_CONTEXT_ID,
} from './MapLocation'
import MapPolygon from './map-polygon/index'
import { Polygon } from './map-polygon/interface'
import { getIsAMap } from '../../../helpers/location'

const props = {
  id: {
    type: String,
    default: '',
  },
  latitude: {
    type: [String, Number],
    default: 0,
  },
  longitude: {
    type: [String, Number],
    default: 0,
  },
  scale: {
    type: [String, Number],
    default: 16,
  },
  markers: {
    type: Array as PropType<MapMarkerProps[]>,
    default() {
      return []
    },
  },
  includePoints: {
    type: Array as PropType<Point[]>,
    default() {
      return []
    },
  },
  polyline: {
    type: Array as PropType<MapPolylineProps[]>,
    default() {
      return []
    },
  },
  circles: {
    type: Array as PropType<MapCircleProps[]>,
    default() {
      return []
    },
  },
  controls: {
    type: Array as PropType<MapControlProps[]>,
    default() {
      return []
    },
  },
  showLocation: {
    type: [Boolean, String],
    default: false,
  },
  libraries: {
    type: Array as PropType<string[]>,
    default() {
      return []
    },
  },
  polygons: {
    type: Array as PropType<Polygon[]>,
    default: () => [],
  },
}

type Props = Record<keyof typeof props, any>
interface MapState {
  latitude: number
  longitude: number
  includePoints: Point[]
}

function getPoints(points: Point[]): Point[] {
  const newPoints: Point[] = []
  if (isArray(points)) {
    points.forEach((point) => {
      if (point && point.latitude && point.longitude) {
        newPoints.push({
          latitude: point.latitude,
          longitude: point.longitude,
        })
      }
    })
  }
  return newPoints
}

function getAMapPosition(
  maps: AMap.NameSpace,
  latitude: number,
  longitude: number
) {
  return new maps.LngLat(longitude, latitude)
}
function getGoogleOrQQMapPosition(
  maps: QQMaps | GoogleMaps,
  latitude: number,
  longitude: number
) {
  return new maps.LatLng(latitude, longitude)
}
function getMapPosition(maps: Maps, latitude: number, longitude: number) {
  return getIsAMap()
    ? getAMapPosition(maps as AMap.NameSpace, latitude, longitude)
    : getGoogleOrQQMapPosition(maps as QQMaps | GoogleMaps, latitude, longitude)
}

function getLat(latLng: LatLng) {
  if ('getLat' in latLng) {
    return latLng.getLat()
  } else {
    return latLng.lat()
  }
}

function getLng(latLng: LatLng) {
  if ('getLng' in latLng) {
    return latLng.getLng()
  } else {
    return latLng.lng()
  }
}

function useMap(
  props: Props,
  rootRef: Ref<HTMLElement | null>,
  emit: SetupContext['emit']
) {
  const trigger = useCustomEvent(rootRef, emit)
  const mapRef: Ref<HTMLDivElement | null> = ref(null)
  let maps: Maps
  let map: Map
  const state: MapState = reactive({
    latitude: Number(props.latitude),
    longitude: Number(props.longitude),
    includePoints: getPoints(props.includePoints),
  })
  type OnMapReadyCallback = (
    map: Map,
    maps: Maps,
    trigger: CustomEventTrigger
  ) => void
  const onMapReadyCallbacks: OnMapReadyCallback[] = []
  let isMapReady: boolean
  function onMapReady(callback: OnMapReadyCallback) {
    if (isMapReady) {
      callback(map, maps, trigger)
    } else {
      onMapReadyCallbacks.push(callback)
    }
  }
  function emitMapReady() {
    isMapReady = true
    onMapReadyCallbacks.forEach((callback) => callback(map, maps, trigger))
    onMapReadyCallbacks.length = 0
  }
  let isBoundsReady: boolean
  type OnBoundsReadyCallback = () => void
  const onBoundsReadyCallbacks: OnBoundsReadyCallback[] = []
  function onBoundsReady(callback: OnBoundsReadyCallback) {
    if (isBoundsReady) {
      callback()
    } else {
      onMapReadyCallbacks.push(callback)
    }
  }
  const contexts: Record<string, MapMarkerContext | MapLocationContext> = {}
  function addMapChidlContext(context: MapMarkerContext | MapLocationContext) {
    contexts[context.id] = context
  }
  function removeMapChidlContext(
    context: MapMarkerContext | MapLocationContext
  ) {
    delete contexts[context.id]
  }
  watch(
    [() => props.latitude, () => props.longitude],
    ([latitudeVlaue, longitudeVlaue]) => {
      const latitude = Number(latitudeVlaue)
      const longitude = Number(longitudeVlaue)
      if (latitude !== state.latitude || longitude !== state.longitude) {
        state.latitude = latitude
        state.longitude = longitude
        if (map) {
          const centerPosition = getMapPosition(
            maps,
            state.latitude,
            state.longitude
          )
          map.setCenter(centerPosition as any)
        }
      }
    }
  )
  watch(
    () => props.includePoints,
    (points) => {
      state.includePoints = getPoints(points)
      if (isBoundsReady) {
        updateBounds()
      }
    },
    {
      deep: true,
    }
  )
  function emitBoundsReady() {
    isBoundsReady = true
    onBoundsReadyCallbacks.forEach((callback) => callback())
    onBoundsReadyCallbacks.length = 0
  }
  function getMapInfo() {
    const center = map.getCenter()!
    return {
      scale: map.getZoom(),
      centerLocation: {
        latitude: getLat(center as LatLng),
        longitude: getLng(center as LatLng),
      },
    }
  }
  function updateCenter() {
    const centerPosition = getMapPosition(maps, state.latitude, state.longitude)
    map.setCenter(centerPosition as any)
  }
  function updateBounds() {
    if (getIsAMap()) {
      const points: [number, number][] = []
      state.includePoints.forEach((point) => {
        points.push([point.longitude, point.latitude])
      })
      const bounds = new (maps as AMap.NameSpace).Bounds(...points)
      ;(map as AMap.Map).setBounds(bounds)
    } else {
      const bounds = new (maps as QQMaps | GoogleMaps).LatLngBounds()
      state.includePoints.forEach(({ latitude, longitude }) => {
        const latLng = new (maps as QQMaps | GoogleMaps).LatLng(
          latitude,
          longitude
        )
        bounds.extend(latLng as any)
      })
      ;(map as QQMap | GoogleMap).fitBounds(bounds as any)
    }
  }
  function initMap() {
    const mapEl = mapRef.value as HTMLDivElement
    const center = getMapPosition(maps, state.latitude, state.longitude)
    const event =
      (maps as QQMaps | GoogleMaps).event || (maps as AMap.NameSpace).Event
    const map = new maps.Map(mapEl, {
      center: center as any,
      zoom: Number(props.scale),
      // scrollwheel: false,
      disableDoubleClickZoom: true,
      mapTypeControl: false,
      zoomControl: false,
      scaleControl: false,
      panControl: false,
      fullscreenControl: false,
      streetViewControl: false,
      keyboardShortcuts: false,
      minZoom: 5,
      maxZoom: 18,
      draggable: true,
    })
    watch(
      () => props.scale,
      (scale) => {
        map.setZoom(Number(scale) || 16)
      }
    )
    onBoundsReady(() => {
      if (state.includePoints.length) {
        updateBounds()
        // 首次重设中心点
        updateCenter()
      }
    })
    // 需在 bounds_changed 后触发 BoundsReady
    const boundsChangedEvent = event.addListener(map, 'bounds_changed', () => {
      boundsChangedEvent.remove()
      emitBoundsReady()
    })
    event.addListener(map, 'click', () => {
      // TODO 编译器将 tap 转换为 click
      trigger('tap', {} as Event, {})
      trigger('click', {} as Event, {})
    })
    event.addListener(map, 'dragstart', () => {
      trigger('regionchange', {} as Event, {
        type: 'begin',
        causedBy: 'gesture',
      })
    })
    event.addListener(map, 'dragend', () => {
      trigger(
        'regionchange',
        {} as Event,
        extend(
          {
            type: 'end',
            causedBy: 'drag',
          },
          getMapInfo()
        )
      )
    })

    const zoomChangedCallback = () => {
      emit('update:scale', map.getZoom())
      trigger(
        'regionchange',
        {} as Event,
        extend(
          {
            type: 'end',
            causedBy: 'scale',
          },
          getMapInfo()
        )
      )
    }
    // QQ or Google
    event.addListener(map, 'zoom_changed', zoomChangedCallback)
    // AMAP
    event.addListener(map, 'zoomend', zoomChangedCallback)

    event.addListener(map, 'center_changed', () => {
      const center = map.getCenter()!
      const latitude = getLat(center as LatLng)
      const longitude = getLng(center as LatLng)
      emit('update:latitude', latitude)
      emit('update:longitude', longitude)
    })
    return map
  }

  try {
    // TODO 支持在页面外使用
    const id = useContextInfo()
    useSubscribe(
      (type, data: any = {}) => {
        switch (type) {
          case 'getCenterLocation':
            onMapReady(() => {
              const center = map.getCenter()!
              callOptions(data, {
                latitude: getLat(center as LatLng),
                longitude: getLng(center as LatLng),
                errMsg: `${type}:ok`,
              })
            })
            break
          case 'moveToLocation':
            {
              let latitude = Number(data.latitude)
              let longitude = Number(data.longitude)
              if (!latitude || !longitude) {
                const context: MapLocationContext = contexts[
                  MAP_LOCATION_CONTEXT_ID
                ] as MapLocationContext
                if (context) {
                  latitude = context.state.latitude
                  longitude = context.state.longitude
                }
              }
              if (latitude && longitude) {
                state.latitude = latitude
                state.longitude = longitude
                if (map) {
                  const centerPosition = getMapPosition(
                    maps,
                    latitude,
                    longitude
                  )
                  map.setCenter(centerPosition as any)
                }
                onMapReady(() => {
                  callOptions(data, `${type}:ok`)
                })
              } else {
                callOptions(data, `${type}:fail`)
              }
            }
            break
          case 'translateMarker':
            onMapReady(() => {
              const context: MapMarkerContext = contexts[
                data.markerId
              ] as MapMarkerContext
              if (context) {
                try {
                  context.translate(data)
                } catch (error: any) {
                  callOptions(data, `${type}:fail ${error.message}`)
                }
                callOptions(data, `${type}:ok`)
              } else {
                callOptions(data, `${type}:fail not found`)
              }
            })
            break
          case 'includePoints':
            state.includePoints = getPoints(data.includePoints as Point[])
            if (isBoundsReady || getIsAMap()) {
              updateBounds()
            }
            onBoundsReady(() => {
              callOptions(data, `${type}:ok`)
            })
            break
          case 'getRegion':
            onBoundsReady(() => {
              const latLngBounds = map.getBounds()!
              const southwest = latLngBounds.getSouthWest()
              const northeast = latLngBounds.getNorthEast()
              callOptions(data, {
                southwest: {
                  latitude: getLat(southwest as LatLng),
                  longitude: getLng(southwest as LatLng),
                },
                northeast: {
                  latitude: getLat(northeast as LatLng),
                  longitude: getLng(northeast as LatLng),
                },
                errMsg: `${type}:ok`,
              })
            })
            break
          case 'getScale':
            onMapReady(() => {
              callOptions(data, {
                scale: map.getZoom(),
                errMsg: `${type}:ok`,
              })
            })
            break
        }
      },
      id,
      true
    )
  } catch (error) {}
  onMounted(() => {
    loadMaps(props.libraries, (result) => {
      maps = result
      map = initMap() as Map
      emitMapReady()
      trigger('updated', {} as Event, {})
    })
  })
  provide('onMapReady', onMapReady)
  provide('addMapChidlContext', addMapChidlContext)
  provide('removeMapChidlContext', removeMapChidlContext)
  return {
    state,
    mapRef,
    trigger,
  }
}

export default /*#__PURE__*/ defineBuiltInComponent({
  name: 'Map',
  props,
  emits: [
    'markertap',
    'labeltap',
    'callouttap',
    'controltap',
    'regionchange',
    'tap',
    'click',
    'updated',
    'update:scale',
    'update:latitude',
    'update:longitude',
  ],
  setup(props, { emit, slots }) {
    const rootRef: Ref<HTMLElement | null> = ref(null)
    const { mapRef, trigger } = useMap(
      props,
      rootRef,
      emit as SetupContext['emit']
    )
    return () => {
      return (
        <uni-map ref={rootRef} id={props.id}>
          <div
            ref={mapRef}
            style="width: 100%; height: 100%; position: relative; overflow: hidden"
          />
          {props.markers.map((item) => (
            <MapMarker key={item.id} {...item} />
          ))}
          {props.polyline.map((item) => (
            <MapPolyline {...item} />
          ))}
          {props.circles.map((item) => (
            <MapCircle {...item} />
          ))}
          {props.controls.map((item) => (
            <MapControl {...item} trigger={trigger} />
          ))}
          {props.showLocation && <MapLocation />}
          {props.polygons.map((item) => (
            <MapPolygon {...item} />
          ))}
          <div style="position: absolute;top: 0;width: 100%;height: 100%;overflow: hidden;pointer-events: none;">
            {slots.default && slots.default()}
          </div>
        </uni-map>
      )
    }
  },
})
