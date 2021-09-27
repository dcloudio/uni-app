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

import {
  loadMaps
} from './maps'

import mapMarker from './map-marker'

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
    mapMarker
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

        if (option.borderWidth) {
          var border = new maps.Polyline({
            map,
            clickable: false,
            path,
            strokeWeight: option.width + option.borderWidth,
            strokeColor: option.borderColor,
            strokeDashStyle: option.dottedLine ? 'dash' : 'solid'
          })
          polyline.push(border)
        }
        var line = new maps.Polyline({
          map,
          clickable: false,
          path,
          strokeWeight: option.width,
          strokeColor: option.color,
          strokeDashStyle: option.dottedLine ? 'dash' : 'solid'
        })
        polyline.push(line)
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

        function getColor (color) {
          var c = color && color.match(/#[0-9A-Fa-f]{6}([0-9A-Fa-f]{2})?/)
          if ('Color' in maps) {
            if (c && c.length) {
              return maps.Color.fromHex(c[0], Number('0x' + c[1] || 255) / 255)
            } else {
              return undefined
            }
          }
          return color
        }
        var circle = new maps.Circle({
          map,
          center,
          clickable: false,
          radius: option.radius,
          strokeWeight: Number(option.strokeWidth) || 1,
          fillColor: getColor(option.fillColor) || getColor('#00000001'),
          strokeColor: getColor(option.color) || '#000000',
          strokeDashStyle: 'solid'
        })
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
            icon: new maps.MarkerImage(
              'data:image/png;base64,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',
              null, null, new maps.Point(22, 22), new maps.Size(44, 44)),
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
