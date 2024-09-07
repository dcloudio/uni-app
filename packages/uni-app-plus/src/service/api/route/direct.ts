import { addLeadingSlash } from '@dcloudio/uni-shared'
import { getPage$BasePage } from '../../framework/page/getCurrentPages'
import type { ComponentPublicInstance } from 'vue'

/**
 * 是否处于直达页面
 * @param page
 * @returns
 */
export function isDirectPage(page: Page.PageInstance) {
  return (
    __uniConfig.realEntryPagePath &&
    getPage$BasePage(page as ComponentPublicInstance).route ===
      __uniConfig.entryPagePath
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
