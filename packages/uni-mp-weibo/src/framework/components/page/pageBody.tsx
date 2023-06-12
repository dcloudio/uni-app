import { ref, renderSlot, Ref } from 'vue'

import { defineSystemComponent } from '@dcloudio/uni-components'

import { usePageMeta } from '../../setup/provide'

import PageRefresh from './page-refresh/component.vue'

import { usePageRefresh } from './page-refresh'

export default defineSystemComponent({
  name: 'PageBody',
  setup(props, ctx) {
    const pageMeta = (__UNI_FEATURE_PULL_DOWN_REFRESH__ &&
      usePageMeta()) as UniApp.PageRouteMeta

    const refreshRef = (__UNI_FEATURE_PULL_DOWN_REFRESH__ &&
      ref(null)) as Ref<null>

    const pageRefresh =
      !__NODE_JS__ &&
      __UNI_FEATURE_PULL_DOWN_REFRESH__ &&
      pageMeta.enablePullDownRefresh
        ? usePageRefresh(refreshRef)
        : null

    return () => {
      const pageRefreshTsx =
        __UNI_FEATURE_PULL_DOWN_REFRESH__ &&
        createPageRefreshTsx(refreshRef, pageMeta)
      return (
        <>
          {pageRefreshTsx}
          <uni-page-wrapper {...pageRefresh}>
            <uni-page-body>{renderSlot(ctx.slots, 'default')}</uni-page-body>
          </uni-page-wrapper>
        </>
      )
    }
  },
})

function createPageRefreshTsx(refreshRef: Ref, pageMeta: UniApp.PageRouteMeta) {
  if (!__UNI_FEATURE_PULL_DOWN_REFRESH__ || !pageMeta.enablePullDownRefresh) {
    return null
  }
  return <PageRefresh ref={refreshRef} />
}
