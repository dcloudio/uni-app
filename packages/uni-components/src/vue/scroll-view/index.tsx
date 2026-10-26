import { onMounted } from 'vue'
import { UniElement } from '../../helpers/UniElement'
import { defineBuiltInComponent } from '@dcloudio/uni-components'
import Refresher from '../refresher'
import { emits, props, useScrollView } from './useScrollView'

export class UniScrollViewElement extends UniElement {}
export default /*#__PURE__*/ defineBuiltInComponent({
  name: 'ScrollView',
  compatConfig: {
    MODE: 3,
  },
  props,
  emits,
  //#if _X_ && !_NODE_JS_
  rootElement: {
    name: 'uni-scroll-view',
    class: UniScrollViewElement,
  },
  //#endif
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
    //#if _X_ && !_NODE_JS_
    onMounted(() => {
      const rootElement = rootRef.value as UniScrollViewElement
      Object.defineProperties(rootElement, {
        scrollHeight: {
          get() {
            return main.value!.scrollHeight
          },
        },
        scrollWidth: {
          get() {
            return main.value!.scrollWidth
          },
        },
        scrollLeft: {
          get() {
            return main.value!.scrollLeft
          },
          set(val) {
            _scrollLeftChanged(val)
          },
        },
        scrollTop: {
          get() {
            return main.value!.scrollTop
          },
          set(val) {
            _scrollTopChanged(val)
          },
        },
        scrollTo: {
          get() {
            return main.value!.scrollTo.bind(main.value!)
          },
        },
        scrollBy: {
          get() {
            return main.value!.scrollBy.bind(main.value!)
          },
        },
      })
      rootElement.attachVmProps(props)
    })
    //#endif

    return () => {
      const {
        refresherEnabled,
        refresherBackground,
        refresherDefaultStyle,
        refresherThreshold,
      } = props
      const { refresherHeight, refreshState } = state

      return (
        <uni-scroll-view ref={rootRef}>
          <div ref={wrap} class="uni-scroll-view">
            <div
              ref={main}
              style={mainStyle.value}
              class={scrollBarClassName.value}
            >
              {refresherEnabled ? (
                <Refresher
                  refreshState={refreshState}
                  refresherHeight={refresherHeight}
                  refresherThreshold={refresherThreshold}
                  refresherDefaultStyle={refresherDefaultStyle}
                  refresherBackground={refresherBackground}
                >
                  {refresherDefaultStyle == 'none'
                    ? slots.refresher && slots.refresher()
                    : null}
                </Refresher>
              ) : null}
              <div ref={content} class="uni-scroll-view-content">
                {slots.default && slots.default()}
              </div>
            </div>
          </div>
        </uni-scroll-view>
      )
    }
  },
})
