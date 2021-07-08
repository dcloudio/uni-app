import { formatLog } from '@dcloudio/uni-shared'
import { ComponentPublicInstance } from 'vue'

const pages: ComponentPublicInstance[] = []

export function addCurrentPage(page: ComponentPublicInstance) {
  pages.push(page)
}

export function getCurrentPages() {
  const curPages: ComponentPublicInstance[] = []
  pages.forEach((page) => {
    if (page.__isTabBar) {
      if (page.$.__isActive) {
        curPages.push(page)
      }
    } else {
      curPages.push(page)
    }
  })
  return curPages
}

export function removePage(curPage: ComponentPublicInstance) {
  const index = pages.findIndex((page) => page === curPage)
  if (index === -1) {
    return
  }
  if (!curPage.$page.meta.isNVue) {
    curPage.$.appContext.app.unmount()
  }
  pages.splice(index, 1)
  if (__DEV__) {
    console.log(formatLog('removePage', curPage.$page))
  }
}
