<template>
  <uni-map :id="id">
    <div
      ref="map"
      style="width: 100%; height: 100%; position: relative; overflow: hidden;" />
    <div style="position: absolute; top: 0; width: 100%; height: 100%; overflow: hidden; pointer-events: none;">
      <slot />
    </div>
  </uni-map>
</template>

<script>
import {
  subscriber
} from 'uni-mixins'

import {
  hasOwn
} from 'uni-shared'

var maps
export default {
  name: 'Map',
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
      markersSync: [],
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
    markers (val, old) {
      this.mapReady(() => {
        var add = []
        var has = []
        var changed = []
        var changedOption = []
        var remove = []
        val.forEach(option => {
          if (!('id' in option)) {
            add.push(option)
          } else {
            var isOld = false
            for (var index = 0; index < old.length; index++) {
              var element = old[index]
              if (!('id' in element)) {
                old.splice(index--, 1)
                continue
              }
              if (element.id !== option.id) {
                continue
              }
              isOld = true
              has.push(element.id)
              if (JSON.stringify(element) !== JSON.stringify(option)) {
                changed.push(element.id)
                changedOption.push(option)
              }
              old.splice(index--, 1)
            }
            if (!isOld) {
              add.push(option)
            }
          }
        })
        var markers = this.markersSync
        markers.forEach(marker => {
          var id = marker.id
          var index
          if (has.indexOf(id) >= 0) {
            if ((index = changed.indexOf(id)) >= 0) {
              this.changeMarker(marker, changedOption[index])
            }
          } else {
            remove.push(marker)
          }
        })
        this.removeMarkers(remove)
        this.createMarkers(add)
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
    var latitude = this.latitude
    var longitude = this.longitude
    if (latitude && longitude) {
      this.center.latitude = latitude
      this.center.longitude = longitude
    }
  },
  mounted () {
    this.loadMap(() => {
      this.init()
    })
  },
  beforeDestroy () {
    this.removeMarkers(this.markersSync)
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
            latitude = center.getLat()
            longitude = center.getLng()

            callback({
              latitude: latitude,
              longitude: longitude
            })
          })
          break
        case 'moveToLocation':
          var locationPosition = this._locationPosition
          if (locationPosition) {
            this._map.setCenter(locationPosition)
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
              var rotation = marker.getRotation()
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
              marker.setRotation(rotation + rotate)
              marker.moveTo(b, speed)
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
                latitude: southwest.getLat(),
                longitude: southwest.getLng()
              },
              northeast: {
                latitude: northeast.getLat(),
                longitude: northeast.getLng()
              }
            })
          })
          break
        case 'getScale':
          this.mapReady(() => {
            callback({
              scale: Number(this.scale)
            })
          })
          break
      }
    },
    init () {
      var center = new maps.LatLng(this.center.latitude, this.center.longitude)
      var map = this._map = new maps.Map(this.$refs.map, {
        center,
        zoom: Number(this.scale),
        scrollwheel: false,
        disableDoubleClickZoom: true,
        mapTypeControl: false,
        zoomControl: false,
        scaleControl: false,
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
          type: 'begin'
        })
      })
      maps.event.addListener(map, 'dragend', () => {
        this.$trigger('regionchange', {}, {
          type: 'end'
        })
      })
      maps.event.addListener(map, 'zoom_changed', () => {
        this.$emit('update:scale', map.getZoom())
      })
      maps.event.addListener(map, 'center_changed', () => {
        var latitude
        var longitude
        var center = map.getCenter()
        latitude = center.getLat()
        longitude = center.getLng()
        this.$emit('update:latitude', latitude)
        this.$emit('update:longitude', longitude)
      })
      if (this.markers && Array.isArray(this.markers) && this.markers.length) {
        this.createMarkers(this.markers)
      }
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
    createMarkers (markerOptions) {
      var map = this._map
      var markers = this.markersSync
      markerOptions.forEach(option => {
        var marker = new maps.Marker({
          map,
          flat: true,
          autoRotation: false
        })
        marker.id = option.id
        this.changeMarker(marker, option)
        maps.event.addListener(marker, 'click', e => {
          var callout = marker.callout
          if (callout) {
            var div = callout.div
            var parent = div.parentNode
            if (!callout.alwaysVisible) {
              callout.set('visible', !callout.visible)
            }
            if (callout.visible) {
              parent.removeChild(div)
              parent.appendChild(div)
            }
          }
          hasOwn(option, 'id') && this.$trigger('markertap', {}, {
            markerId: option.id
          })
        })
        markers.push(marker)
      })
    },
    changeMarker (marker, option) {
      var self = this
      var map = this._map
      var title = option.title || option.name
      var position = new maps.LatLng(option.latitude, option.longitude)
      var img = new Image()
      img.onload = () => {
        var anchor = option.anchor || {}
        var icon
        var w
        var h
        var top
        var x = anchor.x
        var y = anchor.y
        if (option.iconPath && (option.width || option.height)) {
          w = option.width || img.width / img.height * option.height
          h = option.height || img.height / img.width * option.width
        } else {
          w = img.width / 2
          h = img.height / 2
        }
        x = (typeof x === 'number' ? x : 0.5) * w
        y = (typeof y === 'number' ? y : 1) * h
        top = h - (h - y)
        icon = new maps.MarkerImage(img.src, null, null, new maps.Point(x, y), new maps.Size(w, h))
        marker.setPosition(position)
        marker.setIcon(icon)
        marker.setRotation(option.rotate || 0)
        var labelOpt = option.label || {}
        if (marker.label) {
          marker.label.setMap(null)
          delete (marker.label)
        }
        var label
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
              marginTop: labelOpt.y
            }
          })
          marker.label = label
        }
        var calloutOpt = option.callout || {}
        var callout = marker.callout
        var calloutStyle
        if (calloutOpt.content) {
          calloutStyle = {
            id: option.id,
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
            display: calloutOpt.display
          }
        } else if (title) {
          calloutStyle = {
            id: option.id,
            position,
            map,
            top,
            content: title,
            boxShadow: '0px 0px 3px 1px rgba(0,0,0,0.5)'
          }
        }
        if (calloutStyle) {
          if (callout) {
            callout.setOption(calloutStyle)
          } else {
            callout = marker.callout = new maps.Callout(calloutStyle)

            callout.div.onclick = function ($event) {
              hasOwn(option, 'id') && self.$trigger('callouttap', $event, {
                markerId: option.id
              })
              $event.stopPropagation()
              $event.preventDefault()
            }
          }
        } else {
          if (callout) {
            callout.setMap(null)
            delete (marker.callout)
          }
        }
      }
      img.src = option.iconPath ? this.$getRealPath(option.iconPath)
        : 'data:image/png;base64,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'
    },
    removeMarkers (markers) {
      for (var index = 0; index < markers.length; index++) {
        var marker = markers[index]
        if (marker.label) {
          marker.label.setMap(null)
        }
        if (marker.callout) {
          marker.callout.setMap(null)
        }
        marker.setMap(null)
        markers.splice(index--, 1)
      }
    },
    createPolyline () {
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
      var map = this._map
      var circles = this.circlesSync
      this.removeCircles()
      this.circles.forEach(option => {
        var center = new maps.LatLng(option.latitude, option.longitude)

        function getColor (color) {
          var c = color.match(/#[0-9A-Fa-f]{6}([0-9A-Fa-f]{2})?/)
          if (c && c.length) {
            return maps.Color.fromHex(c[0], Number('0x' + c[1] || 255) / 255)
          } else {
            return undefined
          }
        }
        var circle = new maps.Circle({
          map,
          center,
          clickable: false,
          radius: option.radius,
          strokeWeight: option.strokeWidth,
          fillColor: getColor(option.fillColor),
          strokeColor: getColor(option.color),
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
          uni.onCompassChange(function (res) {
            location.setRotation(res.direction)
          })
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
        }, 1000)
      }
    },
    removeLocation () {
      var location = this._location
      if (location) {
        location.setMap(null)
        this._location = null
        this._locationPosition = null
        uni.stopCompass()
      }
    },
    fitBounds (points, cb) {
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
      var markers = this.markersSync
      for (var index = 0; index < markers.length; index++) {
        var element = markers[index]
        if (element.id === id) {
          return element
        }
      }
    },
    loadMap (callback) {
      if (maps) {
        callback()
      } else if (window.qq && window.qq.maps) {
        maps = window.qq.maps
        callback()
      } else {
        let key = __uniConfig.qqMapKey
        let callbackName = '_callback' + Date.now()
        window[callbackName] = function () {
          delete window[callbackName]
          maps = window.qq.maps
          var Callout = maps.Callout = function (option = {}) {
            this.option = option
            var map = option.map
            this.position = option.position
            this.index = 1
            this.visible = this.alwaysVisible = option.display === 'ALWAYS'
            this.init()
            Object.defineProperty(this, 'onclick', {
              setter (callback) {
                this.div.onclick = callback
              },
              getter () {
                return this.div.onclick
              }
            })
            if (map) {
              this.setMap(map)
            }
          }
          Callout.prototype = new maps.Overlay()
          Callout.prototype.init = function () {
            var option = this.option
            var div = this.div = document.createElement('div')
            var divStyle = div.style
            divStyle.position = 'absolute'
            divStyle.whiteSpace = 'nowrap'
            divStyle.transform = 'translateX(-50%) translateY(-100%)'
            divStyle.zIndex = 1
            divStyle.boxShadow = option.boxShadow || 'none'
            divStyle.display = this.visible ? 'block' : 'none'
            var triangle = this.triangle = document.createElement('div')
            triangle.setAttribute('style',
              'position: absolute;white-space: nowrap;border-width: 4px;border-style: solid;border-color: #fff transparent transparent;border-image: initial;font-size: 12px;padding: 0px;background-color: transparent;width: 0px;height: 0px;transform: translate(-50%, 100%);left: 50%;bottom: 0;'
            )
            this.setStyle(option)
            this.changed = function (key) {
              divStyle.display = this.visible ? 'block' : 'none'
            }
            div.appendChild(triangle)
          }
          Callout.prototype.construct = function () {
            var div = this.div
            var panes = this.getPanes()
            panes.floatPane.appendChild(div)
          }
          Callout.prototype.draw = function () {
            var overlayProjection = this.getProjection()
            if (!this.position || !this.div || !overlayProjection) {
              return
            }
            var pixel = overlayProjection.fromLatLngToDivPixel(this.position)
            var divStyle = this.div.style
            divStyle.left = pixel.x + 'px'
            divStyle.top = pixel.y + 'px'
          }
          Callout.prototype.destroy = function () {
            this.div.parentNode.removeChild(this.div)
            this.div = null
            this.triangle = null
          }
          Callout.prototype.setOption = function (option) {
            this.option = option
            this.setPosition(option.position)
            if (option.display === 'ALWAYS') {
              this.alwaysVisible = this.visible = true
            } else {
              this.alwaysVisible = false
            }
            this.setStyle(option)
          }
          Callout.prototype.setStyle = function (option) {
            var div = this.div
            var divStyle = div.style
            div.innerText = option.content
            divStyle.lineHeight = (option.fontSize || 14) + 'px'
            divStyle.fontSize = (option.fontSize || 14) + 'px'
            divStyle.padding = (option.padding || 8) + 'px'
            divStyle.color = option.color || '#000'
            divStyle.borderRadius = (option.borderRadius || 0) + 'px'
            divStyle.backgroundColor = option.bgColor || '#fff'
            divStyle.marginTop = '-' + (option.top + 5) + 'px'
            this.triangle.style.borderColor = `${option.bgColor || '#fff'} transparent transparent`
          }
          Callout.prototype.setPosition = function (position) {
            this.position = position
            this.draw()
          }
          callback()
        }
        let script = document.createElement('script')
        script.src = `https://map.qq.com/api/js?v=2.exp&key=${key}&callback=${callbackName}&libraries=geometry`
        document.body.appendChild(script)
      }
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
