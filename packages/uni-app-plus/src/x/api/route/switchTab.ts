import {
  defineAsyncApi,
  API_TYPE_SWITCH_TAB,
  API_SWITCH_TAB,
  DefineAsyncApiFn,
  SwitchTabProtocol,
  SwitchTabOptions,
} from '@dcloudio/uni-api'
import { parseUrl } from '@dcloudio/uni-shared'
import { RouteOptions } from '../../../service/api/route/utils'
import {
  getTabIndex,
  isTabPage,
  switchSelect,
} from '../../framework/app/tabBar'
import { ComponentPublicInstance } from 'vue'
import { getNativeApp } from '../../framework/app/app'

export const $switchTab: DefineAsyncApiFn<API_TYPE_SWITCH_TAB> = (
  args,
  { resolve, reject }
) => {
  const { url } = args
  const { path, query } = parseUrl(url)
  _switchTab({
    url,
    path,
    query,
  })
    .then(resolve)
    .catch(reject)
}

export const switchTab = defineAsyncApi<API_TYPE_SWITCH_TAB>(
  API_SWITCH_TAB,
  $switchTab,
  SwitchTabProtocol,
  SwitchTabOptions
)

interface SwitchTabOptions extends RouteOptions {}

function _switchTab({ url, path, query }: SwitchTabOptions) {
  let selected: number = getTabIndex(path)
  if (selected == -1) {
    return Promise.reject(`tab ${path} not found`)
  }
  const pages = getCurrentPages()
  switchSelect(selected, path, query)
  for (let index = pages.length - 1; index >= 0; index--) {
    const page = pages[index] as ComponentPublicInstance
    if (isTabPage(page)) {
      break
    }
    const nPage = getNativeApp().pageManager.findPageById(page.$page.id + '')!
    nPage.close(new Map<string, any>([['animationType', 'none']]))
  }
  return Promise.resolve()
}
