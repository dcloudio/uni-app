import { inject, onUnmounted, watch } from 'vue'
import { isFunction } from '@vue/shared'
import { getRealPath } from '@dcloudio/uni-platform'
import {
  defineSystemComponent,
  type useCustomEvent,
} from '@dcloudio/uni-components'
import type { Callout, CalloutOptions, LatLng, Map, Maps } from './maps'
import {
  MapType,
  getIsAMap,
  getIsBMap,
  getMapInfo,
} from '../../../helpers/location'
import type {
  Label as GLabel,
  LatLng as GLatLng,
  Marker as GMarker,
  GoogleMaps,
  Icon,
} from './maps/google/types'
import type {
  MarkerImage,
  Label as QLabel,
  LatLng as QLatLng,
  Map as QMap,
  Marker as QMarker,
  QQMaps,
} from './maps/qq/types'

const props = {
  id: {
    type: [Number, String],
    default: '',
  },
  latitude: {
    type: [Number, String],
    require: true,
  },
  longitude: {
    type: [Number, String],
    require: true,
  },
  title: {
    type: String,
    default: '',
  },
  iconPath: {
    type: String,
    require: true,
  },
  rotate: {
    type: [Number, String],
    default: 0,
  },
  alpha: {
    type: [Number, String],
    default: 1,
  },
  width: {
    type: [Number, String],
    default: '',
  },
  height: {
    type: [Number, String],
    default: '',
  },
  callout: {
    type: Object,
    default: null,
  },
  label: {
    type: Object,
    default: null,
  },
  anchor: {
    type: Object,
    default: null,
  },
  clusterId: {
    type: [Number, String],
    default: '',
  },
  customCallout: {
    type: Object,
    default: null,
  },
  ariaLabel: {
    type: String,
    default: '',
  },
}
interface Point {
  latitude: number
  longitude: number
}
export type Props = Partial<Record<keyof typeof props, any>>
type CustomEventTrigger = ReturnType<typeof useCustomEvent>
type OnMapReadyCallback = (
  map: Map,
  maps: Maps,
  trigger: CustomEventTrigger
) => void
type OnMapReady = (callback: OnMapReadyCallback) => void
export interface TranslateMarkerOptions {
  destination: Point
  autoRotate?: Boolean
  rotate?: number
  duration?: number
  animationEnd?: Function
}
export interface Context {
  id: string
  translate: (options: TranslateMarkerOptions) => void
}
type AddMapChidlContext = (context: Context) => void
type RemoveMapChidlContext = (context: Context) => void

type Label = GLabel | QLabel
interface MarkerExt {
  callout?: InstanceType<Callout>
  label?: Label
  lastPosition?: LatLng
}
interface GMarkerExt extends GMarker, MarkerExt {}
interface QMarkerExt extends QMarker, MarkerExt {}
interface AMarkerExt extends AMap.Marker, MarkerExt {}
type Marker = GMarkerExt | QMarkerExt | AMarkerExt
type MarkerLabelStyle = Partial<
  Pick<
    CSSStyleDeclaration,
    | 'position'
    | 'top'
    | 'borderStyle'
    | 'borderColor'
    | 'borderWidth'
    | 'padding'
    | 'borderRadius'
    | 'backgroundColor'
    | 'color'
    | 'fontSize'
    | 'lineHeight'
    | 'marginLeft'
    | 'marginTop'
  >
>

function useMarkerLabelStyle(id: string) {
  const className = 'uni-map-marker-label-' + id
  const styleEl = document.createElement('style')
  styleEl.id = className
  document.head.appendChild(styleEl)
  onUnmounted(() => {
    styleEl.remove()
  })
  return function updateMarkerLabelStyle(style: MarkerLabelStyle) {
    const newStyle: MarkerLabelStyle = Object.assign({}, style, {
      position: 'absolute',
      top: '70px',
      borderStyle: 'solid',
    })
    const div = document.createElement('div')
    Object.keys(newStyle).forEach((key) => {
      div.style[key as keyof MarkerLabelStyle] =
        newStyle[key as keyof MarkerLabelStyle] || ''
    })
    styleEl.innerText = `.${className}{${div.getAttribute('style')}}`
    return className
  }
}

