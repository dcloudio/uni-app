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
import { getStateId } from '../../../helpers/dom'

export default defineComponent({
  name: 'Page',
  setup(_props, ctx) {
    const { navigationBar } = providePageMeta(getStateId())
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
