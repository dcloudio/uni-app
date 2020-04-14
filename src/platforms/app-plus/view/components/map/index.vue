<template>
  <uni-map v-on="$listeners">
    <div
      ref="container"
      class="uni-map-container"
    />
    <v-uni-cover-image
      v-for="(control, index) in mapControls"
      :key="index"
      :src="control.iconPath"
      :style="control.position"
      auto-size
      @click="controlclick(control)"
    />
    <div class="uni-map-slot">
      <slot />
    </div>
  </uni-map>
</template>
<script>
import {
  subscriber
} from 'uni-mixins'
import native from '../../mixins/native'

const methods = [
  'getCenterLocation',
  'moveToLocation',
  'getRegion',
  'getScale',
  '$getAppMap'
]

// const events = [
//   'markertap',
//   'callouttap',
//   'controltap',
//   'regionchange',
//   'tap',
//   'updated'
// ]

const attrs = [
  'latitude',
  'longitude',
  'scale',
  'markers',
  'polyline',
  'circles',
  'controls',
  'show-location'
]

const convertCoordinates = (lng, lat, callback) => {
  // plus.maps.Map.convertCoordinates(new plus.maps.Point(lng, lat), {
  //   coordType: 'gcj02'
  // }, callback)
  callback({
    coord: {
      latitude: lat,
      longitude: lng
    }
  })
}

function parseHex (color) {
  if (color.indexOf('#') !== 0) {
    return {
      color,
      opacity: 1
    }
  }
  const opacity = color.substr(7, 2)
  return {
    color: color.substr(0, 7),
    opacity: opacity ? Number('0x' + opacity) / 255 : 1
  }
}

