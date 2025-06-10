import type { ComponentPublicInstance } from 'vue'
import { reLaunch } from './reLaunch'
import { getCurrentPages } from '../../../service/framework/page'

// 是否处于直达页面
export function isDirectPage(page: ComponentPublicInstance): boolean {
  return (
    !!__uniConfig.realEntryPagePath &&
    (getCurrentPages() as UniPage[])[0]?.vm === page
  )
}
// 重新启动到首页
export function reLaunchEntryPage() {
  __uniConfig.entryPagePath = __uniConfig.realEntryPagePath
  __uniConfig.realEntryPagePath = ''
  reLaunch({
    url: __uniConfig.entryPagePath?.startsWith('/')
      ? __uniConfig.entryPagePath
      : '/' + __uniConfig.entryPagePath,
  })
}
