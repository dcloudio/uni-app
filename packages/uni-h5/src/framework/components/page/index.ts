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
    let pageMeta = providePageMeta(getStateId())
    const navigationBar = pageMeta.navigationBar
    const pageStyle = {} as Record<string, any>
    useDocumentTitle(pageMeta)
    const currentInstance = getCurrentInstance()
    if (__X__) {
      currentInstance!.$dialogPages = ref<UniDialogPage[]>([])
      currentInstance!.$systemDialogPages = ref<UniDialogPage[]>([])
      if (isDialogPageInstance(ctx as unknown as ComponentInternalInstance)) {
        // pageMeta 是通过 route 取到的，需要更新为 dialogPage 的 meta
        pageMeta.route = ctx.attrs.route as string
        const routePageMeta = __uniRoutes.find(
          (route) => route.path === pageMeta.route.split('?')[0]
        )?.meta
        if (routePageMeta) {
          routePageMeta.navigationBar = Object.assign(
            navigationBar,
            routePageMeta.navigationBar
          )
          pageMeta = Object.assign(pageMeta, routePageMeta)
        }
        if (!routePageMeta?.backgroundColorContent) {
          pageMeta.backgroundColorContent = 'transparent'
        }
        if (!routePageMeta?.navigationBar.style) {
          pageMeta.navigationBar.style = 'custom'
        }
        const parentInstance = inject(
          'parentInstance'
        ) as ComponentInternalInstance
        if (currentInstance && parentInstance) {
          currentInstance.$parentInstance = parentInstance
          assignDialogPage(
            ctx as unknown as ComponentInternalInstance,
            parentInstance,
            currentInstance
          )
        }
      } else {
        useBackgroundColorContent(pageMeta)
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
                ? createDialogPageVNode(
                    currentInstance!.$dialogPages!,
                    currentInstance!.$systemDialogPages!
                  )
                : null,
            ]
          : [
              createPageBodyVNode(ctx),
              __X__
                ? createDialogPageVNode(
                    currentInstance!.$dialogPages!,
                    currentInstance!.$systemDialogPages!
                  )
                : null,
            ]
      )
  },
})

function assignDialogPage(
  ctx: ComponentInternalInstance,
  parentInstance: ComponentInternalInstance,
  currentInstance: ComponentInternalInstance
) {
  let parentDialogPages: UniDialogPage[] = []
  if (isNormalDialogPageInstance(ctx)) {
    parentDialogPages = parentInstance.$dialogPages!.value
  }
  if (isSystemDialogPageInstance(ctx)) {
    parentDialogPages = parentInstance.$systemDialogPages!.value
  }
  if (!parentDialogPages.length) return

  // 当同时打开多个 dialogPage 时，将父页面 dialogPages 最后一项赋值给 currentInstance.$dialogPage 会导致 $page 指向不符合预期
  for (let i = 0; i < parentDialogPages.length; i++) {
    const dialogPage = parentDialogPages[i]
    // @ts-expect-error
    if (!dialogPage.$assigned) {
      // @ts-expect-error
      dialogPage.$assigned = true
      currentInstance.$dialogPage = dialogPage
      break
    }
  }
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

function createDialogPageVNode(
  normalDialogPages: Ref<UniDialogPage[]>,
  systemDialogPages: Ref<UniDialogPage[]>
) {
  const dialogPages = [
    ...normalDialogPages.value.map((page) => ({ page, type: DIALOG_TAG })),
    ...systemDialogPages.value.map((page) => ({
      page,
      type: SYSTEM_DIALOG_TAG,
    })),
  ]
  return (
    openBlock(true),
    createElementBlock(
      Fragment,
      null,
      renderList(dialogPages, (dialogPage) => {
        const { type, page } = dialogPage
        const fullUrl = `${page.route}${stringifyQuery(page.options)}`
        return (
          openBlock(),
          createBlock(
            createVNode(
              page.$component,
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
