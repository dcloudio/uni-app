import { defineBuiltInComponent } from '@dcloudio/uni-components'
import { UniElement } from '@dcloudio/uni-components'
import { useLoadingStyle } from './useLoadingStyle'
import { reactive, ref } from 'vue'

export class LoadingElement extends UniElement {}
export default defineBuiltInComponent({
  name: 'Loading',
  //#if _X_ && !_NODE_JS_
  rootElement: {
    name: 'uni-loading',
    class: LoadingElement,
  },
  //#endif
  setup() {
    const LoadingRef = ref<HTMLElement | null>(null)
    const loadingStyle = reactive(useLoadingStyle(LoadingRef))

    return () => (
      <view class="__uni_loading_container__" ref={LoadingRef}>
        <view
          class="__uni-loading__ __loading-4-3__"
          style={{
            boxSizing: 'border-box',
            width: loadingStyle.size,
            height: loadingStyle.size,
            borderWidth: loadingStyle.borderWidth,
          }}
        ></view>
      </view>
    )
  },
})
