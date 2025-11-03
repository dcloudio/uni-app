import { inject, onUnmounted, watch } from 'vue'
import { defineSystemComponent } from '@dcloudio/uni-components'
import props from './props'
import type {
  CustomEventTrigger,
  OnMapReady,
  Point,
  Polygon,
  PolygonOptions,
  Props,
} from './interface'
import type { GoogleMap, QQMap } from '../maps'
import { hexToRgba } from '../../../../helpers/hexToRgba'
import { getIsAMap, getIsBMap } from '../../../../helpers/location'
import type { QQMaps } from '../maps/qq/types'
import type { GoogleMaps } from '../maps/google/types'

export default /*#__PURE__*/ defineSystemComponent({
  name: 'MapPolygon',
  props,
  setup(props: Props) {
    // polygon 实例
    let polygonIns: Polygon
    // 当地图准备好以后调用指定的回调函数
    const onMapReady = inject<OnMapReady>('onMapReady') as OnMapReady

    onMapReady(
      (
        map: QQMap | GoogleMap,
        maps: QQMaps | GoogleMaps,
        trigger: CustomEventTrigger
      ) => {
        // 绘制区域
        function drawPolygon() {
          const {
            points,
            strokeWidth,
            strokeColor,
            dashArray,
            fillColor,
            zIndex,
          } = props

          const path = points.map((item: Point) => {
            const { latitude, longitude } = item
            if (getIsAMap()) {
              return [longitude, latitude]
            } else if (getIsBMap()) {
              // @ts-expect-error
              return new maps.Point(longitude, latitude)
            } else {
              return new (maps as QQMaps | GoogleMaps).LatLng(
                latitude,
                longitude
              )
            }
          })

          const { r: fcR, g: fcG, b: fcB, a: fcA } = hexToRgba(fillColor)
          const { r: scR, g: scG, b: scB, a: scA } = hexToRgba(strokeColor)

          const polygonOptions: PolygonOptions = {
            //多边形是否可点击。
            clickable: true,

            //鼠标在多边形内的光标样式。
            cursor: 'crosshair',

            //多边形是否可编辑。
            editable: false,

            // 地图实例，即要显示多边形的地图
            // @ts-expect-error
            map,

            // 区域填充色
            fillColor: '',

            //多边形的路径，以经纬度坐标数组构成。
            path,

            // 区域边框
            strokeColor: '',

            //多边形的边框样式。实线是solid，虚线是dash。
            strokeDashStyle: dashArray.some((item: number) => item > 0)
              ? 'dash'
              : 'solid',

            //多边形的边框线宽。
            strokeWeight: strokeWidth,

            //多边形是否可见。
            visible: true,

            //多边形的zIndex值。
            zIndex: zIndex,
          }

          // 多边形的填充色、边框以及相应的透明度
          if ((maps as QQMaps).Color) {
            // 说明是 腾讯地图，google map 实例没有 Color 属性
            // 将类型转为两者共有的 string，避免 ts 报错
            polygonOptions.fillColor = new (maps as QQMaps).Color(
              fcR,
              fcG,
              fcB,
              fcA
            ) as unknown as string
            polygonOptions.strokeColor = new (maps as QQMaps).Color(
              scR,
              scG,
              scB,
              scA
            ) as unknown as string
          } else {
            // google & 高德 map
            polygonOptions.fillColor = `rgb(${fcR}, ${fcG}, ${fcB})`
            polygonOptions.fillOpacity = fcA
            polygonOptions.strokeColor = `rgb(${scR}, ${scG}, ${scB})`
            polygonOptions.strokeOpacity = scA
          }

          if (polygonIns) {
            // 更新区域属性
            polygonIns.setOptions(polygonOptions)
            return
          }
          if (getIsBMap()) {
            // @ts-expect-error
            polygonIns = new maps.Polygon(polygonOptions.path, polygonOptions)
            // @ts-expect-error
            map.addOverlay(polygonIns)
          } else {
            // 说明是新增区域
            polygonIns = new maps.Polygon(polygonOptions)
          }
        }

        // 给地图添加区域
        drawPolygon()
        // 监听 props
        watch(props, drawPolygon)
      }
    )

    onUnmounted(() => {
      // 卸载时清除地图上绘制的 polygon
      polygonIns.setMap(null)
    })
    return () => null
  },
})
