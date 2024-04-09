import {
  type SetupContext,
  createBlock,
  createVNode,
  openBlock,
  renderSlot,
  withCtx,
} from 'vue'
import { defineSystemComponent } from '@dcloudio/uni-components'
import { useDocumentTitle } from '../../../helpers/useDocumentTitle'

import PageHead from './pageHead'
import PageBody from './pageBody'
import { providePageMeta } from '../../setup/provide'
import { getStateId } from '../../../helpers/dom'

export default defineSystemComponent({
  name: 'Page',
  setup(_props, ctx) {
    const pageMeta = providePageMeta(getStateId())
    const navigationBar = pageMeta.navigationBar
    const pageStyle = {} as Record<string, any>
    if (__X__ && pageMeta.backgroundColorContent) {
      pageStyle.backgroundColor = pageMeta.backgroundColorContent
    }
    useDocumentTitle(pageMeta)
    return () =>
      createVNode(
        'uni-page',
        {
          'data-page': pageMeta.route,
          style: pageStyle,
        },
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
