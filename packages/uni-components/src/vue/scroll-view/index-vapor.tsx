import { defineBuiltInComponent } from '../../helpers/component'
import Refresher from '../refresher'
import { UniScrollViewElement, initScrollViewElement } from './element-vapor'
import { emits, props, useScrollView } from './useScrollView'

export { UniScrollViewElement }

export default /*#__PURE__*/ defineBuiltInComponent({
  name: 'ScrollView',
  props,
  emits,
  // TODO native 仅用于迁移期间跳过旧注册流程，Vapor 旧组件全部迁移后移除。
  rootElement: {
    name: 'uni-scroll-view',
    class: UniScrollViewElement,
    native: true,
  },
  setup(props, context) {
    const {
      rootRef,
      main,
      wrap,
      content,
      state,
      mainStyle,
      scrollBarClassName,
      _scrollLeftChanged,
      _scrollTopChanged,
    } = useScrollView(props, context)
    const { slots } = context
    const root = (
      <div uni-scroll-view="" uni-view="" ref={rootRef}>
        <div ref={wrap} class="uni-scroll-view">
          <div
            ref={main}
            style={mainStyle.value}
            class={scrollBarClassName.value}
          >
            {props.refresherEnabled ? (
              <Refresher
                refreshState={state.refreshState}
                refresherHeight={state.refresherHeight}
                refresherThreshold={props.refresherThreshold}
                refresherDefaultStyle={props.refresherDefaultStyle}
                refresherBackground={props.refresherBackground}
              >
                {props.refresherDefaultStyle == 'none'
                  ? slots.refresher && slots.refresher()
                  : null}
              </Refresher>
            ) : null}
            <div ref={content} class="uni-scroll-view-content">
              {slots.default && slots.default()}
            </div>
          </div>
        </div>
      </div>
    )
    //#if !_NODE_JS_
    // 内部滚动容器不会切换，在外部 ref 可见前绑定一次，不在滚动路径查询 DOM。
    initScrollViewElement(root, _scrollLeftChanged, _scrollTopChanged)
    //#endif
    return root
  },
})
