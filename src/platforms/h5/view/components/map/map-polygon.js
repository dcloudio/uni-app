import { hexToRgba } from 'uni-shared'

export default {
  props: {
    // 边框虚线，腾讯地图支持，google 地图不支持，默认值为[0, 0] 为实线，非 [0, 0] 为虚线，H5 端无法像微信小程序一样控制虚线的间隔像素大小
    dashArray: {
      type: Array,
      default: () => [0, 0]
    },
    // 经纬度数组，[{latitude: 0, longitude: 0}]
    points: {
      type: Array,
      required: true
    },
    // 描边的宽度
    strokeWidth: {
      type: Number,
      default: 1
    },
    // 描边的颜色，十六进制
    strokeColor: {
      type: String,
      default: '#000000'
    },
    // 填充颜色，十六进制
    fillColor: {
      type: String,
      default: '#00000000'
    },
    // 设置多边形 Z 轴数值
    zIndex: {
      type: Number,
      default: 0
    }
  },
  mounted () {
    const { $parent } = this
    // 当地图准备好以后调用指定的回调函数
    $parent.mapReady(() => {
      this.drawPolygon()

      // 遍历 props 对象，观察其中的每个属性，当属性发生变化时，更新地图上的 polygon
      Object.keys(this.$props).forEach(key => {
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
        strokeWidth,
        strokeColor,
        dashArray,
        fillColor,
        zIndex
      } = this

      // 从父组件解析 _maps、_map 和 $trigger，下面要用
      const { _maps, _map } = this.$parent

      const path = points.map(item => {
        const { latitude, longitude } = item
        return new _maps.LatLng(latitude, longitude)
      })

      const { r: fcR, g: fcG, b: fcB, a: fcA } = hexToRgba(fillColor)
      const { r: scR, g: scG, b: scB, a: scA } = hexToRgba(strokeColor)

      const polygonOptions = {
        // 多边形是否可点击。
        clickable: true,

        // 鼠标在多边形内的光标样式。
        cursor: 'crosshair',

        // 多边形是否可编辑。
        editable: false,

        // 地图实例，即要显示多边形的地图
        // @ts-ignore
        map: _map,

        // 区域填充色
        fillColor: '',

        // 多边形的路径，以经纬度坐标数组构成。
        path,

        // 区域边框
        strokeColor: '',

        // 多边形的边框样式。实线是solid，虚线是dash。
        strokeDashStyle: dashArray.some((item) => item > 0) ? 'dash' : 'solid',

        // 多边形的边框线宽。
        strokeWeight: strokeWidth,

        // 多边形是否可见。
        visible: true,

        // 多边形的zIndex值。
        zIndex: zIndex
      }

      // 多边形的填充色、边框以及相应的透明度
      if (_maps.Color) {
        // 说明是 腾讯地图，google map 实例没有 Color 属性
        // 将类型转为两者共有的 string，避免 ts 报错
        polygonOptions.fillColor = new _maps.Color(fcR, fcG, fcB, fcA)
        polygonOptions.strokeColor = new _maps.Color(scR, scG, scB, scA)
      } else {
        // google map
        polygonOptions.fillColor = `rgb(${fcR}, ${fcG}, ${fcB})`
        polygonOptions.fillOpacity = fcA
        polygonOptions.strokeColor = `rgb(${scR}, ${scG}, ${scB})`
        polygonOptions.strokeOpacity = scA
      }

      if (this.polygonIns) {
        // 更新区域属性
        this.polygonIns.setOptions(polygonOptions)
        return
      }

      // 说明是新增区域
      this.polygonIns = new _maps.Polygon(polygonOptions)
    }
  },
  // 卸载时清除地图上绘制的 polygon
  beforeDestroy () {
    this.polygonIns.setMap(null)
    this.polygonIns = null
  },
  render () {
    return null
  }
}
