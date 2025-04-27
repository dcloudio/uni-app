import type { ComponentPublicInstance } from 'vue'
// import { getRealPath } from '../../framework/route'
import { reLaunch } from './reLaunch'
// import { parseUrl } from '@dcloudio/uni-shared'
import { getCurrentPages } from '../../../service/framework/page'

// 是否处于直达页面
export function isDirectPage(page: ComponentPublicInstance): boolean {
  return (
    !!__uniConfig.realEntryPagePath &&
    // getRealPath(page.$basePage.route, true) ===
    // getRealPath(parseUrl(__uniConfig.entryPagePath!).path, true) &&
    getCurrentPages()[0] === page
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
