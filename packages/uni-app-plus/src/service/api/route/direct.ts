import { addLeadingSlash } from '@dcloudio/uni-shared'
// import { getPage$BasePage } from '../../framework/page/getCurrentPages'
// import type { ComponentPublicInstance } from 'vue'
import { getCurrentPages } from '../../framework/page'

/**
 * 是否处于直达页面，仅适用于返回时判断是否应打开首页，不可挪作他用
 * 考虑如下场景
 * 1. 直达page2 redirectTo page3 此时 page3 也需要被认为是直达页面
 * 2. 直达page2 navigateTo page2 此时仅第一个 page2 应被认为是直达页面，第二个 page2 不应被认为是直达页面
 * @param page
 * @returns
 */
export function isDirectPage(page: Page.PageInstance) {
  return (
    __uniConfig.realEntryPagePath &&
    // getPage$BasePage(page as ComponentPublicInstance).route ===
    // __uniConfig.entryPagePath &&
    getCurrentPages()[0] === page
  )
}
/**
 * 重新启动到首页
 */
export function reLaunchEntryPage() {
  __uniConfig.entryPagePath = __uniConfig.realEntryPagePath
  delete __uniConfig.realEntryPagePath
  uni.reLaunch({
    url: addLeadingSlash(__uniConfig.entryPagePath!),
  })
}
