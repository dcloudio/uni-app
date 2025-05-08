import { getCurrentPage } from '@dcloudio/uni-core'
import { formatLog } from '@dcloudio/uni-shared'
import type { ComponentPublicInstance } from 'vue'
import { getVueApp } from '../app/vueApp'

export function getPage$BasePage(
  page: ComponentPublicInstance
): Page.PageInstance['$page'] {
  return __X__ ? page.$basePage : (page.$page as Page.PageInstance['$page'])
}

const pages: ComponentPublicInstance[] = []

export function addCurrentPage(page: ComponentPublicInstance) {
  const $page = getPage$BasePage(page)
  if (!$page.meta.isNVue) {
    return pages.push(page)
  }
  // 开发阶段热刷新需要移除旧的相同 id 的 page
  const index = pages.findIndex((p) => getPage$BasePage(p).id === $page.id)
  if (index > -1) {
    pages.splice(index, 1, page)
  } else {
    pages.push(page)
  }
}

export function getPageById(id: number) {
  return pages.find((page) => getPage$BasePage(page).id === id)
}

export function getAllPages() {
  return pages
}

export function getCurrentPages() {
  const curPages = getCurrentBasePages()
  if (__X__) {
    return curPages.map((page) => page.$page as UniPage)
  }
  return curPages
}

export function getCurrentBasePages() {
  const curPages: ComponentPublicInstance[] = []
  pages.forEach((page) => {
    if (page.$.__isTabBar) {
      if (page.$.__isActive) {
        curPages.push(page)
      }
    } else {
      curPages.push(page)
    }
  })
  return curPages
}

export function removeCurrentPage() {
  const page = __X__
    ? (getCurrentPage() as unknown as UniPage).vm
    : getCurrentPage()
  if (!page) {
    return
  }
  removePage(page)
}

export function removePage(
  curPage: ComponentPublicInstance | Page.PageInstance
) {
  const index = pages.findIndex((page) => page === curPage)
  if (index === -1) {
    return
  }
  const $basePage = getPage$BasePage(curPage as ComponentPublicInstance)
  if (!$basePage.meta.isNVue) {
    getVueApp().unmountPage(curPage as ComponentPublicInstance)
  }
  pages.splice(index, 1)
  if (__X__) {
    ;(curPage.$page as UniPage).vm = null
    // @ts-expect-error
    curPage.$page = null
  }
  if (__DEV__) {
    console.log(formatLog('removePage', $basePage))
  }
}
