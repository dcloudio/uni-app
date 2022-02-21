/**
 * Map 组件的 props 属性
 */

import { PropType } from 'vue'
import { Props as MapPolylineProps } from '../MapPolyline'
import { Props as MapCircleProps } from '../MapCircle'
import { Props as MapControlProps } from '../MapControl'
import { Props as MapMarkerProps } from '../MapMarker'
import { Point } from '../../../../helpers/location'

// Map 组件的 props 配置
export default {
  id: {
    type: String,
    default: '',
  },
  latitude: {
    type: [String, Number],
    default: 0,
  },
  longitude: {
    type: [String, Number],
    default: 0,
  },
  scale: {
    type: [String, Number],
    default: 16,
  },
  markers: {
    type: Array as PropType<MapMarkerProps[]>,
    default() {
      return []
    },
  },
  includePoints: {
    type: Array as PropType<Point[]>,
    default() {
      return []
    },
  },
  polyline: {
    type: Array as PropType<MapPolylineProps[]>,
    default() {
      return []
    },
  },
  circles: {
    type: Array as PropType<MapCircleProps[]>,
    default() {
      return []
    },
  },
  controls: {
    type: Array as PropType<MapControlProps[]>,
    default() {
      return []
    },
  },
  showLocation: {
    type: [Boolean, String],
    default: false,
  },
  libraries: {
    type: Array as PropType<string[]>,
    default() {
      return []
    },
  },
}
