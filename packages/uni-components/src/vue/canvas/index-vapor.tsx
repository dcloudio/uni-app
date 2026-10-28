import { defineBuiltInComponent } from '../../helpers/component'
import { UniCanvasElement, initCanvasElement } from './element-vapor'
import { canvasProps } from './props-x'

export { UniCanvasElement }

export default /*#__PURE__*/ defineBuiltInComponent({
  name: 'Canvas',
  props: canvasProps,
  rootElement: { name: 'uni-canvas', class: UniCanvasElement },
  setup() {
    const root = <canvas uni-canvas="" uni-view="" class="uni-canvas-canvas" />
    //#if !_NODE_JS_
    // 在外部 ref 可见前绑定内部 canvas；服务端没有原生绘图能力，不做此绑定。
    initCanvasElement(root)
    //#endif
    return root
  },
})
