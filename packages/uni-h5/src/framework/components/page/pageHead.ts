import {
  createBlock,
  //   createCommentVNode,
  //   createVNode,
  defineComponent,
  openBlock,
  //   renderSlot,
  //   SetupContext,
  //   withCtx,
} from 'vue'

import { usePageMeta } from '../../plugin/provide'

export default defineComponent({
  name: 'PageHead',
  setup() {
    const pageMeta = usePageMeta()
    UniServiceJSBridge.emit(
      'onNavigationBarChange',
      pageMeta.navigationBar.titleText
    )
    return () => (
      openBlock(),
      createBlock('uni-page-head', null, pageMeta.navigationBar.titleText)
    )
  },
})
