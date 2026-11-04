import { type Ref, type SetupContext, onMounted, ref } from 'vue'
import { UniElement, defineBuiltInComponent } from '@dcloudio/uni-components'
import MapMarker from './MapMarker'
import MapPolyline from './MapPolyline'
import MapCircle from './MapCircle'
import MapControl from './MapControl'
import MapLocation from './MapLocation'
import MapPolygon from './map-polygon/index'
import { mapEmits, mapProps, useMap } from './useMap'

export class UniMapElement extends UniElement {}
export default /*#__PURE__*/ defineBuiltInComponent({
  name: 'Map',
  props: mapProps,
  emits: mapEmits,
  //#if _X_ && !_NODE_JS_
  rootElement: {
    name: 'uni-map',
    class: UniMapElement,
  },
  //#endif
  setup(props, { emit, slots }) {
    const rootRef: Ref<HTMLElement | null> = ref(null)
    const { mapRef, trigger } = useMap(
      props,
      rootRef,
      emit as SetupContext['emit']
    )
    //#if _X_ && !_NODE_JS_
    onMounted(() => {
      const rootElement = rootRef.value as UniMapElement
      rootElement.attachVmProps(props)
    })
    //#endif
    return () => {
      return (
        <uni-map ref={rootRef} id={props.id}>
          <div
            ref={mapRef}
            style="width: 100%; height: 100%; position: relative; overflow: hidden"
          />
          {props.markers.map((item) => (
            <MapMarker key={item.id} {...item} />
          ))}
          {props.polyline.map((item) => (
            <MapPolyline {...item} />
          ))}
          {props.circles.map((item) => (
            <MapCircle {...item} />
          ))}
          {props.controls.map((item) => (
            <MapControl {...item} trigger={trigger} />
          ))}
          {props.showLocation && <MapLocation />}
          {props.polygons.map((item) => (
            <MapPolygon {...item} />
          ))}
          <div style="position: absolute;top: 0;width: 100%;height: 100%;overflow: hidden;pointer-events: none;">
            {slots.default && slots.default()}
          </div>
        </uni-map>
      )
    }
  },
})
