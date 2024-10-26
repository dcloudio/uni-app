import { extend } from '@vue/shared'
import {
  type VNodeTypes,
  createBlock,
  createVNode,
  openBlock,
  withCtx,
} from 'vue'
import PageComponent from '../../framework/components/page/index'

export function renderPage(component: VNodeTypes, props: unknown) {
  return (
    openBlock(),
    createBlock(PageComponent, null, {
      page: withCtx(() => [
        createVNode(
          component,
          extend({}, props, { ref: 'page' }),
          null,
          512 /* NEED_PATCH */
        ),
      ]),
      _: 1 /* STABLE */,
    })
  )
}
