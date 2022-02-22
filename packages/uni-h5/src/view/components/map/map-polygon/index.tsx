import { inject, watch } from 'vue'
import { defineSystemComponent } from '@dcloudio/uni-components'
import props from './props'
import {
  OnMapReady,
  Polygon,
  Props,
  Point,
  CustomEventTrigger,
} from './interface'
import { Map, Maps } from '../maps'
import { PolygonOptions } from '../maps/qq/types'
import { eventObj, listenEvent } from './event'

let polygonIns: Polygon
export default defineSystemComponent({
  name: 'MapPolygon',
  props,
  // https://lbs.qq.com/javascript_v2/doc/polygon.html
  emits: Object.values(eventObj),
  // @ts-ignore
  setup(props: Props, { emit }) {
    // 当地图准备好以后调用指定的回调函数
    const onMapReady = inject<OnMapReady>('onMapReady') as OnMapReady

    onMapReady((map: Map, maps: Maps, trigger: CustomEventTrigger) => {
      // 绘制区域
      function drawPolygon() {
        const {
          points,
          editable,
          strokeWidth,
          strokeColor,
          fillColor,
          zIndex,
          level,
          visible,
        } = props

        const path = points.map((item: Point) => {
          const { latitude, longitude } = item
          return new maps.LatLng(latitude, longitude)
        })

        const polygonOptions: PolygonOptions = {
          //多边形是否可点击。
          clickable: true,

          //鼠标在多边形内的光标样式。
          cursor: 'crosshair',

          //多边形是否可编辑。
          editable,

          //多边形的填充色，可通过Color对象的alpha属性设置透明度。
          fillColor: fillColor || '#5f9ea0',

          // 地图实例，即要显示多边形的地图
          // @ts-ignore
          map,

          //多边形的路径，以经纬度坐标数组构成。
          path,

          //多边形的线条颜色，可通过Color对象的alpha属性设置透明度。
          strokeColor: strokeColor || '#000000',

          //多边形的边框样式。实线是solid，虚线是dash。
          strokeDashStyle: 'dash',

          //多边形的边框线宽。
          strokeWeight: strokeWidth || 5,

          //多边形是否可见。
          visible,

          //多边形的zIndex值。
          zIndex: zIndex || 1000,
        }

        if (polygonIns) {
          // 更新区域属性
          // @ts-ignore
          polygonIns.setOptions(polygonOptions)
          return
        }

        // 说明是新增区域
        // @ts-ignore
        polygonIns = new maps.Polygon(polygonOptions)

        // 监听事件，当对应事件发生时，将事件暴露给用户
        listenEvent(maps, polygonIns, trigger)
      }

      // 给地图添加区域
      drawPolygon()
      // 监听 props
      watch(() => props, drawPolygon)
    })
    return () => null
  },
})
