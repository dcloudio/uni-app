import {
  type ComponentInternalInstance,
  type ComponentPublicInstance,
  onBeforeUnmount,
  onMounted,
  ref,
} from 'vue'
import { OPEN_DIALOG_PAGE } from '../../constants'
import { SYSTEM_DIALOG_PAGE_PATH_STARTER } from '@dcloudio/uni-core'
import { addCurrentPageWithInitScope } from '../../../service/framework/page/setup'
import { getPage$BasePage } from '../../../service/framework/page/getCurrentPages'
import {
  getCurrentNormalDialogPage,
  getCurrentSystemDialogPage,
  setCurrentNormalDialogPage,
  setCurrentSystemDialogPage,
} from './dialogPage'
import type { UniDialogPage } from '@dcloudio/uni-app-x/types/native/UniPage'

export function setupXPage(
  instance: ComponentInternalInstance,
  pageInstance: Page.PageInstance['$page'],
  pageVm: ComponentPublicInstance,
  pageId: number,
  pagePath: string
) {
  instance.$dialogPages = ref<UniDialogPage[]>([])
  let uniPage: UniPage
  if (
    (pageInstance as Page.PageInstance['$page']).openType === OPEN_DIALOG_PAGE
  ) {
    if ((pagePath as string).startsWith(SYSTEM_DIALOG_PAGE_PATH_STARTER)) {
      uniPage = getCurrentSystemDialogPage()!
      setCurrentSystemDialogPage(null)
    } else {
      uniPage = getCurrentNormalDialogPage()!
      setCurrentNormalDialogPage(null)
    }
  } else {
    uniPage = new UniNormalPageImpl()
  }
  pageVm.$basePage = pageVm.$page as Page.PageInstance['$page']
  pageVm.$page = uniPage
  uniPage.route = pageVm.$basePage.route
  // @ts-expect-error
  uniPage.optionsByJS = pageVm.$basePage.options
  Object.defineProperty(uniPage, 'options', {
    get: function () {
      return new UTSJSONObject(pageVm.$basePage.options)
    },
  })
  uniPage.getElementById = (
    id: string.IDString | string
  ): UniElement | null => {
    const containerNode = pageVm.$el?.parentElement
    if (containerNode == null) {
      console.warn('bodyNode is null')
      return null
    }
    return containerNode.querySelector(`#${id}`)
  }
  uniPage.vm = pageVm
  uniPage.$vm = pageVm

  if (getPage$BasePage(pageVm).openType !== OPEN_DIALOG_PAGE) {
    addCurrentPageWithInitScope(
      pageId,
      pageVm,
      pageInstance as Page.PageInstance['$page']
    )
  }

  onMounted(() => {
    const rootElement = pageVm.$el?.parentElement
    if (rootElement) {
      rootElement._page = pageVm.$page
    }
  })
  onBeforeUnmount(() => {
    const rootElement = pageVm.$el?.parentElement
    if (rootElement) {
      rootElement._page = null
    }
  })
}