export default {
  name: 'Map',
  mixins: [subscriber, native],
  props: {
    id: {
      type: String,
      default: ''
    },
    latitude: {
      type: [Number, String],
      default: ''
    },
    longitude: {
      type: [Number, String],
      default: ''
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
    }
  },
  data () {
    return {
      style: {
        top: '0px',
        left: '0px',
        width: '0px',
        height: '0px',
        position: 'static'
      },
      hidden: false
    }
  },
  computed: {
    attrs () {
      const obj = {}
      attrs.forEach(key => {
        let val = this.$props[key]
        val = key === 'src' ? this.$getRealPath(val) : val
        obj[key.replace(/[A-Z]/g, str => '-' + str.toLowerCase())] = val
      })
      return obj
    },
    mapControls () {
      const list = this.controls.map((control) => {
        const position = { position: 'absolute' };
        ['top', 'left', 'width', 'height'].forEach(key => {
          if (control.position[key]) {
            position[key] = control.position[key] + 'px'
          }
        })
        return {
          id: control.id,
          iconPath: this.$getRealPath(control.iconPath),
          position: position
        }
      })
      return list
    }
  },
  watch: {
    hidden (val) {
      this.map && this.map[val ? 'hide' : 'show']()
    },
    scale (val) {
      this.map && this.map.setZoom(parseInt(val))
    },
    latitude (val) {
      this.map && this.map.setStyles({
        center: new plus.maps.Point(this.longitude, this.latitude)
      })
    },
    longitude (val) {
      this.map && this.map.setStyles({
        center: new plus.maps.Point(this.longitude, this.latitude)
      })
    },
    markers (val) {
      this.map && this._addMarkers(val, true)
    },
    polyline (val) {
      this.map && this._addMapLines(val)
    },
    circles (val) {
      this.map && this._addMapCircles(val)
    }
  },
  mounted () {
    const mapStyle = Object.assign({}, this.attrs, this.position)
    if (this.latitude && this.longitude) {
      mapStyle.center = new plus.maps.Point(this.longitude, this.latitude)
    }
    const map = this.map = plus.maps.create(this.$page.id + '-map-' + (this.id || Date.now()), mapStyle)
    map.__markers__ = {}
    map.__lines__ = []
    map.__circles__ = []
    map.setZoom(parseInt(this.scale))
    plus.webview.currentWebview().append(map)
    if (this.hidden) {
      map.hide()
    }
    this.$watch('position', () => {
      this.map && this.map.setStyles(this.position)
    }, {
      deep: true
    })
    map.onclick = (e) => {
      this.$trigger('click', {}, e)
    }
    map.onstatuschanged = (e) => {
      this.$trigger('regionchange', {}, e)
    }
    this._addMarkers(this.markers)
    this._addMapLines(this.polyline)
    this._addMapCircles(this.circles)
  },
  beforeDestroy () {
    this.map && this.map.close()
    delete this.map
  },
  methods: {
    _handleSubscribe ({
      type,
      data = {}
    }) {
      if (!methods.includes(type)) {
        return
      }
      this.map && this[type](data)
    },
    moveToLocation ({ callbackId, longitude, latitude }) {
      this.map.setCenter(new plus.maps.Point(longitude || this.longitude, latitude || this.latitude))
      this._publishHandler(callbackId, {
        errMsg: 'moveToLocation:ok'
      })
    },
    getCenterLocation ({ callbackId }) {
      this.map.getCurrentCenter((state, point) => {
        this._publishHandler(callbackId, {
          longitude: point.longitude,
          latitude: point.latitude,
          errMsg: 'getCenterLocation:ok'
        })
      })
    },
    getRegion ({ callbackId }) {
      const rect = this.map.getBounds()
      this._publishHandler(callbackId, {
        southwest: rect.southwest,
        northeast: rect.northeast || rect.northease, // 5plus API 名字写错了
        errMsg: 'getRegion:ok'
      })
    },
    getScale ({ callbackId }) {
      this._publishHandler(callbackId, {
        scale: this.map.getZoom(),
        errMsg: 'getScale:ok'
      })
    },
    controlclick (e) {
      this.$trigger('controltap', {}, { controlId: e.id })
    },
    _publishHandler (callbackId, data) {
      UniViewJSBridge.publishHandler('onMapMethodCallback', {
        callbackId,
        data
      }, this.$page.id)
    },
    _addMarker (nativeMap, marker) {
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
        label
      } = marker
      convertCoordinates(longitude, latitude, res => {
        const {
          latitude,
          longitude
        } = res.coord
        const nativeMarker = new plus.maps.Marker(new plus.maps.Point(longitude, latitude))
        if (iconPath) {
          nativeMarker.setIcon(this.$getRealPath(iconPath))
        }
        if (label && label.content) {
          nativeMarker.setLabel(label.content)
        }
        let nativeBubble = false
        if (callout && callout.content) {
          nativeBubble = new plus.maps.Bubble(callout.content)
        }
        if (nativeBubble) {
          nativeMarker.setBubble(nativeBubble)
        }
        if (id || id === 0) {
          nativeMarker.onclick = (e) => {
            this.$trigger('markertap', {}, {
              markerId: id
            })
          }
          if (nativeBubble) {
            nativeBubble.onclick = () => {
              this.$trigger('callouttap', {}, {
                markerId: id
              })
            }
          }
        }
        nativeMap.addOverlay(nativeMarker)
        nativeMap.__markers__[id + ''] = nativeMarker
      })
    },
    _addMarkers (markers, clear) {
      if (this.map) {
        if (clear) {
          this.map.clearOverlays()
          this.map.__markers__ = {}
        }
        markers.forEach(marker => {
          this._addMarker(this.map, marker)
        })
        return {
          errMsg: 'addMapMarkers:ok'
        }
      }
      return {
        errMsg: 'addMapMarkers:fail:请先创建地图元素'
      }
    },
    _translateMapMarker ({
      autoRotate,
      callbackId,
      destination,
      duration,
      markerId
    }) {
      if (this.map) {
        const nativeMarker = this.map.__markers__[markerId + '']
        if (nativeMarker) {
          nativeMarker.setPoint(new plus.maps.Point(destination.longitude, destination.latitude))
        }
      }
      return {
        errMsg: 'translateMapMarker:ok'
      }
    },
    _addMapLines (lines) {
      const nativeMap = this.map
      if (!nativeMap) {
        return {
          errMsg: 'addMapLines:fail:请先创建地图元素'
        }
      }

      if (nativeMap.__lines__.length > 0) {
        nativeMap.__lines__.forEach(circle => {
          nativeMap.removeOverlay(circle)
        })
        nativeMap.__lines__ = []
      }

      lines.forEach(line => {
        const {
          color,
          width
          // dottedLine,
          // arrowLine,
          // arrowIconPath,
          // borderColor,
          // borderWidth
        } = line
        const points = line.points.map(point => new plus.maps.Point(point.longitude, point.latitude))
        const polyline = new plus.maps.Polyline(points)
        if (color) {
          const strokeStyle = parseHex(color)
          polyline.setStrokeColor(strokeStyle.color)
          polyline.setStrokeOpacity(strokeStyle.opacity)
        }
        if (width) {
          polyline.setLineWidth(width)
        }
        nativeMap.addOverlay(polyline)
        nativeMap.__lines__.push(polyline)
      })
      return {
        errMsg: 'addMapLines:ok'
      }
    },
    _addMapCircles (circles) {
      const nativeMap = this.map
      if (!nativeMap) {
        return {
          errMsg: 'addMapCircles:fail:请先创建地图元素'
        }
      }

      if (nativeMap.__circles__.length > 0) {
        nativeMap.__circles__.forEach(circle => {
          nativeMap.removeOverlay(circle)
        })
        nativeMap.__circles__ = []
      }

      circles.forEach(circle => {
        const {
          latitude,
          longitude,
          color,
          fillColor,
          radius,
          strokeWidth
        } = circle
        const nativeCircle = new plus.maps.Circle(new plus.maps.Point(longitude, latitude), radius)
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
        nativeMap.addOverlay(nativeCircle)
        nativeMap.__circles__.push(nativeCircle)
      })
      return {
        errMsg: 'addMapCircles:ok'
      }
    }
  }
}
</script>

<style>
  uni-map {
    width: 300px;
    height: 225px;
    display: inline-block;
    line-height: 0;
    overflow: hidden;
    position: relative;
  }

  uni-map[hidden] {
    display: none;
  }

  .uni-map-container {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    overflow: hidden;
    background-color: black;
  }

  .uni-map-slot {
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
    pointer-events: none;
  }
</style>
