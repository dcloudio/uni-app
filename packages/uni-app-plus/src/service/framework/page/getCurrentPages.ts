import { getCurrentPage } from '@dcloudio/uni-core'
import { formatLog } from '@dcloudio/uni-shared'
import type { ComponentPublicInstance } from 'vue'
import { getVueApp } from '../app/vueApp'

const pages: ComponentPublicInstance[] = []

export function addCurrentPage(page: ComponentPublicInstance) {
  const $page = page.$page
  if (!$page.meta.isNVue) {
    return pages.push(page)
  }
  // 开发阶段热刷新需要移除旧的相同 id 的 page
  const index = pages.findIndex((p) => p.$page.id === page.$page.id)
  if (index > -1) {
    pages.splice(index, 1, page)
  } else {
    pages.push(page)
  }
}

export function getPageById(id: number) {
  return pages.find((page) => page.$page.id === id)
}

export function getAllPages() {
  return pages
}

export function getCurrentPages() {
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
  const page = getCurrentPage() as ComponentPublicInstance
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
  if (!curPage.$page.meta.isNVue) {
    getVueApp().unmountPage(curPage as ComponentPublicInstance)
  }
  pages.splice(index, 1)
  if (__DEV__) {
    console.log(formatLog('removePage', curPage.$page))
  }
}
