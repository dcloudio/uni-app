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
  // 区域是否可编辑
  editable: {
    type: Boolean,
    default: false,
  },
  //多边形是否可见。
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
  // 填充颜色，十六进制
  fillColor: {
    type: String,
  },
  // 设置多边形 Z 轴数值
  zIndex: {
    type: Number,
  },
  // 压盖关系，默认为 abovelabels
  level: {
    type: String,
  },
}
