import { PropType } from 'vue'
import { Point } from './interface'

// MapPolygon 组件的 props 属性配置
export default {
  // 经纬度数组，[{latitude: 0, longitude: 0}]
  points: {
    type: Array as PropType<Point[]>,
    required: true,
    // validator: (points: Point[]) => {
    // 	points.forEach(item => {
    // 		const { longitude, latitude } = item
    // 		return latitude >= -90 && latitude <= 90 && longitude >= -180 && longitude <= 180
    // 	})
    // }
  },
  // 多边形是否可点击。
  clickable: {
    type: Boolean,
  },
  // 鼠标在多边形内的光标样式。
  cursor: {
    type: String,
  },
  // 区域是否可编辑
  editable: {
    type: Boolean,
    default: false,
  },
  // 多边形是否可见。
  visible: {
    type: Boolean,
    default: true,
  },
  // 描边的宽度
  strokeWidth: {
    type: Number,
  },
  // 描边的颜色，十六进制
  strokeColor: {
    type: String,
  },
  // 描边的透明度，[0-1]
  strokeColorAlpha: {
    type: Number,
    default: 1,
  },
  // 多边形的边框样式。实线是solid，虚线是dash。
  strokeDashStyle: {
    type: String,
  },
  // 填充颜色，十六进制
  fillColor: {
    type: String,
  },
  // 设置填充色的透明度，[0-1]
  fillColorAlpha: {
    type: Number,
    default: 1,
  },
  // 设置多边形 Z 轴数值
  zIndex: {
    type: Number,
  },
}
