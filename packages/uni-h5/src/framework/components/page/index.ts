import {
  withCtx,
  openBlock,
  renderSlot,
  createVNode,
  createBlock,
  SetupContext,
  defineComponent,
} from 'vue'

import PageHead from './pageHead'
import PageBody from './pageBody'
import { providePageMeta } from '../../setup/provide'

export default defineComponent({
  name: 'Page',
  setup(_props, ctx) {
    const { navigationBar } = providePageMeta(
      (history.state && history.state.__id__) || 1
    )
    return () =>
      createVNode(
        'uni-page',
        null,
        __UNI_FEATURE_NAVIGATIONBAR__ && navigationBar.style !== 'custom'
          ? [createVNode(PageHead), createPageBodyVNode(ctx)]
          : [createPageBodyVNode(ctx)]
      )
  },
})

function createPageBodyVNode(ctx: SetupContext) {
  return (
    openBlock(),
    createBlock(
      PageBody,
      { key: 0 },
      {
        default: withCtx(() => [renderSlot(ctx.slots, 'page')]),
        _: 3 /* FORWARDED */,
      }
    )
  )
}
