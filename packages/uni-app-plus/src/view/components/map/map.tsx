import {
  type ExtractPropTypes,
  type Ref,
  computed,
  onBeforeUnmount,
  ref,
  watch,
} from 'vue'
import { extend } from '@vue/shared'
import {
  type CustomEventTrigger,
  type EmitEvent,
  defineBuiltInComponent,
  useContextInfo,
  useCustomEvent,
  useSubscribe,
} from '@dcloudio/uni-components'
import { useNative, useNativeAttrs } from '../../../helpers/useNative'
import { getCurrentPageId } from '@dcloudio/uni-core'
import { getRealPath } from '../../../platform/getRealPath'
import CoverImage from '../cover-image'

interface Coordinate {
  latitude: number
  longitude: number
}
type Coordinates = {
  coord: Coordinate
}
const convertCoordinates = (
  lng: number,
  lat: number,
  callback: (res: Coordinates) => void
) => {
  callback({
    coord: {
      latitude: lat,
      longitude: lng,
    },
  })
}

function parseHex(color: string) {
  if (color.indexOf('#') !== 0) {
    return {
      color,
      opacity: 1,
    }
  }
  const opacity = color.slice(7, 9)
  return {
    color: color.slice(0, 7),
    opacity: opacity ? Number('0x' + opacity) / 255 : 1,
  }
}

interface Marker extends PlusMapsMarker {
  id: number
  latitude: number
  longitude: number
  iconPath: string
  callout?: { content: string }
  label?: { content: string }
}
interface Line extends PlusMapsPolyline {
  points: Array<Coordinate>
  color?: string
  width?: number
}
interface Circle extends PlusMapsCircle, Coordinate {
  radius: number
  color?: string
  fillColor?: string
  strokeWidth?: number
}
interface Polygon extends PlusMapsPolygon, Coordinate {
  points: Array<Coordinate>
  fillColor?: string
  strokeColor?: string
  strokeWidth?: number
}
type Markers = Array<Marker>
type Lines = Array<Line>
type Circles = Array<Circle>
type Polygons = Array<Polygon>
type Control = {
  id?: number
  position: Data
  iconPath: string
  clickable: boolean
}
interface Map extends PlusMapsMap {
  __markers__: Markers
  __lines__: Lines
  __circles__: Circles
  __polygons__: Polygons
}

const props = {
  id: {
    type: String,
    default: '',
  },
  latitude: {
    type: [Number, String],
    default: '',
  },
  longitude: {
    type: [Number, String],
    default: '',
  },
  scale: {
    type: [String, Number],
    default: 16,
  },
  markers: {
    type: Array,
    default() {
      return []
    },
  },
  polyline: {
    type: Array,
    default() {
      return []
    },
  },
  circles: {
    type: Array,
    default() {
      return []
    },
  },
  polygons: {
    type: Array,
    default() {
      return []
    },
  },
  controls: {
    type: Array,
    default() {
      return []
    },
  },
}
type Props = ExtractPropTypes<typeof props>

