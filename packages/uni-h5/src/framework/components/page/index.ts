import {
  Fragment,
  type Ref,
  type SetupContext,
  Suspense,
  createBlock,
  createElementBlock,
  createVNode,
  getCurrentInstance,
  openBlock,
  ref,
  renderList,
  renderSlot,
  withCtx,
} from 'vue'
import { defineSystemComponent } from '@dcloudio/uni-components'
import { useDocumentTitle } from '../../../helpers/useDocumentTitle'
import { useBackgroundColorContent } from '../../../helpers/useBackgroundColorContent'

import PageHead from './pageHead'
import PageBody from './pageBody'
import { providePageMeta } from '../../setup/provide'
import { getStateId } from '../../../helpers/dom'
import type { UniDialogPage } from '../../setup/page'

export default /*#__PURE__*/ defineSystemComponent({
  name: 'Page',
  setup(_props, ctx) {
    const pageMeta = providePageMeta(getStateId())
    const navigationBar = pageMeta.navigationBar
    const pageStyle = {} as Record<string, any>
    useDocumentTitle(pageMeta)
    const currentInstance = getCurrentInstance()
    const currentDialogPage = ref(null)
    let handleResolve = () => {}
    if (__X__) {
      useBackgroundColorContent(pageMeta)
      if (ctx.attrs.type === 'dialog') {
        navigationBar.style = 'custom'
        pageMeta.route = ctx.attrs.route as string
      }
      currentInstance!.$dialogPages = ref<UniDialogPage[]>([])
      handleResolve = () => {
        setTimeout(() => {
          const dialogPages = currentInstance!.$dialogPages.value
          const lastDialogPage = dialogPages[dialogPages.length - 1]
          lastDialogPage.$vm = currentDialogPage.value
          lastDialogPage.$vm.$.$dialogPageInstance = lastDialogPage
        }, 0)
      }
    }
    return () =>
      createVNode(
        'uni-page',
        {
          'data-page': pageMeta.route,
          style: pageStyle,
        },
        __UNI_FEATURE_NAVIGATIONBAR__ && navigationBar.style !== 'custom'
          ? [
              createVNode(PageHead),
              createPageBodyVNode(ctx),
              __X__
                ? createDialogPageVNode(
                    currentInstance!.$dialogPages,
                    currentDialogPage,
                    handleResolve
                  )
                : null,
            ]
          : [
              createPageBodyVNode(ctx),
              __X__
                ? createDialogPageVNode(
                    currentInstance!.$dialogPages,
                    currentDialogPage,
                    handleResolve
                  )
                : null,
            ]
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

function createDialogPageVNode(
  dialogPages: Ref<UniDialogPage[]>,
  currentDialogPage: Ref<null>,
  onResolve: () => void
) {
  return (
    openBlock(true),
    createElementBlock(
      Fragment,
      null,
      renderList(dialogPages.value, (dialogPage) => {
        return (
          openBlock(),
          createBlock(
            Suspense,
            { onResolve },
            {
              default: withCtx(() => [
                createVNode(
                  dialogPage.component,
                  {
                    style: {
                      position: 'fixed',
                      'z-index': 999,
                      top: 0,
                      right: 0,
                      bottom: 0,
                      left: 0,
                    },
                    ref: currentDialogPage,
                    type: 'dialog',
                    route: dialogPage.route,
                  },
                  null
                ),
              ]),
            }
          )
        )
      })
    )
  )
}
