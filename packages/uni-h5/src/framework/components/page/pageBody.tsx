import { type Ref, onMounted, onUnmounted, ref, renderSlot, watch } from 'vue'

import { defineSystemComponent } from '@dcloudio/uni-components'

import { usePageMeta } from '../../setup/provide'

import PageRefresh from './page-refresh/component.vue'

import { usePageRefresh } from './page-refresh'
import { getSafeAreaInsets } from '../../../helpers/safeArea'

export default /*#__PURE__*/ defineSystemComponent({
  name: 'PageBody',
  setup(props, ctx) {
    const pageMeta = (__UNI_FEATURE_PULL_DOWN_REFRESH__ &&
      usePageMeta()) as UniApp.PageRouteMeta

    const refreshRef = (__UNI_FEATURE_PULL_DOWN_REFRESH__ &&
      ref(null)) as Ref<null>

    const wrapperRef = ref<HTMLElement | null>(null)

    const _pageRefresh =
      !__NODE_JS__ &&
      __UNI_FEATURE_PULL_DOWN_REFRESH__ &&
      (pageMeta.enablePullDownRefresh || __X__)
        ? usePageRefresh(refreshRef)
        : null
    const pageRefresh: Ref<typeof _pageRefresh> = ref(null)
    watch(
      () => {
        return pageMeta.enablePullDownRefresh
      },
      () => {
        pageRefresh.value = pageMeta.enablePullDownRefresh ? _pageRefresh : null
      },
      {
        immediate: true,
      }
    )

    if (__X__ && !__NODE_JS__) {
      // TODO 兼容低版本浏览器
      let observer: ResizeObserver | null = null

      onMounted(() => {
        if (typeof ResizeObserver === 'undefined') {
          return
        }
        observer = new ResizeObserver((entries) => {
          const { top, left, right, bottom } = getSafeAreaInsets(
            wrapperRef.value!
          )
          // TODO dialogPage
          const vars = {
            '--uni-safe-area-inset-top': `${top}px`,
            '--uni-safe-area-inset-left': `${left}px`,
            '--uni-safe-area-inset-right': `${right}px`,
            '--uni-safe-area-inset-bottom': `${bottom}px`,
          }
          for (const key in vars) {
            wrapperRef.value!.style.setProperty(key, vars[key])
          }
        })
        observer.observe(document.querySelector('uni-page-wrapper')!)
      })

      onUnmounted(() => {
        if (!observer) {
          return
        }
        observer.disconnect()
      })
    }

    return () => {
      const pageRefreshTsx =
        __UNI_FEATURE_PULL_DOWN_REFRESH__ &&
        createPageRefreshTsx(refreshRef, pageMeta)
      return (
        <>
          {pageRefreshTsx}
          <uni-page-wrapper ref={wrapperRef} {...pageRefresh.value}>
            <uni-page-body>{renderSlot(ctx.slots, 'default')}</uni-page-body>
          </uni-page-wrapper>
        </>
      )
    }
  },
})

function createPageRefreshTsx(refreshRef: Ref, pageMeta: UniApp.PageRouteMeta) {
  if (
    !__X__ &&
    (!__UNI_FEATURE_PULL_DOWN_REFRESH__ || !pageMeta.enablePullDownRefresh)
  ) {
    return null
  }
  return <PageRefresh ref={refreshRef} />
}
