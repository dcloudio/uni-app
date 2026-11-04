import { onMounted } from 'vue'
import { defineBuiltInComponent } from '../../helpers/component'
import { UniElement } from '../../helpers/UniElement'
import ResizeSensor from '../resize-sensor/index'
import { movableAreaProps } from '../../components/movableArea'
import { useMovableArea } from './useMovableArea'

export class UniMovableAreaElement extends UniElement {}
export default /*#__PURE__*/ defineBuiltInComponent({
  inheritAttrs: false,
  name: 'MovableArea',
  props: movableAreaProps,
  //#if _X_ && !_NODE_JS_
  rootElement: {
    name: 'uni-movable-area',
    class: UniMovableAreaElement,
  },
  //#endif
  setup(props, { slots }) {
    const {
      rootRef,
      renderChildren,
      movableAreaEvents,
      $attrs,
      $excludeAttrs,
      _listeners,
    } = useMovableArea(props, slots)

    //#if _X_ && !_NODE_JS_
    onMounted(() => {
      const rootElement = rootRef.value as UniMovableAreaElement
      rootElement.attachVmProps(props)
    })
    //#endif

    return () => {
      const movableViewItems = renderChildren()

      return (
        <uni-movable-area
          ref={rootRef}
          {...$attrs.value}
          {...$excludeAttrs.value}
          {..._listeners}
        >
          <ResizeSensor onResize={movableAreaEvents._resize}></ResizeSensor>
          {movableViewItems}
        </uni-movable-area>
      )
    }
  },
})
