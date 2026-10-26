import { type Ref, type SetupContext, ref } from 'vue'
import {
  UniViewElement,
  defineBuiltInComponent,
} from '@dcloudio/uni-components'
import MapMarker from './MapMarker'
import MapPolyline from './MapPolyline'
import MapCircle from './MapCircle'
import MapControl from './MapControl'
import MapLocation from './MapLocation'
import MapPolygon from './map-polygon/index'
import { mapEmits, mapProps, useMap } from './useMap'

// 只提供逻辑类型，根节点由模板创建，不构造或注册 Custom Element。
export class UniMapElement extends UniViewElement {
  static [Symbol.hasInstance](value: unknown): boolean {
    return (
      (this === UniMapElement &&
        value instanceof UniViewElement &&
        (value as Element).hasAttribute('uni-map')) ||
      Function.prototype[Symbol.hasInstance].call(this, value)
    )
  }
}

const uniTagName = { value: 'MAP' }

export default /*#__PURE__*/ defineBuiltInComponent({
  name: 'Map',
  props: mapProps,
  emits: mapEmits,
  // TODO native 仅用于迁移期间跳过旧注册流程，Vapor 旧组件全部迁移后移除。
  rootElement: { name: 'uni-map', class: UniMapElement, native: true },
  setup(props, { emit, slots }) {
    const rootRef: Ref<HTMLElement | null> = ref(null)
    const { mapRef, trigger } = useMap(
      props,
      rootRef,
      emit as SetupContext['emit']
    )
    const root = (
      <div uni-map="" uni-view="" ref={rootRef} id={props.id}>
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
      </div>
    )
    // 在 SDK 初始化和外部 ref 可见前标记类型，不包装原生 DOM API。
    Object.defineProperty(root, 'uniTagName', uniTagName)
    return root
  },
})
