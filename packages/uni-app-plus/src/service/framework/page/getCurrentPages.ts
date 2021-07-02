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
