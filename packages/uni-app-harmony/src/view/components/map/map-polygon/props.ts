import type { PropType } from 'vue'
import type { Point } from './interface'

// MapPolygon 组件的 props 属性配置
export default {
  // 边框虚线，腾讯地图支持，google 高德 地图不支持，默认值为[0, 0] 为实线，非 [0, 0] 为虚线，H5 端无法像微信小程序一样控制虚线的间隔像素大小
  dashArray: {
    type: Array as PropType<number[]>,
    default: () => [0, 0],
  },
  // 经纬度数组，[{latitude: 0, longitude: 0}]
  points: {
    type: Array as PropType<Point[]>,
    required: true,
  },
  // 描边的宽度
  strokeWidth: {
    type: Number,
    default: 1,
  },
  // 描边的颜色，十六进制
  strokeColor: {
    type: String,
    default: '#000000',
  },
  // 填充颜色，十六进制
  fillColor: {
    type: String,
    default: '#00000000',
  },
  // 设置多边形 Z 轴数值
  zIndex: {
    type: Number,
    default: 0,
  },
}