export default /*#__PURE__*/ defineBuiltInComponent({
  name: 'Map',
  props,
  emits: ['click', 'regionchange', 'controltap', 'markertap', 'callouttap'],
  setup(props, { emit }) {
    const rootRef: Ref<HTMLElement | null> = ref(null)
    const trigger = useCustomEvent<EmitEvent<typeof emit>>(rootRef, emit)
    const containerRef: Ref<HTMLElement | null> = ref(null)
    const attrs = useNativeAttrs(props, ['id'])
    const { position, hidden, onParentReady } = useNative(containerRef)

    let map: Map | undefined

    const {
      _addMarkers,
      _addMapLines,
      _addMapCircles,
      _addMapPolygons,
      _setMap,
    } = useMapMethods(props, trigger)

    onParentReady(() => {
      map = extend(
        plus.maps.create(
          getCurrentPageId() + '-map-' + (props.id || Date.now()),
          Object.assign(
            {},
            attrs.value,
            position,
            (() => {
              if (props.latitude && props.longitude) {
                return {
                  center: new plus.maps.Point!(
                    Number(props.longitude),
                    Number(props.latitude)
                  ),
                }
              }
            })()
          )
        ),
        {
          __markers__: [],
          __lines__: [],
          __circles__: [],
          __polygons__: [],
        }
      )
      map.setZoom(parseInt(String(props.scale)))
      plus.webview.currentWebview().append(map as any)
      if (hidden.value) {
        map.hide()
      }
      map.onclick = (e) => {
        trigger('tap', {} as Event, e)
        trigger('click', {} as Event, e)
      }
      map.onstatuschanged = (e) => {
        trigger('regionchange', {} as Event, {})
      }
      _setMap(map)
      _addMarkers(props.markers as Markers)
      _addMapLines(props.polyline as Lines)
      _addMapCircles(props.circles as Circles)
      _addMapPolygons(props.polygons as Polygons)

      watch(
        () => attrs.value,
        (attrs) => map && map.setStyles(attrs as any),
        { deep: true }
      )
      watch(
        () => position,
        (position) => map && map.setStyles(position),
        { deep: true }
      )
      watch(hidden, (val) => {
        map && map[val ? 'hide' : 'show']()
      })
      watch(
        () => props.scale,
        (val) => {
          map && map.setZoom(parseInt(String(val)))
        }
      )
      watch(
        [() => props.latitude, () => props.longitude],
        ([latitude, longitude]) => {
          map &&
            map.setStyles({
              center: new plus.maps.Point!(Number(longitude), Number(latitude)),
            })
        }
      )
      watch(
        () => props.markers,
        (val) => {
          _addMarkers(val as Markers, true)
        },
        { deep: true }
      )
      watch(
        () => props.polyline,
        (val) => {
          _addMapLines(val as Lines)
        },
        { deep: true }
      )
      watch(
        () => props.circles,
        (val) => {
          _addMapCircles(val as Circles)
        },
        { deep: true }
      )
      watch(
        () => props.polygons,
        (val) => {
          _addMapPolygons(val as Polygons)
        },
        { deep: true }
      )
    })

    const mapControls = computed(() =>
      (props.controls as Array<Control>).map((control) => {
        const position = { position: 'absolute' }
        ;['top', 'left', 'width', 'height'].forEach((key) => {
          if (control.position[key]) {
            ;(position as any)[key] = control.position[key] + 'px'
          }
        })
        return {
          id: control.id,
          iconPath: getRealPath(control.iconPath),
          position: position,
          clickable: control.clickable,
        }
      })
    )

    onBeforeUnmount(() => {
      if (map) {
        map.close()
        _setMap(null)
      }
    })

    return () => {
      return (
        <uni-map ref={rootRef} id={props.id}>
          <div ref={containerRef} class="uni-map-container" />
          {mapControls.value.map((control, index) => (
            <CoverImage
              key={index}
              src={control.iconPath}
              style={control.position}
              auto-size
              onClick={() =>
                control.clickable &&
                trigger('controltap', {} as Event, { controlId: control.id })
              }
            />
          ))}
          <div class="uni-map-slot"></div>
        </uni-map>
      )
    }
  },
})

