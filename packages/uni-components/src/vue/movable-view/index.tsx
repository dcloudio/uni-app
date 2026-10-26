import { onMounted } from 'vue'
import { defineBuiltInComponent } from '../../helpers/component'
import { UniElement } from '../../helpers/UniElement'
import ResizeSensor from '../resize-sensor/index'
import { movableViewProps } from '../../components/movable-view'
import { useMovableView } from './useMovableView'

export class UniMovableViewElement extends UniElement {}
export default /*#__PURE__*/ defineBuiltInComponent({
  name: 'MovableView',
  props: movableViewProps,
  emits: ['change', 'scale'],
  //#if _X_ && !_NODE_JS_
  rootElement: {
    name: 'uni-movable-view',
    class: UniMovableViewElement,
  },
  //#endif
  setup(props, { slots, emit }) {
    const { rootRef, setParent } = useMovableView(props, emit)
    //#if _X_ && !_NODE_JS_
    onMounted(() => {
      const rootElement = rootRef.value as UniMovableViewElement
      rootElement.attachVmProps(props)
    })
    //#endif

    return () => {
      return (
        <uni-movable-view ref={rootRef}>
          {/* @ts-expect-error */}
          <ResizeSensor onResize={setParent}></ResizeSensor>
          {slots.default && slots.default()}
        </uni-movable-view>
      )
    }
  },
})
