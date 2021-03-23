import {
  ref,
  Fragment,
  openBlock,
  renderSlot,
  createBlock,
  createVNode,
  defineComponent,
  createCommentVNode,
  Ref,
} from 'vue'

import { usePageMeta } from '../../plugin/provide'

import PageRefresh from './pageRefresh/index.vue'

import { usePageRefresh } from './pageRefresh'

export default defineComponent({
  name: 'PageBody',
  setup(props, ctx) {
    const pageMeta = __UNI_FEATURE_PULL_DOWN_REFRESH__
      ? usePageMeta()
      : undefined

    const refreshRef = __UNI_FEATURE_PULL_DOWN_REFRESH__ ? ref(null) : undefined
    const pageRefresh =
      __UNI_FEATURE_PULL_DOWN_REFRESH__ && pageMeta!.enablePullDownRefresh
        ? usePageRefresh(refreshRef!)
        : null

    return () => (
      openBlock(),
      createBlock(Fragment, null, [
        createPageRefreshVNode(refreshRef!, pageMeta!),
        createVNode('uni-page-wrapper', pageRefresh, [
          createVNode('uni-page-body', null, [
            renderSlot(ctx.slots, 'default'),
          ]),
        ]),
      ])
    )
  },
})

function createPageRefreshVNode(
  refreshRef: Ref,
  pageMeta: UniApp.PageRouteMeta
) {
  if (!__UNI_FEATURE_PULL_DOWN_REFRESH__) {
    return createCommentVNode('', true)
  }
  if (!pageMeta.enablePullDownRefresh) {
    return createCommentVNode('', true)
  }
  return createVNode(
    PageRefresh,
    { ref: refreshRef },
    null,
    512 /* NEED_PATCH */
  )
}
