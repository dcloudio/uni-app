<template>
  <uni-map
    :id="id"
    v-on="$listeners"
  >
    <map-marker
      v-for="item in markers"
      :key="item.id"
      v-bind="item"
    />
    <map-polygon
      v-for="item in polygons"
      :key="JSON.stringify(item.points)"
      v-bind="item"
    />
    <div
      ref="map"
      style="width: 100%; height: 100%; position: relative; overflow: hidden"
    />
    <div
      style="
        position: absolute;
        top: 0;
        width: 100%;
        height: 100%;
        overflow: hidden;
        pointer-events: none;
      "
    >
      <slot />
    </div>
  </uni-map>
</template>

<script>
import {
  subscriber
} from 'uni-mixins'

import { hexToRgba } from 'uni-shared'

import {
  loadMaps
} from './maps'

import mapMarker from './map-marker'
import mapPolygon from './map-polygon'

import { ICON_PATH_ORIGIN } from '../../../helpers/location'

function getLat (latLng) {
  if ('getLat' in latLng) {
    return latLng.getLat()
  } else {
    return latLng.lat()
  }
}

function getLng (latLng) {
  if ('getLng' in latLng) {
    return latLng.getLng()
  } else {
    return latLng.lng()
  }
}

export default {
  name: 'Map',
  components: {
    mapMarker,
    mapPolygon
  },
  mixins: [subscriber],
  props: {
    id: {
      type: String,
      default: ''
    },
    latitude: {
      type: [String, Number],
      default: 39.92
    },
    longitude: {
      type: [String, Number],
      default: 116.46
    },
    scale: {
      type: [String, Number],
      default: 16
    },
    markers: {
      type: Array,
      default () {
        return []
      }
    },
    covers: {
      type: Array,
      default () {
        return []
      }
    },
    includePoints: {
      type: Array,
      default () {
        return []
      }
    },
    polyline: {
      type: Array,
      default () {
        return []
      }
    },
    circles: {
      type: Array,
      default () {
        return []
      }
    },
    controls: {
      type: Array,
      default () {
        return []
      }
    },
    showLocation: {
      type: [Boolean, String],
      default: false
    },
    libraries: {
      type: Array,
      default () {
        return []
      }
    },
    polygons: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      center: {
        latitude: 116.46,
        longitude: 116.46
      },
      isMapReady: false,
      isBoundsReady: false,
      polylineSync: [],
      circlesSync: [],
      controlsSync: []
    }
  },
  watch: {
    latitude () {
      this.centerChange()
    },
    longitude () {
      this.centerChange()
    },
    scale (val) {
      this.mapReady(() => {
        this._map.setZoom(Number(val) || 16)
      })
    },
    polyline (val) {
      this.mapReady(() => {
        this.createPolyline()
      })
    },
    circles () {
      this.mapReady(() => {
        this.createCircles()
      })
    },
    controls () {
      this.mapReady(() => {
        this.createControls()
      })
    },
    includePoints () {
      this.mapReady(() => {
        this.fitBounds(this.includePoints)
      })
    },
    showLocation (val) {
      this.mapReady(() => {
        this[val ? 'createLocation' : 'removeLocation']()
      })
    }
  },
  created () {
    this._markers = {}
    var latitude = this.latitude
    var longitude = this.longitude
    if (latitude && longitude) {
      this.center.latitude = latitude
      this.center.longitude = longitude
    }
  },
  mounted () {
    loadMaps(this.libraries, result => {
      this._maps = result
      this.init()
    })
  },
  beforeDestroy () {
    this.removePolyline()
    this.removeCircles()
    this.removeControls()
    this.removeLocation()
  },
  methods: {
    _handleSubscribe ({
      type,
      data = {}
    }) {
      const maps = this._maps
      function callback (res, err) {
        res = res || {}
        res.errMsg = `${type}:${err ? 'fail' + err : 'ok'}`
        var cb = err ? data.fail : data.success
        if (typeof cb === 'function') {
          cb(res)
        }
        if (typeof data.complete === 'function') {
          data.complete(res)
        }
      }

      switch (type) {
        case 'getCenterLocation':
          this.mapReady(() => {
            var latitude
            var longitude
            var center = this._map.getCenter()
            latitude = getLat(center)
            longitude = getLng(center)

            callback({
              latitude: latitude,
              longitude: longitude
            })
          })
          break
        case 'moveToLocation':
          {
            const { latitude, longitude } = data
            var locationPosition = (latitude && longitude) ? new maps.LatLng(latitude, longitude) : this._locationPosition
            if (locationPosition) {
              this._map.setCenter(locationPosition)
              callback({})
            }
          }
          break
        case 'translateMarker':
          this.mapReady(() => {
            try {
              var marker = this.getMarker(data.markerId)
              var destination = data.destination
              var duration = data.duration
              var autoRotate = !!data.autoRotate
              var rotate = Number(data.rotate) ? data.rotate : 0
              let rotation = 0
              if ('getRotation' in marker) {
                rotation = marker.getRotation()
              }
              var a = marker.getPosition()
              var b = new maps.LatLng(destination.latitude, destination.longitude)
              var distance = maps.geometry.spherical.computeDistanceBetween(a, b) / 1000
              var time = ((typeof duration === 'number') ? duration : 1000) / (1000 * 60 * 60)
              var speed = distance / time
              var movingEvent = maps.event.addListener(marker, 'moving', e => {
                var latLng = e.latLng
                var label = marker.label
                if (label) {
                  label.setPosition(latLng)
                }
                var callout = marker.callout
                if (callout) {
                  callout.setPosition(latLng)
                }
              })
              var event = maps.event.addListener(marker, 'moveend', e => {
                event.remove()
                movingEvent.remove()
                marker.lastPosition = a
                marker.setPosition(b)
                var label = marker.label
                if (label) {
                  label.setPosition(b)
                }
                var callout = marker.callout
                if (callout) {
                  callout.setPosition(b)
                }
                var cb = data.animationEnd
                if (typeof cb === 'function') {
                  cb()
                }
              })
              var lastRtate = 0
              if (autoRotate) {
                if (marker.lastPosition) {
                  lastRtate = maps.geometry.spherical.computeHeading(marker.lastPosition, a)
                }
                rotate = maps.geometry.spherical.computeHeading(a, b) - lastRtate
              }
              if ('setRotation' in marker) {
                marker.setRotation(rotation + rotate)
              }
              if ('moveTo' in marker) {
                marker.moveTo(b, speed)
              } else {
                marker.setPosition(b)
                maps.event.trigger(marker, 'moveend', {})
              }
            } catch (error) {
              callback(null, error)
            }
          })
          break
        case 'includePoints':
          this.fitBounds(data.points)
          break
        case 'getRegion':
          this.boundsReady(() => {
            var latLngBounds = this._map.getBounds()
            var southwest = latLngBounds.getSouthWest()
            var northeast = latLngBounds.getNorthEast()
            callback({
              southwest: {
                latitude: getLat(southwest),
                longitude: getLng(southwest)
              },
              northeast: {
                latitude: getLat(northeast),
                longitude: getLng(northeast)
              }
            })
          })
          break
        case 'getScale':
          this.mapReady(() => {
            callback({
              scale: this._map.getZoom()
            })
          })
          break
      }
    },
    init () {
      const maps = this._maps
      var center = new maps.LatLng(this.center.latitude, this.center.longitude)
      var map = this._map = new maps.Map(this.$refs.map, {
        center,
        zoom: Number(this.scale),
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
        draggable: true
      })
      var boundsChangedEvent = maps.event.addListener(map, 'bounds_changed', e => {
        boundsChangedEvent.remove()
        this.isBoundsReady = true
        this.$emit('boundsready')
      })
      maps.event.addListener(map, 'click', () => {
        // TODO 编译器将 tap 转换为click
        this.$trigger('click', {}, {})
      })
      maps.event.addListener(map, 'dragstart', () => {
        this.$trigger('regionchange', {}, {
          type: 'begin',
          causedBy: 'gesture'
        })
      })
      function getMapInfo () {
        var center = map.getCenter()
        return {
          scale: map.getZoom(),
          centerLocation: {
            latitude: getLat(center),
            longitude: getLng(center)
          }
        }
      }
      maps.event.addListener(map, 'dragend', () => {
        this.$trigger('regionchange', {}, Object.assign({
          type: 'end',
          causedBy: 'drag'
        }, getMapInfo()))
      })
      maps.event.addListener(map, 'zoom_changed', () => {
        this.$emit('update:scale', map.getZoom())
        this.$trigger('regionchange', {}, Object.assign({
          type: 'end',
          causedBy: 'scale'
        }, getMapInfo()))
      })
      maps.event.addListener(map, 'center_changed', () => {
        var latitude
        var longitude
        var center = map.getCenter()
        latitude = getLat(center)
        longitude = getLng(center)
        this.$emit('update:latitude', latitude)
        this.$emit('update:longitude', longitude)
      })
      if (this.polyline && Array.isArray(this.polyline) && this.polyline.length) {
        this.createPolyline()
      }
      if (this.circles && Array.isArray(this.circles) && this.circles.length) {
        this.createCircles()
      }
      if (this.controls && Array.isArray(this.controls) && this.controls.length) {
        this.createControls()
      }
      if (this.showLocation) {
        this.createLocation()
      }
      if (this.includePoints && Array.isArray(this.includePoints) && this.includePoints.length) {
        this.fitBounds(this.includePoints, () => {
          map.setCenter(center)
        })
      }
      this.isMapReady = true
      this.$emit('mapready')
      this.$trigger('updated', {}, {})
    },
    centerChange () {
      const maps = this._maps
      var latitude = Number(this.latitude)
      var longitude = Number(this.longitude)
      if (latitude !== this.center.latitude || longitude !== this.center.longitude) {
        this.center.latitude = latitude
        this.center.longitude = longitude
        if (this._map) {
          this.mapReady(() => {
            this._map.setCenter(new maps.LatLng(latitude, longitude))
          })
        }
      }
    },
    createPolyline () {
      const maps = this._maps
      var map = this._map
      var polyline = this.polylineSync
      this.removePolyline()
      this.polyline.forEach(option => {
        var path = []
        option.points.forEach(point => {
          path.push(new maps.LatLng(point.latitude, point.longitude))
        })
        const borderWidth = Number(option.borderWidth) || 0
        const { r: sr, g: sg, b: sb, a: sa } = hexToRgba(option.color)
        const { r: br, g: bg, b: bb, a: ba } = hexToRgba(option.borderColor)
        const polylineOptions = {
          map,
          clickable: false,
          path,
          strokeWeight: option.width + borderWidth,
          strokeDashStyle: option.dottedLine ? 'dash' : 'solid'
        }
        const polylineBorderOptions = {
          map,
          clickable: false,
          path,
          strokeWeight: option.width,
          strokeDashStyle: option.dottedLine ? 'dash' : 'solid'
        }
        if ('Color' in maps) {
          polylineOptions.strokeColor = new maps.Color(sr, sg, sb, sa)
          polylineBorderOptions.strokeColor = new maps.Color(br, bg, bb, ba)
        } else {
          polylineOptions.strokeColor = `rgb(${sr}, ${sg}, ${sb})`
          polylineOptions.strokeOpacity = sa
          polylineBorderOptions.strokeColor = `rgb(${br}, ${bg}, ${bb})`
          polylineBorderOptions.strokeOpacity = ba
        }
        if (borderWidth) {
          polyline.push(new maps.Polyline(polylineBorderOptions))
        }
        polyline.push(new maps.Polyline(polylineOptions))
      })
    },
    removePolyline () {
      var polyline = this.polylineSync
      polyline.forEach(line => {
        line.setMap(null)
      })
      polyline.splice(0, polyline.length)
    },
    createCircles () {
      const maps = this._maps
      var map = this._map
      var circles = this.circlesSync
      this.removeCircles()
      this.circles.forEach(option => {
        var center = new maps.LatLng(option.latitude, option.longitude)

        const circleOptions = {
          map,
          center,
          clickable: false,
          radius: option.radius,
          strokeWeight: Number(option.strokeWidth) || 1,
          strokeDashStyle: 'solid'
        }
        const { r: fr, g: fg, b: fb, a: fa } = hexToRgba(option.fillColor || '#00000000')
        const { r: sr, g: sg, b: sb, a: sa } = hexToRgba(option.color || '#000000')
        if ('Color' in maps) {
          circleOptions.fillColor = new maps.Color(fr, fg, fb, fa)
          circleOptions.strokeColor = new maps.Color(sr, sg, sb, sa)
        } else {
          circleOptions.fillColor = `rgb(${fr}, ${fg}, ${fb})`
          circleOptions.fillOpacity = fa
          circleOptions.strokeColor = `rgb(${sr}, ${sg}, ${sb})`
          circleOptions.strokeOpacity = sa
        }
        var circle = new maps.Circle(circleOptions)
        circles.push(circle)
      })
    },
    removeCircles () {
      var circles = this.circlesSync
      circles.forEach(circle => {
        circle.setMap(null)
      })
      circles.splice(0, circles.length)
    },
    createControls () {
      const maps = this._maps
      var _self = this
      var map = this._map
      var controls = this.controlsSync
      this.removeControls()
      this.controls.forEach(option => {
        var position = option.position || {}
        var control = document.createElement('div')
        var img = new Image()
        control.appendChild(img)
        var style = control.style
        style.position = 'absolute'
        style.width = 0
        style.height = 0
        img.onload = () => {
          if (option.position.width) {
            img.width = option.position.width
          }
          if (option.position.height) {
            img.height = option.position.height
          }
          var style = img.style
          style.position = 'absolute'
          style.left = (position.left || 0) + 'px'
          style.top = (position.top || 0) + 'px'
          style.maxWidth = 'initial'
        }
        img.src = this.$getRealPath(option.iconPath)
        img.onclick = function ($event) {
          if (option.clickable) {
            _self.$trigger('controltap', $event, {
              controlId: option.id
            })
          }
        }
        map.controls[maps.ControlPosition.TOP_LEFT].push(control)
        controls.push(control)
      })
    },
    removeControls () {
      var controls = this.controlsSync
      controls.forEach(control => {
        control.remove()
      })
      controls.splice(0, controls.length)
    },
    createLocation () {
      const maps = this._maps
      var map = this._map
      var location = this._location
      if (location) {
        this.removeLocation()
      }
      uni.getLocation({
        type: 'gcj02',
        success: (res) => {
          if (location !== this._location) {
            return
          }
          var position = new maps.LatLng(res.latitude, res.longitude)
          location = new maps.Marker({
            position,
            map,
            icon: new maps.MarkerImage(ICON_PATH_ORIGIN, null, null, new maps.Point(22, 22), new maps.Size(44, 44)),
            flat: true,
            rotation: 0
          })
          this._location = location
          refreshLocation()
          this.__onCompassChange = function (res) {
            location.setRotation(res.direction)
          }
          uni.onCompassChange(this.__onCompassChange)
        },
        fail: e => {
          console.error(e)
        }
      })
      var self = this

      function refreshLocation () {
        if (location !== self._location) {
          return
        }
        setTimeout(() => {
          uni.getLocation({
            type: 'gcj02',
            success: (res) => {
              var locationPosition = self._locationPosition = new maps.LatLng(res.latitude, res.longitude)
              location.setPosition(locationPosition)
            },
            fail: e => {
              console.error(e)
            },
            complete: () => {
              refreshLocation()
            }
          })
        }, 30000)
      }
    },
    removeLocation () {
      var location = this._location
      if (location) {
        location.setMap(null)
        this._location = null
        this._locationPosition = null
        uni.offCompassChange(this.__onCompassChange)
      }
    },
    fitBounds (points, cb) {
      const maps = this._maps
      this.boundsReady(() => {
        var map = this._map
        var bounds = new maps.LatLngBounds()

        points.forEach(point => {
          var longitude = point.longitude
          var latitude = point.latitude
          var latLng = new maps.LatLng(latitude, longitude)
          bounds.extend(latLng)
        })
        map.fitBounds(bounds)
        if (typeof cb === 'function') {
          cb()
        }
      })
    },
    mapReady (cb) {
      if (this.isMapReady) {
        cb()
      } else {
        this.$once('mapready', () => {
          cb()
        })
      }
    },
    boundsReady (cb) {
      if (this.isBoundsReady) {
        cb()
      } else {
        this.$once('boundsready', () => {
          cb()
        })
      }
    },
    getMarker (id) {
      var marker = this._markers[id]
      if (!marker) {
        throw new Error('translateMarker: fail cannot find marker with id ' + id)
      }
      return marker
    }
  }
}
</script>

<style>
	uni-map {
		position: relative;
		width: 300px;
		height: 150px;
		display: block;
	}

	uni-map[hidden] {
		display: none;
	}
</style>
