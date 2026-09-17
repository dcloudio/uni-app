import type { ComponentPublicInstance } from 'vue'
import { API_NAVIGATE_BACK } from '@dcloudio/uni-api'
import { parseUrl } from '@dcloudio/uni-shared'
import { _reLaunch } from './reLaunch'
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
  const url = __uniConfig.entryPagePath?.startsWith('/')
    ? __uniConfig.entryPagePath
    : '/' + __uniConfig.entryPagePath
  const { path, query } = parseUrl(url)
  void _reLaunch({ url, path, query }, API_NAVIGATE_BACK)
}
