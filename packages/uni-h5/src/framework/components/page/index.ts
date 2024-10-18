import {
  type ComponentInternalInstance,
  Fragment,
  type Ref,
  type SetupContext,
  createBlock,
  createElementBlock,
  createVNode,
  getCurrentInstance,
  inject,
  openBlock,
  provide,
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
import { stringifyQuery } from '@dcloudio/uni-shared'
//#if _X_
import type { UniDialogPage } from '@dcloudio/uni-app-x/types/page'
import {
  DIALOG_TAG,
  SYSTEM_DIALOG_TAG,
  isDialogPageInstance,
  isNormalDialogPageInstance,
  isSystemDialogPageInstance,
} from '../../../x/framework/helpers/utils'
//#endif

export default /*#__PURE__*/ defineSystemComponent({
  name: 'Page',
  setup(_props, ctx) {
    const pageMeta = providePageMeta(getStateId())
    const navigationBar = pageMeta.navigationBar
    const pageStyle = {} as Record<string, any>
    useDocumentTitle(pageMeta)
    const currentInstance = getCurrentInstance()
    if (__X__) {
      currentInstance!.$dialogPages = ref<UniDialogPage[]>([])
      currentInstance!.$systemDialogPages = ref<UniDialogPage[]>([])
      useBackgroundColorContent(pageMeta)
      if (isDialogPageInstance(ctx as unknown as ComponentInternalInstance)) {
        navigationBar.style = 'custom'
        pageMeta.route = ctx.attrs.route as string
        const parentInstance = inject(
          'parentInstance'
        ) as ComponentInternalInstance
        if (currentInstance && parentInstance) {
          currentInstance.$parentInstance = parentInstance
          if (
            isNormalDialogPageInstance(
              ctx as unknown as ComponentInternalInstance
            )
          ) {
            const parentDialogPages = parentInstance.$dialogPages.value
            currentInstance.$dialogPage =
              parentDialogPages[parentDialogPages.length - 1]
          }
          if (
            isSystemDialogPageInstance(
              ctx as unknown as ComponentInternalInstance
            )
          ) {
            const parentSystemDialogPages =
              parentInstance.$systemDialogPages.value
            currentInstance.$dialogPage =
              parentSystemDialogPages[parentSystemDialogPages.length - 1]
          }
        }
      } else {
        provide('parentInstance', currentInstance)
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
                ? (createDialogPageVNode(
                    currentInstance!.$dialogPages,
                    DIALOG_TAG
                  ),
                  createDialogPageVNode(
                    currentInstance!.$systemDialogPages,
                    SYSTEM_DIALOG_TAG
                  ))
                : null,
            ]
          : [
              createPageBodyVNode(ctx),
              __X__
                ? (createDialogPageVNode(
                    currentInstance!.$dialogPages,
                    DIALOG_TAG
                  ),
                  createDialogPageVNode(
                    currentInstance!.$systemDialogPages,
                    SYSTEM_DIALOG_TAG
                  ))
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
  type: string
) {
  return (
    openBlock(true),
    createElementBlock(
      Fragment,
      null,
      renderList(dialogPages.value, (dialogPage) => {
        const fullUrl = `${dialogPage.route}${stringifyQuery(
          dialogPage.options
        )}`
        return (
          openBlock(),
          createBlock(
            createVNode(
              dialogPage.$component,
              {
                key: fullUrl,
                style: {
                  position: 'fixed',
                  'z-index': 999,
                  top: 0,
                  right: 0,
                  bottom: 0,
                  left: 0,
                },
                'data-type': type,
                route: fullUrl,
              },
              null
            )
          )
        )
      })
    )
  )
}
