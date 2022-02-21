import { extend } from '@vue/shared'
import {
  onMounted,
  reactive,
  Ref,
  ref,
  watch,
  SetupContext,
  provide,
} from 'vue'
import {
  useContextInfo,
  useSubscribe,
  useCustomEvent,
} from '@dcloudio/uni-components'
import { callOptions } from '@dcloudio/uni-shared'
import { Point } from '../../../../helpers/location'
import { Maps, Map, loadMaps } from '../maps'
import { Context as MapMarkerContext } from '../MapMarker'
import {
  Context as MapLocationContext,
  CONTEXT_ID as MAP_LOCATION_CONTEXT_ID,
} from '../MapLocation'
// 类型声明
import { Props, MapState } from './interface'
// 工具方法
import { getPoints, getLat, getLng } from './utils'

export default function useMap(
  props: Props,
  rootRef: Ref<HTMLElement | null>,
  emit: SetupContext['emit']
) {
  const trigger = useCustomEvent(rootRef, emit)
  const mapRef: Ref<HTMLDivElement | null> = ref(null)
  let maps: Maps
  let map: Map
  // 暴露给用户的原生地图实例
  let _maps = ref<Maps>(null)

  const state: MapState = reactive({
    latitude: Number(props.latitude),
    longitude: Number(props.longitude),
    includePoints: getPoints(props.includePoints),
  })
  type CustomEventTrigger = ReturnType<typeof useCustomEvent>
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

  // 地图初始化完成后会调用
  function emitMapReady() {
    // 表示地图已经初始化完成
    isMapReady = true
    // 执行地图未准备好时在回调队列设置的回调方法
    onMapReadyCallbacks.forEach((callback) => callback(map, maps, trigger))
    // 清空刚才执行的回调队列
    onMapReadyCallbacks.length = 0
  }
  let isBoundsReady: boolean
  type OnBoundsReadyCallback = () => void
  const onBoundsReadyCallbacks: OnBoundsReadyCallback[] = []

  /**
   * 地图自适应，当自适应已经准备好，则直接执行回调函数，如果还没准备好，则将回调放到回调队列
   * 待将来地图初始化完成后执行
   */
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

  // 当坐标改变以后，重新设置地图的中心点
  watch(
    [() => props.latitude, () => props.longitude],
    ([latitudeVlaue, longitudeVlaue]) => {
      const latitude = Number(latitudeVlaue)
      const longitude = Number(longitudeVlaue)
      if (latitude !== state.latitude || longitude !== state.longitude) {
        state.latitude = latitude
        state.longitude = longitude
        if (map) {
          map.setCenter(new maps.LatLng(latitude, longitude) as any)
        }
      }
    }
  )

  // 地图自适应，保证指定的坐标都在可视范围内
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

  // 主要更改 isBoundsReady 为 true，开启地图自适应
  function emitBoundsReady() {
    // 开启地图自适应
    isBoundsReady = true
    onBoundsReadyCallbacks.forEach((callback) => callback())
    onBoundsReadyCallbacks.length = 0
  }

  // 获取地图当前信息，比如 zoom 层级、中心点
  function getMapInfo() {
    const center = map.getCenter()!
    return {
      scale: map.getZoom(),
      centerLocation: {
        latitude: getLat(center),
        longitude: getLng(center),
      },
    }
  }

  // 更新地图中心点
  function updateCenter() {
    map.setCenter(new maps.LatLng(state.latitude, state.longitude) as any)
  }

  function updateBounds() {
    const bounds = new maps.LatLngBounds()
    state.includePoints.forEach(({ latitude, longitude }) => {
      const latLng = new maps.LatLng(latitude, longitude)
      bounds.extend(latLng as any)
    })
    map.fitBounds(bounds as any)
  }

  // 初始化地图
  function initMap() {
    const mapEl = mapRef.value as HTMLDivElement
    const center = new maps.LatLng(state.latitude, state.longitude)
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

    // 动态设置地图 zoom 层级
    watch(
      () => props.scale,
      (scale) => {
        map.setZoom(Number(scale) || 16)
      }
    )

    // 自适应地图和设置地图中心点
    onBoundsReady(() => {
      if (state.includePoints.length) {
        updateBounds()
        // 首次重设中心点
        updateCenter()
      }
    })

    // 需在 bounds_changed 后触发 BoundsReady
    const boundsChangedEvent = maps.event.addListener(
      map,
      'bounds_changed',
      () => {
        boundsChangedEvent.remove()
        emitBoundsReady()
      }
    )
    maps.event.addListener(map, 'click', () => {
      // TODO 编译器将 tap 转换为 click
      trigger('click', {} as Event, {})
    })
    maps.event.addListener(map, 'dragstart', () => {
      trigger('regionchange', {} as Event, {
        type: 'begin',
        causedBy: 'gesture',
      })
    })
    maps.event.addListener(map, 'dragend', () => {
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
    maps.event.addListener(map, 'zoom_changed', () => {
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
    })
    maps.event.addListener(map, 'center_changed', () => {
      const center = map.getCenter()!
      const latitude = getLat(center)
      const longitude = getLng(center)
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
                latitude: getLat(center),
                longitude: getLng(center),
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
                  map.setCenter(new maps.LatLng(latitude, longitude) as any)
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
            if (isBoundsReady) {
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
                  latitude: getLat(southwest),
                  longitude: getLng(southwest),
                },
                northeast: {
                  latitude: getLat(northeast),
                  longitude: getLng(northeast),
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
    // 地图加载完成后做一些事情
    loadMaps(props.libraries, (result) => {
      // 设置地图实例
      _maps.value = maps = result
      // 初始化地图
      map = initMap()
      // 通知，说地图已经加载完毕了
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
    _maps,
  }
}
