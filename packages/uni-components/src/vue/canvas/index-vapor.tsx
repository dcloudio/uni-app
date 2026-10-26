import { defineBuiltInComponent } from '../../helpers/component'
import { UniCanvasElement, initCanvasElement } from './element-vapor'
import { canvasProps } from './props-x'

export { UniCanvasElement }

export default /*#__PURE__*/ defineBuiltInComponent({
  name: 'Canvas',
  props: canvasProps,
  // TODO native 仅用于迁移期间跳过旧注册流程，Vapor 旧组件全部迁移后移除。
  rootElement: { name: 'uni-canvas', class: UniCanvasElement, native: true },
  setup() {
    const root = (
      <div uni-canvas="" uni-view="">
        <canvas class="uni-canvas-canvas" />
      </div>
    )
    //#if !_NODE_JS_
    // 在外部 ref 可见前绑定内部 canvas；服务端没有原生绘图能力，不做此绑定。
    initCanvasElement(root)
    //#endif
    return root
  },
})
