import {
  API_SWITCH_TAB,
  type API_TYPE_SWITCH_TAB,
  type AppRouteOpenType,
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

type SwitchTabApiFn = DefineAsyncApiFn<API_TYPE_SWITCH_TAB>

export function $switchTab(
  args: Parameters<SwitchTabApiFn>[0],
  { resolve, reject }: Parameters<SwitchTabApiFn>[1],
  appRouteOpenType: AppRouteOpenType = API_SWITCH_TAB,
  shouldDispatchAppRoute = true
) {
  const { url } = args
  const { path, query } = parseUrl(url)
  if (appRouteOpenType === 'appLaunch') {
    entryPageState.isReady = true
  } else {
    updateEntryPageIsReady(path)
  }

  if (!entryPageState.isReady) {
    switchTabPagesBeforeEntryPages.push({
      args,
      handler: { resolve, reject },
    })
    return
  }
  _switchTab(
    {
      url,
      path,
      query,
    },
    appRouteOpenType,
    shouldDispatchAppRoute
  )
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

function _switchTab(
  { url, path, query }: SwitchTabOptions,
  appRouteOpenType: AppRouteOpenType,
  shouldDispatchAppRoute: boolean
) {
  let selected: number = getTabIndex(path)
  if (selected == -1) {
    return Promise.reject(`tab ${path} not found`)
  }
  const pages = getCurrentBasePages()
  return new Promise((resolve: (res: void) => void) => {
    setTimeout(() => {
      switchSelect(
        selected,
        path,
        query,
        false,
        undefined,
        appRouteOpenType,
        shouldDispatchAppRoute
      )
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
