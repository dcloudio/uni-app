import { defineBuiltInComponent } from '../../helpers/component'
import { UniCanvasElement, initCanvasElement } from './element-vapor'
import { canvasProps } from './props-x'

export { UniCanvasElement }

export default /*#__PURE__*/ defineBuiltInComponent({
  name: 'Canvas',
  props: canvasProps,
  rootElement: { name: 'uni-canvas', class: UniCanvasElement },
  setup() {
    // 原生 canvas 直接作为根，不借用 View 身份；公共能力和样式由 uni-canvas 标识接入。
    const root = <canvas uni-canvas="" class="uni-canvas-canvas" />
    //#if !_NODE_JS_
    // 在外部 ref 可见前绑定根节点的绘图方法；服务端没有原生绘图能力，不做此绑定。
    initCanvasElement(root)
    //#endif
    return root
  },
})
