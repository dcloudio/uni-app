import {
  type ComponentInternalInstance,
  type ComponentPublicInstance,
  onBeforeUnmount,
  onMounted,
} from 'vue'
import { OPEN_DIALOG_PAGE } from '../../constants'
import { getCurrentPage } from '@dcloudio/uni-core'
import { SYSTEM_DIALOG_PAGE_PATH_STARTER } from '@dcloudio/uni-shared'
import { addCurrentPageWithInitScope } from '../../../service/framework/page/setup'
import { getPage$BasePage } from '../../../service/framework/page/getCurrentPages'

export function setupXPage(
  instance: ComponentInternalInstance,
  pageInstance: Page.PageInstance['$page'],
  pageVm: ComponentPublicInstance,
  pageId: number,
  pagePath: string
) {
  instance.$dialogPages = []
  let uniPage: UniPage
  if (
    (pageInstance as Page.PageInstance['$page']).openType === OPEN_DIALOG_PAGE
  ) {
    const currentPage = getCurrentPage() as unknown as UniPage
    if ((pagePath as string).startsWith(SYSTEM_DIALOG_PAGE_PATH_STARTER)) {
      const systemDialogPages = currentPage.vm.$systemDialogPages
      uniPage = systemDialogPages[systemDialogPages.length - 1]
    } else {
      uniPage = new UniDialogPageImpl()
    }
    uniPage.getElementById = (
      id: string.IDString | string
    ): UniElement | null => {
      const currentPage = getCurrentPage() as unknown as UniPage
      if (currentPage !== uniPage.getParentPage()) {
        return null
      }
      const containerNode = pageVm.$el?._parent
      if (containerNode == null) {
        console.warn('bodyNode is null')
        return null
      }
      return containerNode.querySelector(`#${id}`)
    }
  } else {
    uniPage = new UniNormalPageImpl()
    uniPage.getElementById = (
      id: string.IDString | string
    ): UniElement | null => {
      const currentPage = getCurrentPage() as unknown as UniPage
      if (currentPage !== uniPage) {
        return null
      }
      const bodyNode = pageVm.$el?.parentNode
      if (bodyNode == null) {
        console.warn('bodyNode is null')
        return null
      }
      return bodyNode.querySelector(`#${id}`)
    }
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
  uniPage.vm = pageVm
  uniPage.$vm = pageVm
  uniPage.getParentPage = () => {
    // @ts-expect-error
    const parentPage = uniPage.getParentPageByJS()
    return parentPage || null
  }

  uniPage.getPageStyle = (): UTSJSONObject => {
    // @ts-expect-error
    const pageStyle = uniPage.getPageStyleByJS()
    return new UTSJSONObject(pageStyle)
  }
  uniPage.$getPageStyle = (): UTSJSONObject => {
    return uniPage.getPageStyle()
  }

  uniPage.setPageStyle = (styles: UTSJSONObject) => {
    // @ts-expect-error
    uniPage.setPageStyleByJS(styles)
  }
  uniPage.$setPageStyle = (styles: UTSJSONObject) => {
    uniPage.setPageStyle(styles)
  }

  uniPage.getAndroidView = () => null
  uniPage.getIOSView = () => null
  uniPage.getHTMLElement = () => null

  if (getPage$BasePage(pageVm).openType !== OPEN_DIALOG_PAGE) {
    addCurrentPageWithInitScope(
      pageId,
      pageVm,
      pageInstance as Page.PageInstance['$page']
    )
  }

  onMounted(() => {
    const rootElement = pageVm.$el?._parent
    if (rootElement) {
      rootElement._page = pageVm.$page
    }
  })
  onBeforeUnmount(() => {
    const rootElement = pageVm.$el?._parent
    if (rootElement) {
      rootElement._page = null
    }
  })
}
