import { onUnmounted, inject, watch } from 'vue'
import { getRealPath } from '@dcloudio/uni-platform'
import { defineSystemComponent, useCustomEvent } from '@dcloudio/uni-components'
import { Map, Marker, Label, LatLng } from './qqMap/types'
import { Callout, CalloutOptions, QQMapsExt } from './qqMap'

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
  maps: QQMapsExt,
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

interface MarkerExt extends Marker {
  callout?: InstanceType<Callout>
  label?: Label
  lastPosition?: LatLng
}

export default /*#__PURE__*/ defineSystemComponent({
  name: 'MapMarker',
  props,
  setup(props) {
    const id = String(Number(props.id) !== NaN ? props.id : '')
    const onMapReady: OnMapReady = inject('onMapReady') as OnMapReady
    let marker: MarkerExt
    function removeMarker() {
      if (marker) {
        if (marker.label) {
          marker.label.setMap(null)
        }
        if (marker.callout) {
          marker.callout.setMap(null)
        }
        marker.setMap(null)
      }
    }
    onMapReady((map, maps, trigger) => {
      function updateMarker(option: Props) {
        const title = option.title
        const position = new maps.LatLng(option.latitude, option.longitude)
        const img = new Image()
        img.onload = () => {
          const anchor = option.anchor || {}
          let icon
          let w
          let h
          let top
          let x = anchor.x
          let y = anchor.y
          if (option.iconPath && (option.width || option.height)) {
            w = option.width || (img.width / img.height) * option.height
            h = option.height || (img.height / img.width) * option.width
          } else {
            w = img.width / 2
            h = img.height / 2
          }
          x = (typeof x === 'number' ? x : 0.5) * w
          y = (typeof y === 'number' ? y : 1) * h
          top = h - (h - y)
          icon = new maps.MarkerImage(
            img.src,
            null,
            null,
            new maps.Point(x, y),
            new maps.Size(w, h)
          )
          marker.setPosition(position)
          marker.setIcon(icon)
          marker.setRotation(option.rotate || 0)
          const labelOpt = option.label || {}
          if (marker.label) {
            marker.label.setMap(null)
            delete marker.label
          }
          let label
          if (labelOpt.content) {
            label = new maps.Label({
              position,
              map,
              clickable: false,
              content: labelOpt.content,
              style: {
                border: 'none',
                padding: '8px',
                background: 'none',
                color: labelOpt.color,
                fontSize: (labelOpt.fontSize || 14) + 'px',
                lineHeight: (labelOpt.fontSize || 14) + 'px',
                marginLeft: labelOpt.x,
                marginTop: labelOpt.y,
              },
            })
            marker.label = label
          }
          const calloutOpt = option.callout || {}
          let callout = marker.callout
          let calloutStyle: CalloutOptions
          if (calloutOpt.content || title) {
            calloutStyle = calloutOpt.content
              ? {
                  position,
                  map,
                  top,
                  content: calloutOpt.content,
                  color: calloutOpt.color,
                  fontSize: calloutOpt.fontSize,
                  borderRadius: calloutOpt.borderRadius,
                  bgColor: calloutOpt.bgColor,
                  padding: calloutOpt.padding,
                  boxShadow: calloutOpt.boxShadow,
                  display: calloutOpt.display,
                }
              : {
                  position,
                  map,
                  top,
                  content: title,
                  boxShadow: '0px 0px 3px 1px rgba(0,0,0,0.5)',
                }
            if (callout) {
              callout.setOption(calloutStyle)
            } else {
              callout = marker.callout = new maps.Callout(calloutStyle)
              callout.div.onclick = function ($event) {
                if (id !== '') {
                  trigger('callouttap', $event, {
                    markerId: Number(id),
                  })
                }
                $event.stopPropagation()
                $event.preventDefault()
              }
            }
          } else {
            if (callout) {
              callout.setMap(null)
              delete marker.callout
            }
          }
        }
        img.src = getRealPath(option.iconPath)
      }
      function addMarker(props: Props) {
        marker = new maps.Marker({
          map,
          flat: true,
          autoRotation: false,
        })
        updateMarker(props)
        maps.event.addListener(marker, 'click', () => {
          const callout = marker.callout
          if (callout) {
            const div = callout.div
            const parent = div.parentNode as HTMLElement
            if (!callout.alwaysVisible) {
              callout.set('visible', !callout.visible)
            }
            if (callout.visible) {
              parent.removeChild(div)
              parent.appendChild(div)
            }
          }
          if (id) {
            trigger('markertap', {} as Event, {
              markerId: Number(id),
            })
          }
        })
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
            const rotation = marker.getRotation()
            const a = marker.getPosition()
            const b = new maps.LatLng(
              destination.latitude,
              destination.longitude
            )
            const distance =
              maps.geometry.spherical.computeDistanceBetween(a, b) / 1000
            const time =
              (typeof duration === 'number' ? duration : 1000) /
              (1000 * 60 * 60)
            const speed = distance / time
            const movingEvent = maps.event.addListener(
              marker,
              'moving',
              (e: any) => {
                const latLng = e.latLng
                const label = marker.label
                if (label) {
                  label.setPosition(latLng)
                }
                const callout = marker.callout
                if (callout) {
                  callout.setPosition(latLng)
                }
              }
            )
            const event = maps.event.addListener(marker, 'moveend', () => {
              event.remove()
              movingEvent.remove()
              marker.lastPosition = a
              marker.setPosition(b)
              const label = marker.label
              if (label) {
                label.setPosition(b)
              }
              const callout = marker.callout
              if (callout) {
                callout.setPosition(b)
              }
              const cb = data.animationEnd
              if (typeof cb === 'function') {
                cb()
              }
            })
            let lastRtate = 0
            if (autoRotate) {
              if (marker.lastPosition) {
                lastRtate = maps.geometry.spherical.computeHeading(
                  marker.lastPosition,
                  a
                )
              }
              rotate = maps.geometry.spherical.computeHeading(a, b) - lastRtate
            }
            marker.setRotation(rotation + rotate)
            marker.moveTo(b, speed)
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
