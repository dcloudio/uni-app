import { ResizeSensor, defineSystemComponent } from '@dcloudio/uni-components'
import { ref, watch } from 'vue'
import { usePageMeta } from '../../setup/provide'
import PageRefresh from './page-refresh/component.vue'
import { usePageRefresh } from './page-refresh'
import { getSafeAreaInsets } from '../../../helpers/safeArea'

// 功能开关保留为 JS 条件表达式，使项目发行时能裁剪关闭的分支及其组件依赖。
export default /*#__PURE__*/ defineSystemComponent({
  name: 'PageBody',
  setup() {
    const pageMeta = __UNI_FEATURE_PULL_DOWN_REFRESH__ ? usePageMeta() : null

    const refreshRef = ref(null)
    const wrapperRef = ref<HTMLElement | null>(null)

    const _pageRefresh =
      !__NODE_JS__ &&
      __UNI_FEATURE_PULL_DOWN_REFRESH__ &&
      pageMeta &&
      (pageMeta.enablePullDownRefresh || __X__)
        ? usePageRefresh(refreshRef)
        : null
    const pageRefresh = ref<typeof _pageRefresh>(null)
    watch(
      () => pageMeta?.enablePullDownRefresh,
      () => {
        pageRefresh.value = pageMeta?.enablePullDownRefresh
          ? _pageRefresh
          : null
      },
      {
        immediate: true,
      }
    )

    function resize() {
      if (!__X__ || __NODE_JS__) {
        return
      }
      const { top, left, right, bottom } = getSafeAreaInsets(wrapperRef.value!)
      const vars = {
        '--uni-safe-area-inset-top': `${top}px`,
        '--uni-safe-area-inset-left': `${left}px`,
        '--uni-safe-area-inset-right': `${right}px`,
        '--uni-safe-area-inset-bottom': `${bottom}px`,
      }
      for (const key in vars) {
        wrapperRef.value!.style.setProperty(key, vars[key])
      }
    }

    return () => (
      <>
        {__UNI_FEATURE_PULL_DOWN_REFRESH__ &&
          !!pageMeta &&
          (__X__ || !!pageMeta.enablePullDownRefresh) && (
            <PageRefresh ref={refreshRef}></PageRefresh>
          )}
        <uni-page-wrapper ref={wrapperRef} {...pageRefresh.value}>
          <uni-page-body>
            <slot />
          </uni-page-body>
          {__X__ && <ResizeSensor onResize={resize}></ResizeSensor>}
        </uni-page-wrapper>
      </>
    )
  },
})
