import {
  API_SWITCH_TAB,
  type API_TYPE_SWITCH_TAB,
  type DefineAsyncApiFn,
  SwitchTabOptions,
  SwitchTabProtocol,
  defineAsyncApi,
} from '@dcloudio/uni-api'
import { parseUrl } from '@dcloudio/uni-shared'
import type { RouteOptions } from '../../../service/api/route/utils'
import {
  getTabIndex,
  isTabPage,
  switchSelect,
} from '../../framework/app/tabBar'
import type { ComponentPublicInstance } from 'vue'
import {
  closePage,
  handleBeforeEntryPageRoutes,
  updateEntryPageIsReady,
} from './utils'
import {
  entryPageState,
  switchTabPagesBeforeEntryPages,
} from '../../framework/app'
import { getCurrentBasePages } from '../../../service/framework/page/getCurrentPages'

export const $switchTab: DefineAsyncApiFn<API_TYPE_SWITCH_TAB> = (
  args,
  { resolve, reject }
) => {
  const { url } = args
  const { path, query } = parseUrl(url)
  updateEntryPageIsReady(path)

  if (!entryPageState.isReady) {
    switchTabPagesBeforeEntryPages.push({
      args,
      handler: { resolve, reject },
    })
    return
  }
  _switchTab({
    url,
    path,
    query,
  })
    .then(resolve)
    .catch(reject)

  handleBeforeEntryPageRoutes()
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
  const pages = getCurrentBasePages()
  return new Promise((resolve: (res: void) => void) => {
    setTimeout(() => {
      switchSelect(selected, path, query)
      for (let index = pages.length - 1; index >= 0; index--) {
        const page = pages[index] as ComponentPublicInstance
        if (isTabPage(page)) {
          break
        }
        closePage(page, 'none')
      }
      resolve(undefined)
    }, 0)
  })
}
