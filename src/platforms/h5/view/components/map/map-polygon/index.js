import { hexToRgba } from 'uni-shared'
import { listenEvent } from './event'

// 变量声明放外面，而不是放组件实例上的原因也是和下面 $watch 部分描述的问题有关
let polygonIns = null

export default {
  props: {
    // 经纬度数组，[{latitude: 0, longitude: 0}]
    points: {
      type: Array,
      required: true
    },
    // 多边形是否可点击。
    clickable: {
      type: Boolean
    },
    // 鼠标在多边形内的光标样式。
    cursor: {
      type: String
    },
    // 区域是否可编辑
    editable: {
      type: Boolean,
      default: false
    },
    // 多边形是否可见。
    visible: {
      type: Boolean,
      default: true
    },
    // 描边的宽度
    strokeWidth: {
      type: Number
    },
    // 描边的颜色，十六进制
    strokeColor: {
      type: String
    },
    // 描边的透明度，[0-1]
    strokeColorAlpha: {
      type: Number,
      default: 1
    },
    // 多边形的边框样式。实线是solid，虚线是dash。
    strokeDashStyle: {
      type: String
    },
    // 填充颜色，十六进制
    fillColor: {
      type: String
    },
    // 设置填充色的透明度，[0-1]
    fillColorAlpha: {
      type: Number,
      default: 1
    },
    // 设置多边形 Z 轴数值
    zIndex: {
      type: Number
    }
  },
  mounted () {
    const { $parent } = this
    // 当地图准备好以后调用指定的回调函数
    $parent.mapReady(() => {
      this.drawPolygon()

      // 遍历 props 对象，观察其中的每个属性，当属性发生变化时，更新地图上的 polygon
      Object.keys(this.$props).forEach(key => {
        /**
         * 这段其实暂时没有用，因为 props 更新时组件会重新挂载，而不是直接更新。
         * 问题可能出在 uni-app 重写 Vue 时某些地方有问题。
         * 但先留着这部分内容，防止以后 uni-app 修复该问题后 polygon 更新出问题
         */
        this.$watch(key, () => {
          this.drawPolygon()
        }, { deep: true })
      })
    })
  },
  methods: {
    // 绘制区域
    drawPolygon () {
      // polygon 组件的 props 配置
      const {
        points,
        clickable,
        cursor,
        editable,
        strokeWidth,
        strokeColor,
        strokeColorAlpha,
        strokeDashStyle,
        fillColor,
        fillColorAlpha,
        zIndex,
        visible
      } = this

      // 从父组件解析 _maps、_map 和 $trigger，下面要用
      const { _maps, _map } = this.$parent

      const path = points.map(item => {
        const { latitude, longitude } = item
        return new _maps.LatLng(latitude, longitude)
      })

      // 将 16 进制的色值转换为 rgb 的格式
      const { r: fcR, g: fcG, b: fcB } = hexToRgba(fillColor || '#5f9ea0')
      const { r: scR, g: scG, b: scB } = hexToRgba(strokeColor || '#000000')

      const polygonOptions = {
        // 多边形是否可点击。
        clickable: clickable || true,

        // 鼠标在多边形内的光标样式。
        cursor: cursor || 'crosshair',

        // 多边形是否可编辑。
        editable,

        // 多边形的填充色，可通过Color对象的alpha属性设置透明度。
        fillColor: new _maps.Color(fcR, fcG, fcB, fillColorAlpha),

        // 地图实例，即要显示多边形的地图
        // @ts-ignore
        map: _map,

        // 多边形的路径，以经纬度坐标数组构成。
        path,

        // 多边形的线条颜色，可通过Color对象的alpha属性设置透明度。
        strokeColor: new _maps.Color(scR, scG, scB, strokeColorAlpha),

        // 多边形的边框样式。实线是solid，虚线是dash。
        strokeDashStyle: strokeDashStyle || 'dash',

        // 多边形的边框线宽。
        strokeWeight: strokeWidth || 5,

        // 多边形是否可见。
        visible,

        // 多边形的zIndex值。
        zIndex: zIndex || 1000
      }

      if (polygonIns) {
        // 更新区域属性
        polygonIns.setOptions(polygonOptions)
        return
      }

      // 说明是新增区域
      polygonIns = new _maps.Polygon(polygonOptions)

      // 监听事件，当对应事件发生时，将事件暴露给用户
      listenEvent(_maps, polygonIns, this.$parent.$trigger)
    }
  },
  // 卸载时清除地图上绘制的 polygon
  beforeDestroy () {
    polygonIns.setMap(null)
    polygonIns = null
  },
  render () {
    return null
  }
}
