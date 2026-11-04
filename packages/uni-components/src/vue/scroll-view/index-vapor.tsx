import { defineBuiltInComponent } from '../../helpers/component'
import { UniScrollViewElement, initScrollViewElement } from './element-vapor'
import { emits, props, useScrollView } from './useScrollView-vapor'

export { UniScrollViewElement }

export default /*#__PURE__*/ defineBuiltInComponent({
  name: 'ScrollView',
  props,
  emits,
  rootElement: {
    name: 'uni-scroll-view',
    class: UniScrollViewElement,
  },
  setup(props, context) {
    const { rootRef, rootStyle, scrollBarClassName } = useScrollView(
      props,
      context
    )
    const { slots } = context
    const root = (
      <div
        uni-scroll-view=""
        uni-view=""
        ref={rootRef}
        style={rootStyle.value}
        class={scrollBarClassName.value}
      >
        {slots.default && slots.default()}
      </div>
    )
    //#if !_NODE_JS_
    initScrollViewElement(root)
    //#endif
    return root
  },
})
