import { onMounted, ref } from 'vue'
import { defineBuiltInComponent } from '@dcloudio/uni-components'
import { UniElement } from '../../helpers/UniElement'

const props = {
  disableScroll: {
    type: [Boolean, String],
    default: false,
  },
}

export class UniCanvasElement extends UniElement {
  get width() {
    return this.querySelector('canvas')!.width
  }
  set width(value) {
    this.querySelector('canvas')!.width = value
  }

  get height() {
    return this.querySelector('canvas')!.height
  }
  set height(value) {
    this.querySelector('canvas')!.height = value
  }

  getContext(contextId, options): CanvasRenderingContext2D {
    return this.querySelector('canvas')!.getContext(
      contextId,
      options
    ) as CanvasRenderingContext2D
  }

  toBlob(...args: any[]) {
    const c = this.querySelector('canvas')!
    // TODO 缺少类型?
    // @ts-expect-error
    return c.toBlob.apply(c, args)
  }

  toDataURL(type, encoderOptions) {
    return this.querySelector('canvas')!.toDataURL(type, encoderOptions)
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
