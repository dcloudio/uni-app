import { defineBuiltInComponent } from '../../helpers/component'
import { UniViewElement } from '../web-vapor-elements'
import ResizeSensor from '../resize-sensor/index'
import { movableViewProps } from '../../components/movable-view'
import { useMovableView } from './useMovableView'

// 只提供逻辑类型，根节点由模板创建，不构造或注册 Custom Element。
export class UniMovableViewElement extends UniViewElement {
  static [Symbol.hasInstance](value: unknown): boolean {
    return (
      (this === UniMovableViewElement &&
        value instanceof UniViewElement &&
        (value as Element).hasAttribute('uni-movable-view')) ||
      Function.prototype[Symbol.hasInstance].call(this, value)
    )
  }
}

const uniTagName = { value: 'MOVABLE-VIEW' }

export default /*#__PURE__*/ defineBuiltInComponent({
  name: 'MovableView',
  props: movableViewProps,
  emits: ['change', 'scale'],
  // TODO native 仅用于迁移期间跳过旧注册流程，Vapor 旧组件全部迁移后移除。
  rootElement: {
    name: 'uni-movable-view',
    class: UniMovableViewElement,
    native: true,
  },
  setup(props, { slots, emit }) {
    const { rootRef, setParent } = useMovableView(props, emit)

    const root = (
      <div uni-movable-view="" uni-view="" ref={rootRef}>
        {/* @ts-expect-error */}
        <ResizeSensor onResize={setParent}></ResizeSensor>
        {slots.default && slots.default()}
      </div>
    )
    // 在外部 ref 可见前设置一次类型标识，不包装原生属性 API。
    Object.defineProperty(root, 'uniTagName', uniTagName)
    return root
  },
})
