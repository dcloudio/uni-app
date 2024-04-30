import { type Ref, ref, renderSlot, watch } from 'vue'

import { defineSystemComponent } from '@dcloudio/uni-components'

import { usePageMeta } from '../../setup/provide'

import PageRefresh from './page-refresh/component.vue'

import { usePageRefresh } from './page-refresh'

export default /*#__PURE__*/ defineSystemComponent({
  name: 'PageBody',
  setup(props, ctx) {
    const pageMeta = (__UNI_FEATURE_PULL_DOWN_REFRESH__ &&
      usePageMeta()) as UniApp.PageRouteMeta

    const refreshRef = (__UNI_FEATURE_PULL_DOWN_REFRESH__ &&
      ref(null)) as Ref<null>

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

    return () => {
      const pageRefreshTsx =
        __UNI_FEATURE_PULL_DOWN_REFRESH__ &&
        createPageRefreshTsx(refreshRef, pageMeta)
      return (
        <>
          {pageRefreshTsx}
          <uni-page-wrapper {...pageRefresh.value}>
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
