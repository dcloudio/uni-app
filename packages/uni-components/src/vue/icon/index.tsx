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
      const icon = path.value
      const size = rpx2px(props.size)
      return (
        <uni-icon ref={rootRef}>
          {icon?.f ? (
            <i
              class="uni-icon-font"
              style={{
                color: props.color || icon.c,
                fontSize: size + 'px',
              }}
            >
              {icon.f}
            </i>
          ) : icon?.d ? (
            createSvgIconVNode(icon.d, props.color || icon.c, size)
          ) : null}
        </uni-icon>
      )
    }
  },
})
