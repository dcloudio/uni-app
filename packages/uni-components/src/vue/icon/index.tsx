import { onMounted, ref } from 'vue'
import { createSvgIconVNode, rpx2px } from '@dcloudio/uni-core'
import { defineBuiltInComponent } from '../../helpers/component'
import { UniElement } from '../../helpers/UniElement'
import { iconProps, useIcon } from './useIcon'

export class UniIconElement extends UniElement {}
export default /*#__PURE__*/ defineBuiltInComponent({
  name: 'Icon',
  props: iconProps,
  //#if _X_ && !_NODE_JS_
  rootElement: {
    name: 'uni-icon',
    class: UniIconElement,
  },
  //#endif
  setup(props) {
    const rootRef = ref<HTMLElement | null>(null)
    const path = useIcon(props)
    //#if _X_ && !_NODE_JS_
    onMounted(() => {
      const rootElement = rootRef.value as UniIconElement
      rootElement.attachVmProps(props)
    })
    //#endif
    return () => {
      return (
        <uni-icon ref={rootRef}>
          {path.value &&
            path.value.d &&
            createSvgIconVNode(
              path.value.d,
              props.color || path.value.c,
              rpx2px(props.size)
            )}
        </uni-icon>
      )
    }
  },
})
