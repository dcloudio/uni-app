import { ResizeSensor } from '@dcloudio/uni-components'
import { ref, watch } from 'vue'
import PageRefresh from './page-refresh/component.vue'
import { usePageRefresh } from './page-refresh'
import { getSafeAreaInsets } from '../../../helpers/safeArea'

// 页面内部直接组合正文，避免仅为传递页面内容而创建组件和通用插槽。
// pageMeta 由 Page 显式传入：合并后不能再通过 inject 读取当前实例自己提供的值。
export default function usePageBody(
  meta: UniApp.PageRouteMeta,
  renderPage: () => JSX.Element
) {
  const pageMeta = __UNI_FEATURE_PULL_DOWN_REFRESH__ ? meta : null
  const refreshRef = ref(null)
  const wrapperRef = ref<HTMLElement | null>(null)

  const _pageRefresh =
    !__NODE_JS__ &&
    __UNI_FEATURE_PULL_DOWN_REFRESH__ &&
    pageMeta &&
    (pageMeta.enablePullDownRefresh || __X__)
      ? usePageRefresh(refreshRef, pageMeta)
      : null
  const pageRefresh = ref<typeof _pageRefresh>(null)
  watch(
    () => pageMeta?.enablePullDownRefresh,
    () => {
      pageRefresh.value = pageMeta?.enablePullDownRefresh ? _pageRefresh : null
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
        <uni-page-body>{renderPage()}</uni-page-body>
        {__X__ && <ResizeSensor onResize={resize}></ResizeSensor>}
      </uni-page-wrapper>
    </>
  )
}
