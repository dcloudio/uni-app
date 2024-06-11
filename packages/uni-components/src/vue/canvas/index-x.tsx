import { type Ref, onMounted, ref } from 'vue'
import { defineBuiltInComponent } from '@dcloudio/uni-components'
import { UniElement } from '../../helpers/UniElement'

const props = {
  disableScroll: {
    type: [Boolean, String],
    default: false,
  },
  hidpi: {
    type: Boolean,
    default: true,
  },
}

export class UniCanvasElement extends UniElement {
  getContext(contextId, options): CanvasRenderingContext2D {
    return this.querySelector('canvas')!.getContext(
      contextId,
      options
    ) as CanvasRenderingContext2D
  }
}

export default /*#__PURE__*/ defineBuiltInComponent({
  inheritAttrs: true,
  name: 'Canvas',
  compatConfig: {
    MODE: 3,
  },
  props,
  rootElement: {
    name: 'uni-canvas',
    class: UniCanvasElement,
  },
  setup(props, {}) {
    const rootRef = ref<HTMLElement | null>(null)
    const canvas = ref<HTMLCanvasElement | null>(null)

    onMounted(() => {
      const rootElement = rootRef.value as UniCanvasElement
      rootElement.attachVmProps(props)

      if (props.hidpi) {
        useHidpi(canvas)
      }
    })

    return () => {
      return (
        <uni-canvas ref={rootRef}>
          <canvas ref={canvas} class="uni-canvas-canvas" />
        </uni-canvas>
      )
    }
  },
})

function useHidpi(canvasRef: Ref<HTMLCanvasElement | null>) {
  const devicePixelRatio = window.devicePixelRatio || 1
  canvasRef.value!.width = canvasRef.value!.offsetWidth * devicePixelRatio
  canvasRef.value!.height = canvasRef.value!.offsetHeight * devicePixelRatio

  if (devicePixelRatio == 1) {
    return
  }

  const context = canvasRef.value!.getContext('2d')!
  context.scale(devicePixelRatio, devicePixelRatio)

  // 调用后 reset 方法高清逻辑将失效，需要再次 scale
  const hookResetFunction = context.reset
  context.reset = function (...args) {
    hookResetFunction.apply(context, args)
    context.scale(devicePixelRatio, devicePixelRatio)
  }
}