export default /*#__PURE__*/ defineSystemComponent({
  name: 'MapMarker',
  props,
  setup(props) {
    const id = String(!isNaN(Number(props.id)) ? props.id : '')
    const onMapReady: OnMapReady = inject('onMapReady') as OnMapReady
    const updateMarkerLabelStyle = useMarkerLabelStyle(id)
    let marker: Marker
    function removeMarker() {
      if (marker) {
        if (marker.label && 'setMap' in marker.label) {
          ;(marker.label as QLabel).setMap(null)
        }
        if (marker.callout) {
          removeMarkerCallout(marker.callout)
        }
        marker.setMap(null)
      }
    }
    function removeMarkerCallout(callout: Marker['callout']) {
      if (getIsAMap()) {
        callout!.removeAMapText()
      } else {
        callout!.setMap(null)
      }
    }
    onMapReady((map, maps, trigger) => {
      function updateMarker(option: Props) {
        const title = option.title
        let position: any
        if (getIsAMap()) {
          position = new (maps as AMap.NameSpace).LngLat(
            option.longitude,
            option.latitude
          )
        } else if (getIsBMap()) {
          // @ts-expect-error
          position = new maps.Point(option.longitude, option.latitude)
        } else {
          position = new (maps as QQMaps | GoogleMaps).LatLng(
            option.latitude,
            option.longitude
          )
        }
        const img = new Image()
        let imgHeight = 0
        img.onload = async () => {
          const anchor = option.anchor || {}
          let icon: MarkerImage | Icon
          let w
          let h
          let top
          let x = typeof anchor.x === 'number' ? anchor.x : 0.5
          let y = typeof anchor.y === 'number' ? anchor.y : 1
          if (option.iconPath && (option.width || option.height)) {
            w = option.width || (img.width / img.height) * option.height
            h = option.height || (img.height / img.width) * option.width
          } else {
            w = img.width / 2
            h = img.height / 2
          }
          imgHeight = h
          top = h - (h - y * h)
          if ('MarkerImage' in maps) {
            icon = new maps.MarkerImage(
              img.src,
              null,
              null,
              new (maps as QQMaps).Point(x * w, y * h),
              new (maps as QQMaps).Size(w, h)
            )
          } else if ('Icon' in maps) {
            // 高德
            icon = new (maps as AMap.NameSpace).Icon({
              image: img.src,
              size: new (maps as AMap.NameSpace).Size(w, h),
              imageSize: new (maps as AMap.NameSpace).Size(w, h),
              imageOffset: new (maps as AMap.NameSpace).Pixel(x * w, y * h),
            })
          } else {
            icon = {
              url: img.src,
              anchor: new (maps as GoogleMaps).Point(x, y),
              size: new (maps as GoogleMaps).Size(w, h),
            }
          }
          if (getIsBMap()) {
            // @ts-expect-error
            marker = new maps.Marker(new maps.Point(position.lng, position.lat))
            // @ts-expect-error
            map.addOverlay(marker)
          } else {
            marker.setPosition(position as any)
            marker.setIcon(icon as any)
          }
          if ('setRotation' in marker) {
            marker.setRotation(option.rotate || 0)
          }
          const labelOpt = option.label || {}
          if ('label' in marker) {
            ;(marker.label as QLabel).setMap(null)
            delete marker.label
          }
          let label
          if (labelOpt.content) {
            const labelStyle = {
              borderColor: labelOpt.borderColor,
              borderWidth: (Number(labelOpt.borderWidth) || 0) + 'px',
              padding: (Number(labelOpt.padding) || 0) + 'px',
              borderRadius: (Number(labelOpt.borderRadius) || 0) + 'px',
              backgroundColor: labelOpt.bgColor,
              color: labelOpt.color,
              fontSize: (labelOpt.fontSize || 14) + 'px',
              lineHeight: (labelOpt.fontSize || 14) + 'px',
              marginLeft: (Number(labelOpt.anchorX || labelOpt.x) || 0) + 'px',
              marginTop: (Number(labelOpt.anchorY || labelOpt.y) || 0) + 'px',
            }
            if ('Label' in maps) {
              label = new maps.Label({
                position: position as QLatLng,
                map: map as QMap,
                clickable: false,
                content: labelOpt.content,
                style: labelStyle,
              })
              marker.label = label
            } else if ('setLabel' in marker) {
              if (getIsAMap()) {
                const content = `<div style="
                  margin-left:${labelStyle.marginLeft};
                  margin-top:${labelStyle.marginTop};
                  padding:${labelStyle.padding};
                  background-color:${labelStyle.backgroundColor};
                  border-radius:${labelStyle.borderRadius};
                  line-height:${labelStyle.lineHeight};
                  color:${labelStyle.color};
                  font-size:${labelStyle.fontSize};

                  ">
                  ${labelOpt.content}
                <div>`
                marker.setLabel({
                  content,
                  direction: 'bottom-right',
                } as any)
              } else {
                const className = updateMarkerLabelStyle(labelStyle)
                ;(marker as GMarker).setLabel({
                  text: labelOpt.content,
                  color: labelStyle.color,
                  fontSize: labelStyle.fontSize,
                  className,
                })
              }
            }
          }
          const calloutOpt = option.callout || {}
          let callout = marker.callout
          let calloutStyle: CalloutOptions
          if (calloutOpt.content || title) {
            if (getIsAMap() && calloutOpt.content) {
              calloutOpt.content = calloutOpt.content.replaceAll('\n', '<br/>')
            }
            const boxShadow = '0px 0px 3px 1px rgba(0,0,0,0.5)'
            let offsetY = -imgHeight / 2
            if (option.width || option.height) {
              offsetY += 14 - imgHeight / 2
            }
            calloutStyle = calloutOpt.content
              ? {
                  position,
                  map,
                  top,
                  // handle AMap callout offset
                  offsetY,
                  content: calloutOpt.content,
                  color: calloutOpt.color,
                  fontSize: calloutOpt.fontSize,
                  borderRadius: calloutOpt.borderRadius,
                  bgColor: calloutOpt.bgColor,
                  padding: calloutOpt.padding,
                  boxShadow: calloutOpt.boxShadow || boxShadow,
                  display: calloutOpt.display,
                }
              : {
                  position,
                  map,
                  top,
                  // handle AMap callout offset
                  offsetY,
                  content: title,
                  boxShadow,
                }
            if (callout) {
              callout.setOption(calloutStyle)
            } else {
              if (getIsAMap()) {
                const callback = (id: number | string) => {
                  if (id !== '') {
                    trigger('callouttap', {} as Event, {
                      markerId: Number(id),
                    })
                  }
                }
                callout = marker.callout = new maps.Callout(
                  calloutStyle,
                  callback
                )
              } else {
                callout = marker.callout = new maps.Callout(calloutStyle)
                callout.div!.onclick = function ($event: Event) {
                  if (id !== '') {
                    trigger('callouttap', $event, {
                      markerId: Number(id),
                    })
                  }
                  $event.stopPropagation()
                  $event.preventDefault()
                }
                const mapInfo = await getMapInfo()
                // The mobile terminal prevent google map callout click trigger map click
                if (mapInfo.type === MapType.GOOGLE) {
                  callout.div!.ontouchstart = function ($event: Event) {
                    $event.stopPropagation()
                  }
                  callout.div!.onpointerdown = function ($event: Event) {
                    $event.stopPropagation()
                  }
                }
              }
            }
          } else {
            if (callout) {
              removeMarkerCallout(callout)
              delete marker.callout
            }
          }
        }
        if (option.iconPath) {
          img.src = getRealPath(option.iconPath)
        } else {
          console.error('Marker.iconPath is required.')
        }
      }
      function addMarker(props: Props) {
        if (!getIsBMap()) {
          marker = new maps.Marker({
            map: map as any,
            flat: true,
            autoRotation: false,
          })
        }
        updateMarker(props)
        const MapsEvent =
          (maps as QQMaps | GoogleMaps).event || (maps as AMap.NameSpace).Event
        if (getIsBMap()) {
          // todo add bmap event
        } else {
          MapsEvent.addListener(marker, 'click', () => {
            const callout = marker.callout
            if (callout && !callout.alwaysVisible) {
              if (getIsAMap()) {
                callout.visible = !callout.visible
                if (callout.visible) {
                  marker.callout!.createAMapText()
                } else {
                  marker.callout!.removeAMapText()
                }
              } else {
                callout.set('visible', !callout.visible)
                if (callout.visible) {
                  const div = callout.div!
                  const parent = div.parentNode!
                  parent.removeChild(div)
                  parent.appendChild(div)
                }
              }
            }

            if (id) {
              trigger('markertap', {} as Event, {
                markerId: Number(id),
                latitude: props.latitude,
                longitude: props.longitude,
              })
            }
          })
        }
      }
      addMarker(props as Props)
      watch(props, updateMarker)
    })
    if (id) {
      const addMapChidlContext: AddMapChidlContext = inject(
        'addMapChidlContext'
      ) as AddMapChidlContext
      const removeMapChidlContext: RemoveMapChidlContext = inject(
        'removeMapChidlContext'
      ) as RemoveMapChidlContext
      const context = {
        id: id,
        translate(data: TranslateMarkerOptions) {
          onMapReady((map, maps, trigger) => {
            const destination = data.destination
            const duration = data.duration
            const autoRotate = !!data.autoRotate
            let rotate: number = Number(data.rotate) || 0
            let rotation = 0
            if ('getRotation' in marker) {
              rotation = marker.getRotation()
            }
            const a = marker.getPosition()
            const b = new (maps as QQMaps | GoogleMaps).LatLng(
              destination.latitude,
              destination.longitude
            )
            const distance =
              (
                maps as QQMaps | GoogleMaps
              ).geometry.spherical.computeDistanceBetween(a as any, b as any) /
              1000
            const time =
              (typeof duration === 'number' ? duration : 1000) /
              (1000 * 60 * 60)
            const speed = distance / time
            const MapsEvent =
              (maps as QQMaps | GoogleMaps).event ||
              (maps as AMap.NameSpace).Event
            const movingEvent = MapsEvent.addListener(
              marker,
              'moving',
              (e: any) => {
                const latLng = e.latLng
                const label = marker.label
                if (label) {
                  ;(label as QLabel).setPosition(latLng)
                }
                const callout = marker.callout
                if (callout) {
                  callout.setPosition(latLng)
                }
              }
            )
            const event = MapsEvent.addListener(marker, 'moveend', () => {
              event.remove()
              movingEvent.remove()
              marker.lastPosition = a as QLatLng
              marker.setPosition(b as any)
              const label = marker.label
              if (label) {
                ;(label as QLabel).setPosition(b as QLatLng)
              }
              const callout = marker.callout
              if (callout) {
                callout.setPosition(b)
              }
              const cb = data.animationEnd
              if (isFunction(cb)) {
                cb()
              }
            })
            let lastRtate = 0
            if (autoRotate) {
              if (marker.lastPosition) {
                lastRtate = (
                  maps as QQMaps | GoogleMaps
                ).geometry.spherical.computeHeading(
                  marker.lastPosition as any,
                  a as any
                )
              }
              rotate =
                (maps as QQMaps | GoogleMaps).geometry.spherical.computeHeading(
                  a as any,
                  b as any
                ) - lastRtate
            }
            if ('setRotation' in marker) {
              marker.setRotation(rotation + rotate)
            }
            if ('moveTo' in marker) {
              marker.moveTo(b as QLatLng, speed)
            } else {
              marker.setPosition(b as GLatLng)
              MapsEvent.trigger(marker, 'moveend', {})
            }
          })
        },
      }
      addMapChidlContext(context)
      onUnmounted(() => removeMapChidlContext(context))
    }
    onUnmounted(removeMarker)
    return () => {
      return null
    }
  },
})
