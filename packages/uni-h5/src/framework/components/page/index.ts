import {
  withCtx,
  openBlock,
  renderSlot,
  createBlock,
  createVNode,
  SetupContext,
  defineComponent,
} from 'vue'

import PageHead from './pageHead'
import PageBody from './pageBody'
import { providePageMeta } from '../../plugin/provide'

export default defineComponent({
  name: 'Page',
  setup(props, ctx) {
    providePageMeta()
    return () => (
      openBlock(),
      createBlock('uni-page', null, [
        createPageHeadVNode(),
        createPageBodyVNode(ctx),
      ])
    )
  },
})

function createPageHeadVNode() {
  return createVNode(PageHead)
}

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
