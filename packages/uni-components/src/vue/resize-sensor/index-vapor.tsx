//#if !_NODE_JS_
// @ts-expect-error 当前 Vue 类型尚未升级到 3.6，Vapor runtime 已导出该方法
import { on } from 'vue'
//#endif
import { defineBuiltInComponent } from '../../helpers/component'
import { resizeSensorProps, useResizeSensor } from './useResizeSensor'

export default /*#__PURE__*/ defineBuiltInComponent({
  name: 'ResizeSensor',
  props: resizeSensorProps,
  emits: ['resize'],
  setup(props, { emit }) {
    const { rootRef, update } = useResizeSensor(props, emit)
    const root = (
      <div uni-resize-sensor="" ref={rootRef}>
        <div onScroll={update}>
          <div />
        </div>
        <div onScroll={update}>
          <div />
        </div>
      </div>
    )
    //#if !_NODE_JS_
    // JSX 对原生节点的事件名未拆分 Once 后缀，显式注册以保留一次触发行为。
    on(root, 'animationstart', update, { once: true })
    //#endif
    return root
  },
})
