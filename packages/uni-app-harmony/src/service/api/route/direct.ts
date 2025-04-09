import { addLeadingSlash } from '@dcloudio/uni-shared'
import { getCurrentPages } from '@dcloudio/uni-app-plus/service/framework/page'

/**
 * 是否处于直达页面
 * @param page
 * @returns
 */
export function isDirectPage(page: Page.PageInstance) {
  return (
    __uniConfig.realEntryPagePath &&
    // page.$page.route === __uniConfig.entryPagePath &&
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