type Callback = (res: any) => void
function useMapMethods(props: Props, trigger: CustomEventTrigger) {
  let map: Map | null
  function moveToLocation(
    resolve: Callback,
    { longitude, latitude }: Partial<Coordinate> = {}
  ) {
    if (!map) return
    map.setCenter(
      // @ts-expect-error
      new plus.maps.Point(
        Number(longitude || props.longitude),
        Number(latitude || props.latitude)
      )
    )
    resolve({
      errMsg: 'moveToLocation:ok',
    })
  }
  function getCenterLocation(resolve: Callback) {
    if (!map) return
    map.getCurrentCenter((state, point) => {
      resolve({
        longitude: point.getLng(),
        latitude: point.getLat(),
        errMsg: 'getCenterLocation:ok',
      })
    })
  }
  function getRegion(resolve: Callback) {
    if (!map) return
    const rect = map.getBounds()
    resolve({
      southwest: rect.getSouthWest(),
      northeast: rect.getNorthEast(),
      errMsg: 'getRegion:ok',
    })
  }
  function getScale(resolve: Callback) {
    if (!map) return
    resolve({
      scale: map.getZoom(),
      errMsg: 'getScale:ok',
    })
  }

  function _addMarker(marker: Marker) {
    if (!map) return
    const {
      id,
      // title,
      latitude,
      longitude,
      iconPath,
      // width,
      // height,
      // rotate,
      // alpha,
      callout,
      label,
    } = marker
    convertCoordinates(longitude, latitude, (res) => {
      const { latitude, longitude } = res.coord
      const nativeMarker = new plus.maps.Marker!(
        new plus.maps.Point!(longitude, latitude)
      )
      if (iconPath) {
        nativeMarker.setIcon(getRealPath(iconPath))
      }
      if (label && label.content) {
        nativeMarker.setLabel(label.content as string)
      }
      let nativeBubble: PlusMapsBubble | undefined = undefined
      if (callout && callout.content) {
        nativeBubble = new plus.maps.Bubble!(callout.content)
      }
      if (nativeBubble) {
        nativeMarker.setBubble(nativeBubble)
      }
      if (id || id === 0) {
        nativeMarker.onclick = (e) => {
          trigger('markertap', {} as Event, {
            markerId: id,
            latitude,
            longitude,
          })
        }
        if (nativeBubble) {
          nativeBubble.onclick = () => {
            trigger('callouttap', {} as Event, {
              markerId: id,
            })
          }
        }
      }
      map?.addOverlay(nativeMarker as unknown as PlusMapsOverlay)
      // 此处5+文档中PlusMapsMarker对象只有方法，没有属性
      // @ts-expect-error
      map.__markers__.push(nativeMarker)
    })
  }
  function _clearMarkers() {
    if (!map) return
    const markers = map.__markers__
    markers.forEach((marker) => {
      map?.removeOverlay(marker as unknown as PlusMapsOverlay)
    })
    map.__markers__ = []
  }
  function _addMarkers(markers: Markers, clear?: boolean) {
    if (clear) {
      _clearMarkers()
    }
    markers.forEach((marker) => {
      _addMarker(marker)
    })
  }
  function _addMapLines(lines: Lines) {
    if (!map) return
    if (map.__lines__.length > 0) {
      map.__lines__.forEach((circle) => {
        map?.removeOverlay(circle as unknown as PlusMapsOverlay)
      })
      map.__lines__ = []
    }

    lines.forEach((line: Line) => {
      const {
        color,
        width,
        // dottedLine,
        // arrowLine,
        // arrowIconPath,
        // borderColor,
        // borderWidth
      } = line
      const points = line.points.map(
        (point) => new plus.maps.Point!(point.longitude, point.latitude)
      )
      const polyline = new plus.maps.Polyline!(points)
      if (color) {
        const strokeStyle = parseHex(color)
        polyline.setStrokeColor(strokeStyle.color)
        polyline.setStrokeOpacity(strokeStyle.opacity)
      }
      if (width) {
        polyline.setLineWidth(width)
      }
      map?.addOverlay(polyline as unknown as PlusMapsOverlay)
      // 此处5+文档中PlusMapsPolyline对象只有方法，没有属性
      // @ts-expect-error
      map.__lines__.push(polyline)
    })
  }
  function _addMapCircles(circles: Circles) {
    if (!map) return
    if (map.__circles__.length > 0) {
      map.__circles__.forEach((circle) => {
        map?.removeOverlay(circle as unknown as PlusMapsOverlay)
      })
      map.__circles__ = []
    }

    circles.forEach((circle) => {
      const { latitude, longitude, color, fillColor, radius, strokeWidth } =
        circle
      const nativeCircle = new plus.maps.Circle!(
        new plus.maps.Point!(longitude, latitude),
        radius
      )
      if (color) {
        const strokeStyle = parseHex(color)
        nativeCircle.setStrokeColor(strokeStyle.color)
        nativeCircle.setStrokeOpacity(strokeStyle.opacity)
      }
      if (fillColor) {
        const fillStyle = parseHex(fillColor)
        nativeCircle.setFillColor(fillStyle.color)
        nativeCircle.setFillOpacity(fillStyle.opacity)
      }
      if (strokeWidth) {
        nativeCircle.setLineWidth(strokeWidth)
      }
      map?.addOverlay(nativeCircle as unknown as PlusMapsOverlay)
      // 此处5+文档中PlusMapsCircle对象只有方法，没有属性
      // @ts-expect-error
      map.__circles__.push(nativeCircle)
    })
  }
  function _addMapPolygons(polygons: Polygons) {
    if (!map) return

    const nativeMapPolygons = map.__polygons__
    nativeMapPolygons.forEach((polygon) => {
      map?.removeOverlay(polygon as unknown as PlusMapsOverlay)
    })
    nativeMapPolygons.length = 0

    polygons.forEach((polygon) => {
      const { points, strokeWidth, strokeColor, fillColor } = polygon
      const plusPoints: Array<PlusMapsPoint> = []
      if (points) {
        points.forEach((coordinate: Coordinate) => {
          plusPoints.push(
            new plus.maps.Point!(coordinate.longitude, coordinate.latitude)
          )
        })
      }
      const nativePolygon = new plus.maps.Polygon!(plusPoints)
      if (strokeColor) {
        const strokeStyle = parseHex(strokeColor)
        nativePolygon.setStrokeColor(strokeStyle.color)
        nativePolygon.setStrokeOpacity(strokeStyle.opacity)
      }
      if (fillColor) {
        const fillStyle = parseHex(fillColor)
        nativePolygon.setFillColor(fillStyle.color)
        nativePolygon.setFillOpacity(fillStyle.opacity)
      }
      if (strokeWidth) {
        nativePolygon.setLineWidth(strokeWidth)
      }
      map?.addOverlay(nativePolygon as unknown as PlusMapsOverlay)
      nativeMapPolygons.push(nativePolygon as unknown as Polygon)
    })
  }

  const methods = {
    moveToLocation,
    getCenterLocation,
    getRegion,
    getScale,
  }
  type Method = keyof typeof methods

  useSubscribe(
    (type, data: any, resolve) => {
      methods[type as Method] && methods[type as Method](resolve, data)
    },
    useContextInfo(),
    true
  )

  return {
    _addMarkers,
    _addMapLines,
    _addMapCircles,
    _addMapPolygons,
    _setMap(_map: Map | null) {
      map = _map
    },
  }
}
