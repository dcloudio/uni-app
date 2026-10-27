import { defineBuiltInComponent } from '../../helpers/component'
import { UniViewElement } from '../web-vapor-elements'
import ResizeSensor from '../resize-sensor/index-vapor'
import { movableAreaProps } from '../../components/movableArea'
import { useMovableArea } from './useMovableArea'

// 只提供逻辑类型，根节点由模板创建，不构造或注册 Custom Element。
export class UniMovableAreaElement extends UniViewElement {
  static [Symbol.hasInstance](value: unknown): boolean {
    return (
      (this === UniMovableAreaElement &&
        value instanceof UniViewElement &&
        (value as Element).hasAttribute('uni-movable-area')) ||
      Function.prototype[Symbol.hasInstance].call(this, value)
    )
  }
}

const uniTagName = { value: 'MOVABLE-AREA' }

export default /*#__PURE__*/ defineBuiltInComponent({
  inheritAttrs: false,
  name: 'MovableArea',
  props: movableAreaProps,
  rootElement: {
    name: 'uni-movable-area',
    class: UniMovableAreaElement,
  },
  setup(props, { slots }) {
    const {
      rootRef,
      renderChildren,
      movableAreaEvents,
      $attrs,
      $excludeAttrs,
      _listeners,
    } = useMovableArea(props, slots)

    const movableViewItems = renderChildren()
    const root = (
      <div
        uni-movable-area=""
        uni-view=""
        ref={rootRef}
        {...$attrs.value}
        {...$excludeAttrs.value}
        {..._listeners}
      >
        <ResizeSensor onResize={movableAreaEvents._resize}></ResizeSensor>
        {movableViewItems}
      </div>
    )
    // 在外部 ref 可见前设置一次类型标识，不包装原生属性 API。
    Object.defineProperty(root, 'uniTagName', uniTagName)
    return root
  },
})
